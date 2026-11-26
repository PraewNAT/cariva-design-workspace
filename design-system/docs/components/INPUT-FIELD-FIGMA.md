# Input Field — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Input Field](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3760-1811) (ไฟล์ Cariva Core Design System) ขอบเขตเฟสแรก: `input`, `textarea` และส่วน `Field` (ป้ายชื่อ ข้อความช่วย ข้อความผิดพลาด) ยังไม่ทำ `input-horizontal` (ป้ายชื่ออยู่ซ้าย)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว 26 พ.ย. ชื่อเดิมสำรองใน plugin data `oldNames_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | variants | instance |
|---|---|---|---|
| `input` | `crv-input-standard` | 18 | 37 (ยังเชื่อมครบ) |
| `input-horizontal` | `crv-input-horizontal` | 18 | 4 |
| `textarea` | `crv-text-area-standard` | 20 | 3 |
| `combobox` | `crv-autocomplete` (หน้า Autocomplete) | 18 | 6 |

ค่า `size` เปลี่ยนเป็น `default` / `lg` ทุกชุด: Input Field เดิม medium → `default`, large → `lg`; Autocomplete เดิม small → `default`, medium → `lg`

## สเปก (อ่านจากตัวแปรในไฟล์)

| | default | lg |
|---|---|---|
| ความสูงช่อง | 40px (padding 8/16) | 48px (padding 12/16) |
| ป้ายชื่อ | 12/16 Medium `content/primary` | 14/20 Medium |
| ข้อความช่วย | 12/16 `content/secondary` | เท่ากัน |
| textarea | สูงขั้นต่ำ 96, มุมโค้ง 8, padding 8/16 | สูงขั้นต่ำ 120, มุมโค้ง 12, padding 12/16 |

ช่อง input: มุมโค้งตาม Product (`--input-radius`, carivaApp = pill) พื้น `on-surface/default` ข้อความ 16/24 (placeholder `content/placeholder`, ค่า `content/primary`) ช่องว่างระหว่างป้ายชื่อ ช่อง และข้อความช่วย 4px ป้ายชื่อรอง ("optional") ต่อท้ายป้ายชื่อ สี `content/secondary`

| สถานะ | ขอบ | อื่นๆ |
|---|---|---|
| ปกติ | `border/default` 1px | |
| ชี้เมาส์ | `border/strong` 1px | |
| โฟกัส | `border/system` 2px | |
| ผิดพลาด | `border/error` 2px | ข้อความผิดพลาด 12/16 `status/error/content/default` |
| ปิดใช้งาน | `border/disabled` 1px | พื้น `on-surface/action/disabled`, ตัวหนังสือ `content/disabled` ไม่ลด opacity |

## ชื่อ property ใน Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `size` default / lg | prop `size` ของ `Input`, `Textarea`, `InputGroup`, `Field` |
| `disabled` | `disabled` |
| `error` | `aria-invalid` (ข้อความผิดพลาดใช้ `FieldError`) |
| `label`, `labelVisible` | `FieldLabel` (แสดงหรือไม่แสดงคือใส่หรือไม่ใส่) |
| `secondaryLabel`, `secondaryLabelVisible` | prop `secondary` ของ `FieldLabel` |
| `helperText`, `errorMessage` | `FieldDescription`, `FieldError` |
| `placeholder`, `value` | `placeholder`, `value` |
| `startAdornment`, `endAdornment` | `InputGroupAddon` (`inline-start` / `inline-end`) |
| `state` (default, hover, focused), `filled`, `scrollable`, `...Visible` | เฉพาะ Figma |

## โค้ด (26 พ.ย. 2026)

`input.tsx`, `textarea.tsx`, `input-group.tsx` และ `field.tsx` ใน `src/lib/app/components/ui/` ขอบ 1px เป็น inset ring (โฟกัสและผิดพลาดขยายเป็น 2px โดยไม่ขยับ layout) สีผูก `--cds-*` จาก tokens.json

| เรื่อง | สถานะ |
|---|---|
| ขนาด 40 / 48, padding, ฟอนต์ 16/24 | ตรง (วัดแล้ว) |
| ป้ายชื่อ 12/16 และ 14/20, ข้อความช่วย 12/16 สี `#334155`, ป้ายชื่อรอง | ตรง (วัดแล้ว) |
| สีขอบปกติ `#E2E8F0`, โฟกัส `#2563EB`, ผิดพลาด `#DC2626` | ตรง (วัดแล้ว) |
| ปิดใช้งาน (พื้น `#F1F5F9`, ตัวหนังสือ `#94A3B8`, opacity 1) | ตรง (วัดแล้ว) |
| textarea สูง 96 / 120, มุมโค้ง 8 / 12, padding | ตรง (วัดแล้ว) |
| ขอบตอนชี้เมาส์ (`border/strong`) | ตั้งไว้ในโค้ด **ยังไม่ได้วัด** |
| ความหนา 2px ของโฟกัสและผิดพลาด | ตั้งไว้ในโค้ด วัดแค่สี ยังไม่ได้วัดความหนา |

**ผลกระทบ:** ขอบปกติจางลงจาก `#CBD5E1` เป็น `#E2E8F0`, โฟกัสและผิดพลาดเป็นขอบ 2px แทนวงแหวนจาง 3px, ปิดใช้งานเป็นสีเฉพาะแทนลด opacity, ช่อง textarea มุมโค้ง 8 แทน 24, ป้ายชื่อใน `Field` เป็น 12 (ช่อง 40) และข้อความช่วยเป็น 12 ใช้กับทุกที่ที่ใช้ `Input`, `Textarea`, `InputGroup`, `Field` เช่น Select และ Combobox ที่ประกอบจาก InputGroup

**ยังไม่ได้ทำ / ตรวจไม่ได้:** `input-horizontal` (ป้ายชื่อซ้าย กว้าง 80), ช่อง Select และ Dropdown ที่มีสไตล์ของตัวเอง (หน้า Dropdown แยก), ไอคอนหน้า/หลังช่อง, textarea แบบ `scrollable`

## Combobox และ disabled label — 26 พฤศจิกายน 2026

อัปเดต Combobox ตาม [COMBOBOX-FIGMA.md](COMBOBOX-FIGMA.md): รองรับช่อง40/48px, ลูกศร20/24px และ reuse Field/InputGroup เดิม. `FieldLabel` disabled ใช้ `content/disabled` โดยไม่ลด opacity ตามที่ผู้ใช้ยืนยัน; ผลตรวจอยู่ใน [COMBOBOX-AUDIT.md](COMBOBOX-AUDIT.md). ไม่ได้อัปเดต Figma docs กลับเอง.
