# Stepper — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Stepper](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4714-4654) (ไฟล์ Cariva Core Design System; section `Stepper / ReUI reference / New`) ผู้ใช้ยืนยันชื่อตามที่ Claude เสนอ กรอบ `Documentation Card` (node `7223:103363`) สร้างในหน้านี้แล้ว

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | prop | instance (ก่อน → หลัง) |
|---|---|---|---|
| `stepper` | `crv-stepper-new` | `orientation` horizontal / vertical, `labels`, `loading` | 0 → 0 |
| `step` | `crv-step` | `orientation`, `state` inactive / active / complete / loading / disabled, `title`, `description`, `showDescription`, `showLabel` | 24 → 24 |
| `step-indicator` | `crv-step-indicator` | `state` (ห้าค่าเดียวกัน), `number` | 34 → 34 |
| `step-check-icon` | `Stepper / Check icon` | — | — |
| `step-loading-icon` | `Stepper / Loading icon` | — | — |

ค่า `orientation` และ `state` เปลี่ยนเป็นตัวพิมพ์เล็ก

## สเปก

- ตัวบ่งชี้: วงกลม 24 เลข 14/20 Regular · inactive พื้น `on-surface/action/selected` ตัวอักษร `content/primary` · active พื้น `brand/primary/on-surface/default` ตัวอักษร `brand/primary/content/on-fill` · complete พื้น `status/success/on-surface/default` มีเครื่องหมายถูก 16 · loading พื้นเดียวกับ active มีไอคอนหมุน 16 · disabled ตัวอักษร `content/disabled`
- step: ช่องว่าง 8 ชื่อ 14/20 `content/primary` คำอธิบาย 14/20 `content/secondary` · horizontal ตัวบ่งชี้อยู่เหนือข้อความ · vertical ตัวบ่งชี้อยู่ซ้าย
- stepper horizontal: ช่องละ 120 ช่องว่าง 80 เส้นเชื่อม 168×2 (ห่างตัวบ่งชี้ 4 ทั้งสองข้าง) · vertical: แถวละ 88 เส้นเชื่อม 56×2 ห่างตัวบ่งชี้ 4
- เส้นเชื่อมที่ผ่านขั้นเสร็จแล้ว `status/success/on-surface/default` ที่เหลือ `border/default`

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `stepper` | `Stepper` (`ui/stepper.tsx`; `steps[{title, description, disabled}]`, `value` เริ่มจาก 0, `orientation`, `labels`, `loading`) |
| `step` | `Step` (`title`, `description`, `state`, `orientation`, `showLabel`) |
| `step-indicator` | `StepIndicator` (`state`, `number`) |
| `step-check-icon` / `step-loading-icon` | `StepCheckIcon` / `StepLoadingIcon` (path คัดลอกจาก Figma) |
| `state` ของแต่ละขั้น | คำนวณใน `Stepper` จาก `value` (ก่อนหน้า complete, ปัจจุบัน active หรือ loading) ยกเว้นมี `disabled` |
| `loading` ของชุด `stepper` | prop `loading` (ขั้นปัจจุบันแสดงตัวหมุน) |

`Stepper` เดิมใน `app/patterns.tsx` (ตัวอย่าง Badge + Progress ที่หน้า Catalog) เปลี่ยนไปใช้ `Stepper` ใหม่ ยังส่งออกชื่อเดิมและมีปุ่ม ย้อนกลับ / ถัดไป เหมือนเดิม เพิ่มปุ่ม แนวตั้ง และ กำลังโหลด แต่ไม่มีแถบ Progress แล้ว

## โค้ด (26 พ.ย. 2026)

Storybook `Core/Components/Stepper` มี story: `Steps` (ตัวอย่างโต้ตอบที่หน้า Catalog มีปุ่ม แนวตั้ง และ กำลังโหลด), `Horizontal`, `Vertical`, `Loading` (สองแนว), `States` (ตัวบ่งชี้ครบห้าสถานะ), `WithDisabledStep`, `NoLabels`

| เรื่อง | สถานะ |
|---|---|
| ตัวบ่งชี้ 24 กลม, สี active `#1789FA`, complete `#047857`, inactive `#EEF9FF` | ตรง (วัดใน story `Horizontal`) |
| ช่องละ 120 ช่องว่าง 80, เส้นเชื่อม 168×2, สีเส้นตามขั้นที่เสร็จ | ตรง (วัดแล้ว) |
| vertical: แถว 88, เส้น 2×56 | ตรง (วัดใน story `Vertical`) |
| `labels=false` สูง 24 | ตรง (วัดแล้ว) |
| ตำแหน่งเส้นเชื่อมแนวนอนเมื่อมีป้ายชื่อ, ตัวหนังสือสี disabled, ตัวหมุน | ตั้งตาม Figma **ยังไม่ได้วัด** |

**ตัดสินใจโดย Claude:** ตัวหมุนตอน loading หมุนด้วย CSS และหยุดเมื่อผู้ใช้ตั้ง reduced motion · API เป็นแบบ `steps[]` + `value` แทนการประกอบ `Step` เอง (ยังส่งออก `Step` และ `StepIndicator` ไว้ถ้าต้องการประกอบเอง)

**ผลกระทบ:** `Stepper` ในหน้า Catalog เปลี่ยนหน้าตา (ไม่ใช่ Badge + Progress) ผู้ที่เคยใช้ `Stepper` จาก `patterns` ได้ตัวอย่างที่มีปุ่มควบคุมในตัวเหมือนเดิม

**ยังไม่ได้ตรวจ:** การโต้ตอบ (Figma ไม่มี hover / focus ขั้นตอนกดไม่ได้), การตัดบรรทัดเมื่อชื่อยาวบนมือถือ
