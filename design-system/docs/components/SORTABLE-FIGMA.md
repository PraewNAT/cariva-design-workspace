# Sortable — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Sortable](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=7204-63931) (ไฟล์ Cariva Core Design System) ผู้ใช้ยืนยันชื่อและการเพิ่ม `@dnd-kit` กรอบเอกสาร `Documentation Card` (node `7223:102514`) สร้างในหน้านี้แล้ว

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | prop |
|---|---|---|
| `sortable-handle` | `crv-sortable-handle` | `state` default / focus / disabled |
| `sortable-item` | `crv-sortable-item` | `layout` list / grid, `state` default / hover / focus / dragging / placeholder / disabled, `title`, `description`, `showDescription` |
| `sortable` | `crv-sortable` | `layout` list / grid, `dragging` false / true |

ชื่อ prop และค่าเดิมตรงกับที่ใช้ในโค้ดอยู่แล้วจึงไม่ได้เปลี่ยน instance ไม่ได้นับก่อนเปลี่ยนชื่อ (สคริปต์นับหมดเวลา) แต่การเปลี่ยนชื่อชุดไม่ตัดการเชื่อม

## สเปก

- ที่จับ: 32×32 มุม 8 ไอคอน `DragIndicatorRounded` 20 · default / focus `content/secondary` · focus ขอบ 1px `border/system` · disabled `content/disabled`
- การ์ด list: 400×80 padding 16 ช่องว่าง 8 มุม 12 ขอบ 1px `border/default` พื้น `on-surface/elevated` · หัวข้อ 14/20 Medium `content/primary` คำอธิบาย 14/20 `content/secondary` ช่องว่าง 4
- การ์ด grid: 200×144 เรียงแนวตั้ง ช่องว่าง 8
- hover พื้น `on-surface/subtle` · focus และ dragging ขอบ `border/system` · placeholder ขอบประ 4,4 พื้น `on-surface/subtle` เนื้อหาซ่อน · disabled ข้อความ `content/disabled`
- `sortable`: ช่องว่าง 16 ตอน `dragging=true` รายการที่ลากกลายเป็น placeholder และมีสำเนาลอย (`Drag overlay`) ขอบ `border/system`

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `sortable` | `Sortable` (`ui/sortable.tsx`; props `items`, `onItemsChange`, `layout`, `renderOverlay`) |
| `sortable-item` | `SortableItem` (`id`, `title`, `description`, `disabled`) และ `SortableItemView` (สำหรับสำเนาลอย) |
| `sortable-handle` | `SortableHandle` |
| `layout` | prop `layout` ของ `Sortable` |
| `state` hover / focus / placeholder | CSS และสถานะของ dnd-kit · `dragging` = `SortableItemView state="dragging"` ใน `renderOverlay` · `disabled` = prop |
| `showDescription`, `dragging` ของชุด `sortable` | เฉพาะ Figma (ไม่ส่ง `description` = ไม่แสดง) |

## โค้ด (26 พ.ย. 2026)

เพิ่ม dependency `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` ตามที่ผู้ใช้ยืนยัน ลากได้เฉพาะที่จับ รองรับเมาส์ (ลากเกิน 4px) และคีย์บอร์ด (Space, ลูกศร, Space) ไอคอนที่จับคัดลอก path จาก Figma ไว้ใน `app/icons.tsx` (`DragIndicatorRounded`)

| เรื่อง | สถานะ |
|---|---|
| list 400×80, padding 16, ช่องว่าง 8, มุม 12 | ตรง (วัดใน story `List`) |
| ที่จับ 32×32 มุม 8 | ตรง (วัดแล้ว) |
| grid 200×144 | ตรง (วัดใน story `Grid`) |
| เรียงใหม่ด้วยคีย์บอร์ด | ผ่าน (ทดสอบ `b,a,c`) |
| disabled ปิดที่จับ | ผ่าน |
| สี hover, focus, placeholder, ขอบประ | ตั้งตาม Figma **ยังไม่ได้วัด** |

**ยังไม่ได้ตรวจ:** การลากด้วยเมาส์จริงในเบราว์เซอร์, ข้อความประกาศสำหรับ screen reader (ใช้ค่าเริ่มต้นของ dnd-kit), ความสูง 80 / 144 ตั้งเป็นความสูงขั้นต่ำ (Figma ตั้งตายตัว) ถ้าข้อความยาวกว่าจะขยาย
