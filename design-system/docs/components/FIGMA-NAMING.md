# ชื่อ component: Figma ↔ โค้ด

26 พฤศจิกายน 2026 · Figma: Cariva Core Design System (`XgxprkSY5mGbzIIwlmscCt`) · โค้ด: `src/lib/app/components/ui/`

นี่คือข้อเสนอชื่อ เปลี่ยนใน Figma ทีละ component ตอนทำ component นั้น แถวที่มี ✅ เปลี่ยนแล้ว (อัปเดต 26 พ.ย. 2026) ส่วนที่เหลือยังเป็นข้อเสนอ ดูหัวข้อสรุปแต่ละ component ท้ายไฟล์ พร้อมชื่อ property และค่าให้ตรงกับโค้ด

## กฎตั้งชื่อ

1. ชื่อ component ใน Figma = ชื่อไฟล์ component ในโค้ด เป็น kebab-case ไม่มีคำนำหน้า `crv-` เช่น `button`, `input`, `dropdown-menu`
2. ชื่อ property = ชื่อ prop ในโค้ด (camelCase) และค่า = ค่าที่โค้ดรับ เช่น `variant` = `default | outline | ghost`
3. ถ้าโค้ดใช้ component เดียวแต่ Figma แยกเป็นหลายชุด (เช่น ปุ่มไอคอน) ให้รวมเป็นชุดเดียว โดยแยกด้วย property แบบที่โค้ดทำ (`size=icon`) การรวมแบบนี้เปลี่ยนโครงสร้างใน Figma จึงทำเฉพาะเมื่อยืนยันแล้ว
4. ชิ้นส่วนย่อยตั้งชื่อตามชิ้นส่วนในโค้ด เช่น `dropdown-menu-item`, `sheet-header`
5. งานประกอบ (composition) ที่โค้ดมีใน `patterns.tsx` ใช้ชื่อเดียวกับ pattern

## ตาราง

เครื่องหมาย ⚠ = ต้องตัดสินใจเรื่องโครงสร้าง (รวมชุดหรือแยกต่างหาก) ก่อนเปลี่ยนชื่อ

