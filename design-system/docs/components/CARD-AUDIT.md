# Card audit — ผลรอบสุดท้าย

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4713-2014). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


26 พฤศจิกายน 2026 · branch `praew` · working tree; checkpoint ก่อนแก้ `output/card/baseline/`; ยังไม่ commit/publish

**Reuse & Duplicate Check — Core Card**
ผลรวม: ปรับจาก compositions เดิม ไม่สร้าง Card ซ้ำและไม่เปลี่ยน primitive กลาง
ขอบเขต: ก่อน/หลังแก้ source, Storybook docs, Card/Badge/Button/Avatar, content-card ทั้ง5แบบ และ consumers ใน checkout

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | ใช้ Card/Badge/Button/Avatar จริง; ไม่พบของซ้ำใน scope; Metric ใช้ WarningRounded เดิม | content-card.tsx, content-card.stories.tsx | ไม่เพิ่ม dependency |
| — | ผ่าน | เพิ่มเฉพาะ topMessage และ layout/slots ใน wrappers; ไม่แก้ ui/card.tsx หรือ shared controls | baseline/content-card.tsx เทียบ source; Card/Chart/catalog tests | คง API เดิม |

สรุป: ผ่าน2, ต้องแก้0, ตรวจไม่ได้0 ใน scope ที่ตรวจ
ต่อไป: ส่งผล audit และข้อค้างด้านล่าง

**Component Audit — Core Card**
ผลรวม: แก้ครบตามคำยืนยันและ tests ผ่านการรัน12stories; คง contrast ที่ผู้ใช้ให้บันทึกเป็นข้อค้าง
ขอบเขต: Chromium page/Dialog, viewport320/1200px, ทั้ง5แบบ, slotsว่าง/ไทยยาว, source/tokens, native keyboard และ regression; ไม่รับรองทุกProduct/theme หรือ pixel parity

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | Metric abnormal value4.41:1 และ shared Button3.50:1 ต่ำกว่า4.5:1 | [test log](</Users/natthaphorna/Cariva DS/output/card/storybook-tests.txt>) | ผู้ใช้ให้คงสี abnormal และบันทึกค้าง; ไม่เปลี่ยน Button กลาง |
| — | ตรวจไม่ได้ | ทุกProduct/font mode และ automated pixel parity | ตรวจเฉพาะ active theme/checkout นี้ | ไม่อ้างว่าผ่านทั้งหมด |
| — | ผ่าน | Horizontal420×190/absoluteซ้อนขวา; Vertical330×370.66/2ปุ่มแถวเดียวgap16; Small344×104/slots80และ40 | [render data](</Users/natthaphorna/Cariva DS/output/card/render-audit.json>), screenshots | ความสูงขยายเมื่อข้อความยาว |
| — | ผ่าน | Profile ย่อจาก320เป็น240px ใน Dialog; viewport320px ทั้งหน้าและportalไม่ล้น; มี regression กรอบ240px | [mobile measurements](</Users/natthaphorna/Cariva DS/output/card/mobile-portal.json>), Profile story | คง max-width100% |
| — | ผ่าน | Profile/Metric normal bg/subtle #f1f5f9; Tag padding2/8; Unit secondary contrast9.45/9.47:1 | [approved fixes](</Users/natthaphorna/Cariva DS/output/card/approved-fixes.json>), render data | ไม่เปลี่ยน token หรือ Badge กลาง |
| — | ผ่าน | Text≥12px; ไทยยาวไม่ล้นใน3content recipes; page/portalใช้ typography และ Button recipe เดียวกัน | render data, PageAndDialog | ไม่อ้างว่าขนาด responsive ต้องเท่ากัน |
| — | ผ่าน | Optional slots/ค่า0; Enterทำงาน, focus trap และ Escapeคืนfocus | [keyboard evidence](</Users/natthaphorna/Cariva DS/output/card/native-keyboard.json>), OptionalContent | Component ยังเป็น presentational |
| — | ผ่าน | 12storiesผ่านการรัน; build/migration, tokens, Storybookbuild, coverage39/39, lintและdiffcheckผ่าน; docsตรงAPI | output/card logs; CARD-FIGMA.md | ไม่เรียก accessibility ผ่านทั้งหมด |

สรุป: ผ่าน6, ต้องแก้1กลุ่ม, ตรวจไม่ได้1กลุ่ม; คำตัดสินใจทั้ง5เรื่องได้รับคำตอบและดำเนินการตามที่อนุมัติแล้ว
ต่อไป: ส่ง review และแยกงาน contrast ที่ต้นทางตามการตัดสินใจของผู้ใช้

## Documentation และข้อจำกัด

อัปเดต CARD-FIGMA.md จาก API จริงและ Figma node จริง แก้ข้อความเดิมที่อธิบาย absolute เป็นแนวตั้ง เพิ่ม stories จาก5เป็น9โดยคง5 IDs เดิม. ภาพcheckerboard/avatarเป็น assetsเดิมจาก Figma ส่วน actionsเป็นตัวอย่าง dynamic slot; Metric iconเป็น componentเดิม12px. ไม่เขียนหรือ sync Figma และไม่อ้างว่า Code Connect เชื่อมแล้ว.

ความสูงข้อความไทยยาวเพิ่มตามเนื้อหา ไม่บังคับตัดข้อความของ3content recipes; name/identifier ของ Profile ยัง truncate ตามเดิม. การกำหนดสถานะ Metric ต้องทำภายนอก ไม่มี medical thresholds ใน Core. Testผ่านการรันยังมี accessibility contrast findings ตาม log. Unit secondary เป็นข้อแตกต่างจาก Figma ที่ผู้ใช้อนุมัติแล้ว ไม่ถือว่า Figma ถูก sync ตาม. การเปลี่ยนพื้นและTagจำกัดเฉพาะ Card ตามคำยืนยัน.

## Storybook organization follow-up

Component examples now live together in `Core/Components/Card`, with10stories in `ui/card.stories.tsx`. The9composition stories moved from `app/content-card.stories.tsx`; production component code is unchanged. Earlier evidence IDs above describe the audit at that time. Navigation follow-up evidence: `output/storybook-navigation/`, docs/architecture/STORYBOOK-ORGANIZATION.md.
