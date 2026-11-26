# Button Mic — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: ชุด `button-mic` (เดิม `crv-button-mic`, node `5862:33778`, หน้า Button ในไฟล์ Cariva Core Design System) ผู้ใช้ยืนยันชื่อและ API ตามที่ Claude เสนอ เอกสารการใช้งานอยู่ในกรอบ `Button Doc (Template)` ของหน้า Button (ส่วน mic: ใช้เลือกอุปกรณ์เสียงเท่านั้น ไม่ใช่ปุ่มอัด)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26` / `oldVariantNames_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | prop ที่เปลี่ยน | instance ก่อน → หลัง |
|---|---|---|---|
| `button-mic` | `crv-button-mic` | `status` active / `deactive` → active / `inactive` | 1 → 1 |

prop อื่นคงเดิม: `variant` wave / dot, `state` default / hover / pressed

## สเปก (อ่านจากตัวแปรใน Figma)

- กว้าง 200 สูง 32 มุม 12 padding 8 gap 4 พื้นโปร่งใส ข้อความ 12/16 Medium `content/secondary`
- ลำดับ: ตัวบอกสถานะ → ไอคอนไมค์ 16 → ชื่ออุปกรณ์ (ตัดด้วย …) → ลูกศรลง 16
- `variant=wave`: คลื่นเสียง 28×16 แท่ง 5 อัน กว้าง 4 gap 2 มุมกลม · active สูง 8 / 12 / 16 / 12 / 8 สี `status/active/on-surface/default` · inactive สูง 8 ทุกแท่ง สี `status/error/on-surface/default`
- `variant=dot`: กล่อง 16×16 มีจุดกลม 8 · active สีเขียว inactive สีแดง (ตัวแปรเดียวกับ wave)
- hover: พื้น `on-surface/action/hover` · pressed: พื้น `on-surface/action/pressed`

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `button-mic` | `ButtonMic` (`app/button-mic.tsx`) เป็น `<button>` |
| `variant` | `variant`: `wave` / `dot` |
| `status` | `status`: `active` / `inactive` |
| ชื่ออุปกรณ์ | `label` |
| `state=hover / pressed` | CSS (`hover:` / `active:`) |
| ไอคอนไมค์ | `MicNoneRounded` (คัดลอกจาก Figma ไว้ใน `app/icons.tsx`) |

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| กว้าง 200 สูง 32 มุม 12 padding 8 gap 4, ข้อความ 12/16 Medium `#334155` | ตรง (วัดใน story `FigmaSpecs`) |
| wave: กรอบ 28×16, แท่งกว้าง 4 สูง 8/12/16/12/8 (active) และ 8 ทั้งหมด (inactive), สีเขียว `#4ADE80` / แดง `#DC2626` | ตรง (วัดแล้ว) |
| dot: กรอบ 16×16 จุด 8 สีตามสถานะ | ตรง (วัดแล้ว) |
| hover `#F1F5F9` | ตรง (วัดในเบราว์เซอร์ด้วยเมาส์จริง) |
| ภาพรวมเทียบ Figma (4 แบบ) | ตรวจด้วยสายตา (ตรง) |
| focus ด้วยคีย์บอร์ด | ตรวจใน story `Default` |

**ตัดสินใจโดย Claude / ผู้ใช้ยืนยัน:** `deactive` เปลี่ยนเป็น `inactive` · คลื่นเสียงเป็นภาพนิ่งตาม Figma ไม่มีแอนิเมชันและไม่อ่านระดับเสียงจริง ผู้เรียกส่ง `status` และ `label` เอง ไม่มีโค้ดเลือกอุปกรณ์หรืออัดเสียง

**ผลกระทบ:** เป็น component ใหม่ ไม่กระทบโค้ดเดิม · instance 1 ตัวใน Figma ยังอยู่

**ยังไม่ได้วัด:** สี pressed `#E2E8F0` (ตั้งตาม token), การแสดงเมื่อชื่ออุปกรณ์ยาวมากนอกจากตัดด้วย …, ปุ่มไม่มีเมนูของตัวเอง (เปิดรายการอุปกรณ์เป็นหน้าที่ผู้เรียก)

## Requested code motion — 27 พฤศจิกายน 2026

Supersedes the earlier static-wave decision: active wave bars now scale vertically in staggered 1.6–2s cycles. Layout heights/widths remain 8/12/16/12/8 and 4px; only their visual transform changes. Inactive, disabled, aria-disabled and prefers-reduced-motion stay static. Dot remains static. This remains a device picker; animation is illustrative status feedback, not live audio levels, capture or a recording indicator. All consumers of ButtonMic receive this behavior, including HosXP. API and Figma remain unchanged; Storybook MotionStates covers active/inactive/disabled/dot.

### Quiet red wave motion
User-requested refinement: inactive red wave now has gentle low-amplitude staggered motion (8px bars scaled .65–1), compared with the taller green active wave. Disabled/aria-disabled, dot and reduced-motion stay static. This is illustrative motion, not actual audio measurement; status API and device behavior are unchanged. Supersedes earlier inactive-static motion guidance.
