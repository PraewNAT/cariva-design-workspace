# Flow เมื่อผู้ใช้แจ้งว่าเปลี่ยน Figma variables

ใช้เมื่อผู้ใช้บอกว่า “ปรับสี border”, “เปลี่ยนฟอนต์”, “ปรับ variables แล้ว” หรือเปลี่ยนค่าประเภทใดก็ตามใน variables ไม่ต้องให้ผู้ใช้สั่งขั้นตอนย่อยซ้ำ

## ขอบเขตและแหล่งอ้างอิง

- ไฟล์ปัจจุบัน: `XgxprkSY5mGbzIIwlmscCt`; ถ้าผู้ใช้เปลี่ยนปลายทางให้ใช้ปลายทางใหม่อย่างชัดเจน ไม่สลับกับไฟล์เก่าเอง
- อ่าน **ทุก collection, ทุก mode, ทุก variable และทุก type ที่ API ให้เข้าถึงได้** รวม COLOR/FLOAT/STRING/BOOLEAN และ alias ไม่อ่านเฉพาะสีหรือ selection ที่ผู้ใช้เปิด
- อ่าน local variables ของไฟล์ให้ครบ ถ้ามี external library ที่อ่านไม่ได้ ระบุข้อจำกัด ไม่อ้างว่าอ่านครบทั้งองค์กร
- baseline/inventory: `design-references/figma/variables.latest.json` และ `VARIABLES.md` อ่านไฟล์เดิมก่อนดึงค่ารอบใหม่

## ขั้นตอนที่ AI ต้องทำ

1. **อ่านและเทียบทั้งชุด** ใช้ IDs ระบุ collection/variable/mode ร่วมกับชื่อเพื่อแยก rename, add, delete, mode change, type change, raw value, alias target และ resolved value; alias เปลี่ยนแต่สีเท่าเดิมก็นับว่าเปลี่ยน เก็บ snapshot เดิมก่อนเขียนทับเมื่อมีความต่าง
2. **แยกสิ่งที่ผู้ใช้เพิ่งเปลี่ยนกับ drift ที่มีอยู่แล้ว** snapshot คือสถานะ Figma ที่เคยอ่าน ไม่ใช่หลักฐานว่า code sync แล้ว หากไม่มี baseline ให้สร้างและแจ้งว่ารอบนี้ยังแยกประวัติการเปลี่ยนไม่ได้
3. **ไล่ผลกระทบ** ตาม aliases → tokens/theme/font assets/recipes → Core/Product components → stories/pages/charts → modal/popover portals → docs/Foundations ตรวจ dependency จริง ไม่สรุปว่าเปลี่ยนสีทุกที่เพราะ search พบคำเดียว
4. **อัปเดตเฉพาะ mapping ที่ยืนยันและอยู่ใน scope** สำหรับ colors แก้ `tokens.json` ทั้ง alias/value แล้ว run `npm run tokens:generate` ไม่แก้ generated files มือ สำหรับ font/spacing/radius/typography/breakpoint/icon/opacity/blur/border-width ให้ตรวจ adapter/recipe/generator ที่มีจริงก่อน ไม่มี mapping ให้รายงานช่องว่าง ไม่เดาชื่อ prop หรือสร้างระบบใหม่
5. **รักษาข้อจำกัดล่าสุด** ถ้าค่าใหม่ขัดกับ font ขั้นต่ำ 12px, API/radius ที่ห้ามเปลี่ยน, pending shadcn migration หรือแก้ business behavior ให้ทำส่วนที่ไม่ติดปัญหาก่อน แล้วแจ้ง conflict ที่ต้องตัดสินใจ ไม่ถือว่าการแจ้ง “เปลี่ยน variables” อนุญาตให้ migrate ทุกอย่าง
6. **ตรวจเอกสารที่เกี่ยวข้อง** อัปเดต inventory/snapshot, DESIGN.md, component docs, Storybook/Foundations และ mapping ที่ได้รับผล ไม่บังคับแก้ทุกไฟล์หรือเขียน Figma docs เมื่อไม่มีปลายทาง/authorization
7. **ตรวจผลจริงและ audit** เช็ก token generation/typecheck และ story tests ตามผลกระทบ; ตรวจ computed styles บนหน้าและ portal, mobile/long Thai/keyboard เมื่อเกี่ยวข้อง การเปลี่ยน shared token ต้องตรวจ consumer กว้างพอ ไม่มีการปิด test/a11y เพื่อให้ผ่าน
8. **สรุปสั้น ๆ** อะไรเปลี่ยน, กระทบตรงไหน, อัปเดตอะไรแล้ว, ผลตรวจ และ mapping/conflict ที่ค้าง เก็บ baseline ใหม่พร้อมสถานะว่าค่าใดนำไปใช้แล้ว/ยังไม่ map ไม่อ้าง auto sync ครบทุกค่า

## ตัวอย่าง impact ตามประเภท

| เปลี่ยนอะไร | ต้องตรวจอะไรต่อ |
|---|---|
| สี/alias | semantic mapping, theme, text/icon/surface/border/state, chart, portal, contrast |
| font-family | Product/mode/role, font asset/weights/fallback, text geometry และภาษาไทย |
| font-size/line-height/weight | Typography modes, control sizing, wrapping, mobile และขั้นต่ำ 12px |
| spacing/radius/border-width | recipes, auto-layout/code layout, page/modal consistency และข้อจำกัดเดิม |
| breakpoint | responsive mappings และ viewports ที่ได้รับผล ไม่ assume CSS mode switch มีแล้ว |
| opacity/blur/icon dimensions | renderer/units, contrast, hit area และ icon alignment |
| add/delete/rename/type/mode | mapping compatibility และ consumer ที่อาจพัง ก่อนลบหรือเปลี่ยน API |

## สิ่งที่มีจริงและยังไม่มี

นี่เป็น **กติกาที่ AI ต้องทำเมื่อรับงานในแชต** ไม่ใช่ background watcher หรือ CI และยังไม่มีสคริปต์ generic ที่ map variables ทุกประเภทให้เอง `tokens:check` ตรวจ generated code เทียบ tokens.json เท่านั้น ไม่ได้อ่าน Figma

ตอนเริ่มมี 635 local variables: Foundation 382, Semantic 199, Typography 51, Product Style 3 อ่านครบทุก mode; ไม่มี BOOLEAN ใน snapshot รอบนี้ ต้องอ่านได้หากเพิ่มภายหลัง ชุด Draft เป็น reference ไม่ auto promote เข้า Core
