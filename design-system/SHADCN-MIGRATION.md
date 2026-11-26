# Shadcn migration / Draft 24 พฤศจิกายน 2026

> **สถานะ 26 พฤศจิกายน 2026:** เอกสารนี้เป็นบันทึกตามวันที่ที่เขียน ไม่ได้อัปเดตตามทุกการตัดสินใจหลังจากนั้น หน้า Lab, Dashboard และ Login ที่กล่าวถึงถูกนำออกจาก `shadcn/` แล้ว Canvas ใช้ตัวของ `sync/canvas` โค้ด MUI อยู่ที่ `legacy/mui/` ลำดับขั้นและจุดตัดสินใจปัจจุบันอยู่ที่ `rules/workflow-map.md` ของ `shadcn/`

ผู้ใช้สั่ง “เปลี่ยนเลย” จึงเริ่มย้ายจริงใน workspace นี้ โดยคง React 19 / Vite / Storybook 10 และใช้ shadcn `base-maia` / Base UI ที่ติดตั้งอยู่ ไม่ยก Next.js หรือ Radix จาก reference มาอัตโนมัติ

## โครงสร้างที่ใช้จริง

```text
src/
  App.tsx                         # Vite entry: Lab preview
  index.css                       # Tailwind/theme aliases + fonts
  lib/
    app/
      components/ui/              # Core primitives จาก official shadcn
      components/app/             # compositions and material SVG icons
      hooks/                      # app hooks
    core/design-system/
      tokens.ts                   # generated semantic colors + shared scales
      semantic.generated.css      # generated shadcn role mapping
      generatedPalette.ts         # generated color export
      catalog/migration-map.json  # legacy → replacement inventory
    features/
      lab-interpret/presentation/ # สรุป/ผลแล็บ/shadcn Chart + Recharts/mock fixtures
      board/presentation/         # Core catalog + Foundations
code/core/                        # frozen MUI reference ไม่อยู่ใน build
legacy/                           # ทดลองเก่า + checkpoint manifest
```

ยังไม่มี playground ลากวาง, branch workflow, ระบบเซฟ slot, auto-sync Figma, Code Connect ใหม่ หรือ package distribution อัตโนมัติ รายการเหล่านี้ยังอยู่ในแผนเดิม ไม่ถือว่ามีเพราะเปลี่ยน stack แล้ว

## ขอบเขตที่เปลี่ยน

- Active app และ Storybook ใช้ shadcn/Base UI ไม่มี import MUI/Emotion/legacy Core และถอน MUI/Emotion dependencies แล้ว
- หน้า Lab: Sidebar ของ shadcn, Button, Input, Select, Table, Badge, Tabs, Dialog, Textarea, Accordion และ Card; shadcn Chart + Recharts
- Catalog มี primitives และ composed patterns สำหรับวันเวลา/ไฟล์/rating/stepper พร้อมตัวอย่าง forms, feedback, navigation และ overlays
- Lab imports primitives โดยตรงแล้ว; labelled fields/dialog เป็น feature compositions. Controller hooks แยก state, filtering, export และ chart lifecycle. Bridge เดิมเก็บใน legacy/shadcn-experiments/refactor-reference ไม่อยู่ใน active src.
- `tokens.json` เป็น source สำหรับ semantic colors → tokens.ts + semantic.generated.css; `tokens:check` ตรวจ local generated files ไม่ได้อ่าน Figma
- Primary #1789fa, secondary content Slate700, border default Slate200 / strong Slate300; IBM Plex Sans Thai UI, Looped prose, ขั้นต่ำ 12px; Product radius ใช้ tokens เดิม
- Button default 40px ใช้ 16/24 + padding8; small32 / large48; Input default40 และ Lab medium48; overlay/theme ใช้ root token เดียวกัน

## Compatibility และสิ่งที่ไม่ควรอ้าง

การเปลี่ยน framework ไม่ได้แปลว่า visual/props ของ Crv ทั้ง 47 ตัวถูกคัดลอก 1:1 ตารางด้านล่างคือเส้นทางทดแทนและข้อแตกต่าง ไม่ใช่หลักฐาน Code–Figma parity ของทุก variant หรือการอนุมัติใช้งาน production

- 192 semantic mappings ใน tokens.json เทียบกับ snapshot Figma 199 semantic variables; snapshot ทั้งหมด648อยู่ใน Foundations inventory ไม่ map ค่าใหม่โดยเดา
- Dark Theme ยังไม่มี approved Figma mode จึงไม่เพิ่มพาเลท dark เอง HosXP/Aktiv และ Malila ยังต้องจัดการ font asset กับทีมก่อนรับรองการแสดงผล
- Rating เปลี่ยนเป็นตัวเลือกคะแนน 1–5; Mic เป็น UI toggle; FileUpload เลือกไฟล์ในเครื่อง; ไม่มี upload/recording backend
- shadcn API เช่น Select onValueChange, Dialog render composition และ Button variant/size ต่างจาก Crv/MUI; ดูตัวอย่างจริงใน Storybook ก่อนนำไปแทน consumer ภายนอก
- ประวัติ stories MUI เดิมเก็บใน code/core; Storybook ชุดใหม่ทดสอบ implementation ใหม่ ไม่อ้างว่า legacy 335 tests ยังใช้กับ contract ใหม่ได้ทั้งหมด
- สี primary กับข้อความขาวมี contrast ประมาณ3.5:1 ตาม Figma เดิม จึงยังไม่ผ่าน AA สำหรับข้อความปกติ ไม่เปลี่ยนสีเองหรืออ้าง accessibility ผ่านทั้งหมด

