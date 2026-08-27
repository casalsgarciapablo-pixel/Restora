"use client";
import { useEffect } from "react";
import { useChart } from "@/components/charts/chart-context";

export type StatCardHoverState = {
  value: number | null;
  label: string | null;
  trend: number | null;
};

/**
 * Puente de hover: no pinta nada. Vive dentro de <AreaChart> para poder leer su contexto y avisar a
 * la tarjeta de qué punto se está señalando, que es lo que hace que la cifra y el distintivo de
 * arriba cambien con el puntero.
 */
export function StatCardHoverBridge({
  dataKey,
  formatLabel,
  onHoverChange,
}: {
  dataKey: string;
  formatLabel: (punto: Record<string, unknown>) => string;
  onHoverChange: (estado: StatCardHoverState) => void;
}) {
  const { tooltipData, data } = useChart();

  useEffect(() => {
    if (!tooltipData) {
      onHoverChange({ value: null, label: null, trend: null });
      return;
    }
    const i = tooltipData.index;
    const valor = Number(tooltipData.point[dataKey]);
    // La tendencia de un punto es su variación respecto al tramo anterior. El primero no tiene con
    // qué compararse y se queda sin distintivo.
    const previo = i > 0 ? Number(data[i - 1]?.[dataKey]) : Number.NaN;
    const trend =
      Number.isFinite(previo) && previo > 0 ? ((valor - previo) / previo) * 100 : null;
    onHoverChange({ value: valor, label: formatLabel(tooltipData.point), trend });
  }, [tooltipData, data, dataKey, formatLabel, onHoverChange]);

  return null;
}

/** En Restora el tramo puede ser una hora, un día, una semana o un mes: la etiqueta ya viene hecha. */
export function formatStatCardLabel(punto: Record<string, unknown>) {
  return String(punto.label ?? "");
}
