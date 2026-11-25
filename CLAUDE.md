# Cariva DS — Designer Guide

คุณเป็น AI assistant สำหรับทีมที่ใช้ **Cariva Design System**

อ่านไฟล์เหล่านี้ก่อนทุก session:
- `shadcn/DESIGN.md` — visual principles, token, typography
- `shadcn/tokens.json` — ค่า hex จริงของทุก semantic token (source of truth มาจาก Figma)
- `shadcn/rules/agent-rules.md` — กฎงาน UI ของ DS (shadcn)
- `shadcn/rules/workflow-map.md` — ลำดับขั้นและจุดตัดสินใจของทุก flow (ระบุชื่อ flow และรหัสขั้นก่อนเริ่มงาน)

**โครงของ repo นี้:** `shadcn/` คือ DS ปัจจุบัน (component, tokens, Storybook) · `legacy/mui/` คือ DS แบบ MUI เดิม เก็บไว้อ้างอิงเท่านั้น ไม่เขียนโค้ดใหม่ลงไป · ที่ root เป็นเครื่องมือและเอกสารร่วม (skills, sync, scripts, peer bridge)

---

## Skills ที่ใช้ได้

อ่าน `skills/{skill}/SKILL.md` ก่อนทำงานทุกครั้ง

**🎨 Design System**

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| audit | ตรวจ token binding และ naming ของ component หรือ screen — report ก่อน แล้วถามว่าจะแก้ต่อไหม | `audit [ชื่อ] node-id=[id]` |
| changelog | บันทึกการเปลี่ยนแปลง component หรือ token | `changelog` หรือ `อัปเดต changelog [ชื่อ]` |
| rename-frame | Batch rename screen/page frame ให้ตรง naming convention (`{Flow}/{Screen Name}`) — ยืนยันทั้ง batch ก่อนแก้ | `rename frame [page/section name]` |

**📋 UI Flow & Review**

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| design-review | QA + UI Analysis screen ก่อน handoff dev | `QA screen [ชื่อ] node-id=[id]` |
| map-fix | map Figma component เข้ากับ DS และแก้ให้ตรง | `map [ชื่อ] node-id=[id]` หรือ `แก้ [ชื่อ] node-id=[id]` |
| ux-writing | เช็ค copy, แนะนำ tone, rewrite | `เช็ค copy [node-id]` หรือ `แนะนำ tone` |
| localization-export | ดึงข้อความจาก Figma จัดหมวดหมู่ export/update เป็น Excel สำหรับทีม localization | `export ข้อความ [ชื่อ] node-id=[id]` หรือ `อัปเดต localization [ชื่อ] node-id=[id]` |

**📝 Documentation**

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| document | สร้าง doc สำหรับ component | `สร้าง doc component [ชื่อ] node-id=[id]` |
| document-update | อัปเดต doc เมื่อ component เปลี่ยน | `อัปเดต doc component [ชื่อ] node-id=[id]` |
| doc-coverage | เช็ค coverage ของ DS | `เช็ค doc coverage` |

**💻 Code**

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| shadcn | เพิ่ม/แก้ component ของ DS ด้วย shadcn | `เพิ่ม component [ชื่อ]` |
| crv-component-code | (legacy MUI) เขียน Crv component — ใช้เฉพาะเมื่อสั่งแก้ `legacy/mui/` | `implement component [ชื่อ]` |
| unslop | ขัดหน้าตา UI (ใช้อัตโนมัติกับงานสร้าง/ปรับ UI ภายใต้กฎของ DS เรา) | สั่งงาน UI ได้เลย ไม่ต้องเรียกเอง |
| mermaid-diagrams | เขียนและตรวจ Mermaid เป็นข้อความใน repo | `เขียน flowchart เป็น Mermaid` |
| verify-ds-usage | ตรวจโค้ดว่าใช้ DS จริงหรือ hardcode | `เช็คว่าใช้ component จริงไหม [path]` |
| pr-checklist | รัน checklist ก่อน merge | `เช็ค PR นี้ก่อน merge` |

**🚀 Project Setup**

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| create-project | ตั้งโปรเจกต์ vibe-code ใหม่ — repo ใหม่ถ้ายังไม่มี หรือเพิ่มเป็นกลุ่มโปรเจกต์ใหม่ใน repo เดิมถ้ามี sidebar shell อยู่แล้ว (1 repo เก็บได้หลายโปรเจกต์) + สอนติดตั้ง `gh` ถ้ายังไม่มี | `สร้างโปรเจกต์ใหม่ [ชื่อ]` — **หรือเมื่อ user ส่ง Figma link ที่เป็น page/screen frame มาให้ implement โดยไม่ระบุโปรเจกต์ ก็เข้าข่ายด้วย อ่าน SKILL.md ก่อนเสมอ** |
| add-version-tab | ทำงานอัตโนมัติตอนใกล้ commit ในโปรเจกต์ที่มี sidebar shell — ถามว่าจะขึ้นแท็บเวอร์ชันใหม่หรือแก้ทับของเดิม พร้อมเขียนสรุปการเปลี่ยนแปลง (AI-written) ให้ไอคอนท้ายแท็บใน sidebar | ไม่ต้องเรียกเอง ทำงานร่วมกับจังหวะ commit |

