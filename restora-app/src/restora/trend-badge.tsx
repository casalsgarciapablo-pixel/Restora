/**
 * El TrendBadge del ejemplo no viene en el registro de Bklit (es de su aplicación de demostración),
 * así que se reproduce aquí con el mismo aspecto que el distintivo del panel de Restora.
 */
export function TrendBadge({ value }: { value: number | null }) {
  if (value == null || !Number.isFinite(value)) {
    return (
      <span className="rounded-full px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
        Sin comparativa
      </span>
    );
  }
  const r = Math.round(value);
  const sube = r > 0;
  const baja = r < 0;
  const tono = sube
    ? "text-emerald-700 bg-emerald-50"
    : baja
      ? "text-rose-600 bg-rose-50"
      : "text-muted-foreground bg-muted";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${tono}`}>
      {sube ? "▲" : baja ? "▼" : "•"} {Math.abs(r)}%
    </span>
  );
}
