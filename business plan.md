


🍽️
RESTORA
Restaurant Analytics Platform
Product Requirements Document  ·  v1.0



Plantilla PRD para Generadores de Apps con IA
Mayo 2026  ·  Confidencial

1. Resumen Ejecutivo
RESTORA es una plataforma web SaaS de análisis de inteligencia de negocio diseñada específicamente para restaurantes. Combina la potencia de los datos en tiempo real, la inteligencia artificial generativa y un diseño de producto de nivel Apple para ofrecer a los propietarios y gerentes de restaurantes una ventaja operativa sin precedentes.

🎯  Propósito del Documento
Este PRD es una plantilla completa lista para ser procesada por generadores de aplicaciones con IA (como Base44, v0, Lovable, Bolt, etc.). Cada sección define con precisión los requisitos funcionales, el diseño de pantallas, los flujos de usuario, las reglas de negocio y los KPIs necesarios para construir el producto.


1.1 Visión del Producto
Ser el sistema operativo de inteligencia para restaurantes: la primera plataforma que combina seguimiento de pedidos y reservas, análisis de ingresos, recomendaciones de IA y resúmenes ejecutivos en una interfaz tan intuitiva que cualquier empleado puede usarla desde el primer día.

1.2 Problema que Resuelve
Los restaurantes gestionan datos de pedidos, reservas e inventario en sistemas aislados que no se comunican entre sí.
Los propietarios carecen de visibilidad instantánea sobre el rendimiento de platos, mesas y personal.
Tomar decisiones sobre el menú, los turnos o el stock se basa en intuición, no en datos.
No existe un canal de consulta ágil (chat IA) que responda preguntas operativas en segundos.
Los informes semanales se hacen manualmente en hojas de cálculo, consumiendo tiempo valioso.

1.3 Propuesta de Valor Única
Pilar
Diferenciador
📊  Datos Unificados
Pedidos + reservas + inventario en un solo panel de control en tiempo real.
🤖  IA Conversacional
Chat IA para consultas de stock, análisis de ventas y dudas operativas en lenguaje natural.
📋  Informes Automáticos
Informes semanales generados por IA con recomendaciones accionables de mejora, reducción o eliminación.
🍎  Diseño Apple-grade
Interfaz minimalista, animaciones fluidas y jerarquía visual clara. Cero curva de aprendizaje.


2. Usuarios Objetivo y Personas
2.1 Segmentos de Usuario
Segmento
Descripción
Necesidad Principal
Frecuencia
Propietario / CEO
Dueño del restaurante, 1–3 locales
Visión financiera semanal y decisiones estratégicas
Semanal / Mensual
Gerente de Local
Responsable de turno y operaciones diarias
Seguimiento en tiempo real de pedidos y reservas
Diaria
Chef / Jefe de Cocina
Responsable de la producción culinaria
Conocer platos MVP y gestión de stock e ingredientes
Diaria
Personal de Sala
Camareros y hostess
Confirmar reservas, ver estado de mesas y pedidos
Por turno


2.2 Persona Principal: Carlos, Propietario de Restaurante
👤  Carlos García · 42 años · Propietario de Restaurante Mediterráneo (2 locales, Madrid)
Trabaja 12 horas al día y no tiene tiempo de analizar hojas de cálculo. Quiere saber de un vistazo si el negocio va bien esta semana, qué plato está arrasando, cuántas reservas tiene mañana y si le falta stock de algún ingrediente. Usa iPhone y espera que todo sea tan fácil como usar Apple Maps.


Frustraciones actuales de Carlos:
Recibe los datos de ventas 3 días después de que ocurren.
Llama al chef para saber si hay stock suficiente para el fin de semana.
No sabe qué platos del menú son los menos rentables hasta que hace el P&L mensual.
Los informes de reservas y los de pedidos están en dos sistemas diferentes.

Lo que Carlos necesita de RESTORA:
Dashboard semanal en la app: ingresos, cobertura de mesas, platos top.
Chat IA: «¿Tengo ingredientes para 80 personas este sábado?»
Informe IA semanal que le diga exactamente qué cambiar en el menú.