---

## กฎที่ต้องรู้

- **Stack ของ DS ไม่ใช่เรื่องให้เลือก** — Cariva DS คือ **React + shadcn/ui (Base UI) + Tailwind v4** อยู่ที่ `shadcn/` ไม่ใช่ MUI ไม่ใช่ plain CSS (ผู้ใช้สั่งเปลี่ยนจาก MUI เมื่อ 26 พฤศจิกายน 2026)
  - component อยู่ที่ `shadcn/src/lib/app/components/ui/` และ token/theme ที่ `shadcn/src/lib/core/design-system/` — ใช้ของเดิมก่อนเขียนใหม่ ตามกฎใน `shadcn/rules/`
  - **ห้ามเขียนโค้ดใหม่ลงใน `legacy/mui/`** และไม่ใช้ component `Crv*` ของ MUI ในงานใหม่ ถ้าต้องดูสเปกเดิมให้อ่านเป็นอ้างอิงเท่านั้น
  - **ยังไม่มี dev export ของ shadcn** (export เดิมเป็นของ MUI และย้ายไป `legacy/mui/export/` แล้ว) เมื่อเขียนโค้ดนอก repo นี้ ให้คัดลอก component/tokens/theme จาก `shadcn/` และบอก user ว่ายังไม่มี script export
  - **ห้ามถาม user ว่าจะใช้ stack อะไร** — ไม่ใช่ตัวเลือก
  - **ห้ามสร้าง component ซ้ำกับที่ DS มีอยู่** ถ้า DS ไม่มีตัวที่ดีไซน์ต้องการ → สร้างได้แต่ต้องใส่ comment กำกับ แล้วรายงาน user ว่าเป็นช่องว่างของ DS
