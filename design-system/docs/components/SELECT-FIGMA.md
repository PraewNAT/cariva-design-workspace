# Select — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Dropdown](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3875-3311) (ไฟล์ Cariva Core Design System) สีทุกจุด 108 จุดผูกตัวแปรในไฟล์

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | instance (ก่อน → หลัง) |
|---|---|---|
| `select` | `crv-dropdown` | 14 → 14 |

ค่า `size` เปลี่ยน medium → `lg`, small → `default` (ตรงกับ Input Field และ Combobox); ข้อความ `crv-dropdown` ในกรอบ `📄 Dropdown Doc` (2 จุด) เปลี่ยนเป็น `select` แล้ว (ข้อความเดิมใน plugin data `docText_2026-11-26`) ชื่อ prop ในกรอบเอกสาร เช่น `size: small | medium` ยังไม่ได้แก้

## สเปก

| | default | lg |
|---|---|---|
| ความสูงช่อง | 40px (padding 8/16) | 48px (padding 12/16) |
| ลูกศรลง | 20px | 24px |
| ป้ายชื่อ | 12/16 Medium | 14/20 Medium |

ช่อง: ทรงแคปซูลตาม `--input-radius` พื้น `on-surface/default` ช่องว่างข้อความกับลูกศร 8 ข้อความ 16/24 (placeholder `content/placeholder`, ค่าที่เลือก `content/primary`) ลูกศร `content/secondary` ข้อความช่วยและข้อความ error 12/16

| สถานะ | ขอบ |
|---|---|
| ปกติ | `border/default` 1px |
| ชี้เมาส์ | `border/strong` 1px |
| โฟกัส | `border/system` 2px |
| error | `border/error` 2px, ป้ายชื่อ `status/error/content/default` |
| disabled | `border/disabled` 1px, พื้น `on-surface/action/disabled`, ข้อความ ลูกศรและป้ายชื่อ `content/disabled` |

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `select` | `Select` + `SelectTrigger` (`ui/select.tsx`) |
| `size` default / lg | `size` ของ `SelectTrigger` |
| `disabled` | `disabled` ของ `Select` |
| `error` | `aria-invalid` ของ `SelectTrigger` |
| `label`, `helperText`, `errorMessage` | `FieldLabel`, `FieldDescription`, `FieldError` (ห่อด้วย `Field`) |
| `placeholder`, `value` | `SelectValue placeholder`, ค่าที่เลือก |
| `state` hover / focused, `filled` | เฉพาะ Figma |

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| ความสูง 40 / 48 | ตรง (วัดใน story `FigmaStates`) |
| ขอบปกติ `#E2E8F0`, error `#DC2626` | ตรง (วัดใน story) |
| disabled พื้น `#F1F5F9`, opacity 1 | ตรง (วัดใน story) |
| ลูกศร 24 (lg) | ตรง (วัดใน story) |
| ขอบตอนชี้เมาส์ / โฟกัส / เปิดรายการ, ลูกศร 20 (default), สีตัวหนังสือ | ตั้งตาม Figma **ยังไม่ได้วัด** |

**ไม่ได้ทำ:** รายการที่เปิดออกมา (`SelectContent`, `SelectItem`, scroll buttons) ไม่มีดีไซน์ในหน้านี้ จึงยังเป็นสไตล์เดิม

**ผลกระทบ:** `size="sm"` ถูกแทนด้วย `default` (40) และ `default` เดิมที่ไม่ได้กำหนดตอนนี้ 40 เท่าเดิม แต่เพิ่ม `lg` (48); ขอบเดิมใช้ `ring-input` และโฟกัส 3px ตอนนี้เป็นขอบ 2px ตาม token; disabled เป็นสีเฉพาะแทนลด opacity; ลูกศรเปลี่ยนเป็นไอคอน Material ใช้กับ `CatalogForm`