3. Requisitos Funcionales
Leyenda de prioridad: P0 = Crítico MVP · P1 = Alta prioridad (mes 2) · P2 = Deseable (mes 3+)

3.1 Módulo 1 — Dashboard Principal
Feature
Descripción
Prior.
MVP
KPIs en tiempo real
Tarjetas con ingresos del día, pedidos activos, reservas pendientes y ocupación de mesas, actualizadas cada 30 s.
P0
Sí
Gráfico de ingresos
Línea temporal de ingresos por día, semana y mes. Comparativa con el mismo período del año anterior.
P0
Sí
Resumen semanal
Panel colapsable con ingresos totales, ticket promedio, comensales totales y variación % respecto a semana anterior.
P0
Sí
Top platos MVP
Ranking de los 5 platos más vendidos y más rentables de la semana con foto e ingresos generados.
P0
Sí
Mapa de calor por horas
Heatmap de ocupación por franjas horarias para identificar los momentos de mayor demanda.
P1
No
Alertas inteligentes
Notificaciones automáticas cuando un KPI cae >15% respecto a la media histórica.
P1
No


3.2 Módulo 2 — Gestión de Pedidos
Feature
Descripción
Prior.
MVP
Lista de pedidos en vivo
Vista de todos los pedidos activos con estado (recibido, en preparación, listo, entregado), mesa asignada y tiempo transcurrido.
P0
Sí
Creación de pedidos
Formulario para crear pedidos desde la plataforma con selección de platos del menú digital.
P0
Sí
Tracking de estado
Barra de progreso visual por pedido con timestamps en cada etapa.
P0
Sí
Historial de pedidos
Buscador y filtros (fecha, mesa, plato, importe) sobre todos los pedidos históricos.
P0
Sí
Pedidos por categoría
Desglose de pedidos por categoría de menú (entrantes, principales, postres, bebidas) para análisis.
P1
No
Integración TPV
API de conexión con TPV externos (Square, iZettle) para sincronizar pagos automáticamente.
P2
No


3.3 Módulo 3 — Gestión de Reservas
Feature
Descripción
Prior.
MVP
Calendario de reservas
Vista mensual, semanal y diaria de todas las reservas con código de color por estado (confirmada, pendiente, cancelada).
P0
Sí
Creación de reservas
Formulario con nombre del cliente, número de comensales, fecha/hora, preferencias y notas especiales.
P0
Sí
Gestión de mesas
Mapa visual del restaurante con estado de cada mesa en tiempo real (libre, ocupada, reservada).
P0
Sí
Confirmaciones automáticas
Envío de email/SMS de confirmación al cliente al crear la reserva. Recordatorio 24 h antes.
P0
Sí
Lista de espera
Gestión de cola de espera con notificación automática cuando se libera una mesa.
P1
No
Análisis de cancelaciones
Tasa de cancelaciones, no-shows y tendencias por día de la semana.
P1
No


3.4 Módulo 4 — Chat IA Operacional
Feature
Descripción
Prior.
MVP
Chat en lenguaje natural
Interfaz de chat para preguntas como «¿Cuánto hemos ingresado esta semana?» o «¿Hay suficiente salmón para el viernes?»
P0
Sí
Consultas de stock
La IA responde preguntas sobre niveles de inventario cruzando datos de pedidos históricos y stock registrado.
P0
Sí
Análisis de ventas por voz
Respuestas a preguntas analíticas: comparativas de períodos, platos con peor rendimiento, horas pico.
P0
Sí
Sugerencias proactivas
La IA inicia conversación con sugerencias diarias: «El bacalao lleva 3 días sin venderse, ¿lo promocionamos?»
P1
No
Historial de chats
Registro de conversaciones anteriores para auditoría y continuidad de contexto.
P1
No


