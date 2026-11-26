# FAB (Floating Action Button) — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Floating Action Button](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4497-64124) (ไฟล์ Cariva Core Design System) สีทุกจุด 60 จุดผูกตัวแปรในไฟล์

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | instance (ก่อน → หลัง) |
|---|---|---|
| `fab` | `crv-fab` | 6 → 6 |

ค่า `size`: small → `sm`, medium → `default`, large → `lg`; ค่า `color`: neutral → `secondary` (primary เหมือนเดิม); `state` ไม่เปลี่ยน ข้อความ `crv-fab` ในกรอบ `📄 FAB Doc` (2 จุด) เปลี่ยนเป็น `fab` แล้ว ชื่อ prop ในกรอบเอกสาร (`size: small | medium | large`, `neutral`) ยังไม่ได้แก้

## สเปก

| size | ขนาด | ไอคอน |
|---|---|---|
| `sm` | 40 | 20 |
| `default` | 56 | 24 |
| `lg` | 64 | 28 |

- ทรงกลม; primary: พื้น `brand/primary/on-surface/default` (hover `…/hover`, pressed `…/pressed`) ไอคอน `brand/primary/content/on-fill`
- secondary (neutral): พื้น `on-surface/default` ขอบ 1px `border/default` (hover และ pressed ขอบ `border/strong`, พื้น `on-surface/action/hover` / `…/pressed`) ไอคอน `neutral/content/default`
- disabled: พื้น `on-surface/action/disabled` ไอคอน `content/disabled` ไม่มีเงา (secondary ขอบ `border/disabled`)
- เงา: ปกติ `shadow/2xl` · hover `shadow/xl` · pressed `shadow/md` (effect style ใน Figma)

## Shadow token (ใหม่ 26 พ.ย. 2026)

เพิ่มหมวด `shadow` ใน `tokens.json` อ่านจาก effect style `shadow/*` ใน Figma จริง (`sm`, `default`, `md`, `lg`, `xl`, `2xl`, `inner`, `status/error|warning|info|success|notification`) ตัว generate ออกเป็น `--cds-shadow-<ชื่อ>` ใน `semantic.generated.css` ใช้ใน Tailwind เป็น `shadow-[var(--cds-shadow-2xl)]` และ `glow/*` (`primary`, `error`, `success`, `warning`, `info`, `default`) ออกเป็น `--cds-glow-<ชื่อ>` ไม่รวม effect style `system` (วงแหวนโฟกัส) และ `blur/*`

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `fab` | `Fab` (`ui/fab.tsx`) |
| `size` sm / default / lg | `size` |
| `color` primary / secondary | `color` |
| `state` disabled | `disabled` |
| `state` hover / pressed | CSS (`hover:`, `active:`) |

## โค้ด (26 พ.ย. 2026)

DS ไม่มี FAB (Button `icon-lg` สูง 48 ต่างจาก 40 / 56 / 64 และไม่มีเงา) จึงสร้างใหม่ใน Core ซ้อนบน Base UI Button primitive เดียวกับ Button เป็นช่องว่างของ DS ที่รายงานแล้ว

| เรื่อง | สถานะ |
|---|---|
| ขนาด 40 / 56 / 64, ไอคอน 24 (default) | ตรง (วัดใน story) |
| สีพื้น primary `#1789FA`, secondary ขาว, disabled `#F1F5F9`, disabled ไม่มีเงา | ตรง (วัดใน story) |
| เงาปกติมีสี `rgba(30,58,138)` จาก token | ตรง (ตรวจว่ามีค่า) |
| เงา hover / pressed, ขอบ secondary, ไอคอน 20 / 28 | ตั้งตาม Figma **ยังไม่ได้วัด** |

**เพิ่มเอง:** วงแหวนโฟกัสคีย์บอร์ด 2px `border/system` (Figma ไม่มีสถานะโฟกัส)

**ผลต่อส่วนอื่น:** shadow token ใหม่ใช้กับ Button `elevated`, เงา hover ของ Checkbox Card และเงา pressed ของ Chip แล้ว (ดูเอกสารของแต่ละ component)
