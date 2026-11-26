# Coverage audit — 26 พฤศจิกายน 2026

ไล่ทุกหน้า Figma ที่ทำไปแล้ว เทียบ ชุดและ variant ใน Figma → API ในโค้ด → story ที่เปิดดูได้ → กรอบเอกสารใน Figma

## ผลต่อหน้า

| หน้า | กรอบเอกสารใน Figma | story / API ครบทุก variant | สิ่งที่แก้ในรอบนี้ |
|---|---|---|---|
| Button | มี (Template) | ไม่ครบ: ทำแล้ว `button` (4 variant × 3 color × 4 state × 3 size) | แก้ชื่อ prop และ token ใน doc ส่วน `button` มาตรฐาน |
| Breadcrumb | มี | ครบ (dropdown เป็นตัวอย่างประกอบ ยังไม่เปิดเมนูจริง) | — |
| Tooltip | มี (Core 4716:60403, Mira 7292:35) | ครบ: tooltip 5 → `Placements` + `WithoutArrow`, tooltip-with-action 8 → `ActionPlacements`, credit-tooltip 9 → `StatusesAndPlacements`; วัดใน `FigmaSpecs` | เปลี่ยนชื่อชุด, ผูก token ตาม Figma, ไอคอนปุ่ม guide, Mira กลับเป็น 10px / gap 2 |
| Button (ชุดแยก icon / loading / link / decorative) | มี (Button Doc) | ครบ: icon 108 → `IconButtons`, loading 9 → `LoadingButtons`, link 12 → `LinkButtons`, decorative 12 → `DecorativeButtons` (hover / pressed เป็น CSS ตรวจด้วยเมาส์จริงบางส่วน) | เปลี่ยนชื่อชุด, แก้โค้ด link / decorative / icon-sm / neutral, เพิ่ม story วัดค่า |
| Divider (separator) | มี (Documentation Card) | ครบ: horizontal / vertical → `Default`, `Orientations` | รวม 2 ชิ้นส่วนเป็นชุด `separator`, ผูกสี `border/default`, เพิ่ม story |
| Browser Scroll (scrollbar) | มี (Documentation Card) | ครบ: 8 แบบ (vertical / horizontal × end × track) → `Scrollbars` (`end` ไม่ใช่ prop) | แก้ค่า orientation, `bg` → `track`, แก้ `ScrollBar` ให้ตรง Figma |
| Keyboard | มี (Documentation Card) | ไม่ใช่ component (อ้างอิง G-Board) ไม่มีโค้ด | เขียน doc ระบุว่าเป็นภาพอ้างอิง |
| Button Split / Button Mic | มี (ส่วน split / mic ใน Button Doc) | ครบ: split 24 แบบ → `ColorsAndSizes` + `FigmaSpecs`; mic 12 แบบ → `VariantsAndStatus` + `FigmaSpecs` (hover / pressed เป็น CSS) | สร้างใหม่ + เปลี่ยนชื่อชุด + เชื่อม Code Connect |
| Card | มี (Code contract & audit) | story ครบทุกชุด | — |
| Checkbox | มี | ครบ (field, group, card) | แก้ `color=error` → `error=true`, `MUI mapping` → `Code mapping` ใน doc |
| Chip | มี | ครบ | แก้ `size: small/medium` → `sm/default`, ตัดคำว่า MUI ใน doc |
| Drawer (Sheet) | มี | ครบ 4 ด้าน | — |
| Dropdown (Select) | มี | ครบ | แก้ `size` ใน doc |
| Input Field | มี | `input-horizontal` เพิ่มแล้ว (ดูข้อล่าง) | แก้ `size` และ radius ใน doc |
| Input OTP | มี | ครบ | — |
| Menu | มี | เพิ่ม story แบบเลื่อนได้ (`scrollable`) | แก้ชื่อ `crv-dropdown` → `select` ใน doc |
| Overlay | มี | ครบ (ไม่มี variant) | — |
| Dialog (Modal) | มี | เพิ่ม story `align=center` และไม่มีไอคอน | — |
| Pagination | มี (สร้างรอบก่อน) | ครบ 4 Case | — |
| Sidebar | มี | ครบ รวมชุดที่ประกอบเสร็จ | — |
| Sortable | มี | ครบ | กรอบ doc อยู่ใน section จนล้นขอบ ย้ายออกมาที่ระดับหน้าแล้ว |
| Stepper | มี | ครบทุกสถานะและแนวตั้ง | — |
| Switch | มี | ครบ | — |
| Table | มี (Table Doc, แก้ชื่อ prop แล้ว) | ครบ: sm / default, striped, hover, disabled, เรียง, compact, text cell, scroll shadow, ตัวอย่างประกอบ | — |
| Tag | มี (แก้ตัวเลข/ชื่อให้ตรง Figma) | ครบ: filled/outlined, 5 สี, 3 ขนาด, count, ไอคอน, tag-color 8 สี | — |
| Toast | มี (แก้ชื่อ prop แล้ว) | ครบ 15 แบบ (`AllVariants`) + ส่วนเปิดปิดได้ + toast จริง | — |
| Toggle Group (รวม joined) | สร้างใหม่ | ครบ: appearance 3 แบบ, แนวนอน/ตั้ง, segmented, language-switcher | ชุดเดิม `crv-toggle-button`/`crv-toggle-group` ยังไม่ทำ |
| Combobox (Autocomplete) | มี (Code contract & audit) | ครบ | — |

## เพิ่มในรอบนี้

- `Field orientation="labelStart"` = Figma `input-horizontal` (ป้ายชื่อกว้าง 80 ทางซ้าย ช่องว่าง 16) story `Horizontal` วัดแล้ว: ป้าย 80, ช่องกว้าง 320 สูง 40 และ 48
- story ใหม่: `FigmaDialogCenter`, `FigmaDialogNoIcon`, `FigmaMenuScrollable`

## ช่องว่างที่ยังเหลือ (ไม่ได้ทำ)

- **Button**: ชุดใน Figma ที่ยังไม่มีในโค้ดและยังไม่เปลี่ยนชื่อ: `crv-button-icon`, `crv-button-loading`, `crv-link`, `crv-button-decorative`, `crv-button-mic`, `crv-button-split` และข้อความใน doc ของ Button ส่วนที่เกี่ยวกับชุดเหล่านี้ยังใช้ชื่อเดิม
- `input-horizontal` ยังไม่มี `InputGroup` แนวนอนแบบมีไอคอนหน้า (ตัวอย่างใน Figma มีไอคอนค้นหา) ใช้ `InputGroup` ใส่ใน `Field orientation="labelStart"` ได้แต่ยังไม่มี story
- รายการ "ยังไม่ได้วัด" ในแต่ละไฟล์ `*-FIGMA.md` (สี hover / pressed / focus หลายจุด) ยังเหมือนเดิม
- ข้อความตัวอย่างโค้ดใน doc ของ Button, Input Field ที่อ้าง MUI (`MUI mapping` ของบางหน้า) อาจเหลือ ตรวจแค่คำหลักที่ใช้แทนชื่อ prop

## วิธีตรวจ

Figma: อ่านชุดและ variant ทุกหน้าผ่านสคริปต์ แล้วสแกนข้อความในกรอบเอกสารหาคำเก่า (`crv-`, `MUI`, `medium`, `small`, `contained`, `type=`, `color=`) · โค้ด: ไล่ชื่อ story ของแต่ละคอมโพเนนต์ และเปิดไฟล์ story ที่สงสัย ไม่ได้ render ทุก variant ทีละตัว