3.5 Módulo 5 — Informes IA Semanales
Feature
Descripción
Prior.
MVP
Generación automática
Informe completo generado cada lunes a las 7:00 AM con los datos de la semana anterior.
P0
Sí
Análisis de rendimiento
Sección de qué funcionó bien: platos estrella, días de mayor facturación, ratios de ocupación.
P0
Sí
Recomendaciones IA
Sección de qué mejorar, reducir, cambiar o eliminar: platos poco rentables, horarios muertos, tendencias de cancelación.
P0
Sí
Exportación PDF
Descarga del informe completo en PDF con el branding del restaurante.
P0
Sí
Envío por email
Envío automático del informe al propietario y gerentes configurados en la cuenta.
P1
No
Comparativa histórica
Sección con evolución de KPIs en las últimas 12 semanas en formato visual.
P1
No


3.6 Módulo 6 — Gestión de Inventario / Stock
Feature
Descripción
Prior.
MVP
Registro de ingredientes
Catálogo de ingredientes con cantidad actual, unidad de medida y umbral mínimo de alerta.
P0
Sí
Descuento automático
Al registrar un pedido, el sistema descuenta los ingredientes necesarios según la receta del plato.
P1
No
Alertas de stock bajo
Notificación push y badge en el panel cuando un ingrediente cae por debajo del umbral mínimo.
P0
Sí
Proyección de necesidades
La IA predice cuánto stock se necesita para los próximos 7 días basándose en reservas futuras e histórico.
P1
No


4. Diseño UX/UI — Especificaciones
4.1 Principios de Diseño
🍎  Filosofía de Diseño: Apple-Grade Experience
Cada decisión de diseño debe pasar el test: «¿Lo haría Apple?» Esto implica: espacios en blanco generosos, tipografía impecable, colores con significado, microanimaciones significativas (no decorativas), y eliminar cualquier elemento que no aporte valor al usuario.


Principio
Especificación
Claridad
Una sola acción primaria por pantalla. Sin menús dentro de menús. Zero clutter.
Profundidad
Capas de información: resumen → detalle → acción. El usuario accede a más contexto por elección, no por obligación.
Deferencia
El contenido es el protagonista. La UI desaparece cuando no es necesaria. Fondo blanco/gris ultraclaro.
Feedback inmediato
Todo tap/click produce una respuesta visual en < 100 ms. Skeleton screens durante la carga. Nunca pantalla en blanco.
Accesibilidad
Contraste mínimo WCAG AA (4.5:1). Tamaño de fuente base 16px. Áreas táctiles mínimo 44×44 px.


4.2 Sistema de Diseño
Paleta de Colores
Token
Hex
Uso
Brand Blue
#0071E3
CTAs primarios, links, elementos de énfasis, gráficos principales.
Success Green
#34C759
Métricas positivas, estados activos, badges de disponibilidad.
Warning Orange
#FF9500
Alertas de stock bajo, reservas pendientes, atención requerida.
Danger Red
#FF3B30
Errores críticos, cancelaciones, stock agotado, alertas urgentes.
Text Primary
#1C1C1E
Títulos principales y texto de alto impacto.
Background
#F2F2F7
Fondo de la aplicación. Cards sobre fondo blanco puro.


Tipografía
Elemento
Especificación
Uso
Display / Hero
SF Pro Display, 40px, Bold
Nombre de pantalla, métricas principales del dashboard.
Heading 1
SF Pro Display, 28px, Semibold
Títulos de sección dentro de las pantallas.
Heading 2
SF Pro Display, 22px, Semibold
Subtítulos de tarjetas y módulos.
Body
SF Pro Text, 16px, Regular
Texto de contenido general, descripciones, listas.
Caption / Label
SF Pro Text, 12px, Medium
Labels de formularios, timestamps, metadatos.
Fallback Font
Inter, system-ui
Sistema de fuentes para dispositivos sin SF Pro.


