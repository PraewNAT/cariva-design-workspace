# Pagination — Figma specification

Read from Figma on 26 November 2026: [Pagination](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4167-7456) (Cariva Core Design System file; this page is the `Table Pagination / Draft` section). The user told me to decide on my own while away; the names and props below are Claude's decisions and have not been confirmed

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | instance (before → after) |
|---|---|---|
| `pagination` (`Case` First / Middle / Last / Empty — Figma only) | `crv-table-pagination` | 0 → 0 |
| `pagination-link` (`page`, `state`) | `crv-table-pagination-page` | 16 → 16 |
| `pagination-control` (`type` first / previous / next / last, `state`) | `crv-table-pagination-controller` | 16 → 16 |
| `pagination-rows` | `crv-table-pagination-rows` | 4 → 4 |
| `pagination-summary` | `crv-table-pagination-summary` | 4 → 4 |

**New color bindings:** all colors were previously bound to variables of the old library (111 points); they were switched to variables of the same name in the file, so no old library remains and no names were left unmatched (the original list is backed up in plugin data `remoteBindings_2026-11-26`). The `Table Pagination / Draft` section and the doc on this page were not touched. Added a `Documentation Card` frame (node `7223:101507`) beside the section on 26 Nov (created from the Drawer page's frame, containing the `pagination` instance in all 4 Cases and `pagination-link` in every state)

## Spec

- A single row 1200 wide with gap 16: on the left `pagination-rows` (the text "Rows per page" 14/20 + a Select of size `default`, 80 wide, 40 tall), in the middle `pagination-summary` ("Showing 11 to 20 of 100 products" 14/20 `content/secondary`), on the right the navigation buttons with gap 8
- Navigation buttons: round 32×32, icon 20 (first / previous / next / last); numeric pages 14/20 Regular
- default: no fill, `content/primary` · hover and pressed: fill `on-surface/action/selected` · selected (current page): fill `brand/primary/on-surface/default`, text `brand/primary/content/on-fill` · disabled: `content/disabled`
- Case: First = 1 2 3 … 10 (first / previous buttons disabled), Middle = 1 2 3 … 10, Last = 1 … 8 9 10, Empty = no page numbers and all navigation buttons disabled, with the text "Showing 0 to 0 of 0 products"

## Figma names ↔ Code

| Figma | Code |
|---|---|
| `pagination` | `TablePagination` (`app/table-pagination.tsx`) composed from the parts in `ui/pagination.tsx` |
| `pagination-link` | `PaginationLink` (`isActive` = selected, `disabled`) |
| `pagination-control` first / previous / next / last | `PaginationFirst`, `PaginationPrevious`, `PaginationNext`, `PaginationLast` |
| `pagination-rows` | `PaginationRows` + `Select` |
| `pagination-summary` | `PaginationSummary` |
| `More pages` | `PaginationEllipsis` |
| `Case`, `state` hover / pressed | Figma only (`Case` is derived from `page`, `total`) |

## Code (26 Nov 2026)

| Item | Status |
|---|---|
| Round 32×32 buttons, current page fill `#1789FA` with white text, disabled buttons `#94A3B8`, button gap 8, Select height 40 | matches (measured in story `FigmaTablePagination`) |
| Summary text in First / Last / Empty, no page numbers when Empty | matches (checked in story) |
| hover / pressed colors, 20 icon in `PaginationControl`, 16 row gap | set per Figma, **not measured** |

**Decided by Claude:** the page-number set shown for First/Middle/Last follows Figma; for other pages that Figma did not draw (e.g. pages 4–7 of 10) use 1 … previous, current, next … last; the first / previous / next / last icons are hand-written Material icons, with no path copied from Figma; `PaginationPrevious` / `PaginationNext` previously had the text "Previous" / "Next" and are now icon-only per Figma (the `text` prop was removed)

**Impact:** `PaginationLink` was previously a 40px ghost / outline Button and is now a 32px round button with the current page filled blue; `PaginationPrevious` / `PaginationNext` are icon-only; gap 4 → 8; `PaginationEllipsis` is the text "…"
