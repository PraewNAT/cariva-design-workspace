# Tag — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Tag](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3918-824) (ไฟล์ Cariva Core Design System) ผู้ใช้ยืนยันชื่อตามที่ Claude เสนอ หน้านี้มีกรอบ `Documentation Card` อยู่แล้ว แก้ชื่อ prop และตัวเลขที่ผิดจาก Figma จริงแล้ว (ข้อความเดิมสำรองใน `docText_2026-11-26`)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | prop | instance (ก่อน → หลัง) |
|---|---|---|---|
| `tag` | `crv-tag-standard` | `variant` filled / outlined, `color` default / secondary / error / success / warning, `content` label / count (เดิม `children` label / number), `size` sm / default / lg (เดิม small / medium / large), `startIconVisible`, `endIconVisible`, `label`, `badgeContent` | 13 → 13 |
| `tag-color` | `crv-tag-color` | `color` primary / sky / cyan / pink / purple / emerald / amber / orange | 9 → 9 |

## สเปก

- `tag` ป้ายข้อความ: sm สูง 20, default สูง 24, lg สูง 36 · padding แนวนอน 8 (lg 12) ช่องว่าง 4 · 12/16 Medium (lg 14/20) · ไอคอน 12
- `tag` ป้ายตัวเลข (`content=count`): วงกลม 20 / 24 / 32 padding 2/4
- filled: default `brand/primary/on-surface/default` + `brand/primary/content/on-fill` · secondary `on-surface/sunken` + `content/primary` · error / success / warning `status/*/on-surface/default` + `status/*/content/on-fill`
- outlined (มีเฉพาะสี default): โปร่ง ขอบ 1px `border/default` ตัวอักษร `content/primary`
- `tag-color`: สูง 20 padding 2/8 ช่องว่าง 4 12/16 Medium · พื้น `accent/{สี}/A02` ตัวอักษร `accent/{สี}/A05` · primary ใช้ `brand/primary/on-surface/muted` และ `brand/primary/content/strong`

**แก้ doc ที่ผิดจาก Figma:** doc เดิมเขียนว่า tag-color สูง 22, พื้น A01, ตัวอักษร A04, มีสี grey และขนาด tag 20 / 26 / 38 Figma จริงคือ 20, A02, A05, ไม่มี grey และ 20 / 24 / 36

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `tag` | `Tag` (`ui/tag.tsx`; `variant`, `color`, `size`, `content`, `startIcon`, `endIcon`) |
| `content=count` | `content="count"` (วงกลม ไม่แสดงไอคอน) |
| `tag-color` | `TagColor` (`color`, `startIcon`, `endIcon`) |
| `label`, `badgeContent` | children |
| `startIconVisible`, `endIconVisible` | ใส่หรือไม่ใส่ `startIcon` / `endIcon` |

## โค้ด (26 พ.ย. 2026)

story ที่ `Core/Components/Tag`: `Filled` (สีทั้ง 5 × ขนาด 3), `Outlined`, `Count`, `WithIcons`, `ColorTags`

| เรื่อง | สถานะ |
|---|---|
| สูง 20 / 24 / 36, padding 8 / 12, 12/16 และ 14/20 | ตรง (วัดแล้ว) |
| สี filled ทั้ง 5, ขอบ outlined, ตัวอักษร outlined | ตรง (วัดแล้ว) |
| ตัวเลขกลม 20 / 24 / 32 | ตรง (วัดแล้ว) |
| ไอคอน 12 และช่องว่าง 4 | ตรง (วัดแล้ว) |
| tag-color: สูง 20, สีพื้น primary และ sky, สีตัวอักษร sky | ตรง (วัดแล้ว) |
| ขนาดไอคอนของ lg (ผมตั้ง 16), สีของสี tag-color 6 สีที่เหลือ | ตั้งตาม token **ยังไม่ได้วัด** |

**ผลกระทบ:** Component ใหม่ ไม่กระทบของเดิม (Badge เป็นตัวนับ/จุด Chip เป็นแบบกดได้)

**ยังไม่ได้ตรวจ:** ไอคอนจริงจาก Figma (ใช้ svg ที่ผู้ใช้ส่งเข้ามา), ข้อความยาวที่ตัดบรรทัด
