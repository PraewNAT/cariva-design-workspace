# Changelog — Cariva Design System

---

## Unreleased — 2026-11-26

- Visualization: 25 Core chart recipes on existing Chart/Recharts, responsive desktop/mobile, patterns/gradients/depth, accessible data tables and keyboard tooltips. Added30 stories alongside10 existing examples; Figma template docs50linked specimens. Code Connect discovery blocked by unpublished source components; mapping recorded locally.

- Ownership correction: CreditBadge, coin asset and six stories moved to lib/products/mira; Storybook Products/Mira/Components/Credit Badge. Figma docs move the same25 linked instances to Mira docs7296:35; Core Progress keeps36. Props and behavior unchanged.

- Tooltip: Standard5 and interactive guide8 variants, explicit accessible description; Mira Credit Tooltip9 variants in separate Product folder and Storybook group. Figma template docs split Core/Mira. Tabs underline stays above hover; slower350/320ms motion per feedback.

- Tabs motion: Standard underline and Pills background slide 200ms; Folder color/shadow fade 160ms. Keyboard focus-visible and reduced-motion disable transitions. No new dependency.

- Tabs: เพิ่ม Standard large/small, Pills default/line + stretch และ Folder พร้อม count/dot/icon; แก้ orientation forwarding, เก็บ legacy line alias. อัปเดต10stories, Markdown และ Figma template docs27instances. 15 scoped interactionsผ่าน; primary contrastยังค้าง ดู TABS-AUDIT.md.

- Progress scope correction: เพิ่ม Credit Badge สองชุดที่ตกหล่นใน sectionเดิม ทั้ง compact และ remaining/used พร้อมloading/hover/optional parts; ต่อมาย้ายไป Mira Product DS แยกจาก Core Progress ตาม ownership ที่ผู้ใช้ยืนยัน. รักษา12pxขั้นต่ำ ปรับเฉพาะlow text/trackไปใช้tokenเดิมที่contrastดีขึ้น ไม่เปลี่ยนshared tokensหรือbillinglogic. ดู PROGRESS-CREDIT-AUDIT.md.

- Progress/Radio Group/Rating: ปรับตาม Figma ทั้งสามหน้า; Progress linear/circular/4สีและ reduced motion, RadioField/disabled/focus/error, Rating ดาวต้นฉบับสามขนาด/ครึ่งดาว/keyboard/controlled/readOnly. อัปเดต Storybook20stories, ตรวจผู้ใช้ร่วม15stories, docsตามtemplate75linked instances และ audit. คง main Figma API/geometry; บันทึกข้อจำกัด non-text contrast/Rating targets และ OS/device checks. ดู `PROGRESS-RADIO-RATING-AUDIT.md`; ยังไม่ commit/publish.

- File Upload motion: uploading ใช้ spinner 1s และ progress width transition200ms ตามค่าจริง พร้อม reduced-motion; เพิ่ม storyจำลองและตรวจ9interactionsผ่าน. ไม่เปลี่ยน Progress กลางหรือ transport.

- File Upload: เพิ่ม icon/image dropzone, type/size checks, local selection และ controlled item states ด้วย Button/Progress เดิม; import เดิมยังใช้ได้. ผู้ใช้อนุมัติ padding 16px และ aria-disabled; คง contrast error/primary demo เป็นข้อค้าง. อัปเดต Storybook, Markdown และ Figma docs ตาม Document Template; ไม่ส่งไฟล์จริงหรือเปลี่ยน shared token.

- Figma docs: อัปเดต Avatar, Combobox/FieldLabel, Badge, Bottom Sheet และ Card บนframesเดิม พร้อมสร้าง Date/Time docs ใหม่จากcode contractจริง. เพิ่มdescriptionsของ16sets/variantsและตรวจ58linked instances; main props/geometry/radiusไม่เปลี่ยน. ซ่อนGBoardเฉพาะ2doc instancesตามคำอนุญาต. ลิงก์และผลตรวจอยู่ใน `shadcn/docs/components/FIGMA-DOCUMENTATION.md`; Date/Time codeยังdraft19/20และรอคำยืนยันแก้ข้อค้าง.

- Storybook: รวมทุก component ใต้ `Core/Components` ทั้ง43กลุ่ม; Card/Checkbox/Chart รวม compositions ไว้ใน Docs เดียว, Button และ Source code อยู่กลุ่มเดียว, แยก Stepper/Rating/File Upload/Date Time Picker จากหน้ารวมตามชื่อ. ไม่เปลี่ยน production components/tokens; ตรวจ32storiesและbuildผ่าน มีข้อค้าง contrast เดิม. กฎและผลตรวจอยู่ใน `shadcn/docs/architecture/STORYBOOK-ORGANIZATION.md`.

- Card: ใช้ compositions เดิม ปรับ Horizontal absolute/เพิ่ม topMessage, Vertical actions1–2ปุ่มแถวเดียว และ Small Horizontal slots80/40 พร้อมข้อความยาว/มือถือ. ผู้ใช้อนุมัติ Tag padding8 เฉพาะ Card, Profile max-width100%, พื้น Profile/Metric normal เป็น bg/subtle และ Unit content/secondary. Storiesรวม9 พร้อม docs/audit; ตรวจ12storiesรวม Card/Chart/catalog เดิมผ่านการรัน. คง abnormal contrast4.41:1 และ Button3.50:1 เป็นข้อค้าง ไม่เปลี่ยน token กลางหรือ primitive Card. งานอยู่ใน working tree branch `praew` ยังไม่ commit/publish.

- Bottom Sheet: ปรับเฉพาะ `SheetContent side="bottom"` ตาม Figma เป็นมุมบน 24px พร้อม Header default/search, icon/gradient, `SheetBody` เลื่อนแยก footer และ native input; คง Sheet ด้านอื่น/Sidebar. เพิ่ม Storybook รวม 7 stories และเอกสาร `SHEET-FIGMA.md`/`SHEET-AUDIT.md`. ตรวจ 9 stories ผ่านการรัน; contrast ค้างและ software keyboard บนมือถือจริงยังไม่ตรวจ. งานอยู่ใน working tree branch `praew` ยังไม่ commit/publish.

### 🔀 เปลี่ยน DS จาก MUI เป็น shadcn

