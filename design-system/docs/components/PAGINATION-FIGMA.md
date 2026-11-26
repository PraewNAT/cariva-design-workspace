# Pagination — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Pagination](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4167-7456) (ไฟล์ Cariva Core Design System; หน้านี้เป็น section `Table Pagination / Draft`) ผู้ใช้สั่งให้ตัดสินใจเองระหว่างที่ไม่อยู่ ชื่อและ prop ด้านล่างเป็นการตัดสินใจของ Claude ยังไม่ผ่านการยืนยัน

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | instance (ก่อน → หลัง) |
|---|---|---|
| `pagination` (`Case` First / Middle / Last / Empty — เฉพาะ Figma) | `crv-table-pagination` | 0 → 0 |
| `pagination-link` (`page`, `state`) | `crv-table-pagination-page` | 16 → 16 |
| `pagination-control` (`type` first / previous / next / last, `state`) | `crv-table-pagination-controller` | 16 → 16 |
| `pagination-rows` | `crv-table-pagination-rows` | 4 → 4 |
| `pagination-summary` | `crv-table-pagination-summary` | 4 → 4 |

**ผูกสีใหม่:** สีทุกจุดเดิมผูกตัวแปร library เก่า (111 จุด) เปลี่ยนไปผูกตัวแปรชื่อเดียวกันในไฟล์ทั้งหมด ไม่เหลือ library เก่าและไม่มีชื่อที่หาคู่ไม่เจอ (รายการเดิมสำรองใน plugin data `remoteBindings_2026-11-26`) section `Table Pagination / Draft` และ doc ในหน้านี้ไม่ได้แตะ เพิ่มกรอบ `Documentation Card` (node `7223:101507`) ข้าง section แล้ว 26 พ.ย. (สร้างจากกรอบของหน้า Drawer ใส่ instance `pagination` ทั้ง 4 Case และ `pagination-link` ทุก state)

## สเปก

- แถวเดียวกว้าง 1200 ช่องว่าง 16: ซ้าย `pagination-rows` (ข้อความ "Rows per page" 14/20 + Select ขนาด `default` กว้าง 80 สูง 40), กลาง `pagination-summary` ("Showing 11 to 20 of 100 products" 14/20 `content/secondary`), ขวาปุ่มนำทางช่องว่าง 8
- ปุ่มนำทาง: กลม 32×32 ไอคอน 20 (first / previous / next / last); หน้าตัวเลข 14/20 Regular
- default: ไม่มีพื้น `content/primary` · hover และ pressed: พื้น `on-surface/action/selected` · selected (หน้าปัจจุบัน): พื้น `brand/primary/on-surface/default` ตัวอักษร `brand/primary/content/on-fill` · disabled: `content/disabled`
- Case: First = 1 2 3 … 10 (ปุ่ม first / previous disabled), Middle = 1 2 3 … 10, Last = 1 … 8 9 10, Empty = ไม่มีเลขหน้า และปุ่มนำทางทั้งหมด disabled ข้อความ "Showing 0 to 0 of 0 products"

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `pagination` | `TablePagination` (`app/table-pagination.tsx`) ประกอบจากชิ้นส่วนใน `ui/pagination.tsx` |
| `pagination-link` | `PaginationLink` (`isActive` = selected, `disabled`) |
| `pagination-control` first / previous / next / last | `PaginationFirst`, `PaginationPrevious`, `PaginationNext`, `PaginationLast` |
| `pagination-rows` | `PaginationRows` + `Select` |
| `pagination-summary` | `PaginationSummary` |
| `More pages` | `PaginationEllipsis` |
| `Case`, `state` hover / pressed | เฉพาะ Figma (`Case` ได้จาก `page`, `total`) |

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| ปุ่มกลม 32×32, หน้าปัจจุบันพื้น `#1789FA` ตัวอักษรขาว, ปุ่ม disabled `#94A3B8`, ช่องว่างปุ่ม 8, Select สูง 40 | ตรง (วัดใน story `FigmaTablePagination`) |
| ข้อความสรุปทั้ง First / Last / Empty, ไม่มีเลขหน้าตอน Empty | ตรง (ตรวจใน story) |
| สี hover / pressed, ไอคอน 20 ใน `PaginationControl`, ช่องว่าง 16 ของแถว | ตั้งตาม Figma **ยังไม่ได้วัด** |

**ตัดสินใจโดย Claude:** ชุดเลขหน้าที่แสดง First/Middle/Last ตาม Figma ส่วนหน้าอื่นที่ Figma ไม่ได้วาด (เช่นหน้า 4–7 จาก 10) ใช้ 1 … ก่อนหน้า ปัจจุบัน ถัดไป … สุดท้าย; ไอคอน first / previous / next / last เป็น Material ที่เขียนเอง ไม่ได้คัดลอก path จาก Figma; `PaginationPrevious` / `PaginationNext` เดิมเคยมีข้อความ "Previous" / "Next" ตอนนี้เป็นไอคอนอย่างเดียวตาม Figma (prop `text` ถูกเอาออก)

**ผลกระทบ:** `PaginationLink` เดิมเป็น Button ghost / outline 40px ตอนนี้เป็นปุ่มกลม 32px หน้าปัจจุบันพื้นน้ำเงิน; `PaginationPrevious` / `PaginationNext` เป็นไอคอนล้วน; ช่องว่าง 4 → 8; `PaginationEllipsis` เป็นข้อความ "…"
