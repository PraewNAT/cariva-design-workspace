# Cariva Core rules — adapted

For copied/external components, follow [Component adoption flow](component-adoption-flow.md). Reuse our existing components and Product recipes, including radius and geometry, rather than retaining the source library's shape and only changing colors/fonts. Respect explicit task constraints and report remaining gaps before claiming complete adoption.

ปรับใช้จาก `/Users/natthaphorna/Cariva DS/rules/core-rules.md` และ `rules/DESIGN.md` วันที่ 24 พฤศจิกายน 2026 ใช้ร่วมกับ AGENTS.md และ [DESIGN.md](../DESIGN.md) ของ workspace นี้ ไม่อ่านข้อกำหนดเก่าเป็นการอนุมัติ migrate หรือ sync ทุกอย่าง

## ใช้ของเดิมก่อน

- ค้น Core และ Product components ผ่าน Component Reuse Check ก่อนสร้าง UI รวม sidebar, header, modal, table และองค์ประกอบประกอบ ไม่ยกเว้นเพราะเขียนเองจัด layout ได้เร็วกว่า
- ใช้ existing props/variants/tokens ก่อน ถ้าประกอบไม่ได้จริงให้บอกข้อจำกัดและเสนอการขยาย ไม่สร้างของซ้ำเงียบ ๆ
- ใช้ semantic colors และ font roles ตาม DESIGN.md ไม่สร้าง palette จากเอกสารทดลองทับ Core
- Core ไม่ขึ้นกับ routing/API/business logic ของ Product; ส่วนเฉพาะ Product อยู่ในพื้นที่ Product

## Naming และ contract

- Figma components ใช้ kebab-case และ code ใช้ PascalCase; ปัจจุบันใช้ `crv-*` / `Crv*` ไม่เริ่ม prefix `cv-*` / `Cv*` ชุดใหม่หรือ rename ของเดิมอัตโนมัติ
- Screen frame ใช้ `{Flow}/{Screen Name}` แบบ Title Case; state ใช้ ` - {State}` ไม่ใช้กฎตั้งชื่อหน้าจอกับ component
- อ่าน props จริง ห้ามสร้าง unsupported props จากชื่อใน Figma ถ้ามี mapping ให้ reuse component ที่ map ไว้
- ถ้าต้องประกอบหลาย primitive ให้แยก wrapper/composition เช่น button + badge ไม่ส่ง badge props ไป Button
- คง API และ radius เดิม โดยเฉพาะงานปรับ Figma ไม่เพิ่ม props/variables หรือใช้ padding ค่าพิเศษเพื่อฝืนขนาด

## Stack และ implementation

- Runtime ปัจจุบันเป็น React/shadcn Base UI ตามคำสั่งเริ่ม 24 พฤศจิกายน 2026; MUI/Crv อยู่ใน legacy reference
- หน้าใหม่ใช้ shadcn API จริง; migration-adapters ของ Lab แปลงเฉพาะ props ที่มี consumer ไม่ใช้ MUI sx หรือ ThemeProvider
- React ปัจจุบันเป็น 19; ไม่อ้างข้อห้ามจาก React 18 เป็นเหตุผลถาวร และไม่ rewrite forwardRef ที่ยังใช้งานได้โดยไม่มีงานรองรับ
- เมื่อแตะ component ให้ตรวจจุด selector/contract ที่มีอยู่ ใช้ marker ที่ component เป็นเจ้าของ เช่น `data-ui` หรือ `data-slot` ตาม implementation; ห้ามประกาศว่าทุก component มี attributes/variant table ครบโดยไม่ตรวจ
- defaults และ metrics ควรมาจาก recipe เดียว เมื่อปรับให้รวมตามขอบเขต ไม่ rewrite ทุกตัวเพื่อให้เป็นโครงสร้างในเอกสาร

## UI และ accessibility

- Label ไม่ใช่ placeholder; input ต้องมี accessible name เมื่อซ่อน label
- Error ต้องมีข้อความ ไม่ใช้เปลี่ยนสีอย่างเดียว ปุ่มไอคอนต้องมี accessible name
- ไม่ใช้จุดนำหน้า status tag และไม่ใช้ middle dot คั่นข้อความ
- Font ทุกจุดที่ render ต้อง >=12px; ตรวจ long Thai, mobile, keyboard และ focus restoration ของ modal
- ใช้ state/touch area ที่เหมาะกับบริบท โดยไม่บังคับเปลี่ยน visual height ของปุ่มตามตัวเลขตัวอย่างเก่า
- Border/shadow/radius ใช้ recipe ของ component หรือ Product ที่ตกลง ไม่ใช้กฎ no-border/no-pill จาก reference ทับของที่ผู้ใช้เลือกไว้
- ทุกการแก้ UI ต้องตรวจ consumer บนหน้าและ portal และทำ Component Audit พร้อมหลักฐาน

## เอกสารและการเปลี่ยน variables

- เมื่อผู้ใช้บอกว่าปรับ variables ให้ทำ [Figma variable change flow](figma-variable-change-flow.md) โดยอ่านครบทุก collection/mode/type
- หลังแก้ component/token ตรวจ docs และ stories ที่เกี่ยวข้อง แล้ว audit ก่อนจบ ไม่บังคับสร้าง .md ทุกตัวหรือเอกสารเจ็ดชนิด
- Code ระบุ props/behavior ที่ implement จริง; Figma/ข้อตกลงระบุ visual specification แยก gap ที่ยังไม่ implement
- การแก้ Markdown ไม่อนุญาตให้เขียน Figma ทุกครั้งโดยอัตโนมัติ อัปเดตเฉพาะปลายทางที่มี mapping และอยู่ใน scope พร้อมรายงานส่วนที่ค้าง
- ไม่เริ่ม release numbering, publish, merge หรือลบ source/branch โดยอัตโนมัติ

## จุดที่ไม่รับจากต้นฉบับ

| ข้อความเดิม | ข้อตกลงที่ใช้ที่นี่ |
|---|---|
| content/secondary = Slate 500 | Slate 700 จาก Figma ปัจจุบัน |
| border/default/strong/disabled = Slate 300/400/200 | Slate 200/300/100 จาก Figma ปัจจุบัน |
| cariva app = Aktiv/Google Sans | IBM Plex Thai/Looped ตาม Product Style ปัจจุบัน; HosXP แยก mode |
| label/xsmall 10px | ไม่อนุญาตให้ใช้ต่ำกว่า 12px |
| บังคับ MUI ถาวร / React 18 | React 19 / shadcn Base UI active; MUI frozen |
| บังคับ radius, no-pill, button medium 36px | คง contract ล่าสุดของ component; ไม่เปลี่ยนจากเอกสารนำเข้า |
| ห้าม border บน card ทุกกรณี | ใช้ Product recipe ที่ตกลง ไม่ล้าง table trial ที่ผู้ใช้ชอบ |
| warning on-fill ต้องเข้ม แต่ token ยังขาว | รายงาน conflict/contrast ไม่เปลี่ยนสีต้นทางหรือ override เงียบ ๆ |
| ทุก component มี data-slot/variant table แล้ว | ตรวจ implementation จริงก่อนอ้าง |
| ทุก doc edit ต้อง sync Figma ทันที | ทำเฉพาะ mapping/scope ที่อนุญาต ไม่อ้าง automation ที่ยังไม่มี |
