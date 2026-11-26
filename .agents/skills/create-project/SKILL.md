---
name: create-project
description: สร้าง prototype ใหม่ด้วย React/shadcn พร้อม Storybook ที่สลับ Canvas / Preview และเปิดเต็มหน้าได้ ใช้กับทุก Product โดยไม่ scaffold ทับโปรเจกต์เดิม
---

# Create Project — Cariva prototype

ผู้ใช้ยืนยัน 27 พฤศจิกายน 2026: prototype ใหม่ทุกโปรเจกต์ใช้ React + TypeScript + design-system/ui บน Base UI + Tailwind และ Storybook ที่สลับ Canvas / Preview และเปิดเต็มหน้าได้ แทน workflow MUI/Crv เดิม นี่เป็นข้อกำหนดส่งมอบ ไม่ใช่ generator ที่ติดตั้งหรือ feature ที่ implement แล้ว

## เริ่มงานและหาเป้าหมาย

1. อ่าน AGENTS.md, DESIGN-SYSTEM-PLAN.md และ rules/skill-routing.md ระบุ flow Setup และขั้น S1–S5 ตาม design-system/rules/workflow-map.md ก่อนทำงาน; งานหน้าจอต่อด้วย U1–U6
2. ตรวจ working directory, branch, remote, working changes และ package จริง ห้าม scaffold ทับแอปเดิมหรือเขียน Product app ลง design-system/ ใช้ products/<product-id>/prototypes/<prototype-id>/ ใน workspace เดียวกันเป็นค่าเริ่มต้น ไม่ต้องแนบโฟลเดอร์ว่างแยก หาก Product หรือ prototype id ยังระบุไม่ได้ ให้ถามเฉพาะข้อมูลนั้น หากมีโปรเจกต์อยู่แล้ว ให้ reuse และรักษา stack เดิม ไม่ migrate อัตโนมัติ
3. ใช้ Product record ตาม design-system/rules/product-setup-flow.md และ onboarding ตาม design-system/rules/new-project-guide.md ขอเฉพาะข้อมูลที่ขาด ไม่เดา Product จากชื่อผู้ทำงาน ไม่บังคับสร้าง remote repo หรือ login ก่อนเริ่มงาน local

## Foundation ของ prototype ใหม่

- อ่าน design-system/DESIGN.md, design-system/tokens.json, design-system/rules/agent-rules.md และสกิล shadcn ของโปรเจกต์ ใช้ React + TypeScript + Vite สำหรับเป้าหมายว่าง เว้นแต่มี app framework ที่ตกลงไว้แล้ว ไม่ใช้ legacy/mui หรือ MUI dev export
- ใช้ component-reuse-check ก่อน implement และหลังเปลี่ยน ใช้ Core/token จริง ไม่ทำ component เลียนแบบ ตรวจวิธีนำ DS เข้าเป้าหมายที่มีจริง ปัจจุบันไม่มี shadcn dev export สำเร็จรูป อย่าอ้างว่ามี package ให้ติดตั้ง หากต้อง vendor ให้ระบุ component dependencies, theme, fonts, styles และ licenses ให้ครบ บันทึก source commit/imports ที่ตรวจจริง ไม่คัดลอก credentials, node_modules หรือทั้ง config จากอีกโปรเจกต์
- Core ไม่ขึ้นกับ routing/API/editor; screens, fixtures, cases และ business logic อยู่ใน Product; Canvas/preview tooling แยกจาก production components
- ทุก Product แยก component เฉพาะไว้ในพื้นที่ Product และ Storybook กลุ่ม Products/<ProductName>/Components/<Component> พร้อม docs/mapping ตรงกัน ไม่ใส่ของ Product ใน Core
- ใช้ Product font role/mode และ semantic tokens ที่ตรวจแล้ว ทุกข้อความที่ render ขั้นต่ำ 12px

## Storybook: Canvas / Preview / เต็มหน้า

อ่านสกิล stories ก่อนแก้ UI/stories ตรวจ version และ CLI help ของ package เป้าหมาย ใช้ scripts ของจริงและ reuse server ที่ถูกต้อง ไม่ใช้ CLI รุ่นใหม่กับรุ่นเก่า ไม่ upgrade/install dependency อัตโนมัติเพื่อให้ตรงสกิล ขออนุมัติการติดตั้งหรือ npx shadcn add ตามกฎที่ใช้จริงเมื่อจำเป็น

ทุก prototype ใหม่ต้องมีทางเข้า Storybook และตัวสลับมุมมองที่เห็นชัด:

| มุมมอง | พฤติกรรมส่งมอบ |
|---|---|
| Canvas | Board ของหลายหน้า/เคสที่ตกลงไว้ มีชื่อ frame และ zoom/pan แต่ละ frame render screen component จริง ไม่ใช่ภาพหรือ UI ที่เขียนซ้ำ |
| Preview | ทดลองกดหน้า/flow ที่เลือกได้ ใช้ screens, fixtures และ state logic ชุดเดียวกับ Canvas ไม่ใช่ docs/code snippet |
| เต็มหน้า | เปิด Preview เคสที่เลือกในแท็บใหม่โดยไม่มี Storybook/board chrome; มี fullscreen ภายในเมื่อ browser รองรับ พร้อมทางออกตาม keyboard/browser ปกติ |

