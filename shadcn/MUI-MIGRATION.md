# MUI import — 24 พฤศจิกายน 2026

นำ Core จาก `/Users/natthaphorna/Cariva DS` มาเป็นฐานชั่วคราวใน workspace นี้ตามคำสั่งผู้ใช้ ระหว่างตกลง stack กับ Dev ไม่ได้ย้ายกลับไปทำงานใน repository เก่า และไม่ได้แก้ต้นฉบับ

## นำเข้ามาแล้ว

- `code/core` เดิม 407 ไฟล์ ครอบคลุม component 47 โฟลเดอร์, theme, tokens, icons, stories, unit tests, เอกสารและ Code Connect
- `tokens.json`, `figma.config.json`, `code-connect/` และ token generator
- เก็บ specs เดิมใน `design-references/mui/rules` และ package metadata ต้นฉบับ รวม manifest ที่บันทึก SHA-256 ของไฟล์ก่อนปรับ
- ใช้ MUI 7.3.11, icons 7.3.11, date pickers 7.29.4, Emotion และ fonts ตาม dependencies ที่ต้นฉบับติดตั้งจริง
- คง React 19, Vite 8 และ Storybook 10 ของ workspace ปลายทาง ไม่ย้าย peer-bridge, secrets, node_modules หรือ config Storybook 8

## ปรับเฉพาะการเชื่อมต่อ

- Story imports เปลี่ยนเป็น `@storybook/react-vite`
- แก้ callback arguments ของ checkbox/radio ใน stories, type ของ ModalDemo และ token ที่ไม่มีจริงใน Sidebar story (`bg.page` → `bg.subtle`)
- React 19: ใช้ JSX type import และไม่ส่ง ref แบบ unknown ผ่าน props ของ SwitchBase
- จำกัด return type ของ style helpers Table/Tabs ให้ตรงกับ callback ที่คืนจริง เพื่อใช้ประกอบ sx ได้ โดยไม่เปลี่ยน style values
- โหลด MUI theme/fonts ในแอปและ Storybook และ prebundle dependencies เพื่อไม่ให้ test runner reload ระหว่างรัน
- เก็บ `code/core/CLAUDE.md` เดิมเป็น reference ที่ `design-references/mui/CORE-CLAUDE.original.md` เพื่อไม่ให้กฎเก่าทับ AGENTS.md ปัจจุบัน

`code/core/tokens.ts` และ `tokens.json` ยังตรงกับไฟล์ต้นฉบับ ไม่ได้เปลี่ยน design หรือ API ของ Button

## เปิดใช้งาน

```sh
npm ci
npm run dev
npm run storybook -- --no-open
```

แอปหลักที่พอร์ต 5173 แสดง component MUI จริง ส่วน Storybook พอร์ต 6006 แสดง library เดิมและหน้า Workspace มี Code panel, usage และ implementation source ที่อ่านจากไฟล์จริง

งานทดลองเดิมยังอยู่ครบ เปิดแยกด้วย `npm run dev:experiments` ที่พอร์ต 5174 และ `npm run storybook:experiments` ที่พอร์ต 6007 ไม่ใช้เป็น Core หลัก

## ผลตรวจ

- `npm run build`: ผ่าน รวม typecheck source และ stories ของ MUI
- `npm run build-storybook`: ผ่าน
- `npm run tokens:check`: ผ่าน
- `npm run lint`: ผ่าน โดยยังมีคำเตือน Fast Refresh เดิม
- Storybook rendering/interaction: ผ่าน 312 stories รวมสาม stories ใหม่ของหน้า migration
- ตรวจภาพหน้า desktop, mobile 390px และ modal; ไม่พบ JavaScript error หรือหน้าล้นบนหน้าที่ตรวจ ข้อความหน้า preview ที่ตรวจไม่ต่ำกว่า 12px
- ทดสอบเปิด modal ด้วย Enter, ยืนยัน, Escape และคืน focus รวมถึงเปรียบเทียบขนาด/ฟอนต์/ความโค้งปุ่มหน้าและ modal

## ข้อจำกัดที่ยังค้าง

- Accessibility ยังไม่ผ่าน: runner รายงาน 209 คู่ story/rule ใน 174 stories รวม 11 กลุ่มกฎ เช่น contrast, ชื่อ field/dialog/progress และ table semantics ดูรายการใน `reports/mui-migration/storybook-results.json` ไม่ใช่การรับรองทั้ง library และจำนวนนี้ไม่ใช่จำนวน bug ที่แยกจากกันทั้งหมด
- คง a11y `todo` เดิมไว้ ไม่ลดกฎหรือปิดการตรวจ สี primary `#1789fa` กับขาวมี contrast ประมาณ 3.5:1 ต้องตัดสินใจแก้ design แยกจากงานนำเข้า
- ยังไม่ sync Figma ล่าสุด: Button medium เดิมใช้ metrics 36px, icon 20px และ fixed height ส่วน Figma ล่าสุดต้องการ Hug 40px, icon 24px; ข้อมูล font/mode ใน tokens เก่าอาจต่างจาก Figma ล่าสุดด้วย
- Fonts Aktiv/Malila ต้องใช้ Adobe Fonts ตามสิทธิ์และ config ของทีม; workspace นี้คง fallback เดิมและยังไม่ได้เพิ่มการโหลด remote kit จึงไม่รับรองว่า render ด้วย Aktiv ทุกเครื่อง
- เอกสาร `.ai.md`, specs และ integration เดิมบางส่วนเป็นข้อมูลเก่า มีหัวข้อ/ค่าที่อาจไม่ตรง implementation; หน้า Workspace / Setup and source ระบุขอบเขตที่ตรวจแล้ว ไม่มีการประกาศว่า docs ทุกไฟล์เป็นปัจจุบัน
- เก็บ Code Connect เดิมไว้ แต่ไม่ได้ publish, แก้ mapping บน Figma หรือยืนยัน parity
- Unit tests เดิมถูกเก็บไว้ แต่รอบนี้ใช้ Storybook browser tests เป็นหลัก ยังไม่ได้ตั้ง unit-test runner เดิมใหม่

## จุดสำรองและย้อนกลับ

ก่อนนำเข้าเก็บไฟล์ workspace เดิมไว้ที่ `backups/2026-11-24-before-mui.tar.gz` รวม package/lock/config/source และ symlinks แต่ไม่รวม dependencies, build output หรือ `.git`

หากต้องย้อน ให้แตก archive ลงโฟลเดอร์ว่างก่อน แล้วรัน `npm ci` ในโฟลเดอร์นั้น อย่าแตกทับงานใหม่โดยไม่ตรวจ เพราะ archive ไม่ลบไฟล์ที่เพิ่มภายหลัง การเก็บ snapshot นี้ไม่ใช่การเริ่มเลขเวอร์ชัน DS

ขั้นถัดไป: ตกลง stack กับ Dev แล้วเลือก Button เป็นงาน sync แรกตามทิศทางที่ระบุ พร้อมอัปเดต docs และ audit อีกครั้ง
