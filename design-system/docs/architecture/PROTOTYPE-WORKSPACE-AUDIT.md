# Prototype workspace — 2026-11-27

**Component Reuse Check — Workspace tooling**
ผลรวม: reuse board และ DS examples เดิม ไม่สร้าง Product UI ซ้ำ
ขอบเขต: sync/canvas, WorkspaceCanvas, CoreCatalog, CatalogAppointment, CatalogForm และ Vite entry

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | renderer เดียวใน Vite และ Storybook | PrototypePreview.tsx + App.tsx + PrototypePreview.stories.tsx | เพิ่ม Product screens ใน registry เมื่อมีงานจริง |
| — | ผ่าน | tooling แยกจาก Core | features/prototype และ features/board; ไม่มี Core imports ย้อนเข้า tooling | ไม่ต้องแก้ Core |

สรุป: ผ่าน 2, ต้องแก้ 0, ตรวจไม่ได้ 0 ในขอบเขตนี้
ต่อไป: เพิ่มเคส Product จริงเมื่อได้รับ requirement

**Component Audit — Workspace tooling**
ผลรวม: feature พร้อมใช้งาน มีข้อค้างของ DS examples เดิมและข้อจำกัด native fullscreen
ขอบเขต: Canvas/Preview, standalone localhost, keyboard, URL reload, frame 320px; ไม่ใช่ audit ทุก Core component

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | contrast 3.5:1 และ label-content-name-mismatch ใน examples ที่ reuse | /tmp/cariva-prototype-test.txt; catalog/appointment stories | แก้ที่ Core ในงานแยก ไม่แก้ shared behavior รอบนี้ |
| — | ตรวจไม่ได้ | native fullscreen สำเร็จ | browser ปฏิเสธ requestFullscreen; มี notice และลิงก์แทน | ทดสอบ browser ที่อนุญาต; new-tab preview ตรวจผ่าน |
| — | ผ่าน | mode switch, selection, link และ mobile | 5 stories ผ่าน; Board play สลับ/เลือกเคส, Mobile play วัด 320px; browser วัด preview top 125.19 > toolbar bottom 113.19 | ไม่ต้องแก้เพิ่ม |
| — | ผ่าน | standalone และ popup | เปิดลิงก์จริงจาก Canvas ไป localhost:5173/?case=appointment; keyboard/Escape คืน focus ที่ date trigger | ไม่ต้องแก้เพิ่ม |
| — | ผ่าน | build และเอกสาร | npm run build ผ่าน (bundle-size warning); STORYBOOK-ORGANIZATION.md และ create-project skill | ไม่มี dependency ใหม่ |

สรุป: ผ่าน 3, ต้องแก้ 1, ตรวจไม่ได้ 1; interaction stories ผ่าน 5/5 แต่ไม่อ้างว่า a11y ทั้ง examples ผ่าน
ต่อไป: ทบทวนข้อค้าง Core แยกจาก workspace feature

ข้อจำกัด: direct Canvas URL เก็บ mode/case แต่ Storybook shell reload เริ่มจาก URL ของ story; state ของแต่ละ frame/host ไม่ sync กัน Static Storybook ยังอ้าง prototype localhost และต้องเปิด server 5173 แยกเมื่อใช้ปุ่มเต็มหน้า ตัวอย่างปัจจุบันเป็น DS catalog/form/date-time ไม่ใช่ Product prototype ที่ออกแบบใหม่
