# Cariva Design Workspace migration — 2026-11-27

**Component Reuse Check — Workspace organization**
ผลรวม: ย้าย DS/tooling จริงโดยเก็บ compatibility links ไม่คัดลอก component หรือสร้าง Product app จำลอง
ขอบเขต: root docs/rules, create-project, DS package, Canvas static assets และ prototype index

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | canonical source ชุดเดียว | shadcn -> design-system; sync/canvas -> ../workspace/canvas | งานใหม่ใช้ canonical paths |
| — | ผ่าน | Product DS กับ app แยกกัน | design-system/src/lib/products/mira/components; products/mira/prototypes | เพิ่ม app เมื่อมี requirement |

สรุป: ผ่าน 2, ต้องแก้ 0, ตรวจไม่ได้ 0 ในขอบเขตนี้
ต่อไป: สร้าง Product prototype จาก requirement จริง

**Component Audit — Migration regression**
ผลรวม: build และ focused interaction tests ผ่าน ไม่มีการเปลี่ยน visual recipe ของ Core
ขอบเขต: package build, Canvas desktop/mobile, appointment renderer, config/links; ไม่ได้ audit ทุก Core component หรือทดสอบ fresh clone บน Windows

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | label-content-name-mismatch ของ Date/Time เดิม | /tmp/cariva-workspace-tests.txt; เหมือนข้อค้างก่อนย้าย | แก้ Core แยกเมื่อได้รับขอบเขต |
| — | ผ่าน | build canonical path | npm run build ใน design-system ผ่าน; bundle-size warning เดิม | ไม่มี dependency ใหม่ |
| — | ผ่าน | Storybook regression | test-run ผ่าน Board/Mobile/Appointment 3/3; ไม่มี Canvas a11y violations ในผล focused run | ใช้ servers เดิม |
| — | ผ่าน | เอกสารและ routing | README, AGENTS, CLAUDE, workspace rules, create-project, products/README; figma.config canonical paths | ไม่มี publish/sync ภายนอก |
| — | ตรวจไม่ได้ | Windows symlink checkout | ไม่ได้ทดสอบเครื่องอื่น | ใช้ canonical paths เมื่อเครื่องมือไม่รองรับ symlink |

สรุป: ผ่าน 3, ต้องแก้ 1 (ข้อค้างเดิม), ตรวจไม่ได้ 1
ต่อไป: review Git diff และ commit เมื่อผู้ใช้สั่ง; งานยังเป็น local working changes ไม่ใช่ backup/push สำเร็จแล้ว

ชื่อ workspace คือ Cariva Design Workspace แต่ชื่อ checkout บนเครื่องและ Git remote ยังคงเดิม ไม่ได้สร้าง repo, ย้าย root directory, deploy หรือ publish Code Connect
