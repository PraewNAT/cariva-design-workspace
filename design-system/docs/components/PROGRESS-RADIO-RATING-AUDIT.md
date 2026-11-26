# Progress / Radio Group / Rating — audit 26/11/2026

> Correction: the previous exclusion of Credit Badge was a scope mistake. Both sets are now included; PROGRESS-CREDIT-AUDIT.md supersedes that exclusion and records the expanded Progress coverage. The35-story result below is historical evidence for the original three-component pass.

**Component Audit — Cariva Core**
ผลรวม: Implement และอัปเดต Storybook/Markdown/Figma docs ครบ;35/35 story interactions ผ่าน โดยยังมีข้อจำกัด accessibility จาก visual ต้นทาง
ขอบเขต: Progress6, Radio Group6, Rating8 stories; regression15 File Upload/Stepper/Sheet/catalog. ตรวจ carivaApp และ backOffice mobile320px, page/Dialog, keyboard จริง. ไม่รวม credit badges, backend, physical touch/OS preference หรือ screen-reader certification

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | Radio border/default และ Rating amber/empty outline มี non-text contrast ต่ำ; Rating18px/half-step มีพื้นที่กดต่ำกว่า24px | Figma bindings; computed browser styles; RATING-FIGMA.md / RADIO-GROUP-FIGMA.md | คง visual ต้นทางและบันทึกข้อค้าง ไม่เปลี่ยน token กลางเพื่อผ่าน audit |
| — | ผ่าน |20/20 component stories และ15/15 consumer interactions; disabled style และ SVG mask มี focused regression | output/progress-radio-rating/component-tests.txt, consumer-tests.txt | คง regression cases |
| — | ผ่าน | Native Rating ArrowRight4→4.5; Radio ArrowUp ข้าม disabled; focus/system inset2px | output/progress-radio-rating/browser-evidence.json | ไม่ต้องดำเนินการเพิ่ม |
| — | ผ่าน | Progress4px/circular24/40/56; Radio16/dot10; Rating18/24/30; page/Dialog recipeตรงกัน; Thai320pxไม่ล้น ข้อความต่ำสุด12px | browser-evidence.json; Storybook states | ใช้ primitives ชุดเดียวกัน |
| — | ผ่าน | Figma templateครบ3หน้า,75 linked specimens, own-doc text≥20px/no overflow;7 main contracts/geometryไม่เปลี่ยน | figma-verification.json; mapped Figma links | อัปเดต mapped nodes เดิม |
| — | ผ่าน | Build, scoped oxlint, tokens check, story file coverage41/41 | คำสั่งที่รันจริง; output/progress-radio-rating/build.txt | ไม่ใช่การรับรองทุก Product/ทุก state |
| ต่ำ | ตรวจไม่ได้ | Reduced-motion ตรวจ CSS branches เท่านั้น; ยังไม่เปิด OS preference จริง/physical touch/screen reader | motion-safe/motion-reduce rules; progress.css | ตรวจเมื่อมี device/AT ที่เหมาะสม |

สรุป: ผ่าน5, ต้องแก้1, ตรวจไม่ได้1; ไม่อ้าง WCAG AA ครบ แม้ interaction tests ผ่านทั้งหมด
ต่อไป: แก้ accessibility visual gaps ที่ต้นทางเมื่อทีมพร้อม โดยคงหลักฐาน/ข้อจำกัดนี้ในการ handoff

**Component Reuse & Duplicate Check — Cariva Core**
ผลรวม: ใช้ shared/Base UI primitives จริง ไม่พบของซ้ำในขอบเขตที่ตรวจ
ขอบเขต: ui/progress.tsx, ui/radio-group.tsx, app/rating.tsx, patterns.tsx และผู้ใช้ร่วมที่ระบุข้างต้น

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | ขยาย Progress/RadioGroup เดิม; CircularProgress ใช้ Base UI Progress root; RadioField ใช้ RadioGroupItem; Rating ใช้ shared RadioGroup + Base UI Radio.Root และ original SVG | source imports; old Ratingแทนด้วย re-export ไม่เก็บคู่ซ้ำ | คง composition; ไม่แตะ Spinner เดิม |

สรุป: ผ่าน1, ต้องแก้0, ตรวจไม่ได้0
ต่อไป: ไม่ต้องดำเนินการเพิ่ม

## การตัดสินใจในขอบเขตที่ผู้ใช้อนุญาต

- ไม่ถามยืนยันซ้ำตามคำสั่งล่าสุด แต่คงข้อจำกัด shared tokens/main Figma APIs. ไม่เปลี่ยน contrast ของ File Upload ที่ผู้ใช้ตัดสินใจคงไว้ก่อนหน้านี้; regression ยังรายงาน error4.41:1 และ primary demo3.5:1 เดิม ไม่ถือเป็น defect ใหม่จากสามตัวนี้.
- ไม่แก้ credit badge บนหน้า Progress หรือ component อื่นที่เพื่อนร่วมงานกำลังแก้.
- Progress default track12→4px มีผลกับ Stepper/catalog ตาม Figma; FileUpload override3pxคงเดิม. ทดสอบผู้ใช้ร่วมแล้ว.
- Radio disabled ใช้ data-disabled ที่ Base UI render จริง; ไม่ใช้ pseudo-class disabled ที่ไม่ตรงกับ span radio. Error/disabled precedenceชัดเจน. RadioField แยก accessible label กับ description และเว้น1px legacy paddingเพื่อรักษา spacing scale.
- Ratingใช้ต้นฉบับSVG20×19ใน24pxslot ผ่าน CSS mask ที่ quote URL ถูกต้อง; เพิ่ม regression ที่ตรวจ computed mask เพื่อไม่ให้ย้อนกลับไปเป็นสี่เหลี่ยม. Hoverใช้23/29/36pxตามsource. ไม่จำลอง network/business data.
- ชื่อ/props/variants/radius main Figma ไม่เปลี่ยน; เปลี่ยนเฉพาะ docs templateและdescriptions. Naming tableระบุ code mappingจริง แยกจากข้อเสนอ rename.
