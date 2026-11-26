# Card — Figma → Code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4713-2014). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


Draft · 26 พฤศจิกายน 2026 · Core · branch `praew` · ยังไม่ commit/publish

แหล่งออกแบบ: [Cariva Core Design System / Card](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4536-123342). อ่าน node จริงและ screenshot; ไม่ได้เขียนกลับ Figma.

## Mapping และขอบเขต

| Figma | Code เดิม | รูปแบบที่ตรวจ |
|---|---|---|
| `card-horizontal` 4570:20745 | `CardHorizontal` | `imagePosition` left/right/absolute; ขนาดอ้างอิง 420×190, min-height190, มุม16, content padding16 |
| `card-vertical` 4657:31022 | `CardVertical` | กว้าง330, padding16, มุม16, image3:2, actions1–2ปุ่มเรียงแถว gap16 |
| `card-small-horizontal` 4570:20655 | `CardSmallHorizontal` | 344×104 สำหรับข้อความสั้น, มุม12, padding12/16, image80×80 มุม8, action slot40×40 |
| `card-profile` 6550:55333 | `CardProfile` | subtle/white/outlined; 320×116 เมื่อมี avatar40 และรายละเอียด2ช่อง; padding12 มุม12 |
| `card-metric` 6557:330 | `CardMetric` | normal/abnormal; 90×56, padding8, มุม12, ไอคอนเตือน12 |

งานนี้แก้ compositions ใน `app/content-card.tsx` และ stories; ไม่เปลี่ยน primitive `ui/card.tsx`, Button, Badge หรือ Avatar กลาง. Card เดิมยังใช้ได้กับ catalog และ chart. ไม่พบ production consumer ของ compositions นอก stories ใน checkout ที่ตรวจ.

## API ที่โค้ดรองรับจริง

`CardVertical`, `CardHorizontal`, `CardSmallHorizontal` รับ `title` (จำเป็น), `description`, `image`, `tag`, `actions`, `className` และ div props. Slots เป็น ReactNode ของผู้เรียก; ไม่สร้างรูป ปุ่ม หรือข้อมูลธุรกิจให้อัตโนมัติ. ไม่ใส่ slot = ซ่อนส่วนนั้น. ยังไม่มี boolean props `showImg`/`showTag`/`showDescription` ตาม Figma เพราะใช้ composition API เดิม.

- `CardHorizontal` เพิ่ม `topMessage?: ReactNode`; `imagePosition` รับ left/right/absolute. ค่าเริ่มต้นโค้ดยังคง `left` เพื่อรักษา API เดิม ต่างจาก Figma default ที่เป็น right; ตั้ง `imagePosition="right"` เมื่อต้องการรูปแบบนั้น.
- ภาพ left/right กว้างสูงสุด178px (42.381% ของ card), ส่วน absolute สูงเต็ม card กว้างสูงสุด183px (43.5714%) วางซ้อนด้านขวาหลังเนื้อหา. เนื้อหาด้านบนเผื่อพื้นที่ภาพ ปุ่มอยู่ชั้นบนเต็มความกว้าง. **absolute ไม่ได้เรียงภาพแนวตั้ง**.
- `CardVertical` actions เป็น children ของ flex row: 1ปุ่มเต็มแถว, 2ปุ่มแบ่งเท่ากันและ gap16. Figma ใช้ Button sm32px; ผู้เรียกส่ง Button จริง. ไม่มี prop `button="1"|"2"` ในโค้ด.
- `CardSmallHorizontal` ใช้ `image` เป็นช่องซ้าย80px และ `actions` เป็นช่องขวา40px. กลุ่ม tag กับ title/description มี gap8; ไม่มีการ truncate title/description ใน recipe นี้.
- Card ทั้งสามมีความกว้างอ้างอิงและ `max-width:100%`; ความสูงเพิ่มได้เมื่อข้อความยาว. ไม่ซ่อนข้อมูลด้วย fixed height เพื่อบังคับขนาดสเปกข้อความสั้น.
- `CardProfile` รับ `avatar`, `name` (จำเป็น), `identifier`, `details: {label,value}[]`, `style="subtle"|"white"|"outlined"`. ความกว้างปกติ320px มี max-width100% ให้ย่อตามพื้นที่. `style` เป็น visual variant เดิม ไม่ใช่ inline CSS. ชื่อ/identifier ยัง truncate ตาม contract เดิม. ไม่มีการตัดสินตัวตนหรือข้อมูลส่วนบุคคลใน Core.
- `CardMetric` รับ `label`, `value` (จำเป็น), `unit`, `status="normal"|"abnormal"`; ค่า0แสดงตามปกติ. การตัดสิน abnormal ต้องทำภายนอก component ไม่มี threshold หรือ logic ทางการแพทย์ใน component.

