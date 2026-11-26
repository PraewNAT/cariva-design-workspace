# Figma documentation mapping

อัปเดต 26 พฤศจิกายน 2026 ตามคำขอให้อัปเดต docs ของ component ที่ทำในแชทนี้ทั้งหมด. ไฟล์ DS: Cariva Core Design System (`XgxprkSY5mGbzIIwlmscCt`). เป็นการอัปเดตเอกสารและ descriptions ไม่ใช่การ publish library/Code Connect หรือเปลี่ยน property API.

| Family | Page node | Docs node / ลิงก์จริง | Code source |
|---|---|---|---|
| Avatar | 4315:9628 | [Avatar docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4648-15632) | ui/avatar.tsx |
| Combobox + related FieldLabel | 4453:12569 | [Combobox docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4537-146774) | ui/combobox.tsx, ui/field.tsx |
| Badge | 4518:82928 | [Badge docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-57628) | ui/badge.tsx |
| Bottom Sheet | 4481:19038 | [Bottom Sheet docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-45214) | ui/sheet.tsx |
| Card | 4536:123342 | [Card docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4713-2014) | app/content-card.tsx, ui/card.tsx |
| Date/Time | 4294:5594 | [Date/Time docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7228-128) | app/date-time-pickers.tsx, ui/calendar.tsx, app/patterns.tsx |

Source paths ข้างต้นอยู่ใต้ `shadcn/src/lib/app/components/`. อ่าน API จากโค้ด, visual rules จากข้อที่ตกลง และ audit จากไฟล์ของแต่ละ family. ตัวอย่างใน Figma docs เป็น verified instances ไม่ได้ detach หรือสร้าง component เลียนแบบ. AvatarGroup parity, contrast และ Date/Time keyboard/a11y/geometry ที่ยังรออนุญาตระบุอย่างชัดเจน ไม่ถือว่า docs update เป็นการอนุมัติแก้ code.

อัปเดต5docs framesเดิมและสร้าง Date/Time docsใหม่. ปรับข้อความเดิม47จุด, เพิ่ม code/audit panels และ Profile/Metric specimens ใน Card; descriptionsของ16component setsและvariantsชี้ code contract ปัจจุบัน. Main component names, property definitions, variant geometry และradiusตรวจเทียบ baselineว่าไม่เปลี่ยน.

Bottom Sheet ใช้ existing showKeyboard=false เฉพาะ doc instances `4716:46098`, `4716:46282` ตามที่ผู้ใช้อนุญาต; ไม่เปลี่ยน main component. Date range/birth ในหน้า docs ใหม่ overrideค่าข้อความเฉพาะinstancesให้ตรงกับเดือนกันยายน2024 โดยคง link ไปmain component.

Baseline/verification อยู่ใน `output/figma-docs/`; runtime audit เดิมของแต่ละ component ยังคงเป็นหลักฐานตามเวลาที่ตรวจ. งานนี้เป็น documentation-only ไม่รัน app testsซ้ำ และไม่อ้างว่า Date/Time ที่19/20ผ่านกลายเป็น auditผ่านจากการเขียนเอกสาร.

**Component Audit — Figma documentation follow-up**
ผลรวม: อัปเดตเอกสารครบ6หน้า ตรวจภาพและlinksแล้ว โดยไม่เปลี่ยน code หรือ main-component API
ขอบเขต: docs frames/ข้อความ/description, verified instances, geometry และ baseline ของ16sets; ไม่ใช่ runtime audit รอบใหม่

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน |5framesเดิมและDate/Timeใหม่ ใช้code APIจริงและแยกข้อค้าง; ตรวจภาพครบ6หน้าและไม่พบข้อความล้นกรอบ | output/figma-docs/verification.json; linksข้างบน | ใช้nodeเดิมอัปเดตรอบถัดไป |
| — | ผ่าน |58instancesมีmain-component linkครบ; ชื่อ/props/variant geometry/radiusของ16setsไม่เปลี่ยน | baseline.json เทียบ verification.json | ไม่publishlibraryเอง |
| — | ผ่าน |GBoardซ่อนเฉพาะ2doc instancesตามคำยืนยัน; วันที่ใน2doc instancesแก้ให้สอดคล้องกับcalendar | keyboard=false; date specimen IDsในwrite result | Main componentsคงเดิม |
| สูง | ต้องแก้ |Date/Time codeยังมีkeyboard/ref, accessible names, popup geometry และtesttimingที่รออนุญาต | DATE-TIME-AUDIT.md,19/20tests | รอคำยืนยันเดิมก่อนแก้code |
| กลาง | ต้องแก้ |Contrast และAvatarGroup parityที่ค้างยังระบุในdocs ไม่อ้างผ่านทั้งหมด | auditของแต่ละfamily | แยกตัดสินใจตามscopeเดิม |