- **`shadcn/`** เป็น DS ปัจจุบัน: component 79 ไฟล์ (shadcn + Base UI), tokens/theme (`tokens.json` → generated), Storybook 10, Core catalog + Foundations, DESIGN.md และกฎใน `shadcn/rules/` ไม่รวมหน้าตัวอย่าง (Lab, Dashboard, Login) ตามที่ผู้ใช้สั่ง
- **`legacy/mui/`** เก็บ MUI/Crv เดิมครบ ไม่แก้เนื้อหา: `code/`, Storybook เดิม, test, `tokens.json`, `tokens/`, `rules/` ยุค MUI, `export/` และสคริปต์ generator/export กับ `package.json` ของตัวเอง
- **Root `package.json`** เหลือเฉพาะ peer bridge กับ Code Connect (ถอด MUI/Emotion/Storybook 8/Vite/React ออก)
- อัปเดต `CLAUDE.md`, `AGENTS.md`, `README.md`, `rules/skill-routing.md`, `.claude/launch.json`, hook `guard-ds-usage.py` และ skill ที่อ่าน DESIGN.md/tokens ให้ชี้ `shadcn/`; skill `crv-component-code` ติดป้าย legacy
- Canvas (`sync/canvas`) แสดงใน Storybook ของ shadcn ที่ `Workspace/Canvas`
- ยังไม่มี dev export ของ shadcn
- ลบ Code Connect ของ MUI: ไฟล์ map 53 ไฟล์, `code-connect/`, `figma.config.json` และสคริปต์ `code-connect:*` ใน package.json ราก ลอง unpublish ใน Figma 90 รายการ Figma ตอบว่าไม่มี mapping ให้ลบ (ลบสำเร็จ 0) Code Connect ของ shadcn ยังไม่ได้สร้าง
- Button (Figma ↔ shadcn): เปลี่ยนชื่อค่า 120 variants ใน Figma, เพิ่ม prop `color` และปรับขนาด sm/lg ในโค้ด, ธีมออกตัวแปร `--cds-*` ครบจาก tokens.json ยังไม่มี `elevated` (รอ shadow token)
- Accordion (Figma ↔ shadcn): เปลี่ยนชื่อชุดเป็น `accordion-item` ใน Figma, โค้ดเป็นการ์ดแยกใบ (padding 16, มุมโค้ง 12 ตาม Figma จากเดิม 24), เพิ่ม prop `icon` ที่ `AccordionTrigger`, หัวข้อ 600, ข้อความรองเยื้อง 56, ตัดเส้นใต้ตอนชี้เมาส์ ยังไม่ลบ property `showBadge` ใน Figma; เปลี่ยนไอคอนเป็นชุด Material เดียวกับ Figma; ผูกสีใน Figma หน้า Accordion จากตัวแปร library เก่าเป็นตัวแปรในไฟล์ 24 จุด
- Input Field (Figma ↔ shadcn) เฟสแรก: เปลี่ยนชื่อชุดใน Figma (`input`, `input-horizontal`, `textarea`, `combobox`) และค่า size เป็น `default`/`lg`; โค้ด `Input`, `Textarea`, `InputGroup`, `Field` มี prop `size` (40/48), ขอบ 1px สี `border/default` เป็น inset ring โฟกัสและผิดพลาด 2px, ปิดใช้งานเป็นสีเฉพาะ, textarea มุมโค้ง 8/12, ป้ายชื่อ 12/14 ข้อความช่วย 12 และป้ายชื่อรอง ยังไม่ทำ `input-horizontal` และ Combobox
- Breadcrumb (Figma ↔ shadcn): เปลี่ยนชื่อชุดเป็น `breadcrumb-item` / `breadcrumb` และ `type` เป็น `link`/`page` ใน Figma; โค้ดลิงก์สีน้ำเงิน brand ชี้เมาส์น้ำเงินเข้ม หน้าปัจจุบันสีรอง น้ำหนัก 500 ช่องว่าง 12 ตัวคั่นและจุดไข่ปลาเป็นไอคอน Material (จุดไข่ปลากล่อง 32) เพิ่ม story `FullRow` มีแบบ dropdown
- Card (Figma ↔ shadcn): เปลี่ยนชื่อชุดเป็น `card-vertical`/`card-horizontal`/`card-small-horizontal`/`card-profile`/`card-metric` และ `type` เป็น `imagePosition` ใน Figma; โค้ด `Card` padding 16 (เล็ก 12) ขอบ 1px หัวข้อ 20/28 คำอธิบาย 14/20 และเพิ่ม `CardVertical`/`CardHorizontal`/`CardSmallHorizontal` ใน `app/content-card.tsx` และ `CardProfile`/`CardMetric`; แก้ป้าย 10px ใน Figma ของ profile/metric 10 จุดเป็น 12/16
- Checkbox (Figma ↔ shadcn): เปลี่ยนชื่อชุดเป็น `checkbox`/`checkbox-field`/`checkbox-group`/`checkbox-card` และ prop `color` เป็น `error` ใน Figma; โค้ด `Checkbox` มุมโค้ง 4, indeterminate, error, disabled เป็นสีเฉพาะ, โฟกัสเปลี่ยนสี (ไม่มีวงแหวน) และเพิ่ม `CheckboxField`/`CheckboxGroup`/`CheckboxCard` ใน `app/checkbox-patterns.tsx` ยังไม่มีเงาตอนชี้เมาส์ของ card (รอ shadow token)
- Chip (Figma ↔ shadcn): เปลี่ยนชื่อชุดเป็น `chip` และ `size` เป็น `default`/`sm` ใน Figma; เพิ่ม `Chip` ใหม่ใน Core (`ui/chip.tsx`) variant filled/outlined/surface, color default/primary, thumbnail, onDelete ยังไม่มีเงาตอน pressed (รอ shadow token)
- Sheet / Drawer (Figma ↔ shadcn): เปลี่ยนชื่อชุดเป็น `sheet` / `sheet-close` และ `direction` เป็น `side` ใน Figma, ผูกสี 133 จุดจากตัวแปร library เก่าเป็นตัวแปรในไฟล์; โค้ด `Sheet` ด้าน right/left/top padding 16 ช่องว่าง 16 ชื่อ 14/20 ปุ่มปิด 32 footer แนวนอน (bottom คงเดิมตาม Bottom Sheet)
- Select (Figma ↔ shadcn): เปลี่ยนชื่อชุดเป็น `select` และ `size` เป็น `default`/`lg` ใน Figma, แก้ชื่อในกรอบเอกสาร; โค้ด `SelectTrigger` สูง 40/48 ขอบ inset ผูก `--cds-border-*` (โฟกัส/error 2px), disabled เป็นสีเฉพาะ, ลูกศร Material 20/24 ยังไม่แตะรายการที่เปิดออก
- FAB (Figma ↔ shadcn): เปลี่ยนชื่อชุดเป็น `fab`, `size` เป็น `sm`/`default`/`lg`, `color` neutral เป็น `secondary` ใน Figma และแก้ชื่อในกรอบเอกสาร; เพิ่ม `Fab` ใหม่ใน Core (`ui/fab.tsx`) ขนาด 40/56/64 พร้อมเงา hover/pressed
- Tag / Toast / Toggle Group (Figma ↔ shadcn, ผู้ใช้ยืนยันตามเสนอ): Figma เปลี่ยนชื่อเป็น `tag` (`size` sm/default/lg, `content` label/count), `tag-color`, `toast` (`severity`/`variant` ตัวพิมพ์เล็ก, `show*`), `toggle-group`, `toggle-group-item`, `language-switcher` และผูก instance/สีของชุด Draft Toggle Group จากไลบรารีเก่ามาเป็นของไฟล์; แก้ตัวเลขและชื่อที่ผิดในกรอบ doc ของ Tag / Toast และสร้างกรอบ doc ของ Toggle Group; โค้ด: ใหม่ `Tag`/`TagColor` (`ui/tag.tsx`), `Toast` ทำครบ 15 แบบ + `ToastCard` (`toast.add({ type: severity, data: { variant } })`, กว้าง 320 มุม 12), `Toggle`/`ToggleGroup` เป็นแคปซูลตาม Figma (variant default/outline/segmented, ลบขนาด sm/lg และ spacing), ใหม่ `SegmentedControl` และ `LanguageSwitcher`
- Tooltip (Figma ↔ shadcn, ผู้ใช้ยืนยันตามเสนอ): Figma เปลี่ยนชื่อชุดเป็น `tooltip` / `tooltip-with-action` / `credit-tooltip` (instance 5 / 8 / 9 เท่าเดิม, ชื่อเดิมสำรองใน plugin data) และแก้ข้อความในกรอบ doc ให้ตรงของจริง; โค้ดผูก token ตาม Figma (`on-surface/invert`, `on-surface/sunken`), ไอคอนปุ่ม Back/Next ใช้ลูกศรและ chevron ของ Material จาก Figma แทน hugeicons, credit tooltip กลับเป็นค่าตาม Figma (cost-hint 10px, ช่องว่าง 2px, สีข้อความ depleted `status/error/content/default`), เพิ่ม story `FigmaSpecs` วัดขนาด/สีของ tooltip, guide และ credit tooltip
- เปลี่ยนชื่อชุด `crv-` ที่เหลือ 27 ชุดใน Figma (Avatar, Badge, Bottom Sheet, Date/Time, File Upload, Progress, Radio, Tabs, Browser Scroll; ผู้ใช้ยืนยันตามเสนอ): instance รวม 1,210 ตัว ก่อน/หลังเท่ากัน, ชื่อเดิมสำรองใน plugin data; ค่า prop ตรงกับโค้ด (Avatar size lg/default/sm/xs, Radio color → error, Tabs size default/sm และ pills `stretch`, Progress/Credit badge size, Date/Time `state`/`mode`); เพิ่ม `glow` ให้ Badge (เฉพาะ dot, เงา 0 0 4px สีเดียวกับจุดที่ 36%) พร้อม story `Glow`; แก้ข้อความในกรอบ doc ที่อ้างชื่อ/ค่าเดิม
- Code Connect ของ shadcn (ผู้ใช้สั่ง "ทำทุกตัว"): สร้าง `figma.config.json` (root), `shadcn/code-connect/` มี 34 ไฟล์ `*.figma.tsx` รวม 114 mapping (รอบแรก 94 + รอบตรวจซ้ำเก็บที่ตกหล่น 20: card-small-horizontal, breadcrumb, pagination-rows/summary/footer, sheet-close, sidebar-rail, step icons, tabs-folder, table-text-cell, time popup/actions, overlay, scrollbar และ Button icon/loading/link/decorative) ครอบคลุมชุดที่เปลี่ยนชื่อแล้วทุกหน้า (Button, Badge, Avatar, Card, Checkbox, Chip, Fab, Input/Select/Combobox, Dialog, Menu, Sheet, Tabs, Table, Tag, Toast, Toggle Group, Tooltip, Progress/Credit badge ฯลฯ) type-check ผ่าน, dry-run ผ่าน, publish แล้ว และตรวจ `get_code_connect_map` กับ node ตัวอย่าง (path import ถูก `@/lib/app/components/ui/...`); เพิ่มสคริปต์ `code-connect:parse|dry-run|publish` ที่ root; เพิ่มกฎ "ทุก component ใหม่ต้องเชื่อม Code Connect" ใน `CLAUDE.md`, `shadcn/rules/agent-rules.md`, `workflow-map.md`, `figma-component-to-code-flow.md`; ยังไม่เชื่อม: `crv-button-mic`, `crv-button-split`, `crv-toggle-*`, `bwc-table`, Chart 25 แบบ (ดู `shadcn/code-connect/README.md`)
- ลบ BWC ทั้งหมด (ผู้ใช้สั่ง 26 พ.ย. 2026): ลบ section `BWC Table / Draft` (7 ชิ้นส่วน, 163 instance ทั้งหมดอยู่ใน section เดียวกัน ไม่มีที่อื่นใช้) ออกจากหน้า Table ใน Figma — collection ตัวแปร BWC Table Draft ไม่มีใน Figma แล้ว จึงนำออกจาก snapshot `design-references/figma/variables.latest.json` และ `VARIABLES.md` (648 → 635 variables); ลบข้อความ BWC ใน `AGENTS.md`, `CARIVA-COMPONENT-SYNC-FLOW.md`, `TABLE-FIGMA.md`, `FIGMA-NAMING.md`, `code-connect/README.md`, `figma-variable-change-flow.md` และเปลี่ยน title ของ `shadcn/index.html`; เหลือข้อความกันพลาดใน `agent-rules.md` / `control-sizing.md` (ห้ามใช้สี BWC เดิม) ซึ่งเป็นกฎ ไม่ใช่ข้อมูล BWC; กู้คืนได้จาก Version history ของ Figma
- Button Split / Button Mic (Figma ↔ shadcn, ผู้ใช้ยืนยันตามเสนอ): Figma เปลี่ยนชื่อ `crv-button-split` → `button-split` (`color` error → `destructive`, `size` → `sm`/`default`/`lg`) และ `crv-button-mic` → `button-mic` (`status` deactive → `inactive`) instance 3 / 1 เท่าเดิม; โค้ดใหม่ `ButtonSplit` (`ui/button-split.tsx`, Base UI Button + DropdownMenu) และ `ButtonMic` (`app/button-mic.tsx`) + ไอคอน `MicNoneRounded` จาก Figma; story `Core/Components/Button Split` และ `Button Mic` (มี `FigmaSpecs` วัดขนาด/สี/โครงสร้าง, hover วัดด้วยเมาส์จริง); แก้ชื่อในกรอบ Button Doc; เชื่อม Code Connect เพิ่ม
- ชุด Button ที่เหลือ (Figma ↔ shadcn, ผู้ใช้ยืนยันตามเสนอ): Figma เปลี่ยนชื่อ `crv-button-icon` → `button-icon`, `crv-button-loading` → `button-loading`, `crv-link` → `button-link`, `crv-button-decorative` → `button-decorative` พร้อมค่า prop ตรงโค้ด (instance 141 / 3 / 1 / 1 เท่าเดิม); โค้ด `Button`: `variant=link` ใช้สี link ขีดเส้นใต้ตลอด ไม่มี padding ข้าง มุม 12, `decorative` เป็น radial gradient ตาม Figma (พื้นนาวี + ไล่สี, hover glow, pressed 85%, disabled พื้นเทา; `--decorative-gradient` ในธีมเปลี่ยนจาก linear เป็น radial), `icon-sm` เป็น 32px (icon 16 + padding 8), `default + secondary` ใช้สี neutral, ghost ปุ่มไอคอน disabled มีพื้น, loading (disabled + aria-busy) outline คงเส้นขอบ ghost โปร่งใส; `Spinner` ใช้ไอคอน `data-usage` จาก Figma (ไอคอน `AddRounded`, `DataUsageRounded` คัดลอกจาก Figma) และ Spinner ใน Button ขยายเป็น 24 / 16; story `IconButtons`, `LoadingButtons`, `LinkButtons`, `DecorativeButtons` วัดขนาด/สี
- Code Connect ของ Visualization (ผู้ใช้สั่ง): `shadcn/code-connect/visualization.figma.tsx` เชื่อมการ์ด `crv-chart-01…25` และ `Chart plot / …` 25 ชิ้นเข้ากับ `VisualizationChart` ตาม `VISUALIZATION-MAPPING.json` รวม 50 mapping (ทั้งหมด 166 mapping จาก 36 ไฟล์) type-check, dry-run และ publish ผ่าน ตรวจกลับจาก Figma กับ node ตัวอย่าง 2 ตัว
- Toggle ทั้งสองระบบ (ผู้ใช้ตอบ "ใช้หมด", ยืนยันตามเสนอ): Figma เปลี่ยนชื่อ `crv-toggle-button` → `toggle-button` (instance 40 เท่าเดิม) และ `crv-toggle-group` → `toggle-button-group` (`size` xSmall / small / medium / large → `xs` / `sm` / `default` / `lg`); โค้ด `ToggleGroup` เพิ่ม `variant="joined"` + `size` (ปุ่มสี่เหลี่ยมต่อกัน กรอบ inset 1px มุม 8 เส้นคั่น 1px สีเลือกอยู่ primary hover/pressed ตาม Figma) ระบบแคปซูลเดิมไม่เปลี่ยน; story `JoinedSizesAndOrientation`, `JoinedStatesAndIcon`; เพิ่มบล็อก toggle-button-group ในกรอบ doc และแก้ข้อความที่บอกว่ายังไม่ทำ; เชื่อม Code Connect
- Divider / Browser Scroll / Keyboard (ผู้ใช้ยืนยันตามเสนอ): Figma รวม `divider-horizontal` + `divider-vertical` เป็นชุด `separator` (`orientation`, instance 7 เท่าเดิม, ผูกสีเส้น `border/default`); `scrollbar` แก้ค่า `orientation` ที่ชื่อสลับ (Horizontal/Orientation → vertical, Vertical/Orientation4 → horizontal), `bg` → `track`, แก้ตำแหน่งแท่งของแบบ horizontal / end / ไม่มี track; โค้ด `ScrollBar` ปรับเป็นช่อง 15px padding 4 แท่ง 7px สี `content-placeholder` พื้น `on-surface-sunken` เมื่อ `track`, `ScrollArea` เพิ่ม `orientation` / `track`; story `Scrollbars` และ `Orientations` วัดค่า; เพิ่มกรอบ doc ใน 3 หน้า (Keyboard ระบุว่าเป็นภาพอ้างอิง G-Board ไม่มีโค้ด); ขอให้ทีม DS พิจารณา token ของ scrollbar; เชื่อม Code Connect
- เปลี่ยนชื่อ `crv-` ที่ตกหล่น 4 ชิ้นใน Figma: `crv-time-popup` → `time-popup`, `crv-time-actions` → `time-actions`, `crv-tabs-folder` → `tabs-folder`, `crv-table-footer` → `table-footer` (instance 4 / 5 / 4 / 5 เท่าเดิม ชื่อเดิมสำรองใน plugin data) แก้ข้อความที่อ้างชื่อเดิมใน doc ตาราง; Code Connect เดิมใช้ได้ (node เดิม)
- **Shadow token ใหม่:** เพิ่มหมวด `shadow` ใน `tokens.json` อ่านจาก effect style `shadow/*` ใน Figma (sm, default, md, lg, xl, 2xl, inner, status/*) ออกเป็น `--cds-shadow-*` ใน `semantic.generated.css` และ `glow/*` ออกเป็น `--cds-glow-*`; ใช้แล้วกับ Button `variant="elevated"` (primary/secondary), เงา hover ของ Checkbox Card (shadow/sm, glow) และเงา pressed ของ Chip (shadow/sm)
- Input OTP (Figma ↔ shadcn): เปลี่ยนชื่อชุดเป็น `input-otp` / `input-otp-slot` และ `state` ของกลุ่มเป็น `error` ใน Figma, แก้ชื่อในกรอบเอกสาร; โค้ด `InputOTP` เป็นช่องแยก 40×40 มุม 12 ห่าง 12, ขอบ inset ผูก `--cds-border-*` (active/error 2px), disabled เป็นสีเฉพาะ, เพิ่ม prop `error` แก้แบบ error ใน Figma ให้ขอบช่องเป็น border/error 2px ตรงกับโค้ด
- Menu (Figma ↔ shadcn): เปลี่ยนชื่อชุดเป็น `dropdown-menu-item` / `dropdown-menu-content` และแก้ชื่อในกรอบเอกสารใน Figma; เพิ่ม `ui/menu-recipe.ts` สเปกร่วม (พื้นผิวมุม 12 padding บนล่าง 8 ไม่มี padding ซ้ายขวา เงา shadow/lg ขอบ 1px, รายการสูง 40 padding 8/16 มุม 4 14/20 Medium) ใช้กับ DropdownMenu, Select และ Combobox; checkbox item มีช่องติ๊กด้านซ้ายตาม Figma
- Switch / Stepper (Figma ↔ shadcn, ผู้ใช้ยืนยันตามเสนอ): Figma เปลี่ยนชื่อเป็น `switch` (`size` default/sm), `switch-field` (`color` → `error`), `stepper`, `step`, `step-indicator`, `step-check-icon`, `step-loading-icon` (ค่า `orientation`/`state` ตัวพิมพ์เล็ก) และสร้างกรอบเอกสารในหน้า Stepper; โค้ด: `Switch` เป็น 44×24 / 36×20 สี token ของ DS ใหม่ + `SwitchField` (`app/switch-field.tsx`), ใหม่ `Stepper`/`Step`/`StepIndicator` (`ui/stepper.tsx`) และ `Stepper` ใน `patterns` เปลี่ยนไปใช้ตัวใหม่
- ไล่ตรวจความครบของทุกหน้า Figma ที่ทำไปแล้ว (`docs/components/COVERAGE-AUDIT.md`): เพิ่ม `Field orientation="labelStart"` (Figma `input-horizontal`), story Dialog align=center / ไม่มีไอคอน และเมนูแบบเลื่อนได้, ย้ายกรอบ doc ของ Sortable ออกจาก section, แก้ชื่อ prop เก่าในกรอบ doc ของ Button / Checkbox / Chip / Dropdown / Input Field / Menu
- Table (Figma ↔ shadcn, ผู้ใช้ยืนยันตามเสนอ): Figma เปลี่ยนชื่อ `crv-table-head`/`cell`/`tableText-cell`/`scroll-shadow` เป็น `table-head`/`table-cell`/`table-text-cell`/`table-scroll-shadow` (`size` small → sm) และแก้ชื่อใน `Table Doc`; โค้ด: `Table` มี `size`/`striped`, `TableHead` มี `sort`/`sortPosition`/`compact`, `TableCell` ไม่มีเส้นขอบ hover/disabled/striped ตาม token, ใหม่ `TableTextCell`, `TableScrollShadow` และไอคอน `ArrowDownwardFilled`; ลบสิ่งที่ Figma ไม่มี: `TableCaption`, `TableFooter`, สถานะเรียง asc/desc/`onSort` (`TableHead sort` เหลือ left/right); footer ใช้ `TablePagination`, ไม่แตะ BWC Table (Draft)
- Overlay / Modal / Pagination (Figma ↔ shadcn, ชื่อตัดสินใจโดย Claude ตอนผู้ใช้ไม่อยู่): เปลี่ยนชื่อใน Figma เป็น `overlay/sm`, `overlay/md+`, `dialog` (`type` → `align`), `pagination`, `pagination-link`, `pagination-control`, `pagination-rows`, `pagination-summary` และผูกสี 111 จุดของ Pagination จาก library เก่า; โค้ด: Dialog/Sheet overlay ใช้ `--cds-overlay-backdrop` (ดำ 40% ไม่เบลอ), Dialog มุม 16 + เงา 2xl + ส่วนหัว/ส่วนท้ายตาม Figma (`DialogHeader align icon`, `DialogBody`), Pagination ปุ่มกลม 32px หน้าปัจจุบันพื้นน้ำเงิน + `PaginationFirst/Last/Summary/Rows` และ `TablePagination` ใหม่ · เพิ่มกรอบเอกสาร (Documentation Card) ในหน้า Pagination ของ Figma
- Rating / Sidebar / Sortable (Figma ↔ shadcn, ผู้ใช้ยืนยันตามเสนอ): Figma เปลี่ยนชื่อเป็น `rating`, `rating-star`, `sidebar`, `sidebar-menu-item` (`expandable`), `sidebar-rail`, `sidebar-rail-item` (`state`), `sortable`, `sortable-item`, `sortable-handle` และสร้างกรอบเอกสารในหน้า Sidebar กับ Sortable; โค้ด: Sidebar กว้าง 240 พื้นขาว ปุ่มเมนูสูง 40 มุม 12 รายการย่อยมีเส้นข้าง 2px ใช้ token `--cds-*`, ใหม่ `AppSidebar` (`app/app-sidebar.tsx` sidebar ประกอบเสร็จ), `SidebarIconRail`/`SidebarIconRailItem` (`app/sidebar-rail.tsx`), ใหม่ `Sortable`/`SortableItem`/`SortableHandle` (`ui/sortable.tsx`, เพิ่ม `@dnd-kit/core`, `sortable`, `utilities`) และไอคอน `DragIndicatorRounded`
- ผู้ใช้ล้าง Ready for dev ใน Figma "Cariva Core Design System" ครบ 53 โหนด และเปลี่ยนต้นทาง Figma จาก "[Shadcn] Cariva Core Design System" เป็นไฟล์นี้
- `shadcn/tokens.json` ตาม Figma สด: เพิ่ม `on-fill` 7 ตัว (ทุกตัวสีขาว) `content/secondary` เคยเป็น Slate 500 ชั่วคราว ผู้ใช้ยืนยันเมื่อ 26 พฤศจิกายน 2026 ว่าต้องเป็น Slate 700 จึงเปลี่ยนตัวแปรใน Figma และ tokens.json กลับเป็น Slate 700 (`#334155`)
- นำ `workflow-map.md` (flow S/U/C/F/D/V/H) เข้า `shadcn/rules/` โดยรักษากฎเดิม เพิ่มตารางชื่อ component `docs/components/FIGMA-NAMING.md` และลำดับอ้างอิงเมื่อไม่มี component (Core → shadcn/ui → ReUI)
- ติดตั้ง skill `mermaid-diagrams` และ `unslop` ใน `.agents/skills/` (เฉพาะคำสั่งและเอกสารอ้างอิง ไม่เอา scripts) และเพิ่มกฎวาด flow ด้วย `artifact-diagramming`
- แก้ `agent-rules.md` ที่ล้าสมัย (path, หน้าที่ลบแล้ว, ข้อความรอง Slate 500, กฎ branch)

---

## v1.4.1 — 2026-10-26

### 🐛 `CrvTextArea` — ลากตัวชี้หดต่ำกว่า `minRows` ไม่ได้อีกต่อไป

- **ปัญหา** — กรอบ (`OutlinedInput`) มี `minHeight` 120/104 แต่ `<textarea>` ข้างในไม่มี เวลาลากตัวชี้มุมล่างขวาขึ้นบน textarea หดเหลือ ~16px ขณะที่กรอบยังสูงเท่าเดิม ตัวชี้จึงลอยไปอยู่กลางกรอบ
- **Code** — ตั้ง `min-height` ของ textarea = `minRows × line-height` (medium 24px, small 20px; ค่าเริ่มต้น 4 บรรทัด) ใน `CrvTextArea.tsx` · ไม่แตะ textarea ที่ MUI ซ่อนไว้วัดความสูง (`aria-hidden`) และไม่กระทบ `sx` ของ consumer
- เพิ่ม test ยืนยัน style (jsdom ไม่มี layout จึงทดสอบการลากจริงไม่ได้)
- ตรวจแล้ว: ไม่มี component อื่นใน `code/core` ที่ตั้ง `resize` เอง (`CrvInput` multiline ไม่มี drag handle)

---

## v1.4.0 — 2026-09-29

### ✨ `body/medium` และ `body/small` — line-height ลงกริด 4px

- **ปัญหา** — Desktop ใช้ 22 / 18 ซึ่งไม่อยู่บนกริด 4px ทุกครั้งที่วาง body ปนกับ control หรือไอคอนในแถวเดียวกันจะเหลื่อม 2px แล้วต้องไปชดที่อื่น (เจอกับตัวเองตอนแก้ checkbox: label ต้องมี line box 20px ขณะที่ description เป็น 22) และความสูงคอมโพเนนต์ยังไม่เท่ากันข้าม breakpoint เพราะ Mobile ใช้ 20 / 16 อยู่แล้ว
- **Figma** — `typography/body/medium/line-height` และ `typography/body/small/line-height` โหมด Desktop เป็น **20 / 16** เท่ากับ Mobile · `label/*` ไม่ถูกแตะ (alias ไป `font/leading/*` ตามเดิม)
- **Code** — `typography.lineHeight.body` เป็น `{ large: 24, medium: 20, small: 16 }`
- **`prose/*` คงไว้ที่ 22 / 18 บน Desktop** — เดิม prose กับ body ต่างกันแค่ typeface ตอนนี้ต่างที่ line-height ด้วย: body สำหรับข้อความสั้นใน UI (field, cell, description, helper — ที่ใช้จริงทั้ง 33 ไฟล์เป็นแบบนี้หมด) · prose สำหรับย่อหน้ายาว
- ผลที่ตามมา: description ใน `crv-checkbox-standard` / `-card` / `-group`, `crv-card`, `crv-modal` และ cell ใน `crv-table` เตี้ยลง 2px ต่อบรรทัด · ปุ่มและ field ไม่ขยับเพราะความสูงมาจาก token ของตัวเอง
- อัปเดต doc: `rules/DESIGN.md` (ตาราง typography + หัวข้อ Prose)

---

## v1.3.9 — 2026-09-28

### ✨ `crv-checkbox-card` — component ใหม่ แยกออกจาก checkbox แบบ outlined

- เดิม checkbox แบบการ์ดเป็น `type=outlined` ใน `crv-checkbox-standard` ซึ่งใช้ `labelPlacement` ไม่ได้จริงและทำสีต่างจาก state อื่นลำบาก
- **Figma** — `crv-checkbox-card` (node 6697:362) 10 variants: `checked × state(default|hover|disabled) × color` · padding `spacing/lg` radius `radius/16` gap `spacing/md` · ทั้งใบเป็น hit target
- **Hover** — เปลี่ยนที่ effect ไม่ใช่สี: ยังไม่ติ๊กใช้ `shadow/sm` (ลอยขึ้น) · ติ๊กแล้วใช้ `glow/primary` / `glow/error` (`0 0 4px` 36% สีของตัวเอง วาดหลัง node) · `disabled` ไม่มี hover
- **Code** — `CrvCheckboxCard` ใหม่พร้อม story/test · เพิ่ม helper `glow()` ใน `theme/shadows.ts` mirror ของ effect style `glow/*` · `crv-checkbox-card.md` + `CrvCheckboxCard.ai.md`

### ✨ `crv-checkbox-base` — เพิ่ม `color=error`

- เดิม `color=error` เปลี่ยนแค่สี label ส่วนกล่อง checkbox ยังเป็นเทาปกติ ทั้งที่ `crv-checkbox-card` ใช้กรอบแดงอยู่แล้ว
- **Figma** — base เป็น 15 variants (เพิ่ม `color=primary|error`): unchecked `status/error/border/strong` · focus `border/error` · checked/indeterminate `status/error/on-surface/default` → focus `.../pressed`
- **Code** — `CrvCheckboxBase` ส่ง `color` ต่อให้ icon และ focus/hover style ครบทุก state · `CrvCheckbox` `color=error` จึงแดงทั้งกล่องและ label
- 🐛 แถมแก้ focus ring ของ primary ที่ผิดมาแต่เดิม — ใช้ `brand/primary/on-surface/default` (#1789fa) ทั้งที่ Figma เป็น `color/border/system` (#2563eb)
- ✨ **focusVisible / hover มี halo** — `glow/primary` · `glow/error` (`0 0 4px` 36% ของสีตัวเอง) วางบน root ของ control ตาม effect style ที่ Figma ใส่ไว้ทั้ง 6 variant · จำเป็นมากกับ `color=error` เพราะลำพังขอบ #ef4444 → #dc2626 มองแทบไม่ออก
- ✨ **hover ใช้หน้าตาเดียวกับ `state=focusVisible`** — base ไม่มี variant `hover` แยกใน Figma (15 variants) แทนที่จะประดิษฐ์สีใหม่ (ของเดิมโค้ดใช้ `border/strong` ที่ไม่มีใน Figma) ตอนนี้ `:hover` กับ `:focus-visible` แชร์กฎเดียวกัน: ยังไม่ติ๊ก → ขอบ `border/system` / `border/error` บนพื้นขาว · ติ๊กแล้ว → พื้น `.../on-surface/pressed` · `disabled` ไม่มี hover

### 🐛 checkbox — จัด control ให้ตรงบรรทัดแรกของ label

- เดิมใช้ `alignSelf` ต่างกันระหว่าง `default` / `groupItem` แล้วชด 1px ที่ label ซึ่งเพี้ยนเมื่อ label ขึ้น 2 บรรทัด
- **Figma** — ทุก variant ของ standard และ card ครอบ control ด้วย line box สูง 20px (`typography/lineHeight/label/medium`)
- **Code** — `getControlSlotSx()` เป็น 16×20 จัดกึ่งกลางแนวตั้ง · ตัด `pt: 1px` และเงื่อนไข `type` ทิ้ง

### 🧹 checkbox — ตัด variant ที่ซ้ำและ prop ที่ไม่ได้ใช้

- **`disabled` กลบ `color`** ทั้งตระกูล — ลบ `disabled=true + color=error` ออกจาก standard (เหลือ 6), group (เหลือ 3), base (เหลือ 15) และ card (เหลือ 10) เพราะ token เหมือน primary ทุกจุด
- `crv-checkbox-standard` ตัด variant `type` ออก — แถว compact คือ `descriptionVisible=false` ไม่ใช่ variant แยก · **ฝั่งโค้ดถอด prop `type` / `CrvCheckboxType` ออกด้วย** (`CrvCheckboxGroup` เปลี่ยนไปส่ง `descriptionVisible={false}`) ⚠️ breaking
- `crv-checkbox-group` ถอด `errorMessage` / `errorMessageVisible` ที่ประกาศไว้แต่ไม่เคยผูกกับเลเยอร์ไหน **ทั้งใน Figma และในโค้ด** (⚠️ breaking — ข้อความ validation ให้วางใต้กลุ่มเองในฟอร์ม) และเพิ่ม `checkBoxSlot` สำหรับแถวที่ 7 ขึ้นไป
- `crv-checkbox-card` variant `state=disabled` — label/description เปลี่ยนเป็น `content/disabled` (เดิมตัวหนังสือยังเข้มปกติทั้งที่กล่องเทา)

### 🐛 `crv-avatar` size=xSmall — 18px → 20px

- ค่าใน code ไม่ตรงกับ Figma มาตั้งแต่ต้น (Figma เป็น 20×20 ทั้ง 6 variant)
- **Code** — `AVATAR_SIZE_PX.xSmall` เป็น 20 · icon padding จึงกลายเป็น 4px ตาม Figma · initials ใช้ label scale ตาม size (large 14/20 · medium 12/16 · small 10/16 · xSmall 10/16) พร้อม padding 8/4/4/2 เดิมใช้ `body/small` ค่าเดียวทุกขนาด
- `crv-chip-action` size=small thumbnail จึงเป็น 20px ตรงกับ Figma

### 🐛 `crv-table-head` `compact=true` — เมิน sort icon และ label

- variant `compact=true` ใน Figma มีเลเยอร์เดียวคือ checkbox slot แต่โค้ดยังวาด sort icon ได้ถ้าส่ง `leftSort` / `rightSort` มา
- **Code** — `compact` ชนะทั้ง `leftSort`, `rightSort` และ `label`

---

## v1.3.8 — 2026-09-21

### ✨ `crv-chip-action` — เพิ่ม variant พื้นขาว

- ชิปวางบนพื้นสีหรือรูปภาพไม่ได้ เพราะ `filled` เป็นเทา/น้ำเงิน ส่วน `outlined` พื้นใส สีพื้นข้างหลังทะลุขึ้นมา
- เพิ่ม `variant=surface` — พื้น `color/on-surface/default` ไม่มีเส้นขอบ ไม่มีเงา (16 variant ใหม่ใน Figma รวมเป็น 48)
- hover/pressed ใช้สีเดียวกับ variant อื่น · `color=primary` ตัวอักษรเป็นสีน้ำเงิน ไม่ใช่ขาว
- อัปเดต doc: `rules/components/crv-chip-action.md`, `CrvChipAction.ai.md`

---

## v1.3.7 — 2026-09-21

### ✨ `crv-menu` — เพิ่ม variant ที่มี scrollbar

- เมนูที่มี item เยอะไม่มีสเปกว่าสูงได้แค่ไหน และไม่มีหน้าตา scrollbar ให้ dev ทำตาม
- **Figma** — `crv-menu` เปลี่ยนจาก single component เป็น component set: `scrollable=false` (สูงตาม item เหมือนเดิม) · `scrollable=true` สูงสุด 6 item = 256px แล้วเลื่อนดู
- **Scrollbar** — thumb กว้าง 6px radius เต็ม สี `color/border/strong` เว้นขอบขวา 4px หัวท้าย 8px ให้ตรง padding ของ list · track โปร่งใส
- **Code** — `crvMenuPaperSx` ใส่ `maxHeight` + `overflowY` + สไตล์ scrollbar (รองรับทั้ง WebKit และ Firefox ผ่าน `scrollbar-color`) → `CrvDropdown` กับ `CrvAutocomplete` ได้ผลนี้อัตโนมัติ ไม่ต้องแก้ที่เรียกใช้
- อัปเดต doc: `rules/components/crv-menu.md`, `CrvMenuItem.ai.md`

---

## v1.3.6 — 2026-09-18

### 🐛 `crv-chip-action` size=small — avatar ใหญ่เท่าตัว chip

- chip small สูง 24px padding 4px แต่ thumbnail ใช้ avatar `size=small` 24px เท่ากับ chip medium → avatar เต็มความสูงและล้น padding
- **Figma** — สลับ `crv-avatar` ใน variant `size=small` ทั้ง 20 ตัวเป็น `size=xSmall` (18px) · chip ยังสูง 24px
- **Code** — `CrvChipAction` เลือกขนาด avatar ตาม size: small → `xSmall` (18px, icon slot 12px) · medium → `small` (24px) เหมือนเดิม
- อัปเดต doc: `rules/components/crv-chip-action.md`, `CrvChipAction.ai.md`

---

## v1.3.5 — 2026-09-18

### ✨ `CrvButtonDecorative` — aurora เร็วขึ้น + label/icon เรืองแสง

- aurora ไหลเร็วขึ้นเท่าตัว: เลเยอร์ 2 ชั้นจาก 6s / 8.5s → **3s / 4.25s** (อัตราส่วนเท่าเดิม จังหวะยังไม่ซ้ำรอบให้เห็น)
- label กับ icon เรืองแสงสี `brand/decorative/gradient/to` — ปกติ glow นุ่ม (text 6px · icon 3px, 70%) · hover เพิ่มชั้น glow แน่นเต็มสี (text 3px + 10px · icon 2px + 5px) ค่อยๆ fade เข้า
- มีเฉพาะตอน animate — `animated={false}`, `disabled` ไม่มี glow · เฟรมหยุดนิ่งยังตรง Figma
- ไม่มีสีใหม่ ใช้ token decorative เดิม

---

## v1.3.4 — 2026-09-17

### 🐛 ปุ่มกว้างไม่เท่า Figma — ขนาดตัวอักษร label ไม่ตาม size

- Figma ผูก label ของปุ่มกับ `typography/label/small|medium|large` ตาม size (12/16 · 14/20 · 16/24) ทุกแบบ — standard, decorative, split, loading
- code เดิม: `CrvButton` ใช้ 16/24 ทุก size · `CrvButtonDecorative` กับ `CrvButtonSplit` ใช้ 14/20 ทุก size → ปุ่มที่ hug เนื้อหากว้างเกินหรือแคบเกิน เช่น Restart (medium) ใน Mira กว้าง 116.7 แทน 108
- เพิ่ม `label` ใน `buttonSizing` แล้วให้ทั้งสามตัวอ่านจากที่เดียว
- `CrvButton variant="outlined"`: stroke ใน Figma อยู่นอก frame ไม่กินพื้นที่ แต่ CSS border กิน 1px ต่อข้าง → หักออกจาก padding ข้าง (16 → 15 บน medium) ให้ความกว้างรวมเท่า Figma
- วัดใน browser (Mira › Voice Recorder): ลบ 36 · Restart 107.9 · Transcribe 133.1 เทียบ Figma 36 · 108 · 133

---

## v1.3.3 — 2026-09-17

### 🐛 `CrvButton` / `CrvButtonDecorative` — icon ห่างจาก label มากกว่า Figma

- Figma เว้นระหว่าง icon กับ label **4 / 8 / 12px** (small / medium / large) ทุกแบบ (standard, decorative, action ของ split) และ code ตั้ง `gap` ถูกแล้ว แต่ MUI แถม margin ให้ช่อง icon อีกชั้น (`margin-right: 8px`, `margin-left: -2px/-4px`) → ของจริงห่าง **12 / 16 / 20px** และ padding ฝั่ง icon เหลือ 10 แทน 12 · size=small ยังโดน MUI บังคับ icon เป็น 18px แทน 16
- ล้าง margin ของ `.MuiButton-startIcon` / `.MuiButton-endIcon` และคุมขนาด icon ให้เป็นของ `buttonSizing` → วัดใน browser แล้ว: gap 4 / 8, icon 16 / 20, padding 12 ตรง Figma
- `CrvButtonSplit` ไม่โดน (จัด layout เอง ไม่ใช้ slot ของ MUI)

---

## v1.3.2 — 2026-09-17

### 🐛 `crv-avatar` content=icon — icon ใน badge=true ใหญ่กว่า badge=false

- **Figma** — variant `content=icon, badge=true` วาง icon (`person`) ลอยนอก `min-width` และใหญ่เกินขนาด: medium 24 (ควรเป็น 20), small 20 (ควรเป็น 16), xSmall 18 (ควรเป็น 12) → ย้ายเข้า `min-width` ให้ layer structure เหมือน `badge=false`, ผูกขนาดกับ `icon/size/*` และจัดกึ่งกลาง · ตอนนี้ต่างกันแค่ badge ที่มุมขวาล่าง
- **Code** — ตาราง icon size ของ `CrvAvatar` ลอกมาจาก variant ที่ผิดนี้ (24/24/20/18) และ icon default render ที่ขนาด glyph แทน slot → แก้เป็น slot **24 / 20 / 16 / 12** · padding **8 / 6 / 4 / 3** เท่ากันทั้งมี/ไม่มี badge
- อัปเดต doc: `rules/components/crv-avatar.md`, `CrvAvatar.ai.md` และ `📄 Avatar Doc` ใน Figma (Sizes & Token Usage)

---

## v1.3.1 — 2026-09-16

### 🐛 Field ที่ผิดมาตั้งแต่ต้น

- **`CrvDropdown` เส้นขอบหายไปด้านบน** — MUI ยก `.MuiOutlinedInput-notchedOutline` (ซึ่งเป็น `<fieldset>`) ขึ้นไป `top: -5px` เพื่อให้ legend ของ notch คร่อมเส้นขอบบนได้ แต่เราตั้ง `overflow: hidden` ไว้ที่ root มันเลย**ตัด 5px บนทิ้งพร้อมเส้นขอบบนทั้งเส้น** เหลือแค่ซ้าย-ขวา-ล่าง (และมุมบนมนๆ ขาดไปด้วย) · เราซ่อน legend อยู่แล้วจึงไม่ต้องยก — ตั้ง `top: 0`
- **`CrvDateTimePicker` ไอคอนท้ายช่องเยื้อง** — Figma (`crv-input-standard`) ให้ Field padding **16 เท่ากันทั้งซ้าย-ขวา** และเว้น **8** ระหว่างข้อความกับไอคอน แต่ของเดิม:
  - padding ขวาเป็น 12 (ซ้าย 16) ไม่สมมาตร
  - ปุ่มเปิด picker มี padding ของตัวเอง 8 → ดันความสูงช่องจาก 48 เป็น **56**
  - MUI ใส่ `edge="end"` ให้ปุ่มนั้น ซึ่งแถม `margin-right: -12px` มาอีก → ไอคอนไปจบที่ **4px** จากขอบ แทนที่จะเป็น 16
  - แก้ครบทั้งสามชั้น และคืนพื้นที่กดให้เป็น 40×40 ด้วย overlay เพื่อไม่ให้ไอคอนขยับ

วัดค่าที่ render จริง: สูง **48** · ข้อความห่างซ้าย **16** · ไอคอนห่างขวา **16** · ระหว่างกัน **8** — ตรงกับ Figma ทั้งสามแบบ (date / time / dateTime)

---

## v1.3.0 — 2026-09-09

### 🏷️ เปลี่ยนชื่อ (มี deprecated alias ให้ ไม่ break ของเดิม)

| เดิม | ใหม่ | เหตุผล |
|---|---|---|
| `crv-stepper-icon` | `crv-stepper-marker` | มันไม่ใช่ icon แล้ว — มีทั้งแบบตัวเลขและแบบ icon คำว่า marker ครอบคลุมทั้งสอง |
| `crv-mobile-stepper` | `crv-stepper-compact` | ชื่อเดิมผูกกับอุปกรณ์ ทั้งที่ใช้ได้ทุกที่ที่พื้นที่จำกัด (dialog, side panel) และ `crv-stepper` มี `smallScreen` จัดการเรื่อง device อยู่แล้ว |
| `CrvStepperIcon` | `CrvStepperMarker` | ตามชื่อ Figma |
| `CrvMobileStepper` | `CrvStepperCompact` | ตามชื่อ Figma |
| `getMobileStepperSx` และเพื่อน | `getStepperCompactSx` ฯลฯ | internal style helper |

`CrvStepperIcon`, `CrvMobileStepper`, `CrvStepperIconProps`, `CrvStepperIconState`, `CrvMobileStepperProps`, `CrvMobileStepperProgressType` ยัง export อยู่ในฐานะ deprecated alias — โค้ดเดิมไม่พัง

### 🔧 ปรับโครงสร้าง

- **รื้อ `crv-stepper-marker` ใหม่ทั้งชุด** — แยกเป็น 2 แกน `content` (`number` / `icon`) × `status` (`Default`, `Active`, `Done`, `Error`, `Warning`, `Info`, `Success`) รวม 14 variants
- **ลบ layer `Ellipse 1` ออกทั้ง 14 variants** — ย้าย fill (พร้อม variable binding) ขึ้นไปที่ frame ของ component เอง ซึ่งมี `cornerRadius: 9999` + `clipsContent` อยู่แล้ว แล้วเปลี่ยนเป็น auto-layout จัดกึ่งกลาง หน้าตาเหมือนเดิมทุก pixel แต่ลด 14 layer และเลิกมีวงกลมสองชั้นซ้อนกัน
- **ล้าง `padding: 7px` ที่ค้างอยู่** ในทั้ง 7 variants ฝั่ง `number` — เป็นค่าค้างที่ไม่มีผล (layoutMode เดิมเป็น `NONE`) และไม่มี 7 ใน spacing scale
- **`crv-stepper-base` ใช้ `crv-stepper-marker` ทั้ง 14 marker** — เดิมเป็น component จาก DS อื่น พร้อม swap glyph ให้ตรง state (Done/Success → `check`, Error → `close`, Warning → `priority-high`, Info → `info`)
- **`crv-stepper` ทั้ง 12 variants ประกอบจาก `crv-stepper-base`** — เดิมปั้นมือด้วย frame + component จาก DS อื่น ตอนนี้เหลือ remote instance 0 ตัว ขนาด set คงเดิม 2078×916 (variant แนวตั้ง 3 ตัวแคบลง 1px ตามขนาดจริงของ base)
- **`crv-stepper-compact` เปลี่ยนมาใช้ `crv-button-standard`** แทนปุ่มจาก DS อื่น ทั้ง 6 ปุ่ม

### 🐛 แก้ bug

- **`Inactive` กับ `Active` เคยหน้าตาเหมือนกันเป๊ะ** — เพิ่ม `status=Active` ให้ `crv-stepper-marker` (พื้น `color/brand/primary/on-surface/muted` เลข `color/brand/primary/on-surface/default`) ตอนนี้แยกออกจาก `Default` ชัดเจน
- **step 2 ใน `crv-stepper` เป็น `Inactive` ผิด 9 variants** และเลข step ค้างเป็น "1" อีก 4 จุด — แก้ให้ทุก variant เป็น Complete → Active(2) → Inactive(3) เหมือนกันหมด

### 🧰 Tooling

- **`npm run tokens:generate` ไม่มีอยู่จริง** ทั้งที่ README, `tokens.ts` และ `generatedPalette.ts` สั่งให้รัน — เพิ่มแล้ว พร้อม `tokens:check`
- **`generate-tokens.js` จะลบ typography ทั้งหมดถ้ามีคนรัน** — มันเขียน `tokens.ts` ใหม่ทั้งไฟล์จาก template ที่ค้างมาตั้งแต่ มิ.ย. (ไม่มี `fontFamily.ui`/`prose`, display scale เก่า, label line-height ผิด) แก้ให้แทนที่เฉพาะ block `colors` ส่วนที่เหลือไม่แตะ
- **`export/cariva-ds-dev-export/` ค้างอยู่ที่ 2026-06-19** — ไม่มี script สร้าง ทำมือครั้งเดียวแล้วไม่มีใคร rebuild อีก เพิ่ม `npm run export:dev` / `export:check` และใส่ใน `pr-checklist`
- **`package.json` ของ DS ถูกเขียนทับด้วยของ `@agent/peer-bridge` เมื่อ 2026-06-26** (`78b5615`) ทำให้ script `test`, `test:run`, `code-connect:dry-run`, `code-connect:publish` หายไป — skill `crv-component-code` สั่งให้รัน `code-connect:publish` ทุกครั้ง แต่มันไม่มีอยู่ กู้คืนแล้ว
- **กู้ `@figma/code-connect` คืนเข้า devDependencies** (`^1.5.3`) — หายไปตอน `package.json` โดนทับ ทั้งที่ `.figma.tsx` 44 ไฟล์ยัง import อยู่
- **ผลตรวจครั้งแรกหลังแก้ทั้งหมด:** `tokens:check` ✅ · `export:check` ✅ · `test:run` ✅ 36 ไฟล์ / 199 test · `typecheck:ds` ❌ 19 error เดิมทั้งหมด ไม่มี error ใหม่จากงานรอบนี้
- **`npm run typecheck` ไม่เคยตรวจ `code/` เลยตั้งแต่วันนั้น** — `tsconfig.json` ก็ถูกเขียนทับเหมือนกัน ตอนนี้ครอบแค่ `src/` ของ peer-bridge เพิ่ม `tsconfig.ds.json` (config เดิมก่อนถูกทับ) + `npm run typecheck:ds` แยกไว้ ไม่แตะของ peer-bridge

### 🆕 Button ที่ขาดไป — ตอนนี้มีในโค้ดครบแล้ว

Figma มี 7 ปุ่ม แต่โค้ดมีแค่ 4 และ 2 ตัวที่มีก็ขาด axis:

- **`CrvButton` เพิ่ม `color="neutral"` และ `variant="elevated"`** — neutral ใช้ได้กับ outlined / text / elevated เท่านั้น (ตรงกับ Figma ที่ไม่มี contained neutral) บังคับด้วย type ไม่ให้เผลอใช้ผิด · elevated = พื้นขาว + เงา `shadow/sm` → hover `shadow/xl` → pressed `shadow/md`
- **`CrvButtonIcon` เพิ่ม `color="neutral"`** ครบทั้ง contained / outlined / ghost
- **`CrvButtonDecorative` (ใหม่)** — ปุ่มไล่เฉดสำหรับ action ของ AI, 3 ขนาด + glow ตอน hover
- **`CrvButtonMic` (ใหม่)** — ปุ่มเลือกไมโครโฟน พร้อมคลื่นเสียง 5 แท่งที่ขยับได้ (เคารพ `prefers-reduced-motion`)
- **`CrvButtonSplit` (ใหม่)** — action หลัก + ปุ่มเปิดตัวเลือกอื่น ใช้พื้นเดียวกันทั้งก้อนตาม Figma (ไม่ใช่ `ButtonGroup` ของ MUI) บังคับใส่ `triggerLabel` เพราะฝั่งขวาไม่มีข้อความ
- ทั้ง 3 ตัวใหม่มีครบชุด: types, styles, stories, test, `.ai.md`, doc ใน `rules/components/` และ Code Connect (ตรวจ dry-run ผ่านแล้วทั้งหมด)
- **เพิ่ม `code/core/theme/shadows.ts`** — เดิมเงาถูก hardcode กระจายตาม component ตอนนี้มี token `shadows.sm|default|md|lg|xl|2xl|inner` ตรงกับ effect style ใน Figma
- **sync token เพิ่ม 6 ตัว**: `color/brand/decorative/gradient/{from,via,to}` และ `color/status/active/*` ซึ่งมีใน Figma แต่ไม่เคยถูก export

### 🔍 ตรวจกับ Figma อีกรอบแล้วเจอ 4 จุดไม่ตรง

- **`CrvButton` ยังไม่มี story ของ `elevated` / `neutral`** — เพิ่มโค้ดแล้วแต่ลืมเปิดให้เห็นใน Storybook เพิ่ม `ElevatedPrimary/Error/Neutral`, `OutlinedNeutral`, `TextNeutral`, ตาราง `ElevatedStates`, `NeutralColor` และใส่ตัวเลือกใหม่ใน control panel · `AllVariants` รวม elevated ด้วยแล้ว
- **ไล่เฉดของ `CrvButtonDecorative` ผิดทิศ** — ของเดิมเขียนเป็นวงรีสว่างที่ก้นปุ่ม แต่ Figma ไล่จากน้ำเงินเข้มตรงกลางออกไปสว่างที่ขอบซ้าย-ขวา (ถอดจาก `gradientTransform` ได้เป็นวงรี 50% ของความกว้าง × 129.76% ของความสูง จุดกึ่งกลางปุ่ม) แก้ตามค่าจริง และเพิ่ม `opacity: 0.85` ตอน pressed ตามที่ Figma ทำ
- **เส้นขอบ `standard` ของ toast หนา 2px ทั้งที่ Figma ใช้ 1px** — ทุก variant ใน Figma เป็น 1px เท่ากันหมด แก้แล้วทั้ง status และ notification
- **`color/status/{severity}/border/default` ใน `tokens.json` ไม่ตรงกับ variable จริง** — บันทึกไว้เป็นเฉด `300` แต่ variable ใน Figma alias ไปที่ `100` ทำให้เส้นขอบ toast เข้มกว่าที่ออกแบบไว้มาก แก้เป็นค่าจาก variable จริง (`#fee2e2` / `#fef3c7` / `#e0f2fe` / `#d1fae5`) พร้อมอัปเดต `rules/DESIGN.md`
- **พื้นหลัง `outlined` ของ toast เป็น `transparent` แต่ Figma ใช้ `color/bg/white`** — แก้ให้ตรง ไม่งั้นวางบนพื้นสีเข้มแล้วอ่านไม่ออก

### 📏 สเกลขนาดปุ่ม — รวมไว้ที่เดียว และแก้ที่เพี้ยนมานาน

ไล่เช็คทุก component set ใน Figma แล้วพบว่า **ปุ่มทุกตัวใช้สเกลเดียวกันเป๊ะ** แต่โค้ดจำไว้ผิดมาตลอดและกระจายอยู่ 5 ไฟล์

| Size | สูง | Padding V | Padding H | Gap | Icon |
|---|---|---|---|---|---|
| `small` | 32 | 8 | 12 | 4 | 16 |
| `medium` | **36** | 8 | 16 | 8 | 20 |
| `large` | 48 | 12 | 24 | 12 | 24 |

- **เพิ่ม `code/core/theme/buttonSizing.ts`** เป็นที่เดียวที่เก็บสเกลนี้ — `CrvButton`, `CrvButtonIcon`, `CrvLink`, `CrvButtonDecorative`, `CrvButtonSplit` ดึงไปใช้ทั้งหมด (export ออกจาก `code/core` แล้ว พร้อม `shadows` / `statusShadow` ที่เพิ่มรอบก่อนแต่ลืม export)
- **`medium` สูง 40 มาตลอด ทั้งที่ Figma เป็น 36** — ผิดพร้อมกันทั้ง `CrvButton`, `CrvButtonIcon` และ `CrvLink`
- **padding ซ้าย-ขวาถูก fix ไว้ที่ 16 ทุกขนาด** — ที่จริงต่างกันตามขนาด (12 / 16 / 24) เหมือนที่ padding บน-ล่างต่างกันอยู่แล้ว
- **`gap` ถูก fix ไว้ที่ 8 ทุกขนาด** — ที่จริงเป็น 4 / 8 / 12
- **`small` มี padding บน-ล่าง 4 แทนที่จะเป็น 8** — ทำให้ปุ่มเล็กสูงไม่ถึง 32
- **icon ของปุ่ม small เป็น 20 แทน 16** (`CrvButtonIcon`) และ icon ใน `CrvLink` fix ไว้ที่ 20 ทุกขนาด
- ตรวจค่าที่เบราว์เซอร์คำนวณจริงแล้ว **ทั้ง 5 component ตรงกับ Figma ครบทุกขนาด**
- อัปเดตตารางขนาดใน `rules/components/crv-button-{standard,icon,split}.md`, `crv-link.md` และ `.ai.md` ที่เกี่ยวข้องให้ตรงด้วย

### 🧹 เก็บของค้างใน Figma

- **`crv-button-split` แก้แล้วฝั่ง Figma** — ตรวจครบทั้ง 24 variants: `size=small` frame นอกสูง 32 เท่ากับลูกข้างในแล้ว (เดิม 36 ชนกับ medium) และ padding ของ `trigger` ขนาด medium สมมาตร 8 ทุกด้านแล้ว ตรงกับที่โค้ดเขียนไว้พอดี ไม่ต้องแก้โค้ดเพิ่ม
- **`crv-stepper-desktop` ถูกลบไปแล้ว** — ทั้งหน้า Stepper ไม่เหลือ `padding: 7` หรือ `Ellipse 1` (ที่เหลือคือ `Ellipse 5` ซึ่งเป็นจุด dot ของ `crv-stepper-compact` ตามดีไซน์)
- **`crv-stepper-base` state=Info ตรงกันแล้ว** ทั้ง `text=Left` และ `text=Center` ใช้ `color/status/info/on-surface/default`
- **เงาของ Notification ในโค้ดผิด** — Figma ใช้ `shadow/md` (navy) สำหรับ `filled` และ `shadow/status/notification` (navy โปร่ง 3 ชั้น) สำหรับ `standard` แต่โค้ดย้อมเงาด้วยสี brand ทั้งคู่ · แก้แล้ว พร้อมลบ `statusShadow` ที่เขียนซ้ำไว้ใน `crvToastStyles.ts` ให้ใช้ตัวเดียวจาก `theme/shadows.ts`
- **แก้ doc ของ Toast ใน Figma** — คำอธิบาย `Variant=Outlined` เขียนว่า "ไม่มีพื้น" ทั้งที่จริงใช้ `color/bg/white`, คำอธิบาย `Variant=Standard` ยังเขียนเส้นขอบ 2px และ Do/Don't ยังเรียกตัวเองว่า "alert" ทั้งที่ component นี้คือ Toast (ข้อห้าม "อย่าใช้ alert แทน Toast" จึงขัดกันเอง) เขียนใหม่ทั้งสามจุด

### 🔵 Stepper marker — สีผิดทุก state และขาดไป 5 status

เปิดดูใน Storybook แล้วไม่ตรงกับ Figma เลย ทั้งที่ `rules/components/crv-stepper.md` เขียนค่าที่ถูกไว้ตั้งแต่แรก — โค้ดไม่เคยทำตาม

| status | โค้ดเดิม | Figma |
|---|---|---|
| `default` | พื้น `content/disabled` + เลขสีขาว | พื้น `bg/solid` + เลข `content/secondary` |
| `active` | พื้นน้ำเงินทึบ + เลขขาว (เหมือน done) | พื้น `brand/primary/on-surface/muted` + เลข `brand/primary/on-surface/default` |
| `error` / `warning` / `info` / `success` | **พื้นโปร่งใส** + ไอคอนสีสถานะ | วงกลมทึบสีสถานะ + ไอคอนขาว |

- **`CrvStepperMarker` มีแค่ 2 status จาก 7** และไม่มีแกน `content` เลย — ตอนนี้ตรงกับ Figma 1:1 (`status` 7 ค่า × `content` 2 ค่า = 14 variants) prop `state` เดิมยังใช้ได้ในฐานะ deprecated
- **ไอคอนคนละตัวกับ Figma** — เดิมใช้ `Error` / `WarningAmber` / `Info` / `CheckCircle` ซึ่งเป็น glyph ที่มีวงกลมในตัวอยู่แล้ว เลยกลายเป็นวงกลมซ้อนวงกลม · Figma ใช้ `close`, `priority-high`, `info` (outlined), `check` แบบ rounded วางบนวงกลมสีเปล่าๆ
- พบว่า `content=icon` ใน component set ใส่ `panorama-fish-eye` ไว้เป็น **placeholder** — ไอคอนจริงมาจาก `crv-stepper-base` ที่ swap เข้าไปตาม state บันทึกไว้ใน rules แล้ว โค้ดทำตามโครงนี้ (marker ไม่ผูกไอคอนกับ status เอง)
- Storybook แสดงครบทั้ง 14 variants แล้ว (เดิมมีแค่ 2) · Code Connect map แกนใหม่ครบ ตรวจ parse ผ่าน
- **เพิ่ม `CrvStepper.test.tsx` (16 test)** ล็อกตารางสีไว้ทั้งหมด — drift แบบนี้จะไม่เงียบอีก

### ✏️ Stepper — สี title ของ Inactive และ Optional ที่ไม่เคยถูก style เลย

- **แก้ใน Figma: `state=Inactive` ให้ `Step title` เป็น `color/content/primary`** เท่ากับ state อื่น (เดิมเป็น `content/secondary` ทำให้จางกว่าคำว่า Optional ข้างล่างมันเอง) ตอนนี้ทั้ง 14 variants ใช้สีเดียวกันระหว่าง title กับ Optional เสมอ · sync เข้าโค้ดแล้ว
- **`Optional` ไม่เคยรับ style ที่เขียนไว้เลย** — กฎในโค้ดชี้ไปที่ `.MuiStepLabel-optional` แต่ MUI v7 วางข้อความนั้นเป็น text node เปล่าๆ ไม่มี class ให้จับ ทั้ง block เลยเป็น dead code มาตลอด · ครอบด้วย `<span class="crv-step-optional">` เองแล้ว
- ผลที่ตามมาจากข้อบน: **`Optional` ใช้ขนาดผิด** — เดิมตั้งใจให้เป็น `body/small` (12/18) แต่ Figma ใช้ `caption/caption` (12/16) และ**ไม่มีระยะห่าง**จาก title (โค้ดใส่ margin-top 2px ไว้) ตอนนี้ตรงแล้ว
- **น้ำหนักฟอนต์ของ Step title ผิด** — Figma ใช้ `typography/label/medium` ซึ่งเป็น **Medium (500)** โค้ดใช้ Regular (400)

### ✨ อนิเมชันของ `CrvButtonDecorative` — แสงออโรราไหล

ทำตามแนวคิด "Colorful Buttons" (fluid aurora backdrop) จาก freefrontend แต่**เขียนขึ้นใหม่ด้วย token ของเราเอง** ไม่ได้ก๊อปโค้ดต้นฉบับ และไม่ใช้สีนอกชุด

- เลเยอร์เบลอ 2 ชั้นของ blob วงกลมนุ่มๆ เคลื่อนสวนกันที่ **6s** กับ **8.5s** — คาบไม่หารกันลงตัว จังหวะจึงเหลื่อมกันจนไม่เห็นรอบซ้ำ
- **ใช้แค่ 3 token เดิม** (`brand/decorative/gradient/{from,via,to}`) · วาง blob สีกรมไว้ชั้นล่างสุดเพื่อ**รักษาแกนสีเข้มตาม Figma** ไม่ให้ปุ่มซีดกลายเป็นฟ้าทั้งใบ
- ต้นฉบับใช้ `<div>` 12 ตัว — ของเราอยู่บน pseudo-element 2 ตัวที่ `z-index: -1` ใน stacking context ของปุ่มเอง **ไม่เพิ่ม DOM เลยสักตัว** และตัวอักษรไม่ต้องแย่งลำดับการซ้อน
- **animate เฉพาะ `transform`** อยู่บน compositor ล้วน ไม่มี repaint ต่อเฟรม
- หยุดนิ่งเมื่อ `animated={false}`, `prefers-reduced-motion: reduce` หรือ `disabled` — ทุกกรณีตกกลับไปเป็นไล่เฉดนิ่งตาม Figma เป๊ะ
- เพิ่ม prop `animated` (default `true`) ไว้ปิดตอนหน้าจอแน่นหรือมีปุ่มนี้หลายตัวเรียงกัน
- story ใหม่ `Animated` + test 7 ตัว · **หมายเหตุ: Figma ไม่มีอนิเมชันของ component นี้ เฟรมหยุดนิ่งคือจุดที่สองฝั่งตรงกัน** บันทึกไว้ใน `rules/components/crv-button-decorative.md` แล้ว

### 🔄 Code

- **`CrvToast` เขียนใหม่ให้ตรงกับ `crv-toast-standard` ตัวใหม่** — เดิมเป็น `variant=primary|secondary` + severity 4 แบบ ไม่มี Description และปุ่ม Action ส่วน Code Connect ยังชี้ไป component ที่ถูกลบไปแล้ว
  - `variant`: `filled` | `outlined` | `standard` (ค่าเดิม `primary` / `secondary` ยังใช้ได้ map เป็น `filled` / `standard` และ mark deprecated)
  - `severity`: เพิ่ม `notification` (พื้น/เส้นขอบ neutral + ไอคอน brand)
  - เพิ่ม `title`, `description`, `action` และ `onClose` — ปุ่มปิดจะแสดงเมื่อส่ง `onClose` เท่านั้น และใช้ `CrvButtonIcon` ของ DS แทน `IconButton` ของ MUI
  - ไอคอนตรงกับ Figma: Filled/Outlined ใช้แบบเส้น, Standard ใช้แบบทึบ
  - เงา `shadow/status/*` ทำเป็น box-shadow 3 ชั้นจาก token ของแต่ละ severity
  - Code Connect ชี้ไป node ใหม่ `6413:55828` พร้อม map ครบทุก property
  - เพิ่ม `CrvToast.test.tsx` (19 test) และเขียน story ใหม่ครบ 15 combination
- **เพิ่ม `color/neutral/*` 9 token ลง `tokens.json`** — มีใน Figma มาตลอดแต่ไม่เคยถูก sync ทำให้เขียนสี Notification โดยไม่ hardcode ไม่ได้

### 🎨 Icon

- **ไอคอนทั้งไลบรารีเชื่อม Code Connect แล้ว — 1,076 จาก 1,077 ชุด × 5 style** เดิม Dev Mode แสดงไอคอนเป็น instance ที่ไม่มีชื่อ ตอนนี้โชว์เป็น `<ArrowBackRounded />` ตาม style ที่เลือกใน Figma สร้างด้วย `npm run icons:connect` ซึ่งดึงรายชื่อจาก Figma เอง ไอคอนใหม่ไม่ต้อง map มือ ข้ามแค่ `flags` เพราะเป็นชุดธงชาติ ไม่ใช่ไอคอน
- **`chevron-up` / `chevron-down` → `ExpandLess` / `ExpandMore`** เทียบ path แล้วตรงกันทั้ง filled และ rounded — `chevron-down` ถูกใช้ 25 จุดใน Button, Breadcrumb, Accordion, Dropdown
- **เพิ่ม `code/core/icons/`** — ไอคอน 9 ชุด × 5 style ที่ Figma ใช้แต่ MUI ไม่มี: 8 ชุดถูกตัดออกจาก MUI ตั้งแต่ v5 (`eco`, `polymer`, `amp-stories`, `exposure-*`) และ `dock-to-right` ที่มาจาก Material Symbols สร้างจาก vector ใน Figma ด้วย `npm run icons:custom` ใช้ `createSvgIcon` ของ MUI สีตาม `currentColor` เหมือนไอคอนอื่น มี test ครอบทั้ง 45 ตัว
- **`Component 1` / `Component 2` → `picture-in-picture` / `picture-in-picture-alt`** (Design System Owner แก้ใน Figma) — ชุดเดิม style filled/outlined สลับกันระหว่างสองชุด ชุดใหม่ถูกต้องครบ 5 style
- **จัด 4 ชุดให้เข้ากับไลบรารี** — `picture-in-picture`, `picture-in-picture-alt`, `arrow-circle-up`, `dock-to-right` เปิด "Include stroke in layout" ไว้ ทำให้ set ใหญ่กว่าตัวอื่น 2px และสีเส้นประไม่ตรง ตอนนี้ครบ 1,076 ชุดเหมือนกันหมด
- `CrvLink` Code Connect เคยแสดง `startIconVisible` ซึ่งไม่มีใน `CrvLink` ตอนนี้แสดง `startIcon={<ไอคอนจริง />}`; `CrvTableTextCell` และ `CrvDrawer` เคยถูกข้ามตอน publish เพราะมีเงื่อนไขในตัวอย่าง แก้แล้ว; `CrvButton` ชี้ไปที่ section แทน component set มาตั้งแต่ มิ.ย. แก้แล้ว

### 🎨 Token

- **Status border tokens ครบชุด — `color/status/{error,warning,info,success}/border/default|strong`** เดิมมีไม่ครบและไม่เป็นแพทเทิร์นเดียวกัน (error มีแค่ `strong`, info ไม่มีเลย, success/warning มีแค่ `default` แต่ใช้ step 700/600 ซึ่งเข้มเท่าพื้นทึบ) ตอนนี้ตามแพทเทิร์นเดียวกับ border ตระกูลอื่นทั้งหมด: `default` = hue/300, `strong` = hue/500 ตั้ง scope เป็น stroke อย่างเดียว
  - เปลี่ยนค่า 2 ตัว: `success/border/default` emerald/700 → **emerald/300**, `warning/border/default` amber/600 → **amber/300** — ตรวจทั้งไฟล์ Figma และโค้ดแล้ว ไม่มีที่ไหนใช้สองตัวนี้
  - `error/border/strong` (red/500) มีใน Figma มาตลอดแต่ไม่เคยถูก sync ลง `tokens.json` — เพิ่มแล้ว
  - แก้กฎข้อ 7 ใน `rules/DESIGN.md` ที่เคยห้ามสร้าง status border token (Design System Owner อนุมัติ)
- **Effect style ใหม่ `shadow/status/{error,warning,info,success,notification}`** — เงานุ่ม 3 ชั้น (y 8/−2/2, blur 8/8/4, spread 0/2/0, 6%/4%/12%) สีตาม `status/*/on-surface/default`; `notification` ใช้สีฐานเดียวกับ `shadow/*` (`#1e3a8a`) ให้เข้ากับพื้น neutral

### 🔔 Alert (แทน `crv-toast-standard` — Figma เท่านั้น ยังไม่มีในโค้ด)

- **ย้าย `<Alert>` (`6413:55828`) จาก MUI kit มาใช้ของ DS ทั้งหมด** — 15 variants: `Severity` (Error, Warning, Info, Success, Notification) × `Variant` (Filled, Outlined, Standard) ไม่เหลือ component, ตัวแปร หรือ style จาก library อื่นเลย
  - ไอคอน → ไลบรารีเรา 24px เทียบรูปทรงกับของเดิมทีละเส้น (warning แบบเส้นใช้ `report-problem` outlined ตามค่า default ของ MUI Alert)
  - ปุ่ม Action → `crv-button-standard` text/neutral/small, ปุ่มปิด → `crv-button-icon` ghost/neutral/small + `close`; ช่องสลับปุ่ม Action รับเฉพาะ `crv-button-standard`
  - สี, เส้นขอบ (`status/*/border/default|strong`), text style `label/large` + `label/medium`, spacing ทั้งหมด, `radius/12`, padding บน-ล่าง `spacing/xs`
  - **เพิ่ม `Severity=Notification`** ตามสีของ toast notification เดิม: ไอคอน/ปุ่มปิด `brand/primary`, พื้นและเส้นขอบเป็น neutral — Filled `bg/white` + `shadow/md`, Outlined `neutral/border/strong`, Standard `neutral/on-surface/subtle` + `neutral/border/default`
- ปุ่มบนพื้นทึบ (Filled) ตั้งสีทับเป็น `content/inverse` เพราะปุ่มใน DS ยังไม่มีสีแบบขาวบนพื้นสี
- **ตั้งชื่อเป็น `crv-toast-standard` แทนตัวเดิม** (Design System Owner ลบตัวเก่า `4165:5387` แล้ว) และอัปเดต `Doc — crv-toast-standard` (เดิมชื่อ `crv-alert-standard`): เนื้อหาใหม่ทั้งหมด, ส่วน Variant เป็น 3 คอลัมน์, ตัวอย่างครบทั้ง 15 variant + ตัวอย่างที่เปิดทุกส่วน, แทนตัวอย่าง 13 ชิ้นที่ยังชี้ไป component ที่ถูกลบ
- แก้ bug ที่เกิดตอนเพิ่ม Notification: variant ที่ก็อปมาไม่ได้ต่อกับ property (toggle Action / ปุ่มปิด / Title / Description และช่องสลับปุ่ม) ตอนนี้ทั้ง 15 variant ต่อเหมือนกันหมด
- ⚠️ **`CrvToast.figma.tsx` ยังชี้ไปที่ `4165:5387` ซึ่งถูกลบแล้ว** — publish Code Connect รอบหน้าจะ fail จนกว่าจะอัปเดตโค้ด `CrvToast` ให้ตรง

### ⚠️ ยังค้าง

- `CrvStepperMarker` ใน code รองรับแค่ `state='default' | 'done'` แต่ Figma มี `status` 7 ค่า + แกน `content` — Code Connect map เฉพาะ `Default` / `Done`
- `crv-stepper-base` `state=Info`: `text=Left` ใช้ `color/brand/primary/on-surface/default` แต่ `text=Center` ใช้ `color/status/info/on-surface/default`
- ~~`crv-stepper-desktop` ยังเป็น instance จาก DS อื่น — เป็นที่เดียวที่เหลือ `padding: 7` (2 จุด) และ `Ellipse 1` (1 จุด) ในหมวด Stepper~~ → **เคลียร์แล้ว 2026-09-16** component ถูกลบออกจาก Figma ทั้งหน้า Stepper ไม่เหลือทั้งสองอย่างแล้ว
- **type error เดิม 19 จุด** ที่ `typecheck:ds` เจอ — ทั้งหมดมีอยู่ก่อนแล้ว (เทียบกับ `d828de9` ตรงกันทุกจุด) ส่วนใหญ่อยู่ใน `*.stories.tsx` เช่น `CrvModal` ขาด prop `open` 5 จุด, `CrvSidebar.stories.tsx` เรียก `colors.bg.page` ที่ไม่มีแล้ว, `CrvTabs.stories.tsx` 2 จุด และ 1 จุดใน `CrvLink.figma.tsx`
- **`CrvStepper` ไม่มี test** — `test:run` ผ่านทั้ง 36 ไฟล์ แต่ไม่มีไฟล์ไหนครอบ Stepper
- **`npm audit` รายงาน 10 ช่องโหว่** (critical 1, high 2) ใน dependency — ยังไม่แก้ เพราะ `audit fix --force` จะอัปเกรดข้าม major version
- **Code Connect ยัง publish/dry-run ไม่ได้** — ต้องมี `FIGMA_ACCESS_TOKEN` ใน `.env.local` ซึ่งยังไม่มีในเครื่อง
- **เวอร์ชัน MUI ขัดกันเอง 3 ที่** — `package.json` `^7.1.0`, `code/core/CLAUDE.md` บอก v9, README ของ export บอก `^6.1.6` และ `@mui/x-date-pickers` ถูกลดจาก `^8.29.0` → `^7.23.3` ตอนโดนทับ ต้องให้ dev ยืนยันว่าใช้เวอร์ชันไหน

---

## v1.2.0 — 2026-09-07

### 🐛 แก้ bug

- **สี icon ในปุ่มทุกตัวผิดทั้งระบบ (Figma)** — VECTOR ข้างใน icon instance ทุกตัว (459 node ใน 7 component set / 288 variants) ถูก bind กับ `color/content/secondary` เหมือนกันหมด ทำให้ icon ขึ้นเป็นสีเทาไม่ว่าปุ่มจะสีอะไร เช่นปุ่ม contained พื้นน้ำเงินได้ลูกศรเทาแทนที่จะเป็นขาว แก้เป็น **icon ใช้ token เดียวกับ `label` ของ variant นั้น** rebind รวม 804 fill ครอบคลุม `crv-button-standard`, `crv-button-icon`, `crv-button-loading`, `crv-link`, `crv-button-decorative`, `crv-button-mic`, `crv-button-split`
  (`crv-button-mic` ยังเป็น `color/content/secondary` — ถูกต้องแล้วเพราะ label ของมันใช้ token นี้)
- **`crv-fab` เป็นบั๊กเดียวกัน** — icon ทั้ง 24 variants bind `color/content/secondary` ทำให้ FAB พื้นน้ำเงินได้ไอคอนเทา FAB ไม่มี label เลยอิงจากสีพื้นแบบเดียวกับ `crv-button-icon`: primary default → `color/content/on-brand`, primary hover/pressed → `color/content/inverse`, neutral ทุก state → `color/neutral/content/default`, disabled → `color/content/disabled`
- **doc และ token ในโค้ดไม่ตรงกับ Figma ตั้งแต่ v1.1.0** — sync ให้ตรงแล้วทั้งหมด:

  | รายการ | เดิม | แก้เป็น (ตาม Figma) |
  |---|---|---|
  | `color/content/secondary` | `#475569` slate/600 | `#64748b` slate/500 |
  | `typography/label/medium` line-height | 22 | 20 |
  | `typography/label/small` line-height | 18 | 16 |
  | `typography/label/xsmall` line-height | 14 | 16 |
  | `typography/display/large` | 64/72 · 40/48 | 60/72 · 48/48 |
  | `typography/display/small` | 40/48 · 32/40 | 36/48 · 30/40 |
  | ชื่อ font-family | `sans` / `serif` | `ui` / `prose` |
  | `typography/prose/*` | ไม่มีในเอกสาร/โค้ด | เพิ่มครบ 3 ขนาด |

  แก้ที่ `rules/DESIGN.md`, `tokens.json`, `code/core/tokens.ts`
  ⚠️ **line-height ของ `label` กระทบทุก component ที่ใช้ label style** (ปุ่ม, tab, chip, menu ฯลฯ) — ค่าเดิมถูกคัดลอกมาจาก `body` โดยไม่ตั้งใจ ควร regression test ก่อน release

### 🆕 เพิ่มใหม่

- **เติมตัวอย่างใน Figma doc ให้ครบ 65 จุด ใน 12 หน้า** — เดิม doc หลายอันอธิบาย variant ไว้แต่ไม่มีตัวอย่างให้ดู
  Progress (16), Toast (8), Tag (7), Button icon neutral (3), Stepper (4), Card (2), Tabs (2), Avatar (1), Switch (1)
  กติกา: ใส่ครบทุกแกนที่เห็นความต่างทางสายตา (variant/color/type/severity) ส่วนแกนตำแหน่ง (`labelPlacement`, `placement`, `breakpoint`) ใส่ตัวแทน 1 อัน
- **เพิ่ม doc section ใหม่ 7 อัน** ให้ component ที่ไม่เคยถูก document เลย พร้อมตัวอย่างจริง — `crv-button-decorative`, `crv-button-mic`, `crv-button-split`, `crv-sidebar-rail`, `crv-checkbox-standard`, `crv-checkbox-group`, `crv-radio-standard`
  ⚠️ ทุก section ยังไม่มี Do/Don't — ใส่ placeholder ไว้ รอ Design System Owner เขียน
- เพิ่ม variant property **`size`** ให้ `crv-tabs-standard-base` (`4724:141435`) — `large` (เดิม) และ `small` (ใหม่) รวม 8 variants
  `small`: สูง 32px · icon 16 · `typography/label/small` (12/16) · padding `spacing/sm` · gap `spacing/xs`
- `CrvTabsStandard` รับ prop **`size?: 'small' | 'large'`** (default `large`) — เดิมไม่มี size เลย
- เพิ่ม `typography.fontFamily.ui` / `.prose` ใน `code/core/tokens.ts` (`.sans` / `.serif` ยังใช้ได้แต่ mark deprecated แล้ว ยังไม่ได้ migrate 101 จุดที่เรียกใช้)

### ✏️ เปลี่ยนแปลง

- `crv-tabs-standard` เปลี่ยนจาก **COMPONENT เดี่ยว → COMPONENT_SET** ที่มี variant `size` เพื่อให้สลับขนาดได้จาก dropdown
  Node ID ของ set คือ **`6086:59`** (variant `size=large` ยังเป็น node เดิม `4838:9365` — instance ที่ใช้อยู่ไม่พัง)
- อัปเดต Code Connect ของ `CrvTabsStandard` ให้ชี้ set ใหม่ พร้อม map `size`

### 📌 ควรรู้ก่อนใช้งาน

- ถ้ามีที่ไหน reference `crv-tabs-standard` ด้วย node id `4838:9365` ให้เปลี่ยนเป็น `6086:59`
- `tabs` ของ `crv-tabs-standard` เป็น **SLOT** — `size` คุมเฉพาะ tab เริ่มต้นที่มากับ component ถ้าใส่ `crv-tabs-standard-base` instance เองต้องตั้ง `size` ที่ instance นั้นด้วย (ยังไม่ได้ทดสอบเคสนี้)
- `size=small` ของ tabs ผูก font-size/line-height กับ variable `typography/label/small/*` ตรงๆ ไม่ได้ใช้ text style เพราะ font `Aktiv Grotesk Thai` โหลดไม่ได้ใน environment ที่แก้ — เลยคง typeface เดิมไว้ให้ตรงกับ `size=large`
- `color/content/secondary` กับ `color/content/placeholder` ตอนนี้เป็นค่าเดียวกัน (`slate/500` `#64748b`) — **ยืนยันแล้วว่าตั้งใจ**
- **เส้นขอบ component set มีมาตรฐานแล้ว** — `#ae00ff` · weight 1 · align OUTSIDE · dash 6/4 (ไม่รวม cornerRadius ซึ่งแต่ละ component ใช้ต่างกันได้) อ้างอิงจาก `crv-button-standard`
  เดิมทั้งไฟล์มี 8 แบบปนกัน ปรับ 21 sets ที่ไม่ตรงแล้ว ตอนนี้ component set ทั้ง 72 อันเหมือนกันหมด (ไม่นับ `Icon/*` 1,076 อันซึ่งเป็นคนละ library)
- **`crv-menu-item` state disabled** — icon เคยค้างที่ `color/content/secondary` ทั้งที่ label เป็น `color/content/disabled` แก้ให้ตรงกันแล้ว 2 variants
  ส่วนอีก 6 variants ที่ icon (`content/secondary`) อ่อนกว่า label (`content/primary`) **ไม่ได้แก้** — เป็น pattern ลดน้ำหนัก leading icon ที่น่าจะตั้งใจ ถ้าไม่ใช่ค่อยแจ้ง

---

## v1.1.0 — 2026-08-31

### 🆕 เพิ่มใหม่
- เพิ่ม text style `typography/prose/large`, `typography/prose/medium`, `typography/prose/small` — ใช้สำหรับเนื้อหาอ่านยาวต่อเนื่อง (ข้อความตอบ AI, บทความ) ขนาด/line-height เท่ากับ `body/*` เป๊ะ ต่างกันแค่ font-family
- เพิ่ม 9 variables รองรับ `prose/*` (`font-size`, `line-height`, `font-weight` × 3 ไซส์)

### ✏️ เปลี่ยนแปลง
- เปลี่ยนชื่อ token `font-family/sans` → **`font-family/ui`**
- เปลี่ยนชื่อ token `font-family/serif` → **`font-family/prose`**
  (ค่าฟอนต์แต่ละ mode เหมือนเดิมทุกอย่าง เปลี่ยนแค่ชื่อให้สื่อความหมายตรงขึ้น)
- แก้ font-family ของ `typography/body/large·medium·small` — เดิมผูกผิดเป็น `prose` แก้เป็น `ui` ให้ถูกต้อง (ดู 🐛 ด้านล่าง)
- ปรับขนาด `typography/display/large`: Desktop 64px → 60px, Mobile 40px → 48px
- ปรับขนาด `typography/display/small`: Desktop 40px → 36px, Mobile 32px → 30px
- ปรับ `typography/label/xsmall` line-height (Mobile): 14px → 16px — ให้ตรง ratio เดิมและปลอดภัยกับสระ/วรรณยุกต์ไทยที่ font-size เล็กสุดในระบบ
- ปรับ `color/content/secondary`: `#475569` → **`#64748b`** — ให้ต่างจาก `content/primary` ชัดเจนขึ้น ยังผ่าน WCAG AA (contrast ~4.76:1)

### 🐛 แก้ bug
- `body/*` text style เคยผูก font-family ผิด (ใช้ `prose` แทน `ui`) ทำให้ **help-text และ placeholder ในทุก input component** (crv-input-standard, crv-input-horizontal, crv-text-area-standard) แสดงผลด้วยฟอนต์ผิด — แก้ไขแล้ว

### 📌 ควรรู้ก่อนใช้งาน
- ถ้ามีที่ไหน reference ชื่อ token `font-family/sans` หรือ `font-family/serif` ตรงๆ (เช่นในโค้ด หรือ plugin อื่น) ต้องเปลี่ยนเป็น `font-family/ui` / `font-family/prose` ตามชื่อใหม่
- ปุ่ม (`crv-button-standard`) ยังมีปัญหาเรื่อง label size ผิด (small/medium ควรเป็น `label/medium` แต่ยังเป็น `label/large`) — ยังแก้ไม่ได้เพราะ font `Aktiv Grotesk Thai` โหลดไม่ได้ใน environment ปัจจุบัน รอตัดสินใจเรื่อง font ต่อ

---

## v1.0.1 — 2026-08-28

### 🐛 แก้ bug

- แก้ `CrvDropdown` — field ขนาด `size="small"`/`size="medium"` ไม่ apply จริง เรนเดอร์เป็นค่า default ของ MUI (สูง 57px, ตัวหนังสือ 16px) ทุกที่ที่ใช้แทนที่จะเป็นขนาดตาม Figma (`small` 38px/14px, `medium` 48px/16px) — สาเหตุคือ MUI `Select` clone `input` element แล้วเอา `sx` ของ `Select` เองทับ `sx` ที่ตั้งไว้บน `<OutlinedInput>` ทั้งก้อน ย้าย style ขนาด/สี/border ทั้งหมดไปรวมไว้ที่ `sx` ของ `Select` แทน
- เช็ค `CrvPagination` (ใช้ `CrvDropdown` ภายใน) แล้ว — ไม่โดนบั๊กเดียวกัน เพราะ customize ผ่าน prop `sx` สาธารณะของ `CrvDropdown` (ลงที่ `FormControl` ไม่ใช่ `Select` โดยตรง)

---

## v1.0.0 — 2026-07-06

### 🆕 Initial Release

**Components**

| Component | หมายเหตุ |
|---|---|
| `crvButton` | Primary action button |
| `crvButtonIcon` | Icon-only button |
| `crvInput` | Text input field |
| `crvCheckbox` | Checkbox input |
| `crvSelect` | Dropdown select |
| `crvTabs` | Tab navigation (Standard) |
| `crvTabsPills` | Tab navigation แบบ pill |
| `crvTabsFolder` | Tab navigation ชั้นนอกสุด |
| `crvTagStandard` | Status/category label |
| `crvAvatar` | User avatar |
| `crvBreadcrumb` | Breadcrumb navigation |
| `crvPagination` | Pagination control |
| `crvSidebar` | Sidebar navigation |
| `crvMenuItem` | Sidebar menu item |
| `crvTableCell` | Table cell |
| `crvTableHead` | Table header cell |
| `crvCard` | Content card container |
