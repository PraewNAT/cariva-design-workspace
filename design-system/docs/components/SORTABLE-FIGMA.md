# Sortable — Figma specification

Read from Figma on 26 November 2026: [Sortable](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=7204-63931) (Cariva Core Design System file). The user confirmed the names and the addition of `@dnd-kit`. The `Documentation Card` doc frame (node `7223:102514`) was created on this page.

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | prop |
|---|---|---|
| `sortable-handle` | `crv-sortable-handle` | `state` default / focus / disabled |
| `sortable-item` | `crv-sortable-item` | `layout` list / grid, `state` default / hover / focus / dragging / placeholder / disabled, `title`, `description`, `showDescription` |
| `sortable` | `crv-sortable` | `layout` list / grid, `dragging` false / true |

The original prop names and values already match those used in code, so they were not changed. Instances were not counted before the rename (the counting script timed out), but renaming the sets does not break the connection

## Spec

- Handle: 32×32, corner radius 8, icon `DragIndicatorRounded` 20 · default / focus `content/secondary` · focus border 1px `border/system` · disabled `content/disabled`
- list card: 400×80, padding 16, gap 8, corner radius 12, border 1px `border/default`, fill `on-surface/elevated` · title 14/20 Medium `content/primary`, description 14/20 `content/secondary`, gap 4
- grid card: 200×144, laid out vertically, gap 8
- hover fill `on-surface/subtle` · focus and dragging border `border/system` · placeholder dashed border 4,4, fill `on-surface/subtle`, content hidden · disabled text `content/disabled`
- `sortable`: gap 16; with `dragging=true` the dragged item becomes a placeholder and a floating copy (`Drag overlay`) with a `border/system` border appears

## Figma name ↔ Code

| Figma | Code |
|---|---|
| `sortable` | `Sortable` (`ui/sortable.tsx`; props `items`, `onItemsChange`, `layout`, `renderOverlay`) |
| `sortable-item` | `SortableItem` (`id`, `title`, `description`, `disabled`) and `SortableItemView` (for the floating copy) |
| `sortable-handle` | `SortableHandle` |
| `layout` | prop `layout` of `Sortable` |
| `state` hover / focus / placeholder | CSS and dnd-kit states · `dragging` = `SortableItemView state="dragging"` in `renderOverlay` · `disabled` = prop |
| `showDescription`, `dragging` of the `sortable` set | Figma only (omitting `description` = not shown) |

## Code (26 Nov 2026)

Added the dependencies `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` as the user confirmed. Dragging works only from the handle; supports mouse (drag beyond 4px) and keyboard (Space, arrow, Space). The handle icon path is copied from Figma into `app/icons.tsx` (`DragIndicatorRounded`)

| Topic | Status |
|---|---|
| list 400×80, padding 16, gap 8, corner radius 12 | matches (measured in story `List`) |
| Handle 32×32, corner radius 8 | matches (measured) |
| grid 200×144 | matches (measured in story `Grid`) |
| Reorder with keyboard | passes (tested `b,a,c`) |
| disabled turns off the handle | passes |
| hover, focus, placeholder colors, dashed border | set per Figma, **Not measured** |

**Not yet checked:** real mouse dragging in the browser, screen reader announcement text (uses the dnd-kit defaults), and heights 80 / 144 are set as minimum heights (Figma sets them fixed), so they expand if the text is longer