4.3 Arquitectura de Pantallas
Pantalla
Componentes Principales
Interacciones Clave
Login / Onboarding
Logo centrado, campo email+contraseña, botón «Entrar» azul, opción «Continuar con Google».
Login → Dashboard
Dashboard Home
Header con saludo + fecha, 4 KPI cards (ingresos, pedidos, reservas, ocupación), gráfico de ingresos semanal, módulo Top 5 Platos, acceso rápido a chat IA.
Tap KPI → detalle, Tap gráfico → filtros de período
Pedidos
Tabs: En curso / Historial. Lista de pedidos con chips de estado, filtro por fecha/mesa. Botón «+ Nuevo Pedido» flotante.
Tap pedido → drawer de detalle, Swipe → cambiar estado
Reservas
Selector de vista (Calendario / Lista / Mapa de mesas). Filtros de fecha. Botón «+ Nueva Reserva».
Tap fecha → reservas del día, Long press mesa → asignar
Chat IA
Área de chat con burbujas, campo de texto + botón enviar, sugerencias de preguntas rápidas tipo chips.
Tap chip → enviar pregunta, Tap respuesta → expandir datos
Informes
Lista de informes semanales con fecha, badge de «Nuevo», vista previa de resumen, botón de descarga PDF.
Tap informe → vista completa, Tap PDF → descarga
Inventario
Lista de ingredientes con barra de nivel de stock visual, alertas en rojo, buscador.
Tap ingrediente → editar stock, Pull to refresh
Configuración
Perfil del restaurante, usuarios del equipo, notificaciones, integración con herramientas externas.
Toggle switches, formularios inline


5. Flujos de Usuario Críticos
5.1 Flujo: Consulta de Stock por Chat IA
Objetivo
El gerente pregunta en lenguaje natural si hay stock suficiente para el fin de semana sin abandonar el panel de control.


Paso
Actor
Acción / Sistema
1
Usuario
Abre el módulo Chat IA desde la barra de navegación lateral.
2
Usuario
Escribe: «¿Tengo suficiente salmón para este sábado? Tenemos 40 reservas.»
3
Sistema
La IA procesa la consulta, accede al inventario actual (salmón: 8 kg) y al histórico de consumo por comensal (≈ 180 g/pax).
4
Sistema
Responde: «Para 40 comensales necesitarías aprox. 7,2 kg. Tienes 8 kg disponibles. ✅ Stock suficiente, pero ajustado. ¿Deseas añadir un pedido de reposición?»
5
Usuario
Pulsa «Ver detalle de stock» para verificar todos los ingredientes para el fin de semana.
6
Sistema
Abre panel lateral con tabla de ingredientes críticos para el sábado, ordenados por riesgo de desabasto.


5.2 Flujo: Generación y Lectura del Informe Semanal IA
Paso
Actor
Acción / Sistema
1
Sistema (automático)
Cada lunes a las 7:00 AM, el sistema recopila los datos de la semana: pedidos, ingresos, reservas, cancelaciones, platos vendidos.
2
Sistema
La IA analiza los datos, genera el texto del informe estructurado con secciones: Resumen, Logros, Áreas de Mejora y Recomendaciones.
3
Sistema
Envía notificación push al propietario: «Tu informe semanal está listo 📊».
4
Usuario
Abre la notificación → llega al módulo Informes → selecciona el informe de la semana actual.
5
Sistema
Muestra el informe con gráficos integrados, métricas resaltadas y lista de recomendaciones con impacto estimado.
6
Usuario
Pulsa «Descargar PDF» → recibe el informe completo formateado con el logo del restaurante.


5.3 Flujo: Gestión de Reserva con Mapa de Mesas
Paso
Actor
Acción / Sistema
1
Personal de Sala
Abre módulo Reservas → pulsa botón flotante «+ Nueva Reserva».
2
Usuario
Completa el formulario: nombre del cliente, número de comensales (6), fecha (viernes 20:30), notas (alergia a frutos secos).
3
Sistema
Filtra y muestra automáticamente las mesas disponibles para 6 personas en ese turno en el mapa visual.
4
Usuario
Selecciona la Mesa 8 (terraza) en el mapa táctil. El sistema la marca como reservada.
5
Sistema
Envía confirmación automática por email al cliente con los detalles de la reserva. Badge de alerta por la alergia aparece en la nota de la reserva.
6
Sistema
24 h antes, envía recordatorio automático al cliente con opción de confirmar o cancelar con un tap.


