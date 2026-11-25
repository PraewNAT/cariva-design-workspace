# โครงสร้างและสกิลสำหรับแผนใหม่

> **สถานะ 26 พฤศจิกายน 2026:** เอกสารนี้เป็นบันทึกตามวันที่ที่เขียน ไม่ได้อัปเดตตามทุกการตัดสินใจหลังจากนั้น ข้อตกลง "เก็บของเก่าจนกว่าจะอนุญาต" ยังใช้อยู่ในรูปของ `legacy/mui/` ลำดับขั้นและจุดตัดสินใจปัจจุบันอยู่ที่ `rules/workflow-map.md` ของ `shadcn/`

บันทึก 24 พฤศจิกายน 2026 / สถานะ: ผู้ใช้สั่งเริ่ม migrate แล้ว ดู SHADCN-MIGRATION.md สำหรับโครงสร้างจริงและผลตรวจ

## ข้อตกลงล่าสุด

1. ปรับ component ใน Figma Design System ให้ลงตัวก่อน เก็บของเก่าจนกว่าผู้ใช้อนุญาตให้แทนหรือลบ
2. เมื่อผู้ใช้สั่งเริ่ม จึงเปลี่ยนโค้ด component ทั้งชุดไปใช้ shadcn และปรับหน้าตาให้ตรง Figma ที่ตกลงแล้ว
3. อิงโครงสร้าง `/Users/natthaphorna/structure-lab-interpret/` โดยเลือกเฉพาะส่วนที่เหมาะกับ DS ไม่ยก business logic ของ Lab มาใช้
4. ใช้สกิลที่มีอยู่ ไม่สร้างสกิลใหม่ ผู้ใช้อนุญาตจัดโครงสร้าง active code แล้ววันที่ 25 พฤศจิกายน 2026
5. การย้าย MUI ก่อนหน้านี้เป็นฐานชั่วคราว ไม่ใช่ stack เป้าหมายถาวร ไม่ให้ดำเนินการต่อจากแผนเก่าโดยอัตโนมัติ

## โครงสร้างที่พบจริงในโฟลเดอร์อ้างอิง

```text
app/                              # Next.js routes, layout, globals.css
lib/
  app/
    components/ui/                # shadcn primitives
    components/app/               # ส่วนประกอบร่วมของแอป เช่น page-header, edge-states
    hooks/                        # alias ตั้งไว้ ไม่ได้ยืนยันว่ามีไฟล์ใช้งานแล้ว
    i18n/, messages/, utils.ts
  core/                           # shared utilities และ i18n ที่ไม่ผูกหน้า
  features/<feature>/
    presentation/                 # หน้าจอและองค์ประกอบของ feature
    infrastructure/               # การเชื่อมข้อมูลของ feature
  infrastructure/                 # config, auth, HTTP, composition
assets/brand/
components.json
```

หลักฐาน: components.json และ directory layout; package.json เป็น Next.js 16 / React 19, Tailwind 4 และใช้ Radix กับ shadcn style radix-nova ในโฟลเดอร์อ้างอิง ไม่ได้หมายความว่า workspace ปัจจุบันเปลี่ยนเป็น Next.js หรือ Radix แล้ว

## โครงสร้างที่เสนอสำหรับ DS นี้

```text
app/                              # route/layout ถ้าเลือก Next.js ภายหลัง
lib/
  app/
    components/
      ui/                         # shared Core primitives จาก shadcn
      app/                        # reusable compositions/patterns เช่น Table toolbar
    hooks/
    utils.ts
  core/
    design-system/
      tokens/                     # primitives และ semantic tokens
      themes/                     # default theme และ Product overrides
      catalog/                    # registry/index สำหรับค้นหาของเดิม
      figma/                      # mappings และ baseline ที่ตรวจแล้ว
  features/
    board/presentation/           # พื้นที่แสดงเคสจริง แยกจาก components สำหรับส่ง Dev
    playground/presentation/      # ฟีเจอร์ในแผน ยังไม่สร้างตอน migrate อัตโนมัติ
    <product>/presentation/        # หน้าจอและ component เฉพาะ Product
  infrastructure/                 # integration ที่จำเป็นจริง ค่อยเพิ่มเมื่อมีการใช้
design-references/                # DESIGN.md และ reference แยกจาก approved tokens
docs/
  plans/
  handoff/
.storybook/
.agents/skills/
AGENTS.md
```

