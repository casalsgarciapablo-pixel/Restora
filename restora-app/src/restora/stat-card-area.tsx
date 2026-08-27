"use client";

import { LinearGradient } from "@visx/gradient";
import { curveCardinal } from "@visx/curve";
import { useCallback, useState } from "react";
import { Area, AreaChart } from "@/components/charts/area-chart";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartStatFlow } from "./chart-stat-flow";
import {
  StatCardChart,
  statCardLabelClassName,
  statCardValueClassName,
} from "./stat-card-chart";
import {
  formatStatCardLabel,
  StatCardHoverBridge,
  type StatCardHoverState,
} from "./stat-card-hover-bridge";
import { TrendBadge } from "./trend-badge";

export type TramoIngresos = { date: Date; label: string; value: number };
export type Periodo = "dia" | "semana" | "mes" | "anio";

const PERIODOS: { id: Periodo; texto: string }[] = [
  { id: "dia", texto: "Día" },
  { id: "semana", texto: "Semana" },
  { id: "mes", texto: "Mes" },
  { id: "anio", texto: "Año" },
];

export interface StatCardAreaProps {
  /** Tramos que devuelve ingresosPorPeriodo() en el panel. */
  revenueSeries: TramoIngresos[];
  /** Media de los tramos y tendencia del periodo frente al anterior. */
  revenueStats: { average: number; trend: number | null };
  currency: string;
  periodo: Periodo;
  onPeriodoChange: (p: Periodo) => void;
}

export function StatCardArea({
  revenueSeries,
  revenueStats,
  currency,
  periodo,
  onPeriodoChange,
}: StatCardAreaProps) {
  const [hover, setHover] = useState<StatCardHoverState>({
    value: null,
    label: null,
    trend: null,
  });
  const displayValue = hover.value ?? revenueStats.average;
  const displayLabel = hover.label ?? "Media";
  const displayTrend = hover.trend ?? revenueStats.trend;

  // Estable entre renders: si cambiara en cada uno, el efecto del puente se dispararía en bucle.
  const alCambiarHover = useCallback((e: StatCardHoverState) => setHover(e), []);

  return (
    <Card className="w-full gap-0 py-0 border-0 shadow-none bg-transparent">
      <CardHeader className="px-4 py-3">
        <CardTitle>Ingresos</CardTitle>
        <CardAction className="flex items-center gap-3">
          <div className="dash-seg">
            {PERIODOS.map((p) => (
              <button
                className={p.id === periodo ? "active" : ""}
                key={p.id}
                onClick={() => onPeriodoChange(p.id)}
                type="button"
              >
                {p.texto}
              </button>
            ))}
          </div>
          <TrendBadge value={displayTrend} />
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-4 pt-2 pb-3">
        <ChartStatFlow
          formatOptions={{
            currency,
            maximumFractionDigits: 0,
            style: "currency",
          }}
          label={displayLabel}
          labelClassName={statCardLabelClassName}
          value={displayValue}
          valueClassName={statCardValueClassName}
        />

        <StatCardChart size="md">
          <AreaChart
            aspectRatio="2.5 / 1"
            className="w-full"
            data={revenueSeries}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            xDataKey="date"
          >
            <StatCardHoverBridge
              dataKey="value"
              formatLabel={formatStatCardLabel}
              onHoverChange={alCambiarHover}
            />
            <LinearGradient
              from="var(--chart-1)"
              fromOpacity={0.45}
              id="stat-card-area-fill"
              to="var(--chart-1)"
              toOpacity={0}
              vertical
            />
            <Area
              curve={curveCardinal.tension(0.65)}
              dataKey="value"
              fill="url(#stat-card-area-fill)"
              fillOpacity={1}
              gradientToOpacity={0}
              showHighlight
              stroke="var(--chart-1)"
              strokeWidth={2}
            />
          </AreaChart>
        </StatCardChart>
      </CardContent>
    </Card>
  );
}
