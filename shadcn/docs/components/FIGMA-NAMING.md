# ชื่อ component: Figma ↔ โค้ด

26 พฤศจิกายน 2026 · Figma: Cariva Core Design System (`XgxprkSY5mGbzIIwlmscCt`) · โค้ด: `src/lib/app/components/ui/`

นี่คือข้อเสนอชื่อ ยังไม่ได้เปลี่ยนชื่อใน Figma จะเปลี่ยนทีละ component ตอนทำ component นั้น พร้อมชื่อ property และค่าให้ตรงกับโค้ด

## กฎตั้งชื่อ

1. ชื่อ component ใน Figma = ชื่อไฟล์ component ในโค้ด เป็น kebab-case ไม่มีคำนำหน้า `crv-` เช่น `button`, `input`, `dropdown-menu`
2. ชื่อ property = ชื่อ prop ในโค้ด (camelCase) และค่า = ค่าที่โค้ดรับ เช่น `variant` = `default | outline | ghost`
3. ถ้าโค้ดใช้ component เดียวแต่ Figma แยกเป็นหลายชุด (เช่น ปุ่มไอคอน) ให้รวมเป็นชุดเดียว โดยแยกด้วย property แบบที่โค้ดทำ (`size=icon`) การรวมแบบนี้เปลี่ยนโครงสร้างใน Figma จึงทำเฉพาะเมื่อยืนยันแล้ว
4. ชิ้นส่วนย่อยตั้งชื่อตามชิ้นส่วนในโค้ด เช่น `dropdown-menu-item`, `sheet-header`
5. งานประกอบ (composition) ที่โค้ดมีใน `patterns.tsx` ใช้ชื่อเดียวกับ pattern

## ตาราง

เครื่องหมาย ⚠ = ต้องตัดสินใจเรื่องโครงสร้าง (รวมชุดหรือแยกต่างหาก) ก่อนเปลี่ยนชื่อ

| Figma ตอนนี้ | node id | ชื่อที่เสนอ (โค้ด) | หมายเหตุ |
|---|---|---|---|
| crv-autocomplete | 4454:12745 | `combobox` | |
| crv-avatar | 4315:10055 | `avatar` | |
| crv-avatar-group | 4457:63950 | `avatar-group` | งานประกอบจาก `avatar` |
| crv-button-standard | 3646:28000 | `button` | ชุดหลัก |
| crv-button-icon | 3730:5246 | `button` ⚠ | โค้ดคือ `size=icon / icon-sm / icon-lg` |
| crv-button-loading | 3730:5454 | `button` ⚠ | โค้ดคือสถานะของ Button |
| crv-link | 4165:5267 | `button` ⚠ | โค้ดคือ `variant=link` |
| crv-fab | 4497:77574 | `button` ⚠ | โค้ดคือ `size=icon-lg` |
| crv-badge | 4518:82967 | `badge` | |
| crv-chip-action | 4459:62796 | `toggle` ⚠ | โค้ดใช้ Toggle เลือก + Button ลบ |
| crv-breadcrumb-base | 3875:5059 | `breadcrumb-item` | |
| crv-breadcrumb-standard | 3875:5038 | `breadcrumb` | |
| crv-bottom-sheet-header | 4485:31705 | `sheet-header` | `sheet` ที่ `side=bottom` |
| crv-bottom-sheet-content | 4485:31742 | `sheet-content` | |
| Drawer (frame) | 4497:77983 | `sheet` | `side=right` |
| crv-card-vertical | 4657:31022 | `card` ⚠ | โค้ดมี Card ชุดเดียว |
| crv-card-horizontal | 4570:20745 | `card` ⚠ | |
| crv-card-small-horizontal | 4570:20655 | `card` ⚠ | |
| crv-checkbox-standard | 3815:5291 | `checkbox` | |
| crv-checkbox-base | 3815:5417 | `checkbox-base` ⚠ | โค้ดไม่แยกชั้น base |
| crv-checkbox-group | 3815:5374 | `checkbox-group` | งานประกอบ `field` + `checkbox` |
| crv-dropdown | 3875:3909 | `select` | |
| crv-menu-item | 4454:12758 | `dropdown-menu-item` | |
| crv-file-upload | 4457:56094 | `file-upload` | pattern ใน `patterns.tsx` |
| crv-file-upload-item | 4457:56129 | `file-upload-item` | |
| crv-input-standard | 3760:6623 | `input` | |
| crv-input-horizontal | 3760:6895 | `field` ⚠ | โค้ดคือ `Field orientation=horizontal` |
| crv-text-area-standard | 4164:1571 | `textarea` | |
| crv-input-otp-standard | 4315:1164 | `input-otp` | |
| crv-input-otp-base | 4315:749 | `input-otp-base` ⚠ | |
| crv-modal | 4712:1805 | `dialog` | |
| Overlay (section) | 4722:90374 | `overlay` | ไม่มีตัวตรงกันในโค้ด ต้องตรวจก่อน |
| crv-pagination-standard | 4230:1661 | `pagination` | |
| crv-pagination-page-base | 4230:972 | `pagination-link` | |
| crv-pagination-controller-base | 4230:1777 | `pagination-controller` | |
| crv-pagination-rows-per-page | 4230:1695 | `pagination-rows-per-page` | pattern |
| crv-pagination-jump-to-page | 4230:1696 | `pagination-jump-to-page` | pattern |
| crv-linear-progress | 4456:16573 | `progress` | |
| crv-circular-progress | 4456:16646 | `spinner` ⚠ | โค้ดใช้ Spinner (ไม่มีค่าเปอร์เซ็นต์) |
| crv-radio-group | 3815:5863 | `radio-group` | |
| crv-radio-standard | 3815:5910 | `radio-group-item` | |
| crv-radio-base | 3848:6592 | `radio-group-item` ⚠ | |
| `<Rating>` | 4887:7022 | `rating` | pattern (RadioGroup 1–5) |
| Star | 4887:6941 | `rating-star` | |
| Sidebar (section) | 4724:99204 | `sidebar` | |
| Stepper (frame) | 4714:6228 | `stepper` | pattern |
| crv-switch | 3875:1672 | `switch` | |
| crv-switch-base | 3875:1752 | `switch-base` ⚠ | |
| Tabs (section) | 3875:4441 | `tabs` | |
| Table (section) | 4700:19306 | `table` | |
| crv-tooltip-standard | 4167:398 | `tooltip` | |
| crv-tooltip-with-action | 4167:3485 | `tooltip-with-action` | งานประกอบ |
| Section 1 (หน้า Date/Time) | 4947:7100 | `date-time-picker` | pattern: `calendar` + `popover` + `input` |

ที่มา: ตารางทดแทน `src/lib/core/design-system/catalog/migration-map.json` (47 รายการ) เทียบกับ 53 โหนดที่เคยเป็น Ready for dev
