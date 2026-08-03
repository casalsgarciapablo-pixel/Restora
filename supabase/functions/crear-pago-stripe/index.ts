// Crea una sesion de Stripe Checkout (modo test si STRIPE_SECRET_KEY es sk_test_...) para cobrar
// un pedido con tarjeta. El navegador nunca ve ni maneja datos de tarjeta: se redirige a una pagina
// alojada por Stripe (cumple PCI-DSS por diseno, sin que este proyecto tenga que certificarse).
import Stripe from "https://esm.sh/stripe@14?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", { apiVersion: "2023-10-16" });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { user_id, pedido_id, importe, moneda, mesa, origin } = await req.json();
    if (!user_id || !pedido_id || !importe || !(importe > 0) || !origin) {
      return new Response(JSON.stringify({ error: "Faltan datos para crear el cobro." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const MONEDAS_VALIDAS = ["eur", "usd", "mxn"];
    const divisa = MONEDAS_VALIDAS.includes(String(moneda).toLowerCase()) ? String(moneda).toLowerCase() : "eur";
    const centimos = Math.round(Number(importe) * 100);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: divisa,
            product_data: { name: "Cuenta " + (mesa || "") },
            unit_amount: centimos,
          },
          quantity: 1,
        },
      ],
      metadata: { user_id: String(user_id), pedido_id: String(pedido_id) },
      success_url: origin + "?pago=exito&pedido=" + encodeURIComponent(pedido_id),
      cancel_url: origin + "?pago=cancelado&pedido=" + encodeURIComponent(pedido_id),
    });
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e && e.message ? e.message : e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