## ตารางทดแทนของเดิม

| Legacy | shadcn | หมายเหตุ |
|---|---|---|
| CrvAccordion | accordion | ใช้ shadcn API ใหม่ |
| CrvAutocomplete | combobox | ใช้ shadcn API ใหม่ |
| CrvAvatar | avatar | ใช้ shadcn API ใหม่ |
| CrvAvatarGroup | avatar | ใช้ shadcn API ใหม่ |
| CrvBadge | badge | Badge / AvatarBadge; notification count เป็น Product composition |
| CrvBottomSheet | sheet | SheetContent side="bottom" |
| CrvBreadcrumb | breadcrumb | ใช้ shadcn API ใหม่ |
| CrvBreadcrumbBase | breadcrumb | ใช้ shadcn API ใหม่ |
| CrvButton | button | ใช้ shadcn API ใหม่ |
| CrvButtonDecorative | button | variant="decorative" สีจาก Figma gradient |
| CrvButtonIcon | button | size="icon-sm/icon/icon-lg" พร้อม aria-label |
| CrvButtonMic | button | Button + aria-pressed: UI toggle เท่านั้น ไม่เชื่อม microphone service |
| CrvButtonSplit | dropdown-menu | Button + DropdownMenuTrigger/MenuGroup |
| CrvCard | card | ใช้ shadcn API ใหม่ |
| CrvCheckbox | checkbox | ใช้ shadcn API ใหม่ |
| CrvCheckboxBase | checkbox | ใช้ shadcn API ใหม่ |
| CrvCheckboxGroup | field | FieldGroup/FieldSet + Checkbox |
| CrvChipAction | toggle | Toggle สำหรับ selection; Button สำหรับ remove action |
| CrvCircularProgress | spinner | ใช้ shadcn API ใหม่ |
| CrvDateTimePicker | calendar | composed DateTimePicker ใน app/patterns.tsx: Calendar/Popover + Input time |
| CrvDrawer | sheet | ใช้ shadcn API ใหม่ |
| CrvDropdown | select | ใช้ shadcn API ใหม่ |
| CrvFab | button | Button size=icon-lg; วาง fixed ที่ Product เมื่อจำเป็น |
| CrvFileUpload | input | composed FileUpload: เลือกไฟล์ในเครื่อง ยังไม่ส่ง API |
| CrvInput | input | ใช้ shadcn API ใหม่ |
| CrvInputHorizontal | field | Field orientation=horizontal + Input |
| CrvInputOtp | input-otp | ใช้ shadcn API ใหม่ |
| CrvInputOtpBase | input-otp | ใช้ shadcn API ใหม่ |
| CrvLinearProgress | progress | ใช้ shadcn API ใหม่ |
| CrvLink | button | Button variant=link / anchor ใช้ buttonVariants |
| CrvMenuItem | dropdown-menu | ใช้ shadcn API ใหม่ |
| CrvModal | dialog | ใช้ shadcn API ใหม่ |
| CrvPagination | pagination | ใช้ shadcn API ใหม่ |
| CrvRadio | radio-group | ใช้ shadcn API ใหม่ |
| CrvRadioBase | radio-group | ใช้ shadcn API ใหม่ |
| CrvRadioGroup | radio-group | ใช้ shadcn API ใหม่ |
| CrvRating | radio-group | composed Rating: RadioGroup 1–5 ยังไม่คัดลอก visual ดาวแบบเก่า |
| CrvSidebar | sidebar | ใช้ shadcn API ใหม่ |
| CrvStepper | progress | composed Stepper: current step + Progress |
| CrvSwitch | switch | ใช้ shadcn API ใหม่ |
| CrvSwitchBase | switch | ใช้ shadcn API ใหม่ |
| CrvTable | table | ใช้ shadcn API ใหม่ |
| CrvTabs | tabs | ใช้ shadcn API ใหม่ |
| CrvTag | badge | ใช้ shadcn API ใหม่ |
| CrvTextArea | textarea | ใช้ shadcn API ใหม่ |
| CrvToast | toast | ใช้ shadcn API ใหม่ |
| CrvTooltip | tooltip | ใช้ shadcn API ใหม่ |

## ตรวจและย้อนกลับ

`npm run build`, `npm run tokens:check`, `npm run migration:check`, `npm run build-storybook`; interaction/accessibility ผ่าน Storybook test-run ตามสกิล รายงานจริงอยู่ `reports/shadcn-migration-audit.md`

เก็บ MUI เดิมไว้ที่ code/core และ checkpoint `backups/2026-11-24-before-shadcn.tar.gz` (ก่อนแก้ runtime/source แต่หลังดาวน์โหลด primitives ชุดแรก) ย้อนกลับโดยแตกลงโฟลเดอร์ใหม่และติดตั้ง dependencies ตาม checkpoint ห้ามแตกทับ workspace โดยอัตโนมัติ ไม่มีการลบ legacy หรือเขียน remote Figma/Code Connect ในงานนี้

## Structure consolidation / 2026-11-25

Active source follows docs/architecture/STRUCTURE.md. Entry/styles now live in src/app; generated tokens and themes have separate folders; prototype fixtures live in each feature infrastructure. All source imports, generators, Storybook theme import, components.json and handoff theme path updated. Legacy preserved.
