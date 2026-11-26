# Avatar verification · 26 พฤศจิกายน 2026

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4648-15632). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


สถานะ: เสร็จตาม scope Avatar เดี่ยว → code, Storybook และ Markdown; มีข้อจำกัดเดิมของ catalog และ Figma docs ที่ระบุด้านล่าง. ไม่ได้ commit, push, publish เว็บ/library หรือสร้าง Code Connect.

**Component Reuse & Duplicate Check — Core Avatar**
ผลรวม: แก้ implementation เดิม ไม่พบของซ้ำในขอบเขตที่ตรวจ
ขอบเขต: ก่อน/หลังแก้ `avatar.tsx`, stories, `CatalogFeedback` และ `CoreCatalog`; ไม่ตรวจ application repositories ภายนอก

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | ใช้ Avatar/Base UI และ subcomponents เดิม; Sample เป็น story fixture เท่านั้น | `src/lib/app/components/ui/avatar.tsx:1`, `avatar.stories.tsx:25`, `CatalogFeedback.tsx:7` | ไม่ต้องสร้าง component ใหม่ |

สรุป: ผ่าน 1, ต้องแก้ 0, ตรวจไม่ได้ 0
ต่อไป: ไม่ต้องดำเนินการเพิ่มใน scope reuse

**Component Audit — Core Avatar**
ผลรวม: แก้ recipe และตรวจ render จริงแล้ว; Avatar 6 stories ผ่าน test/a11y ส่วน catalog มี contrast findings เดิมนอก scope
ขอบเขต: 24 Avatar combinations, broken/missing image, group/count, หน้า/portal, carivaApp และ backOffice-scoped mobile 320px; ไม่รับรอง HosXP หรือทุก Product ภายนอก

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | Contrast ของ Button/Badge/Pagination ใน catalog เดิม: 21 desktop + 20 mobile elements; ไม่มี Avatar อยู่ใน findings | `output/avatar/storybook-tests.txt` | แก้สีที่ต้นทางในงาน contrast แยก ไม่ override Avatar |
| — | ตรวจไม่ได้ | HosXP/font assets และ consumers ใน app repositories อื่น | ตรวจเฉพาะ checkout นี้; ไม่มีปลายทาง app ใน scope | ตรวจเมื่อมีงาน Product นั้น |
| — | ผ่าน | ขนาด 40/32/24/20px, initials ≥12px, icons 24/20/16/12px, badge กล่อง12/dot8px | `FigmaVariants`, `output/avatar/render-measurements.json` | คงข้อยกเว้น 12px ที่ยืนยัน |
| — | ผ่าน | รูปโหลดครบ; broken/missing image แสดง fallback, ไม่เพิ่มขนาด Avatar | `FigmaVariants`, `ImageFallback` | ไม่ต้องแก้เพิ่ม |
| — | ผ่าน | หน้าและ portal มี geometry/font/color เท่ากัน; เปิดด้วย Enter, Escape ปิดและคืน focus | `PageAndDialog`, `MobileThai`; แก้ inherited line-height ที่ root แล้ว | ไม่ต้องแก้เพิ่ม |
| — | ผ่าน | Mobile 320px ไม่ล้น (scrollWidth=320), Dialog=288px, ภาษาไทยยาวอ่านได้; group/count ขนาดเท่ากัน | `GroupSizes`, `MobileThai`, `output/avatar/mobile-dialog.png` | คง group layout เดิมตามขอบเขต |
| — | ผ่าน | build, migration check, tokens check, Storybook build, coverage39/39, lint เฉพาะไฟล์ และ story interactions 8/8 | `output/avatar/build.txt`, `storybook-build.txt`, `storybook-tests.txt`; oxlint exit0 | ไม่ต้องรันซ้ำหากไม่แก้ code |

สรุป: ผ่าน 5, ต้องแก้ 1 (เดิมนอก scope), ตรวจไม่ได้ 1; automated Avatar a11y ไม่พบ violations ไม่ใช่การรับรอง accessibility ทุกบริบท
ต่อไป: ส่ง Storybook review สำหรับตรวจหน้าตา โดยคง contrast ของ catalog เป็นงานค้างที่ต้นทาง

## Documentation check และ Figma parity

- อัปเดต `avatar.stories.tsx` เป็น 6 stories โดยคง Default ID, ตัวอย่าง source และ size controls; coverage row เป็น 6.
- เพิ่ม `AVATAR-FIGMA.md` สำหรับ mapping, API, visual recipe, assets, consumers และข้อยกเว้นที่ยืนยัน.
- Avatar เดี่ยว: เทียบ design context + screenshot กับ browser render ทั้ง 24 combinations; วัด size/icon/badge และใช้ local assets ตรง slot. Initials sm/xs ต่างอย่างตั้งใจเป็น 12px. ไม่มี automated pixel-diff หรือเครื่องวัด Figma parity อัตโนมัติ.
- AvatarGroup: ตรวจ regression ของ composition เดิม; ยังต่างจาก Figma group overlap/instance widths และไม่มี `max` prop. ไม่เรียกว่าซิงก์ group ครบ.
- Figma on-canvas docs และ descriptions ยังมี MUI snippets/10px. Pending การแก้ฝั่ง Figma เพราะรอบนี้อนุญาต Figma → Code; ไม่ได้เขียนกลับหรือ publish.
- คง working changes ของงานอื่นทั้งหมดบน branch `praew`.

## Evidence

หลักฐานใน `shadcn/output/avatar/`: `variants.png`, `groups.png`, `mobile.png`, `mobile-dialog.png`, `render-measurements.json`, build logs และ Storybook test log. ภาพ browser เป็น manual visual comparison; JSON เป็น computed browser geometry. Screenshot ถูกตรวจดูแล้ว ไม่ใช่ภาพจาก Figma ที่นำมาแปะใน UI.