สรุป: ผ่าน3, ต้องแก้2กลุ่มเดิมในcode; docs updateครบ ไม่มีการอ้างว่าruntimeพร้อมใช้งานจากการเขียนเอกสาร
### Date/Time template follow-up — 26/11/2026

ปรับหน้า Date/Time เดิม `7228:128` ตาม Document Template `4537:130394` โดยใช้ Blocks `4537:130684`: Header, Vertical/Horizontal Stack, Guidance และ Callout. Detach เฉพาะ documentation block containers ตามคำแนะนำใน template; ตัวอย่าง UI 11 instances ยังเชื่อม main components รวม 6 instances เดิมที่เก็บไว้. ไม่แก้ main component หรือ code.

ตรวจภาพและโครงสร้าง editable แล้ว: ไม่มีภาพแบนทับ UI, ข้อความเอกสารใช้ Inter ตาม template ขนาดขั้นต่ำ 20px และไม่พบข้อความเอกสารล้นกรอบ. ซ่อนช่องตัวอย่างว่างใน Guidance และ availability badges ที่ template ติ๊กมาให้เพื่อไม่อ้างการรองรับที่ยังไม่ตรวจ. API และข้อค้าง audit 19/20 ยังคงระบุไว้; การปรับ template ไม่ทำให้ runtime audit ผ่าน.

ต่อไป: รับคำยืนยันข้อค้างDate/Timeเพื่อกลับไปจบงานcodeและaudit

### File Upload — 26/11/2026

อัปเดต docs เดิม `4537:147576` ตาม Document Template `4537:130394`/Blocks `4537:130684`, พร้อม 14 linked specimens ครบสอง dropzones และสี่ item states. Source `app/file-upload.tsx`; ดู FILE-UPLOAD-FIGMA.md และ FILE-UPLOAD-AUDIT.md. Main components ไม่เปลี่ยน; code padding 16px ตามคำอนุญาตต่างจาก Figma main 24px.

### Progress / Radio Group / Rating — 26/11/2026

อัปเดต mapped docs เดิมตาม Document Template: [Progress](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4721-88932), [Radio Group](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4537-147363), [Rating](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4887-55058). ใช้ linked specimens36/18/21 รวม75; own textขั้นต่ำ20px, ไม่พบoverflow. เปรียบเทียบ7 main setsแล้ว properties/variants/geometryไม่เปลี่ยน. API/ข้อจำกัดตาม PROGRESS-FIGMA.md, RADIO-GROUP-FIGMA.md, RATING-FIGMA.md และ combined audit.

Credit Badge ownership correction: the25 existing linked instances from sets7089:1151/7094:365 moved from Progress docs4721:88932 into separate Mira docs7296:35. Core Progress retains36 specimens. Existing12px local text overrides and links are preserved. See products/mira/CREDIT-BADGE.md and CREDIT-BADGE-AUDIT.md.

### Tabs — 26/11/2026

อัปเดต [docs เดิม4838:64978](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4838-64978) ตาม Document Template4537:130394 / Blocks4537:130684 ครบ Standard/Pills/Folder 27 linked specimens. Own textขั้นต่ำ20px ไม่มี horizontal overflow; property API และ geometry ของ5setsไม่เปลี่ยน. Source UI ใช้ IBM Plex Sans Thai. ดู TABS-FIGMA.md, TABS-AUDIT.md และ output/tabs/figma-verification.json; contrast primary ยังเป็นข้อค้าง.

### Tooltip Core / Mira - 2026-11-26

Updated Core documentation4716:60403 (13 linked specimens) and separate Mira documentation7292:35 (9 linked specimens) using Document Template4537:130394. Main APIs/variant geometry of three sets unchanged. Mira10px cost hints override to12px only in doc instances. Source/code ownership mapping: docs/products/mira/FIGMA-MAPPING.json; contracts TOOLTIP-FIGMA.md and products/mira/CREDIT-TOOLTIP.md; audit TOOLTIP-AUDIT.md.

### Core / Mira ownership audit - 2026-11-26

Checked12 previously implemented pages (36sets +4standalone). Confirmed Mira ownership remains Credit Badge2sets and Credit Tooltip1set, already separated into Product source/stories/docs. No additional Mira evidence found in this scope. Corrected stale Credit Badge source descriptions7089:1151/7094:365 to Product paths and docs7296:35. Detailed report: [Mira ownership audit](../products/mira/OWNERSHIP-AUDIT.md). Documentation-only follow-up; no runtime quality re-certification.

### Visualization - 2026-11-26

Mapped docs7303:35 use Document Template4537:130394 with50 linked specimens for25 desktop/mobile chart sets. Contracts: VISUALIZATION-FIGMA.md; local node/code map: VISUALIZATION-MAPPING.json; audit: VISUALIZATION-AUDIT.md. Source main APIs unchanged. Code Connect remains pending: discovery found no published components in the supplied selection; local JSON is not a published connection.
