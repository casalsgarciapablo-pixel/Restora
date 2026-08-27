/**
 * Datos con la MISMA forma que produce el Dashboard real de Restora.
 *
 * En la aplicación, ingresosPorPeriodo(pedidos, periodo) devuelve un tramo por hora / día / semana /
 * mes segun el periodo elegido, con { label, value }. AreaChart de Bklit necesita además una fecha
 * como eje X (xDataKey, "date" por defecto), así que aquí se acompaña de ella.
 */
export type TramoIngresos = { date: Date; label: string; value: number };

// Un día real de servicio: nada por la mañana, pico de comidas y pico de cenas.
const IMPORTES_POR_HORA = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18.4,
  96.5, 241.8, 187.3, 74.2, 22.6, 9.8, 41.5, 168.9, 314.2, 268.7, 121.4, 34.6,
];

export const ingresosDia: TramoIngresos[] = IMPORTES_POR_HORA.map((value, h) => ({
  date: new Date(2026, 6, 7, h),
  label: h + "h",
  value,
}));

export const totalDia = ingresosDia.reduce((a, t) => a + t.value, 0);
export const mediaDia = totalDia / ingresosDia.length;

// Lo que en el panel calcula compararConPeriodoAnterior(): este periodo contra el anterior.
export const tendenciaDia = 12.4;

export const fmtEur0 = (n: number) =>
  Math.round(n).toLocaleString("es-ES") + "€";
