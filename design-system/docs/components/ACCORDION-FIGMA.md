# Accordion — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Accordion](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4166-93) (หน้า Accordion ไฟล์ Cariva Core Design System) ขอบเขต: component set `accordion-item` (เดิมชื่อ `crv-accordion-standard`) 2 variants (`expanded` = false / true) เปลี่ยนชื่อชุดและ layer `Frame 1` เป็น `AccordionIcon` แล้ว (instance 5 ตัวยังเชื่อมครบ) ชื่อเดิมสำรองไว้ใน plugin data (`oldName_2026-11-26`, `oldLayerNames_2026-11-26`)

## Anatomy

หนึ่ง item คือการ์ดหนึ่งใบ: padding 16, gap 16, ขอบ 1px (`border/default`), มุมโค้ง `radius/12`, พื้น `on-surface/elevated`

- **AccordionTrigger** (แถว gap 16): กล่องไอคอน 40×40 (`AccordionIcon` พื้น `on-surface/subtle` มุมโค้ง 12 ไอคอน 20px สี `content/secondary`) + `Title` (16/24 SemiBold `content/primary`) + ช่องว่างยืดได้ + ลูกศร 20px (`content/secondary`) ลูกศรขึ้นเมื่อเปิด
- **Content** (เมื่อ `expanded=true`): เยื้อง 56px (กล่องไอคอน 40 + gap 16) ข้อความ 14/20 Regular `content/secondary`
- ตัวอย่างใน Figma วางการ์ด 3 ใบห่างกัน 16px

## Properties ใน Figma

| property | ชนิด | หมายเหตุ |
|---|---|---|
| `expanded` | variant false / true | เฉพาะ Figma โค้ดคุมด้วย `value` ของ Accordion (Base UI) |
| `showIcon` | boolean (true) | เฉพาะ Figma โค้ดแสดงกล่องไอคอนเมื่อส่ง prop `icon` |
| `icon` | instance swap | ตรงกับ prop `icon` ของ `AccordionTrigger` |
| `title` | text | เนื้อหา (children) ของ `AccordionTrigger` |
| `content` | text | เนื้อหา (children) ของ `AccordionContent` |
| `showBadge` | boolean (true) | **ไม่มีป้ายอยู่ในดีไซน์และเอกสารไม่พูดถึง** น่าจะเป็นของเหลือ ยังไม่ได้ลบ รอผู้ใช้ตัดสินใจ |

ไม่มี variant สำหรับ hover, focus หรือ disabled ใน Figma จึงไม่ได้กำหนดในเอกสารนี้

## โค้ด

แหล่ง: `src/lib/app/components/ui/accordion.tsx` ประกอบด้วย `Accordion` (แถวการ์ด gap 16) → `AccordionItem` (การ์ด) → `AccordionTrigger` (`icon` เป็น optional) + `AccordionContent` (เยื้อง 56px อัตโนมัติเมื่อ item มี icon)

| เรื่อง | Figma | โค้ด | สถานะ |
|---|---|---|---|
| โครงรวม | การ์ดแยกใบ ห่าง 16 | `Accordion` เป็นแถว gap-4 ไม่มีกรอบรวม | ตรง (วัดแล้ว) |
| การ์ด | padding 16, ขอบ 1px, มุมโค้ง 12 | วัดได้ 16 / 1px / 12px | ตรง (วัดแล้ว) |
| หัวข้อ | 16/24 SemiBold | 16px / 24px / 600 | ตรง (วัดแล้ว) |
| กล่องไอคอน, ลูกศร | 40×40, 20px | 40 และ 20 | ตรง (วัดแล้ว) |
| ข้อความด้านล่าง | 14/20, เยื้อง 56, ห่างหัวข้อ 16 | 14px / 20px / pl 56 / pt 16 | ตรง (วัดแล้ว) |
| สี (พื้นการ์ด, ขอบ, หัวข้อ, กล่องไอคอน, ลูกศร, ข้อความ) | ผูก semantic variables | ผูก `--cds-*` วัดแล้วตรงกับค่า token | ตรง (วัดแล้ว) |
| ตอนชี้เมาส์ | ไม่มีกำหนด | ตัดเส้นใต้เดิมออก | ตัดสินใจโดยผู้ใช้ |

