# Badge verification · 26 พฤศจิกายน 2026

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-57628). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


สถานะ: implementationตามรายการที่ยืนยันแล้ว; glowพักไว้. มีcontrastจากFigmaที่ยังไม่แก้ ไม่ถือว่าaccessibilityผ่านทุกข้อ. ไม่ได้commit/pushหรือเขียนFigma.

**Component Reuse & Duplicate Check — Core Badge**
ผลรวม: ขยายBadgeเดิม ไม่มีcomponentใหม่ซ้ำในขอบเขตที่ตรวจ
ขอบเขต: Badge, stories, CatalogFeedback, Stepper และ AvatarBadgeเพื่อแยกcontract

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | เพิ่มdot/standardด้วยcvaและsemantic tokensในBadgeเดิม; legacyvariantsและAvatarBadgeคงrecipeเดิม | `badge.tsx:43`, `CatalogFeedback.tsx:45`, `patterns.tsx:108` | ไม่ต้องสร้างcomponentเพิ่ม |

สรุป: ผ่าน1, ต้องแก้0, ตรวจไม่ได้0
ต่อไป: ไม่ต้องดำเนินการเพิ่มด้านreuse

**Component Audit — Core Badge**
ผลรวม: 9 story testsผ่าน รวมregression; native measurementsยืนยัน12combinations แต่มีcontrastที่ต้องตัดสินใจต้นทาง
ขอบเขต: dot/countทั้ง6สี, 0/1/12/99+/9999, legacyvariants, หน้า/portal, mobile320px, link focus, Stepper/catalog; ไม่รับรองHosXPหรือappภายนอก

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | standardสีprimary3.50:1, warning3.19:1, info4.10:1 ต่ำกว่า4.5:1ตามFigma; สีerror4.83/success5.48/default16.30ผ่านเกณฑ์คู่นี้ | `output/badge/render-measurements.json` | รายงานแล้ว ไม่แก้สีเอง รอการตัดสินใจต้นทาง |
| กลาง | ต้องแก้ | legacyBadge, Stepperและcatalogมีcontrast findingsเดิม | `output/badge/storybook-tests.txt` | คงข้อจำกัดเดิม ไม่ขยายงานสี |
| — | ตรวจไม่ได้ | ทุกProduct/font modeและFigma pixel parityอัตโนมัติ | ตรวจเฉพาะcheckoutนี้ | ตรวจเมื่อมีscopeเพิ่ม |
| — | ผ่าน | dot8px, standard20px/min20, typography12/16 Medium500, padding4/2px; bindingsจริงตรง6สี | Figma read-only, FigmaVariants, render measurements | คงค่าที่ตกลง |
| — | ผ่าน | ตัวนับหลายหลักขยาย ไม่clip ไม่ซ่อน0หรือตัด99+เอง; ไม่renderข้อความในdot | CountContent, `badge.tsx:56` | ผู้เรียกกำหนดจำนวน/label |
| — | ผ่าน | หน้า/portal geometryและtypographyตรงกัน; Dialogคืนfocusและlinkรับkeyboard focus | PageAndDialog | ไม่ต้องแก้เพิ่ม |
| — | ผ่าน | Mobile320pxไม่ล้น ข้อความ≥12px; legacyvariants/Stepper/catalogregressionผ่าน | MobileThai, Default, LegacyVariants, Steps | ไม่ต้องแก้เพิ่ม |
| — | ผ่าน | build/migration, tokens, Storybookbuild, coverage39/39, diffcheckผ่าน; lintไม่มีerror | output logs; Fast Refresh warningจากexported badgeVariantsเดิม | ไม่แยกไฟล์นอกscope |

สรุป: ผ่าน5, ต้องแก้2กลุ่ม, ตรวจไม่ได้1; testsผ่านไม่เท่ากับAAผ่านทั้งหมด
ต่อไป: ส่งreviewพร้อมcontrastที่ยังไม่แก้

## Documentation และข้อจำกัด

อัปเดตBadge stories6รายการและsourceตัวอย่างจริง คงDefault ID; coverageเป็น6; mapping/API/visual recipeและconsumersอยู่ใน `BADGE-FIGMA.md`. ไม่เพิ่มpropglowหรือbadgeContent. Figma on-canvas docsไม่ได้เขียนกลับหรือrename. ไม่มีCode Connectpublication.

จุดสีdefaultพื้นsunkenบนขาวมีcontrastต่ำ ถ้าใช้จุดนั้นสื่อสถานะเพียงอย่างเดียวไม่เพียงพอ; ใช้ข้อความ/labelหรือบริบทประกอบตามเอกสาร ไม่อ้างว่าจุดทุกสีผ่านnon-textcontrastทุกพื้นหลัง. ไม่ปรับสีต้นทางในงานนี้.

ตัวนับใช้childrenและขยายความกว้าง จึงไม่ได้จำกัด20×20เมื่อหลายหลัก. Storiesใช้ข้อมูลจำลอง ไม่เพิ่มnotification logicหรือbackend. ภาพFigmaเป็นvisual target ไม่มีการแปะภาพในUI.

หลักฐานที่ตรวจภาพแล้ว: `shadcn/output/badge/figma-variants.png`, `counts.png`, `mobile.png`, `dialog.png`, `render-measurements.json`, buildและtestlogs.