โครงสร้างนี้นำมาใช้กับ active src แล้ววันที่ 25 พฤศจิกายน 2026; ดู docs/architecture/STRUCTURE.md สำหรับตำแหน่งจริง ชื่อ `ui` หมายถึง Core ที่ใช้ข้าม Product ส่วน `features/<product>` เป็นของเฉพาะ Product; ไม่สร้าง Core สองชุดซ้ำกันอีก

- วาง story และ doc ใกล้ component เมื่อเหมาะสม ไม่บังคับเจ็ดไฟล์ต่อ component
- แยก theme ต่อ Product โดยใช้ component กลางร่วมกัน อย่าล็อกสี/ฟอนต์ Product ใน primitive
- อย่า import board/playground หรือ infrastructure ของแอปเข้า UI Core
- หากคง Vite ให้ใช้ entry/routes ของ Vite แทน `app/` แบบ Next.js โดยรักษาการแบ่งชั้นเดียวกัน
- ก่อนเริ่มจริง ตรวจ framework, primitive base (Radix/Base UI), aliases และวิธีส่ง component ให้ Dev ร่วมกับทีม ไม่ถือว่าการอ้างอิงโครงสร้างคืออนุมัติทุก dependency

## สกิลที่ใช้ซ้ำได้

โปรเจกต์นี้ใช้ symlink `.agents/skills → ../../Cariva DS/.agents/skills` อยู่แล้ว ไม่ต้องคัดลอกหรือติดตั้งซ้ำ หากเปิดโปรเจกต์ใหม่คนละที่ ต้องตั้ง path/link หรือคัดลอก skills พร้อม references ให้ถูก ไม่พึ่ง symlink ที่ชี้หาย

| กลุ่ม | Skill | การใช้งานและข้อจำกัด |
|---|---|---|
| หลัก | component-reuse-check | ค้นหา Core/Product ก่อนสร้าง ตรวจซ้ำหลังแก้ ใช้กับ shadcn ได้ |
| หลัก | component-audit | ตรวจ code, tokens, cross-surface, states, accessibility หลังแก้ |
| หลัก | case-planning | วางเคสก่อนเขียน UI แยกเคสยืนยัน/ข้อเสนอ/คำถาม |
| หลัก | shadcn | ใช้เมื่อเริ่มทำโค้ดใหม่ อ่าน components.json ของ target จริง |
| หลัก | document | อัปเดต doc จาก implemented contract และ visual spec ที่ตกลง |
| หลัก | doc-coverage | ตรวจ component/story/doc ที่มีจริง ไม่บังคับทุกตัวต้องมี .md |
| หลัก | changelog | บันทึกการเปลี่ยนแปลงแบบ Draft ไม่เริ่มเลข release เอง |
| หลัก | pr-checklist | ใช้เมื่อมี Git/PR จริง ใช้ผล audit/reuse เดิม ไม่รันซ้ำโดยไร้เหตุผล |
| งาน Figma | audit | ตรวจ bindings/naming ใน Figma ไม่ใช่ audit โค้ด; ต้อง resolve paths และ tokens ของ target ใหม่ |
| งาน Figma | map-fix | ใช้ workflow เดิมแก้ mapping/bindings ต้องทบทวนกฎเก่าและอ่านปลายทางจริงก่อน ห้ามใช้ specs MUI เก่าทับแบบใหม่ |
| งาน Figma | design-review | ตรวจหน้าจอ Figma ก่อน handoff ไม่แทน component-audit |
| งาน Figma | rename-frame | จัดชื่อ frames เมื่อร้องขอ ไม่เปลี่ยน naming ทั่วไฟล์อัตโนมัติ |
| งาน Figma | code-to-figma | ส่งหน้าจอที่เลือกไป Figma ผ่าน plugin; มี references path เก่าที่ต้อง resolve ตาม workspace |
| เลือกใช้ | impeccable | ช่วย critique/polish ตามทิศทางที่เลือก เป็น link ไป global installation |
| เลือกใช้ | emil-design-eng | รายละเอียด interaction/motion ไม่ใช่ขั้นบังคับทุก component |
| เลือกใช้ | ui-ux-pro-max | ค้นแนวทางประกอบการตัดสินใจ ไม่ให้ทับ Figma/tokens ที่ตกลง |
| เลือกใช้ | prototype-to-figma | แตก prototype เป็น flows/states เมื่อร้องขอ ไม่ใช้ซ้ำกับ code-to-figma ในงานเดียวกัน |
| นำมาด้วย | localization-export | ดึงข้อความจาก Figma จัดทำ/อัปเดต localization sheet และช่วยแปล ใช้กับ shadcn ได้ ไม่ผูกกับ MUI; เรียกเมื่อมีงาน localization |
| ภายหลัง | ux-writing | รอผู้ใช้สั่งเริ่มตามข้อตกลงเดิม |