**ไอคอน (แก้ 26 พ.ย.):** ไอคอนใน Figma เป็นชุด Material (SettingsRounded, LockOutlined, HelpOutlineRounded และลูกศร rounded แบบทึบ) โค้ดเดิมใช้ไอคอนเส้นของ hugeicons จึงหน้าตาไม่ตรง เปลี่ยนเป็นไอคอนเดียวกับ Figma (คัดลอกเส้นจาก Figma ไว้ใน `src/lib/app/components/app/icons.tsx`) ลูกศรเป็นตัวเดียวหมุน 180° เมื่อเปิด

**สีไอคอนและข้อความรอง (ปิดแล้ว 26 พ.ย.):** เดิม component Accordion ใน Figma ผูกสีกับ **ตัวแปรของ library ภายนอก** (remote) ซึ่ง `color/content/secondary` = Slate 700 (`#334155`) ขณะที่ตัวแปรในไฟล์นี้และ `tokens.json` ตอนนั้น = Slate 500 (`#64748b`) ผู้ใช้สั่งให้ผูกใหม่ ผูก 24 จุดในหน้า Accordion (ใน component set `accordion-item` และ node ปกติ) จากตัวแปร library เป็นตัวแปรในไฟล์ชื่อเดียวกัน ตรวจแล้วค่าตรงกับโค้ด instance ตัวอย่างรับค่าตามอัตโนมัติ **หมายเหตุ:** ตอนนั้นตัวแปรในไฟล์เป็น Slate 500 แต่ผู้ใช้ยืนยันว่าข้อความรองต้องเป็น **Slate 700** จึงเปลี่ยนตัวแปร `color/content/secondary` ในไฟล์กลับเป็น Slate 700 (`#334155`) แล้ว ตอนนี้ไอคอนกล่อง ลูกศร และข้อความด้านล่างเป็น `#334155` ทั้ง Figma และโค้ด ค่าเดิมสำรองไว้ใน plugin data ของไฟล์ (`contentSecondaryBackup_2026-11-26`) การผูกเดิมสำรองไว้ใน plugin data ของหน้า Accordion (`rebindBackup_2026-11-26`)

**ที่ยังผูก library อยู่ในหน้า Accordion (21 จุด ไม่ได้แก้):** ตัวแปรที่ไม่มีชื่อเดียวกันในไฟล์นี้ (`background`, `foreground`, `border`, `primary`, `muted-foreground` เป็นชื่อแบบ shadcn UI kit) อยู่ในกรอบเอกสารและ layer ช่วย (`.Utility / Title`, section) และ `color/content/secondary` อีก 2 จุดนอก component ผมไม่เดาว่าตัวแปรเหล่านี้ตรงกับตัวไหนของเรา จึงปล่อยไว้ ไม่กระทบ component

**ข้อสังเกต:** โค้ดเดิมใช้ `rounded-xl` ซึ่งในธีมนี้คือ 24px ไม่ใช่ 12px ตาม Figma แก้เป็น `rounded-md` (12px) แล้ว การ์ดเดิมที่เป็นกล่องรวมกับเส้นคั่นเปลี่ยนเป็นการ์ดแยกใบ และเพิ่ม focus ring (เดิมไม่มี)

**ยังไม่ได้ตรวจ:** hover/focus เทียบ Figma (ไม่มีให้เทียบ), contrast ของข้อความรอง (`content/secondary` เป็น Slate 700 บนพื้นขาว ประมาณ 10:1), การแสดงผลเมื่อไม่มี icon (ไม่มีเยื้อง) ใน Figma ยังไม่เห็นตัวอย่างเคส `showIcon=false`
