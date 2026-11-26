# Overlay — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Overlay](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4716-64196) (ไฟล์ Cariva Core Design System) งานนี้ผู้ใช้สั่งให้ตัดสินใจเองระหว่างที่ไม่อยู่ (ชื่อและ prop ด้านล่างเป็นการตัดสินใจของ Claude ยังไม่ผ่านการยืนยัน)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | instance (ก่อน → หลัง) |
|---|---|---|
| `overlay/sm` (390×844) | `crv-overlay/sm` | 2 → 2 |
| `overlay/md+` (1440×900) | `crv-overlay/md+` | 1 → 1 |

ข้อความชื่อเดิมในกรอบ `Doc — overlay` เปลี่ยนแล้ว (5 จุดรวมกับหน้า Modal) ทั้งสองเป็นสี่เหลี่ยมเต็มจอ ไม่มี prop

## สเปก

- พื้น `overlay/backdrop` (ดำ 40% = `#00000066`) ขนาดตามเฟรม (sm มือถือ, md+ แท็บเล็ต/เดสก์ท็อป) ไม่มีเบลอ
- ใช้คู่กับ Modal, Drawer, Bottom Sheet วางไว้ล่างสุด; ห้ามปรับ opacity หรือสีเอง
- เอกสารใน Figma ระบุว่ายังไม่มีแบบ strong (`overlay/backdrop/strong` ดำ 60%) — token มีอยู่แล้วใน `tokens.json`

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `overlay/sm`, `overlay/md+` | `DialogOverlay`, `SheetOverlay` (ขนาดตามหน้าจอจริง ไม่มี prop) |

## โค้ด (26 พ.ย. 2026)

พื้นของ `DialogOverlay` และ `SheetOverlay` เปลี่ยนจาก `bg-black/80` + เบลอ เป็น `--cds-overlay-backdrop` (ดำ 40%) ไม่มีเบลอ

| เรื่อง | สถานะ |
|---|---|
| สี `rgba(0,0,0,0.4)` ของ Dialog overlay | ตรง (วัดใน story `FigmaDialog`) |
| Sheet overlay | ตั้งค่าเดียวกัน **ยังไม่ได้วัด** |

**ผลกระทบ:** พื้นหลังตอนเปิด Dialog และ Sheet จางลง (ดำ 80% เป็น 40%) และไม่เบลอ ทุกที่ที่ใช้
