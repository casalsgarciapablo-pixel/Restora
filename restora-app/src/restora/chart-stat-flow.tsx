"use client";
import NumberFlow from "@number-flow/react";

/**
 * ChartStatFlow del ejemplo: etiqueta pequeña y cifra grande que transiciona dígito a dígito
 * (de ahí "flow"). Usa @number-flow/react, que ya viene como dependencia de @bklit/area-chart.
 */
export function ChartStatFlow({
  formatOptions,
  label,
  labelClassName,
  value,
  valueClassName,
}: {
  formatOptions?: Intl.NumberFormatOptions;
  label: string;
  labelClassName?: string;
  value: number;
  valueClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className={labelClassName}>{label}</span>
      <NumberFlow className={valueClassName} format={formatOptions} locales="es-ES" value={value} />
    </div>
  );
}
