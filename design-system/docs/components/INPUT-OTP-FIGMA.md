# Input OTP — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Input OTP](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4315-281) (ไฟล์ Cariva Core Design System) สีทุกจุดในชุดผูกตัวแปรในไฟล์

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | instance (ก่อน → หลัง) |
|---|---|---|
| `input-otp` (prop `state` default / error → `error` false / true) | `crv-input-otp-standard` | 2 → 2 |
| `input-otp-slot` (`state` เดิม) | `crv-input-otp-base` | 28 → 28 |

ข้อความชื่อเดิมในกรอบ `📄 Input OTP Doc` (4 จุด) เปลี่ยนเป็นชื่อใหม่แล้ว (ข้อความเดิมใน plugin data `docText_2026-11-26`) ชื่อ prop ในกรอบเอกสารยังไม่ได้แก้

## สเปก

- ช่อง 40×40 มุมโค้ง 12 (คงที่ ไม่ตาม Product) พื้น `on-surface/default` ขอบ 1px `border/default` ตัวเลข 16/24 `content/primary`; ช่องแยกกัน ห่าง 12
- focused: ขอบ `border/system` 2px เคอร์เซอร์ `brand/primary/content/default` · focusedFilled: ขอบเดียวกัน
- disabled: ขอบ `border/disabled` 1px ตัวเลข `content/disabled` (พื้นยังเป็น `on-surface/default`)
- กลุ่ม: ป้ายชื่อ 14/20 Medium `content/primary` · ข้อความช่วย 14/20 `content/secondary` · ข้อความผิดพลาด 14/20 `status/error/content/default` ช่องว่างส่วน 12
- **แก้ใน Figma แล้ว (26 พ.ย. 2026, ตามที่ผู้ใช้สั่ง):** แบบ `error=true` เดิมเปลี่ยนแค่ข้อความช่วยเป็นสีแดง ตอนนี้ขอบทั้ง 6 ช่องเป็น `border/error` 2px (แก้ instance ซ้อน ค่าเดิมสำรองใน plugin data `slotStrokeBackup_2026-11-26`)

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `input-otp` | `InputOTP` + `InputOTPGroup` (`ui/input-otp.tsx`) |
| `input-otp-slot` | `InputOTPSlot` |
| `error` | prop `error` (ตั้ง `aria-invalid`) |
| `state` disabled | `disabled` ของ `InputOTP` |
| `state` focused / filled / focusedFilled | เฉพาะ Figma (โค้ดใช้ slot ที่ active และค่า) |
| `label`, `helperText`, `errorMessage` | `FieldLabel`, `FieldDescription`, `FieldError` (ห่อด้วย `Field`) |
| ตัวคั่น | `InputOTPSeparator` (ไม่อยู่ใน Figma คงเดิม) |

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| ช่อง 40×40, มุมโค้ง 12, ห่าง 12 | ตรง (วัดใน story `FigmaStates`) |
| ขอบปกติ `#E2E8F0`, error `#DC2626`, ช่องที่โฟกัส `#2563EB` | ตรง (วัดใน story) |
| disabled ตัวเลข `#94A3B8` พื้นขาว | ตรง (วัดใน story) |
| ขอบ disabled, ความหนา 2px ของโฟกัสและ error, สีเคอร์เซอร์ | ตั้งตาม Figma **ยังไม่ได้วัด** |

**ตัดสินใจร่วมกับผู้ใช้:** error เปลี่ยนขอบทั้งช่องเป็น `border/error` 2px ตามเอกสาร Figma (Figma ตรงกันแล้ว)

**ผลกระทบ:** `InputOTP` เดิมเป็นกล่องต่อกันมุมโค้งเฉพาะปลาย โฟกัสวงแหวน 3px และ disabled ลด opacity ตอนนี้เป็นช่องแยกมุม 12 ห่าง 12 โฟกัส/error ขอบ 2px และ disabled เป็นสีเฉพาะ
