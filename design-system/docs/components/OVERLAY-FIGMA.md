# Overlay — Figma specification

Read from Figma on 26 November 2026: [Overlay](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4716-64196) (Cariva Core Design System file). For this work the user told me to decide on my own while away (the names and props below are Claude's decisions and have not been confirmed)

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | instance (before → after) |
|---|---|---|
| `overlay/sm` (390×844) | `crv-overlay/sm` | 2 → 2 |
| `overlay/md+` (1440×900) | `crv-overlay/md+` | 1 → 1 |

The original-name text in the `Doc — overlay` frame has been changed (5 places, including the Modal page). Both are full-screen rectangles with no props

## Spec

- Fill `overlay/backdrop` (black 40% = `#00000066`), sized to the frame (sm mobile, md+ tablet/desktop), no blur
- Used together with Modal, Drawer and Bottom Sheet, placed at the very bottom; do not adjust the opacity or color yourself
- The Figma documentation notes that there is no strong variant yet (`overlay/backdrop/strong`, black 60%) — the token already exists in `tokens.json`

## Figma names ↔ Code

| Figma | Code |
|---|---|
| `overlay/sm`, `overlay/md+` | `DialogOverlay`, `SheetOverlay` (size follows the real screen, no props) |

## Code (26 Nov 2026)

The fill of `DialogOverlay` and `SheetOverlay` changed from `bg-black/80` + blur to `--cds-overlay-backdrop` (black 40%) with no blur

| Item | Status |
|---|---|
| `rgba(0,0,0,0.4)` color of the Dialog overlay | matches (measured in story `FigmaDialog`) |
| Sheet overlay | same value set, **not measured** |

**Impact:** the backdrop when opening a Dialog or Sheet is lighter (black 80% to 40%) and no longer blurred, everywhere it is used