| Figma ตอนนี้ | node id | ชื่อที่เสนอ (โค้ด) | หมายเหตุ |
|---|---|---|---|
| crv-autocomplete | 4454:12745 | `combobox` | ✅ เปลี่ยนใน Figma แล้ว |
| crv-avatar ✅ | 4315:10055 | `avatar` | |
| crv-avatar-group ✅ | 4457:63950 | `avatar-group` | งานประกอบจาก `avatar` |
| crv-button-standard | 3646:28000 | `button` | ชุดหลัก ✅ เปลี่ยนแล้ว |
| crv-button-icon ✅ | 3730:5246 | `button-icon` | โค้ด `Button` `size=icon-lg / icon / icon-sm` (= Figma `lg` / `default` / `sm`) |
| crv-button-loading ✅ | 3730:5454 | `button-loading` | โค้ด `Button disabled aria-busy` + `Spinner` (ไม่มี prop `loading`) |
| crv-link ✅ | 4165:5267 | `button-link` | โค้ด `Button variant="link"` |
| crv-fab | 4497:77574 | `fab` | ✅ เปลี่ยนแล้ว; `Fab` ใหม่ใน Core (ไม่รวมกับ Button) |
| crv-badge ✅ | 4518:82967 | `badge` | |
| crv-chip-action | 4459:62796 | `chip` | ✅ เปลี่ยนแล้ว; สร้าง `Chip` ใหม่ใน Core (ไม่ใช้ Toggle) |
| crv-breadcrumb-base | 3875:5059 | `breadcrumb-item` | ✅ เปลี่ยนแล้ว |
| crv-breadcrumb-standard | 3875:5038 | `breadcrumb` | ✅ เปลี่ยนแล้ว |
| crv-bottom-sheet-header ✅ | 4485:31705 | `sheet-header` | `sheet` ที่ `side=bottom` |
| crv-bottom-sheet-content ✅ | 4485:31742 | `sheet-content` | |
| Drawer (frame) | 4497:77983 | `sheet` | `side=right` |
| crv-card-vertical | 4657:31022 | `card-vertical` | ✅ เปลี่ยนแล้ว; โค้ด `CardVertical` ประกอบจาก `Card` |
| crv-card-horizontal | 4570:20745 | `card-horizontal` | ✅ เปลี่ยนแล้ว (`type` → `imagePosition`) |
| crv-card-small-horizontal | 4570:20655 | `card-small-horizontal` | ✅ เปลี่ยนแล้ว |
| crv-checkbox-standard | 3815:5291 | `checkbox-field` | ✅ เปลี่ยนแล้ว; โค้ด `CheckboxField` |
| crv-checkbox-base | 3815:5417 | `checkbox` | ✅ เปลี่ยนแล้ว (ตัวกล่อง = `Checkbox`) |
| crv-checkbox-group | 3815:5374 | `checkbox-group` | ✅ เปลี่ยนแล้ว; โค้ด `CheckboxGroup` |
| crv-dropdown | 3875:3909 | `select` | ✅ เปลี่ยนแล้ว (`size` medium → lg, small → default) |
| crv-menu-item | 4454:12758 | `dropdown-menu-item` | ✅ เปลี่ยนแล้ว; ใช้กับ DropdownMenu / Select / Combobox |
| crv-menu | 6617:313 | `dropdown-menu-content` | ✅ เปลี่ยนแล้ว (พื้นผิวเมนูที่หล่นลงมา) |
| crv-file-upload ✅ | 4457:56094 | `file-upload` | `FileUpload` ใน `app/file-upload.tsx`; re-export จาก `patterns.tsx` |
| crv-file-upload-item ✅ | 4457:56129 | `file-upload-item` | `FileUploadItem`; Figma names คงเดิม |
| crv-input-standard | 3760:6623 | `input` | ✅ เปลี่ยนแล้ว |
| crv-input-horizontal | 3760:6895 | `input-horizontal` | ✅ เปลี่ยนแล้ว; โค้ดยังไม่ทำ (`Field orientation=horizontal`) |
| crv-text-area-standard | 4164:1571 | `textarea` | ✅ เปลี่ยนแล้ว |
| crv-input-otp-standard | 4315:1164 | `input-otp` | ✅ เปลี่ยนแล้ว (`state` → `error`) |
| crv-input-otp-base | 4315:749 | `input-otp-slot` | ✅ เปลี่ยนแล้ว (ตรงกับ `InputOTPSlot`) |
| crv-modal | 4712:1805 | `dialog` | ✅ เปลี่ยนแล้ว (`type` → `align`) |
| Overlay (section) | 4722:90374 | `overlay` | ไม่มีตัวตรงกันในโค้ด ต้องตรวจก่อน |
| crv-pagination-standard | 4230:1661 | `pagination` | |
| crv-pagination-page-base | 4230:972 | `pagination-link` | |
| crv-pagination-controller-base | 4230:1777 | `pagination-controller` | |
| crv-pagination-rows-per-page | 4230:1695 | `pagination-rows-per-page` | pattern |
| crv-pagination-jump-to-page | 4230:1696 | `pagination-jump-to-page` | pattern |
| crv-linear-progress ✅ | 4456:16573 | `progress` | `Progress`; 3 variants × 4 colors |
| crv-circular-progress ✅ | 4456:16646 | `circular-progress` | `CircularProgress` ใน `ui/progress.tsx`; ไม่แทน Spinner เดิม |
| crv-radio-group ✅ | 3815:5863 | `radio-group` | `RadioGroup` label/description/error |
| crv-radio-standard ✅ | 3815:5910 | `radio-field` | `RadioField` composition |
| crv-radio-base ✅ | 3848:6592 | `radio-group-item` | `RadioGroupItem` |
| `<Rating>` ✅ | 4887:7022 | `rating` | `app/rating.tsx`; patterns re-export; full/half · เปลี่ยนชื่อ Figma แล้ว 26 พ.ย. (`size` lg/default/sm, `disabled`) |
| Star ✅ | 4887:6941 | `rating-star` | original vectors used inside Rating · `size`, `value` empty/half/full, `state` default/hover |
| crv-sidebar ✅ | 7204:64877 | `sidebar` | `Sidebar` ใน `ui/sidebar.tsx` กว้าง 240; `with bg` → `filled` |
| crv-sidebar-menu ✅ | 4735:102038 | `sidebar-menu-item` | `SidebarMenuButton` + `SidebarMenuSub`; `type` → `expandable` |
| crv-sidebar-rail ✅ | 5472:34956 | `sidebar-rail` | `SidebarIconRail` (`app/sidebar-rail.tsx`) |
| crv-sidebar-rail-item ✅ | 5472:34937 | `sidebar-rail-item` | `SidebarIconRailItem`; `stage` → `state` |
| crv-sortable ✅ | 7204:64000 | `sortable` | `Sortable` (`ui/sortable.tsx`, dnd-kit) |
| crv-sortable-item ✅ | 7204:63939 | `sortable-item` | `SortableItem` |
| crv-sortable-handle ✅ | 7204:63932 | `sortable-handle` | `SortableHandle` |
| Stepper (frame) | 4714:6228 | `stepper` | pattern เดิม (ตัวอย่างหน้า Catalog) |
| crv-stepper-new ✅ | 7204:64198 | `stepper` | `Stepper` (`ui/stepper.tsx`) |
| crv-step ✅ | 7204:64147 | `step` | `Step` |
| crv-step-indicator ✅ | 7204:64136 | `step-indicator` | `StepIndicator` |
| Stepper / Check icon, Loading icon ✅ | 7204:64271, 7204:64134 | `step-check-icon`, `step-loading-icon` | `StepCheckIcon`, `StepLoadingIcon` |
| crv-switch ✅ | 3875:1672 | `switch-field` | `SwitchField` (`app/switch-field.tsx`) |
| crv-switch-base ✅ | 3875:1752 | `switch` | `Switch` (`ui/switch.tsx`) 44×24 / 36×20 |
| Tabs (section) | 3875:4441 | `tabs` | Standard / Pills / Folder; 5 sets + standalone, docs 4838:64978; TABS-FIGMA.md |
| crv-table-head ✅ | 4582:11202 | `table-head` | `TableHead` (`size` ตั้งที่ `Table`; `sort`, `sortPosition`, `compact`) |
| crv-table-cell ✅ | 4582:11271 | `table-cell` | `TableCell` (`compact`; `alternate` = `striped` ที่ `Table`; `disabled` ที่ `TableRow`) |
| crv-tableText-cell ✅ | 4705:20105 | `table-text-cell` | `TableTextCell` (`description`) |
| crv-table-scroll-shadow ✅ | 4824:674 | `table-scroll-shadow` | `TableScrollShadow` (`side`) |
| crv-table-footer ✅ | 4829:33634 | `table-footer` | เปลี่ยนชื่อแล้ว 26 พ.ย. 2026 (instance 5); ใช้ `TablePagination` แทน; รอตัดสินใจ pagination แบบ "Go to" |
| bwc-table/* | 7195:… | — | ลบออกจาก Figma แล้ว 26 พ.ย. 2026 (ผู้ใช้สั่งลบ BWC ทั้งหมด) |
| crv-tooltip-standard ✅ | 4167:398 | `tooltip` | `Tooltip` (`ui/tooltip.tsx`), 5 variants (`placement` = ขอบที่ลูกศรอยู่); docs 4716:60403 |
| crv-tooltip-with-action ✅ | 4167:3485 | `tooltip-with-action` | `TooltipWithAction` (`app/tooltip-with-action.tsx`), 8 variants; docs 4716:60403 |
| Section 1 (หน้า Date/Time) | 4947:7100 | `date-time-picker` | pattern: `calendar` + `popover` + `input` |

ที่มา: ตารางทดแทน `src/lib/core/design-system/catalog/migration-map.json` (47 รายการ) เทียบกับ 53 โหนดที่เคยเป็น Ready for dev

## Button: ชื่อ property ที่ตกลงแล้ว (26 พฤศจิกายน 2026)

ผู้ใช้เลือกให้ **โค้ดตาม Figma** ในเรื่องโครงสร้าง (เพิ่มแกน `color`) และให้ชื่อ property ตรงกับ shadcn เท่าที่ shadcn มีชื่อให้ **สถานะ:** ผู้ใช้ยืนยันแล้ว เปลี่ยนชื่อค่าใน Figma และแก้โค้ดแล้ว (26 พฤศจิกายน 2026) ยกเว้น `elevated` ในโค้ดที่ยังไม่ทำ เพราะยังไม่มี shadow token

ชุด `crv-button-standard` → `button` (node `3646:28000`, เปลี่ยนชื่อแล้ว)

| property | Figma ตอนนี้ | ชื่อใหม่ | โค้ด |
|---|---|---|---|
| `variant` | contained | `default` | มีแล้ว |
| `variant` | outlined | `outline` | มีแล้ว ต้องปรับสีเส้นขอบเป็น `brand/primary/border/strong` |
| `variant` | text | `ghost` | มีแล้ว (ผู้ใช้ยืนยันว่าตรงกัน) |
| `variant` | elevated | `elevated` | **เพิ่มใหม่** shadcn ไม่มี |
| `color` | primary | `primary` | **เพิ่มแกนใหม่** shadcn ไม่มี |
| `color` | error | `destructive` | ใช้ชื่อตาม shadcn |
| `color` | neutral | `secondary` | ผู้ใช้ยืนยันว่าตรงกับ `secondary` |
| `size` | small | `sm` | แก้ gap เป็น 4 และฟอนต์ 12/16 ให้ตรง Figma |
| `size` | medium | `default` | ตรงแล้ว (ความสูง 40) |
| `size` | large | `lg` | แก้ gap เป็น 12 ให้ตรง Figma |
| `state` | default / hover / pressed / disabled | `state` (เฉพาะ Figma) | ในโค้ดเป็น CSS hover, active และ prop `disabled` |
| `startIconVisible`, `endIconVisible`, `startIcon`, `endIcon` | มี | ใช้ชื่อเดิม (เฉพาะ Figma) | shadcn วางไอคอนเป็น children |
| `children` | ข้อความบนปุ่ม | `children` | มีแล้ว |

ชุดอื่นในหน้า Button: `crv-button-icon` → `size=icon / icon-sm / icon-lg`, `crv-link` → `variant=link`, `crv-button-loading` → ใช้ Spinner ประกอบ (ไม่เพิ่ม prop `loading`) ยังไม่ได้ทำตารางละเอียด

**ยังไม่ได้ตรวจ:** สี hover/pressed/disabled ของแต่ละ color, ขนาดไอคอน, เงาของ `elevated`

## Accordion: ชื่อที่ตกลงแล้ว (26 พฤศจิกายน 2026)

| Figma | ชื่อใหม่ | โค้ด |
|---|---|---|
| ชุด `crv-accordion-standard` | `accordion-item` (เปลี่ยนแล้ว) | `AccordionItem` (การ์ดหนึ่งใบ) |
| layer `Frame 1` (กล่องไอคอน) | `AccordionIcon` (เปลี่ยนแล้ว) | prop `icon` ของ `AccordionTrigger` |
| layer `Title`, `AccordionTrigger`, `AccordionContent` | ตรงชื่อโค้ดอยู่แล้ว | `AccordionTrigger`, `AccordionContent` |
| property `expanded`, `showIcon`, `title`, `content` | ใช้ชื่อเดิม (เฉพาะ Figma) | โค้ดคุมการเปิดด้วย `value` ของ Accordion |
| property `icon` | `icon` | prop `icon` (ใหม่) |
| property `showBadge` | ยังไม่ลบ | ไม่มีป้ายในดีไซน์ รอผู้ใช้ตัดสินใจ |

รายละเอียดและผลวัด: [ACCORDION-FIGMA.md](ACCORDION-FIGMA.md)

## Input Field และ Autocomplete: ชื่อที่ตกลงแล้ว (26 พฤศจิกายน 2026)

| Figma เดิม | ชื่อใหม่ | หมายเหตุ |
|---|---|---|
| `crv-input-standard` | `input` | เปลี่ยนแล้ว |
| `crv-input-horizontal` | `input-horizontal` | เปลี่ยนแล้ว โค้ดยังไม่ทำ (เฟส 2) |
| `crv-text-area-standard` | `textarea` | เปลี่ยนแล้ว |
| `crv-autocomplete` | `combobox` | เปลี่ยนแล้ว โค้ดยังไม่แก้ |
| `size`: medium / large (Input Field) | `default` / `lg` | เปลี่ยนแล้ว |
| `size`: small / medium (Autocomplete) | `default` / `lg` | เปลี่ยนแล้ว |

รายละเอียดและผลวัด: [INPUT-FIELD-FIGMA.md](INPUT-FIELD-FIGMA.md)

## Breadcrumb: ชื่อที่ตกลงแล้ว (26 พฤศจิกายน 2026)

| Figma เดิม | ชื่อใหม่ |
|---|---|
| `crv-breadcrumb-base` | `breadcrumb-item` (เปลี่ยนแล้ว) |
| `crv-breadcrumb-standard` | `breadcrumb` (เปลี่ยนแล้ว) |
| `type`: default / active | `link` / `page` (เปลี่ยนแล้ว) ส่วน `hover`, `dropdown`, `ellipsis` ใช้ชื่อเดิม |

รายละเอียดและผลวัด: [BREADCRUMB-FIGMA.md](BREADCRUMB-FIGMA.md)

## Card: ชื่อที่ตกลงแล้ว (26 พฤศจิกายน 2026)

| Figma เดิม | Figma ใหม่ | โค้ด |
|---|---|---|
| `crv-card-vertical` | `card-vertical` | `CardVertical` |
| `crv-card-horizontal` (`type`) | `card-horizontal` (`imagePosition` left/right/absolute) | `CardHorizontal` |
| `crv-card-small-horizontal` | `card-small-horizontal` | `CardSmallHorizontal` |
| `crv-card-profile` | `card-profile` | `CardProfile` |
| `crv-card-metric` | `card-metric` | `CardMetric` |

รายละเอียด: [CARD-FIGMA.md](CARD-FIGMA.md)

## Checkbox: ชื่อที่ตกลงแล้ว (26 พฤศจิกายน 2026)

| Figma เดิม | Figma ใหม่ | โค้ด |
|---|---|---|
| `crv-checkbox-base` | `checkbox` | `Checkbox` |
| `crv-checkbox-standard` | `checkbox-field` | `CheckboxField` |
| `crv-checkbox-group` | `checkbox-group` | `CheckboxGroup` |
| `crv-checkbox-card` | `checkbox-card` | `CheckboxCard` |
| prop `color` primary / error | prop `error` false / true | prop `error` → `aria-invalid` |

รายละเอียด: [CHECKBOX-FIGMA.md](CHECKBOX-FIGMA.md)

## Chip: ชื่อที่ตกลงแล้ว (26 พฤศจิกายน 2026)

| Figma เดิม | Figma ใหม่ | โค้ด |
|---|---|---|
| `crv-chip-action` | `chip` | `Chip` |
| `size` medium / small | `size` default / sm | `size` |
| `thumbnailVisible` / `deleteVisible` | (เดิม) | `thumbnail` / `onDelete` |

รายละเอียด: [CHIP-FIGMA.md](CHIP-FIGMA.md)

## Sheet (หน้า Drawer): ชื่อที่ตกลงแล้ว (26 พฤศจิกายน 2026)

| Figma เดิม | Figma ใหม่ | โค้ด |
|---|---|---|
| `crv-drawer-basic` (`direction`) | `sheet` (`side`) | `Sheet` / `SheetContent side` |
| `crv-drawer-close` | `sheet-close` | ปุ่มปิดใน `SheetContent` |

รายละเอียด: [SHEET-DRAWER-FIGMA.md](SHEET-DRAWER-FIGMA.md)

## Select (หน้า Dropdown): ชื่อที่ตกลงแล้ว (26 พฤศจิกายน 2026)

| Figma เดิม | Figma ใหม่ | โค้ด |
|---|---|---|
| `crv-dropdown` | `select` | `Select` / `SelectTrigger` |
| `size` medium / small | `size` lg / default | `size` |

รายละเอียด: [SELECT-FIGMA.md](SELECT-FIGMA.md)

## FAB: ชื่อที่ตกลงแล้ว (26 พฤศจิกายน 2026)

| Figma เดิม | Figma ใหม่ | โค้ด |
|---|---|---|
| `crv-fab` | `fab` | `Fab` |
| `size` small / medium / large | `size` sm / default / lg | `size` |
| `color` neutral | `color` secondary | `color="secondary"` |

รายละเอียด: [FAB-FIGMA.md](FAB-FIGMA.md)

## Input OTP: ชื่อที่ตกลงแล้ว (26 พฤศจิกายน 2026)

| Figma เดิม | Figma ใหม่ | โค้ด |
|---|---|---|
| `crv-input-otp-standard` (`state` default / error) | `input-otp` (`error` false / true) | `InputOTP` + `InputOTPGroup` |
| `crv-input-otp-base` | `input-otp-slot` | `InputOTPSlot` |

รายละเอียด: [INPUT-OTP-FIGMA.md](INPUT-OTP-FIGMA.md)

## Menu: ชื่อที่ตกลงแล้ว (26 พฤศจิกายน 2026)

| Figma เดิม | Figma ใหม่ | โค้ด |
|---|---|---|
| `crv-menu-item` | `dropdown-menu-item` | `DropdownMenuItem`, `SelectItem`, `ComboboxItem` (สเปกร่วม `menu-recipe.ts`) |
| `crv-menu` | `dropdown-menu-content` | `DropdownMenuContent`, `SelectContent`, `ComboboxContent` |

รายละเอียด: [MENU-FIGMA.md](MENU-FIGMA.md)

## Overlay, Modal และ Pagination: ชื่อที่ตัดสินใจโดย Claude (26 พฤศจิกายน 2026, ผู้ใช้ไม่อยู่ ยังไม่ได้ยืนยัน)

| Figma เดิม | Figma ใหม่ | โค้ด |
|---|---|---|
| `crv-overlay/sm`, `crv-overlay/md+` | `overlay/sm`, `overlay/md+` | `DialogOverlay`, `SheetOverlay` |
| `crv-modal` (`type` default / alignCenter) | `dialog` (`align` start / center) | `Dialog`, `DialogHeader align`, `DialogBody`, `DialogFooter` |
| `crv-table-pagination` | `pagination` | `TablePagination` |
| `crv-table-pagination-page` | `pagination-link` | `PaginationLink` |
| `crv-table-pagination-controller` | `pagination-control` | `PaginationFirst/Previous/Next/Last` |
| `crv-table-pagination-rows` | `pagination-rows` | `PaginationRows` |
| `crv-table-pagination-summary` | `pagination-summary` | `PaginationSummary` |

รายละเอียด: [OVERLAY-FIGMA.md](OVERLAY-FIGMA.md), [DIALOG-FIGMA.md](DIALOG-FIGMA.md), [PAGINATION-FIGMA.md](PAGINATION-FIGMA.md)


Credit follow-up: `7089:1151` compact + `7094:365` remaining/used map to `src/lib/products/mira/components/credit-badge.tsx` (`CreditBadge`) under `Products/Mira/Components/Credit Badge` (Mira Product DS; docs7296:35). Source names/API remain unchanged; aliases depleted2/depleted 2 map to numeric depleted presentation.

| mira-tooltip-credit ✅ | 7118:777 | `credit-tooltip` | `MiraCreditTooltip` (`products/mira/components/credit-tooltip.tsx`), 9 variants; docs 7292:35 |
| crv-tag-standard ✅ | 4459:31603 | `tag` | `Tag` (`ui/tag.tsx`) `size` sm/default/lg, `content` label/count |
| crv-tag-color ✅ | 3936:5879 | `tag-color` | `TagColor` |
| crv-toast-standard ✅ | 6413:55828 | `toast` | `Toast` / `ToastCard` (`ui/toast.tsx`) severity × variant |
| crv-toggle-group-new ✅ | 7204:64515 | `toggle-group` | `ToggleGroup` (`appearance` = `variant`) |
| crv-segment-item ✅ | 7204:64425 | `toggle-group-item` | `ToggleGroupItem` / `Toggle` |
| crv-language-switcher ✅ | 7204:64498 | `language-switcher` | `LanguageSwitcher` (`app/language-switcher.tsx`) |
| crv-toggle-button ✅ | 6938:236 | `toggle-button` | `ToggleGroupItem` ใน `ToggleGroup variant="joined"` |
| crv-toggle-group ✅ | 6939:31550 | `toggle-button-group` | `ToggleGroup variant="joined"` (`size` xs / sm / default / lg) |

## เปลี่ยนชื่อรอบที่เหลือ (26 พ.ย. 2026, ผู้ใช้ยืนยันตามเสนอ)

| ชื่อเดิม | ชื่อใหม่ | ✅ |
|---|---|---|
| Date Picker 7204:61101 | `date-picker` (`state` default / open / range / birth) | ✅ |
| crv-calendar 7204:61134 | `calendar` (`mode`) | ✅ |
| crv-calendar-day 7204:61116 | `calendar-day` | ✅ |
| crv-time-picker / time-column / time-option | `time-picker` / `time-column` / `time-option` | ✅ |
| crv-file-upload (img) 6461:126 | `file-upload-image` | ✅ |
| crv-credit-badge 7089:1151 | `credit-badge` (`size` default / sm) | ✅ |
| crv-credit-badge 7094:365 | `credit-badge-usage` (`showIcon`) | ✅ |
| crv-tabs-standard 6086:59 / base 4724:141435 | `tabs-standard` / `tabs-standard-trigger` | ✅ |
| crv-tabs-pills 3875:4462 / base 3875:4448 | `tabs-pills` (`stretch`) / `tabs-pills-trigger` | ✅ |
| crv-tabs-folder-base 4725:18223 | `tabs-folder-trigger` | ✅ |
| crv-browser-scroll ✅ 4164:476 | `scrollbar` (`orientation` vertical / horizontal, `end`, `track`) | ✅ `ScrollBar` / `ScrollArea` |

(BWC ลบแล้ว). `crv-` อื่นที่ยังไม่มีหน้ารอทำ; Chart25ชุดมี code mapping ใน VISUALIZATION-MAPPING.json แล้ว (Code Connect pending publication)

Visualization: page7204:64878, 25 card sets map to `app/visualization-chart.tsx` / `VisualizationChart`, one named variant per source recipe. Desktop/mobile are responsive reference layouts; docs7303:35. See VISUALIZATION-MAPPING.json for all actual node IDs. Standalone plots remain internal rendering dependencies; Code Connect is not published.

## Button Split / Button Mic (26 พ.ย. 2026, ผู้ใช้ยืนยันตามเสนอ)

| ชื่อเดิม | ชื่อใหม่ | โค้ด | ✅ |
|---|---|---|---|
| crv-button-split 5981:34184 | `button-split` (`color` primary / destructive, `size` sm / default / lg) | `ButtonSplit` (`ui/button-split.tsx`) | ✅ |
| crv-button-mic 5862:33778 | `button-mic` (`variant` wave / dot, `status` active / inactive) | `ButtonMic` (`app/button-mic.tsx`) | ✅ |

รายละเอียด: [BUTTON-SPLIT-FIGMA.md](BUTTON-SPLIT-FIGMA.md), [BUTTON-MIC-FIGMA.md](BUTTON-MIC-FIGMA.md)

## ชุด Button ที่เหลือ (26 พ.ย. 2026, ผู้ใช้ยืนยันตามเสนอ)

| ชื่อเดิม | ชื่อใหม่ | prop ที่เปลี่ยน | instance |
|---|---|---|---|
| crv-button-icon 3730:5246 | `button-icon` | `variant` contained / outlined / ghost → `default` / `outline` / `ghost`; `color` primary / error / neutral → `primary` / `destructive` / `secondary`; `size` large / medium / small → `lg` / `default` / `sm` | 141 → 141 |
| crv-button-loading 3730:5454 | `button-loading` | `variant` contained / outlined / text → `default` / `outline` / `ghost`; `size` → `sm` / `default` / `lg` | 3 → 3 |
| crv-link 4165:5267 | `button-link` | `size` → `lg` / `default` / `sm` | 1 → 1 |
| crv-button-decorative 5844:33868 | `button-decorative` | `size` → `lg` / `default` / `sm` | 1 → 1 |

รายละเอียด: [BUTTON-SETS-FIGMA.md](BUTTON-SETS-FIGMA.md)

## Divider / Keyboard / Browser Scroll (26 พ.ย. 2026, ผู้ใช้ยืนยันตามเสนอ)

| ชื่อเดิม | ชื่อใหม่ | โค้ด | ✅ |
|---|---|---|---|
| divider-horizontal 4677:10310 + divider-vertical 4677:10311 | `separator` 7308:121838 (`orientation` horizontal / vertical) | `Separator` (`ui/separator.tsx`) | ✅ |
| crv-browser-scroll 4164:476 | `scrollbar` (ค่า `orientation` แก้แล้ว, `bg` → `track`) | `ScrollBar` / `ScrollArea` (`ui/scroll-area.tsx`) | ✅ |
| หน้า Keyboard (G-Board) | — | ไม่มีโค้ด (อ้างอิงแป้นพิมพ์ระบบ) | — |

รายละเอียด: [SEPARATOR-FIGMA.md](SEPARATOR-FIGMA.md), [SCROLLBAR-FIGMA.md](SCROLLBAR-FIGMA.md), [KEYBOARD-FIGMA.md](KEYBOARD-FIGMA.md)

## ชื่อ `crv-` ที่ตกหล่น (26 พ.ย. 2026)

| ชื่อเดิม | ชื่อใหม่ | instance ก่อน → หลัง |
|---|---|---|
| crv-time-popup 7204:61352 | `time-popup` | 4 → 4 |
| crv-time-actions 7204:61348 | `time-actions` | 5 → 5 |
| crv-tabs-folder 4725:21088 | `tabs-folder` | 4 → 4 |
| crv-table-footer 4829:33634 | `table-footer` | 5 → 5 |

ทั้ง 4 ชิ้นเป็น component เดี่ยว (ไม่ใช่ชุด variant) Code Connect เชื่อมไว้แล้วด้วย node เดิม ไม่ต้องแก้
