# Design prototype project bootstrap

Copy this folder's contents into a new workspace after checking it has no conflicting instruction files. If rules already exist, merge deliberately rather than overwriting them.

Then ask the AI:

> เริ่มโปรเจกต์ใหม่ อ่านกฎในโปรเจกต์แล้วช่วย setup และไกด์ฉันทีละขั้น

Both entry files use `rules/project-guide.md`. This template includes shared onboarding instructions, DS preparation, UI/revision, Figma-direction workflows, skill/report guidance and an empty Product index: it does not include Cariva code, tokens, links, installed skills, dependencies or MCP connections. The AI will inspect availability and guide configuration as needed. No app is scaffolded or published by copying these files.


## What the AI prepares for each company

After the four-field Product setup, the AI checks whether existing code exists and which implementation base to use (MUI, shadcn, Ant Design, custom or a recommendation). It then guides the first screen/flow and establishes DESIGN.md, required tokens/theme, the necessary subset of components, discoverable component docs, Storybook/examples, mappings and prototype tests/audit incrementally. None of those company-specific artifacts is prefilled or represented as already implemented.

Workflow documents live under rules/. Component documentation may use existing Markdown or Storybook rather than requiring one new Markdown file per primitive. Use this template with any company's approved DS; do not inherit another company's styles or migrate an existing stack automatically.


Setup order: four Product fields → inspect DS/code → confirm code base → prepare visual rules and tokens/theme structure → prepare component/docs/Storybook/mapping scaffolding → summarize readiness/gaps → ask for the first screen/flow as the final setup step. Only then implement the required component subset for that task. Do not ask for the first page before establishing the foundation, and do not build the full library during setup.

## Sharing this kit

Start with `START-HERE.md` for the message to send to another AI, required project inputs and setup order. Use `TASK-HANDOFF.md` for an active task transfer. Include the entire folder so linked rules and the Product index stay together. Do not send historical project plans as current instructions; they can contain cancelled features.

This kit covers read-only multi-frame Storybook Canvas/flows, conditional Figma writes, two representative frame sizes, Core/Product component placement, documentation destinations, audit and case evidence. Company visual rules always come from the destination project. Merge existing entry files rather than replacing them.

## Visual workflow

เริ่มอ่าน [Workflow map](rules/workflow-map.md) มี Mermaid 7 flows พร้อมรหัสขั้น กติกา จุดถาม ทางย้อนแก้ และเกณฑ์จบ ตารางใต้แต่ละภาพเป็น text fallback สำหรับ AI/renderer ที่ไม่แสดง Mermaid ไม่ต้องติดตั้ง Mermaid runtime ลงแอปเพื่ออ่านกฎ
