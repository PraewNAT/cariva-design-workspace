# Button — Figma specification

ตรวจจาก Figma วันที่ 26 พฤศจิกายน 2026: [Button](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3646-28000) (ไฟล์ Cariva Core Design System; ตอนแรกอ่านจากไฟล์ "[Shadcn]" เดิม ค่าที่ใช้เทียบเหมือนกัน)

ขอบเขต: `crv-button-standard` จำนวน 120 variants; ไม่รวม icon/loading/link/decorative ที่เป็น component set แยกกัน (mic และ split ทำแล้ว ดู [BUTTON-MIC-FIGMA.md](BUTTON-MIC-FIGMA.md), [BUTTON-SPLIT-FIGMA.md](BUTTON-SPLIT-FIGMA.md)) เอกสารนี้บันทึก Figma ที่อ่านจริง ไม่รับรองว่าโค้ด sync แล้ว

## Anatomy และ properties

Label (`children`), startIcon และ endIcon แบบ instance swap พร้อม Boolean startIconVisible/endIconVisible ค่าเริ่มต้น true ทั้งคู่

| Property | ตัวเลือกที่พบ |
|---|---|
| variant | default (เดิม contained), outline (เดิม outlined), ghost (เดิม text), elevated |
| color | primary, destructive (เดิม error), secondary (เดิม neutral) |
| state | default, hover, pressed, disabled |
| size | sm (เดิม small), default (เดิม medium), lg (เดิม large) |

ค่าข้างต้นไม่ใช่ทุก combination ที่มีจริง: 120 variants จาก 144 combinations ที่เป็นไปได้ ใช้ variant ที่มีอยู่ ไม่สร้าง prop เพิ่มเพียงเพื่อทำ mapping

เปลี่ยนชื่อค่าใน Figma เมื่อ 26 พฤศจิกายน 2026 (120 variants, ชุดเปลี่ยนชื่อเป็น `button`, instance 313 ตัวยังเชื่อมครบ) ชื่อเดิมสำรองไว้ใน plugin data ของ component set (`oldNames_2026-11-26`) หน้าตาไม่เปลี่ยน

## ขนาด

| Size | สูง | Font / line-height | Padding บนล่าง / ซ้ายขวา | Gap |
|---|---|---|---|---|
| small | 32px | 12 / 16px | 8 / 12px | 4px |
| medium | 40px | 16 / 24px | 8 / 16px | 8px |
| large | 48px | 16 / 24px | 12 / 24px | 12px |

IBM Plex Sans Thai Medium; radius 9999 (pill); opacity ของ node 100% ทุก recipe ที่อ่าน ความกว้างตัวอย่าง 94/136/160px ไม่ใช่ fixed width contract

## สีและ states

อ้าง semantic variables ที่ bind อยู่ ไม่ hardcode จากค่า hex ต่อไปนี้ซึ่งเป็นเพียงค่าที่สังเกตในไฟล์

- Contained primary: default #1789FA, hover #0F70E6, pressed #135ABA; label ขาว
- Contained error: default #DC2626, hover #B91C1C, pressed #991B1B; label ขาว
- Outlined primary: default ไม่มี fill, stroke #2DA4FF, label #1789FA; hover fill #EEF9FF, pressed #D8F0FF
- Text primary: ไม่มี stroke; hover/pressed ใช้พื้นอ่อนตาม state
- Outlined neutral: stroke #CBD5E1, label #0F172A; hover #F8FAFC, pressed #F1F5F9
- Elevated primary/neutral: default fill ขาว; pressed #E2E8F0 เอกสารนี้ยังไม่ลงรายละเอียด effect/shadow
- Disabled: label #94A3B8; contained/outlined/elevated fill #F1F5F9 และไม่มี stroke ส่วน text ไม่มี fill ไม่ใช่ลด opacity ของทั้ง component

สีต้องแยกตาม variant/color/state; ห้ามใช้ primary กับ neutral แทนกันเพราะเห็นว่าเป็น outline เหมือนกัน

## โค้ดปัจจุบันและข้อแตกต่าง (อัปเดต 26 พฤศจิกายน 2026 หลังแก้โค้ด)

