# Button Split — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: ชุด `button-split` (เดิม `crv-button-split`, node `5981:34184`, หน้า Button ในไฟล์ Cariva Core Design System) ผู้ใช้ยืนยันชื่อและ API ตามที่ Claude เสนอ เอกสารการใช้งานอยู่ในกรอบ `Button Doc (Template)` ของหน้า Button (ส่วน split)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26` / `oldVariantNames_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | prop ที่เปลี่ยน | instance ก่อน → หลัง |
|---|---|---|---|
| `button-split` | `crv-button-split` | `color` primary / error → `primary` / `destructive`; `size` large / medium / small → `lg` / `default` / `sm` | 3 → 3 |

prop อื่นคงเดิม: `state` default / hover / pressed / disabled, `startIconVisible`, `startIcon`, `endIcon`, `children` (ข้อความ)

## สเปก (อ่านจากตัวแปรใน Figma)

- รูปทรง pill (มุมกลม) ประกอบจากปุ่มหลัก (`action`) + เส้นแบ่ง 1px (`divider`) + ปุ่มเมนู (`trigger`) สูง 48 / 40 / 32 (lg / default / sm)
- ปุ่มหลัก: lg padding 12/24 gap 12 ข้อความ 16/24 Medium ไอคอน 24 · default padding 8/16 gap 8 ข้อความ 16/24 ไอคอน 24 · sm padding 8/12 gap 4 ข้อความ 12/16 ไอคอน 16
- ปุ่มเมนู: สี่เหลี่ยมจัตุรัสเท่าความสูง (48 / 40 / 32) padding 12 / 8 / 8 ไอคอน 24 / 24 / 16
- สี primary: พื้น `brand/primary/on-surface/default` (hover `/hover`, pressed `/pressed`) ตัวอักษรและไอคอน `brand/primary/content/on-fill` เส้นแบ่ง `brand/primary/border/strong`
- สี destructive (Figma error): พื้น `status/error/on-surface/default` (hover / pressed ตามชื่อ) ตัวอักษร `status/error/content/on-fill` เส้นแบ่ง `status/error/border/strong`
- hover / pressed ทำให้ทั้ง pill เปลี่ยนสี (ไม่ใช่เฉพาะครึ่งที่ชี้)
- disabled: พื้น `on-surface/action/disabled` ตัวอักษรและไอคอน `content/disabled` เส้นแบ่ง `border/disabled`

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `button-split` | `ButtonSplit` (`ui/button-split.tsx`) ใช้ Base UI `Button` + `DropdownMenu` เดิม |
| `color` | `color`: `primary` / `destructive` |
| `size` | `size`: `sm` / `default` / `lg` |
| `state=disabled` | `disabled` |
| `children` | `children` |
| `startIcon` | `startIcon` |
| `endIcon` | `endIcon` (ค่าเริ่มต้น `ChevronDownRounded`) |
| รายการในเมนู | `menu` (ผู้เรียกส่ง `DropdownMenuItem`) |
| `state=hover / pressed` | CSS (`hover:` / `active:` ที่ตัว pill) |

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| ความสูง 48 / 40 / 32, ปุ่มเมนูจัตุรัส, padding และขนาดข้อความของปุ่มหลักทุกขนาด, ไอคอน 24 / 16 | ตรง (วัดใน story `FigmaSpecs`) |
| สีพื้น primary `#1789FA` / destructive `#DC2626`, สีเส้นแบ่ง `#2DA4FF` / `#EF4444` กว้าง 1px, ตัวอักษรขาว | ตรง (วัดแล้ว) |
| disabled: พื้น `#F1F5F9`, ตัวอักษร `#94A3B8`, เส้นแบ่ง `#F1F5F9` | ตรง (วัดแล้ว) |
| hover primary `#0F70E6` ทั้ง pill | ตรง (วัดในเบราว์เซอร์ด้วยเมาส์จริง) |
| ภาพรวมเทียบ Figma | ตรวจด้วยสายตา (ตรง) |
| เปิดเมนู, เลือกด้วยคีย์บอร์ด, Escape ปิด, กดปุ่มหลักเรียก `onAction` | ตรวจใน story `Default` / `Action` |

**ตัดสินใจโดย Claude / ผู้ใช้ยืนยัน:** ไอคอนปุ่มเมนูเริ่มต้นเป็น chevron ลง (Figma ใช้ลูกศรไปขวาเป็นตัวอย่างที่สลับได้ผ่าน `endIcon`) · `error` เปลี่ยนชื่อเป็น `destructive` ให้ตรง `Button` · ไม่มีสถานะ `loading` (Figma ไม่มี)

**ผลกระทบ:** เป็น component ใหม่ ไม่กระทบโค้ดเดิม · ชื่อชุดใน Figma เปลี่ยน instance ทั้ง 3 ตัวยังอยู่

**ยังไม่ได้วัด:** สี pressed และ hover ของ destructive (ตั้งตาม token), การแสดงผลเมื่อข้อความยาวมาก (Figma ไม่มีดีไซน์), ตำแหน่งเมนูที่เปิดเมื่อชิดขอบจอ
