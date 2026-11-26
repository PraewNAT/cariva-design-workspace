# File Upload audit — 26/11/2026

**Component Audit — Cariva Core File Upload**
ผลรวม: ทำ implementation/docs ตามขอบเขต; 8 story interactions ผ่าน แต่ accessibility ยังมี contrast ที่ผู้ใช้ให้คงไว้
ขอบเขต: icon/image, 4 item states, local selection, validation, controlled callbacks, page/Dialog, Thai/mobile; ไม่รวม transport จริงและการรับรอง pixel parity ของ generic SVG icons

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | error text 4.41:1 และ primary demo button 3.5:1 | output/file-upload/story-tests.txt | ผู้ใช้ให้คงสีและบันทึกข้อค้าง |
| — | ผ่าน | 8 stories: select/remove/reselect, drop reject type/size, controlled retry, states | output/file-upload/story-tests.txt | คง regression cases |
| — | ผ่าน | คีย์บอร์ดจริง Enter เปิด file chooser, เลือก/ลบ และ Escape คืน focus จาก Dialog | output/file-upload/native.json | ไม่ต้องดำเนินการเพิ่ม |
| — | ผ่าน | page/Dialog recipe ตรง: 320×160, padding16, radius12, IBM Plex Sans Thai; hover border strong | output/file-upload/native.json | image 320×196; text ยาวขยายได้ |
| — | ผ่าน | ข้อความต่ำสุด12px และไม่มี horizontal overflow ในหน้าที่ตรวจ; long Thai272px | output/file-upload/render.json | ไม่อ้าง physical-device coverage |
| — | ผ่าน | Figma docs ใช้ template; 14 linked specimens; ไม่มี own-text overflow; docsขั้นต่ำ20px | node4537:147576, template4537:130394 | main API/geometry คงเดิม |
| — | ผ่าน | build, tokens check และ story file coverage41/41 | project commands; /private/tmp/upload-final-build.txt | coverage เป็นจำนวนไฟล์ ไม่ใช่ทุก state |
| ต่ำ | ตรวจไม่ได้ | exact SVG icon parity และ upload/server security integration | ใช้ lucide icons; Product owns transport | ไม่อ้าง pixel parity/production transport |

สรุป: ผ่าน6, ต้องแก้1 (ผู้ใช้รับทราบ), ตรวจไม่ได้1; story interactions8/8 ไม่ใช่ accessibility ผ่านทั้งหมด
ต่อไป: จัดการ contrast ที่ต้นทางเมื่อทีมพร้อม

**Component Reuse & Duplicate Check — Cariva Core File Upload**
ผลรวม: ขยายตัวอย่าง FileUpload เดิม ไม่พบ implementation ซ้ำในขอบเขตที่ตรวจ
ขอบเขต: app/patterns.tsx, app/file-upload.tsx, เรื่องราว File Upload และ shared Button/Progress

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | FileUpload ใช้ Button/Progress จริง; patterns.tsx re-export; ไม่สร้าง transport/primitive ซ้ำ | app/file-upload.tsx, app/patterns.tsx | คง composition นี้ |

สรุป: ผ่าน1, ต้องแก้0, ตรวจไม่ได้0
ต่อไป: ไม่ต้องดำเนินการเพิ่ม

Test infrastructure: restart project Storybook/Vitest worker หลัง stale setup import; ไม่เปลี่ยน dependencies. Drag tests ใช้ native DataTransfer/DragEvent เพื่อหลีกเลี่ยง serialization ของ instrumented event helper. Approved disabled semantics เพิ่มที่ container; contrast ไม่ได้ถูกปิด rule หรือปรับสีเพื่อให้ผลผ่าน.

## Motion follow-up — 26/11/2026

ผลรวม: interaction stories9/9ผ่านหลังเพิ่ม Upload Animation; contrast ข้อค้างเดิมยังอยู่. Browser computed styles ยืนยัน spinner `spin` 1s และ indicator transition เฉพาะ width; complete ถอด progress/spinner. Reduced-motion ตรวจจาก motion-safe/motion-reduce CSS branches; ยังไม่ได้ทดสอบ OS setting จริง. Buildผ่าน. ขอบเขตเฉพาะ FileUploadItem; Button/Progress กลางไม่เปลี่ยน. ไม่มี API หรือ dependency ใหม่.