- **Figma ต้นทางของ DS:** ไฟล์ "Cariva Core Design System" (`XgxprkSY5mGbzIIwlmscCt`) ไม่ใช้ไฟล์ "[Shadcn] Cariva Core Design System" แล้ว
- ห้าม hardcode hex หรือ px — ใช้ token จาก DS กลางเท่านั้น (มี hook ใน `.claude/hooks/` บล็อกให้อัตโนมัติ)
- ถ้าต้องการสีใหม่ → แจ้งทีม DS ก่อน อย่าสร้างเอง
- Figma wins — ถ้า doc ขัดกับ Figma ให้เชื่อ Figma
- **ลำดับงานและจุดตัดสินใจ** อยู่ที่ `shadcn/rules/workflow-map.md` ระบุชื่อ flow และรหัสขั้นปัจจุบันก่อนทำงาน ห้ามข้ามขั้นโดยไม่มีหลักฐาน
- **ไม่มี component ที่ต้องการ** → ค้น Core/Product ของเรา → shadcn/ui ทางการ → ReUI (reui.io/components) เป็นตัวอย่างอ้างอิง แล้วปรับเป็น recipe ของเรา **ถามก่อนรัน `npx shadcn add`** เพราะเพิ่ม dependency
- **เมื่อต้องวาด flow ให้ดีไซเนอร์** → ใช้ skill `artifact-diagramming` วาด swimlane (เลนคุณ/Claude) ดูรายละเอียดใน `shadcn/rules/agent-rules.md` ส่วน Mermaid ใช้เมื่อต้องเก็บเป็นข้อความใน repo
- **อัปเดต `shadcn/tokens.json` ต้องอ่านค่าจาก Figma variable จริงเท่านั้น** (แล้วรัน `npm run tokens:generate` ในโฟลเดอร์ `shadcn/`) — ห้ามเดา ห้ามคำนวณ/ประมาณค่าเอง และห้ามเชื่อ doc frame หรือ node ที่ไม่ใช่ variable collection ตรงๆ (เช่น หน้า documentation ของ component ที่อาจมี variable จากไฟล์อื่นปนอยู่, หรือ doc frame แบบ "AI Readable" ที่เคย verify แล้วพบว่าไม่ตรงกับ live variable) — วิธีที่เชื่อถือได้คือดึงจาก variable collection ตรงๆ (เช่นผ่าน Figma Console MCP's `figma_get_variables` ที่เชื่อมกับ Desktop Bridge plugin ใน Figma Desktop) ถ้าเข้าถึง live variable ไม่ได้ (Bridge ไม่เชื่อมต่อ, ไม่มีสิทธิ์, หา collection ที่ถูกต้องไม่เจอ ฯลฯ) **ให้แจ้งปัญหาให้ user ทราบตรงๆ แล้วหยุดรอ** ห้าม fallback ไปเดาหรือใช้ค่าจาก source ที่ไม่ใช่ live variable โดยไม่บอก

---

## Git & PR Workflow

Designer ไม่ต้องตัดสินใจเรื่อง branch เอง — Claude จัดการให้ทั้งหมด ใช้ศัพท์ git ตามปกติได้ (commit, push, PR, merge)

**ระหว่างทำงาน:**
- แต่ละคนมี branch ของตัวเองอัตโนมัติ ไม่ต้องถามว่าจะตั้งชื่อ branch อะไร หรือจะเปิด/ลบ branch เมื่อไหร่
- Flow นี้ใช้กับ**การแก้ไฟล์ทุกชนิดในโปรเจกต์** ไม่ใช่แค่ component — รวมถึง skill (`skills/**`), `CLAUDE.md`, `rules/**`, `tokens.json`, `index.html`, หรือไฟล์อื่นใดก็ตามที่อยู่ในเครื่อง
- พูดอีกแบบ: **ทุกครั้งที่มีการแก้ไฟล์ ไม่ว่าจะเล็กแค่ไหนหรือเป็นไฟล์ประเภทไหน ให้ทำงานบน branch เสมอ** ห้ามแก้ไฟล์ตรงบน `main` โดยตรง

**ทุกครั้งที่ทำ task เสร็จ 1 ชิ้น (ไม่ว่างานเล็กหรือใหญ่):**
- หยุดถามก่อนเสมอ: **"งานนี้เสร็จแล้วครับ อยาก commit + push เลยไหม?"**
- ห้าม commit/push เองโดยไม่ถาม แม้จะดูเป็นงานเล็กก็ตาม
- ถ้า push แล้วยังไม่มี PR ค้างอยู่ ให้ถามต่อว่าจะเปิด PR เลยไหม หรือรอสะสมงานอื่นก่อน
- ถ้ามี PR ค้างอยู่แล้ว push เข้า branch เดิมจะอัพเดท PR เดิมอัตโนมัติ (ไม่ต้องเปิดใหม่)

**ตอนเปิด/อัพเดท PR:**
- แจ้ง PR link ให้เสมอ
- แปะ preview link (เช่น Vercel) พร้อมสรุปสั้นๆ ว่าทำอะไรไป — นี่คือสิ่งเดียวที่ designer ต้องดูก่อน merge ไม่จำเป็นต้องอ่าน diff/โค้ด

**ทุกครั้งที่กลับมาคุย (ไม่ว่าจะเรื่องอะไร):**
- เช็คสถานะ PR ที่ค้างอยู่ก่อนแบบไม่ต้องรอให้ designer ถาม แล้วแจ้งถ้ามี merge แล้ว
- ถ้า merge แล้ว → sync branch ของ designer กับ main ให้อัตโนมัติ ไม่ต้องถามเรื่องลบ/สร้าง branch ใหม่

**ถ้าเจอ merge conflict:**
- แจ้งตรงๆ ว่ามีคนแก้ไฟล์เดียวกันพร้อมกัน แล้วแก้ให้ ไม่ต้องให้ designer ลงมือแก้เอง

**เช็ค update จาก main ทุกครั้งที่เริ่ม session ใหม่:**
- ทุกครั้งที่เปิด session ใหม่ (ไม่ว่าจะคุยเรื่องอะไรก็ตาม) ให้เช็คว่า `main` มี commit ใหม่ที่ branch ปัจจุบันยังไม่มีหรือไม่ ก่อนเริ่มตอบหรือทำงานอื่น — ไม่ใช่แค่บางจังหวะ (เช่นก่อนเริ่ม task ใหม่ หรือเมื่อ user ถามว่า "มีอัพเดทไหม")
- ถ้ามี → merge `main` เข้า branch ปัจจุบันให้อัตโนมัติ ไม่ต้องถามก่อน (เป็นการอัพเดทให้ทันข้อมูลล่าสุด ไม่ใช่การส่งงาน)
- ถ้าเจอ conflict ระหว่าง merge → แก้ให้เอง แล้วสรุปให้ designer ฟังเป็นภาษาง่ายๆ ว่าแก้อะไรไป ไม่ต้องให้ designer ลงมือแก้เอง
- ถ้า conflict ซับซ้อนจนไม่มั่นใจว่าแก้ถูกต้อง (เช่น เนื้อหาขัดแย้งกันเชิงความหมาย ไม่ใช่แค่โครงสร้างไฟล์) ให้หยุดและถาม designer ก่อนตัดสินใจเอง
- **ไม่ต้องอธิบายกลไก sync/merge/branch ให้ designer ฟัง** — แจ้งแค่ผลลัพธ์สั้นๆ เช่น "อัพเดทงานให้เป็นเวอร์ชันล่าสุดแล้วครับ" หรือถ้าไม่มีอะไรใหม่ก็ไม่ต้องแจ้งเลย ยกเว้นเจอ conflict ที่ต้องถามจริงๆ ค่อยอธิบายด้วยภาษาง่ายๆ ไม่ใช้ศัพท์ merge/branch

**หลักการรวม:** designer มีหน้าที่แค่ 2 อย่าง — (1) ตอบใช่/ไม่ใช่เวลาถูกถามว่าจะ commit/push/เปิด PR ไหม (2) ดู preview แล้วกด merge — ที่เหลือ Claude จัดการให้ทั้งหมด

---

## เมื่อได้รับแจ้งว่า DS อัปเดต

เปิด Claude Code session ใหม่ — AI จะอ่าน `shadcn/tokens.json` ล่าสุดอัตโนมัติ
