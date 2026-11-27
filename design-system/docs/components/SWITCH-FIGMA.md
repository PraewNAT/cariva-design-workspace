# Switch — Figma specification

Read from Figma on 26 November 2026: [Switch](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3875-1027) (Cariva Core Design System file). The user confirmed the names as proposed by Claude

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | prop | instances (before → after) |
|---|---|---|---|
| `switch` | `crv-switch-base` | `checked`, `state` default / focusVisible / disabled, `size` default / sm (previously medium / small) | 13 → 13 |
| `switch-field` | `crv-switch` | `error` false / true (previously `color` primary / error), `disabled`, `labelPlacement` end / start, `label`, `description` (can be hidden with `labelVisible`, `descriptionVisible`) | 2 → 2 |

The `type=description` option of `crv-switch` was removed from the variant name (Figma has only one value). The text in the Figma doc frame had its prop names renamed accordingly (original text backed up in `docText_2026-11-26`), and it now states that the `outlined` style mentioned in the old docs does not yet exist in Figma

## Spec

- size default: track 44×24, thumb 20 · sm: track 36×20, thumb 16 · padding 2, fully rounded corners
- Track: off `border/default` · on `brand/primary/on-surface/default` · focus (off) `border/system` · disabled: off `on-surface/action/disabled`, on `brand/primary/on-surface/muted`
- white thumb (`on-surface/default`) with a shadow
- `switch-field`: gap 16, label 14/20 Medium `content/primary`, description 12/16 `content/secondary`, gap 8 · error label `status/error/content/default` (the switch does not change color) · disabled label and description `content/disabled`

## Figma name ↔ Code

| Figma | Code |
|---|---|
| `switch` | `Switch` (`ui/switch.tsx`; `size` default / sm) |
| `checked` | `checked` / `defaultChecked` |
| `state` focusVisible / disabled | CSS focus-visible and `disabled` |
| `switch-field` | `SwitchField` (`app/switch-field.tsx`; `label`, `description`, `labelPlacement`, `error`, `disabled`) |
| `error` | `error` of `SwitchField` (also sets `aria-invalid` on the switch) |

## Code (26 Nov 2026)

| Topic | Status |
|---|---|
| Track 44×24 / 36×20, thumb 20, thumb position when on | matches (measured in story `FigmaSwitch`) |
| On track color `#1789FA`, off `#E2E8F0`, disabled `#F1F5F9`, white thumb | matches (measured) |
| error label color `#DC2626`, disabled label `#94A3B8`, gap 16 | matches (measured) |
| Track color on focus, on track when disabled (`muted`), thumb shadow, 36×20 thumb 16 | set per Figma, **Not measured** |

**Impact:** the `Switch` used everywhere gets larger (previously 32×18.4 and 24×14); colors change from shadcn tokens to DS tokens; disabled uses a dedicated color instead of reduced opacity, and focus changes the track color instead of a 3px ring (per Figma, like Checkbox, which may fall below the contrast threshold for a focus indicator)

**Not yet checked:** the `outlined` style (not in Figma), alignment of the label and switch when the description spans multiple lines
