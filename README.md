# Cariva Design Workspace

พื้นที่ทำงานเดียวสำหรับ Design System และ prototype ของแต่ละ Product โดยแยกโค้ดกับเครื่องมือออกจากกัน หางานได้ง่าย และไม่เอาโค้ดทดลองไปปนกับ component ที่ใช้ร่วมกัน

ใช้ React + shadcn/ui (Base UI) + Tailwind v4 และ Figma เป็นต้นฉบับของดีไซน์

**Storybook ออนไลน์:** https://cariva-ds-storybook.vercel.app

## โครงสร้างโฟลเดอร์

```text
cariva-design-workspace/
├── design-system/                # Core และ Product DS: component, token, เอกสาร, Storybook
├── products/<product-id>/
│   └── prototypes/<prototype-id>/ # หน้าจอ, กรณีทดสอบ, ข้อมูลจำลอง และแอป prototype
├── workspace/
│   └── canvas/                   # บอร์ดและรายการเฟรม
├── .agents/skills/               # สกิลของ AI (`skills/` เป็นลิงก์ไว้ให้ของเดิมใช้ได้)
├── rules/                        # กฎกลางและการเลือกสกิล
├── legacy/mui/                   # DS เก่า เก็บไว้ดูอย่างเดียว ห้ามเขียนโค้ดใหม่ลงที่นี่
├── sync/                         # เครื่องมือ sync (`sync/canvas/` ชี้ไปที่ `workspace/canvas/`)
└── scripts/                      # เครื่องมือ peer bridge และ Code Connect
```

`shadcn/` เป็นลิงก์ไปที่ `design-system/` ไม่ใช่ DS อีกชุดหนึ่ง

## เริ่มใช้งาน

- เปิด Storybook ของ DS (พอร์ต 6006):

  ```bash
  cd design-system && npm ci && npm run storybook
  ```

- เปิดตัวเลือก prototype ของจริง (พอร์ต 5173) มีแถบข้างให้เลือก ไม่มีตัวอย่างของ DS:

  ```bash
  cd design-system && npm run prototype
  ```

- ดูงานจริงทั้งหมด พร้อมคำสั่งรัน พอร์ต Figma และสถานะ ได้ที่ [รายการ prototype](products/README.md)
- ก่อนสร้างงานใหม่ อ่าน [create-project](.agents/skills/create-project/SKILL.md) และก่อนเลือกที่วางไฟล์ อ่าน [ขอบเขตของ workspace](rules/workspace-structure.md)

`Mock HosXP` และ `Mock Mira` เป็นงานตัวอย่าง ไม่ใช่ Product จริง เมื่อเริ่มงานจริงให้สร้าง Product ID ใหม่ของตัวเอง

## อยากสั่ง AI ทำอะไร

เปิด Storybook แล้วดูโฟลเดอร์ **Workflows**

- หน้า `00 ภาพรวม` บอกว่าตั้งแต่สั่งงานจนเปิด PR คุณกับ AI ทำอะไรบ้าง
- หน้า `01`–`16` แยกตามชนิดงาน เช่น เพิ่มหรือแก้ component, แปลง Figma กับโค้ด, เปลี่ยน variable
- หน้า `17 รวมสกิล` บอกว่าสกิลแต่ละตัวทำอะไรและสั่งอย่างไร

## ขอสร้าง prototype

```text
สร้าง prototype [ชื่อ] ของ Product [ชื่อ Product]
ใช้ workspace นี้ และเก็บไว้ที่ products/<product-id>/prototypes/<prototype-id>/
Figma: [ลิงก์ ถ้ามี หรือให้ออกแบบจากความต้องการ]
```

- ไม่ต้องแนบโฟลเดอร์ว่างแยกทุกครั้ง ถ้ามีแอปอยู่แล้ว AI จะตรวจและใช้ต่อ ไม่สร้างทับ
- prototype ใหม่ทุกตัวใช้ React/shadcn มี dev server ของตัวเอง และเปิดใน Storybook ได้ทั้งแบบ Canvas / Preview / เต็มหน้า โดยใช้ตัวแสดงผลและกรณีทดสอบชุดเดียวกัน
- ไม่ติดตั้ง dependency ของ Product ลงใน DS เพียงเพื่อรวม workspace
- การสร้าง repo บน remote, publish, push, deploy และการเขียนลง Figma ต้องสั่งแยกทีละอย่าง
- ดีไซน์ต้องเปิดได้ด้วยเครื่องมือที่มี ส่วนงานในเครื่องไม่จำเป็นต้องมี Figma Desktop หรือล็อกอิน `gh`

## เอกสารอ้างอิง (ภาษาอังกฤษ)

- [Workflow](design-system/rules/workflow-map.md): ลำดับขั้นตอนและจุดตัดสินใจ
- [Agent rules](design-system/rules/agent-rules.md): กฎที่ AI ต้องทำตาม
- [Product setup](design-system/rules/product-setup-flow.md): การตั้งค่า Product
- [Figma component naming](design-system/docs/components/FIGMA-NAMING.md): การตั้งชื่อ component ใน Figma
- [เรื่องที่รอทีม DS ตัดสิน](design-system/docs/DS-TEAM-DECISIONS.md)

การจัด workspace นี้ไม่ได้เริ่มนับเลขเวอร์ชัน release
