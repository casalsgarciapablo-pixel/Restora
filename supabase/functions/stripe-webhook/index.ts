// Recibe la confirmacion de pago de Stripe (evento checkout.session.completed), verifica la firma
// y marca el pedido como Pagado de verdad en restaurant_data. Usa la service role key: solo esta
// funcion (nunca el navegador) puede escribir sin pasar por las politticas RLS normales.
import Stripe from "https://esm.sh/stripe@14?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", { apiVersion: "2023-10-16" });
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

async function sha256Hex(texto: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  const firma = req.headers.get("stripe-signature");
  const cuerpo = await req.text();
  let evento;
  try {
    evento = await stripe.webhooks.constructEventAsync(cuerpo, firma ?? "", webhookSecret);
  } catch (err) {
    return new Response("Firma invalida: " + String(err && err.message ? err.message : err), { status: 400 });
  }

  if (evento.type === "checkout.session.completed") {
    const session = evento.data.object as any;
    const userId = session.metadata?.user_id;
    const pedidoId = session.metadata?.pedido_id;
    if (userId && pedidoId) {
      const { data: fila } = await supabaseAdmin
        .from("restaurant_data")
        .select("data")
        .eq("user_id", userId)
        .single();
      if (fila && fila.data) {
        const datos = fila.data;
        const pedidos = Array.isArray(datos.pedidos) ? datos.pedidos : [];
        const pedido = pedidos.find((p: any) => p.id === pedidoId);
        // Idempotente: si Stripe reintenta el mismo evento, no se vuelve a cobrar ni a duplicar el pago.
        if (pedido && pedido.estado !== "Pagado") {
          const importe = Math.round(((session.amount_total || 0) / 100) * 100) / 100;
          pedido.cobros = Array.isArray(pedido.cobros) ? pedido.cobros : [];
          pedido.cobros.push({
            importe,
            metodo: "Tarjeta (Stripe)",
            fecha: new Date().toISOString(),
            detalle: "Pago con tarjeta online",
            stripeSessionId: session.id,
          });
          pedido.pagado = Math.round(((pedido.pagado || 0) + importe) * 100) / 100;
          pedido.estado = "Pagado";
          pedido.metodoPago = "Tarjeta (Stripe)";
          pedido.fechaPago = new Date().toISOString();

          datos.ultimoTicketNumero = (datos.ultimoTicketNumero || 0) + 1;
          pedido.ticketNumero = datos.ultimoTicketNumero;
          const base = (datos.ultimoTicketHash || "0") + "|" + pedido.id + "|" + pedido.total.toFixed(2) + "|" + pedido.fechaPago;
          const hash = await sha256Hex(base);
          pedido.ticketHash = hash;
          datos.ultimoTicketHash = hash;

          const mMatch = /^Mesa (\d+)$/i.exec(pedido.mesa || "");
          if (mMatch && Array.isArray(datos.mesaEstados)) {
            const idx = parseInt(mMatch[1], 10) - 1;
            const otrosPendientes = pedidos.some(
              (o: any) => o.id !== pedidoId && o.mesa === pedido.mesa && o.estado !== "Pagado" && o.estado !== "Anulado",
            );
            if (!otrosPendientes && datos.mesaEstados[idx] !== undefined) datos.mesaEstados[idx] = "Libre";
          }

          await supabaseAdmin.from("restaurant_data").update({ data: datos }).eq("user_id", userId);
        }
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), { headers: { "Content-Type": "application/json" } });
});
