> Source of truth: ../../../rules/components/crv-autocomplete.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-autocomplete.md` for the full spec (variants, sizes, tokens, do/don't).

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `size` | `small` \| `medium` | `medium` |
| `placeholder` | `string` | `'Search or select...'` |
| `options` | `{ value, label }[]` | required |
| `helperTextVisible` | `boolean` | `false` |
| `error` | `boolean` | `false` |
| `errorMessageVisible` | `boolean` | `true` |

## Sizes (input-container height)

| Size | Height | Padding | Input typography |
|---|---|---|---|
| medium | 48 | 12/16 | body/large (16/24) |
| small | 40 | 8/16 | body/large (16/24) |

## Rules

- ใช้เมื่อ options 7+ หรือค้นหายาก — น้อยกว่านั้นใช้ `CrvDropdown`
- ไม่ free-text — validate ว่าเลือกจาก options
- Always pair `error={true}` with `errorMessage`
