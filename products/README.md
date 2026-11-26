# สารบัญ prototype — Cariva Design Workspace

อัปเดต 27 พฤศจิกายน 2026 ยังไม่มี Product prototype ที่ยืนยันแล้ว จึงไม่สร้างรายการ Mira/BWC สมมติ

| Product | Prototype / path | สถานะ | Run จาก workspace root | Local URL | Storybook | Figma | ตรวจล่าสุด |
|---|---|---|---|---|---|---|---|
| Workspace examples (ไม่ใช่ Product) | [DS examples](../design-system/src/lib/features/prototype/PrototypePreview.tsx) | ใช้งาน local; catalog/appointment/form | `npm --prefix design-system run prototype` | http://localhost:5173/?case=catalog | `Workspace/Canvas`, `Workspace/Prototype` บน port 6006 | ไม่มี screen mapping; ใช้ Core examples เดิม | 2026-11-27 |

Product ที่มี DS: [Mira](mira/README.md) — ยังไม่มี prototype

เมื่อเพิ่มงานจริง สร้าง products/<product-id>/prototypes/<prototype-id>/ และเพิ่มแถวพร้อมสถานะจริงตาม [workspace rules](../rules/workspace-structure.md) ไม่เพิ่ม empty app/package เพียงเพื่อให้สารบัญมีรายการ
