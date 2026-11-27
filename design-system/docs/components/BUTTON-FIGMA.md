# Button — Figma specification

Checked from Figma on 26 November 2026: [Button](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3646-28000) (Cariva Core Design System file; initially read from the old "[Shadcn]" file, and the values used for comparison are the same)

Scope: `crv-button-standard`, 120 variants; excludes icon/loading/link/decorative, which are separate component sets (mic and split are done, see [BUTTON-MIC-FIGMA.md](BUTTON-MIC-FIGMA.md), [BUTTON-SPLIT-FIGMA.md](BUTTON-SPLIT-FIGMA.md)). This document records what was actually read from Figma and does not certify that the code is synced

## Anatomy and properties

Label (`children`), startIcon and endIcon as instance swaps, with Boolean startIconVisible/endIconVisible, both default true

| Property | Options found |
|---|---|
| variant | default (previously contained), outline (previously outlined), ghost (previously text), elevated |
| color | primary, destructive (previously error), secondary (previously neutral) |
| state | default, hover, pressed, disabled |
| size | sm (previously small), default (previously medium), lg (previously large) |

The values above are not every combination that actually exists: 120 variants out of 144 possible combinations; use the variants that exist and do not create extra props merely for the mapping

Values renamed in Figma on 26 November 2026 (120 variants, the set renamed to `button`, all 313 instances still linked). The original names are backed up in the component set's plugin data (`oldNames_2026-11-26`); the appearance did not change

## Figma fixes (27 November 2026)

After an audit of all 120 variants, at the user's request:
- Linked the label of the 36 `secondary` variants (outline, ghost, elevated) to the `children` text property; all 120 are now linked
- Applied the `typography/label/large` text style to the 40 `size=default` labels (previously no style, weight bound to `label/medium`)
- Compared the 86 instances in this file before and after: no change in text, typography, size or label fill. 10 File Upload instances had their text re-set through `children` to keep it. Instances in other files that use the library were not checked

## Sizes

| Size | Height | Font / line-height | Padding vertical / horizontal | Gap |
|---|---|---|---|---|
| small | 32px | 12 / 16px | 8 / 12px | 4px |
| medium | 40px | 16 / 24px | 8 / 16px | 8px |
| large | 48px | 16 / 24px | 12 / 24px | 12px |

IBM Plex Sans Thai Medium; radius 9999 (pill); node opacity 100% in every recipe read. The example widths 94/136/160px are not a fixed-width contract

## Colors and states

Refer to the semantic variables that are bound; do not hardcode from the hex values below, which are only values observed in the file

- Contained primary: default #1789FA, hover #0F70E6, pressed #135ABA; white label
- Contained error: default #DC2626, hover #B91C1C, pressed #991B1B; white label
- Outlined primary: default no fill, stroke #2DA4FF, label #1789FA; hover fill #EEF9FF, pressed #D8F0FF
- Text primary: no stroke; hover/pressed use a light fill per state
- Outlined neutral: stroke #CBD5E1, label #0F172A; hover #F8FAFC, pressed #F1F5F9
- Elevated primary/neutral: default white fill; pressed #E2E8F0. This document does not go into effect/shadow details yet
- Disabled: label #94A3B8; contained/outlined/elevated fill #F1F5F9 and no stroke; text has no fill. It is not a reduced opacity of the whole component

Colors must be separated by variant/color/state; do not use primary and neutral interchangeably just because both look like outlines

## Current code and differences (updated 26 November 2026 after the code fix)

Implementation source: `src/lib/app/components/ui/button.tsx`; code documentation: `ButtonSource.mdx`; naming table: `FIGMA-NAMING.md`

| Topic | Figma | Code | Status |
|---|---|---|---|
| Sizes sm / default / lg | height 32 / 40 / 48, font 12/16 / 16/24 / 16/24, padding 8/12 / 8/16 / 12/24, gap 4 / 8 / 12 | measured in Storybook, the same values for all | Matches (measured) |
| variant × color | default, outline, ghost × primary, destructive, secondary | props `variant` and `color` with the same names | Matches, except elevated |
| Colors of contained primary/destructive, outline ring for all 3 colors, ghost text, disabled | bound to semantic variables | bound to `--cds-*` generated from tokens.json; default colors measured and match, and hover of contained primary matches (#0F70E6) | Matches (measured as stated) |
| Disabled | semantic colors, opacity 100% | uses the Figma colors and opacity 1 for default/outline/ghost | Matches |
| Radius | pill | `--button-radius` = full in the carivaApp theme, measured 9999px | Matches, in carivaApp |
| elevated | exists, with `shadow/sm` shadow (hover `shadow/xl`, pressed `shadow/md`, disabled none) | `variant="elevated"` + `color` primary / secondary (26 Nov 2026) | White fill (pressed `on-surface/action/pressed`); text is primary `brand/primary/content/default` (pressed `…/strong`) or secondary `neutral/content/default`; shadows use `--cds-shadow-*`; measured: white fill, text color, normal shadow, disabled has no shadow; hover shadow measured with a real mouse in the browser and matches `shadow/xl`; pressed shadow and pressed colors **not yet measured** |
| contained + neutral | exists only in the `button-icon` set (fill `neutral/on-surface/default`) | `variant="default" color="secondary"` uses the neutral colors per Figma (previously used the shadcn `secondary` look) | Matches (measured 26 Nov) |
| loading, icon, link, decorative | separate component sets (`button-loading`, `button-icon`, `button-link`, `button-decorative`) | see [BUTTON-SETS-FIGMA.md](BUTTON-SETS-FIGMA.md) | Matches (measured 26 Nov) |

Not yet measured: hover/pressed of outline and ghost for every color, pressed for every kind, icon sizes of the icon set. Impact on other components: the outline border changes from gray to the color per `color`, and the sm size changes; used in dialog, toast, calendar, combobox, sheet, sidebar. Ghost used as a general button sets `color="secondary"` to keep the text color neutral

## What still needs checking

Focus-visible/keyboard, accessible name for icon-only, per-state contrast, behavior while loading and the pressed shadow of elevated are not yet certified by this reading. Figma states do not prove runtime behavior. The code uses the `loading` prop (disabled + aria-busy + Spinner) per the implementation docs

When the component changes, read the latest source, compare this document and ButtonSource.mdx, then update only the confirmed facts. Check parity before concluding that it is synced
