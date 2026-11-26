import { Area, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/lib/app/components/ui/chart";

export type TrendPoint = { label: string; value: number | null; comparison?: number | null };
const config = {
  value: { label: "ผลตรวจ", color: "var(--chart-1)" },
  comparison: { label: "เปรียบเทียบ", color: "var(--chart-2)" },
} satisfies ChartConfig;

/** Shared trend composition; callers own data and accessible summaries. */
export function TrendChart({ data, label, unit = "", valueLabel = "ผลตรวจ", comparisonLabel = "เปรียบเทียบ", comparison = false, domain }: {
  data: TrendPoint[]; label: string; unit?: string; valueLabel?: string; comparisonLabel?: string; comparison?: boolean; domain?: [number, number];
}) {
  return <ChartContainer config={{ ...config, value: { ...config.value, label: valueLabel }, comparison: { ...config.comparison, label: comparisonLabel } }} className="h-full min-h-40 w-full aspect-auto" role="img" aria-label={label}>
    <ComposedChart accessibilityLayer data={data} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} tick={{ fontSize: 12 }} />
      <YAxis domain={domain} tickLine={false} axisLine={false} width={40} tick={{ fontSize: 12 }} />
      <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => <span>{name === "value" ? valueLabel : comparisonLabel}: {value == null ? "ไม่มีข้อมูล" : String(value)} {unit}</span>} />} />
      <Area type="monotone" dataKey="value" stroke="var(--color-value)" fill="var(--color-value)" fillOpacity={0.14} strokeWidth={2} connectNulls={false} isAnimationActive={false} />
      {comparison && <Line type="monotone" dataKey="comparison" stroke="var(--color-comparison)" strokeDasharray="5 5" strokeWidth={2} dot={false} connectNulls={false} isAnimationActive={false} />}
    </ComposedChart>
  </ChartContainer>;
}
