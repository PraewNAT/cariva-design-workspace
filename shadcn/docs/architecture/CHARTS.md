# Charts

The current chart baseline is official shadcn Chart + Recharts3.8.0. This supersedes Chart.js. The registry component is `src/lib/app/components/ui/chart.tsx`; Card was retained unchanged during installation. Core/Components/Chart contains Bar, Area, Line, Pie, Radar, Radial, Compact and Keyboard Tooltip examples with visible source.

Compose Recharts primitives inside ChartContainer with a ChartConfig. Give each series a label and semantic CSS color (for example `var(--chart-1)`). Reuse ChartTooltipContent and ChartLegendContent. Set an explicit height or minimum height on the container; ResponsiveContainer then observes available width. Legend wraps. Labels/tooltips are at least12px and inherit the Product UI font. Preserve reduced-motion preferences when adding animations; the current examples disable animation.

TrendChart in `src/lib/app/components/app/TrendChart.tsx` is the shared composition used by Dashboard workload and Lab result details. It accepts labelled points, optional comparison, unit, names and a numeric domain. Nulls remain gaps. Feature controllers own selection/filter/export state; Recharts owns rendering and resize lifecycle.

HealthRadar uses the same Chart primitives,0–100 domain and existing fixtures. Its custom SVG shape draws open segments for missing data because default Recharts Radar maps null to radius zero. The unmeasured domain remains on the axes and accessible score table. Labels use the existing short multi-line names on mobile. Previous-period toggle and table controls remain.

No new palette was installed: chart variables already map to Figma semantic values. The25 decorative Figma charts remain design references; this migration implements six official basic chart examples and three active chart consumers, not25 runtime decorative variants. Figma sync was not part of this change.

Validated app/Storybook builds, tokens and39/39 story file coverage. All91 story interaction/render tests pass. Accessibility scans retain existing DS color-contrast findings; they do not establish full AA conformance. Storybook remains on localhost6008.
