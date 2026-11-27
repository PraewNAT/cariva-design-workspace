# Tag — Figma specification

Read from Figma on 26 November 2026: [Tag](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3918-824) (Cariva Core Design System file). The user confirmed the names as proposed by Claude. This page already has a `Documentation Card` frame; prop names and numbers that were wrong against the real Figma were fixed (original text backed up in `docText_2026-11-26`)

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | prop | instances (before → after) |
|---|---|---|---|
| `tag` | `crv-tag-standard` | `variant` filled / outlined, `color` default / secondary / error / success / warning, `content` label / count (previously `children` label / number), `size` sm / default / lg (previously small / medium / large), `startIconVisible`, `endIconVisible`, `label`, `badgeContent` | 13 → 13 |
| `tag-color` | `crv-tag-color` | `color` primary / sky / cyan / pink / purple / emerald / amber / orange | 9 → 9 |

## Spec

- `tag` text label: sm height 20, default height 24, lg height 36 · horizontal padding 8 (lg 12), gap 4 · 12/16 Medium (lg 14/20) · icon 12
- `tag` number label (`content=count`): circle 20 / 24 / 32, padding 2/4
- filled: default `brand/primary/on-surface/default` + `brand/primary/content/on-fill` · secondary `on-surface/sunken` + `content/primary` · error / success / warning `status/*/on-surface/default` + `status/*/content/on-fill`
- outlined (only in the default color): transparent, border 1px `border/default`, text `content/primary`
- `tag-color`: height 20, padding 2/8, gap 4, 12/16 Medium · fill `accent/{color}/A02`, text `accent/{color}/A05` · primary uses `brand/primary/on-surface/muted` and `brand/primary/content/strong`

**Fixed docs that were wrong against Figma:** the old doc said tag-color height 22, fill A01, text A04, has a grey color and tag sizes 20 / 26 / 38; the real Figma is 20, A02, A05, no grey and 20 / 24 / 36

## Figma name ↔ Code

| Figma | Code |
|---|---|
| `tag` | `Tag` (`ui/tag.tsx`; `variant`, `color`, `size`, `content`, `startIcon`, `endIcon`) |
| `content=count` | `content="count"` (circle, no icon shown) |
| `tag-color` | `TagColor` (`color`, `startIcon`, `endIcon`) |
| `label`, `badgeContent` | children |
| `startIconVisible`, `endIconVisible` | include or omit `startIcon` / `endIcon` |

## Code (26 Nov 2026)

Stories under `Core/Components/Tag`: `Filled` (all 5 colors × 3 sizes), `Outlined`, `Count`, `WithIcons`, `ColorTags`

| Topic | Status |
|---|---|
| Height 20 / 24 / 36, padding 8 / 12, 12/16 and 14/20 | matches (measured) |
| All 5 filled colors, outlined border, outlined text | matches (measured) |
| Round count 20 / 24 / 32 | matches (measured) |
| Icon 12 and gap 4 | matches (measured) |
| tag-color: height 20, fill colors for primary and sky, text color for sky | matches (measured) |
| lg icon size (I set it to 16), colors of the remaining 6 tag-color colors | set per token, **Not measured** |

**Impact:** a new component, so existing ones are not affected (Badge is a counter/dot; Chip is the clickable kind)

**Not yet checked:** the real icons from Figma (uses the svg the user supplied), long text that wraps
