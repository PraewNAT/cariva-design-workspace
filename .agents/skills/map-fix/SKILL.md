---
name: map-fix
description: Map Figma component เข้ากับ Cariva DS และแก้ให้ตรง — ใช้ได้ทั้งตอนเริ่มต้นและหลัง audit ใช้เมื่อพูดว่า map, fix, แก้, แมป, map-fix
---

# Map & Fix — Cariva Design System

Use when the user says:

```text
map [ชื่อ] node-id=[id]
fix [ชื่อ] node-id=[id]
แก้ [ชื่อ] node-id=[id]
แมป [ชื่อ] node-id=[id]
map-fix [ชื่อ] node-id=[id]
```

## Required Context

ก่อน map ทุกครั้ง ให้อ่าน:
- `shadcn/DESIGN.md` — token names, typography scale
- `shadcn/tokens.json` — hex values and token mapping
- `shadcn/rules/components/{ชื่อ component}.md` ถ้ามี — source of truth ของ property และ variant
- โค้ด component จริงที่ `shadcn/src/lib/app/components/ui/{code-name}.tsx` และ stories — props, variants, sizes ที่มีจริง
- `shadcn/docs/components/FIGMA-NAMING.md` — ชื่อ component ใน Figma ↔ ชื่อ component ในโค้ด

## Mapping Scope

Map และแก้:

- Color tokens — เปลี่ยน hardcode hex → semantic token
- Typography styles — bind text style จาก DS
- Spacing variables — bind spacing token
- Radius variables/styles — bind radius token
- Effect styles — bind shared effect style
- Component base / shared component when available
- States and variants to the existing Cariva pattern
- **Component names** — ตรวจชื่อ component ว่าตรงกับตาราง `FIGMA-NAMING.md` ไหม ถ้าไม่ตรงให้เสนอชื่อและถามยืนยันก่อนแก้
- **Property names และค่า** — ชื่อ property และค่าใน Figma ต้องเท่ากับ prop และค่าในโค้ด shadcn ของ component นั้น (เช่น Button: `variant` = `default | outline | secondary | ghost | destructive | link`, `size` = `default | sm | lg | icon…`) อ่านจากไฟล์ `.tsx` จริง ไม่ใช่จากความจำ ถ้าไม่ตรงให้เสนอชื่อที่ถูกและถามยืนยันก่อนแก้ ถ้าโค้ดมี prop ที่ Figma ไม่มี หรือกลับกัน ให้รายงานเป็นช่องว่าง ไม่เพิ่มหรือลบเอง

## หมายเหตุ

- ทำได้ทีละ frame เท่านั้น — ถ้าได้รับ section หรือ flow ทั้งหมด ให้ list frame ที่พบก่อน แล้วถามว่าจะเริ่ม frame ไหนก่อน
- ถ้ามาต่อจาก audit — ใช้ข้อมูลที่ inspect ไปแล้วได้เลย ไม่ต้อง inspect ซ้ำ

## Rules

- Do not use tokens from an old design system.
- Do not use local styles when a shared style exists.
- Do not create new tokens or components by default — ถ้าของที่ต้องการยังไม่มีใน DS ให้แจ้ง user ก่อน
- Do not invent props or variants that the shadcn component in `shadcn/src/lib/app/components/ui/` does not have.
- If a component base is missing, or a needed variant/state is incomplete, tell the user what should be created before creating it.
- ถามยืนยันก่อนแก้ทุกครั้ง ห้ามแก้เองโดยไม่ถาม
- Preserve visual intention unless the DS mapping requires a correction.

## Output

เมื่อรายงานผล ให้ระบุ:

- สิ่งที่ map/แก้ไปแล้ว
- Node ที่เกี่ยวข้อง
- Component names และ property names ที่ตรงกับโค้ดแล้ว และที่ยังไม่ตรง (พร้อมเสนอชื่อที่ถูก)
- สิ่งที่ขาด — component, variant, state, token, หรือ style ที่ยังไม่มีใน DS
- คำถามก่อนสร้างสิ่งใหม่ใน DS
