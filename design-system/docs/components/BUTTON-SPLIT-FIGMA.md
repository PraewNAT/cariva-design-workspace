# Button Split — Figma specification

Read from Figma on 26 November 2026: set `button-split` (previously `crv-button-split`, node `5981:34184`, Button page in the Cariva Core Design System file). The user confirmed the name and API as proposed by Claude. Usage documentation is in the `Button Doc (Template)` frame on the Button page (split section).

## Sets in Figma (renamed; the original names are backed up in plugin data `oldName_2026-11-26` / `oldVariantNames_2026-11-26`)

| New name | Original name | Changed prop | Instances before → after |
|---|---|---|---|
| `button-split` | `crv-button-split` | `color` primary / error → `primary` / `destructive`; `size` large / medium / small → `lg` / `default` / `sm` | 3 → 3 |

Other props are unchanged: `state` default / hover / pressed / disabled, `startIconVisible`, `startIcon`, `endIcon`, `children` (text)

## Spec (read from Figma variables)

- Pill shape (fully rounded corners) composed of the main button (`action`) + a 1px divider (`divider`) + the menu button (`trigger`), height 48 / 40 / 32 (lg / default / sm)
- Main button: lg padding 12/24 gap 12 text 16/24 Medium icon 24 · default padding 8/16 gap 8 text 16/24 icon 24 · sm padding 8/12 gap 4 text 12/16 icon 16
- Menu button: a square the same as the height (48 / 40 / 32), padding 12 / 8 / 8, icon 24 / 24 / 16
- primary colour: fill `brand/primary/on-surface/default` (hover `/hover`, pressed `/pressed`), text and icon `brand/primary/content/on-fill`, divider `brand/primary/border/strong`
- destructive colour (Figma error): fill `status/error/on-surface/default` (hover / pressed per the names), text `status/error/content/on-fill`, divider `status/error/border/strong`
- hover / pressed change the colour of the whole pill (not only the half being pointed at)
- disabled: fill `on-surface/action/disabled`, text and icon `content/disabled`, divider `border/disabled`

## Figma names ↔ Code

| Figma | Code |
|---|---|
| `button-split` | `ButtonSplit` (`ui/button-split.tsx`), uses the existing Base UI `Button` + `DropdownMenu` |
| `color` | `color`: `primary` / `destructive` |
| `size` | `size`: `sm` / `default` / `lg` |
| `state=disabled` | `disabled` |
| `children` | `children` |
| `startIcon` | `startIcon` |
| `endIcon` | `endIcon` (default `ChevronDownRounded`) |
| menu items | `menu` (the caller passes `DropdownMenuItem`) |
| `state=hover / pressed` | CSS (`hover:` / `active:` on the pill) |

## Code (26 Nov 2026)

| Topic | Status |
|---|---|
| Height 48 / 40 / 32, square menu button, padding and text size of the main button at every size, icon 24 / 16 | matches (measured in story `FigmaSpecs`) |
| primary fill `#1789FA` / destructive `#DC2626`, divider colour `#2DA4FF` / `#EF4444` 1px wide, white text | matches (measured) |
| disabled: fill `#F1F5F9`, text `#94A3B8`, divider `#F1F5F9` | matches (measured) |
| hover primary `#0F70E6` on the whole pill | matches (measured in the browser with a real mouse) |
| Overall comparison against Figma | checked visually (matches) |
| Open the menu, select with the keyboard, Escape closes, pressing the main button calls `onAction` | checked in stories `Default` / `Action` |

**Decided by Claude / user confirmed:** the default menu button icon is a down chevron (Figma uses a right arrow as a sample that can be swapped via `endIcon`) · `error` is renamed to `destructive` to match `Button` · there is no `loading` state (Figma has none)

**Impact:** this is a new component and does not affect existing code · renaming the sets in Figma, all 3 instances are still in place

**Not measured:** the pressed colour and hover of destructive (set per token), rendering with very long text (Figma has no design for it), the position of the opened menu when it sits at the screen edge
