# Select — Figma specification

Read from Figma on 26 November 2026: [Dropdown](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3875-3311) (Cariva Core Design System file). All 108 color points are bound to variables in the file.

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| New name | Original name | instances (before → after) |
|---|---|---|
| `select` | `crv-dropdown` | 14 → 14 |

The `size` values changed medium → `lg`, small → `default` (matching Input Field and Combobox); the text `crv-dropdown` in the `📄 Dropdown Doc` frame (2 places) was changed to `select` (original text in plugin data `docText_2026-11-26`). Prop names in the doc frame, such as `size: small | medium`, have not been updated yet.

## Spec

| | default | lg |
|---|---|---|
| Field height | 40px (padding 8/16) | 48px (padding 12/16) |
| Down arrow | 20px | 24px |
| Label | 12/16 Medium | 14/20 Medium |

Field: pill shape following `--input-radius`, fill `on-surface/default`, gap between text and arrow 8, text 16/24 (placeholder `content/placeholder`, selected value `content/primary`), arrow `content/secondary`, helper text and error text 12/16.

| State | Border |
|---|---|
| Normal | `border/default` 1px |
| Hover | `border/strong` 1px |
| Focus | `border/system` 2px |
| error | `border/error` 2px, label `status/error/content/default` |
| disabled | `border/disabled` 1px, fill `on-surface/action/disabled`, text, arrow and label `content/disabled` |

## Figma name ↔ Code

| Figma | Code |
|---|---|
| `select` | `Select` + `SelectTrigger` (`ui/select.tsx`) |
| `size` default / lg | `size` of `SelectTrigger` |
| `disabled` | `disabled` of `Select` |
| `error` | `aria-invalid` of `SelectTrigger` |
| `label`, `helperText`, `errorMessage` | `FieldLabel`, `FieldDescription`, `FieldError` (wrapped in `Field`) |
| `placeholder`, `value` | `SelectValue placeholder`, the selected value |
| `state` hover / focused, `filled` | Figma only |

## Code (26 Nov 2026)

| Topic | Status |
|---|---|
| Height 40 / 48 | matches (measured in story `FigmaStates`) |
| Normal border `#E2E8F0`, error `#DC2626` | matches (measured in story) |
| disabled fill `#F1F5F9`, opacity 1 | matches (measured in story) |
| Arrow 24 (lg) | matches (measured in story) |
| Border on hover / focus / open list, arrow 20 (default), text color | set per Figma, **Not measured** |

**Not done:** the opened list (`SelectContent`, `SelectItem`, scroll buttons) has no design on this page, so it keeps its previous styling.

**Impact:** `size="sm"` is replaced by `default` (40), and the previous unset `default` is now 40, the same as before, but `lg` (48) is added; the previous border used `ring-input` and a 3px focus, which is now a 2px token-based border; disabled uses a dedicated color instead of reduced opacity; the arrow changes to a Material icon; used by `CatalogForm`.
