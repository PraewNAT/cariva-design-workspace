# Scrollbar — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: หน้า Browser Scroll (`4164:182`) ชุด `scrollbar` (`4164:476`) ในไฟล์ Cariva Core Design System ผู้ใช้ยืนยันตามที่ Claude เสนอ กรอบเอกสาร `Documentation Card` (`7308:122015`) อยู่ในหน้านี้

## ชุดใน Figma (แก้ค่าแล้ว 26 พ.ย. 2026 ชื่อเดิมสำรองใน plugin data `oldVariantNames_2026-11-26`)

| ชื่อชุด | ค่า | instance ก่อน → หลัง |
|---|---|---|
| `scrollbar` (เดิม `crv-browser-scroll`) | `orientation` vertical / horizontal, `end` false / true, `track` true / false (เดิม `bg`) | 6 → 6 |

ค่า `orientation` เดิมชื่อเพี้ยน: `Horizontal` / `Orientation` คือแถบแนวตั้ง (15×200) → `vertical`, `Vertical` / `Orientation4` คือแถบแนวนอน (200×15) → `horizontal` และแก้ตำแหน่งแท่งของ `horizontal / end=true / track=false` (เดิมอยู่ต้นแถบ ตอนนี้อยู่ปลายแถบเหมือนแบบอื่น)

## สเปก

ช่อง 15px (แนวตั้ง 15×200, แนวนอน 200×15) padding 4px แท่งกว้าง 7px สี `slate/500` (`#64748B`) มุมกลม · `track=true` พื้นช่อง `slate/100` (`#F1F5F9`) · `end` คือแท่งอยู่ปลายแถบ (เลื่อนสุด)

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `scrollbar` | `ScrollBar` และ `ScrollArea` (`ui/scroll-area.tsx`) |
| `orientation` | `orientation` ของ `ScrollBar` (`vertical` / `horizontal`); `ScrollArea orientation` `vertical` / `horizontal` / `both` |
| `track` | `track` (พื้นหลัง `--cds-on-surface-sunken`) |
| `end` | ไม่มี prop (ตำแหน่งที่เลื่อนถึง) |

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| ช่อง 15px, padding 4px, แท่งกว้าง 7px มุมกลม, แท่งสี `#64748B`, พื้นช่อง `#F1F5F9` เมื่อ `track` (แนวตั้งและแนวนอน) | ตรง (วัดใน story `Scrollbars`) |
| ภาพรวมเทียบ Figma | ตรวจด้วยสายตา (ตรง) |

**ผลกระทบ:** เดิมกว้าง 10px แท่งสีเทาอ่อน ตอนนี้กว้าง 15px แท่งเข้มขึ้น `ScrollArea` เพิ่ม prop `orientation` (ค่าเริ่มต้น `vertical` เหมือนเดิม) และ `track` ทุกที่ที่ใช้ `ScrollArea` หน้าตาแถบเลื่อนเปลี่ยน

**ตัดสินใจโดย Claude / ผู้ใช้ยืนยัน:** Figma ผูกสี `slate/500` และ `slate/100` กับตัวแปร Foundation โดยตรง (ไม่มี semantic) โค้ดใช้ semantic ที่ค่าเท่ากัน (`--cds-content-placeholder`, `--cds-on-surface-sunken`) **ขอให้ทีม DS ตัดสินใจสร้าง token ของ scrollbar** (ผมไม่สร้างเอง ตามกฎสีใหม่ต้องแจ้งทีมก่อน)

**ยังไม่ได้วัด:** hover และการซ่อนแท่งอัตโนมัติ (ไม่มีดีไซน์), การทำงานเมื่อมีทั้งสองแถบพร้อมกัน (`orientation="both"`) มุมที่แถบสองแนวมาชนกัน
