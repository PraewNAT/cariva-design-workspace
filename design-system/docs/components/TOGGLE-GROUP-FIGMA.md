# Toggle Group — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Toggle Group](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=6938-115) (ไฟล์ Cariva Core Design System; หน้านี้มี 🚧) ผู้ใช้ยืนยันแนวทางที่ Claude เสนอ: ใช้ชุด Draft (แคปซูล) เป็น `toggle-group` หลัก และไม่ทำชุดเดิม (สี่เหลี่ยมต่อกัน) หน้านี้ไม่มีกรอบเอกสารมาก่อน สร้าง `Documentation Card` (node `7286:104536`) แล้ว

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | prop |
|---|---|---|
| `toggle-group-item` | `crv-segment-item` | `appearance` segmented / default / outline, `selected`, `state` default / hover / pressed / disabled, `label` |
| `toggle-group` | `crv-toggle-group-new` | `orientation` horizontal / vertical, `appearance` default / outline |
| `language-switcher` | `crv-language-switcher` | `language` TH / EN, `disabled` |
| `toggle-button` | `crv-toggle-button` | `size` medium / small / large / xSmall → `default` / `sm` / `lg` / `xs`; `label`, `icon`, `selected`, `state` |
| `toggle-button-group` | `crv-toggle-group` | `size` เหมือนกัน, `orientation` horizontal / vertical |

**ผูกใหม่ใน Figma:** ชุด Draft ทั้งสามใช้ instance ของ `crv-segment-item` จากไลบรารีภายนอก (19 จุด) และสี 52 จุดผูกตัวแปรของไลบรารีเก่า เปลี่ยนเป็น instance และตัวแปรชื่อเดียวกันในไฟล์ทั้งหมด (รายการเดิมสำรองใน `remoteMain_2026-11-26` และ `remoteBindings_2026-11-26`) เหลือเฉพาะไอคอน `LanguageRounded` จากไลบรารีไอคอน

## สเปก

- item: แคปซูล สูง 32 padding 4/12 ช่องว่าง 8 กว้างต่ำสุด 64 ตัวอักษร 14/20 Regular `content/primary`
- default: ปกติโปร่ง · hover / pressed / selected พื้น `on-surface/action/selected` · disabled ตัวอักษร `content/disabled` (ที่เลือกอยู่ยังมีพื้น)
- outline: เหมือน default แต่มีขอบ 1px `border/default` ทุกสถานะ
- segmented: ที่เลือกพื้น `on-surface/elevated` ไม่มี hover หรือ pressed ที่ไม่ได้เลือก
- group: ช่องว่าง 8 · แนวตั้งกว้าง 64
- language-switcher: ราง 160×40 พื้น `on-surface/subtle` padding 4 ช่องว่าง 4 มุมกลม ไอคอนโลก 16 `content/secondary` แล้ว TH / EN

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `toggle-group` | `ToggleGroup` (`variant` default / outline, `orientation`) |
| `appearance` | prop `variant` (`default`, `outline`, `segmented`) |
| `toggle-group-item` | `ToggleGroupItem` และ `Toggle` เดี่ยว (`value`, `disabled`, `defaultPressed`) |
| `appearance=segmented` | `SegmentedControl` (= `ToggleGroup variant="segmented"` เลือกได้ 1 ตัว) |
| `language-switcher` | `LanguageSwitcher` (`app/language-switcher.tsx`; `value`, `defaultValue`, `onValueChange`, `disabled`) |
| `selected`, `state` hover / pressed | `data-pressed` ของ Base UI และ CSS |

## โค้ด (26 พ.ย. 2026)

แหล่ง `ui/toggle.tsx`, `ui/toggle-group.tsx`, `app/language-switcher.tsx` ไอคอนโลกคัดลอกจาก Figma ไว้ใน `app/icons.tsx` story ที่ `Core/Components/Toggle` และ `Core/Components/Toggle Group`: `Geometry`, `Appearances`, `AppearanceAndOrientation`, `Selection`, `Segmented`, `LanguageSwitchers`

| เรื่อง | สถานะ |
|---|---|
| item สูง 32 กว้าง 64 padding 12/4 ช่องว่าง 8 ตัวอักษร 14/20/400 มุมกลม | ตรง (วัดแล้ว) |
| default และ outline: ปกติ, เลือกแล้ว, disabled | ตรง (วัดแล้ว) |
| group: ช่องว่าง 8, แนวตั้งกว้าง 64 สูง 3 ตัว + 8 + 8, ขอบ outline | ตรง (วัดแล้ว) |
| segmented: ราง `#F8FAFC`, padding และช่องว่าง 4, สูง 40, ตัวที่เลือกขาว | ตรง (วัดแล้ว) |
| language-switcher 160×40, สลับภาษา, กดซ้ำไม่ยกเลิก, disabled | ตรง (วัดและทดสอบแล้ว) |
| สี hover / pressed ของ default และ outline | ตั้งตาม Figma **ยังไม่ได้วัดด้วยเมาส์จริง** |

