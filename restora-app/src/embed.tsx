/**
 * Puente entre el panel de Restora (HTML + JS plano) y la tarjeta React.
 *
 * Se compila como un solo archivo IIFE con React dentro y el CSS inyectado, así el panel solo tiene
 * que cargar un script y llamar a window.RestoraRevenueCard.mount(). No hay nada que instalar en el
 * lado del panel ni cambios en su forma de desplegarse.
 */
import { createRoot, type Root } from "react-dom/client";
import { StatCardArea, type Periodo, type TramoIngresos } from "./restora/stat-card-area";
import "./embed.css";

type Datos = {
  series: { date: string | number; label: string; value: number }[];
  average: number;
  trend: number | null;
  currency: string;
  periodo: Periodo;
  onPeriodoChange: (p: Periodo) => void;
};

const raices = new WeakMap<Element, Root>();

function mount(el: Element, datos: Datos) {
  const series: TramoIngresos[] = datos.series.map((t) => ({
    date: new Date(t.date),
    label: t.label,
    value: t.value,
  }));
  // Se reutiliza la raíz del contenedor: crear una nueva en cada repintado dejaría la anterior
  // montada y duplicaría los escuchadores de eventos.
  let root = raices.get(el);
  if (!root) {
    root = createRoot(el);
    raices.set(el, root);
  }
  root.render(
    <StatCardArea
      currency={datos.currency}
      onPeriodoChange={datos.onPeriodoChange}
      periodo={datos.periodo}
      revenueSeries={series}
      revenueStats={{ average: datos.average, trend: datos.trend }}
    />
  );
}

function unmount(el: Element) {
  const root = raices.get(el);
  if (root) {
    root.unmount();
    raices.delete(el);
  }
}

export { mount, unmount };
