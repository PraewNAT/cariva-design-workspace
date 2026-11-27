# Checkbox — Figma specification

Read from Figma on 26 November 2026: [Checkbox](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3815-4883) (Cariva Core Design System file)

## Sets in Figma (renamed; the original names are backed up in plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| New name | Original name | instances (before → after) |
|---|---|---|
| `checkbox` | `crv-checkbox-base` | 182 → 182 |
| `checkbox-field` | `crv-checkbox-standard` | 36 → 36 |
| `checkbox-group` | `crv-checkbox-group` | 2 → 2 |
| `checkbox-card` | `crv-checkbox-card` | 5 → 5 |

The `color` prop (primary / error) on every set was changed to `error` (false / true) to match Input; `state` (default / focusVisible / disabled / hover) is unchanged

## Spec

- 16×16 box with corner radius 4 and a 1px `border/default` border; the check and dash are 14px in colour `content/inverse`
- checked or indeterminate: fill `brand/primary/on-surface/default` (on focus `…/pressed`), no border
- focus when empty: border `border/system` · error empty: border `status/error/border/strong` (focus `border/error`) · error checked: fill `status/error/on-surface/default` (focus `…/pressed`)
- disabled: fill `on-surface/action/disabled`, border `border/disabled`, icon `content/disabled` (opacity is not reduced)
- `checkbox-field`: gap 12, label 14/20 Medium, description 14/20 `content/secondary` gap 4; `labelPlacement=start` places the label before the box; error label colour `status/error/content/default`; disabled label and description `content/disabled`
- `checkbox-group`: label + description, then the items, gap 12
- `checkbox-card`: width 409, padding 16, corner radius 16, 1px border; checked fill `brand/primary/on-surface/subtle`, border `brand/primary/border/default`; error border `status/error/border/strong`, checked fill `status/error/on-surface/subtle`; disabled border `border/disabled`

## Figma names ↔ Code

| Figma | Code |
|---|---|
| `checkbox` | `Checkbox` (`ui/checkbox.tsx`) |
| `checked`, `indeterminate`, `disabled` | `checked` / `defaultChecked`, `indeterminate`, `disabled` |
| `error` | prop `error` (sets `aria-invalid`) |
| `checkbox-field` | `CheckboxField` (`app/checkbox-patterns.tsx`) |
| `labelPlacement` | `labelPlacement` |
| `label`, `description` | `label`, `description` |
| `checkbox-group` | `CheckboxGroup` (children = items) |
| `checkbox-card` | `CheckboxCard` |
| `state` focusVisible / hover, `checkbox01..06Visible`, `checkBoxSlot` | Figma only |

## Code (26 Nov 2026)

| Topic | Status |
|---|---|
| 16×16 box with corner radius 4 | matches (measured in story) |
| Fill when checked / indeterminate `#1789FA`, error border `#EF4444`, disabled `#F1F5F9` | matches (measured in story) |
| The check/dash are Material icons copied from Figma | checked visually |
| card width 409, fill when checked | The fill on first load matches; the colour after toggling by click could not be measured in the test (the transition stays stuck in the test), only the checked state was checked |
| Every focus state (pressed fill, system/error border) | set per Figma, **not measured** |

**Decided together with the user:** following Figma's focus, focus changes the fill/border colour with no ring; on card hover use `shadow/sm` while unchecked and `glow/primary` (error: `glow/error`) when checked, through tokens `--cds-shadow-sm` / `--cds-glow-*` (added 26 Nov 2026; measured with a real mouse when checked and it matches `rgba(23,137,250,0.36) 0 0 4px`; the unchecked, error and disabled (no shadow) variants are **not measured**)

**Impact:** the old box had corner radius 6 and disabled reduced opacity to 50%; now the corner radius is 4 and disabled uses dedicated colours; the old focus was a 3px ring, now it is a colour change; used by `CatalogForm` (the Dropdown Menu checkbox item has its own styling and does not use `Checkbox`)
