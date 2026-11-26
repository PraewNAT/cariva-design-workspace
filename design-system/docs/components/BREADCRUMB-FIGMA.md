# Breadcrumb — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Breadcrumb](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3875-4578) (ไฟล์ Cariva Core Design System) สีทุกจุดผูกกับตัวแปรในไฟล์ (99 จุด ไม่มีที่ผูก library เก่า)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว 26 พ.ย. ชื่อเดิมสำรองใน plugin data `oldNames_2026-11-26` / `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | หมายเหตุ |
|---|---|---|
| `breadcrumb-item` | `crv-breadcrumb-base` | 5 แบบ ค่า `type` เปลี่ยนเป็น `link` (เดิม default), `hover`, `dropdown`, `ellipsis`, `page` (เดิม active) |
| `breadcrumb` | `crv-breadcrumb-standard` | แถวเต็ม มีสวิตช์ `breadcrumb-01` ถึง `05` (เฉพาะ Figma) |

instance ที่ใช้ชุดเหล่านี้ 76 ตัว ก่อนและหลังเปลี่ยนชื่อเท่ากัน

## สเปก

- ข้อความ 14/20 Medium ช่องว่างระหว่างรายการกับตัวคั่น 12px
- `link`: `brand/primary/on-surface/default` (#1789FA) · `hover`: `brand/primary/content/strong` (#0F70E6) · `page` (หน้าปัจจุบัน): `content/secondary` (#334155)
- `dropdown`: ข้อความแบบ `link` + ลูกศรลง 16px สี `content/secondary` ห่าง 4px
- `ellipsis`: กล่อง 32×32 ไอคอนจุดสามจุด 16px สี `content/secondary`
- ตัวคั่น: ลูกศรขวา 16px สี `content/secondary`
- **หมายเหตุ:** สีลิงก์ผูกกับตัวแปรกลุ่ม `brand/primary/on-surface/default` (ชื่อกลุ่มพื้นผิว) ไม่ใช่กลุ่ม `content` ค่าเหมือนกัน โค้ดผูกตาม Figma

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `breadcrumb` (แถว) | `Breadcrumb` + `BreadcrumbList` |
| `breadcrumb-item` type `link` / `hover` | `BreadcrumbLink` (hover เป็น CSS) |
| type `page` | `BreadcrumbPage` |
| type `ellipsis` | `BreadcrumbEllipsis` |
| type `dropdown` | `BreadcrumbLink` ตามด้วยไอคอนลูกศรลง (ดู story `FullRow`) |
| ตัวคั่น | `BreadcrumbSeparator` |
| `text` | children |
| `breadcrumb-01…05`, `hover` | เฉพาะ Figma |

## โค้ด (26 พ.ย. 2026)

แหล่ง `src/lib/app/components/ui/breadcrumb.tsx` ไอคอนตัวคั่นและจุดไข่ปลาเป็นไอคอน Material ที่คัดลอกจาก Figma ไว้ใน `app/icons.tsx` (`ChevronRightRounded`, `MoreHorizRounded`) เดิมใช้ไอคอนเส้นของ hugeicons

| เรื่อง | สถานะ |
|---|---|
| ข้อความ 14/20 น้ำหนัก 500, ช่องว่าง 12px | ตรง (วัดแล้ว) |
| สีลิงก์ `#1789FA`, หน้าปัจจุบัน `#334155`, ตัวคั่น `#334155` | ตรง (วัดแล้ว) |
| สีตอนชี้เมาส์ `#0F70E6` | ตรง (วัดในเบราว์เซอร์แล้ว) |
| ตัวคั่น 16px, กล่องจุดไข่ปลา 32px | ตรง (วัดแล้ว) |
| รูปร่างไอคอน | ใช้เส้นเดียวกับ Figma ตรวจด้วยสายตา |

**ผลกระทบ:** ลิงก์เดิมเป็นสีเทา ตอนนี้เป็นสีน้ำเงิน และหน้าปัจจุบันเป็นสีรองน้ำหนักกลาง ใช้ที่หน้า Catalog และ story

**ยังไม่ได้ตรวจ:** การตัดบรรทัดเมื่อ path ยาวบนมือถือ (Figma ไม่มีดีไซน์), ตัวรายการ dropdown ที่เปิดรายการจริง (ในโค้ดเป็นตัวอย่างประกอบ ยังไม่ได้เชื่อมกับเมนู), สถานะ focus ของลิงก์
