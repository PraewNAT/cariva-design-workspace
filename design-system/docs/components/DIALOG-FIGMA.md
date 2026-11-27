# Dialog (Figma page Modal) — Figma specification

Read from Figma on 26 November 2026: [Modal](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4660-2223) (Cariva Core Design System file); all 52 colour points in the set are bound to variables in the file. The user told Claude to decide on its own while away; the names and props below are Claude's decisions and have not been confirmed.

## Sets in Figma (renamed; the original names are backed up in plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| New name | Original name | instances (before → after) |
|---|---|---|
| `dialog` | `crv-modal` | 3 → 3 |

The `type` prop changed to `align`: `default` → `start`, `alignCenter` → `center`; `breakpoint` (sm 320 / md+ 400), `showContent`, `showDescription`, `showIcon`, `icon`, `showCTA`, `contentSlot`, `ctaSlot` are unchanged. The text in the `📄 Modal Doc` frame has been renamed (and `type=` to `align=`).

## Spec

- Box: fill `on-surface/default`, corner radius 16, 1px `border/default` border, shadow `shadow/2xl`, width 320 (sm) / 400 (md+)
- Header: padding 24/16/16/16; `align=start` icon 28 (frame with corner radius 12, padding 4, icon 20) sits to the left of the text, `align=center` icon 44 (icon 36) sits above the text and is centred; title 20/28 SemiBold `content/primary`, description 14/20 `content/secondary`; icon `content/secondary`
- Content (slot): padding 16 gap 16
- Footer: fill `on-surface/subtle` padding 16 gap 8; sm buttons are stacked vertically at full width (primary button on top), md+ buttons are laid out horizontally and aligned right (secondary button before the primary button); button sm (32)
- Figma has no close (X) button

## Figma names ↔ Code

| Figma | Code |
|---|---|
| `dialog` | `Dialog` + `DialogContent` (`ui/dialog.tsx`) |
| `align` start / center | prop `align` of `DialogHeader` |
| `icon`, `showIcon` | prop `icon` of `DialogHeader` (omitted = not shown) |
| title / description | `DialogTitle` / `DialogDescription` |
| `contentSlot` | `DialogBody` |
| `ctaSlot` | `DialogFooter` |
| `breakpoint` sm / md+ | responsive in code (width 320 when narrow, 400 from md) |
| `showContent`, `showDescription`, `showCTA` | include or omit that part |

## Code (26 Nov 2026)

`DialogContent` switches to the layout per Figma (no padding around the box, the footer is a subtle-coloured bar) when the first child is a `DialogHeader`; if the direct child is not a header (e.g. a Dialog with a date picker inside) it still gets padding 16 on all sides and no bar, so existing examples are not affected

| Topic | Status |
|---|---|
| Corner radius 16, header padding 24/16/16, title 20/28/600, icon 28, footer `#F8FAFC` padding 16, white fill, shadow | matches (measured in story `FigmaDialog`) |
| `center` icon 44, width 320 / 400, vertical footer on mobile, icon colour | set per Figma, **not measured** |

**Decided by Claude:** keep the close (X) button as the default so the existing behaviour does not change (Figma has none; it can be removed with `showCloseButton={false}`)

**Impact:** the existing Dialog corner radius 24 → 16 (`--container-radius`), shadow changes to `shadow/2xl`, 1px border, the title is larger at 20/28; a Dialog that uses `DialogHeader` gets the bar-style layout
