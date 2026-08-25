/**
 * Worker de Restora.
 *
 * Todo lo que no sea /sitemap.xml o /robots.txt se sirve tal cual desde los archivos estáticos, así
 * que el comportamiento del sitio no cambia.
 *
 * El sitemap NO es un archivo escrito a mano: se genera leyendo el propio index.html publicado y
 * sacando de ahí las rutas reales. Así, cuando se añade un documento legal a LEGAL_ORDEN o se
 * reactivan las páginas de detalle, el sitemap lo recoge solo en el siguiente despliegue, sin que
 * nadie tenga que acordarse de actualizar una lista paralela que acabaría mintiendo.
 */

const CACHE_SEGUNDOS = 3600;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    try {
      if (url.pathname === '/sitemap.xml') return await responderSitemap(url, env, ctx);
      if (url.pathname === '/robots.txt') return responderRobots(url);
    } catch (e) {
      // Si la generación falla por lo que sea, el sitio entero no puede caerse con ella: se deja
      // pasar la petición a los archivos estáticos, que devolverán el 404 normal.
      console.error('sitemap/robots', e);
    }
    return env.ASSETS.fetch(request);
  },
};

// ---- Sitemap ---------------------------------------------------------------

async function responderSitemap(url, env, ctx) {
  const cache = caches.default;
  const clave = new Request(url.origin + '/sitemap.xml', { method: 'GET' });
  const guardado = await cache.match(clave);
  if (guardado) return guardado;

  const indice = await env.ASSETS.fetch(new Request(url.origin + '/index.html'));
  if (!indice.ok) throw new Error('No se pudo leer index.html para generar el sitemap');
  const html = await indice.text();
  const lastMod = fechaISO(indice.headers.get('last-modified'));

  const cuerpo = rutasPublicas(html)
    .map((r) => bloqueUrl(url.origin + r.ruta, lastMod, r.frecuencia, r.prioridad))
    .join('\n');

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + cuerpo + '\n</urlset>\n';

  const res = new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=UTF-8',
      'cache-control': 'public, max-age=' + CACHE_SEGUNDOS,
    },
  });
  ctx.waitUntil(cache.put(clave, res.clone()));
  return res;
}

/**
 * Rutas que tiene sentido que indexe un buscador. A propósito NO se incluyen:
 *  - Las cartas y reservas de cada restaurante (?cuenta=…): son de cada local, no del producto, y
 *    se llega a ellas escaneando un QR, no buscando en Google.
 *  - Los anclajes de la portada (#precios, #blog…): un fragmento no es una URL distinta.
 */
function rutasPublicas(html) {
  const rutas = [{ ruta: '/', frecuencia: 'weekly', prioridad: '1.0' }];

  // Documentos legales: la lista viva está en LEGAL_ORDEN.
  const legal = html.match(/const\s+LEGAL_ORDEN\s*=\s*\[([^\]]*)\]/);
  if (legal) {
    entreComillas(legal[1]).forEach((slug) => {
      rutas.push({ ruta: '/?legal=' + slug, frecuencia: 'yearly', prioridad: '0.3' });
    });
  }

  // Páginas de detalle de cada sección. Hoy están desactivadas (FUNC_PAGES_ACTIVAS = false) y por eso
  // no se listan: un sitemap que apunte a páginas que redirigen a la portada es peor que no tenerlo.
  if (/const\s+FUNC_PAGES_ACTIVAS\s*=\s*true/.test(html)) {
    const mapa = html.match(/const\s+FUNC_CARD_MAP\s*=\s*\{([^}]*)\}/);
    if (mapa) {
      // El mapa es 'Etiqueta': 'clave'; en la URL va la clave, que es la parte tras los dos puntos.
      claves(mapa[1]).forEach((key) => {
        rutas.push({ ruta: '/?funcion=' + key, frecuencia: 'monthly', prioridad: '0.6' });
      });
    }
  }
  return rutas;
}

function entreComillas(fragmento) {
  return Array.from(fragmento.matchAll(/'([^']+)'/g)).map((m) => m[1]);
}
function claves(fragmento) {
  return Array.from(fragmento.matchAll(/:\s*'([^']+)'/g)).map((m) => m[1]);
}

function bloqueUrl(loc, lastMod, frecuencia, prioridad) {
  return '  <url>\n'
    + '    <loc>' + escaparXml(loc) + '</loc>\n'
    + (lastMod ? '    <lastmod>' + lastMod + '</lastmod>\n' : '')
    + '    <changefreq>' + frecuencia + '</changefreq>\n'
    + '    <priority>' + prioridad + '</priority>\n'
    + '  </url>';
}

// En una <loc> el & tiene que ir escapado aunque venga de una query legítima.
function escaparXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// El sitemap pide la fecha en formato W3C. Se toma del propio index.html publicado, así refleja
// cuándo cambió el sitio de verdad y no la hora de la petición.
function fechaISO(cabecera) {
  if (!cabecera) return '';
  const d = new Date(cabecera);
  return isNaN(d) ? '' : d.toISOString().slice(0, 10);
}

// ---- robots.txt ------------------------------------------------------------

function responderRobots(url) {
  const cuerpo = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Las cartas por QR son una por mesa y todas muestran lo mismo. Se deja indexable la del',
    '# restaurante (?cuenta=…) y se bloquean las variantes por mesa, que solo duplicarían contenido.',
    'Disallow: /*mesa=',
    '',
    'Sitemap: ' + url.origin + '/sitemap.xml',
    '',
  ].join('\n');
  return new Response(cuerpo, {
    headers: {
      'content-type': 'text/plain; charset=UTF-8',
      'cache-control': 'public, max-age=' + CACHE_SEGUNDOS,
    },
  });
}
