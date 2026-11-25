# เริ่มใช้ Cariva Core

1. ติดตั้งด้วย `npm install` ใน workspace นี้ แล้ว `npm run dev` เพื่อดูหน้า Lab หรือ `npm run storybook -- --port 6008` เพื่อดู Core/Foundations/ตัวอย่างเคส
2. Core: `src/lib/app/components/ui`; app compositions: `src/lib/app/components/app`; Product screens: `src/lib/features/<product>/presentation`; token source: `tokens.json`
3. หน้าใหม่ import primitives เช่น `import { Button } from '@/lib/app/components/ui/button'` และ `<Button>บันทึก</Button>`; medium เป็น default40 ไม่ใช่ size=medium แบบ MUI
4. นำ `src/app/globals.css` เข้า entry พร้อม Tailwind4 และ alias @ ไป src; dependencies ที่ต้องใช้ดู package.json และ source imports ไม่ copy node_modules, legacy หรือ board เข้าตัว UI package
5. Product theme ใช้ CSS variables ที่ root และ portal ให้สืบทอดชุดเดียวกัน; backOffice ใช้ data-product=backOffice ที่ document root ในแอปจริงเพื่อให้ modal นอก subtree ได้ radius/theme เดียวกัน
6. ก่อนแก้ Core ค้นหาของเดิม อัปเดต doc/story ที่เกี่ยวข้อง แล้ว audit หน้า+portal+mobile+keyboard และรัน checks ตาม AGENTS.md

ลิงก์ GitHub ยังไม่มี remote ใน workspace นี้ ไม่สร้าง URL ปลอม การส่งต่อเป็น source files + Storybook ก่อน ดู SHADCN-MIGRATION.md สำหรับ breaking API และรายการที่ยังไม่ครบ parity; npm package/registry ภายหลังค่อยตกลงกับ Dev
