---
name: code-to-figma
description: สร้างหรืออัปเดตหน้าจอ Cariva ใน Figma จาก code หรือ Storybook โดยยึด Figma DS ใช้กับหน้าจอที่ระบุ ไม่ใช้แตก prototype เป็น flow หลายสถานะหรือสร้าง DS library
---

# Code to Figma — Cariva screens

ตัวเรียก workflow ระดับหน้าจอของ Cariva ใช้สกิลที่มีอยู่แล้ว ไม่ดูแล implementation ซ้ำ

```text
code-to-figma Patient List source=[path หรือ URL] figma=[target Figma URL]
```

1. อ่าน `shadcn/DESIGN.md`, `shadcn/tokens.json` และ `rules/figma-workflow.md` Part C ซึ่งเป็นที่เก็บกฎ Cariva, source precedence, การ update node เดิม และ completion evidence เพียงแห่งเดียว
2. โหลด `figma:figma-generate-design` จาก catalog ปัจจุบันเพื่อทำ screen construction และโหลด `figma:figma-use` ก่อนเรียก `use_figma` ตามข้อกำหนดของปลั๊กอิน หาก dependency ขาดให้แจ้ง ไม่อ้างว่า sync สำเร็จ
3. ใช้ Part C จำกัด fallback ของ upstream: Code เป็นค่าเริ่มต้นของทิศทาง sync แต่ต้องรักษา API/variables/radius ของ target Figma component เดิม รายงาน conflicts ก่อนเขียนทับ shared DS และตรวจภาพ/bindings

หากขอแตก interaction flow เป็นหลาย state พร้อม annotations ให้ใช้ `prototype-to-figma` และใช้กฎ Cariva ใน Part C เช่นกัน ไม่ต้องรันทั้งสอง pipeline กับหน้าจอเดียวกัน หากขอสร้าง library ให้แยกเป็นงาน DS authoring

แหล่ง upstream: [Figma — figma-generate-design](https://github.com/figma/mcp-server-guide/blob/main/skills/figma-generate-design/SKILL.md); ใช้เวอร์ชันที่ติดตั้งในปลั๊กอินขณะทำงาน
