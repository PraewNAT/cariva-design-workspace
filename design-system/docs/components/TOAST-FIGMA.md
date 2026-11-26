# Toast — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Toast](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4165-68) (ไฟล์ Cariva Core Design System) ผู้ใช้ยืนยันชื่อตามที่ Claude เสนอ หน้านี้มีกรอบ `Doc — crv-toast-standard` อยู่แล้ว แก้ชื่อ prop และข้อความเก่าแล้ว (เดิมสำรองใน `docText_2026-11-26`)

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | prop |
|---|---|---|
| `toast` | `crv-toast-standard` | `severity` error / warning / info / success / notification (ตัวพิมพ์เล็ก), `variant` filled / outlined / standard, `showTitle`, `showDescription`, `showAction`, `showClose` (เดิม `Title?`, `Description?`, `Action?`, `On Close?`), `title`, `description`, `action` (เดิม `↳ Title`, `↳ Description`, `↳Instance`) |

instance ก่อนและหลังเท่าเดิม (25) ชุดย่อย `crv-button-icon` ที่ใช้เป็นปุ่มปิดยังไม่เปลี่ยนชื่อ (อยู่ในหน้า Button)

## สเปก (15 แบบ)

- กว้าง 320 มุม 12 padding 4/16 · ไอคอน 24 (กรอบ 36×40 padding 8/12/8/0) · ข้อความ padding 8/0 ช่องว่าง 4: หัวข้อ 16/24 Medium, คำอธิบาย 14/20 Medium · ปุ่ม action (ghost, sm, 32) และปุ่มปิด (ghost icon 32) ห่างซ้าย 16 ชิดบน 4
- filled: พื้น `status/{severity}/on-surface/default` ข้อความและไอคอน `status/{severity}/content/on-fill` ปุ่มสี `content/inverse` · ไอคอนชุด Outline
- outlined: พื้นขาว ขอบ 1px `status/{severity}/border/strong` ไอคอน `status/{severity}/content/default` หัวข้อ `content/primary` คำอธิบาย `content/secondary` ปุ่มปิด `content/secondary` · ไอคอนชุด Outline
- standard: พื้น `status/{severity}/on-surface/subtle` ขอบ 1px `status/{severity}/border/default` เงา `shadow/status/{severity}` · ไอคอนชุด Rounded
- notification ใช้สี neutral แทน status: ไอคอนและปุ่มปิดสี `brand/primary/on-surface/default` · filled = พื้นขาว + `shadow/md` · outlined ขอบ `neutral/border/strong` · standard พื้น `neutral/on-surface/subtle` ขอบ `neutral/border/default` เงา `shadow/status/notification`
- ไอคอนต่อ severity: error `error-outline` / `error` · warning `report-problem` / `warning` · info `info` · success `check-circle-outline` / `check-circle` · notification `info`

**แก้ doc ที่ผิดจาก Figma:** doc เดิมเขียนว่าเส้นขอบ standard 2px Figma จริงคือ 1px

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `severity` | `type` ของ `toast.add({ type })` (`error`, `warning`, `info`, `success`, `notification`) ไม่ส่ง = `notification` |
| `variant` | `data: { variant }` (`filled`, `outlined`, `standard`) ไม่ส่ง = `standard` |
| `title`, `description` | `title`, `description` ของ `toast.add` |
| `showAction`, `action` | `actionProps: { children, onClick }` (ไม่ส่ง = ไม่มีปุ่ม) |
| `showClose` | มีปุ่มปิดเสมอใน toast จริง · `ToastCard` ตั้ง `showClose={false}` ได้ |
| `showTitle`, `showDescription` | ไม่ส่ง = ไม่แสดง |
| การ์ดนิ่งสำหรับ doc และตัวอย่าง | `ToastCard` (`ui/toast.tsx`) |

## โค้ด (26 พ.ย. 2026)

แหล่ง `src/lib/app/components/ui/toast.tsx` ไอคอนคัดลอกจาก Figma ไว้ใน `app/toast-icons.tsx` ระบบซ้อน, ปัด และตัวจับเวลายังเป็นของ Base UI toast เดิม story ที่ `Core/Components/Toast`: `Default`, `AllVariants` (15 แบบ), `OptionalParts`, `LiveSeverityAndVariant`

| เรื่อง | สถานะ |
|---|---|
| กว้าง 320 สูง 72, มุม 12, หัวข้อ 16/24/500, คำอธิบาย 14/20 | ตรง (วัดแล้ว) |
| สี filled error / success, ข้อความขาว, ปุ่มขาว | ตรง (วัดแล้ว) |
| outlined: พื้นขาว ขอบ error และ notification | ตรง (วัดแล้ว) |
| standard: พื้นอ่อน เงา status, notification พื้น neutral | ตรง (วัดแล้ว) |
| filled notification พื้นขาว + เงา md | ตรง (วัดแล้ว) |
| toast จริงผ่าน toast manager รับ severity และ variant | ผ่าน (story `LiveSeverityAndVariant`) |
| สีของ warning / info ทั้ง 3 แบบ, ไอคอนแต่ละแบบเทียบกับ Figma ทีละตัว, hover ของปุ่ม | ตั้งตาม token **ยังไม่ได้วัด** |

**ผลกระทบ:** toast ที่ใช้อยู่ทุกที่ (หน้า Catalog) หน้าตาเปลี่ยน: กว้าง 320 (เดิม 384), มุม 12 (เดิม 24), ไม่มีพื้น popover/เงา shadcn, toast ที่ไม่ส่ง `type` เป็น notification แบบ standard (พื้นเทาอ่อน ไอคอนน้ำเงิน) ปุ่มปิดเปลี่ยนเป็นไอคอนจาก Figma

**ลบสิ่งที่ Figma ไม่มี:** ไอคอน loading และไอคอน hugeicons เดิม (`type: "loading"` ไม่มีดีไซน์ ถ้าต้องการสถานะกำลังโหลดต้องมีดีไซน์ก่อน) ปุ่ม action เดิมเป็น outline เปลี่ยนเป็น ghost ตาม Figma

**ยังไม่ได้ตรวจ:** ข้อความยาวเกิน 3 บรรทัด (doc บอกว่าไม่ควร), การซ้อนหลาย toast, Code Connect ของ shadcn (ยังไม่ได้ทำ)