6. Modelo de Datos
6.1 Entidades Principales
Entidad
Campos Clave
Relaciones
Restaurant
id, name, logo_url, address, timezone, plan
Tiene muchos Users, Orders, Reservations, MenuItems, InventoryItems
User
id, restaurant_id, name, email, role (owner/manager/staff), last_login
Pertenece a Restaurant. Crea Orders y Reservations.
Order
id, restaurant_id, table_id, status, total_amount, created_at, closed_at
Tiene muchos OrderItems. Pertenece a Table y Restaurant.
OrderItem
id, order_id, menu_item_id, quantity, unit_price, notes
Pertenece a Order y MenuItem.
Reservation
id, restaurant_id, table_id, customer_name, customer_email, customer_phone, party_size, date_time, status, notes
Pertenece a Table y Restaurant.
MenuItem
id, restaurant_id, name, category, price, cost, description, image_url, is_active
Tiene muchos OrderItems. Tiene muchos MenuItemIngredients.
Table
id, restaurant_id, name/number, capacity, location (indoor/outdoor/bar), status
Tiene muchas Reservations y Orders.
InventoryItem
id, restaurant_id, name, unit, current_quantity, min_threshold, updated_at
Relacionado con MenuItems a través de recetas.
WeeklyReport
id, restaurant_id, week_start, week_end, summary_json, ai_recommendations_text, pdf_url, created_at
Pertenece a Restaurant. Generado automáticamente.
ChatMessage
id, restaurant_id, user_id, role (user/assistant), content, created_at
Pertenece a User y Restaurant.


6.2 Estados de Pedido
Estado
Color UI
Descripción
received
🔵 Azul
Pedido creado, pendiente de confirmación en cocina.
in_preparation
🟠 Naranja
En preparación en cocina.
ready
🟢 Verde
Listo para servir.
delivered
⚫ Gris
Entregado al cliente. Pedido cerrado.
cancelled
🔴 Rojo
Cancelado antes de ser entregado.


7. KPIs y Métricas de Éxito
7.1 KPIs del Producto (Éxito del Negocio del Restaurante)
KPI
Descripción
Target
Ingresos Semanales
Suma total de ingresos por pedidos cerrados en los últimos 7 días.
Visible en Dashboard
Ticket Promedio
Importe medio por pedido (total ingresos / número de pedidos).
Referencia histórica
Tasa de Ocupación
% de mesas ocupadas respecto al total durante el horario de servicio.
> 75% objetivo
Platos MVP
Top 5 platos por volumen de ventas e ingresos generados en la semana.
Ranking semanal
Tasa de Cancelación
% de reservas canceladas o no-show respecto al total de reservas.
< 10% objetivo
Tiempo Medio de Preparación
Tiempo promedio entre estado «received» y «ready» por pedido.
< 20 min objetivo


7.2 KPIs de la Plataforma (Adopción y Salud del Producto)
KPI
Descripción
Target
DAU / WAU
Usuarios activos diarios y semanales. Indicador de engagement.
> 80% WAU/MAU
Chats IA por semana
Número de consultas realizadas al chat IA por restaurante activo.
> 10 / semana
Informes abiertos
% de informes semanales que son abiertos por el propietario.
> 85%
Time to Value
Tiempo desde registro hasta primer pedido registrado en la plataforma.
< 30 minutos
NPS
Net Promoter Score medido mensualmente entre usuarios activos.
> 50
Churn Rate mensual
% de restaurantes que cancelan su suscripción al mes.
< 5%


8. Estructura del Informe Semanal IA
Este es el template exacto que la IA debe usar para generar cada informe semanal. El generador de apps debe implementar esta estructura como prompt del sistema.

