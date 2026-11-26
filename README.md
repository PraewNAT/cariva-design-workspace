# Cariva Design Workspace

Workspace เดียวสำหรับ Design System และ prototype ของแต่ละ Product แยก source และเครื่องมือให้ค้นงานง่าย โดยไม่ปนโค้ดทดลองกับ shared components

## โครงสร้าง

```text
cariva-design/                    # ชื่อ workspace; checkout บนเครื่องยังใช้ชื่อเดิมได้
├── design-system/                # React/shadcn Core, Product DS, tokens, docs, Storybook
├── products/<product-id>/
│   └── prototypes/<prototype-id>/ # หน้าจอ, cases, fixtures และ app ของ prototype
├── workspace/
│   └── canvas/                   # board และ frame catalogs
├── .agents/skills/               # canonical skills; skills/ เป็น compatibility link
├── rules/                        # กฎและ routing กลาง
├── legacy/mui/                   # frozen reference
├── sync/                         # sync tooling; canvas เป็น compatibility link
└── scripts/                      # peer bridge / Code Connect tooling
```

`shadcn/` เป็น compatibility link ไป `design-system/` ไม่ใช่ DS อีกชุดหนึ่ง และ `sync/canvas/` ชี้ไป `workspace/canvas/` เพื่อรักษา scripts/ลิงก์เดิม ไม่เปลี่ยนชื่อ Git remote หรือ checkout บนเครื่องโดยอัตโนมัติ

## เริ่มใช้งาน

- DS Storybook: `cd design-system && npm ci && npm run storybook` (ปัจจุบัน port 6006)
- ตัวอย่าง prototype ของ DS: `cd design-system && npm run prototype` (port 5173) ใช้ renderer ร่วมกับ Workspace/Prototype ใน Storybook ตัวอย่างนี้ไม่ใช่ Product prototype
- ดู [สารบัญ prototype](products/README.md) สำหรับงานจริง แยกคำสั่ง run, port, Figma และสถานะราย prototype
- อ่าน [create-project](.agents/skills/create-project/SKILL.md) ก่อนสร้างงานใหม่ และ [ขอบเขต workspace](rules/workspace-structure.md) ก่อนเลือกตำแหน่ง

## สั่งสร้าง prototype

```text
สร้าง prototype [ชื่อ] ของ Product [ชื่อ Product]
ใช้ workspace นี้ เก็บใน products/<product-id>/prototypes/<prototype-id>/
Figma: [ลิงก์ ถ้ามี — หรือให้ออกแบบจาก requirements]
```

ไม่ต้องแนบโฟลเดอร์ว่างแยกเสมอไป หากมีแอปอยู่แล้วให้ตรวจและ reuse ไม่ scaffold ทับ ยึดเจตนาผู้ใช้ร่วมกับ node ไม่ตัดสินจาก frame/component อย่างเดียว ต้องเข้าถึงดีไซน์ผ่านเครื่องมือที่ใช้ได้ แต่ไม่บังคับ Figma Desktop หรือ gh/login สำหรับงาน local การสร้าง remote repo, publish, push, deploy และเขียน Figma ต้องอยู่ในคำขอแยก

prototype ใหม่ทุก Product ใช้ React/shadcn, dev host แยก และเปิดใน Storybook ได้ พร้อม Canvas / Preview / เต็มหน้าโดยใช้ renderer และ cases ชุดเดียวกัน ไม่ติดตั้ง dependencies ของ Product ลง DS เพียงเพื่อรวม workspace

## กฎอ้างอิง

- [Workflow](design-system/rules/workflow-map.md)
- [Agent rules](design-system/rules/agent-rules.md)
- [Product setup](design-system/rules/product-setup-flow.md)
- [Figma component naming](design-system/docs/components/FIGMA-NAMING.md)

การจัด workspace นี้ไม่เริ่มเลข release และไม่ย้ายหรือ publish Git repository