## Typography และ tokens

Title20/28 SemiBold600; description14/20 Regular; topMessage12/16 Regular. Profile name16/24 SemiBold, identifier12/16 Regular, detail label12/16 Medium, value14/20 Medium. Metric label/unit12/16 Medium, value14/20 Medium. Browser ที่ตรวจใช้ IBM Plex Sans Thai; ทั้งสาม content recipes กำหนด `--font-ui` โดยตรง. ไม่ render text ต่ำกว่า12px.

Figma binding ที่อ่านจริง: abnormal fill `color/status/error/on-surface/subtle` และ value `color/status/error/content/default` (generated context เรียกชื่อ success ผิด แต่ค่าจริงเป็น error). Unit ใน Figma ใช้ `color/content/disabled`; ผู้ใช้อนุมัติให้โค้ดเปลี่ยนเฉพาะ Unit เป็น `content/secondary` เพื่อแก้ contrast จึงเป็นข้อแตกต่างที่ตกลงแล้ว. Profile subtle และ Metric normal ใช้ `--cds-bg-subtle` #f1f5f9 ตาม Figma โดยไม่เปลี่ยน token กลาง. Tag ใช้ Badge standard success เดิมและ override paddingข้าง8เฉพาะ Card ตามที่ผู้ใช้อนุมัติ ไม่เปลี่ยน Badge กลาง.

## ตัวอย่างจริง

```tsx
<CardHorizontal
  image={<img src={imageUrl} alt="คำอธิบายภาพ" />}
  imagePosition="absolute"
  tag="ใหม่"
  topMessage="อัปเดตล่าสุด"
  title="หัวข้อ"
  description="คำอธิบาย"
  actions={<Button size="sm">ดูรายละเอียด</Button>}
/>
<CardVertical
  title="หัวข้อ"
  actions={<><Button size="sm" variant="outline">ยกเลิก</Button><Button size="sm">ยืนยัน</Button></>}
/>
```

Placeholder checkerboard และ avatar ใน stories เป็น asset export เดิมจาก Figma ใน `app/assets/card/`; ใช้เพื่อเทียบ slot geometry ไม่ใช่ข้อมูล Product จริง. Arrow16 ใช้เฉพาะปุ่ม Horizontal; Small Horizontal ใช้ icon button Core เป็นตัวอย่าง dynamic action slot. Metric ใช้ WarningRounded12 เดิมจาก Figma. ไม่ใช้ temporary asset URLs ใน runtime.

## Verification และข้อจำกัด

Storybook: **Core → Components → Card** (รวม primitive และ compositions ใน Docs เดียว). Stories: Default, Vertical, VerticalTwoActions, Horizontal, SmallHorizontal, Profile, Metric, OptionalContent, LongThai, PageAndDialog. รวม10storiesใน `ui/card.stories.tsx`; ลิงก์เดิมใน Patterns เปลี่ยนมาใช้ `core-components-card--*`. ข้อมูล audit ก่อนจัดหมวดยังคงอ้าง IDs ณ เวลาที่ตรวจ. Render เทียบ page/portal, ข้อความไทยยาว, slotsว่าง และ keyboard/focus; รายละเอียด/ข้อค้างใน `CARD-AUDIT.md`.

แก้ครบตามคำยืนยัน: พื้น subtle Profile/Metric, Unit content/secondary, Tag padding8 และ Profile max-width100%. Profile story ตรวจเพิ่มในกรอบ240px; mobile320px ทั้งหน้าและ Dialog ไม่ล้นแนวนอน. Testsผ่าน12stories รวม Card เดิม/Chart/catalog; build/migration, tokens, Storybookbuild, coverage39/39 และ focused lint ผ่าน. Browserตรวจ keyboard Enter, focus trap และ Escapeคืนfocus.

ผู้ใช้ให้คงสี Metric abnormal ที่ contrast4.41:1 และบันทึกข้อค้าง; Button primary3.50:1 เป็นข้อค้างกลางที่เคยรายงาน ไม่แก้ token กลาง. ผล test ผ่านการรันไม่ได้แปลว่า AA หรือ pixel parity ผ่านทั้งหมด.
