# Input OTP — Figma specification

Read from Figma on 26 November 2026: [Input OTP](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4315-281) (Cariva Core Design System file). All colors in the sets are bound to variables in the file

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| New name | Original name | instance (before → after) |
|---|---|---|
| `input-otp` (prop `state` default / error → `error` false / true) | `crv-input-otp-standard` | 2 → 2 |
| `input-otp-slot` (original `state`) | `crv-input-otp-base` | 28 → 28 |

The original-name text in the `📄 Input OTP Doc` frame (4 places) has been changed to the new names (original text in plugin data `docText_2026-11-26`). Prop names in the doc frame have not been updated yet

## Spec

- Slots 40×40, corner radius 12 (fixed, does not follow Product), fill `on-surface/default`, 1px `border/default` border, digit 16/24 `content/primary`; slots are separate, 12 apart
- focused: `border/system` 2px border, cursor `brand/primary/content/default` · focusedFilled: same border
- disabled: `border/disabled` 1px border, digit `content/disabled` (fill remains `on-surface/default`)
- Group: label 14/20 Medium `content/primary` · helper text 14/20 `content/secondary` · error message 14/20 `status/error/content/default`, section gap 12
- **Fixed in Figma (26 Nov 2026, as the user ordered):** the original `error=true` variant only turned the helper text red; now the border of all 6 slots is `border/error` 2px (fixed in nested instances; original values backed up in plugin data `slotStrokeBackup_2026-11-26`)

## Figma names ↔ Code

| Figma | Code |
|---|---|
| `input-otp` | `InputOTP` + `InputOTPGroup` (`ui/input-otp.tsx`) |
| `input-otp-slot` | `InputOTPSlot` |
| `error` | prop `error` (sets `aria-invalid`) |
| `state` disabled | `disabled` of `InputOTP` |
| `state` focused / filled / focusedFilled | Figma only (code uses the active slot and the value) |
| `label`, `helperText`, `errorMessage` | `FieldLabel`, `FieldDescription`, `FieldError` (wrapped with `Field`) |
| Separator | `InputOTPSeparator` (not in Figma; kept as is) |

## Code (26 Nov 2026)

| Item | Status |
|---|---|
| Slots 40×40, corner radius 12, gap 12 | matches (measured in story `FigmaStates`) |
| Normal border `#E2E8F0`, error `#DC2626`, focused slot `#2563EB` | matches (measured in story) |
| disabled digit `#94A3B8`, white fill | matches (measured in story) |
| disabled border, 2px thickness of focus and error, cursor color | set per Figma, **not measured** |

**Decided together with the user:** error changes the border of the whole slot to `border/error` 2px per the Figma document (Figma now matches)

**Impact:** the original `InputOTP` was joined boxes with rounded corners only at the ends, a 3px focus ring, and disabled with reduced opacity; it is now separate slots with corner radius 12 and gap 12, focus/error with a 2px border, and disabled with a dedicated color