แหล่ง implementation: `src/lib/app/components/ui/button.tsx`; เอกสารโค้ด: `ButtonSource.mdx`; ตารางชื่อ: `FIGMA-NAMING.md`

| เรื่อง | Figma | โค้ด | สถานะ |
|---|---|---|---|
| ขนาด sm / default / lg | สูง 32 / 40 / 48, font 12/16 / 16/24 / 16/24, padding 8/12 / 8/16 / 12/24, gap 4 / 8 / 12 | วัดใน Storybook ได้ค่าเดียวกันทุกตัว | ตรง (วัดแล้ว) |
| variant × color | default, outline, ghost × primary, destructive, secondary | prop `variant` และ `color` ชื่อเดียวกัน | ตรง ยกเว้น elevated |
| สี contained primary/destructive, outline ring ทั้ง 3 color, ghost text, disabled | ผูก semantic variables | ผูก `--cds-*` ที่ generate จาก tokens.json วัดสี default แล้วตรง และ hover ของ contained primary ตรง (#0F70E6) | ตรง (วัดเท่าที่ระบุ) |
| Disabled | semantic colors, opacity 100% | ใช้สีตาม Figma และ opacity 1 สำหรับ default/outline/ghost | ตรง |
| Radius | pill | `--button-radius` = full ในธีม carivaApp วัดได้ 9999px | ตรง ใน carivaApp |
| elevated | มี พร้อมเงา `shadow/sm` (hover `shadow/xl`, pressed `shadow/md`, disabled ไม่มี) | `variant="elevated"` + `color` primary / secondary (26 พ.ย. 2026) | พื้นขาว (pressed `on-surface/action/pressed`) ตัวอักษร primary `brand/primary/content/default` (pressed `…/strong`) หรือ secondary `neutral/content/default` เงาใช้ `--cds-shadow-*`; วัดแล้ว: พื้นขาว สีตัวอักษร เงาปกติ disabled ไม่มีเงา; เงา hover วัดด้วยเมาส์จริงในเบราว์เซอร์ตรง `shadow/xl`; เงา pressed และสีตอน pressed **ยังไม่ได้วัด** |
| contained + neutral | มีเฉพาะในชุด `button-icon` (พื้น `neutral/on-surface/default`) | `variant="default" color="secondary"` ใช้สี neutral ตาม Figma (เดิมใช้ลุค `secondary` ของ shadcn) | ตรง (วัดแล้ว 26 พ.ย.) |
| loading, icon, link, decorative | component set แยก (`button-loading`, `button-icon`, `button-link`, `button-decorative`) | ดู [BUTTON-SETS-FIGMA.md](BUTTON-SETS-FIGMA.md) | ตรง (วัดแล้ว 26 พ.ย.) |

ที่ยังไม่ได้วัด: hover/pressed ของ outline และ ghost ทุก color, pressed ทุกแบบ, ขนาดไอคอนของชุด icon ผลกระทบต่อ component อื่น: เส้นขอบ outline เปลี่ยนจากเทาเป็นสีตาม color และขนาด sm เปลี่ยน ใช้ใน dialog, toast, calendar, combobox, sheet, sidebar ส่วน ghost ที่ใช้เป็นปุ่มทั่วไปตั้ง `color="secondary"` ไว้เพื่อคงสีตัวหนังสือเป็นกลาง

## สิ่งที่ยังต้องตรวจ

Focus-visible/keyboard, accessible name สำหรับ icon-only, contrast ราย state, behavior ระหว่าง loading และเงา pressed ของ elevated ยังไม่ได้รับรองจากการอ่านนี้ Figma states ไม่พิสูจน์ runtime behavior โค้ดใช้ disabled + aria-busy + Spinner สำหรับ loading ตามเอกสาร implementation

เมื่อ component เปลี่ยน ให้อ่าน source ล่าสุด เปรียบเทียบเอกสารนี้และ ButtonSource.mdx แล้วอัปเดตเฉพาะ facts ที่ยืนยัน ตรวจ parity ก่อนสรุปว่า sync แล้ว
