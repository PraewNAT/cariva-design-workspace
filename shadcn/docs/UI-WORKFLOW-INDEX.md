# รวม flow การทำงาน UI

บันทึก 25 พฤศจิกายน 2026 ใช้ร่วมกันทั้ง Codex และ Claude รายละเอียดเก็บที่ไฟล์เจ้าของเรื่องเพื่อไม่ให้มีกฎซ้ำหลายชุด

| Flow ที่คุยไว้ | อ่านที่ไหน |
|---|---|
| เริ่มโปรเจกต์ใหม่ ให้ AI ไกด์ทีละขั้น พร้อมโครงคัดลอก | [New project guide](../rules/new-project-guide.md) / [Portable template](../templates/design-prototype-project/README.md) |
| Setup Product ด้วยข้อมูล 4 ช่อง บันทึกแยกและใช้ต่อโดยไม่ถามซ้ำ | [Product setup](../rules/product-setup-flow.md) / [รายการ Product](products/README.md) |
| รับงาน เลือก workspace/Product และเริ่มงาน | [UI workflow](../rules/ui-workflow.md#คู่มือปฏิบัติ-เลือกงานและโปรเจกต์) |
| สร้าง UI ใหม่: เคส → reuse → implement → docs → test → audit | [ขั้น 1–7](../rules/ui-workflow.md) |
| ปรับแก้ บั๊ก refactor ย้อนกลับ ทดลองและพักงาน | [งานปรับแก้](../rules/ui-workflow.md#คู่มือปฏิบัติ-เมื่อมีคำขอปรับแก้) |
| หลาย Product, หลาย repository และแก้ Core ร่วมกัน | [การเลือกโปรเจกต์](../rules/ui-workflow.md#คู่มือปฏิบัติ-เลือกงานและโปรเจกต์) |
| Codex/Claude ทำต่อกัน แบ่งงานและ handoff | [ส่งต่อและสถานะงาน](../rules/ui-workflow.md#บันทึกส่งต่อและสถานะงาน) |
| ตัวอย่างวิธีสั่งและจุดที่ต้องถาม | [ตัวอย่างคำสั่ง](../rules/ui-workflow.md#ตัวอย่างวิธีสั่งงาน) |
| แก้ component ใน Figma แล้วให้โค้ดตาม | [Figma component → Code](../rules/figma-component-to-code-flow.md) |
| นำ component/หน้าจอจากโค้ดไป Figma แยก DS กับ design file | [Code → Design](../rules/code-to-design-flow.md) |
| เปลี่ยน variables ใน Figma และไล่ผลกระทบ | [Variable change flow](../rules/figma-variable-change-flow.md) |
| รับ component จากภายนอกมาปรับให้เข้า DS | [Component adoption](../rules/component-adoption-flow.md) |

กฎหลักอยู่ที่ [Shared agent rules](../rules/agent-rules.md) โดย AGENTS.md และ CLAUDE.md ชี้ไปกฎเดียวกัน Flowchart เป็น Mermaid ใน Markdown พร้อมข้อความขั้นตอนให้อ่านได้แม้ไม่ render เอกสารนี้ไม่ได้เริ่ม implementation, sync, publish หรือสร้าง automation และเรื่อง Login board/URL ยังพักไว้
