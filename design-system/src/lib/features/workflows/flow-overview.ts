import type { Flow } from "./types";

/** ผังรวมแบบสั้น ตั้งแต่สั่งงานจนเปิด PR (ไม่อยู่ในตารางรายการ flow) */
export const overviewFlow: Flow = {
  slug: "end-to-end",
    skills: ["component-reuse-check — ขั้นค้นของที่มี", "shadcn + unslop — ขั้นทำงาน", "document — ขั้นเอกสาร", "component-audit — ขั้นทดสอบ + audit", "figma:figma-code-connect — ขั้นผูก Code Connect (ปลั๊กอิน)", "pr-checklist — ก่อนเปิด PR"],
  num: "00",
  title: "ผังรวม ตั้งแต่สั่งงานจนเปิด PR",
  prompts: ["(งานทุกชนิดในหน้า 01–15 ผ่านลำดับใหญ่นี้เหมือนกัน)"],
  summary: "ภาพรวมแบบสั้นของทุกงาน ส่วนที่ต่างกันคือขั้น “ทำงาน” ซึ่งแต่ละชนิดงานมีรายละเอียดในหน้า 01–15",
  steps: [
    { id: "a", lane: "you", label: "สั่งงาน", detail: "บอกว่าจะทำอะไร เช่น เพิ่ม/แก้ component, ทำหน้าจอ, เปลี่ยน variable ถ้ามีลิงก์ Figma ให้แนบมาด้วย" },
    { id: "b", lane: "ai", label: "อ่านกฎ + ขึ้น branch + ดึง main", detail: "เช็คอัปเดตจาก main ตอนเริ่ม session และทำงานบน branch ของคุณเสมอ ไม่แก้บน `main`" },
    { id: "c", lane: "ai", label: "บอกชื่อ flow + รหัสขั้นตอน", detail: "เช่น “Figma to Code, F1” เพื่อให้คุณรู้ว่าอยู่ตรงไหน" },
    { id: "d", lane: "ai", label: "อ่านข้อมูลจริง + ค้นของที่มี", detail: "อ่าน Figma/โค้ดล่าสุด และค้น Core → Product ก่อนสร้างใหม่" },
    { id: "e", lane: "you", label: "ยืนยันแผน", kind: "ask", detail: "AI สรุปสิ่งที่จะทำ ชื่อ ที่อยู่ (Core/Product) และผลกระทบ แล้วรอคำตอบ เช่น “ยืนยันตามเสนอ”" },
    { id: "f", lane: "ai", label: "ทำงานตามชนิดงาน", detail: "เขียนโค้ด หรือแก้ Figma ตามที่คุณสั่งเท่านั้น (รายละเอียดอยู่ในหน้า 01–15)" },
    { id: "g", lane: "ai", label: "อัปเดต story + เอกสาร", detail: "ทั้ง Storybook, `.md` และข้อความ doc ใน Figma ที่เกี่ยวข้อง" },
    { id: "h", lane: "ai", label: "ทดสอบ + audit", detail: "test, build, token check, วัดค่าเทียบ Figma ถ้าไม่ผ่านจะกลับไปแก้ก่อนส่ง" },
    { id: "i", lane: "ai", label: "ผูก Code Connect", kind: "maybe", detail: "เฉพาะ component ที่มีคู่ใน Figma: โหลด `figma:figma-code-connect` → dry-run → ถามคุณก่อน publish" },
    { id: "j", lane: "ai", label: "รายงานผล + สิ่งที่ตรวจไม่ได้", detail: "แยก ผ่าน / ยังต่าง / ตรวจไม่ได้ พร้อมหลักฐาน" },
    { id: "k", lane: "you", label: "ดูผล: ผ่านหรือขอแก้", kind: "ask", detail: "ขอแก้ → AI กลับไปที่ขั้น “ทำงาน” ด้วยข้อจำกัดเดิม" },
    { id: "l", lane: "ai", label: "ถามว่าจะ commit + push ไหม", detail: "AI ไม่ commit หรือ push เอง" },
    { id: "m", lane: "you", label: "ตอบ commit", kind: "ask", detail: "AI commit บน branch โดยไม่รวมไฟล์ชั่วคราวและไฟล์ลับ" },
    { id: "n", lane: "you", label: "สั่ง push + เปิด PR", kind: "ask", detail: "AI ถามว่าเปิด PR เลยหรือรอสะสมงานก่อน" },
    { id: "o", lane: "ai", label: "push + เปิด PR + ส่งลิงก์ preview", detail: "ส่งลิงก์ PR พร้อมสรุปสั้น ๆ คุณดู preview แล้วกด merge เอง" },
  ],
  back: [{ from: "h", to: "f", label: "ไม่ผ่าน" }],
  outputs: ["PR พร้อมลิงก์ preview และสรุปสั้น", "รายงานผลตรวจที่ระบุสิ่งที่ตรวจไม่ได้"],
  rules: ["อนุมัติหน้าตาไม่ใช่การอนุญาตให้เขียน Figma หรือเผยแพร่", "AI ไม่ merge และไม่เปิด auto-merge ถ้าไม่ได้ขอ"],
  notVerified: ["สถานะ CI และ preview ที่ยังไม่ได้ดึงมาดู", "รายละเอียดเฉพาะชนิดงานอยู่ในหน้า 01–15"],
  related: ["rules/workflow-map.md", "CLAUDE.md (ราก repo)"],
};
