# Sidebar — Figma specification

อ่านจาก Figma วันที่ 26 พฤศจิกายน 2026: [Sidebar](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4716-62177) (ไฟล์ Cariva Core Design System) ผู้ใช้ยืนยันชื่อตามที่ Claude เสนอ รวมถึงการเปลี่ยนความกว้างเป็น 240 กรอบเอกสาร `Documentation Card` (node `7223:102132`) สร้างในหน้านี้แล้ว หน้านี้ยังมีตัวอย่างหน้าจอทั้งหน้ากับโน้ต "ปัญหา" ของดีไซเนอร์ ไม่ได้แตะ

## ชุดใน Figma (เปลี่ยนชื่อแล้ว ชื่อเดิมสำรองใน plugin data `oldName_2026-11-26`)

| ชื่อใหม่ | ชื่อเดิม | prop | instance (ก่อน → หลัง) |
|---|---|---|---|
| `sidebar` | `crv-sidebar` | `filled` (เดิม `with bg`), ช่อง `logo` | 10 → 10 |
| `sidebar-menu-item` | `crv-sidebar-menu` | `active`, `expandable` true/false (เดิม `type` expand/default) | 62 → 62 |
| `sidebar-rail` | `crv-sidebar-rail` | — | 3 → 3 |
| `sidebar-rail-item` | `crv-sidebar-rail-item` | `state` default/hover/selected/disabled (เดิม `stage`), `badge`, `label` | 36 → 36 |

## สเปก

- Sidebar กว้าง 240 พื้น `on-surface/default` padding บน/ล่าง 24 ช่องว่าง 16
- เมนู: สูง 40 มุม 12 padding 8/12 ช่องว่าง 12 ข้อความ 14/20 Medium `content/primary` ไอคอน 20 `content/secondary` · active: พื้น `on-surface/action/selected` ข้อความ `brand/primary/content/default` ไอคอน `brand/primary/on-surface/default`
- เมนูขยาย: รายการย่อยเยื้อง 24 เส้นข้าง 2px `border/default` (รายการที่เลือกเส้น `brand/primary/on-surface/default`) รายการย่อยสูง 40 มุม 8 padding 8/16
- Rail: กว้าง 64 ช่วงโลโก้ 64, Primary Nav, Secondary Nav, Profile ช่องว่าง 8 · item 64×60 กล่องไอคอน 32×32 มุม 8 ข้อความ 10/16 Medium ช่องว่าง 4 · badge จุดแดง 8px `status/error/on-surface/default`
- สี rail item: default `content/secondary` พื้น `bg/subtle` · hover พื้น `on-surface/action/hover` · selected พื้น `on-surface/action/selected-strong` ตัวอักษรและไอคอน `brand/primary/content/default` · disabled `content/disabled`

## ชื่อ Figma ↔ โค้ด

| Figma | โค้ด |
|---|---|
| `sidebar` (ประกอบเสร็จ) | `AppSidebar` (`app/app-sidebar.tsx`: `logo`, `sections[{label, items[{label, icon, href, active, disabled, children}]}]`; item ที่มี `children` = `expandable` เปิด/ปิดได้ ลูกศรชี้ขึ้นตอนเปิด) ประกอบจาก `Sidebar` + `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel` |
| `sidebar-menu-item` | `SidebarMenuItem` + `SidebarMenuButton` (`isActive`) |
| `expandable` | `SidebarMenuSub` + `SidebarMenuSubItem` + `SidebarMenuSubButton` (`isActive`) |
| `sidebar-rail` | `SidebarIconRail` (`app/sidebar-rail.tsx`, props `logo`, `secondary`, `profile`) |
| `sidebar-rail-item` | `SidebarIconRailItem` (`icon`, `label`, `badge`, `isActive`, `disabled`) |
| `filled`, `state` hover | `filled` เป็นเฉพาะ Figma (โค้ดใช้พื้นขาวเสมอ) · hover เป็น CSS |

`SidebarRail` เดิมของ shadcn คือตัวลากปรับความกว้าง ไม่ใช่ rail ของ Figma จึงตั้งชื่อใหม่ว่า `SidebarIconRail`

## โค้ด (26 พ.ย. 2026)

| เรื่อง | สถานะ |
|---|---|
| ความกว้าง 240, พื้น `#FFFFFF` | ตรง (วัดใน story `FigmaSidebar`) |
| ปุ่มเมนูสูง 40, มุม 12, ช่องว่าง 12, padding ซ้าย 12 | ตรง (วัดแล้ว) |
| รายการย่อยสูง 40, มุม 8 | ตรง (วัดแล้ว) |
| rail item 64×60, กล่องไอคอน 32 มุม 8 | ตรง (วัดแล้ว) |
| `AppSidebar` กว้าง 240, padding บน 24, ปุ่มกว้าง 224 สูง 40, เปิด/ปิดเมนูขยาย, disabled | ผ่าน (story `Assembled`) |
| ช่องว่างและขนาดหัวข้อกลุ่ม (12/18), ช่วงโลโก้ | ตั้งตาม Figma **ยังไม่ได้วัด** |
| สี hover / pressed, focus ของ rail, เส้นข้าง 2px ของรายการย่อย | ตั้งตาม Figma **ยังไม่ได้วัด** |

**ผลกระทบ:** `Sidebar` ที่ใช้อยู่ทุกหน้ากว้างจาก 256 เป็น 240 พื้นเป็นสีขาวแทน `bg-sidebar` ปุ่มเมนูสูง 40 (เดิม 36) มุม 12 ตัวหนังสือ medium; hover/active ใช้ token `--cds-*` แทน `sidebar-accent`; `disabled` ใช้สีตัวหนังสือแทนลด opacity; รายการย่อยมีเส้นข้าง 2px และสูง 40 (เดิม 28)

**ยังไม่ได้ตรวจ:** โหมดย่อเหลือไอคอน (`collapsible="icon"`) และ Sheet บนมือถือ (ใช้พื้นเดียวกันแต่ไม่ได้ดูด้วยตา), ตัว `SidebarMenuAction`/`Badge`/`Skeleton` ที่ Figma ไม่มี, โลโก้
