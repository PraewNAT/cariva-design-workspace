# Button — ชุดแยก (icon / loading / link / decorative)

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026 หน้า Button ในไฟล์ Cariva Core Design System ผู้ใช้ยืนยันชื่อและ API ตามที่ Claude เสนอ เอกสารการใช้งานอยู่ในกรอบ `Button Doc (Template)` ของหน้า Button ชุดหลัก `button` ดู [BUTTON-FIGMA.md](BUTTON-FIGMA.md) ส่วน `button-split` / `button-mic` ดู [BUTTON-SPLIT-FIGMA.md](BUTTON-SPLIT-FIGMA.md) / [BUTTON-MIC-FIGMA.md](BUTTON-MIC-FIGMA.md)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26` / `oldVariantNames_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | prop ที่เปลี่ยน | instance ก่อน → หลัง |
|---|---|---|---|
| `button-icon` (108 แบบ) | `crv-button-icon` | `variant` contained / outlined / ghost → `default` / `outline` / `ghost`; `color` primary / error / neutral → `primary` / `destructive` / `secondary`; `size` large / medium / small → `lg` / `default` / `sm` | 141 → 141 |
| `button-loading` (9 แบบ) | `crv-button-loading` | `variant` contained / outlined / text → `default` / `outline` / `ghost`; `size` small / medium / large → `sm` / `default` / `lg` | 3 → 3 |
| `button-link` (12 แบบ) | `crv-link` | `size` large / medium / small → `lg` / `default` / `sm` | 1 → 1 |
| `button-decorative` (12 แบบ) | `crv-button-decorative` | `size` → `lg` / `default` / `sm` | 1 → 1 |

## สเปก (อ่านจากตัวแปรใน Figma)

**button-icon:** กลม ขนาด lg 48 (padding 12, ไอคอน 24) · default 40 (padding 8, ไอคอน 24) · sm 32 (padding 8, ไอคอน 16) สีเหมือนปุ่มหลักตาม `variant` × `color` ชุดนี้เป็นชุดเดียวที่มี contained + neutral (พื้น `neutral/on-surface/default`, hover `/hover`, pressed `/pressed`, ไอคอน `neutral/content/default`) และ ghost ตอน disabled มีพื้น `on-surface/action/disabled` (ปุ่มข้อความไม่มี)

**button-loading:** ปุ่มมีไอคอนโหลด (`data-usage`) + ข้อความ ตอนโหลดทุกแบบใช้สีตัวอักษรและไอคอน `content/disabled` · contained พื้น `on-surface/action/disabled` · outline ไม่มีพื้น เส้น 1px `border/default` · ghost ไม่มีพื้น ขนาดและ padding เหมือนปุ่มหลัก (32 / 40 / 48, ไอคอน 16 / 24 / 24)

**button-link:** มุม 12 ไม่มี padding ข้าง (บนล่าง 8 / 8 / 12) มีไอคอนหน้าและหลัง ข้อความ 16/24 Medium ขีดเส้นใต้ สี `content/link/default` (hover `/hover`, pressed `/pressed`, disabled `content/disabled`)

**button-decorative:** pill พื้น `brand/decorative/gradient/from` + radial gradient ทับ (จาก from โปร่งใสที่กลาง → `via` ที่ 75% → `to` ที่ขอบ วงรีกว้าง 50% ของความกว้าง สูง 130% ของความสูง) hover มีเงาเรือง `0 0 4px` สี primary 36% · pressed ความทึบ 85% · disabled พื้น `on-surface/action/disabled` ไม่มี gradient ตัวอักษร `content/disabled`

## ชื่อ Figma ↔ โค้ด (ใช้ `Button` ตัวเดียวกัน `ui/button.tsx`)

| Figma | โค้ด |
|---|---|
| `button-icon` `size` lg / default / sm | `size="icon-lg"` / `"icon"` / `"icon-sm"` |
| `button-icon` `variant` / `color` | `variant` `default` / `outline` / `ghost`, `color` `primary` / `destructive` / `secondary` |
| `button-loading` | `<Button disabled aria-busy><Spinner />…</Button>` (ไม่มี prop `loading`) |
| `button-link` | `variant="link"` |
| `button-decorative` | `variant="decorative"` |
| ไอคอนโหลด `data-usage` | `Spinner` (ใช้ไอคอน `DataUsageRounded`) |

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| ปุ่มไอคอน: ขนาด 48 / 40 / 32, ไอคอน 24 / 24 / 16, padding, สีพื้น / ตัวอักษร / เส้นขอบ ของ 3 variant × 3 color, สี disabled ทุกแบบ | ตรง (วัดใน story `IconButtons`) |
| loading: ความสูง padding gap ขนาดตัวอักษร ขนาดไอคอนทั้ง 3 ขนาด, สี disabled, outline มีเส้นขอบ, ghost โปร่งใส, กว้าง 104 (default) | ตรง (วัดใน story `LoadingButtons`) |
| link: ความสูง 32 / 40 / 48, padding ข้าง 0, gap, สี `#2563EB`, ขีดเส้นใต้, มุม 12, ไอคอน, disabled | ตรง (วัดใน story `LinkButtons`) |
| link hover `#1D4ED8` | ตรง (วัดด้วยเมาส์จริง) |
| decorative: ความสูง, padding, gap, พื้น `#192450`, radial gradient (`#1789FA` 75% → `#55EBFF`), ตัวอักษรขาว, disabled พื้น `#F1F5F9` ไม่มี gradient | ตรง (วัดใน story `DecorativeButtons`) |
| ภาพรวมเทียบ Figma (icon, loading, decorative, link) | ตรวจด้วยสายตา (ตรง) |

**ตัดสินใจโดย Claude / ผู้ใช้ยืนยัน:** ไม่เพิ่ม prop `loading` (ใช้ `disabled` + `aria-busy` + `Spinner`; การคงเส้นขอบ outline ตอนโหลดอาศัย `aria-busy`) · ปุ่มไอคอนใช้ชื่อ size เดิมของโค้ด (`icon-*`) ไม่เพิ่ม prop ใหม่ · `Spinner` เปลี่ยนไอคอนเป็น `data-usage` ของ Figma ทั้งระบบ

**ผลกระทบ:**
- `Button variant="link"` เดิมสีน้ำเงิน primary ขีดเส้นใต้เมื่อชี้ ตอนนี้ขีดเส้นใต้ตลอด ใช้สี link ไม่มี padding ข้าง มุม 12
- `Button variant="decorative"` เปลี่ยนจาก linear gradient เป็น radial ตาม Figma และ token `--decorative-gradient` ในธีมเปลี่ยนด้วย (สร้างจาก `scripts/generate-shadcn-theme.js`)
- `size="icon-sm"` เดิม 24px (padding 4) ตอนนี้ 32px (padding 8, ไอคอน 16)
- `variant="default" color="secondary"` เดิมสี secondary ของ shadcn ตอนนี้เป็น neutral (`#E2E8F0`, ตัวอักษร `#0F172A`)
- `Spinner` เดิมไอคอนเส้น hugeicons ตอนนี้เป็นไอคอนวงแหวนจาก Figma ทุกที่ที่ใช้ Spinner

**ยังไม่ได้วัด:** hover / pressed ของปุ่มไอคอนทุกแบบ (ตั้งตาม token ตรวจด้วยสายตาเทียบ Figma), pressed 85% และ glow ตอน hover ของ decorative, hover / pressed / ลูกศรของ link ตัวอื่นนอกจาก default size, ความกว้างของ loading / decorative เมื่อข้อความต่างจาก "Label" (ยอมให้คลาด 2px จากฟอนต์)
