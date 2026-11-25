# Cariva Design System

Design system สำหรับทีม Cariva — ประกอบด้วย tokens, skills, และ rules สำหรับใช้งานร่วมกับ Claude Code

[![Documentation](https://img.shields.io/badge/Documentation-cariva--ds.vercel.app-blue?style=for-the-badge)](https://cariva-ds.vercel.app/)

---

## เริ่มต้นใช้งาน

วาง prompt นี้ใน Claude Code เพื่อติดตั้ง:

```
ช่วยติดตั้ง Cariva Design System จาก repo นี้ให้หน่อย:
https://github.com/PraewNAT/cariva-ds

โดย:
1. ถามฉันก่อนว่าอยากติดตั้งไว้ที่ path ไหน
2. clone repo ไปไว้ที่ path นั้น
3. รัน npm install ในโฟลเดอร์ `shadcn/` (DS ปัจจุบัน)
4. เปิด Claude Code ในโฟลเดอร์นั้น
5. อ่าน CLAUDE.md และบอกฉันว่าต้องทำอะไรต่อ
```

เปิด Claude Code ในโฟลเดอร์ที่ clone มา แล้วอ่าน `CLAUDE.md` ได้เลย

## สร้าง prototype จากหน้าจอใน Figma

สำหรับโปรเจกต์ vibe-code ใหม่ที่ **ไม่ใช่งานของ Cariva DS เอง** (เช่น MIRA) — เติม 3 ช่องแล้ววางใน Claude Code:

```
อ่าน skills/create-project/SKILL.md ให้จบก่อน แล้วค่อยเปิด Figma link นี้

Figma: [วาง link ที่มี node-id]
ชื่อโปรเจกต์: [ชื่อ]
โฟลเดอร์ปลายทาง: [ชื่อโฟลเดอร์ว่างที่แนบไว้ในเซสชันนี้]
```

**เช็ค 3 ข้อนี้ก่อนพิมพ์** ไม่งั้น AI จะหยุดถามกลางทาง:

1. **แนบโฟลเดอร์ว่างเข้าเซสชันด้วย** (กด `+`) แยกจากโฟลเดอร์ `cariva-ds` — AI ห้ามเขียนโปรเจกต์ใหม่ลงในโฟลเดอร์ DS เด็ดขาด ถ้าไม่แนบมาจะหยุดรอทันที
2. **node-id ต้องเป็น frame หน้าจอเต็ม** (เช่น 1440 หรือ 375px) ไม่ใช่ component เดี่ยว — ถ้าเป็น component เดี่ยว AI จะตีความว่าเป็นงานแก้ DS ไม่ใช่โปรเจกต์ใหม่
3. **เปิดไฟล์นั้นค้างไว้ใน Figma Desktop** และติดตั้ง `gh` พร้อม login แล้ว (`brew install gh` + `gh auth login`)

> 💡 AI จะถามยืนยันก่อนสร้าง repo จริงเสมอ ถ้าอยากดูหน้าตาก่อนค่อยตัดสินใจ ให้ตอบว่า **"เดี๋ยวค่อยสร้าง ขอดูผลลัพธ์ก่อน"** — AI จะ scaffold ในเครื่องแล้วเปิด preview ให้ดูโดยยังไม่แตะ git

ถ้าเป็น**เวอร์ชันใหม่ของโปรเจกต์เดิม** ไม่ต้องใช้เทมเพลตนี้ — เปิด Claude Code ในโฟลเดอร์โปรเจกต์นั้นแล้วสั่งงานได้เลย ระบบจะถามเรื่องแท็บเวอร์ชันให้เองตอน commit

### โครงสร้าง

```
cariva-ds/
├── shadcn/        # DS ปัจจุบัน: component, tokens, theme, Storybook (React + shadcn/ui + Tailwind)
├── legacy/mui/    # DS แบบ MUI เดิม เก็บไว้อ้างอิง ไม่พัฒนาต่อ (code, tokens, rules, export)
├── skills/        # AI skills สำหรับ design workflow
├── sync/          # Canvas (กระดาน frame แบบ Figma) และสคริปต์เทียบ Figma กับโค้ด
├── scripts/       # สคริปต์ของ peer bridge และ Code Connect
├── src/           # peer bridge (เครื่องมือสื่อสารระหว่างเครื่อง ไม่เกี่ยวกับ DS)
├── CLAUDE.md      # กฎและ skill definitions
├── CHANGELOG.md   # บันทึกการเปลี่ยนแปลง
└── index.html     # Documentation website (เนื้อหาเดิมของ MUI ยังไม่ได้อัปเดต)
```

รัน Storybook ของ DS: `cd shadcn && npm ci && npm run storybook`
