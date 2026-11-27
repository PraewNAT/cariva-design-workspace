# Tooltip — Core (Draft, 2026-11-26)

Source page `4167:286`: Standard set `4167:398` has five arrow-edge placements; With Action set `4167:3485` has eight. The existing [Core documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4716-60403) now uses Document Template `4537:130394` / Blocks `4537:130684`, with all13 linked specimens. Mira is documented separately.

Standard uses `ui/tooltip.tsx`: Tooltip, TooltipTrigger, TooltipContent and TooltipProvider. Content supports Base UI popup props plus side, align, offsets and showArrow. The default offset is8px; body padding4/8px, radius4px, UI12/16px Medium, content/inverse on content/primary. Arrow uses the original12x6 SVG; none uses showArrow=false. Side names describe popup side; legacy Figma placement names describe arrow edge (Figma top maps to side bottom). Positioning may flip at viewport edges.

Tooltip wrapper explicitly connects open content to trigger using a generated id, role=tooltip and aria-describedby. Hover/focus/Escape and collision handling remain Base UI behavior. Disabled native buttons should be wrapped in a focusable explanatory trigger when help is needed; do not place interactive actions inside text-only tooltips.

`app/tooltip-with-action.tsx` composes Core Popover, Button and Badge. Props: trigger, children, step, placement, onBack/onNext, backDisabled/nextDisabled, open/defaultOpen/onOpenChange, label. Placement follows Figma arrow edge (top/bottom/start/end/left/right), converted to popup side internally. Width240px with viewport max-width; body min112px with padding12/16, footer min56px with padding12/8; radius16. Long text grows vertically. Step uses primary/muted and secondary text. Back/Next reuse sm Buttons. The caller owns step progression; no tour engine or business flow is implied. Popover dialog semantics allow keyboard access to buttons and Escape returns focus.

Standard entry/exit uses180ms opacity/2px transform with reduced-motion override and instant focus handling. Mira-specific messages, balances, dates and credit rules live in `lib/products/mock-mira`, never imported by Core. Core has nine stories (including `FigmaSpecs`); Mira has six under its own Product group.

Figma/UI font observed: IBM Plex Sans Thai. Main component property APIs and variant geometry remain unchanged. Template containers alone were detached; actual specimens retain links. Core docs text and all specimens meet12px minimum. Known contrast: shared primary guide buttons still fail normal-text AA (about3.2–3.5:1); source color is retained and the gap is recorded in TOOLTIP-AUDIT.md.

## Sets in Figma (renamed 26 Nov 2026; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | instances (before → after) |
|---|---|---|
| `tooltip` (`placement` top / bottom / left / right / none = the edge where the arrow sits) | `crv-tooltip-standard` | 5 → 5 |
| `tooltip-with-action` (`placement` 8 variants, text `step`, `content`) | `crv-tooltip-with-action` | 8 → 8 |
| `credit-tooltip` (`status`, `placement`, `balance`, `validUntil`, `costHintVisible`) | `mira-tooltip-credit` | 9 → 9 |

Prop names and variable values are unchanged (they already match the code, except `Tooltip`, where the code uses Base UI `side`: Figma `top` = `side=bottom`). Every color in the sets is already bound to variables in the file; the only things still bound to the old library are the header (`_Block Header`) and the check icon of the doc frame, which were not touched

## Fixed in the rename pass (26 Nov 2026)

| Topic | Status |
|---|---|
| tooltip fill and arrow bound to `on-surface/invert` (previously `content-primary`, the same color), the guide's button-area fill bound to `on-surface/sunken` | matches (measured in story `FigmaSpecs`) |
| Back icon = `ArrowBackRounded`, Next = `ChevronRightRounded` (copied from Figma) | matches (checked visually) |
| tooltip height 24, padding 4/8, corner radius 4, text 12/16 Medium, fill `#0F172A`, white text | matches (measured) |
| guide width 240, height 168, corner radius 16, content area 112 (padding 12/16), button area 56 (padding 12/8), buttons 32 high | matches (measured; the Back button width differs from Figma by at most 1px due to the font) |
| credit-tooltip: height 60 / 82 / 82, width 208 (placement none), cost-hint 10px `#94A3B8`, gap 2, low text `#D97706`, depleted `#DC2626` | matches (measured) |

**Decided by Claude / user confirmed:** keep the `side` prop of `Tooltip` and do not add `placement` (user confirmed as proposed) · credit-tooltip reverted to the Figma values, which makes the cost-hint smaller than 12px (Figma wins)

**Impact:** credit tooltip: cost-hint shrinks from 12px to 10px, gap narrows from 4 to 2px, depleted text changes from `#EF4444` to `#DC2626` · the guide's Back/Next buttons change icon shape

**Not measured:** hover/pressed colors of the guide's buttons (uses the Button already measured on the Button page), pixel comparison of the guide's arrow position on all 8 sides (checked visually in `ActionPlacements`)
