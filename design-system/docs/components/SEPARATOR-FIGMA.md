# Separator — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: หน้า Divider (`4677:9992`) ในไฟล์ Cariva Core Design System ผู้ใช้ยืนยันชื่อตามที่ Claude เสนอ กรอบเอกสาร `Documentation Card` (`7308:121839`) อยู่ในหน้านี้

## ชุดใน Figma (รวมเป็นชุดเดียว 26 พ.ย. 2026)

| ชื่อใหม่ | ชื่อเดิม | prop | instance ก่อน → หลัง |
|---|---|---|---|
| `separator` (`7308:121838`) | `divider-horizontal` (`4677:10310`) + `divider-vertical` (`4677:10311`) | `orientation` horizontal / vertical | 7 → 7 |

รวมสองชิ้นส่วนเป็นชุดเดียวด้วย `orientation` ให้ตรงกับ `Separator` ในโค้ด ผูกสีเส้นกับตัวแปร `border/default` (เดิมไม่ได้ผูก ค่าเท่ากัน `#E2E8F0`) ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`

## สเปก

เส้น 1px สี `border/default` · `horizontal` กว้างตามพื้นที่ (ตัวอย่าง 220×1) · `vertical` สูงตามพื้นที่ (ตัวอย่าง 1×220)

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `separator` | `Separator` (`ui/separator.tsx`, Base UI Separator) |
| `orientation` | `orientation` `horizontal` / `vertical` |

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| แนวนอน 220×1 และแนวตั้ง 1×220, สีเส้น `#E2E8F0` (`border/default`) | ตรง (วัดใน story `Orientations`) |

โค้ดตรงกับ Figma อยู่แล้ว ไม่ได้แก้ โค้ดมีเพิ่ม story `Orientations` ตำแหน่งและระยะรอบเส้นเป็นหน้าที่ผู้เรียก
