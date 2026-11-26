# Avatar: Figma → code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4648-15632). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


26 พฤศจิกายน 2026 · Core · React/shadcn Base UI · branch `praew`

Source: [Avatar page](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-9628), [Avatar set](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-10055). อ่าน design context และ screenshot ของชุดจริง ไม่ใช้ MUI snippets ที่ยังค้างใน Figma เป็น implementation contract.

## Mapping และ anatomy ที่ใช้จริง

| Figma | Code | สถานะ |
|---|---|---|
| `crv-avatar` / `4315:10055` | `src/lib/app/components/ui/avatar.tsx` → `Avatar` | แก้ implementation เดิม ไม่ rename Figma |
| `size=large / medium / small / xSmall` | `size="lg" / "default" / "sm" / "xs"` | คง API เดิม เพิ่ม `xs` |
| `variant=circular` | `rounded-full` ของ Avatar | ไม่มี variant prop ใหม่ |
| `content=image` | `AvatarImage` + `AvatarFallback` | รูปโหลดไม่ได้ใช้ fallback ของ Base UI |
| `content=text` / `initials` | children ของ `AvatarFallback` | ผู้เรียกส่ง initials เอง ไม่ตัดชื่อเต็มอัตโนมัติ |
| `content=icon` | icon เป็น children ของ `AvatarFallback` | SVG ใช้ขนาดตาม Avatar; รูป SVG ใน stories มี native dimensions ตรง Figma |
| `badge=true` | ประกอบ `AvatarBadge` | dot ออนไลน์ ไม่เพิ่ม boolean prop ที่ Root |
| `crv-avatar-group` / `4457:63950` | `AvatarGroup` + `AvatarGroupCount` | composition เดิม; ผู้เรียกเลือกจำนวนเอง ไม่มี `max` prop |

Code source เป็น authority ของ API/behavior; Figma เป็น visual target ในงานนี้. ตารางนี้เป็น mapping สำหรับอ้างอิง ไม่ใช่ Code Connect ที่ publish แล้ว. Figma ไม่มีการแก้ชื่อ property/component หรือเขียนกลับในงานนี้.

## Visual recipe

| Code size | Avatar | Initials size/line-height | Icon box |
|---|---|---|---|
| `lg` | 40×40px | 14/20px, weight 500 | 24×24px |
| `default` | 32×32px | 12/16px, weight 500 | 20×20px |
| `sm` | 24×24px | **12/16px**, weight 500 | 16×16px |
| `xs` | 20×20px | **12/16px**, weight 500 | 12×12px |

ผู้ใช้ยืนยันขั้นต่ำ 12px เมื่อ 26 พฤศจิกายน 2026: `sm/xs` ต่างจาก Figma ที่ยังเป็น 10px อย่างตั้งใจ. ใช้ fixed-size flex centering แทนการคัดลอก min-width/padding ที่ทำให้ fallback ยืดขนาด. ไม่ปรับ font ลงเพื่อยัดชื่อเต็ม; ให้ส่ง initials และวางชื่อเต็มข้าง Avatar. Fallback clip เนื้อหาที่เกินขอบเขตโดยคงขนาดเดิม.

- Font: `font-sans` ของ active theme; carivaApp/backOffice ใช้ IBM Plex Sans Thai. HosXP/Malila ยังไม่ได้ตรวจในงานนี้.
- Fallback background: `color/on-surface/sunken`; initials: `color/content/primary`; SVG icons: `color/content/secondary`.
- ไม่มี border overlay รอบ Avatar เดี่ยวตาม target. รูปใช้ object-cover และ rounded-full โดยไม่ clip badge.
- Badge เป็นกล่อง 12×12px รวมขอบ 2px สี `color/on-surface/default`, dot ด้านใน 8×8px สี `color/status/success/on-surface/default`.
- Badge `lg/default`: ขอบกล่องยื่นจากขวาและล่าง 2px. `sm/xs`: กล่องวางครึ่งหนึ่งนอกมุมขวาล่างตาม Figma (ใช้ 50% transform ของกล่อง 12px).
- Badge เป็นข้อมูลสถานะ ผู้เรียกต้องส่ง accessible label เช่น `aria-label="โอภาส ออนไลน์"` บน `Avatar role="img"` และใช้ `aria-hidden` บน dot เพื่อไม่ประกาศซ้ำ; ถ้าชื่อ/สถานะอยู่ข้างนอกแล้ว ใช้ decorative Avatar ได้.
- Avatar เองไม่ใช่ปุ่มและไม่เพิ่ม tab stop. ใช้ Button/trigger จริงเมื่อต้องมี action; ทดสอบการเปิด Dialog ด้วยคีย์บอร์ดและคืน focus หลัง Escape ใน stories.