เป็นการตรวจขอบเขตจาก skill definitions/routing และอ่านรายละเอียดบางตัว ไม่ได้ทดสอบทุก skill แบบ end-to-end หรือรับรองว่า legacy path ทุกจุดใช้ได้โดยไม่ปรับ ใช้ตัวเดิมเป็นฐานและปรับ configuration/references เมื่อเริ่มจริง แทนการเขียน skill ใหม่

## ไม่นำเข้าชุดใหม่

ตามคำสั่งผู้ใช้ ไม่นำ `crv-component-code`, `create-project`, `add-version-tab` และ aliases ซ้ำ `verify-ds-usage`, `document-update` มาในชุดใหม่ เก็บต้นฉบับใน Cariva DS ไว้ ไม่ลบผ่าน symlink ที่แชร์กัน รายการข้างต้นเป็นแผนการเลือกสกิล ยังไม่ได้แยกหรือติดตั้งชุดใหม่จริง

## เครื่องมือ/สกิลจากภายนอกโฟลเดอร์

- Figma plugin: figma-use, figma-generate-library, figma-generate-design, figma-design-to-code, figma-code-connect ใช้ตามงาน ไม่ต้องคัดลอกโค้ดสกิลเข้า repo
- Storybook: ใช้ stories/write-story และ test/review CLI ตามเวอร์ชันที่ติดตั้งใน target จริง
- MCP เป็นการเชื่อมต่อเครื่องมือ ไม่ใช่ระบบ sync อัตโนมัติ
- Design–Code Parity & Sync, board/playground/catalog automation ยังไม่ถือว่ามี implementation จากการมี skills

## ลำดับเมื่อผู้ใช้สั่งเริ่มภายหลัง

1. ยืนยัน component/spec ใน Figma พร้อมแยกของใหม่กับของเก่า
2. ตรวจและล็อกโครงสร้าง/stack กับ Dev แล้วเก็บ checkpoint
3. ย้ายทีละ component เริ่ม Table หรือ Button ตามลำดับที่ตกลง โดย reuse shadcn และรักษา contract ที่จำเป็น
4. เทียบ visual จาก Figma จริง อัปเดต cases, stories, doc และ mapping ที่เกี่ยวข้อง
5. Component Audit และ regression ของ consumers ก่อนนำไปใช้ร่วมกัน
6. ไม่ลบ MUI/ของเก่าหรือ publish จนกว่าผู้ใช้อนุญาต

ตอนนี้หยุดที่การบันทึกแผนและการใช้สกิลเดิม ไม่มีการ migrate code, สร้าง skill, เปลี่ยน dependencies หรือแก้ Figma จากงานบันทึกนี้