- Canvas หมายถึง board หลาย frames ไม่ใช่แค่ชื่อ Canvas tab มาตรฐานของ Storybook
- สลับ Canvas / Preview แล้วคง screen/case ที่เลือก เก็บ selection/view ใน URL หรือกลไกที่ reload และ share local preview ได้ ตรวจ direct link จริง ไม่แต่ง public URL
- ใช้ catalog/metadata ของ screens/cases ร่วมกันระหว่าง board, Preview, stories และ docs; fixtures deterministic ระบุวิธี reset state เมื่อสลับเคส ไม่อ้างว่า state ของหลาย frames sync กันโดยยังไม่ได้ทำ
- แยก pan/drag ของ board จาก interaction ของ prototype ไม่ขวางปุ่ม/form และ keyboard; ตรวจ portals/dialog ไม่ถูก clip หรือวางตำแหน่งผิดเพราะ iframe
- ค้น board เดิมก่อนสร้างใหม่ ใน DS checkout นี้มี workspace/canvas และ Workspace/Canvas ให้ตรวจ reuse แต่การมี iframe ไม่ได้แปลว่ามี mode switch/เต็มหน้าครบ ไม่ดึง catalog ทั้ง DS เข้า prototype อัตโนมัติ
- stories จัดตาม Product/flow จริง Workspace tooling แยกจาก Core ใช้ layout fullscreen สำหรับ screen stories ที่ต้องการ ไม่สร้าง sidebar shell/version tabs แบบ legacy เป็นค่าเริ่มต้น
- ปุ่มเปิดแท็บใหม่มีชื่อบอกปลายทาง ใช้ rel="noopener noreferrer"; fullscreen ที่ไม่รองรับให้ใช้ standalone Preview แทน

## ทำ UI เอกสาร และตรวจรับ

ใช้ case-planning สำหรับ agreed cases แยก confirmed/proposed/unresolved ไม่แต่ง business rules เพื่อเติม board อัปเดต stories/docs/mappings ตามสิ่งที่ implement จริง แล้วทำ component-audit บนผลสุดท้ายและ consumers ที่กระทบ

เกณฑ์ก่อนส่งมอบแต่ละ prototype:

- Storybook เปิดได้จริง สลับ Canvas / Preview ได้ด้วยเมาส์และ keyboard และคง selection
- เปิดเต็มหน้า/แท็บใหม่ตรงเคสที่เลือก ไม่มี board chrome ใน standalone Preview เปิด direct URL/reload และออก fullscreen ได้
- ตรวจ desktop/mobile ที่ตกลง ข้อความไทยยาว overflow และ computed text ขั้นต่ำ 12px
- ตรวจ flow สำคัญ focus/form/overlays ทั้งสอง mode และ reduced motion ถ้ามี animation
- รัน build/focused checks ตาม tooling ของจริง รายงานสิ่งที่ไม่ได้ตรวจและ blockers ตรงไปตรงมา ไม่เรียกการแก้สกิลอย่างเดียวว่า UI implement แล้ว
- ส่งคำสั่ง setup/run, source/import instructions, ลิงก์ Storybook/Canvas/Preview ที่เปิดตรวจจริง และ cases/gaps ไม่เริ่ม release numbering หรือ version metadata เอง

## ขอบเขตภายนอก

การสร้าง prototype ไม่อนุญาตสร้าง remote repo, push, deploy, publish package/library หรือเขียน Figma อัตโนมัติ ทำเฉพาะเมื่อผู้ใช้สั่งและรู้ปลายทาง ไม่คัดลอก legacy Crv/MUI guard hooks มาใช้ใน shadcn ใหม่


## Localhost แยกสำหรับ prototype — ผู้ใช้ยืนยัน 27 พฤศจิกายน 2026

ทุก prototype ต้องมี dev host/คำสั่ง run ของตัวเองที่เปิดได้โดยไม่ต้องเปิด Storybook และยัง browse ผ่าน Storybook ได้ ใช้ renderer, screens และ case fixtures ชุดเดียวกัน ไม่ embed Storybook มาเป็น standalone app บันทึกพอร์ต/URL ที่ตรวจจริง ห้ามแย่งพอร์ตของโปรเจกต์อื่น ปุ่มเปิดเต็มหน้าใน Storybook ชี้ไป case เดียวกันบน prototype host; แจ้งว่าต้องเปิดทั้งสอง server เมื่อใช้งานร่วมกัน ไม่ผูกทุก Product เข้าพอร์ตเดียวกันหรือใช้ URL จากอีกโปรเจกต์เงียบ ๆ


## Cariva Design Workspace — 27 พฤศจิกายน 2026

อ่าน rules/workspace-structure.md ก่อนเลือกตำแหน่ง DS อยู่ design-system/ ส่วน prototype ทุก Product อยู่ products/<product-id>/prototypes/<prototype-id>/ tooling อยู่ workspace/; shadcn และ sync/canvas เป็น compatibility links ไม่ใช่ source อีกชุด ไม่ rename checkout/remote จากการตั้งชื่อ workspace

หลังสร้างหรือย้ายงาน อัปเดต products/README.md ด้วย Product, ชื่อ/path, สถานะ, คำสั่ง run จาก root, local URL/port ที่ตรวจแล้ว, Storybook entry, Figma mapping/source และวันที่ตรวจจริง ช่องที่ยังไม่มีให้ระบุ ไม่สร้าง app หรือข้อมูลสมมติ การรวม workspace ไม่อนุญาตรวม dependencies ของทุก Product เข้า DS: เก็บ package/lockfile และ runtime แยกเมื่อจำเป็น ไม่เพิ่ม npm workspaces อัตโนมัติ

ใช้เจตนาผู้ใช้กำหนดงานร่วมกับ Figma node ไม่บังคับ frame เต็มจอเท่านั้น และไม่บังคับ Figma Desktop หรือ gh login เมื่อเครื่องมืออื่นเข้าถึงได้หรืองานเป็น local ขั้น setup ไม่อนุญาต remote repo/push/deploy อัตโนมัติ
