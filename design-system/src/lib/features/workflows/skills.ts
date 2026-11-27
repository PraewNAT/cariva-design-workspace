export type Skill = {
  name: string;
  does: string;
  trigger: string;
  steps: string;
  flows: string;
  note?: string;
  /** ใช้ได้กับ DS ไหน */
  scope: string;
  scopeNote?: string;
};

/** สกิลที่เหลือใน repo (12 ตัว) ต้นฉบับคือ .agents/skills/<ชื่อ>/SKILL.md */
export const skills: Skill[] = [
  { name: "create-project", scope: "Product เท่านั้น", scopeNote: "สร้างใน products/ ไม่เขียนลง Core", does: "สร้าง prototype React/shadcn ใน `products/<product>/prototypes/<id>/` พร้อม localhost และ Storybook แบบ Canvas / Preview / เต็มหน้า", trigger: "“สร้างโปรเจกต์ใหม่”, “ทำ prototype จากหน้านี้”", steps: "S4", flows: "06, 08", note: "ไม่สร้าง repo, ไม่ push, ไม่ deploy เอง" },
  { name: "component-reuse-check", scope: "Core + Product", scopeNote: "ค้น Core ก่อน แล้ว Product", does: "ค้น component ที่มีอยู่ (Core → Product) ตรวจของซ้ำ และวางกรณี (ยืนยัน / เสนอ / ยังไม่ชัด) ก่อนสร้างของใหม่", trigger: "“เช็คว่าใช้ component จริงไหม [path]”", steps: "S3, U2, C1, C2, F2, D3", flows: "01, 03, 04, 06, 10, 11, 12, 13", note: "รวมสกิลเดิม case-planning และ verify-ds-usage" },
  { name: "shadcn", scope: "Core + Product", scopeNote: "Core อยู่ที่ ui/ และ app/, Product อยู่ในโฟลเดอร์ของ Product", does: "เพิ่ม/แก้/ค้น component ของ shadcn (Base UI) ให้เข้ากับ DS ของเรา", trigger: "“เพิ่ม component [ชื่อ]”", steps: "U3, C2, C4, F3", flows: "01, 02, 03, 04, 06, 12, 13", note: "ถามก่อนรัน `npx shadcn add` ทุกครั้ง เพราะอาจเพิ่ม dependency" },
  { name: "unslop", scope: "Core + Product", scopeNote: "", does: "ขัดหน้าตา UI ให้ดูมีดีไซน์ (spacing สี ไอคอน) โดย token ฟอนต์ และขนาดของเราชนะเสมอ", trigger: "ไม่ต้องสั่ง ใช้อัตโนมัติเมื่อสร้างหรือปรับ UI", steps: "U3, C4, F3", flows: "01, 02, 03, 04, 06, 14" },
  { name: "emil-design-eng", scope: "Core + Product", scopeNote: "เฉพาะงาน motion", does: "รายละเอียดด้าน motion และความรู้สึกของ UI (animation, micro-interaction)", trigger: "พูดถึง animation หรือความรู้สึกของ UI เช่น “ให้ปุ่มมีออร่าเคลื่อนไหว”", steps: "U3 (เฉพาะงาน motion)", flows: "14" },
  { name: "document", scope: "Core + Product", scopeNote: "เอกสารของ Product แยกไว้ใน docs/products/", does: "สร้างหรืออัปเดตเอกสาร component (Markdown, Storybook, doc ใน Figma) จากโค้ดและสเปกที่ยืนยันแล้ว", trigger: "“สร้าง doc component [ชื่อ] node-id=[id]”, “อัปเดต doc component [ชื่อ]”", steps: "U4, F4, C4, V4", flows: "01, 02, 03, 04, 09, 13", note: "รวมสกิลเดิม document-update" },
  { name: "component-audit", scope: "Core + Product", scopeNote: "", does: "ตรวจคุณภาพ component ในโค้ด: token, state, ความสอดคล้องระหว่างหน้ากับ popup, คีย์บอร์ด, a11y", trigger: "ใช้หลังสร้างหรือแก้ UI ทุกครั้ง; “audit component [ชื่อ]”", steps: "U5, F4, D1, F5, V4", flows: "01–07, 10–14", note: "รายงานรูปแบบเดียวกัน: ผ่าน / ต้องแก้ / ตรวจไม่ได้" },
  { name: "audit", scope: "Figma ทุกไฟล์", scopeNote: "ไฟล์ DS กลาง (Core), ไฟล์ DS ของ Product และไฟล์หน้าจอ", does: "ตรวจและแก้ Figma: การผูก token และชื่อของ node, QA หน้าจอก่อนส่ง dev, จับคู่ component กับ DS แล้วแก้ให้ตรง", trigger: "“audit [ชื่อ] node-id=[id]”, “QA screen [ชื่อ]”, “map [ชื่อ] node-id=[id]”, “แก้ [ชื่อ] node-id=[id]”", steps: "F1, F2, D3, D5, V2", flows: "01, 02, 05, 07, 09, 10", note: "รวมสกิลเดิม design-review และ map-fix; รายงานก่อนแล้วถามก่อนแก้" },
  { name: "code-to-figma", scope: "หน้าจอของ Product", scopeNote: "ไม่ใช่ตัว component ใน Core", does: "สร้างหรืออัปเดตหน้าจอใน Figma จากโค้ดหรือ Storybook โดยใช้ instance ของ component จริง", trigger: "“code-to-figma [หน้า] source=[path] figma=[ลิงก์]”", steps: "D4, D6", flows: "05", note: "ต้องสั่งเท่านั้น ห้ามเขียน Figma เอง" },
  { name: "pr-checklist", scope: "ทั้ง repo", scopeNote: "Core, Product และ docs", does: "ตรวจความพร้อมก่อน merge จาก diff และผลตรวจอื่น พร้อมบันทึก changelog", trigger: "“เช็ค PR นี้ก่อน merge”, “อัปเดต changelog”", steps: "ก่อนเปิด/อัปเดต PR", flows: "10, 11, 15", note: "รวมสกิลเดิม changelog; ไม่ merge ให้" },
  { name: "rename-frame", scope: "หน้าจอของ Product ใน Figma", scopeNote: "ไม่แตะ component หรือ instance", does: "เปลี่ยนชื่อ frame ของหน้าจอใน Figma ให้ตรงรูปแบบ `{Flow}/{Screen Name}` ทั้งชุด", trigger: "“rename frame [หน้า/section]”, “จัดชื่อ frame ใน [หน้า]”", steps: "นอก flow หลัก", flows: "—", note: "ยืนยันทั้งชุดก่อนเปลี่ยน; ไม่แตะ component/instance" },
  { name: "localization-export", scope: "ข้อความของ Product", scopeNote: "ต้องระบุชื่อ Product ทุกครั้ง", does: "ดึงข้อความจากหน้าจอใน Figma จัดหมวด และส่งออก/อัปเดตเป็น Excel สำหรับทีม localization (แปลด้วย AI ได้)", trigger: "“export ข้อความ [ชื่อ] node-id=[id]”, “อัปเดต localization [ชื่อ]”", steps: "นอก flow หลัก", flows: "—" },
];

export const removedSkills = [
  "mermaid-diagrams (ผังให้ดีไซเนอร์ใช้ artifact-diagramming; ผังเป็นข้อความเขียน Mermaid ใน Markdown ตรง ๆ), doc-coverage, ux-writing, add-version-tab, crv-component-code (ซ้ำกับ workflow หรือเป็นของเก่า)",
  "prototype-to-figma, impeccable, ui-ux-pro-max (เป็นของนอก repo; ใช้ผ่านปลั๊กอินได้ถ้าติดตั้งไว้)",
  "design-review, map-fix → รวมเข้า audit · changelog → รวมเข้า pr-checklist · case-planning → รวมเข้า component-reuse-check",
];

export const pluginSkills = [
  "figma:figma-design-to-code — Figma → โค้ด (flow 06)",
  "figma:figma-generate-design และ figma:figma-use — เขียน Figma (flow 05)",
  "figma:figma-code-connect — แมป Code Connect (ทุกครั้งที่มี component ใหม่)",
  "artifact-diagramming — วาดผังสองเลนให้ดีไซเนอร์ (เหมือนหน้า Workflows)",
];
