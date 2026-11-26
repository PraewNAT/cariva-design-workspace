# Mira Credit Badge ownership migration - 2026-11-26

**Component Audit - Mira Credit Badge**
Result: moved component, asset and six stories from Core to Mira with behavior unchanged.
Scope: six Mira Credit Badge + six Core Progress stories; Figma docs move. No new visual specification.

| Severity | Status | Item | Evidence | Next action |
|---|---|---|---|---|
| - | Pass | 12/12 scoped stories pass; build passes | output/credit-move/tests.txt, build.txt | Keep behavior |
| - | Pass | Same25 linked specimens moved; Core retains36. No text below12px or owned horizontal overflow | figma-verification.json | Reuse mapped docs |
| - | Pass | Product imports Core Progress/Skeleton; no Core import of Mira or old code path remains | source search; imports | Keep dependency direction |

Totals: 3 passed; no migration failures. Earlier audit details below remain historical evidence, with current paths corrected.
Next: review the new Mira group.

# Progress coverage correction — 26/11/2026

**Component Audit — Progress / Credit Badge**
ผลรวม: เติมสอง Credit Badge sets ที่ตกหล่น ครอบคลุมทั้ง4 sets ใน section4457:16647;12/12 Progress story interactionsผ่าน
ขอบเขต: compact2sizes×4statusesพร้อมnativehover, remaining/used, depleted text/zero aliases, loading/optional parts, page/DialogและThai320px. ไม่เชื่อมระบบเครดิตจริง

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน |12/12 Progress stories รวม6credit stories; loading→loaded และ Dialogเปิดจริงก่อนตรวจvisible | output/progress-credit/tests.txt | คงกรณีทดสอบ |
| — | ผ่าน | compact160×32/132×24; track64/48×4; UI font12/16; nativehover=#f1f5f9 | browser-evidence.json | คงrecipeเดียวบนหน้า/Dialog |
| — | ผ่าน |320px ไม่ล้นแม้จำนวนยาว/labelไทย; coin source16pxโหลดจริง | browser-evidence.json | ไม่ต้องดำเนินการเพิ่ม |
| — | ผ่าน | low textwarning/content/strong contrast5.02:1; primary/warningtrackใช้subtleเพื่อแก้sourceใกล้แต่ต่ำกว่า3:1 | PROGRESS-FIGMA.md | คงtokenกลางเดิม; บันทึกvisual difference |
| — | ผ่าน | Figma docs61linked specimens (12+24+16+9), visiblecreditlabels≥12; noownoverflow;2main APIs/geometry unchanged | figma-verification.json; docs4721:88932 | source10pxยังเป็นข้อมูลต้นฉบับ ไม่อ้างsyncmainfont |
| — | ผ่าน | Build, scopedlint, tokens checkผ่าน; sharedProgress/Skeletonไม่แก้ | build.txt; commandsจริง | ไม่ต้องดำเนินการเพิ่ม |
| ต่ำ | ตรวจไม่ได้ | PhysicalOS reducedmotion/screen readers/billing integration | CSSmotion-reduce; Productownsdata/status | ไม่อ้างfullAAหรือbillingreadiness |

สรุป: ผ่าน6, ต้องแก้0ในขอบเขตที่ตรวจ, ตรวจไม่ได้1
ต่อไป: ใช้รีวิวProgressฉบับแก้coverage และคงProduct logicแยกจากpresentation

**Component Reuse & Duplicate Check — Progress Credit**
ผลรวม: ใช้CreditBadgeเดียวประกอบจากProgress/Skeletonจริง ไม่พบของซ้ำในขอบเขตที่ตรวจ
ขอบเขต: src/lib/products/mira/components/credit-badge.tsx, src/lib/products/mira/components/credit-badge.stories.tsx และimportsของProgress/Skeleton

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน |สองFigma setsแมปCreditBadgeผ่านpresentationprops ไม่สร้างthresholdหรือrequestlogic | src/lib/products/mira/components/credit-badge.tsx; source7089:1151/7094:365 | Productส่งamount/status/progress |

สรุป: ผ่าน1, ต้องแก้0, ตรวจไม่ได้0
ต่อไป: ไม่ต้องดำเนินการเพิ่ม

รอบก่อนตัดCreditBadgeออกจากscopeเอง; การแก้รอบนี้ยืนยัน4setsครบ. ข้อความexclusionในauditเดิมเป็นhistoricalและมีcorrectionแล้ว. Main Figmaไม่rename/เปลี่ยนAPI; sourcealiasesdepleted2/depleted 2เป็นnumeric-zero presentation. Labels10pxปรับเฉพาะcode/docinstancesเป็น12px จึงอาจทำให้detailedbadgeกว้างกว่าsource ไม่ฝืนwidthจนข้อความเล็กลง. ต้นฉบับiconใช้PNG16pxจากFigma มิใช่ภาพแบนของcomponent.
