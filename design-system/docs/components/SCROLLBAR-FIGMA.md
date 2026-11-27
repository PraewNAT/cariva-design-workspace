# Scrollbar — Figma specification

Read from Figma on 26 November 2026: the Browser Scroll page (`4164:182`), set `scrollbar` (`4164:476`) in the Cariva Core Design System file. The user confirmed as Claude proposed. The `Documentation Card` doc frame (`7308:122015`) is on this page

## Set in Figma (values fixed 26 Nov 2026; original names backed up in plugin data `oldVariantNames_2026-11-26`)

| Set name | Values | instance before → after |
|---|---|---|
| `scrollbar` (originally `crv-browser-scroll`) | `orientation` vertical / horizontal, `end` false / true, `track` true / false (originally `bg`) | 6 → 6 |

The original `orientation` values were misnamed: `Horizontal` / `Orientation` was the vertical bar (15×200) → `vertical`, and `Vertical` / `Orientation4` was the horizontal bar (200×15) → `horizontal`. Also fixed the thumb position of `horizontal / end=true / track=false` (it was at the start of the bar; it is now at the end of the bar like the other variants)

## Spec

Track 15px (vertical 15×200, horizontal 200×15), padding 4px, thumb 7px wide, color `slate/500` (`#64748B`), fully rounded · `track=true` track fill `slate/100` (`#F1F5F9`) · `end` means the thumb is at the end of the bar (scrolled to the end)

## Figma names ↔ Code

| Figma | Code |
|---|---|
| `scrollbar` | `ScrollBar` and `ScrollArea` (`ui/scroll-area.tsx`) |
| `orientation` | `orientation` of `ScrollBar` (`vertical` / `horizontal`); `ScrollArea orientation` `vertical` / `horizontal` / `both` |
| `track` | `track` (background `--cds-on-surface-sunken`) |
| `end` | No prop (the scroll position reached) |

## Code (26 Nov 2026)

| Item | Status |
|---|---|
| Track 15px, padding 4px, thumb 7px wide fully rounded, thumb color `#64748B`, track fill `#F1F5F9` when `track` (vertical and horizontal) | matches (measured in story `Scrollbars`) |
| Overall comparison with Figma | checked visually (matches) |

**Impact:** it was previously 10px wide with a light gray thumb; it is now 15px wide with a darker thumb. `ScrollArea` gains the `orientation` prop (default `vertical` as before) and `track`; the scrollbar appearance changes everywhere `ScrollArea` is used

**Decided by Claude / confirmed by the user:** Figma binds the colors `slate/500` and `slate/100` directly to Foundation variables (no semantic). The code uses semantics with equal values (`--cds-content-placeholder`, `--cds-on-surface-sunken`). **Asking the DS team to decide on creating scrollbar tokens** (I do not create them myself; per the new color rule, the team must be told first)

**Not yet measured:** hover and auto-hiding of the thumb (no design), behavior when both bars are present at once (`orientation="both"`), the corner where the two bars meet
