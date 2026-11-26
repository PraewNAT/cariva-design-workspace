# Table — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Table](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4582-9184) (ไฟล์ Cariva Core Design System) ผู้ใช้ยืนยันชื่อตามที่ Claude เสนอ รวม 3 ข้อตัดสินใจ: footer ใช้ `TablePagination`, BWC Table (Draft) ถูกลบออกจาก Figma แล้ว, แถวสลับสีเป็น `striped` ที่ `Table` หน้านี้มีกรอบ `Table Doc` อยู่แล้ว (แก้ชื่อ prop เก่าในข้อความแล้ว ข้อความเดิมสำรองใน `docText_2026-11-26`)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | prop | หมายเหตุ |
|---|---|---|---|
| `table-head` | `crv-table-head` | `size` default / sm (เดิม small), `compact`, `checkBoxVisible`, `leftSortVisible`, `rightSortVisible`, `label` | instance 21 → 21 |
| `table-cell` | `crv-table-cell` | `size`, `state` default / hover / disabled, `alternate`, ช่อง `customContent` | 61 → 61 |
| `table-text-cell` | `crv-tableText-cell` | `descriptionVisible` | 27 → 27 |
| `table-scroll-shadow` | `crv-table-scroll-shadow` | `side` left / right | 2 → 2 |
| `table-footer` | `crv-table-footer` | 5 → 5 | เปลี่ยนชื่อแล้ว 26 พ.ย. 2026 ใช้ `TablePagination` แทน (ดีไซน์ "Go to" ยังรอ) |
| `bwc-table/*` | — | — | ลบออกจาก Figma แล้ว 26 พ.ย. 2026 (section `BWC Table / Draft` ทั้งหมด ผู้ใช้สั่งลบ) |

## สเปก

- head: พื้น `on-surface/subtle`, 14/20 Medium `content/primary`, ช่องว่าง 8 · default padding 16 (สูง 54 เมื่อมีไอคอนเรียง) · sm padding 7/16 (สูง 34) · ไอคอนเรียง `arrow-downward` 18 ในกรอบ 22
- compact (คอลัมน์ checkbox / ไอคอน): สี่เหลี่ยมคงที่ default 54×54, sm 36×36
- cell: พื้น `on-surface/default`, ข้อความ 14/20 · default padding 16 สูงต่ำสุด 54 · sm padding 4/16 สูงต่ำสุด 36 · hover `on-surface/action/hover` · alternate `on-surface/subtle` · disabled พื้นโปร่ง ข้อความ `content/disabled` · ไม่มีเส้นขอบ
- text cell: ข้อความหลัก 14/20, คำอธิบาย 12/16 `content/secondary`
- scroll shadow: กว้าง 16 ไล่ระดับดำ 8% → 4% → 0% (left ทอดไปขวา, right ทอดไปซ้าย)

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `size` | prop `size` ของ `Table` (`default` / `sm`) ใช้ร่วมกันทั้งตาราง (doc: ห้ามผสม) |
| `table-head` | `TableHead` (`sort` left / right = แสดงลูกศร, `compact`) |
| `table-cell` | `TableCell` (`compact`) |
| `alternate` | `striped` ที่ `Table` (แถวคู่) |
| `state` hover | CSS hover ที่แถว · disabled = `disabled` ที่ `TableRow` |
| `customContent` | children ของ `TableCell` |
| `table-text-cell` | `TableTextCell` (`description`) |
| `table-scroll-shadow` | `TableScrollShadow` (`side`) |
| `checkBoxVisible`, `leftSortVisible`, `rightSortVisible`, `label`, `descriptionVisible` | ใส่หรือไม่ใส่ children / `sort` / `description` |

## โค้ด (26 พ.ย. 2026)

แหล่ง `src/lib/app/components/ui/table.tsx` ไอคอน `ArrowDownwardFilled` คัดลอกจาก Figma ไว้ใน `app/icons.tsx` footer ใช้ `TablePagination` ([PAGINATION-FIGMA.md](PAGINATION-FIGMA.md)) story ที่ `Core/Components/Table`: `Default`, `SizeDefault`, `SizeSm`, `Striped`, `TextCellWithDescription`, `SortIcons`, `CompactCheckboxColumn`, `DisabledRow`, `PinnedColumnShadow`, `ComposedTable`

| เรื่อง | สถานะ |
|---|---|
| head พื้น `#F8FAFC`, 500, padding 16, สูง 54 (default) / 34 (sm), padding 7 | ตรง (วัดแล้ว) |
| cell สูง 54 / 36, padding 16 / 4, พื้นขาว, ไม่มีเส้นขอบ | ตรง (วัดแล้ว) |
| striped แถวคู่ `#F8FAFC`, hover `#F1F5F9` ทับ striped | ตรง (วัด striped แล้ว, hover ตรวจด้วยเมาส์จริงในเบราว์เซอร์) |
| text cell 14/20 + 12/16 `#334155` | ตรง (วัดแล้ว) |
| compact 54×54 / 36×36, ไอคอนเรียง 22×22, scroll shadow กว้าง 16 | ตรง (วัดแล้ว) |
| disabled: ข้อความ `#94A3B8` พื้นโปร่ง | ตรง (วัดแล้ว) |
| สีเงา scroll shadow | **ยังไม่ได้วัด** |

**ผลกระทบ:** `Table` เดิมหน้าตาเปลี่ยน: ไม่มีเส้นขอบระหว่างแถว (ตาม Figma), หัวตารางพื้นเทาอ่อน, padding 16 (เดิม 12) และ `TableHead` สูง 52–54 (เดิม 48) ใช้ที่หน้า Foundations ของ Catalog `TableCaption` และ `TableFooter` ถูกลบ (ไม่มีในโค้ดที่ใช้อยู่)

**ลบสิ่งที่ Figma ไม่มี (ตามที่ผู้ใช้สั่ง):** `TableCaption`, `TableFooter` (tfoot), สถานะเรียง asc / desc / none, `onSort` และ `aria-sort` (Figma มีแค่แสดงหรือซ่อนลูกศร) footer ของตารางใช้ `TablePagination` ถ้าต้องการให้หัวเรียงได้จริงต้องมีดีไซน์ก่อน

**ยังไม่ได้ตรวจ:** การตรึงคอลัมน์ด้วย sticky จริง (Figma บอกว่าเป็นหน้าที่ฝั่งโค้ด ตอนนี้มีแค่ตัวเงา), state selected ของแถว (Figma ยังไม่มี), `table-footer` แบบ "Go to", การเลื่อนแนวนอนบนมือถือ
