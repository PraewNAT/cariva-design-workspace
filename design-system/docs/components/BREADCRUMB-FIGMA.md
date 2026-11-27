# Breadcrumb — Figma specification

Read from Figma on 26 November 2026: [Breadcrumb](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3875-4578) (Cariva Core Design System file). Every color is bound to a variable in the file (99 bindings, none bound to the old library)

## Sets in Figma (renamed 26 Nov; original names backed up in plugin data `oldNames_2026-11-26` / `oldName_2026-11-26`)

| New name | Previous name | Notes |
|---|---|---|
| `breadcrumb-item` | `crv-breadcrumb-base` | 5 types; the `type` values were changed to `link` (previously default), `hover`, `dropdown`, `ellipsis`, `page` (previously active) |
| `breadcrumb` | `crv-breadcrumb-standard` | full row, with a `breadcrumb-01` to `05` switch (Figma only) |

76 instances use these sets, the same before and after the rename

## Spec

- Text 14/20 Medium, 12px gap between items and separators
- `link`: `brand/primary/on-surface/default` (#1789FA) · `hover`: `brand/primary/content/strong` (#0F70E6) · `page` (the current page): `content/secondary` (#334155)
- `dropdown`: `link`-style text + 16px down arrow in `content/secondary`, 4px apart
- `ellipsis`: 32×32 box, 16px three-dot icon in `content/secondary`
- Separator: 16px right arrow in `content/secondary`
- **Note:** the link color is bound to the variable in the `brand/primary/on-surface/default` group (a surface group name), not the `content` group; the values are the same. The code follows Figma

## Figma names ↔ code

| Figma | Code |
|---|---|
| `breadcrumb` (row) | `Breadcrumb` + `BreadcrumbList` |
| `breadcrumb-item` type `link` / `hover` | `BreadcrumbLink` (hover is CSS) |
| type `page` | `BreadcrumbPage` |
| type `ellipsis` | `BreadcrumbEllipsis` |
| type `dropdown` | `BreadcrumbLink` followed by a down-arrow icon (see the `FullRow` story) |
| separator | `BreadcrumbSeparator` |
| `text` | children |
| `breadcrumb-01…05`, `hover` | Figma only |

## Code (26 Nov 2026)

Source `src/lib/app/components/ui/breadcrumb.tsx`. The separator and ellipsis icons are Material icons copied from Figma into `app/icons.tsx` (`ChevronRightRounded`, `MoreHorizRounded`); previously hugeicons stroke icons were used

| Topic | Status |
|---|---|
| Text 14/20 weight 500, 12px gap | Matches (measured) |
| Link color `#1789FA`, current page `#334155`, separator `#334155` | Matches (measured) |
| Hover color `#0F70E6` | Matches (measured in the browser) |
| Separator 16px, ellipsis box 32px | Matches (measured) |
| Icon shapes | Uses the same paths as Figma; checked visually |

**Impact:** links were previously gray, now blue, and the current page is a secondary color with medium weight; used on the Catalog page and stories

**Not yet checked:** line wrapping when the path is long on mobile (no design in Figma), a dropdown item that actually opens a list (in code it is a composed example, not yet connected to a menu), the focus state of links