## AvatarGroup และ consumers

Consumer จริงใน repo: `src/lib/features/board/presentation/components/CatalogFeedback.tsx` → `CoreCatalog`. ใช้ component เดิมโดยไม่มี per-page overrides. ตัวอย่าง Default เดิมยังใช้ story ID เดิม.

AvatarGroup คง overlap 8px และขอบ ring 2px เดิม. AvatarGroupCount ปรับให้ใช้ selected surface/secondary content และขนาด 40/32/24/20px ตาม Avatar ในกลุ่มเดียวกัน. ใช้ขนาดเดียวกันในหนึ่งกลุ่ม; ผู้เรียกคำนวณจำนวนเพิ่มเติมเอง. ไม่เพิ่ม business logic หรือ prop `max`.

**ยังไม่รับรอง group parity:** Figma group ใช้ overlap และความกว้างไม่สม่ำเสมอ เช่น medium max=2 ต่างจาก max=3–5 และบาง xSmall instances กว้าง 17/18px. งานนี้ปรับ Avatar เดี่ยวและตรวจกลุ่มเป็น affected consumer โดยคง group layout เดิม ไม่คัดลอกความผิดปกตินั้นเข้า Core.

## Stories, docs และ assets

- `Default`: กลุ่มตัวอย่างเดิมและ size control.
- `FigmaVariants`: 24 combinations (3 contents × 4 sizes × badge on/off), ตรวจขนาดจริง ภาพโหลดครบ icon geometry และ badge.
- `ImageFallback`: broken image และไม่มีรูปทุกขนาด, ตรวจข้อความอย่างน้อย 12px.
- `GroupSizes`: ทุกขนาดพร้อม count, ไม่มี max prop.
- `PageAndDialog`: เทียบ computed styles บนหน้าและ portal พร้อม keyboard/focus restoration.
- `MobileThai`: 320px, backOffice scope, ชื่อไทยยาวและข้อความขั้นต่ำ 12px.

Assets ใน `src/lib/app/components/ui/assets/avatar/` เป็น portrait PNG และ person SVG ทั้งเจ็ดไฟล์จาก design context. Stories อ้าง local imports; ไม่มี temporary Figma URL ใน runtime. ไม่แก้ path หรือ native dimensions ของ SVG. ภาพบุคคลเป็นตัวอย่างจาก Figma ไม่ใช่ข้อมูลผู้ใช้จริง.

Figma docs ที่ `4648:15632` ยังอ้าง 10px และ MUI ตามที่อ่านได้; **pending** เพราะงานนี้เป็น Figma → Code ไม่อนุญาต Figma write หรือ publication โดยอัตโนมัติ. Markdown/Storybook อธิบาย implemented contract และข้อยกเว้น 12px แล้ว.

ผลตรวจและข้อจำกัดล่าสุด: [AVATAR-AUDIT.md](AVATAR-AUDIT.md).

## เปลี่ยนชื่อชุดใน Figma (26 พ.ย. 2026, ผู้ใช้ยืนยันตามเสนอ)

| ชื่อใหม่ | ชื่อเดิม | instance ก่อน → หลัง |
|---|---|---|
| `avatar` (`size` lg / default / sm / xs) | `crv-avatar` | 193 → 193 |
| `avatar-group` (`size` lg / default / sm / xs, `max`) | `crv-avatar-group` | 10 → 10 |

`size` เดิม large / medium / small / xSmall เปลี่ยนเป็นค่าเดียวกับโค้ด `variant=circular` ค่าเดียวเดิมยังคงไว้ ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26` / `oldVariantNames_2026-11-26`
