"use client";
import type { ReactNode } from "react";

export const statCardLabelClassName = "text-xs font-medium text-muted-foreground leading-none";
export const statCardValueClassName =
  "text-[26px] font-bold tracking-tight tabular-nums leading-none";

/** Contenedor del gráfico dentro de la tarjeta. El tamaño fija la altura reservada. */
export function StatCardChart({
  size = "md",
  children,
}: {
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}) {
  const alturas = { sm: "h-24", md: "h-36", lg: "h-48" } as const;
  return <div className={`w-full ${alturas[size]} [&>*]:h-full`}>{children}</div>;
}