8.1 Estructura del Informe
#
Sección
Contenido a Generar
1
📊 Resumen Ejecutivo
3 frases que resuman el rendimiento de la semana vs semana anterior. Ingresos totales, variación % y una conclusión qualitativa.
2
⭐ Logros Destacados
Lista de 3-5 puntos positivos: platos más vendidos, récord de reservas, mejor ticket promedio. Con datos concretos.
3
🔍 Áreas de Atención
Lista de 3-5 alertas: platos con pocas ventas, horas de baja ocupación, alta tasa de cancelación. Con datos y contexto.
4
🎯 Recomendaciones IA
Lista de 3-5 acciones concretas y priorizadas: qué mejorar, qué eliminar del menú, qué horario optimizar, qué promoción lanzar. Cada una con impacto estimado.
5
📈 Métricas de la Semana
Tabla con todos los KPIs: ingresos, ticket medio, ocupación, nº pedidos, nº reservas, cancelaciones, platos top 5.
6
🔮 Proyección Próxima Semana
Basándose en reservas ya registradas y patrones históricos, estimación de ingresos y carga para la próxima semana.


8.2 Prompt del Sistema para Generación de Informes
📝  Prompt de Sistema — Informe Semanal IA
Eres el analista de negocio de un restaurante. Tu misión es generar un informe semanal claro, accionable y motivador. Tienes acceso a los datos de la semana: pedidos, ingresos por plato, reservas, cancelaciones e inventario. SIEMPRE usa datos concretos con números. NUNCA uses jerga técnica. Escribe en un tono profesional pero cercano, como si fueras el mejor gerente del restaurante. Cada recomendación debe incluir: (1) el problema identificado, (2) el impacto en el negocio y (3) la acción concreta a tomar. Ordena las recomendaciones por impacto estimado en ingresos (de mayor a menor).


9. Stack Tecnológico — Guía para el Generador de Apps
📌  Nota para el Generador de Apps con IA
La elección del stack tecnológico es flexible y queda a criterio del generador de aplicaciones. Las opciones listadas a continuación son recomendaciones basadas en las necesidades del producto, pero pueden ser adaptadas según las capacidades y preferencias de la herramienta de desarrollo usada (Base44, v0, Lovable, Bolt, Cursor, etc.).


Capa
Opciones Recomendadas
Razón / Requisito
Frontend
React + TypeScript / Next.js
SPA o SSR para dashboards con datos en tiempo real. Tailwind CSS para diseño rápido Apple-like.
UI Components
shadcn/ui + Recharts / Tremor
Componentes accesibles y personalizables. Recharts para gráficos de ingresos y KPIs.
Backend / API
Node.js + Express / Fastify / tRPC
APIs REST o tRPC para tipado end-to-end. Soporte de WebSockets para actualizaciones en tiempo real.
Base de Datos
PostgreSQL (Supabase) / PlanetScale
Relacional para datos transaccionales de pedidos y reservas. Supabase añade autenticación y real-time gratis.
Autenticación
Supabase Auth / NextAuth / Clerk
Multi-tenant por restaurante. Roles: owner, manager, staff. OAuth con Google recomendado.
IA — Chat
OpenAI GPT-4o / Anthropic Claude API
Para el chat IA operacional. Necesita acceso a datos de la BD via function calling o RAG.
IA — Informes
OpenAI GPT-4o / Anthropic Claude API
Generación de texto estructurado para informes semanales. Ejecutar via cron job cada lunes a las 7:00.
Jobs / Cron
Inngest / Trigger.dev / Vercel Cron
Para generación automática de informes, recordatorios de reservas y alertas de stock.
Email / SMS
Resend / SendGrid + Twilio
Confirmaciones de reserva, recordatorios 24 h antes y envío de informes PDF por email.
Almacenamiento
Supabase Storage / Cloudflare R2
Para logos del restaurante, fotos de platos y PDFs de informes generados.
Despliegue
Vercel / Railway / Fly.io
CI/CD automático. Preview deployments. Edge functions para latencia mínima.
Real-time
Supabase Realtime / Ably / Pusher
Para estado de pedidos en tiempo real y actualización de KPIs del dashboard sin recargar la página.


