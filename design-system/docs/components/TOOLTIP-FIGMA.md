# Tooltip — Core (Draft, 2026-11-26)

Source page `4167:286`: Standard set `4167:398` has five arrow-edge placements; With Action set `4167:3485` has eight. The existing [Core documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4716-60403) now uses Document Template `4537:130394` / Blocks `4537:130684`, with all13 linked specimens. Mira is documented separately.

Standard uses `ui/tooltip.tsx`: Tooltip, TooltipTrigger, TooltipContent and TooltipProvider. Content supports Base UI popup props plus side, align, offsets and showArrow. The default offset is8px; body padding4/8px, radius4px, UI12/16px Medium, content/inverse on content/primary. Arrow uses the original12x6 SVG; none uses showArrow=false. Side names describe popup side; legacy Figma placement names describe arrow edge (Figma top maps to side bottom). Positioning may flip at viewport edges.

Tooltip wrapper explicitly connects open content to trigger using a generated id, role=tooltip and aria-describedby. Hover/focus/Escape and collision handling remain Base UI behavior. Disabled native buttons should be wrapped in a focusable explanatory trigger when help is needed; do not place interactive actions inside text-only tooltips.

`app/tooltip-with-action.tsx` composes Core Popover, Button and Badge. Props: trigger, children, step, placement, onBack/onNext, backDisabled/nextDisabled, open/defaultOpen/onOpenChange, label. Placement follows Figma arrow edge (top/bottom/start/end/left/right), converted to popup side internally. Width240px with viewport max-width; body min112px with padding12/16, footer min56px with padding12/8; radius16. Long text grows vertically. Step uses primary/muted and secondary text. Back/Next reuse sm Buttons. The caller owns step progression; no tour engine or business flow is implied. Popover dialog semantics allow keyboard access to buttons and Escape returns focus.

Standard entry/exit uses180ms opacity/2px transform with reduced-motion override and instant focus handling. Mira-specific messages, balances, dates and credit rules live in `lib/products/mira`, never imported by Core. Core has nine stories (รวม `FigmaSpecs`); Mira has six under its own Product group.

Figma/UI font observed: IBM Plex Sans Thai. Main component property APIs and variant geometry remain unchanged. Template containers alone were detached; actual specimens retain links. Core docs text and all specimens meet12px minimum. Known contrast: shared primary guide buttons still fail normal-text AA (about3.2–3.5:1); source color is retained and the gap is recorded in TOOLTIP-AUDIT.md.

## ชุดใน Figma (เปลี่ยนชื่อแล้ว 26 พ.ย. 2026 ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | instance (ก่อน → หลัง) |
|---|---|---|
| `tooltip` (`placement` top / bottom / left / right / none = ขอบที่ลูกศรอยู่) | `crv-tooltip-standard` | 5 → 5 |
| `tooltip-with-action` (`placement` 8 แบบ, text `step`, `content`) | `crv-tooltip-with-action` | 8 → 8 |
| `credit-tooltip` (`status`, `placement`, `balance`, `validUntil`, `costHintVisible`) | `mira-tooltip-credit` | 9 → 9 |

ชื่อ prop และค่าของตัวแปรไม่เปลี่ยน (ตรงกับโค้ดอยู่แล้ว ยกเว้น `Tooltip` ที่โค้ดใช้ `side` ของ Base UI: Figma `top` = `side=bottom`) ผูกสีทุกจุดในชุดกับตัวแปรในไฟล์อยู่แล้ว ที่ผูก library เก่าอยู่ในหัวหน้า (`_Block Header`) และไอคอนติ๊กของกรอบ doc เท่านั้น ไม่ได้แตะ

## ที่แก้ในรอบเปลี่ยนชื่อ (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| พื้นและลูกศร tooltip ผูก `on-surface/invert` (เดิม `content-primary` สีเดียวกัน), พื้นส่วนปุ่มของ guide ผูก `on-surface/sunken` | ตรง (วัดใน story `FigmaSpecs`) |
| ไอคอน Back = `ArrowBackRounded`, Next = `ChevronRightRounded` (คัดลอกจาก Figma) | ตรง (ดูภาพ) |
| tooltip สูง 24 padding 4/8 มุม 4 ตัวอักษร 12/16 Medium พื้น `#0F172A` ตัวอักษรขาว | ตรง (วัดแล้ว) |
| guide กว้าง 240 สูง 168 มุม 16 ส่วนเนื้อหา 112 (padding 12/16) ส่วนปุ่ม 56 (padding 12/8) ปุ่ม 32 สูง | ตรง (วัดแล้ว; ความกว้างปุ่ม Back ต่าง Figma ไม่เกิน 1px จากฟอนต์) |
| credit-tooltip: สูง 60 / 82 / 82 กว้าง 208 (placement none), cost-hint 10px `#94A3B8`, ช่องว่าง 2, ข้อความ low `#D97706`, depleted `#DC2626` | ตรง (วัดแล้ว) |

**ตัดสินใจโดย Claude / ผู้ใช้ยืนยัน:** คง prop `side` ของ `Tooltip` ไม่เพิ่ม `placement` (ผู้ใช้ยืนยันตามเสนอ) · credit-tooltip กลับเป็นค่าตาม Figma ทำให้ cost-hint เล็กกว่า 12px (Figma wins)

**ผลกระทบ:** credit tooltip: cost-hint เล็กลงจาก 12px เป็น 10px, ช่องว่างแคบลง 4 → 2px, ข้อความ depleted เปลี่ยนจาก `#EF4444` เป็น `#DC2626` · ปุ่ม Back/Next ของ guide เปลี่ยนรูปไอคอน

**ยังไม่ได้วัด:** สี hover/pressed ของปุ่มใน guide (ใช้ Button ที่วัดแล้วในหน้า Button), ตำแหน่งลูกศรของ guide ทั้ง 8 ฝั่งเทียบพิกเซล (ตรวจด้วยสายตาใน `ActionPlacements`)
