# Chip — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Chip](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4459-62744) (ไฟล์ Cariva Core Design System) สีทุกจุดในชุดผูกกับตัวแปรในไฟล์ (392 จุด ไม่มี library เก่า ไม่มีสีดิบ)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | instance (ก่อน → หลัง) |
|---|---|---|
| `chip` | `crv-chip-action` | 8 → 8 |

ค่า `size` เปลี่ยน medium → `default`, small → `sm`; ส่วน `variant` (filled / outlined / surface), `color` (default / primary), `state` ไม่เปลี่ยน

## สเปก

- แคปซูล (มุมโค้ง 9999) padding 4; `default` สูง 32 ตัวอักษร 14/20 Medium; `sm` สูง 24 ตัวอักษร 12/16 Medium; ตัวอักษรมี padding ซ้ายขวา 4
- thumbnail (avatar) 24 (sm 20); ปุ่มลบ 24 (sm 16) ซ่อนเป็นค่าเริ่มต้น
- filled default: พื้น `on-surface/subtle` · filled primary: พื้น `brand/primary/on-surface/default` ตัวอักษร `brand/primary/content/on-fill` ไอคอน `content/on-brand`
- outlined: ขอบ 1px `border/default` (primary: `brand/primary/border/default` ตัวอักษร `brand/primary/content/default`)
- surface: พื้น `on-surface/default` ไม่มีขอบ (primary: ตัวอักษร `brand/primary/content/default`)
- hover / pressed: พื้น `on-surface/action/hover` / `…/pressed` (filled primary ใช้ `brand/primary/on-surface/hover` / `pressed`; outlined และ surface primary ใช้ `brand/primary/on-surface/subtle`); pressed มีเงา drop shadow รัศมี 2
- disabled: พื้น `on-surface/action/disabled` (outlined ไม่มีพื้น) ตัวอักษรและไอคอน `content/disabled`
- ไอคอนลบ: `content/secondary` (primary: `brand/primary/content/default`, filled primary: `content/on-brand`)

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `chip` | `Chip` (`ui/chip.tsx`) |
| `size` default / sm | `size` |
| `variant`, `color` | `variant`, `color` |
| `state` disabled | `disabled` |
| `state` hover / pressed | CSS (`hover:`, `active:`) |
| `thumbnailVisible` | prop `thumbnail` |
| `deleteVisible` | prop `onDelete` (มีปุ่มลบเมื่อส่งฟังก์ชัน) |
| `label` | children |

## โค้ด (26 พ.ย. 2026)

DS เดิมไม่มี Chip (Badge เป็นป้ายแสดงผล ไม่กดได้) จึงสร้างใหม่ใน Core เป็นช่องว่างของ DS ที่รายงานแล้ว ไม่ได้ใช้ `npx shadcn add`

| เรื่อง | สถานะ |
|---|---|
| ความสูง 32 / 24, กว้าง 45 / 41 (ข้อความ "Chip"), มุมโค้งแคปซูล | ตรง (วัดใน story) |
| สีพื้น filled default / primary / disabled, ขอบ outlined primary | ตรง (วัดใน story) |
| ปุ่มลบ 24×24 | ตรง (วัดใน story) |
| สี hover / pressed, สีไอคอน, thumbnail 24/20, ปุ่มลบ sm 16 | ตั้งตาม Figma **ยังไม่ได้วัด** |
| ไอคอนลบ | ใช้รูป Material "cancel" เส้นเดียวกับ Figma (ไม่ได้คัดลอก path จาก Figma) |

**ตัดสินใจร่วมกับผู้ใช้:** ตอน pressed ใช้เงา `shadow/sm` จาก token `--cds-shadow-sm` (เพิ่ม 26 พ.ย. 2026 ยังไม่ได้วัดตอนกดจริง); disabled ไม่มีเงา; `surface` พื้นขาวไม่มีขอบตาม Figma (ผู้ใช้ยังไม่ได้ยืนยันว่าตั้งใจ)

**เพิ่มเอง:** วงแหวนโฟกัสคีย์บอร์ด 2px `border/system` (Figma ไม่มีสถานะโฟกัส)
