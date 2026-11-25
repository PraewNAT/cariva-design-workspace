# Figma ↔ Code drift check

เครื่องมือนี้ใช้เทียบ component ใน Figma กับ component ที่ render จริงใน Storybook และรายงานว่าตัวไหนต่างกัน
ระบบตรวจจากค่าที่วัดได้จริงทั้งสองฝั่ง จึงไม่ต้องพึ่งความจำว่าเคยแก้อะไรไปบ้าง

> **หมายเหตุ (26 พ.ย. 2026):** DS เปลี่ยนเป็น shadcn แล้ว (`shadcn/`) สคริปต์เทียบ Figma กับ Storybook (`components.json`, `measure-storybook.js`, `regress-storybook.js`) ยังตั้งค่าไว้สำหรับ Storybook ของ MUI ใน `legacy/mui/` และยังไม่ได้ปรับให้อ่านของ shadcn ส่วน **Canvas** ใช้ได้กับทั้งสองฝั่ง (ฝั่ง shadcn ใช้ `?frames=frames.shadcn`)

สถานะ: **นำร่อง** ตอนนี้ตั้งค่าไว้ 3 ตัว คือ CrvButton, CrvInput และ CrvDropdown

## สิ่งที่เทียบ

เทียบทุก variant ที่ไม่ใช่ hover / pressed / focused ในแต่ละชิ้นส่วนที่ตั้งค่าไว้ (เช่น `box`, `label`, `field`) โดยดูค่าเหล่านี้

- ความสูง, padding, gap, radius
- สีพื้น, สีเส้นขอบ, ความหนาเส้นขอบ
- ตัวอักษร: size, line height, weight, family และสี

**ยังไม่ครอบคลุม:** hover/pressed/focus, shadow, icon, ความกว้างที่ขึ้นกับเนื้อหา, พฤติกรรม (behavior) และ prop ที่ไม่มีผลต่อภาพ

## ไฟล์

| ไฟล์ | หน้าที่ |
|---|---|
| `components.json` | ตั้งค่าต่อ component ได้แก่ Figma node, story, การจับคู่ variant กับ prop (`propMap`), ชิ้นส่วนที่จะวัด (`parts`) และฝั่งที่เป็นต้นฉบับ (`source`) |
| `figma-extract.js` | รันใน Figma ผ่าน figma-console `figma_execute` (อ่านอย่างเดียว) |
| `measure-storybook.js` | รันใน Storybook preview iframe เพื่อวัด DOM ที่ render จริง |
| `server.mjs` | helper ใน local (port 6019) รับผลวัดจาก Storybook มาเขียนลงไฟล์ |
| `compare.mjs` | เทียบสองฝั่ง แล้วเขียน `report.md` และ `report.json` |
| `snapshots/figma.json` | ค่าจาก Figma ณ เวลาที่ดึง |
| `snapshots/code/*.json` | ค่าจาก Storybook ณ เวลาที่วัด |

## วิธีรัน (ให้ Claude รันให้ได้)

1. เปิด Figma Desktop ที่ไฟล์ Cariva Core Design System และเปิด Desktop Bridge plugin ไว้
2. เปิด Storybook: `npm run storybook`
3. เปิด helper: `node sync/server.mjs`
4. Figma: นำ entry จาก `components.json` ไปใส่แทน `__CONFIG__` ใน `figma-extract.js` แล้วรันผ่าน `figma_execute` จากนั้นบันทึกผลลงใน `snapshots/figma.json`
5. Storybook: เปิด `iframe.html` แล้วรัน
   ```js
   const src = await (await fetch('http://localhost:6019/script/measure')).text();
   await new (Object.getPrototypeOf(async function () {}).constructor)('ONLY', src)(['CrvButton']);
   ```
   ควรรันครั้งละไม่กี่ component เพราะแต่ละ variant ต้อง render ใหม่
6. สร้างรายงาน: `node sync/compare.mjs` แล้วเปิดดู `sync/report.md`

## เพิ่ม component

เพิ่ม entry ใน `components.json`

- `nodeId`: ดึงมาจากไฟล์ `*.figma.tsx` (Code Connect)
- `storyId`: ดูได้จาก `http://localhost:6006/index.json`
- `propMap`: จับคู่ Figma variant กับ React prop ใช้ได้ 3 แบบ
  - ระบุชื่อ prop ตรงๆ
  - ระบุ object ต่อค่า variant
  - ใช้ `"$story": "<id>"` เมื่อ story หลักไม่ได้ใช้ arg นั้น
- `parts`: กำหนดชื่อ layer ใน Figma (ใช้ `"."` เมื่อหมายถึงตัว variant เอง) คู่กับ CSS selector ใน DOM ใส่ `text: true` เมื่อเป็นข้อความ, ใส่ `domStroke` เมื่อเส้นขอบอยู่บน element อื่น และใส่ `ignore` เพื่อข้ามค่าที่ไม่ควรเทียบ

## เช็คว่า refactor ไม่ทำให้หน้าตาเปลี่ยน

`regress-storybook.js` เก็บ computed style ของทุก element ในทุก story (ไม่สนชื่อ class, attribute และข้อความ) แล้วสรุปเป็น fingerprint ต่อ story ใช้ก่อนและหลัง refactor ถ้า fingerprint ตรงกันทุก story แปลว่าหน้าตาไม่เปลี่ยน

```js
const src = await (await fetch('http://localhost:6019/script/regress')).text();
new Function('LABEL', 'FILTER', src)('before', '');   // FILTER = prefix ของ story id ถ้าจะรันบางส่วน
// รอจน window.__regress.before.done เป็น true (ทั้งหมดใช้ราว 40 วินาที)
```

ต้องเปิด Browser pane ไว้ระหว่างรัน เพราะหน้าที่ถูกซ่อนจะรันช้ามาก ส่วน story `experiments-cariva-layout-comparison--compare` ได้ผลไม่นิ่ง (ย่อ iframe ตาม `ResizeObserver`) จึงต่างได้โดยไม่ได้แก้อะไร

## การอ่านผล

- **ต่างกัน** หมายถึงพบความต่าง แต่ไม่ได้บอกว่าฝั่งไหนถูก ให้ดู `source` ใน `components.json` ประกอบกับประวัติการแก้ไข
- รายการใน "ต่างกันทุก component" มักเป็นเรื่องระดับ theme หรือ token (เช่น font family) ไม่ได้เป็นปัญหาของ component ใด component หนึ่ง
- **ตรงกัน** หมายถึงตรงกันเฉพาะค่าที่ตรวจตามรายการข้างบน ไม่ใช่การรับประกันทุก state หรือทุก behavior

## Canvas (Figma-style frames)

`node sync/server.mjs` then open http://localhost:6019/canvas (Storybook must run on :6006).
Each frame is a live Storybook story in an iframe on an infinite pan/zoom board.

- Pan: drag the background or hold space · Zoom: ⌘/ctrl + wheel · Move frame: drag its title · Resize: corner grip
- Add: type a story id in the bar and press `+ Frame` (the list autocompletes from `/index.json`)
- Layout lives in `sync/canvas/frames.json` and saves automatically — an AI can edit that file to add or arrange frames

The same board is also a Storybook page (**Canvas/Overview**), served from `/canvas/` via `staticDirs`, so it ships with every Storybook build (e.g. the Vercel preview). There it is read-only; arrange frames locally at `/canvas` on the sync server, then commit `frames.json`.
