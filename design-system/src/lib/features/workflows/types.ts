export type Lane = "you" | "ai";
/** do = ทำตามปกติ · ask = AI หยุดรอคุณตอบ · maybe = ทำเฉพาะบางกรณี · unverified = ยังไม่มีเครื่องมือตรวจอัตโนมัติ */
export type Kind = "do" | "ask" | "maybe" | "unverified";

export type Step = {
  id: string;
  lane: Lane;
  /** รหัสขั้นตอนจาก rules/workflow-map.md (ถ้ามี) */
  code?: string;
  /** ข้อความสั้นในกล่อง (ไม่เกินประมาณ 34 ตัวอักษร) */
  label: string;
  /** รายละเอียดที่แสดงใต้รูป */
  detail: string;
  kind?: Kind;
};

export type Back = { from: string; to: string; label: string };

export type Flow = {
  slug: string;
  num: string;
  title: string;
  /** ตัวอย่างประโยคที่สั่ง */
  prompts: string[];
  summary: string;
  steps: Step[];
  /** ลูกศรย้อนกลับเมื่อตรวจไม่ผ่าน (ต้องเป็นขั้นตอนในเลนเดียวกัน) */
  back?: Back[];
  outputs: string[];
  notVerified: string[];
  /** กฎของโปรเจกต์ที่ต้องรู้สำหรับ flow นี้ */
  rules?: string[];
  related?: string[];
};