10. Roadmap de Desarrollo
Fase
Duración
Entregables
Fase 1 — MVP
Semanas 1–6
Auth + onboarding restaurante · Dashboard con KPIs · Gestión de pedidos (CRUD + estados) · Gestión de reservas + calendario · Mapa de mesas básico · Chat IA (consultas de ventas y stock) · Inventario básico
Fase 2 — Core
Semanas 7–12
Informes semanales IA automáticos · Exportación PDF de informes · Notificaciones push y email · Confirmaciones y recordatorios de reserva · Alertas de stock bajo · Gráficos avanzados (heatmap, comparativas)
Fase 3 — Growth
Semanas 13–20
Multi-local (un usuario, varios restaurantes) · Integración TPV externo · App móvil (React Native o PWA) · Lista de espera con notificación automática · Proyección de demanda IA · Análisis de rentabilidad por plato


10.1 Criterios de Lanzamiento MVP
100% de los features P0 implementados y testeados.
Tiempo de carga del dashboard < 2 segundos en conexión 4G.
Chat IA responde en < 5 segundos el 95% de las consultas.
Informe semanal generado correctamente en entorno de staging durante 2 semanas consecutivas.
Prueba con 3 restaurantes piloto durante 4 semanas con NPS > 40.
Sin bugs críticos (P0) en producción durante 7 días consecutivos.

11. Requisitos No Funcionales
Categoría
Especificación
Rendimiento
Dashboard carga en < 2 s. Chat IA responde en < 5 s. Actualización de pedidos en tiempo real < 500 ms. Uptime mínimo 99.5%.
Seguridad
Aislamiento de datos por restaurante (multi-tenancy). HTTPS everywhere. Datos en reposo encriptados. RGPD/GDPR compliant para datos de clientes europeos. Logs de acceso auditables.
Escalabilidad
La arquitectura debe soportar 10.000 restaurantes simultáneos sin degradación. Queries de BD optimizadas con índices en campos de fecha y restaurant_id.
Accesibilidad
WCAG 2.1 nivel AA. Contraste mínimo 4.5:1. Navegación completa por teclado. Etiquetas ARIA en todos los elementos interactivos.
Internacionalización
Soporte inicial en Español e Inglés. Arquitectura i18n desde el día 1. Formato de moneda y fechas configurable por restaurante.
Compatibilidad
Chrome, Firefox, Safari, Edge (últimas 2 versiones). Diseño responsive: funcional desde 375px (iPhone SE) hasta 1440px+ (desktop).
Backup
Backup automático de BD cada 24 horas. Retención de 30 días. Recovery Point Objective (RPO) < 24 h. Recovery Time Objective (RTO) < 4 h.


12. Glosario
Término
Definición
Plato MVP
Most Valuable Product/Plato: el plato que genera mayor volumen de ingresos o número de ventas en un período dado.
Ticket Promedio
Importe medio por pedido o por comensal. Calculado como: ingresos totales / número de pedidos (o comensales).
Cobertura
Número de comensales atendidos en un período. Métrica de restaurante equivalente a «unidades vendidas».
No-show
Reserva que no se presenta sin avisar. Alto impacto negativo en ingresos y ocupación.
Function Calling
Capacidad de los LLMs (ChatGPT, Claude) de llamar funciones externas (como la BD del restaurante) durante el chat.
Multi-tenancy
Arquitectura donde múltiples restaurantes usan la misma infraestructura con total aislamiento de sus datos.
SaaS
Software as a Service: modelo de distribución por suscripción mensual, sin instalación local.


✅  Documento listo para Base44
Este PRD está estructurado para ser procesado directamente por un generador de apps con IA. Cada sección contiene requisitos, flujos, datos y especificaciones de diseño en el nivel de detalle necesario para que el agente pueda tomar decisiones de implementación autónomamente.

