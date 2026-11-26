# Code Connect — Figma ↔ shadcn

เชื่อมชุด component ใน Figma (ไฟล์ Cariva Core Design System `XgxprkSY5mGbzIIwlmscCt`) เข้ากับโค้ดใน `shadcn/src/lib/app/components/` ให้ Dev Mode แสดงโค้ดและ import จริงของ DS (เชื่อมครั้งแรก 26 พฤศจิกายน 2026: 37 ไฟล์ 169 mapping หลังตรวจซ้ำรอบสอง ซึ่งเก็บชุดที่ตกหล่นเพิ่ม 20 mapping)

## กฎ

**ทุก component ใหม่ต้องเชื่อม Code Connect ทุกครั้ง** (ผู้ใช้สั่ง 26 พฤศจิกายน 2026) ถ้าเพิ่มหรือเปลี่ยนชื่อชุดใน Figma ที่มีโค้ดคู่กัน ให้เพิ่ม/แก้ไฟล์ `*.figma.tsx` ในโฟลเดอร์นี้ แล้วรันขั้นตอนด้านล่างก่อนบอกว่าเสร็จ ดูกฎเต็มที่ [workflow-map.md](../rules/workflow-map.md)

## วิธีเพิ่ม / แก้ map

1. เปิดไฟล์ของ component นั้น (หรือสร้าง `ชื่อ.figma.tsx`) แล้วเพิ่ม `figma.connect(Component, "<URL ของชุดใน Figma>", { props, example })` ใช้ node id ของ **component set** (ไม่ใช่ instance) ค่า prop และชื่อค่าใน `figma.enum` ต้องตรงกับ Figma ตามตารางใน [FIGMA-NAMING.md](../docs/components/FIGMA-NAMING.md)
2. ตรวจ type: `npx tsc -p shadcn/code-connect/tsconfig.json` (ที่ root ของ repo) ต้องไม่มี error ในโฟลเดอร์นี้
3. จาก **root ของ repo**: `npm run code-connect:parse` (ดูผล parse), `npm run code-connect:dry-run` (ตรวจโดยไม่ส่ง) แล้ว `npm run code-connect:publish`
4. ตรวจใน Dev Mode หรือ `get_code_connect_map` ว่า node ใหม่ขึ้น component/ import ถูกต้อง

ต้องมี `FIGMA_ACCESS_TOKEN` ใน `.env.local` (ผู้ใช้ใส่เอง สคริปต์ `scripts/code-connect.sh` โหลดให้) config อยู่ที่ `figma.config.json` ที่ root (`importPaths` ต้องมีทั้ง `ui/*`, `app/*` และ `products/mira/components/*` เพราะ `*` จับแค่ชื่อไฟล์)

## Visualization

`visualization.figma.tsx` เชื่อมการ์ด `crv-chart-01…25` (25 ชุด) และ `Chart plot / …` (25 ชิ้นส่วน) เข้ากับ `VisualizationChart` โดยใช้ `variant` ตาม `docs/components/VISUALIZATION-MAPPING.json` (เขียนโดยงานฝั่ง ChatGPT) prop `title` เชื่อมกับ text prop `title` ของการ์ด ส่วนข้อมูล (`data`, `series`) เป็นตัวอย่างพื้นฐาน ไม่ผูกกับ Figma และ `viewport` desktop / mobile ไม่ส่งเป็น prop (กราฟปรับตามความกว้างเอง) ชื่อชุดยังเป็น `crv-chart-NN / …` ตามที่งานนั้นกำหนด

## ข้อจำกัดที่รู้

- ค่า `false` ของ prop boolean ไม่ถูกแสดงในตัวอย่าง (Code Connect แสดงเฉพาะ `true`) จึงไม่เห็น `showTopColor={false}`, `progressVisible={false}`, `valueVisible={false}`, `costHintVisible={false}` ตอนที่ Figma ปิดไว้ (ค่าเริ่มต้นในโค้ดเป็น `true`) ถ้าต้องแสดงให้แยก connect ตามค่า (`variant: { ... }`) ตัวอย่าง: `Tooltip` ที่ `placement=none` แยกเป็น `showArrow={false}`
- ส่วนย่อยภายในที่ไม่มี export ของตัวเอง map ไปที่ component แม่: `calendar-day` → `Calendar`, `time-column` / `time-option` → `TimePicker`, `rating-star` → `Rating`, `sheet-content` → `SheetContent side="bottom"`
- ตัวอย่างเป็นการประกอบพื้นฐาน (เช่น `Sidebar`, `Sortable`, `Stepper` ใส่ข้อมูลตัวอย่าง) ไม่ใช่ค่าจริงของหน้านั้น

## ชุด Button แยก

`button-sets.figma.tsx` เชื่อม `button-icon` (`size` lg / default / sm → `icon-lg` / `icon` / `icon-sm`), `button-loading`, `button-link`, `button-decorative` เข้ากับ `Button` ตัวเดียวกัน (เปลี่ยนชื่อชุดและค่าใน Figma แล้ว 26 พ.ย. 2026)

## ยังไม่เชื่อม (ไม่มีโค้ดคู่)

- Button: `crv-button-mic`, `crv-button-split` (โค้ดไม่มี)
- `Component Base` ในหน้า Breadcrumb (ชิ้นส่วนเทมเพลต)

`scrollbar` เชื่อมกับ `ScrollArea` (`orientation`, `track`) และ `separator` กับ `Separator` ใน `misc.figma.tsx`
