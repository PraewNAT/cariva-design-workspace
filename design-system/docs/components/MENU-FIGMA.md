# Menu (dropdown-menu) — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Menu](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4497-77728) (ไฟล์ Cariva Core Design System) สีทุกจุดในชุดผูกตัวแปรในไฟล์ (87 จุด ไม่มี library เก่า)

ผู้ใช้สั่ง (26 พ.ย. 2026) ให้ใช้เมนูนี้กับรายการทุกแบบที่หล่นลงมาจาก trigger จึงใช้สเปกเดียวกับ **DropdownMenu, Select และ Combobox**

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | instance (ก่อน → หลัง) |
|---|---|---|
| `dropdown-menu-item` | `crv-menu-item` | 135 → 135 |
| `dropdown-menu-content` | `crv-menu` | 1 → 1 |

prop เดิมไม่เปลี่ยน (`variant` default / checkbox, `state` default / hover, `selected`, `disabled`, `scrollable`) ข้อความชื่อเดิมในกรอบเอกสาร (7 จุด) เปลี่ยนเป็นชื่อใหม่แล้ว

## สเปก

- **พื้นผิว (`dropdown-menu-content`):** พื้น `on-surface/default` มุมโค้ง 12 padding บน/ล่าง 8 (ไม่มี padding ซ้ายขวา รายการเต็มความกว้าง; ผู้ใช้แก้ใน Figma 26 พ.ย. 2026 จากเดิม padding 8 รอบด้าน) ขอบ 1px `border/default` เงา `shadow/lg` ตัวอย่างกว้าง 200 รายการกว้าง 200 (สูงสุดตามเนื้อหา, `scrollable=true` เลื่อนได้)
- **รายการ (`dropdown-menu-item`):** สูง 40 padding 8/16 ช่องว่าง 12 มุมโค้ง 4 ข้อความ 14/20 Medium `content/primary`; ไอคอนหน้าและหลัง 20px สี `content/secondary` (ซ่อนได้)
- hover: พื้น `on-surface/action/hover` · selected: พื้น `on-surface/action/selected` และไอคอนท้ายสี `brand/primary/content/default`
- disabled: ข้อความและไอคอน `content/disabled` พื้นปกติ
- `variant=checkbox`: ไอคอนหน้าเป็นช่องติ๊ก 16px (มุม 4 ขอบ `border/default`; ติ๊กแล้วพื้น `brand/primary/on-surface/default` ไอคอนติ๊ก)

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `dropdown-menu-content` | `DropdownMenuContent`, `DropdownMenuSubContent`, `SelectContent`, `ComboboxContent` |
| `dropdown-menu-item` variant default | `DropdownMenuItem`, `DropdownMenuSubTrigger`, `DropdownMenuRadioItem`, `SelectItem`, `ComboboxItem` |
| `dropdown-menu-item` variant checkbox | `DropdownMenuCheckboxItem` |
| `state` hover | เฉพาะ Figma (โค้ดใช้ focus / highlighted) |
| `selected` | `data-selected` (Select, Combobox) / `data-checked` (checkbox, radio) |
| `disabled` | `disabled` |

สเปกร่วมอยู่ที่ `ui/menu-recipe.ts` (`menuSurfaceClass`, `menuPopupClass`, `menuItemClass`)

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| พื้นผิว: มุม 12, padding บน/ล่าง 8 ซ้ายขวา 0, พื้นขาว, เงา `shadow/lg` | ตรง (วัดใน story `FigmaMenu`; Select popup วัดก่อนปรับเป็น padding รอบด้าน 8 ยังไม่ได้วัดซ้ำ) |
| รายการ: สูง 40, padding 8/16, มุม 4, ข้อความ 14/20 น้ำหนัก 500 สี `#0F172A` | ตรง (วัดแล้วทั้ง DropdownMenu และ SelectItem) |
| disabled ข้อความ `#94A3B8` ไม่ลด opacity, ช่องติ๊ก 16px พื้น `#1789FA` ตอนติ๊ก, พื้น selected `#EEF9FF` | ตรง (วัดใน story) |
| Combobox popup, ไอคอนนำหน้า/ท้ายตามดีไซน์, `scrollable`, ขอบพื้นผิว 1px | ตั้งตาม Figma **ยังไม่ได้วัด** |

**ข้อควรทราบ:** รายการที่ทั้ง selected และ highlighted พร้อมกัน (เช่น ตอนเปิด Select ที่มีค่าเลือกอยู่) แสดงสี hover เพราะ Figma ไม่ได้กำหนดสถานะรวม; `DropdownMenuLabel`, `Separator`, `Shortcut` และเมนู Context / Menubar ไม่ได้แตะ

**ผลกระทบ:** รายการเมนูเดิมมุมโค้ง 24 (`rounded-xl`) padding 8/12 ตัวอักษร 14 ปกติ สีโฟกัส accent ตอนนี้มุม 4 padding 8/16 น้ำหนัก 500 สีพื้นตาม token; พื้นผิวเดิมมุม 24 เงา 2xl ตอนนี้มุม 12 เงา lg ขอบ 1px; ช่องติ๊กของ checkbox item อยู่ซ้าย (เดิมเครื่องหมายอยู่ขวา) กระทบทุกที่ที่ใช้ DropdownMenu / Select / Combobox รวมหน้า Catalog
