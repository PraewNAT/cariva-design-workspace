**Component Audit — Core Tooltip / Mira Credit Tooltip / Tabs correction**
ผลรวม: แยก Core/Mira และเพิ่มครบ22 Figma variants; แก้เส้นใต้ Tabs และลดความเร็ว animation; interaction ผ่าน22/22 โดยมี contrast ค้าง
ขอบเขต: 8Core Tooltip + 5Mira + 7Tabs + 2catalog stories; native browser guide keyboard, source geometry/props และ template docs; ไม่ใช่ full Product accessibility certification

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | Guide primary Back/Next และ Tabs ยังมีcontrastประมาณ3.2–3.5:1; catalogมีข้อค้างของcontrolอื่น | output/tooltip/tests.txt | ตัดสินใจ shared primary token แยก |
| — | ผ่าน | Standard tooltip role/id/aria-describedby เชื่อมเมื่อเปิด; hover/focus/Escape ทดสอบได้ | tooltip.tsx; Default/Keyboard stories | คง text-only semantics |
| — | ผ่าน | Action guide ใช้Popover: Next/Backเปลี่ยนตัวอย่าง; native Enterเพิ่มstep, Escapeคืนfocus | WithAction; browser | ไม่ใส่ปุ่มในrole tooltip |
| — | ผ่าน | Core Standard12/16px,p4/8,r4; guide240x168,r16; Mira text≥12และปรับgap4 | CSS recipes; rendered stories | ให้ข้อความยาวขยายได้ |
| — | ผ่าน | Core13/Mira9 linked specimens แยกdocs; ไม่มีtext<12หรือown horizontal overflow; 3setsprops/geometryคงเดิม | figma-verification.json | ใช้mappednodesเดิม |
| — | ผ่าน | Tabs underlinez2อยู่เหนือhover; pointer350ms/Folder320ms; keyboard0ms | tabs.css; native click screenshot; regression | รีวิวความเร็วตามfeedback |
| — | ผ่าน | Build, scopedlint, tokencheck และstory-filecoverageผ่าน | output/tooltip/; coverage44/44Core modules | ไม่ถือเป็นทุกstatecoverage |

สรุป: ผ่าน6, ต้องแก้1กลุ่ม; ไม่อ้างcontrastผ่านทั้งหมด
ต่อไป: รีวิวTooltip/Miraและความเร็วTabs ก่อนตัดสินใจprimarycontrastที่ต้นทาง

**Reuse & Duplicate Check — Core / Mira**
ผลรวม: ขยายTooltipเดิมและประกอบPopover/Badge/Button; Miraไม่คัดลอกprimitive
ขอบเขต: CoreTooltip/Popover/Badge/Button และ Product Mira folder; ไม่ตรวจทุกProductในrepository

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | Mira imports Core Tooltip; Coreไม่มีMira import. Guide reusesPopover/Button/Badge; Storybookแยก Core/Products | sourceimports; Storybook titles | คงdependencyจากProductไปCore |

สรุป: ผ่าน1, ต้องแก้0, ตรวจไม่ได้0
ต่อไป: ไม่ต้องดำเนินการเพิ่ม
