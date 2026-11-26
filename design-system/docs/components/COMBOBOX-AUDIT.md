# Combobox verification · 26 พฤศจิกายน 2026

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4537-146774). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


สถานะ: implementation และ docs ตามรายการที่อนุญาตแล้ว; มี contrast finding เพิ่มที่ popup รอผู้ใช้ยืนยันก่อนแก้. ไม่ได้ commit/push หรือเขียน Figma.

**Component Reuse & Duplicate Check — Core Combobox**
ผลรวม: แก้ Combobox เดิมและ reuse Field/InputGroup ไม่พบ component ซ้ำในขอบเขตที่ตรวจ
ขอบเขต: Combobox, stories, FieldLabel, CatalogForm และ CoreCatalog ใน checkout นี้

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | ใช้ Base UI และ primitives เดิม ไม่มี filtering engine หรือ label/error wrapper ใหม่ | `combobox.tsx:85`, `combobox.stories.tsx:13`, `CatalogForm.tsx:96` | ไม่ต้องสร้าง component ใหม่ |

สรุป: ผ่าน1, ต้องแก้0, ตรวจไม่ได้0
ต่อไป: ไม่ต้องดำเนินการเพิ่มด้าน reuse

**Component Audit — Core Combobox และ FieldLabel**
ผลรวม: 14 interaction tests ผ่าน; 7 Combobox stories ไม่พบ automated a11y findings หลัง play แต่ native open-popup inspection พบ contrast เพิ่มที่ยังไม่แก้
ขอบเขต: default/lg, empty/filled/error/disabled, ค้นหา/ไม่พบ/คีย์บอร์ด, หน้า/portal, mobile320px, Field/InputGroup/Input regression และ catalog; ไม่รับรองทุก Product หรือ multiselect/chips

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | Option highlighted ขณะ popup เปิด: rgb(15,112,230) บน rgb(238,249,255), 14px ได้4.38:1 ต่ำกว่า4.5:1; recipe/token เดิม | `output/combobox/open-option-contrast.json` | แจ้งแล้ว รอผู้ใช้ยืนยันก่อนแก้สี |
| กลาง | ต้องแก้ | Catalog ยังมี contrast findings เดิมของ controls อื่น | `output/combobox/storybook-tests.txt` | แยกงานสีที่ต้นทางตามข้อจำกัดเดิม |
| — | ตรวจไม่ได้ | HosXP, external Products, multiselect/chips และ automated pixel parity | ไม่อยู่ใน scope ที่ตรวจ | ตรวจเมื่อมี scope เพิ่ม |
| — | ผ่าน | ช่อง40/48px, input16/24, label12/14, icon box20/24, assetsโหลดครบ, disabled labelสี token opacity1 | Sizes, States, Field States, `render-measurements.json` | ไม่ต้องแก้เพิ่ม |
| — | ผ่าน | Native hoverใช้ border/strong; focus/error/disabled และขั้นต่ำ12pxตรวจแล้ว | native pointer measurements และ States | ไม่ใช้ synthetic hover อ้าง CSS ผ่าน |
| — | ผ่าน | ค้นหา เลือก ไม่พบ คีย์บอร์ด Dialog และ focus restoration; หน้า/portal typographyตรงกัน | Default, NoResults, Keyboard, PageAndDialog | ไม่ต้องแก้เพิ่ม |
| — | ผ่าน | Mobile320px ไม่ล้น, option14px; popupกว้างเท่า anchor344px ห่าง4px; regressionผ่าน | MobileThai, native measurements และ14 tests | ไม่ต้องแก้เพิ่ม |
| — | ผ่าน | app build, migration check, tokens check, Storybook build, coverage39/39, diff check; lintไม่มีerror | build logs; มี Fast Refresh warningเดิมจาก exported hook | ไม่ย้าย hookนอก scope |

สรุป: ผ่าน5, ต้องแก้2 (พบเพิ่ม1และปัญหาเดิม1กลุ่ม), ตรวจไม่ได้1; ไม่รับรอง accessibility ทุก state จาก tests ที่จบด้วย popup ปิด
ต่อไป: รอผู้ใช้ตัดสินใจเรื่อง contrast ของ highlighted option ก่อนแก้เพิ่มเติม

## Documentation และ parity

อัปเดต Combobox stories เป็น7 โดยรักษา Default ID, Field States เพิ่ม disabled label regression, coverage table, `INPUT-FIELD-FIGMA.md` และ `COMBOBOX-FIGMA.md`. ระบุ actual props, sizes, error binding ที่ตรวจจริง, local assets และ Product scope ใน portal. Figma docs ยังมี naming/sizeเก่าและไม่ได้เขียนกลับ; ไม่ได้ publish Code Connect.

Figma set มี18 variants; codeแสดง10 basic states (5ต่อsize) และใช้ hover/focus/openจริงแทน fake props. เทียบ anatomy/ขนาดและ screenshotด้วยสายตา ไม่ใช่ automated pixel parity. Popup item styling/radius เดิมยังไม่ได้อ้างว่าตรง Figma menu-item ทุก variant.

ผู้ใช้ยืนยันก่อนแก้ spacing popup, FieldLabel disabled, testวิธี hover/keyboard/modal/timing และ container typographyแล้ว. Contrast ที่พบเพิ่มถูกแจ้งและคงไว้ ไม่แก้โดยอัตโนมัติ.

หลักฐานใน `shadcn/output/combobox/`: state/open/mobile/Dialog screenshots, computed measurements, contrast measurement และ build/test logs. Screenshotถูกตรวจดูแล้ว ไม่ใช่ implementation asset.