**ผลกระทบ:** `Toggle` และ `ToggleGroup` เดิม (ใช้ที่หน้า Catalog) หน้าตาเปลี่ยนจากแคปซูลของ shadcn เป็นแคปซูลตาม Figma: สูง 32, กว้างต่ำสุด 64, ช่องว่าง 8 (เดิม 8 / ติดกันได้) และไม่มีวงแหวน focus 3px

**ลบสิ่งที่ Figma ไม่มี:** ขนาด `sm` / `lg`, `spacing` ของกลุ่ม (ชุดนี้มีขนาดเดียว สูง 32) ถ้าต้องการหลายขนาดต้องมีดีไซน์ (ชุดเดิม `crv-toggle-button` มี 4 ขนาด แต่เลือกไม่ทำ)

**ยังไม่ได้ตรวจ:** ตัวเลือกที่มีไอคอน (Figma ไม่มี), การเลือกหลายตัว (`multiple`) ใน Figma ไม่มีดีไซน์แยก

## ชุดปุ่มสี่เหลี่ยมต่อกัน `toggle-button` / `toggle-button-group` (26 พ.ย. 2026, ผู้ใช้ยืนยันตามเสนอให้ใช้ทั้งสองระบบ)

เปลี่ยนชื่อ `crv-toggle-button` → `toggle-button` (instance 40 → 40) และ `crv-toggle-group` → `toggle-button-group` ชื่อเดิมสำรองใน plugin data

**สเปก (อ่านจากตัวแปรใน Figma):**
- กลุ่ม: กรอบเดียว เส้น 1px `border/default` ในตัว (ความสูงกลุ่ม = ความสูงปุ่ม) มุม 8 ตัดขอบ ปุ่มไม่มีช่องว่าง คั่นด้วยเส้น 1px ซ้าย (แนวตั้ง: เส้นบน) ของปุ่มที่ 2 เป็นต้นไป
- ขนาด: xs สูง 24 padding 8 gap 4 ตัวอักษร 12/16 · sm สูง 32 padding 12 gap 4 ตัวอักษร 12/16 · default สูง 36 padding 16 gap 8 ตัวอักษร 14/20 · lg สูง 48 padding 24 gap 12 ตัวอักษร 16/24 · ตัวอักษร Medium · ไอคอน 16 / 16 / 20 / 24 (ปิดไว้ตามค่าเริ่มต้น)
- ปกติ: ตัวอักษร `content/secondary` · hover พื้น `on-surface/action/hover` ตัวอักษร `content/primary` · pressed พื้น `on-surface/action/pressed` · disabled ตัวอักษร `content/disabled`
- เลือกอยู่: พื้น `brand/primary/on-surface/default` (hover `/hover`, pressed `/pressed`) ตัวอักษร `brand/primary/content/on-fill` · เลือกอยู่และ disabled: พื้น `on-surface/action/disabled` ตัวอักษร `content/disabled`

**ชื่อ Figma ↔ โค้ด:**

| Figma | โค้ด |
|---|---|
| `toggle-button-group` | `ToggleGroup variant="joined"` (`size` `xs` / `sm` / `default` / `lg`, `orientation`) |
| `toggle-button` | `ToggleGroupItem` ภายในกลุ่ม joined (`ui/toggle.tsx` variant `joined`) |
| `label`, `icon` | children (ข้อความ / `svg`) |
| `selected` | `defaultValue` / `value` ของกลุ่ม (`data-pressed` ของ Base UI) |
| `state` hover / pressed / disabled | CSS / `disabled` |

**โค้ด:** วัดใน story `JoinedSizesAndOrientation` (4 ขนาด × แนวนอน/ตั้ง: ความสูง, ความกว้างกลุ่ม ±3px, padding, ตัวอักษร, สีที่เลือก/ไม่เลือก, เส้นคั่น, กรอบ inset 1px, มุม 8) และ `JoinedStatesAndIcon` (disabled ทั้งแบบเลือกอยู่และไม่เลือก, ไอคอน 24 ที่ lg) hover ของปุ่มที่ไม่ได้เลือก (`#F1F5F9`) และที่เลือกอยู่ (`#0F70E6`) วัดด้วยเมาส์จริง ภาพเทียบ Figma ตรงกัน

**ตัดสินใจโดย Claude / ผู้ใช้ยืนยัน:** ใช้ทั้งสองระบบใน `ToggleGroup` เดียว (`variant` เพิ่ม `joined`) · `size` มีผลเฉพาะ `joined` (ระบบแคปซูลมีขนาดเดียวตาม Figma) · ชื่อ `toggle-button-group` เพราะ `toggle-group` ถูกระบบแคปซูลใช้แล้ว

**ผลกระทบ:** เพิ่ม variant และ prop `size` ให้ `ToggleGroup` / `toggleVariants` ไม่กระทบการใช้งานเดิม

**ยังไม่ได้วัด:** pressed (กดค้าง) ทุกขนาด, hover ในขนาดอื่นนอกจาก default, ไอคอนในขนาด xs / sm / default, ปุ่มเดี่ยว `toggle-button` นอกกลุ่ม (ไม่มี API แยก ใช้ภายในกลุ่มเท่านั้น)
