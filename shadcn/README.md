# Cariva Design System / React + shadcn

Active stack: React19, Vite8, Tailwind4, shadcn Base UI, Storybook10 และ Chart.js

- เริ่มต้นและส่งต่อ Dev: [SHADCN-START](docs/handoff/SHADCN-START.md)
- โครงสร้างจริง, mappings และข้อจำกัด: [SHADCN-MIGRATION](SHADCN-MIGRATION.md)
- กฎดีไซน์: [DESIGN.md](DESIGN.md)
- กฎ AI กลาง: [Shared agent rules](rules/agent-rules.md) โดย [AGENTS.md](AGENTS.md) สำหรับ Codex และ [CLAUDE.md](CLAUDE.md) สำหรับ Claude Code อ่านกฎชุดเดียวกัน
- ลำดับงานสร้าง/แก้ UI: [UI workflow](rules/ui-workflow.md)
- ลำดับขั้นและจุดตัดสินใจของทุก flow: [Workflow map](rules/workflow-map.md)
- ชื่อ component และ property: Figma ↔ โค้ด: [FIGMA-NAMING](docs/components/FIGMA-NAMING.md)
- Canvas (กระดาน frame แบบ Figma): [sync/README](../sync/README.md)
- แผนระยะถัดไป: DESIGN-SYSTEM-PLAN.md
- source ที่รัน: src/lib; โค้ด MUI เดิมอยู่ที่ `legacy/mui/` ที่รากของ repo เป็น reference ไม่ import เข้างานใหม่

`npm run dev` เปิดหน้าว่างสั้นๆ (ไม่มีหน้า Lab/Dashboard แล้ว); `npm run storybook` (พอร์ต 6006) เปิด catalog, Foundations, component และ Canvas (Workspace/Canvas) พร้อม source code

`npm run tokens:generate` หลังแก้ token source; `npm run tokens:check`, `npm run build`, `npm run build-storybook` และ Storybook test-run ก่อนส่งต่องาน


Core ครบ 38 ตัว: [Storybook coverage](docs/architecture/CORE-STORYBOOK-COVERAGE.md). ใช้ `npm run storybook:coverage` ตรวจ story files.

Code Connect เดิมของ MUI ถูกลบแล้วเมื่อ 26 พฤศจิกายน 2026 (ไฟล์ map 53 ไฟล์, `code-connect/`, `figma.config.json`) Figma ตอบว่าไม่มี mapping ที่ผูกไว้ให้ unpublish (ลอง 90 รายการ ไม่พบทั้งหมด) Code Connect ของ shadcn ยังไม่ได้สร้าง จะทำเป็นขั้นต่อจาก F5 ของแต่ละ component ที่ `shadcn/code-connect/`. Build outputs `dist/` และ `storybook-static/` สร้างใหม่ได้ด้วย build scripts.
