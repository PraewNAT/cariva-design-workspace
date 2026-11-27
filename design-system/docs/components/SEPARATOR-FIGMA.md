# Separator — Figma specification

Read from Figma on 26 November 2026: Divider page (`4677:9992`) in the Cariva Core Design System file. The user confirmed the names as proposed by Claude. The `Documentation Card` doc frame (`7308:121839`) is on this page.

## Sets in Figma (merged into a single set on 26 Nov 2026)

| New name | Original name | prop | instances before → after |
|---|---|---|---|
| `separator` (`7308:121838`) | `divider-horizontal` (`4677:10310`) + `divider-vertical` (`4677:10311`) | `orientation` horizontal / vertical | 7 → 7 |

The two components were merged into a single set with `orientation` to match `Separator` in code. The line color is bound to the `border/default` variable (previously unbound; same value `#E2E8F0`). Original names backed up in plugin data `oldName_2026-11-26`.

## Spec

1px line, color `border/default` · `horizontal` fills the available width (example 220×1) · `vertical` fills the available height (example 1×220)

## Figma name ↔ Code

| Figma | Code |
|---|---|
| `separator` | `Separator` (`ui/separator.tsx`, Base UI Separator) |
| `orientation` | `orientation` `horizontal` / `vertical` |

## Code (26 Nov 2026)

| Topic | Status |
|---|---|
| Horizontal 220×1 and vertical 1×220, line color `#E2E8F0` (`border/default`) | matches (measured in story `Orientations`) |

The code already matches Figma, so nothing was changed. The code adds a story `Orientations`. Position and spacing around the line are the caller's responsibility.
