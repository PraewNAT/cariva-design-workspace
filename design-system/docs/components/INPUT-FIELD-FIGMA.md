# Input Field — Figma specification

Read from Figma on 26 November 2026: [Input Field](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3760-1811) (Cariva Core Design System file). First-phase scope: `input`, `textarea` and the `Field` part (label, helper text, error message). `input-horizontal` (label on the left) is not done yet

## Sets in Figma (renamed 26 Nov; original names backed up in plugin data `oldNames_2026-11-26`)

| New name | Original name | variants | instance |
|---|---|---|---|
| `input` | `crv-input-standard` | 18 | 37 (all still linked) |
| `input-horizontal` | `crv-input-horizontal` | 18 | 4 |
| `textarea` | `crv-text-area-standard` | 20 | 3 |
| `combobox` | `crv-autocomplete` (Autocomplete page) | 18 | 6 |

`size` values changed to `default` / `lg` in every set: Input Field previously medium → `default`, large → `lg`; Autocomplete previously small → `default`, medium → `lg`

## Spec (read from the variables in the file)

| | default | lg |
|---|---|---|
| Field height | 40px (padding 8/16) | 48px (padding 12/16) |
| Label | 12/16 Medium `content/primary` | 14/20 Medium |
| Helper text | 12/16 `content/secondary` | Same |
| textarea | Min height 96, corner radius 8, padding 8/16 | Min height 120, corner radius 12, padding 12/16 |

Input field: corner radius per Product (`--input-radius`, carivaApp = pill), fill `on-surface/default`, text 16/24 (placeholder `content/placeholder`, value `content/primary`), 4px gap between the label, field and helper text. Secondary label ("optional") appended to the label, color `content/secondary`

| State | Border | Other |
|---|---|---|
| Normal | `border/default` 1px | |
| Hover | `border/strong` 1px | |
| Focus | `border/system` 2px | |
| Error | `border/error` 2px | Error message 12/16 `status/error/content/default` |
| Disabled | `border/disabled` 1px | Fill `on-surface/action/disabled`, text `content/disabled`, opacity not reduced |

## Property names in Figma ↔ code

| Figma | Code |
|---|---|
| `size` default / lg | `size` prop of `Input`, `Textarea`, `InputGroup`, `Field` |
| `disabled` | `disabled` |
| `error` | `aria-invalid` (error message uses `FieldError`) |
| `label`, `labelVisible` | `FieldLabel` (shown or hidden = included or not included) |
| `secondaryLabel`, `secondaryLabelVisible` | `secondary` prop of `FieldLabel` |
| `helperText`, `errorMessage` | `FieldDescription`, `FieldError` |
| `placeholder`, `value` | `placeholder`, `value` |
| `startAdornment`, `endAdornment` | `InputGroupAddon` (`inline-start` / `inline-end`) |
| `state` (default, hover, focused), `filled`, `scrollable`, `...Visible` | Figma only |

## Code (26 Nov 2026)

`input.tsx`, `textarea.tsx`, `input-group.tsx` and `field.tsx` in `src/lib/app/components/ui/`. The 1px border is an inset ring (focus and error grow to 2px without shifting the layout); colors are bound to `--cds-*` from tokens.json

| Item | Status |
|---|---|
| Sizes 40 / 48, padding, font 16/24 | matches (measured) |
| Label 12/16 and 14/20, helper text 12/16 color `#334155`, secondary label | matches (measured) |
| Normal border color `#E2E8F0`, focus `#2563EB`, error `#DC2626` | matches (measured) |
| Disabled (fill `#F1F5F9`, text `#94A3B8`, opacity 1) | matches (measured) |
| textarea height 96 / 120, corner radius 8 / 12, padding | matches (measured) |
| Hover border (`border/strong`) | set in code, **not measured** |
| 2px thickness of focus and error | set in code; only the color was measured, thickness not measured |

**Impact:** the normal border is lighter, from `#CBD5E1` to `#E2E8F0`; focus and error use a 2px border instead of a faint 3px ring; disabled uses a dedicated color instead of reduced opacity; the textarea has corner radius 8 instead of 24; the label in `Field` is 12 (40 field) and helper text is 12; applies everywhere that uses `Input`, `Textarea`, `InputGroup`, `Field`, e.g. Select and Combobox composed from InputGroup

**Not done / cannot check:** `input-horizontal` (label on the left, width 80), Select and Dropdown fields that have their own style (separate Dropdown page), icons before/after the field, `scrollable` textarea

## Combobox and disabled label — 26 November 2026

Updated Combobox per [COMBOBOX-FIGMA.md](COMBOBOX-FIGMA.md): supports 40/48px fields, 20/24px arrows and reuses the existing Field/InputGroup. Disabled `FieldLabel` uses `content/disabled` without reduced opacity, as the user confirmed; the check results are in [COMBOBOX-AUDIT.md](COMBOBOX-AUDIT.md). The Figma docs were not updated back automatically.
