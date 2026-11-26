# Storybook component organization

26 พฤศจิกายน 2026 · ผู้ใช้ยืนยันให้ทุก component อยู่ที่เดียวกัน · branch `praew` · ไม่ commit/publish

ทุก component อยู่ใต้ **Core → Components → ชื่อ component**. Primitive, composed examples, variants, states และ docs ของ component เดียวอยู่ใน CSF/Docs เดียวกัน; ไม่ต้องค้นหาใน Patterns หรือ Composed อีก. Foundations, Shadcn catalog และ Workspace/Canvas เป็นภาพรวมและยังแยกไว้.

| ที่เดิม | ที่ปัจจุบัน | Stories |
|---|---|---|
| Components/Card + Patterns/Content Card | Components/Card | 10 รวม Default และ Card ทั้ง5แบบ |
| Components/Checkbox + Patterns/Checkbox | Components/Checkbox | 5 รวม Field/Group/Card |
| Components/Chart + Composed/Trend Chart | Components/Chart | 10 รวม TrendComparison/TrendMissingData |
| Core/Button | Components/Button | 9 และ Source code; คง `core-button` IDs |
| Composed patterns/Steps | Components/Stepper | 1 |
| Composed patterns/Score, MultipleRatings | Components/Rating | 2 |
| Composed patterns/LocalFile | Components/File Upload | 1 |
| Composed patterns/Appointment | Components/Date Time Picker | 1 |

ตรวจ index จริงได้43component groups (39UI modules +4composed components), รวม113storiesทั้ง Storybook. ไม่มี component story ค้างนอก Components. Docs/Source code ของ Button ผูกเข้ากลุ่ม Button แล้ว. Card/Checkbox/Chart ใช้ Docs ของกลุ่มเดิม ทำให้ URL Docs หลักไม่เปลี่ยนและแสดงตัวอย่างเพิ่มในหน้าเดียว.

Story IDs ของตัวอย่างที่ย้ายจาก Patterns/Composed เปลี่ยนตามกลุ่มใหม่; ไม่มี automatic redirect จากลิงก์เก่า. ใช้ Docs หลักของแต่ละ component หรือ sidebarปัจจุบัน. Logs audit เก่าเก็บ IDs เดิมตามเวลาที่ตรวจ ไม่แก้ประวัติหลักฐานย้อนหลัง. โค้ด production components, tokens และ business behavior ไม่ได้เปลี่ยนในงานจัดหมวดนี้.

**Component Audit — Storybook navigation**
ผลรวม: จัดทุกcomponentไว้ใต้ Components และรวมตัวอย่างของ component เดียวกันแล้ว; behavior testsผ่าน32stories
ขอบเขต: CSF/MDX index, Docs render, story moves, import paths, play functions และ build; ไม่ใช่การ auditหน้าตา component ใหม่ทุกตัว

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | Contrast เดิมของ Button, Checkbox, Metric, Rating/Stepper ยังปรากฏใน a11y logs | output/storybook-navigation/storybook-tests.txt | ไม่เปลี่ยนสีในงานจัดหมวด |
| — | ผ่าน |43component groupsอยู่Components; ไม่มี Patterns/Composed/กลุ่ม component ซ้ำ | index.json, sidebar | คงกฎ grouping ใน agent-rules.md |
| — | ผ่าน | Card10/Checkbox5/Chart10รวมDocsเดียว; Button Source codeอยู่Button | index.json และ Docs browser render | ใช้กลุ่มหลักเหล่านี้ |
| — | ผ่าน |32storiesที่ย้ายหรือเกี่ยวข้องผ่านการรัน; play functionsเดิมยังอยู่ | storybook-tests.txt; Trend focused rerun | ไม่ลด assertions |
| — | ผ่าน | build/migration, Storybookbuild, coverage39/39, diffcheckผ่าน | output/storybook-navigation logs | ไม่อ้างcoverageทุกstateจากfilecheck |

สรุป: ผ่าน4, ต้องแก้1กลุ่มเดิม, ตรวจไม่ได้0ใน scope navigation; ไม่อ้างAAผ่านทั้งหมด
ต่อไป: เปิด Card Docs และ review ของหมวดที่จัดใหม่


## Prototype workspace — 2026-11-27

- Run `npm run prototype` in `shadcn/` for the independent Vite host at `http://localhost:5173/?case=catalog` (strict port; do not replace an unrelated server). It runs without Storybook.
- Run `npm run storybook` for `Workspace/Canvas` at port 6006. Its Canvas / Preview selector uses `sync/canvas/frames.prototype.json`; “เปิดเต็มหน้า” opens the matching case on port 5173 without Storybook chrome. Both servers must be running for that link.
- `PrototypePreview.tsx` owns the shared case registry and renderer; Vite App and `Workspace/Prototype` stories use that same renderer. Current cases are existing DS examples (catalog, appointment, form), not new approved Product screens.
- Add actual Product screens to the shared registry and stories, then add verified story IDs and standalone case URLs to the frame catalog. Keep Product implementations in their Product area.
- Mode/case persist in the direct Canvas URL; Storybook shell reload currently initializes Canvas from its configured URL. Form state is local to each rendered frame/preview, not synchronized across modes or hosts. Selecting another case remounts its screen.
- Full-page new-tab preview works independently. Native fullscreen is optional and reports when the browser refuses it. Static Storybook builds retain local prototype URLs; replace them with verified deployment destinations only when deploying is requested.
- The existing component board remains available through `frames.shadcn.json`. No Product/Core API changed.
