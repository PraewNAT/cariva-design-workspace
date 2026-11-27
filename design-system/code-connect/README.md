# Code Connect — Figma ↔ shadcn

เชื่อม component set ใน Figma (ไฟล์ Cariva Core Design System `XgxprkSY5mGbzIIwlmscCt`) เข้ากับโค้ดใน `design-system/src/lib/app/components/` เพื่อให้ Dev Mode แสดงโค้ดและ import จริงของ DS (เชื่อมครั้งแรกเมื่อ 26 พฤศจิกายน 2026 ส่วน publish ล่าสุดเมื่อ 27 พฤศจิกายน 2026: 38 ไฟล์ 171 mappings)

## กฎ

**component ใหม่ทุกตัวต้องเชื่อมผ่าน Code Connect ทุกครั้ง** (ผู้ใช้สั่งเมื่อ 26 พฤศจิกายน 2026) ถ้าเพิ่มหรือเปลี่ยนชื่อ set ใน Figma ที่มีโค้ดตรงกัน ให้เพิ่มหรือแก้ไฟล์ `*.figma.tsx` ในโฟลเดอร์นี้ แล้วทำตามขั้นตอนด้านล่างให้ครบก่อนบอกว่าเสร็จ ดูกฎฉบับเต็มที่ [workflow-map.md](../rules/workflow-map.md)

## วิธีเพิ่มหรือแก้ map

1. เปิดไฟล์ของ component นั้น (หรือสร้าง `name.figma.tsx`) แล้วเพิ่ม `figma.connect(Component, "<URL ของ set ใน Figma>", { props, example })`
   - ใช้ node id ของ **component set** (ไม่ใช่ instance และไม่ใช่ variant เพราะ Figma จะปฏิเสธ)
   - URL ต้องเขียนเป็นข้อความตรง ๆ parser อ่าน URL ที่ประกอบจากตัวแปรหรือสร้างใน loop ไม่ได้
   - ค่าของ prop และชื่อค่าใน `figma.enum` ต้องตรงกับ Figma ตามตารางใน [FIGMA-NAMING.md](../docs/components/FIGMA-NAMING.md)
2. ตรวจ type: รัน `design-system/node_modules/.bin/tsc -p design-system/code-connect/tsconfig.json` ที่ root ของ repo ต้องไม่มี error ในโฟลเดอร์นี้
3. รันจาก **root ของ repo** ตามลำดับ
   - `npm run code-connect:parse` ดูผลการ parse
   - `npm run code-connect:dry-run` ตรวจโดยยังไม่ส่งขึ้น Figma คำสั่งจะล้มถ้ามีไฟล์ที่ parser อ่านไม่ได้ (`--exit-on-unreadable-files`)
   - `npm run code-connect:publish` ส่งขึ้น Figma (ต้องได้รับอนุญาตก่อน)
4. ตรวจใน Dev Mode หรือใช้ `get_code_connect_map` ว่า node ใหม่แสดง component และ import ถูกต้อง

ต้องมี `FIGMA_ACCESS_TOKEN` ใน `.env.local` (ผู้ใช้เป็นคนใส่เอง script `scripts/code-connect.sh` จะโหลดให้) ค่าตั้งอยู่ที่ `figma.config.json` ที่ root โดย `importPaths` ต้องมี `ui/*`, `app/*` และ `products/mock-mira/components/*` เพราะ `*` จับคู่เฉพาะชื่อไฟล์

### เมื่อ publish แล้วบาง node ถูกข้าม

ถ้า log ขึ้นว่า `already have UI-created Code Connect mappings` แปลว่า node นั้นมี mapping ที่สร้างจากหน้า Figma อยู่แล้ว และ publish จะข้ามไป ให้ตรวจของเดิมก่อน ถ้าตกลงจะแทนที่จึงรัน `npm run code-connect:publish -- --force` การเขียนทับต้องได้รับอนุญาตแยกต่างหาก

