# Cariva Design System / React + shadcn

Active stack: React19, Vite8, Tailwind4, shadcn Base UI, Storybook10 และ Chart.js

- เริ่มต้นและส่งต่อ Dev: [SHADCN-START](docs/handoff/SHADCN-START.md)
- โครงสร้างจริง, mappings และข้อจำกัด: [SHADCN-MIGRATION](SHADCN-MIGRATION.md)
- กฎดีไซน์: [DESIGN.md](DESIGN.md)
- กฎ AI กลาง: [Shared agent rules](rules/agent-rules.md) โดย [AGENTS.md](AGENTS.md) สำหรับ Codex และ [CLAUDE.md](CLAUDE.md) สำหรับ Claude Code อ่านกฎชุดเดียวกัน
- ลำดับงานสร้าง/แก้ UI: [UI workflow](rules/ui-workflow.md)
- แผนระยะถัดไป: DESIGN-SYSTEM-PLAN.md
- source ที่รัน: src/lib; code/core และ legacy เป็น reference เดิม ไม่ import เข้างานใหม่

`npm run dev` เปิด Lab mock UI; `npm run storybook -- --port 6008` เปิด catalog, Foundations และเคสทดสอบ พร้อม source code

`npm run tokens:generate` หลังแก้ token source; `npm run tokens:check`, `npm run build`, `npm run build-storybook` และ Storybook test-run ก่อนส่งต่องาน


Core ครบ 38 ตัว: [Storybook coverage](docs/architecture/CORE-STORYBOOK-COVERAGE.md). ใช้ `npm run storybook:coverage` ตรวจ story files.

Code Connect config/mappings ของ MUI เก่าย้ายไป `legacy/retired-code-connect/` แล้ว ไม่ใช่ mapping ของ shadcn ปัจจุบัน. Build outputs `dist/` และ `storybook-static/` สร้างใหม่ได้ด้วย build scripts.
