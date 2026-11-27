# Table — Figma specification

Read from Figma on 26 November 2026: [Table](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4582-9184) (Cariva Core Design System file). The user confirmed the names as proposed by Claude, including 3 decisions: the footer uses `TablePagination`, BWC Table (Draft) was deleted from Figma, and alternating row colors are `striped` on `Table`. This page already has a `Table Doc` frame (old prop names in the text were fixed; the original text is backed up in `docText_2026-11-26`)

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | prop | Notes |
|---|---|---|---|
| `table-head` | `crv-table-head` | `size` default / sm (previously small), `compact`, `checkBoxVisible`, `leftSortVisible`, `rightSortVisible`, `label` | instances 21 → 21 |
| `table-cell` | `crv-table-cell` | `size`, `state` default / hover / disabled, `alternate`, `customContent` slot | 61 → 61 |
| `table-text-cell` | `crv-tableText-cell` | `descriptionVisible` | 27 → 27 |
| `table-scroll-shadow` | `crv-table-scroll-shadow` | `side` left / right | 2 → 2 |
| `table-footer` | `crv-table-footer` | 5 → 5 | Renamed 26 Nov 2026; uses `TablePagination` instead (the "Go to" design is still pending) |
| `bwc-table/*` | — | — | Removed from Figma 26 Nov 2026 (the entire `BWC Table / Draft` section; the user ordered the deletion) |

## Spec

- head: fill `on-surface/subtle`, 14/20 Medium `content/primary`, gap 8 · default padding 16 (height 54 when there is a sort icon) · sm padding 7/16 (height 34) · sort icon `arrow-downward` 18 in a 22 frame
- compact (checkbox / icon column): fixed square, default 54×54, sm 36×36
- cell: fill `on-surface/default`, text 14/20 · default padding 16, min height 54 · sm padding 4/16, min height 36 · hover `on-surface/action/hover` · alternate `on-surface/subtle` · disabled transparent fill, text `content/disabled` · no border
- text cell: main text 14/20, description 12/16 `content/secondary`
- scroll shadow: width 16, black gradient 8% → 4% → 0% (left extends rightward, right extends leftward)

## Figma name ↔ Code

| Figma | Code |
|---|---|
| `size` | prop `size` of `Table` (`default` / `sm`), shared across the whole table (doc: do not mix) |
| `table-head` | `TableHead` (`sort` left / right = shows an arrow, `compact`) |
| `table-cell` | `TableCell` (`compact`) |
| `alternate` | `striped` on `Table` (even rows) |
| `state` hover | CSS hover on the row · disabled = `disabled` on `TableRow` |
| `customContent` | children of `TableCell` |
| `table-text-cell` | `TableTextCell` (`description`) |
| `table-scroll-shadow` | `TableScrollShadow` (`side`) |
| `checkBoxVisible`, `leftSortVisible`, `rightSortVisible`, `label`, `descriptionVisible` | include or omit children / `sort` / `description` |

## Code (26 Nov 2026)

Source `src/lib/app/components/ui/table.tsx`; the `ArrowDownwardFilled` icon is copied from Figma into `app/icons.tsx`; the footer uses `TablePagination` ([PAGINATION-FIGMA.md](PAGINATION-FIGMA.md)); stories under `Core/Components/Table`: `Default`, `SizeDefault`, `SizeSm`, `Striped`, `TextCellWithDescription`, `SortIcons`, `CompactCheckboxColumn`, `DisabledRow`, `PinnedColumnShadow`, `ComposedTable`

| Topic | Status |
|---|---|
| head fill `#F8FAFC`, 500, padding 16, height 54 (default) / 34 (sm), padding 7 | matches (measured) |
| cell height 54 / 36, padding 16 / 4, white fill, no border | matches (measured) |
| striped even rows `#F8FAFC`, hover `#F1F5F9` over striped | matches (striped measured, hover checked with a real mouse in the browser) |
| text cell 14/20 + 12/16 `#334155` | matches (measured) |
| compact 54×54 / 36×36, sort icon 22×22, scroll shadow width 16 | matches (measured) |
| disabled: text `#94A3B8`, transparent fill | matches (measured) |
| scroll shadow color | **Not measured** |

**Impact:** the existing `Table` changes appearance: no border between rows (per Figma), light gray header fill, padding 16 (previously 12), and `TableHead` height 52–54 (previously 48); used on the Foundations page of the Catalog. `TableCaption` and `TableFooter` were removed (not in the code in use)

**Removed things Figma does not have (as the user ordered):** `TableCaption`, `TableFooter` (tfoot), the sort states asc / desc / none, `onSort` and `aria-sort` (Figma only shows or hides the arrow); the table footer uses `TablePagination`. If sortable headers are really needed, a design is required first

**Not yet checked:** real column pinning with sticky (Figma says it is the code side's job; currently only the shadow exists), the selected row state (Figma does not have it yet), the "Go to" style `table-footer`, horizontal scrolling on mobile
