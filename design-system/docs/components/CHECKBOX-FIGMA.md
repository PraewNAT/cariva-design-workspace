# Checkbox — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Checkbox](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3815-4883) (ไฟล์ Cariva Core Design System)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | instance (ก่อน → หลัง) |
|---|---|---|
| `checkbox` | `crv-checkbox-base` | 182 → 182 |
| `checkbox-field` | `crv-checkbox-standard` | 36 → 36 |
| `checkbox-group` | `crv-checkbox-group` | 2 → 2 |
| `checkbox-card` | `crv-checkbox-card` | 5 → 5 |

prop `color` (primary / error) ทุกชุดเปลี่ยนเป็น `error` (false / true) ให้ตรงกับ Input; `state` (default / focusVisible / disabled / hover) ไม่เปลี่ยน

## สเปก

- กล่อง 16×16 มุมโค้ง 4 ขอบ 1px `border/default`; ติ๊กและขีด 14px สี `content/inverse`
- ติ๊กแล้วหรือ indeterminate: พื้น `brand/primary/on-surface/default` (ตอนโฟกัส `…/pressed`) ไม่มีขอบ
- โฟกัสตอนว่าง: ขอบ `border/system` · error ว่าง: ขอบ `status/error/border/strong` (โฟกัส `border/error`) · error ติ๊กแล้ว: พื้น `status/error/on-surface/default` (โฟกัส `…/pressed`)
- disabled: พื้น `on-surface/action/disabled` ขอบ `border/disabled` ไอคอน `content/disabled` (ไม่ลด opacity)
- `checkbox-field`: ช่องว่าง 12, ป้ายชื่อ 14/20 Medium, คำอธิบาย 14/20 `content/secondary` ช่องว่าง 4; `labelPlacement=start` วางป้ายชื่อก่อนกล่อง; error ป้ายชื่อสี `status/error/content/default`; disabled ป้ายชื่อและคำอธิบาย `content/disabled`
- `checkbox-group`: ป้ายชื่อ + คำอธิบายแล้วรายการ ช่องว่าง 12
- `checkbox-card`: กว้าง 409, padding 16, มุมโค้ง 16, ขอบ 1px; ติ๊กแล้ว พื้น `brand/primary/on-surface/subtle` ขอบ `brand/primary/border/default`; error ขอบ `status/error/border/strong` ติ๊กแล้วพื้น `status/error/on-surface/subtle`; disabled ขอบ `border/disabled`

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `checkbox` | `Checkbox` (`ui/checkbox.tsx`) |
| `checked`, `indeterminate`, `disabled` | `checked` / `defaultChecked`, `indeterminate`, `disabled` |
| `error` | prop `error` (ตั้ง `aria-invalid`) |
| `checkbox-field` | `CheckboxField` (`app/checkbox-patterns.tsx`) |
| `labelPlacement` | `labelPlacement` |
| `label`, `description` | `label`, `description` |
| `checkbox-group` | `CheckboxGroup` (children = รายการ) |
| `checkbox-card` | `CheckboxCard` |
| `state` focusVisible / hover, `checkbox01..06Visible`, `checkBoxSlot` | เฉพาะ Figma |

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| กล่อง 16×16 มุมโค้ง 4 | ตรง (วัดใน story) |
| สีพื้นตอนติ๊ก / indeterminate `#1789FA`, ขอบ error `#EF4444`, disabled `#F1F5F9` | ตรง (วัดใน story) |
| ติ๊กถูก/ขีด เป็นไอคอน Material คัดลอกจาก Figma | ตรวจด้วยสายตา |
| card กว้าง 409, พื้นตอนติ๊ก | พื้นตอนโหลดแรกตรง; ตอนคลิกสลับวัดสีไม่ได้ในเทสต์ (transition ค้างในเทสต์) ตรวจแค่สถานะ checked |
| สถานะโฟกัสทุกแบบ (พื้น pressed, ขอบ system/error) | ตั้งตาม Figma **ยังไม่ได้วัด** |

**ตัดสินใจร่วมกับผู้ใช้:** ตามโฟกัสของ Figma คือเปลี่ยนสีพื้น/ขอบ ไม่มีวงแหวน; card ตอนชี้เมาส์ใช้ `shadow/sm` ตอนยังไม่ติ๊ก และ `glow/primary` (error: `glow/error`) ตอนติ๊ก ผ่าน token `--cds-shadow-sm` / `--cds-glow-*` (เพิ่ม 26 พ.ย. 2026; วัดด้วยเมาส์จริงตอนติ๊กแล้วตรง `rgba(23,137,250,0.36) 0 0 4px`; แบบยังไม่ติ๊ก, error และ disabled (ไม่มีเงา) **ยังไม่ได้วัด**)

**ผลกระทบ:** กล่องเดิมมุมโค้ง 6 และ disabled ลด opacity 50% ตอนนี้มุม 4 และ disabled เป็นสีเฉพาะ; โฟกัสเดิมเป็นวงแหวน 3px ตอนนี้เป็นเปลี่ยนสี; ใช้กับ `CatalogForm` (Dropdown Menu checkbox item มีสไตล์ของตัวเอง ไม่ได้ใช้ `Checkbox`)
