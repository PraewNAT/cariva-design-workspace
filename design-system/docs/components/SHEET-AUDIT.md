# Bottom Sheet audit · 26 พฤศจิกายน 2026

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-45214). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


**Reuse & Duplicate Check — Core Bottom Sheet**
ผลรวม: ใช้ Sheet เดิม เพิ่มส่วนประกอบ body และ options ของ Header โดยไม่สร้าง Drawer ซ้ำ
ขอบเขต: ก่อน/หลังแก้; source, docs-list/docs-show, Sheet, Input/Field, Button, RadioGroup, catalog และ Sidebar

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | ใช้ Base UI Sheet เดิมพร้อม Input/Field/Button/RadioGroup จริง; ไม่พบ implementation ซ้ำใน scope | `sheet.tsx`, `sheet.stories.tsx`, `CatalogNavigation.tsx` | ไม่ต้องรวม component เพิ่ม |
| — | ผ่าน | Shared Core เปลี่ยน recipe เฉพาะ bottom; Header options ไม่มีผลกับด้านอื่น; SheetBody เป็น additive API | `SheetSideContext`, OtherSides, MobileSidebarRegression | คงขอบเขตนี้ |

สรุป: ผ่าน 2, ต้องแก้ 0, ตรวจไม่ได้ 0 ในขอบเขตที่ตรวจ
ต่อไป: ตรวจคุณภาพและข้อค้างด้านล่าง

**Component Audit — Core Bottom Sheet**
ผลรวม: งานที่อนุมัติแก้ครบและ tests ผ่านการรัน 9 stories; มีข้อค้าง contrast และยังไม่ตรวจ software keyboard บนเครื่องจริง
ขอบเขต: Chromium desktop/mobile viewport 320/375/1280px, portal, native browser keyboard, catalog, top/right/left และ mobile Sidebar; ไม่ใช่การรับรองทุก Product/theme หรือ AA ทั้งหมด

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | Contrast เดิม: Button primary 3.50:1, Sidebar active 4.38:1, catalog destructive 4.13:1 ต่ำกว่า 4.5:1 | [test log](</Users/natthaphorna/Cariva DS/output/sheet/storybook-tests.txt>) | ผู้ใช้ให้บันทึกค้าง ไม่เปลี่ยนสีในรอบนี้ |
| — | ตรวจไม่ได้ | Software keyboard/visual viewport บน iOS/Android จริง และ Product/font modes อื่น | ทดสอบด้วย browser keyboard และ viewport เท่านั้น | ตรวจบนอุปกรณ์ก่อนรับรอง mobile keyboard |
| — | ผ่าน | Header 72/152px, title UI 20/28 weight600, input48, มุม24; gradient เต็ม Header; close32/icon16 | [consumer geometry](</Users/natthaphorna/Cariva DS/output/sheet/consumer-geometry.json>), [native measurements](</Users/natthaphorna/Cariva DS/output/sheet/native-keyboard.json>) | ไม่ต้องแก้เพิ่ม |
| — | ผ่าน | Search/filter/empty/selection/confirm; Tab/Space, focus trap, Escape และ focus restore | BottomDefault, BottomSearch; native-keyboard.json | คง native input ไม่มี GBoard จำลอง |
| — | ผ่าน | ไทยยาว/24ตัวเลือก; text≥12px, ไม่ล้นแนวนอนที่320px, body scroll ได้และ footer อยู่ใน480px viewport | [ภาพมือถือ](</Users/natthaphorna/Cariva DS/output/sheet/mobile-thai.png>), native-keyboard.json | ไม่ต้องแก้เพิ่ม |
| — | ผ่าน | Top/right/left คง recipe เดิม; Sidebar mobile เปิด–ปิด/คืนfocus; catalog integration ผ่าน | OtherSides, MobileSidebarRegression, consumer-geometry.json | ไม่แก้ spacing6px เดิมของด้านอื่นนอก scope |
| — | ผ่าน | Stories/docs/code สอดคล้องกัน; build/migration, tokens, Storybook build, coverage39/39, focused lint ผ่าน | output/sheet logs; `SHEET-FIGMA.md`, coverage sheet7 | ไม่ publish/release |

สรุป: ผ่าน 5, ต้องแก้ 1 กลุ่ม, ตรวจไม่ได้ 1 กลุ่ม; interaction tests ผ่าน 9/9 ไม่เท่ากับ accessibility ผ่านทั้งหมด
ต่อไป: รับรอง mobile keyboard บนอุปกรณ์จริง และแยกงาน contrast ตามการตัดสินใจต้นทาง

## เอกสารและขอบเขต parity

อัปเดต Sheet stories 7 รายการ โดยคง Default ID, coverage, DESIGN.md และ changelog แบบ Draft. อ้าง Figma node จริง Header 72/152px ตามที่ผู้ใช้ยืนยัน; Figma on-canvas docs เดิม 76/136px ไม่ได้เขียนกลับในงาน Figma → Code. ไม่มีการ publish library หรืออ้างว่าเอกสาร Figma synchronized.

Header สูงขึ้นเมื่อ title หลายบรรทัด; body/footer สูงตามเนื้อหา ไม่กำหนดความสูง keyboard หรือจำลอง GBoard. Input กว้าง fluid 327px บนจอ375px. ตัวเลือกและเงื่อนไขปุ่มใน stories เป็น fixture ไม่ใช่ business logic ของ Product. การ audit นี้ไม่ใช่ automated pixel parity.
