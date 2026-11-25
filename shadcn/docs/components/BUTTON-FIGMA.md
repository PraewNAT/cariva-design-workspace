# Button — Figma specification

ตรวจจาก Figma วันที่ 26 พฤศจิกายน 2026: [Button](https://www.figma.com/design/e9ypItGZbm2poUZLUQxu66?node-id=3646-28000)

ขอบเขต: `crv-button-standard` จำนวน 120 variants; ไม่รวม icon/loading/link/decorative/mic/split ที่เป็น component set แยกกัน เอกสารนี้บันทึก Figma ที่อ่านจริง ไม่รับรองว่าโค้ด sync แล้ว

## Anatomy และ properties

Label (`children`), startIcon และ endIcon แบบ instance swap พร้อม Boolean startIconVisible/endIconVisible ค่าเริ่มต้น true ทั้งคู่

| Property | ตัวเลือกที่พบ |
|---|---|
| variant | contained, outlined, text, elevated |
| color | primary, error, neutral |
| state | default, hover, pressed, disabled |
| size | small, medium, large |

ค่าข้างต้นไม่ใช่ทุก combination ที่มีจริง: 120 variants จาก 144 combinations ที่เป็นไปได้ ใช้ variant ที่มีอยู่ ไม่สร้าง prop เพิ่มเพียงเพื่อทำ mapping

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

## โค้ดปัจจุบันและข้อแตกต่าง

แหล่ง implementation: `src/lib/app/components/ui/button.tsx`; เอกสารโค้ดปัจจุบัน: `ButtonSource.mdx`

| เรื่อง | Figma | โค้ดที่ตรวจ |
|---|---|---|
| Small typography/padding | 12/16, py8 | 14/24, py4 |
| Small gap | 4 | 8 |
| Large gap | 12 | 8 |
| Disabled | semantic colors, opacity100% | opacity50% |
| Properties | variant + color + state แยก | variant แบบ default/outline/secondary/ghost/destructive/link/decorative |
| Radius | pill ใน set นี้ | ตาม Product theme |

Medium geometry ตรงกันที่ 40px, 16/24, py8 px16 gap8 แต่ไม่ได้แปลว่าสีและทุก state ตรงกัน ไม่มี mapping แบบหนึ่งต่อหนึ่งที่รับรองแล้ว ห้ามแก้ public API โดยเดา

## สิ่งที่ยังต้องตรวจ

Focus-visible/keyboard, accessible name สำหรับ icon-only, contrast ราย state, behavior ระหว่าง loading และ shadow ของ elevated ยังไม่ได้รับรองจากการอ่านนี้ Figma states ไม่พิสูจน์ runtime behavior โค้ดใช้ disabled + aria-busy + Spinner สำหรับ loading ตามเอกสาร implementation

เมื่อ component เปลี่ยน ให้อ่าน source ล่าสุด เปรียบเทียบเอกสารนี้และ ButtonSource.mdx แล้วอัปเดตเฉพาะ facts ที่ยืนยัน ตรวจ parity ก่อนสรุปว่า sync แล้ว
