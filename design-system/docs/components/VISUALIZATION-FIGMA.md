# Visualization — 25 Core chart recipes (Draft 2026-11-26)

[Source](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=7204-64878) · [Template documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=7303-35). Source contains25 card sets with desktop/mobile variants and25 standalone plot dependencies. The docs use Document Template4537:130394 / Blocks4537:130684 and50 linked card specimens; each retains its nested plot instance. Main components and property APIs are unchanged.

Implementation: `src/lib/app/components/app/visualization-chart.tsx` + scoped CSS. Core ownership: no Product-specific logic or Mira ownership indicator was found on this source page. Uses existing ChartContainer, ChartTooltip/ChartTooltipContent, Empty and Recharts3.8. Existing Chart primitives and ten legacy example stories remain available. All recipes and QA cases appear in Core/Components/Chart.

| Source recipes | Code variants |
|---|---|
| 01–12 Bar | basic-bar, multi-series-bar, striped-bar, dotted-bar, striped-solid-bar, gradient-3d-bar, gradient-bar, isometric-bar, dotted-solid-bar, duotone-bar, monochrome-bar, horizontal-bar |
| 13–18 Area/Line | striped-gradient-area, stacked-dashed-area, dotted-step-area, area-markers, forecast-line, crosshatch-stacked-area |
| 19–22 Donut/Pie | donut-total, donut-stats, pattern-pie, active-donut |
| 23–24 Radar | gradient-radar, filled-radar |
| 25 Radial | score-radial |

## Code contract

`VisualizationChart` requires `title` and `data`; optional `variant` defaults to basic-bar. `data` is an array of labelled numeric records: `{label:string, a?:number|null, b?:number|null, value?:number|null, ...}`. Cartesian/radar defaults use a/b; slices/radial use value. Optional `series` provides keys, labels and colors; defaults come from source recipes. Other props: className, totalLabel, statLabel, valueFormatter. No viewport prop is invented: width follows the caller's container. Figma viewport is a reference variant, not device detection.

```tsx
import {VisualizationChart} from '@/lib/app/components/app/visualization-chart';

<VisualizationChart
  variant="multi-series-bar"
  title="Monthly activity"
  data={[{label:'Jan',a:85,b:55},{label:'Feb',a:130,b:100}]}
  series={[{key:'a',label:'Series A'},{key:'b',label:'Series B'}]}
/>
```

Stacked area inputs are contributions, not cumulative totals. Null/non-finite numeric values become gaps. Pie values display nonnegative amounts; radial display clamps to0–100. Empty arrays show Core Empty. The component does not calculate forecasts, percentages of business activity, stat changes or clinical classifications. Mock fixtures live separately in visualization-chart.fixtures.ts and are imported only by stories.

## Visual and interaction rules

Card radius12px, border/default1px, padding16px, gap12px; title/axis/legend UI14/20px Regular. Plot height220px. Reference card width560/320px with min-height350px; four-item legends wrap to378px at320. Typography uses IBM Plex Sans Thai in source and observed browser. Colors use existing accent blue/teal/violet/orange A04 tokens; global chart palette is unchanged. Stripes, dots, hatching, gradients and depth faces are data-driven SVG/Recharts geometry, not screenshots of source plots.

Chart surface supports Recharts keyboard tooltip behavior. Active donut updates its center on slice focus/hover; all charts include a screen-reader data table with actual values. Axis labels truncate locally on narrow containers while full labels remain in the table/title attributes. Small Cartesian layouts reduce visible tick labels; legends wrap. No entrance animation delays data, and Recharts value animations are disabled in these recipes.

Parity limits: renderer-based spacing, pattern density, gradient interpolation and depth-face geometry are reconstructed recipes rather than a pixel-perfect export. Source area drawings have seven anchors with six separate month labels; mock data exposes a Start baseline followed by Jan–Jun so the additional point is explicit. Donut stat text is caller-supplied; +12.5% in stories is mock data. Default chart colors/patterns retain source appearance; passing automated accessibility checks does not certify every graphical contrast boundary or assistive technology.

## Code Connect status

Requested after implementation. `get_code_connect_suggestions` on the supplied selection returned **No published components found in this selection**. Per the Code Connect skill's publication prerequisite, connection/template generation stopped at discovery. Code Connect remains pending until the source components are published to a team library; no mapping was published. Existing parser-based button connection/configuration was not changed.

`VISUALIZATION-MAPPING.json` records the25 verified card nodes, runtime variants, title properties, source and docs. This is a local readiness mapping, not a published Code Connect connection. Next step after library publication: resolve published nodes, fetch Code Connect context, confirm correspondence and create/validate `.figma.ts` parserless templates using the installed skill. Do not connect a full card component to a standalone plot node; plot dependencies need a corresponding plot-only code export or must remain explicitly unmapped.

Validation and remaining work are recorded in VISUALIZATION-AUDIT.md; source and runtime evidence in output/visualization/.
