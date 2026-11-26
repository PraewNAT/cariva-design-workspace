# Switch — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Switch](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3875-1027) (ไฟล์ Cariva Core Design System) ผู้ใช้ยืนยันชื่อตามที่ Claude เสนอ

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | prop | instance (ก่อน → หลัง) |
|---|---|---|---|
| `switch` | `crv-switch-base` | `checked`, `state` default / focusVisible / disabled, `size` default / sm (เดิม medium / small) | 13 → 13 |
| `switch-field` | `crv-switch` | `error` false / true (เดิม `color` primary / error), `disabled`, `labelPlacement` end / start, `label`, `description` (ซ่อนได้ด้วย `labelVisible`, `descriptionVisible`) | 2 → 2 |

ตัวเลือก `type=description` ของ `crv-switch` ถูกตัดออกจากชื่อ variant (Figma มีค่าเดียว) ข้อความในกรอบเอกสาร Figma เปลี่ยนชื่อ prop ตามแล้ว (ข้อความเดิมสำรองใน `docText_2026-11-26`) และเขียนว่าแบบ `outlined` ที่เอกสารเก่าเคยพูดถึงยังไม่มีใน Figma

## สเปก

- size default: ราง 44×24, thumb 20 · sm: ราง 36×20, thumb 16 · padding 2 มุมกลม
- ราง: ปิด `border/default` · เปิด `brand/primary/on-surface/default` · focus (ปิด) `border/system` · disabled ปิด `on-surface/action/disabled`, เปิด `brand/primary/on-surface/muted`
- thumb สีขาว (`on-surface/default`) มีเงา
- `switch-field`: ช่องว่าง 16 ป้ายชื่อ 14/20 Medium `content/primary` คำอธิบาย 12/16 `content/secondary` ช่องว่าง 8 · error ป้ายชื่อ `status/error/content/default` (สวิตช์ไม่เปลี่ยนสี) · disabled ป้ายและคำอธิบาย `content/disabled`

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `switch` | `Switch` (`ui/switch.tsx`; `size` default / sm) |
| `checked` | `checked` / `defaultChecked` |
| `state` focusVisible / disabled | CSS focus-visible และ `disabled` |
| `switch-field` | `SwitchField` (`app/switch-field.tsx`; `label`, `description`, `labelPlacement`, `error`, `disabled`) |
| `error` | `error` ของ `SwitchField` (ตั้ง `aria-invalid` ให้สวิตช์ด้วย) |

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| ราง 44×24 / 36×20, thumb 20, ตำแหน่ง thumb ตอนเปิด | ตรง (วัดใน story `FigmaSwitch`) |
| สีรางเปิด `#1789FA`, ปิด `#E2E8F0`, ปิดใช้งาน `#F1F5F9`, thumb ขาว | ตรง (วัดแล้ว) |
| สีป้าย error `#DC2626`, ป้าย disabled `#94A3B8`, ช่องว่าง 16 | ตรง (วัดแล้ว) |
| สีรางตอน focus, รางเปิดตอน disabled (`muted`), เงา thumb, 36×20 thumb 16 | ตั้งตาม Figma **ยังไม่ได้วัด** |

**ผลกระทบ:** `Switch` ที่ใช้อยู่ทุกที่ใหญ่ขึ้น (เดิม 32×18.4 และ 24×14) สีเปลี่ยนจาก token ของ shadcn เป็น token ของ DS ปิดใช้งานใช้สีเฉพาะแทนลด opacity และ focus เปลี่ยนสีรางแทนวงแหวน 3px (ตาม Figma เหมือน Checkbox ซึ่งอาจต่ำกว่าเกณฑ์ contrast ของ focus indicator)

**ยังไม่ได้ตรวจ:** แบบ `outlined` (ไม่มีใน Figma), การจัดแนวป้ายกับสวิตช์ถ้าคำอธิบายหลายบรรทัด
