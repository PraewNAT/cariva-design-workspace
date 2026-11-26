# Cariva Design Workspace — 2026-11-27

## Ownership และตำแหน่ง

| พื้นที่ | เจ้าของเนื้อหา |
|---|---|
| design-system/ | shared Core, tokens, theme, Product DS components, DS docs และ Storybook |
| products/<product-id>/prototypes/<prototype-id>/ | app, screens, cases, fixtures และ dependencies เฉพาะ prototype |
| workspace/ | Canvas, catalog และ preview tooling ที่ไม่เป็น production dependencies |
| legacy/mui/ | frozen reference ไม่ใช้ scaffold ใหม่ |

ใช้ workspace เดียวได้ ไม่ต้องแนบโฟลเดอร์ว่างอีกชุดก่อนสร้าง Product prototype ห้าม scaffold ทับ DS หรือแอปเดิม หาก Product/ตำแหน่งรู้จากงานแล้วให้ใช้ต่อ ไม่ถามซ้ำ ไม่ย้าย prototypes ของ Product หนึ่งไปอีก Product และไม่สร้าง Product จากการคาดเดา

Product DS ที่ใช้ซ้ำยังอยู่ใน design-system/src/lib/products/<product-id>/components; Product screens อยู่ products/<product-id>/prototypes ไม่สร้าง Core-to-prototype หรือ Core-to-Product dependencies ใช้ source/import integration ของ DS ที่ตรวจจริง ไม่อ้างว่ามี package/export ที่ยังไม่ได้ทำ

เก็บ package/lockfile และ dependencies ของ app แต่ละตัวตาม runtime ที่ใช้จริง การรวม repo ไม่เท่ากับรวม dependencies หรือเพิ่ม npm workspaces อัตโนมัติ Prototype ทุกตัวมีคำสั่ง run และ local port ที่ไม่ชนงานอื่น พร้อม Storybook entry (local story หรือ composition จาก Storybook ของ app ตาม capabilities จริง) ไม่รับประกันว่า install DS อย่างเดียวจะ run ทุก prototype ได้

## สารบัญและการเก็บงาน

อัปเดต products/README.md เมื่อสร้าง/ย้าย/เปลี่ยนสถานะ prototype แต่ละรายการต้องมี Product, ชื่อ, path, สถานะ, คำสั่งจาก workspace root, local URL/port, Storybook entry, Figma source/mapping และวันตรวจล่าสุด ช่องที่ไม่มีให้ระบุยังไม่มี/ยังไม่ตรวจ ไม่แต่ง URL หรือวันที่ตรวจ อย่าใส่ credentials, runtime PID หรือ local absolute path ของอีกเครื่อง

ใช้ README.md ใน prototype เป็นรายละเอียด contract/cases/setup ถ้ามีอยู่แล้ว ไม่สร้างเวอร์ชัน/release อัตโนมัติ สารบัญช่วยค้นงาน ไม่รับประกัน backup: ตรวจ Git diff และส่งสถานะ uncommitted; ไม่ commit/push โดยไม่มีคำขอ

ปัจจุบันมี Mira Product DS แต่ยังไม่มี Product prototype ที่ยืนยันแล้ว ตัวอย่าง catalog/appointment/form ใน DS คือ workspace examples ไม่จัดเป็น Mira หรือ BWC ตามเนื้อหาสมมติ

## Compatibility

shadcn -> design-system และ sync/canvas -> ../workspace/canvas เป็น symlinks ชั่วคราวเพื่อรักษา references เดิม งานใหม่ใช้ canonical path; อย่าสร้าง source ซ้ำใน alias Windows/เครื่องมือที่ไม่รองรับ symlink ต้องใช้ canonical path ไม่ลบ alias ก่อนตรวจ consumers ทั้งหมด รายการเก่าในบันทึก audit/changelog เป็นหลักฐานอดีต ไม่ต้องเปลี่ยนทุกประวัติให้ดูเหมือนใช้ path ใหม่ตั้งแต่แรก

เปลี่ยนชื่อที่แสดงเป็น Cariva Design Workspace เท่านั้น ไม่เปลี่ยนชื่อ checkout ที่เปิดอยู่ remote หรือ branch โดยอัตโนมัติ
