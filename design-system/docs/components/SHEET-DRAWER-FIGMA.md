# Sheet (Figma หน้า Drawer) — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Drawer](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4497-77575) (ไฟล์ Cariva Core Design System) ส่วน Bottom Sheet ของมือถือ (หัวมีสีตกแต่ง) อยู่ใน [SHEET-FIGMA.md](SHEET-FIGMA.md)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | instance (ก่อน → หลัง) |
|---|---|---|
| `sheet` | `crv-drawer-basic` (prop `direction` เปลี่ยนเป็น `side`: right / left / bottom / top) | 2 → 2 |
| `sheet-close` | `crv-drawer-close` | 6 → 6 |

**ผูกสีใหม่:** สีทุกจุดเดิมผูกตัวแปรจาก library เก่า (116 + 1 จุด) เปลี่ยนไปผูกตัวแปรชื่อเดียวกันในไฟล์ 133 จุด (นับรวมชิ้นส่วนที่ซ้อนอยู่) ไม่เหลือ library เก่า รายการเดิมสำรองใน plugin data `remoteBindings_2026-11-26`

## สเปก (right / left / top)

- padding 16 ช่องว่าง 16 ขอบ 1px `border/default` พื้น `on-surface/elevated`
- header: ชื่อ 14/20 Medium `content/primary` + คำอธิบาย 14/20 `content/secondary` (ช่องว่าง 8) และปุ่มปิด 32×32 มุมกลม ไอคอน 20px สี `content/secondary`
- body เป็นพื้นที่เปลี่ยนเนื้อหา (ช่องว่าง 16); footer ปุ่ม sm (32) เรียงแนวนอน ช่องว่าง 8
- ขนาดตัวอย่างใน Figma: right / left 400×480, top / bottom 640×360

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `sheet` | `Sheet` + `SheetContent` (`ui/sheet.tsx`) |
| `side` right / left / top | `side` |
| `side` bottom | `side="bottom"` ตาม Bottom Sheet (ดู SHEET-FIGMA.md) **ไม่ใช้สเปกของหน้า Drawer** |
| `title`, `description` | `SheetTitle`, `SheetDescription` |
| `sheet-close` | ปุ่มปิดใน `SheetContent` |
| Body / Footer | `SheetBody`, `SheetFooter` |

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| padding 16, ช่องว่าง 16, พื้น `on-surface/elevated`, ชื่อ 14/20 Medium, ปุ่มปิด 32×32 | ตรง (วัดใน story `Sides`) |
| กว้างสูงสุด 400 (right / left) | ตั้งแล้ว ยังไม่ได้วัด |
| สีขอบ `border/default` (ด้านเดียวที่ชิดเนื้อหา) | ตั้งแล้ว ยังไม่ได้วัด |
| ไอคอนปิด 20px, footer แนวนอนปุ่ม sm | ตั้งแล้ว ยังไม่ได้วัด |

**ตัดสินใจร่วมกับผู้ใช้:** side bottom คงเป็น Bottom Sheet เดิม (ไม่เปลี่ยน); ขอบวาดด้านเดียวที่ชิดเนื้อหาแทนทั้งสี่ด้านเพราะแผงชิดขอบจอและ Sidebar มือถือใช้ `SheetContent` เดียวกัน

**ผลกระทบ:** `Sheet` right / left / top จาก padding 24 เป็น 16, ชื่อเล็กลง, footer เรียงแนวนอนชิดขวา (เดิมแนวตั้ง), ปุ่มปิดเป็น 32; Sidebar มือถือ (`side="left"` ที่ตั้ง `p-0` และสีของตัวเอง) ผ่าน test เดิม ไม่ได้ตรวจด้วยสายตา

## Bottom Sheet (เปลี่ยนชื่อ 26 พ.ย. 2026, ผู้ใช้ยืนยันตามเสนอ)

| ชื่อใหม่ | ชื่อเดิม | instance |
|---|---|---|
| `sheet-header` (`variant` default / search, `icon`, `showIcon`, `showTopColor`) | `crv-bottom-sheet-header` (`type`, `Icon`) | 8 → 8 |
| `sheet-content` | `crv-bottom-sheet-content` | 2 → 2 |

โค้ด: `SheetHeader` `variant` default / search ตรงอยู่แล้ว
