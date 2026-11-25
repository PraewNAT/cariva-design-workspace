# Active shadcn sizing / 24 พฤศจิกายน 2026

- Button size default = medium40: padding8 + label16/24 หรือ icon24; sm32 / lg48; outline เป็น inset ring ไม่กิน layout เพิ่ม ไม่มี fixed height บังคับ medium
- Input default40: text16/24 + padding8; หน้า Lab ขนาด medium48 ใช้ padding12; Select geometry เดียวกัน ไม่ใช้ fieldset/legend แบบ MUI
- Radius ตาม Product tokens เดิม carivaApp pill / backOffice12 ไม่แก้ per-screen; font ไม่ต่ำกว่า12
- Accordion trigger py12, label16/24 =48 ไม่มีไอคอน; borderรอบกล่องเพิ่ม2=50; ใน Card ไม่วาด borderซ้ำ เนื้อหายาวขยายตามจริง
- ปุ่มบนหน้าและ Dialog ใช้ Core Button recipe เดียวกัน ไม่ override font/padding/radius ใน Product CSS; icons ใช้ currentColor
- Keyboard/focus และ geometry ตรวจใน Core/Button, Core/Shadcn catalog และ Lab stories; mapping/API ต่างจาก MUI ดู SHADCN-MIGRATION.md

## ประวัติ MUI ก่อนเปลี่ยน runtime (ไม่ใช้เป็น implementation ปัจจุบัน)

# Accordion, Button และ Input — sizing ที่ใช้งานจริง

อัปเดต 24 พฤศจิกายน 2026 จาก Figma ไฟล์ `e9ypItGZbm2poUZLUQxu66` และ code contract เดิม ไม่เพิ่ม props หรือเปลี่ยน radius

## Accordion

อ้างอิง collapsed `4167:190` และ expanded `4167:188` ที่ความกว้าง 450px

- วาง vertical padding 12px บน–ล่างที่ trigger เพียงชั้นเดียว; outer root มี horizontal padding 12px และ bottom 12px เฉพาะเมื่อ expanded
- Trigger gap 16px, title 16px / line-height 24px, icon wrapper 38px และ chevron 24px
- Collapsed พร้อมไอคอน 62px; ไม่มีไอคอนและ title บรรทัดเดียว 48px ไม่ล็อกความสูงเพราะ title ยาวต้องขยายได้
- Expanded พร้อมไอคอนและ content บรรทัดเดียว 24px = 62 + gap 8 + content 24 + bottom 12 = 106px เนื้อหายาวขยายตามจริง
- ลูกศรลงเมื่อปิด ขึ้นเมื่อเปิด; keyboard Enter/Space เปิด–ปิดได้
- Consumer ไม่เพิ่ม padding กล่องซ้ำเพื่อครอบ Accordion และไม่ override trigger geometry เฉพาะหน้า กล่องมี border 1px จะเพิ่ม outer height 2px ตาม box model

## Button

อ้างอิง medium standard `3646:27999` / outlined `3646:28269` และ button-icon set `3730:5246`

- Medium สูง 40px จาก padding บน/ล่าง 8px + label 16px / line-height 24px หรือ icon 24px ไม่ใช้ fixed pixel height บังคับ medium
- Standard: horizontal padding 16px, gap 8px; icon-only: padding 8px รอบ icon 24px ได้ 40×40px
- ใช้กับ contained/outlined/text/elevated, loading, disabled, decorative และ split โดยใช้ existing variants เท่านั้น ไม่สร้าง contained neutral ที่ไม่มีใน contract
- Outline เป็น inside stroke ไม่เพิ่มขนาด layout; โค้ด medium วาดผ่าน pseudo-element เพื่อไม่ต้องใช้ padding 7px หรือล็อก height ให้ชดเชย border
- `buttonSizing.medium.height=40` เป็น expected geometry สำหรับผู้ใช้ scale และการตรวจ ไม่ใช่ fixed height ที่ medium ต้องใช้
- Small/large คง contract เดิม 32/48px งานนี้ไม่เปลี่ยน radius, semantic colors หรือ Product font-family
- หน้าหลักและ modal ต้องใช้ recipe เดียวกัน และตรวจ computed dimensions/font/padding จริง

## Input

อ้างอิง Field ของ standard input: medium `3760:6622` สูง 48px และ small `3760:6621` สูง 40px ไม่ใช่ความสูงรวม label/helper

- Small: font 16px / line-height 24px, vertical padding 8px, field 40px
- Medium: font 16px / line-height 24px, vertical padding 12px, field 48px
- ใช้ recipe เดียวกันกับ CrvInput และ CrvInputHorizontal รวม state focused/filled/disabled/error และ start adornment
- Label/helper แยกจาก field และอาจทำให้ component ทั้งก้อนสูงกว่า 40/48px ห้ามตัด label/helper เพื่อให้ทั้งก้อนสูงตามเลข field
- TextArea เป็นหลายบรรทัด ไม่ย่อให้เป็น 40px ตาม single-line input

## Verification

Storybook: Disclosure/CrvAccordion และ Experiments/Control sizing รวม page/modal consumers ใน BWC Lab Interpret มี regression geometry, long Thai/mobile และ keyboard; ผล audit อยู่ใน `reports/control-sizing-audit.md` ไม่ถือว่า spacing/color/font ทุกตัวใน Figma sync แล้ว

## Dropdown outline และสี icon ใน consumer

อัปเดตหลังพบภาพขอบถูกตัด: เมื่อ Dropdown ซ่อน legend ของ MUI ต้องวาง `.MuiOutlinedInput-notchedOutline` ที่ `top: 0` ภายใน field ไม่ปล่อยค่าเริ่มต้น top -5px คู่กับ overflow hidden ตรวจทั้ง default/focus/error/disabled โดยไม่เปลี่ยน radius หรือ props

CSS metadata ของหน้าให้จับเฉพาะ element ข้อความนั้น ไม่ใช้ selector เช่น `.lab-save-bar span` ที่ recolor icon wrapper ของ Button ไอคอนในปุ่มต้องสืบทอดสี semantic เดียวกับข้อความของ variant นั้น ตรวจ computed color ที่ svg ด้วย
