# Progress — Draft 26/11/2026

[Figma source](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4456-16544) · [Figma docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4721-88932). Docs use Document Template `4537:130394`/Blocks `4537:130684`, with 36 linked specimens for Core linear/circular Progress. Credit Badge belongs to Mira and now has separate Product documentation. Main component names, properties and geometry remain unchanged.

Implementation: `ui/progress.tsx` and scoped `progress.css`. Storybook `Core/Components/Progress` contains linear and circular examples together.

- `Progress`: existing Base UI root props and exports remain; adds `variant` determinate/indeterminate/buffer, `color` primary/error/success/warning and `bufferValue`. Omitted/null `value` defaults to indeterminate; explicit determinate without a value displays the minimum. Values clamp to min/max; invalid max≤min normalizes to min+100. Non-finite values display min. Buffer is at least loaded value and clamps to the same range.
- Default linear track is 4px, full radius, fills its container. Figma specimen width240px is a reference, not a fixed Product width. Colors use existing brand-primary/status on-surface default/subtle/muted roles. `ProgressTrack`, `ProgressIndicator`, `ProgressLabel`, `ProgressValue` remain exported; text14/20px.
- `CircularProgress`: value/min/max/color, `variant` determinate/indeterminate; `size` sm/default/lg maps to Figma small/medium/large24/40/56px. Ring geometry follows source inner radius0.75 (stroke12.5 on100 viewBox). No circular buffer. SVG arcs represent progress, not an extracted static icon.
- Linear indeterminate uses1.4s linear transform travel; circular uses1s spin. Value transitions200ms ease-out. Reduced-motion removes travel/spin and value transitions, retaining a static segment and progress semantics. No timer invents progress. Consumers provide an accessible name.

Shared impact: Stepper and catalog now use4px default tracks. FileUpload's existing3px scoped override is preserved and regression tested. Both page and Dialog use the same primitive; widths follow available container while circular sizes stay fixed. Physical OS preference and all assistive-technology combinations are not certified; see PROGRESS-RADIO-RATING-AUDIT.md.

Credit Badge is Mira Product DS; see [Mira Credit Badge](../products/mock-mira/CREDIT-BADGE.md). Core Progress now has six stories; its primitive behavior is unchanged by the ownership move.

## Renaming sets in Figma (26 Nov 2026, user confirmed as proposed)

| New name | Original name | Changed props | instance |
|---|---|---|---|
| `progress` | `crv-linear-progress` | — | 22 → 22 |
| `circular-progress` | `crv-circular-progress` | `size` small / medium / large → `sm` / `default` / `lg` | 24 → 24 |
| `credit-badge` | `crv-credit-badge` (7089:1151, compact) | `size` medium / small → `default` / `sm` | 16 → 16 |
| `credit-badge-usage` | `crv-credit-badge` (7094:365, remaining / used) | `Show icon` → `showIcon` | 9 → 9 |
