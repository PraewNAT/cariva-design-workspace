# Dialog (Figma หน้า Modal) — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Modal](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4660-2223) (ไฟล์ Cariva Core Design System) สีทุกจุดในชุด 52 จุดผูกตัวแปรในไฟล์ ผู้ใช้สั่งให้ตัดสินใจเองระหว่างที่ไม่อยู่ ชื่อและ prop ด้านล่างเป็นการตัดสินใจของ Claude ยังไม่ผ่านการยืนยัน

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | instance (ก่อน → หลัง) |
|---|---|---|
| `dialog` | `crv-modal` | 3 → 3 |

prop `type` เปลี่ยนเป็น `align`: `default` → `start`, `alignCenter` → `center`; ส่วน `breakpoint` (sm 320 / md+ 400), `showContent`, `showDescription`, `showIcon`, `icon`, `showCTA`, `contentSlot`, `ctaSlot` ไม่เปลี่ยน ข้อความในกรอบ `📄 Modal Doc` เปลี่ยนชื่อ (และ `type=` เป็น `align=`) แล้ว

## สเปก

- กล่อง: พื้น `on-surface/default` มุมโค้ง 16 ขอบ 1px `border/default` เงา `shadow/2xl` กว้าง 320 (sm) / 400 (md+)
- ส่วนหัว: padding 24/16/16/16; `align=start` ไอคอน 28 (กรอบมุม 12 padding 4, ไอคอน 20) อยู่ซ้ายของข้อความ, `align=center` ไอคอน 44 (ไอคอน 36) อยู่เหนือข้อความและจัดกลาง; หัวข้อ 20/28 SemiBold `content/primary` คำอธิบาย 14/20 `content/secondary`; ไอคอน `content/secondary`
- เนื้อหา (slot): padding 16 ช่องว่าง 16
- ส่วนท้าย: พื้น `on-surface/subtle` padding 16 ช่องว่าง 8; sm ปุ่มซ้อนแนวตั้งเต็มความกว้าง (ปุ่มหลักอยู่บน), md+ ปุ่มเรียงแนวนอนชิดขวา (ปุ่มรองก่อนปุ่มหลัก); ปุ่ม sm (32)
- Figma ไม่มีปุ่มปิด (X)

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `dialog` | `Dialog` + `DialogContent` (`ui/dialog.tsx`) |
| `align` start / center | prop `align` ของ `DialogHeader` |
| `icon`, `showIcon` | prop `icon` ของ `DialogHeader` (ไม่ใส่ = ไม่แสดง) |
| หัวข้อ / คำอธิบาย | `DialogTitle` / `DialogDescription` |
| `contentSlot` | `DialogBody` |
| `ctaSlot` | `DialogFooter` |
| `breakpoint` sm / md+ | responsive ในโค้ด (กว้าง 320 ที่แคบ, 400 ตั้งแต่ md) |
| `showContent`, `showDescription`, `showCTA` | ใส่หรือไม่ใส่ส่วนนั้น |

## โค้ด (26 พ.ย. 2026)

`DialogContent` สลับเป็นเลย์เอาต์ตาม Figma (ไม่มี padding รอบกล่อง, ส่วนท้ายเป็นแถบสี subtle) เมื่อ child แรกเป็น `DialogHeader`; ถ้า child ตรงๆ ไม่ใช่ header (เช่น Dialog ที่มีตัวเลือกวันที่ข้างใน) ยังได้ padding 16 รอบด้านและไม่มีแถบ จึงไม่กระทบตัวอย่างเดิม

| เรื่อง | สถานะ |
|---|---|
| มุม 16, padding ส่วนหัว 24/16/16, หัวข้อ 20/28/600, ไอคอน 28, ส่วนท้าย `#F8FAFC` padding 16, พื้นขาว, เงา | ตรง (วัดใน story `FigmaDialog`) |
| ไอคอน `center` 44, ความกว้าง 320 / 400, ส่วนท้ายแนวตั้งบนมือถือ, สีไอคอน | ตั้งตาม Figma **ยังไม่ได้วัด** |

**ตัดสินใจโดย Claude:** คงปุ่มปิด (X) ไว้เป็นค่าเริ่มต้นเพื่อไม่เปลี่ยนพฤติกรรมเดิม (Figma ไม่มี; ปิดได้ด้วย `showCloseButton={false}`)

**ผลกระทบ:** Dialog เดิมมุม 24 → 16 (`--container-radius`), เงาเปลี่ยนเป็น `shadow/2xl`, ขอบ 1px, หัวข้อใหญ่ขึ้นเป็น 20/28; Dialog ที่ใช้ `DialogHeader` จะได้เลย์เอาต์แบบแถบ