## Visualization

`visualization.figma.tsx` เชื่อมการ์ด `crv-chart-01…25` (25 sets) และ `Chart plot / …` (25 parts) เข้ากับ `VisualizationChart` โดยใช้ `variant` ตาม `docs/components/VISUALIZATION-MAPPING.json` (เขียนโดยฝั่ง ChatGPT)

- prop `title` ผูกกับ text prop `title` ของการ์ด
- ข้อมูล (`data`, `series`) เป็นข้อมูลตัวอย่างพื้นฐาน ไม่ได้ผูกกับ Figma
- ไม่ส่ง `viewport` desktop / mobile เป็น prop เพราะกราฟปรับตามความกว้างเอง
- ชื่อ set ยังเป็น `crv-chart-NN / …` ตามที่งานนั้นกำหนดไว้

## ไฟล์ MIRA Component Library (`37MSJL69dK206ouPp4F1xW`)

`mira-library.figma.tsx` เชื่อม set ต่อไปนี้กับโค้ดใน `products/mock-mira/components/`

- `mira-recorder` → `MiraRecorder` (`state` 4 ค่า)
- `crv-card` → `WorkflowCard` (prop ใน Figma ชื่อ `Badge`, `Title`, `Subtitle`, `Icon`, `color`)

เชื่อมเฉพาะระดับ set ไม่เชื่อม variant สีทีละตัว เมื่อ 27 พฤศจิกายน 2026 publish ด้วย `--force` แทน mapping เก่าที่ชี้ไป `src/components/ui/WorkflowCard.tsx` ซึ่งไม่มีอยู่จริง และตรวจแล้วว่า variant ทั้ง 5 สี (`0:109`, `0:115`, `0:121`, `0:131`, `0:141`) แสดง `WorkflowCard` พร้อมสีที่ถูกต้อง

## ข้อจำกัดที่ทราบ

- ตัวอย่างโค้ดไม่แสดงค่า `false` ของ prop แบบ boolean (Code Connect แสดงเฉพาะ `true`) เมื่อปิดค่าใน Figma จึงไม่เห็น `showTopColor={false}`, `progressVisible={false}`, `valueVisible={false}`, `costHintVisible={false}` (ค่าเริ่มต้นในโค้ดคือ `true`) ถ้าจำเป็นต้องแสดง ให้แยก connect ตามค่า (`variant: { ... }`) เช่น `Tooltip` ที่ `placement=none` แยกออกมาเป็น `showArrow={false}`
- ส่วนย่อยภายในที่ไม่มี export ของตัวเองจะ map ไปที่ component แม่: `calendar-day` → `Calendar`, `time-column` / `time-option` → `TimePicker`, `rating-star` → `Rating`, `sheet-content` → `SheetContent side="bottom"`
- ตัวอย่างเป็นการประกอบแบบพื้นฐาน (เช่น `Sidebar`, `Sortable`, `Stepper` ที่ใส่ข้อมูลตัวอย่าง) ไม่ใช่ค่าจริงของหน้านั้น

## Button set ที่แยกกัน

- `button-sets.figma.tsx` เชื่อม `button-icon` (`size` lg / default / sm → `icon-lg` / `icon` / `icon-sm`), `button-loading` (`<Button loading>`), `button-link` และ `button-decorative` เข้ากับ `Button` ตัวเดียวกัน (เปลี่ยนชื่อ set และค่าใน Figma เมื่อ 26 พฤศจิกายน 2026)
- `button-split-mic.figma.tsx` เชื่อม `button-split` และ `button-mic`

## ยังไม่ได้เชื่อม (ไม่มีโค้ดตรงกัน)

- `Component Base` ในหน้า Breadcrumb (เป็นชิ้นส่วนของ template)

`scrollbar` เชื่อมกับ `ScrollArea` (`orientation`, `track`) และ `separator` เชื่อมกับ `Separator` ใน `misc.figma.tsx`
