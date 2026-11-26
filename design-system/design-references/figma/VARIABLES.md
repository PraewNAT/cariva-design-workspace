# Figma variables inventory

อ่านครบทุก local collection วันที่ 24 พฤศจิกายน 2026 จาก [[Shadcn] Cariva Core Design System](https://www.figma.com/design/e9ypItGZbm2poUZLUQxu66)

นี่คือ baseline ที่อ่านจาก Figma ไม่ใช่การรับรองว่าโค้ดรองรับหรือ sync ครบทุกตัว เก็บค่าดิบ alias และค่าที่ resolve แล้วใน [variables.latest.json](variables.latest.json) ไม่มีการแก้ variables ใน Figma จากการสำรวจนี้

| Collection | จำนวน | Mode | ประเภท |
|---|---:|---|---|
| Foundation | 382 | Mira | FLOAT, COLOR, STRING |
| Semantic | 199 | Light Theme | COLOR |
| Typography | 51 | Desktop, Mobile | FLOAT |
| Product Style | 3 | cariva app, back office, HosXP | STRING |

รวม **635 variables**: COLOR 467, FLOAT 160, STRING 8, BOOLEAN 0 จำนวนนี้นับ variable ไม่ได้นับค่าซ้ำในแต่ละ mode

Foundation มี breakpoint, radius, opacity, spacing, color, border-width, blur, font และ icon; Semantic มีสีตามบทบาท; Typography มีขนาด/line-height/น้ำหนัก/spacing ของตัวอักษร; Product Style มีฟอนต์ตาม Product

ค่าล่าสุดที่ยืนยัน: content/secondary = Slate 700; border/default = Slate 200; border/strong = Slate 300; border/disabled = Slate 100

## สถานะการนำไปใช้ในโค้ด

| ส่วน | สถานะ |
|---|---|
| content/secondary และ border/default/strong/disabled | อัปเดต local token mapping และ generated code ตามค่าปัจจุบันแล้ว |
| Semantic colors อื่น | มี mapping เดิมหลายตัว; on-fill บางตัวและ alias structure ยังไม่ครบ ไม่อ้าง parity ทั้ง collection |
| Product Style fonts | จดค่าครบ 3 modes แล้ว; Core legacy carivaApp/HosXP ยังไม่ตรงทั้งหมด ดู DESIGN.md |
| Foundation / Typography | เก็บทุกค่า/alias/mode แล้ว ยังไม่ได้ audit code mapping ทุกตัวหรือ migrate geometry |

## รายการครบทุกตัว

<details>
<summary>Foundation (382)</summary>

| Variable | Type | Mira |
|---|---|---|
| `breakpoint/sm` | FLOAT | 640 |
| `breakpoint/md` | FLOAT | 768 |
| `breakpoint/lg` | FLOAT | 1024 |
| `breakpoint/xl` | FLOAT | 1280 |
| `breakpoint/2xl` | FLOAT | 1536 |
| `radius/none` | FLOAT | 0 |
| `radius/2` | FLOAT | 2 |
| `radius/4` | FLOAT | 4 |
| `radius/8` | FLOAT | 8 |
| `radius/12` | FLOAT | 12 |
| `radius/16` | FLOAT | 16 |
| `radius/24` | FLOAT | 24 |
| `radius/full` | FLOAT | 9999 |
| `opacity/0` | FLOAT | 0 |
| `opacity/5` | FLOAT | 5 |
| `opacity/10` | FLOAT | 10 |
| `opacity/20` | FLOAT | 20 |
| `opacity/25` | FLOAT | 25 |
| `opacity/30` | FLOAT | 30 |
| `opacity/40` | FLOAT | 40 |
| `opacity/50` | FLOAT | 50 |
| `opacity/60` | FLOAT | 60 |
| `opacity/70` | FLOAT | 70 |
| `opacity/75` | FLOAT | 75 |
| `opacity/80` | FLOAT | 80 |
| `opacity/90` | FLOAT | 90 |
| `opacity/95` | FLOAT | 95 |
| `opacity/100` | FLOAT | 100 |
| `spacing/sm` | FLOAT | 8 |
| `spacing/md` | FLOAT | 12 |
| `spacing/lg` | FLOAT | 16 |
| `spacing/xl` | FLOAT | 24 |
| `spacing/3xl` | FLOAT | 32 |
| `spacing/4xl` | FLOAT | 40 |
| `spacing/xs` | FLOAT | 4 |
| `color/black` | COLOR | #212121 |
| `color/white` | COLOR | #ffffff |
| `color/gray/50` | COLOR | #f9fafb |
| `color/gray/100` | COLOR | #f3f4f6 |
| `color/gray/200` | COLOR | #e5e7eb |
| `color/gray/300` | COLOR | #d1d5db |
| `color/gray/400` | COLOR | #9ca3af |
| `color/gray/500` | COLOR | #6b7280 |
| `color/gray/600` | COLOR | #4b5563 |
| `color/gray/700` | COLOR | #374151 |
| `color/gray/800` | COLOR | #1f2937 |
| `color/gray/900` | COLOR | #111827 |
| `color/red/50` | COLOR | #fef2f2 |
| `color/red/100` | COLOR | #fee2e2 |
| `color/red/200` | COLOR | #fecaca |
| `color/red/300` | COLOR | #fca5a5 |
| `color/red/400` | COLOR | #f87171 |
| `color/red/500` | COLOR | #ef4444 |
| `color/red/600` | COLOR | #dc2626 |
| `color/red/700` | COLOR | #b91c1c |
| `color/red/800` | COLOR | #991b1b |
| `color/red/900` | COLOR | #7f1d1d |
| `color/amber/50` | COLOR | #fffbeb |
| `color/yellow/50` | COLOR | #fefce8 |
| `color/yellow/100` | COLOR | #fef9c3 |
| `color/yellow/200` | COLOR | #fef08a |
| `color/yellow/300` | COLOR | #fde047 |
| `color/yellow/400` | COLOR | #facc15 |
| `color/yellow/500` | COLOR | #eab308 |
| `color/yellow/600` | COLOR | #ca8a04 |
| `color/yellow/700` | COLOR | #a16207 |
| `color/yellow/800` | COLOR | #854d0e |
| `color/yellow/900` | COLOR | #713f12 |
| `color/lime/50` | COLOR | #f7fee7 |
| `color/lime/100` | COLOR | #ecfccb |
| `color/lime/200` | COLOR | #d9f99d |
| `color/lime/300` | COLOR | #bef264 |
| `color/lime/400` | COLOR | #a3e635 |
| `color/lime/500` | COLOR | #84cc16 |
| `color/lime/600` | COLOR | #65a30d |
| `color/lime/700` | COLOR | #4d7c0f |
| `color/lime/800` | COLOR | #3f6212 |
| `color/lime/900` | COLOR | #365314 |
| `color/green/50` | COLOR | #f0fdf4 |
| `color/green/100` | COLOR | #dcfce7 |
| `color/green/200` | COLOR | #bbf7d0 |
| `color/green/300` | COLOR | #86efac |
| `color/green/400` | COLOR | #4ade80 |
| `color/green/500` | COLOR | #22c55e |
| `color/green/600` | COLOR | #16a34a |
| `color/green/700` | COLOR | #15803d |
| `color/green/800` | COLOR | #166534 |
| `color/green/900` | COLOR | #14532d |
| `color/emerald/50` | COLOR | #ecfdf5 |
| `color/emerald/100` | COLOR | #d1fae5 |
| `color/emerald/200` | COLOR | #a7f3d0 |
| `color/emerald/300` | COLOR | #6ee7b7 |
| `color/emerald/400` | COLOR | #34d399 |
| `color/emerald/500` | COLOR | #10b981 |
| `color/emerald/600` | COLOR | #059669 |
| `color/emerald/700` | COLOR | #047857 |
| `color/emerald/800` | COLOR | #065f46 |
| `color/emerald/900` | COLOR | #064e3b |
| `color/teal/50` | COLOR | #f0fdfa |
| `color/teal/100` | COLOR | #ccfbf1 |
| `color/teal/200` | COLOR | #99f6e4 |
| `color/teal/300` | COLOR | #5eead4 |
| `color/teal/400` | COLOR | #2dd4bf |
| `color/teal/500` | COLOR | #14b8a6 |
| `color/teal/600` | COLOR | #0d9488 |
| `color/teal/700` | COLOR | #0f766e |
| `color/teal/800` | COLOR | #115e59 |
| `color/teal/900` | COLOR | #134e4a |
| `color/cyan/50` | COLOR | #ecfeff |
| `color/cyan/100` | COLOR | #cffafe |
| `color/cyan/200` | COLOR | #a5f3fc |
| `color/cyan/300` | COLOR | #67e8f9 |
| `color/cyan/400` | COLOR | #22d3ee |
| `color/cyan/500` | COLOR | #06b6d4 |
| `color/cyan/600` | COLOR | #0891b2 |
| `color/cyan/700` | COLOR | #0e7490 |
| `color/cyan/800` | COLOR | #155e75 |
| `color/cyan/900` | COLOR | #164e63 |
| `color/sky/50` | COLOR | #f0f9ff |
| `color/sky/100` | COLOR | #e0f2fe |
| `color/sky/200` | COLOR | #bae6fd |
| `color/sky/300` | COLOR | #7dd3fc |
| `color/sky/400` | COLOR | #38bdf8 |
| `color/sky/500` | COLOR | #0ea5e9 |
| `color/sky/600` | COLOR | #0284c7 |
| `color/sky/700` | COLOR | #0369a1 |
| `color/sky/800` | COLOR | #075985 |
| `color/sky/900` | COLOR | #0c4a6e |
| `color/blue/50` | COLOR | #eff6ff |
| `color/blue/100` | COLOR | #dbeafe |
| `color/blue/200` | COLOR | #bfdbfe |
| `color/blue/300` | COLOR | #93c5fd |
| `color/blue/400` | COLOR | #60a5fa |
| `color/blue/500` | COLOR | #3b82f6 |
| `color/blue/600` | COLOR | #2563eb |
| `color/blue/700` | COLOR | #1d4ed8 |
| `color/blue/800` | COLOR | #1e40af |
| `color/blue/900` | COLOR | #1e3a8a |
| `color/indigo/50` | COLOR | #eef2ff |
| `color/indigo/100` | COLOR | #e0e7ff |
| `color/indigo/200` | COLOR | #c7d2fe |
| `color/indigo/300` | COLOR | #a5b4fc |
| `color/indigo/400` | COLOR | #818cf8 |
| `color/indigo/500` | COLOR | #6366f1 |
| `color/indigo/600` | COLOR | #4f46e5 |
| `color/indigo/700` | COLOR | #4338ca |
| `color/indigo/800` | COLOR | #3730a3 |
| `color/indigo/900` | COLOR | #312e81 |
| `color/violet/50` | COLOR | #f5f3ff |
| `color/violet/100` | COLOR | #ede9fe |
| `color/violet/200` | COLOR | #ddd6fe |
| `color/violet/300` | COLOR | #c4b5fd |
| `color/violet/400` | COLOR | #a78bfa |
| `color/violet/500` | COLOR | #8b5cf6 |
| `color/violet/600` | COLOR | #7c3aed |
| `color/violet/700` | COLOR | #6d28d9 |
| `color/violet/800` | COLOR | #5b21b6 |
| `color/violet/900` | COLOR | #4c1d95 |
| `color/purple/50` | COLOR | #faf5ff |
| `color/purple/100` | COLOR | #f3e8ff |
| `color/purple/200` | COLOR | #e9d5ff |
| `color/purple/300` | COLOR | #d8b4fe |
| `color/purple/400` | COLOR | #c084fc |
| `color/purple/500` | COLOR | #a855f7 |
| `color/purple/600` | COLOR | #9333ea |
| `color/purple/700` | COLOR | #7e22ce |
| `color/purple/800` | COLOR | #6b21a8 |
| `color/purple/900` | COLOR | #581c87 |
| `color/pink/50` | COLOR | #fdf2f8 |
| `color/pink/100` | COLOR | #fce7f3 |
| `color/pink/200` | COLOR | #fbcfe8 |
| `color/pink/300` | COLOR | #f9a8d4 |
| `color/pink/400` | COLOR | #f472b6 |
| `color/pink/500` | COLOR | #ec4899 |
| `color/pink/600` | COLOR | #db2777 |
| `color/pink/700` | COLOR | #be185d |
| `color/pink/800` | COLOR | #9d174d |
| `color/pink/900` | COLOR | #831843 |
| `border-width/0` | FLOAT | 0 |
| `border-width/1` | FLOAT | 1 |
| `border-width/2` | FLOAT | 2 |
| `border-width/4` | FLOAT | 4 |
| `border-width/8` | FLOAT | 8 |
| `blur/none` | FLOAT | 0 |
| `blur/xs` | FLOAT | 4 |
| `blur/sm` | FLOAT | 8 |
| `blur/md` | FLOAT | 12 |
| `blur/lg` | FLOAT | 16 |
| `blur/xl` | FLOAT | 24 |
| `blur/2xl` | FLOAT | 40 |
| `blur/3xl` | FLOAT | 64 |
| `opacity/15` | FLOAT | 15 |
| `opacity/35` | FLOAT | 35 |
| `opacity/45` | FLOAT | 45 |
| `opacity/55` | FLOAT | 55 |
| `opacity/65` | FLOAT | 65 |
| `opacity/85` | FLOAT | 85 |
| `color/transparent` | COLOR | #ffffff00 |
| `font/family/sans` | STRING | Inter |
| `font/family/serif` | STRING | Georgia |
| `font/family/mono` | STRING | Menlo |
| `font/size/xs` | FLOAT | 12 |
| `font/size/sm` | FLOAT | 14 |
| `font/size/base` | FLOAT | 16 |
| `font/size/lg` | FLOAT | 18 |
| `font/size/xl` | FLOAT | 20 |
| `font/size/2xl` | FLOAT | 24 |
| `font/size/3xl` | FLOAT | 30 |
| `font/size/4xl` | FLOAT | 36 |
| `font/size/5xl` | FLOAT | 48 |
| `font/size/6xl` | FLOAT | 60 |
| `font/size/7xl` | FLOAT | 72 |
| `font/size/8xl` | FLOAT | 96 |
| `font/size/9xl` | FLOAT | 128 |
| `font/style/italic` | STRING | italic |
| `font/style/not-italic` | STRING | normal |
| `font/weight/thin` | FLOAT | 100 |
| `font/weight/extralight` | FLOAT | 200 |
| `font/weight/light` | FLOAT | 300 |
| `font/weight/normal` | FLOAT | 400 |
| `font/weight/medium` | FLOAT | 500 |
| `font/weight/semibold` | FLOAT | 600 |
| `font/weight/bold` | FLOAT | 700 |
| `font/weight/extrabold` | FLOAT | 800 |
| `font/weight/black` | FLOAT | 900 |
| `font/tracking/tighter` | FLOAT | -0.800000011920929 |
| `font/tracking/tight` | FLOAT | -0.4000000059604645 |
| `font/tracking/normal` | FLOAT | 0 |
| `font/tracking/wide` | FLOAT | 0.4000000059604645 |
| `font/tracking/wider` | FLOAT | 0.800000011920929 |
| `font/tracking/widest` | FLOAT | 1.600000023841858 |
| `font/leading/3` | FLOAT | 12 |
| `font/leading/4` | FLOAT | 16 |
| `font/leading/5` | FLOAT | 20 |
| `font/leading/6` | FLOAT | 24 |
| `font/leading/7` | FLOAT | 28 |
| `font/leading/8` | FLOAT | 32 |
| `font/leading/9` | FLOAT | 36 |
| `font/leading/10` | FLOAT | 40 |
| `radius/32` | FLOAT | 32 |
| `color/orange/900` | COLOR | #7c2d12 |
| `color/orange/800` | COLOR | #9a3412 |
| `color/orange/600` | COLOR | #ea580c |
| `color/orange/500` | COLOR | #f97316 |
| `color/orange/400` | COLOR | #fb923c |
| `color/orange/700` | COLOR | #c2410c |
| `color/orange/300` | COLOR | #fdba74 |
| `color/orange/200` | COLOR | #fed7aa |
| `color/orange/100` | COLOR | #ffedd5 |
| `color/orange/50` | COLOR | #fff7ed |
| `color/amber/900` | COLOR | #78350f |
| `color/amber/300` | COLOR | #fcd34d |
| `color/amber/800` | COLOR | #92400e |
| `color/amber/500` | COLOR | #f59e0b |
| `color/amber/400` | COLOR | #fbbf24 |
| `color/amber/700` | COLOR | #b45309 |
| `color/amber/100` | COLOR | #fef3c7 |
| `color/amber/600` | COLOR | #d97706 |
| `color/amber/200` | COLOR | #fde68a |
| `color/slate/50` | COLOR | #f8fafc |
| `color/slate/100` | COLOR | #f1f5f9 |
| `color/slate/200` | COLOR | #e2e8f0 |
| `color/slate/300` | COLOR | #cbd5e1 |
| `color/slate/400` | COLOR | #94a3b8 |
| `color/slate/500` | COLOR | #64748b |
| `color/slate/600` | COLOR | #475569 |
| `color/slate/700` | COLOR | #334155 |
| `color/slate/800` | COLOR | #1e293b |
| `color/slate/900` | COLOR | #0f172a |
| `spacing/2xs` | FLOAT | 2 |
| `spacing/2xl` | FLOAT | 28 |
| `color/gray/950` | COLOR | #030712 |
| `color/red/950` | COLOR | #450a0a |
| `color/orange/950` | COLOR | #431407 |
| `color/amber/950` | COLOR | #451a03 |
| `color/yellow/950` | COLOR | #422006 |
| `color/lime/950` | COLOR | #1a2e05 |
| `color/green/950` | COLOR | #052e16 |
| `color/emerald/950` | COLOR | #022c22 |
| `color/teal/950` | COLOR | #042f2e |
| `color/cyan/950` | COLOR | #083344 |
| `color/sky/950` | COLOR | #082f49 |
| `color/blue/950` | COLOR | #172554 |
| `color/indigo/950` | COLOR | #1e1b4b |
| `color/violet/950` | COLOR | #2e1065 |
| `color/purple/950` | COLOR | #3b0764 |
| `color/pink/950` | COLOR | #500724 |
| `color/slate/950` | COLOR | #020617 |
| `color/zinc/50` | COLOR | #fafafa |
| `color/zinc/100` | COLOR | #f4f4f5 |
| `color/zinc/200` | COLOR | #e4e4e7 |
| `color/zinc/300` | COLOR | #d4d4d8 |
| `color/zinc/400` | COLOR | #a1a1aa |
| `color/zinc/500` | COLOR | #71717a |
| `color/zinc/600` | COLOR | #52525b |
| `color/zinc/700` | COLOR | #3f3f46 |
| `color/zinc/800` | COLOR | #27272a |
| `color/zinc/900` | COLOR | #18181b |
| `color/zinc/950` | COLOR | #09090b |
| `color/neutral/50` | COLOR | #fafafa |
| `color/neutral/100` | COLOR | #f5f5f5 |
| `color/neutral/200` | COLOR | #e5e5e5 |
| `color/neutral/300` | COLOR | #d4d4d4 |
| `color/neutral/400` | COLOR | #a3a3a3 |
| `color/neutral/500` | COLOR | #737373 |
| `color/neutral/600` | COLOR | #525252 |
| `color/neutral/700` | COLOR | #404040 |
| `color/neutral/800` | COLOR | #262626 |
| `color/neutral/900` | COLOR | #171717 |
| `color/neutral/950` | COLOR | #0a0a0a |
| `color/stone/50` | COLOR | #fafaf9 |
| `color/stone/100` | COLOR | #f5f5f4 |
| `color/stone/200` | COLOR | #e7e5e4 |
| `color/stone/300` | COLOR | #d6d3d1 |
| `color/stone/400` | COLOR | #a8a29e |
| `color/stone/500` | COLOR | #78716c |
| `color/stone/600` | COLOR | #57534e |
| `color/stone/700` | COLOR | #44403c |
| `color/stone/800` | COLOR | #292524 |
| `color/stone/900` | COLOR | #1c1917 |
| `color/stone/950` | COLOR | #0c0a09 |
| `color/rose/50` | COLOR | #fff1f2 |
| `color/rose/100` | COLOR | #ffe4e6 |
| `color/rose/200` | COLOR | #fecdd3 |
| `color/rose/300` | COLOR | #fda4af |
| `color/rose/400` | COLOR | #fb7185 |
| `color/rose/500` | COLOR | #f43f5e |
| `color/rose/600` | COLOR | #e11d48 |
| `color/rose/700` | COLOR | #be123c |
| `color/rose/800` | COLOR | #9f1239 |
| `color/rose/900` | COLOR | #881337 |
| `color/rose/950` | COLOR | #4c0519 |
| `color/fuchsia/50` | COLOR | #fdf4ff |
| `color/fuchsia/100` | COLOR | #fae8ff |
| `color/fuchsia/200` | COLOR | #f5d0fe |
| `color/fuchsia/300` | COLOR | #f0abfc |
| `color/fuchsia/400` | COLOR | #e879f9 |
| `color/fuchsia/500` | COLOR | #d946ef |
| `color/fuchsia/600` | COLOR | #c026d3 |
| `color/fuchsia/700` | COLOR | #a21caf |
| `color/fuchsia/800` | COLOR | #86198f |
| `color/fuchsia/900` | COLOR | #701a75 |
| `color/fuchsia/950` | COLOR | #4a044e |
| `spacing/-2xs` | FLOAT | -2 |
| `spacing/-xs` | FLOAT | -4 |
| `spacing/-sm` | FLOAT | -8 |
| `spacing/-md` | FLOAT | -12 |
| `spacing/-lg` | FLOAT | -16 |
| `spacing/-xl` | FLOAT | -24 |
| `spacing/none` | FLOAT | 0 |
| `color/dodger-blue/50` | COLOR | #eef9ff |
| `color/dodger-blue/100` | COLOR | #d8f0ff |
| `color/dodger-blue/200` | COLOR | #bae6ff |
| `color/dodger-blue/300` | COLOR | #8bd8ff |
| `color/dodger-blue/400` | COLOR | #54c1ff |
| `color/dodger-blue/500` | COLOR | #2da4ff |
| `color/dodger-blue/600` | COLOR | #1789fa |
| `color/dodger-blue/700` | COLOR | #0f70e6 |
| `color/dodger-blue/800` | COLOR | #135aba |
| `color/dodger-blue/900` | COLOR | #164e92 |
| `color/dodger-blue/950` | COLOR | #123059 |
| `color/neon-cyan/50` | COLOR | #ebfeff |
| `color/neon-cyan/100` | COLOR | #cdfbff |
| `color/neon-cyan/200` | COLOR | #a1f5ff |
| `color/neon-cyan/300` | COLOR | #55ebff |
| `color/neon-cyan/400` | COLOR | #1ad9f6 |
| `color/neon-cyan/500` | COLOR | #00bcdc |
| `color/neon-cyan/600` | COLOR | #0195b9 |
| `color/neon-cyan/700` | COLOR | #097795 |
| `color/neon-cyan/800` | COLOR | #116079 |
| `color/neon-cyan/900` | COLOR | #134f66 |
| `color/neon-cyan/950` | COLOR | #063446 |
| `font/size/2xs` | FLOAT | 10 |
| `color/dodger-blue/975` | COLOR | #192450 |
| `icon/size/3` | FLOAT | 12 |
| `icon/size/4` | FLOAT | 16 |
| `icon/size/5` | FLOAT | 20 |
| `icon/size/6` | FLOAT | 24 |
| `icon/size/7` | FLOAT | 28 |
| `icon/size/8` | FLOAT | 32 |
| `icon/size/9` | FLOAT | 36 |
| `icon/size/10` | FLOAT | 40 |

</details>

<details>
<summary>Semantic (199)</summary>

| Variable | Type | Light Theme |
|---|---|---|
| `color/brand/primary/on-surface/default` | COLOR | #1789fa ← `color/dodger-blue/600` |
| `color/brand/primary/on-surface/hover` | COLOR | #0f70e6 ← `color/dodger-blue/700` |
| `color/brand/primary/on-surface/pressed` | COLOR | #135aba ← `color/dodger-blue/800` |
| `color/brand/primary/on-surface/subtle` | COLOR | #eef9ff ← `color/dodger-blue/50` |
| `color/brand/primary/on-surface/muted` | COLOR | #d8f0ff ← `color/dodger-blue/100` |
| `color/brand/primary/content/default` | COLOR | #1789fa ← `color/dodger-blue/600` |
| `color/brand/primary/border/default` | COLOR | #8bd8ff ← `color/dodger-blue/300` |
| `color/brand/primary/border/strong` | COLOR | #2da4ff ← `color/dodger-blue/500` |
| `color/brand/secondary/on-surface/default` | COLOR | #0f766e ← `color/teal/700` |
| `color/brand/secondary/on-surface/hover` | COLOR | #115e59 ← `color/teal/800` |
| `color/brand/secondary/on-surface/pressed` | COLOR | #134e4a ← `color/teal/900` |
| `color/brand/secondary/on-surface/subtle` | COLOR | #f0fdfa ← `color/teal/50` |
| `color/brand/secondary/on-surface/muted` | COLOR | #ccfbf1 ← `color/teal/100` |
| `color/brand/secondary/content/default` | COLOR | #0d9488 ← `color/teal/600` |
| `color/brand/secondary/border/default` | COLOR | #5eead4 ← `color/teal/300` |
| `color/brand/secondary/border/strong` | COLOR | #14b8a6 ← `color/teal/500` |
| `color/content/primary` | COLOR | #0f172a ← `color/slate/900` |
| `color/content/secondary` | COLOR | #334155 ← `color/slate/700` |
| `color/content/placeholder` | COLOR | #64748b ← `color/slate/500` |
| `color/content/disabled` | COLOR | #94a3b8 ← `color/slate/400` |
| `color/content/inverse` | COLOR | #ffffff ← `color/white` |
| `color/content/link/default` | COLOR | #2563eb ← `color/blue/600` |
| `color/content/link/hover` | COLOR | #1d4ed8 ← `color/blue/700` |
| `color/content/link/pressed` | COLOR | #1e40af ← `color/blue/800` |
| `color/content/link/disabled` | COLOR | #475569 ← `color/slate/600` |
| `color/bg/white` | COLOR | #ffffff ← `color/white` |
| `color/bg/subtle` | COLOR | #f1f5f9 ← `color/slate/100` |
| `color/bg/inverse` | COLOR | #0f172a ← `color/slate/900` |
| `color/on-surface/default` | COLOR | #ffffff ← `color/white` |
| `color/on-surface/subtle` | COLOR | #f8fafc ← `color/slate/50` |
| `color/on-surface/elevated` | COLOR | #ffffff ← `color/white` |
| `color/on-surface/sunken` | COLOR | #f1f5f9 ← `color/slate/100` |
| `color/on-surface/overlay` | COLOR | #ffffff ← `color/white` |
| `color/on-surface/action/hover` | COLOR | #f1f5f9 ← `color/slate/100` |
| `color/on-surface/action/pressed` | COLOR | #e2e8f0 ← `color/slate/200` |
| `color/on-surface/action/selected` | COLOR | #eef9ff ← `color/dodger-blue/50` |
| `color/on-surface/action/disabled` | COLOR | #f1f5f9 ← `color/slate/100` |
| `color/border/default` | COLOR | #e2e8f0 ← `color/slate/200` |
| `color/border/strong` | COLOR | #cbd5e1 ← `color/slate/300` |
| `color/border/disabled` | COLOR | #f1f5f9 ← `color/slate/100` |
| `color/status/success/on-surface/default` | COLOR | #047857 ← `color/emerald/700` |
| `color/status/success/on-surface/hover` | COLOR | #065f46 ← `color/emerald/800` |
| `color/status/success/on-surface/pressed` | COLOR | #064e3b ← `color/emerald/900` |
| `color/status/success/on-surface/muted` | COLOR | #d1fae5 ← `color/emerald/100` |
| `color/status/success/content/default` | COLOR | #047857 ← `color/emerald/700` |
| `color/border/system` | COLOR | #2563eb ← `color/blue/600` |
| `color/border/error` | COLOR | #dc2626 ← `color/red/600` |
| `color/overlay/backdrop` | COLOR | #00000066 |
| `color/overlay/backdrop/strong` | COLOR | #00000099 |
| `color/brand/primary/content/strong` | COLOR | #0f70e6 ← `color/dodger-blue/700` |
| `color/brand/secondary/content/strong` | COLOR | #0f766e ← `color/teal/700` |
| `color/status/success/content/strong` | COLOR | #065f46 ← `color/emerald/800` |
| `color/status/success/on-surface/subtle` | COLOR | #ecfdf5 ← `color/emerald/50` |
| `color/status/warning/on-surface/default` | COLOR | #d97706 ← `color/amber/600` |
| `color/status/warning/on-surface/hover` | COLOR | #b45309 ← `color/amber/700` |
| `color/status/warning/on-surface/pressed` | COLOR | #92400e ← `color/amber/800` |
| `color/status/warning/on-surface/subtle` | COLOR | #fffbeb ← `color/amber/50` |
| `color/status/warning/on-surface/muted` | COLOR | #fef3c7 ← `color/amber/100` |
| `color/status/warning/content/default` | COLOR | #d97706 ← `color/amber/600` |
| `color/status/warning/content/strong` | COLOR | #b45309 ← `color/amber/700` |
| `color/status/error/on-surface/default` | COLOR | #dc2626 ← `color/red/600` |
| `color/status/error/on-surface/hover` | COLOR | #b91c1c ← `color/red/700` |
| `color/status/error/on-surface/pressed` | COLOR | #991b1b ← `color/red/800` |
| `color/status/error/on-surface/subtle` | COLOR | #fef2f2 ← `color/red/50` |
| `color/status/error/on-surface/muted` | COLOR | #fee2e2 ← `color/red/100` |
| `color/status/error/content/default` | COLOR | #dc2626 ← `color/red/600` |
| `color/status/error/content/strong` | COLOR | #b91c1c ← `color/red/700` |
| `color/status/info/on-surface/default` | COLOR | #0284c7 ← `color/sky/600` |
| `color/status/info/on-surface/hover` | COLOR | #0369a1 ← `color/sky/700` |
| `color/status/info/on-surface/pressed` | COLOR | #075985 ← `color/sky/800` |
| `color/status/info/on-surface/subtle` | COLOR | #f0f9ff ← `color/sky/50` |
| `color/status/info/on-surface/muted` | COLOR | #e0f2fe ← `color/sky/100` |
| `color/status/info/content/default` | COLOR | #0284c7 ← `color/sky/600` |
| `color/status/info/content/strong` | COLOR | #0369a1 ← `color/sky/700` |
| `color/accent/red/A02` | COLOR | #fee2e2 ← `color/red/100` |
| `color/accent/red/A03` | COLOR | #fca5a5 ← `color/red/300` |
| `color/accent/red/A04` | COLOR | #ef4444 ← `color/red/500` |
| `color/accent/red/A05` | COLOR | #b91c1c ← `color/red/700` |
| `color/accent/orange/A02` | COLOR | #ffedd5 ← `color/orange/100` |
| `color/accent/orange/A03` | COLOR | #fdba74 ← `color/orange/300` |
| `color/accent/orange/A04` | COLOR | #f97316 ← `color/orange/500` |
| `color/accent/orange/A05` | COLOR | #c2410c ← `color/orange/700` |
| `color/accent/amber/A02` | COLOR | #fef3c7 ← `color/amber/100` |
| `color/accent/amber/A03` | COLOR | #fcd34d ← `color/amber/300` |
| `color/accent/amber/A04` | COLOR | #f59e0b ← `color/amber/500` |
| `color/accent/amber/A05` | COLOR | #b45309 ← `color/amber/700` |
| `color/accent/yellow/A02` | COLOR | #fef9c3 ← `color/yellow/100` |
| `color/accent/yellow/A03` | COLOR | #fde047 ← `color/yellow/300` |
| `color/accent/yellow/A04` | COLOR | #eab308 ← `color/yellow/500` |
| `color/accent/yellow/A05` | COLOR | #a16207 ← `color/yellow/700` |
| `color/accent/lime/A02` | COLOR | #ecfccb ← `color/lime/100` |
| `color/accent/lime/A03` | COLOR | #bef264 ← `color/lime/300` |
| `color/accent/lime/A04` | COLOR | #84cc16 ← `color/lime/500` |
| `color/accent/lime/A05` | COLOR | #4d7c0f ← `color/lime/700` |
| `color/accent/green/A02` | COLOR | #dcfce7 ← `color/green/100` |
| `color/accent/green/A03` | COLOR | #86efac ← `color/green/300` |
| `color/accent/green/A04` | COLOR | #22c55e ← `color/green/500` |
| `color/accent/green/A05` | COLOR | #15803d ← `color/green/700` |
| `color/accent/emerald/A02` | COLOR | #d1fae5 ← `color/emerald/100` |
| `color/accent/emerald/A03` | COLOR | #6ee7b7 ← `color/emerald/300` |
| `color/accent/emerald/A04` | COLOR | #10b981 ← `color/emerald/500` |
| `color/accent/emerald/A05` | COLOR | #047857 ← `color/emerald/700` |
| `color/accent/teal/A02` | COLOR | #ccfbf1 ← `color/teal/100` |
| `color/accent/teal/A03` | COLOR | #5eead4 ← `color/teal/300` |
| `color/accent/teal/A04` | COLOR | #14b8a6 ← `color/teal/500` |
| `color/accent/teal/A05` | COLOR | #0f766e ← `color/teal/700` |
| `color/accent/cyan/A02` | COLOR | #cffafe ← `color/cyan/100` |
| `color/accent/cyan/A03` | COLOR | #67e8f9 ← `color/cyan/300` |
| `color/accent/cyan/A04` | COLOR | #06b6d4 ← `color/cyan/500` |
| `color/accent/cyan/A05` | COLOR | #0e7490 ← `color/cyan/700` |
| `color/accent/sky/A02` | COLOR | #e0f2fe ← `color/sky/100` |
| `color/accent/sky/A03` | COLOR | #7dd3fc ← `color/sky/300` |
| `color/accent/sky/A04` | COLOR | #0ea5e9 ← `color/sky/500` |
| `color/accent/sky/A05` | COLOR | #0369a1 ← `color/sky/700` |
| `color/accent/blue/A02` | COLOR | #dbeafe ← `color/blue/100` |
| `color/accent/blue/A03` | COLOR | #93c5fd ← `color/blue/300` |
| `color/accent/blue/A04` | COLOR | #3b82f6 ← `color/blue/500` |
| `color/accent/blue/A05` | COLOR | #1d4ed8 ← `color/blue/700` |
| `color/accent/indigo/A02` | COLOR | #e0e7ff ← `color/indigo/100` |
| `color/accent/indigo/A03` | COLOR | #a5b4fc ← `color/indigo/300` |
| `color/accent/indigo/A04` | COLOR | #6366f1 ← `color/indigo/500` |
| `color/accent/indigo/A05` | COLOR | #4338ca ← `color/indigo/700` |
| `color/accent/violet/A02` | COLOR | #ede9fe ← `color/violet/100` |
| `color/accent/violet/A03` | COLOR | #c4b5fd ← `color/violet/300` |
| `color/accent/violet/A04` | COLOR | #8b5cf6 ← `color/violet/500` |
| `color/accent/violet/A05` | COLOR | #6d28d9 ← `color/violet/700` |
| `color/accent/purple/A02` | COLOR | #f3e8ff ← `color/purple/100` |
| `color/accent/purple/A03` | COLOR | #d8b4fe ← `color/purple/300` |
| `color/accent/purple/A04` | COLOR | #a855f7 ← `color/purple/500` |
| `color/accent/purple/A05` | COLOR | #7e22ce ← `color/purple/700` |
| `color/accent/pink/A02` | COLOR | #fce7f3 ← `color/pink/100` |
| `color/accent/pink/A03` | COLOR | #f9a8d4 ← `color/pink/300` |
| `color/accent/pink/A04` | COLOR | #ec4899 ← `color/pink/500` |
| `color/accent/pink/A05` | COLOR | #be185d ← `color/pink/700` |
| `color/on-surface/invert` | COLOR | #0f172a ← `color/slate/900` |
| `color/content/on-brand` | COLOR | #ffffff ← `color/white` |
| `color/accent/red/A06` | COLOR | #7f1d1d ← `color/red/900` |
| `color/accent/orange/A06` | COLOR | #7c2d12 ← `color/orange/900` |
| `color/accent/amber/A06` | COLOR | #78350f ← `color/amber/900` |
| `color/accent/yellow/A06` | COLOR | #713f12 ← `color/yellow/900` |
| `color/accent/lime/A06` | COLOR | #365314 ← `color/lime/900` |
| `color/accent/green/A06` | COLOR | #14532d ← `color/green/900` |
| `color/accent/emerald/A06` | COLOR | #064e3b ← `color/emerald/900` |
| `color/accent/teal/A06` | COLOR | #134e4a ← `color/teal/900` |
| `color/accent/cyan/A06` | COLOR | #164e63 ← `color/cyan/900` |
| `color/accent/sky/A06` | COLOR | #0c4a6e ← `color/sky/900` |
| `color/accent/blue/A06` | COLOR | #1e3a8a ← `color/blue/900` |
| `color/accent/indigo/A06` | COLOR | #312e81 ← `color/indigo/900` |
| `color/accent/violet/A06` | COLOR | #4c1d95 ← `color/violet/900` |
| `color/accent/purple/A06` | COLOR | #581c87 ← `color/purple/900` |
| `color/accent/pink/A06` | COLOR | #831843 ← `color/pink/900` |
| `color/status/success/border/default` | COLOR | #d1fae5 ← `color/emerald/100` |
| `color/status/warning/border/default` | COLOR | #fef3c7 ← `color/amber/100` |
| `color/bg/solid` | COLOR | #e2e8f0 ← `color/slate/200` |
| `color/accent/red/A01` | COLOR | #fef2f2 ← `color/red/50` |
| `color/accent/orange/A01` | COLOR | #fff7ed ← `color/orange/50` |
| `color/accent/amber/A01` | COLOR | #fffbeb ← `color/amber/50` |
| `color/accent/yellow/A01` | COLOR | #fefce8 ← `color/yellow/50` |
| `color/accent/lime/A01` | COLOR | #f7fee7 ← `color/lime/50` |
| `color/accent/green/A01` | COLOR | #f0fdf4 ← `color/green/50` |
| `color/accent/emerald/A01` | COLOR | #ecfdf5 ← `color/emerald/50` |
| `color/accent/teal/A01` | COLOR | #f0fdfa ← `color/teal/50` |
| `color/accent/cyan/A01` | COLOR | #ecfeff ← `color/cyan/50` |
| `color/accent/sky/A01` | COLOR | #f0f9ff ← `color/sky/50` |
| `color/accent/blue/A01` | COLOR | #eff6ff ← `color/blue/50` |
| `color/accent/indigo/A01` | COLOR | #eef2ff ← `color/indigo/50` |
| `color/accent/violet/A01` | COLOR | #f5f3ff ← `color/violet/50` |
| `color/accent/purple/A01` | COLOR | #faf5ff ← `color/purple/50` |
| `color/accent/pink/A01` | COLOR | #fdf2f8 ← `color/pink/50` |
| `color/on-surface/action/selected-strong` | COLOR | #d8f0ff ← `color/dodger-blue/100` |
| `color/on-surface/sunken-strong` | COLOR | #cbd5e1 ← `color/slate/300` |
| `color/neutral/on-surface/default` | COLOR | #e2e8f0 ← `color/slate/200` |
| `color/neutral/on-surface/hover` | COLOR | #cbd5e1 ← `color/slate/300` |
| `color/neutral/on-surface/pressed` | COLOR | #94a3b8 ← `color/slate/400` |
| `color/neutral/on-surface/subtle` | COLOR | #f8fafc ← `color/slate/50` |
| `color/neutral/on-surface/muted` | COLOR | #f1f5f9 ← `color/slate/100` |
| `color/neutral/content/default` | COLOR | #0f172a ← `color/slate/900` |
| `color/neutral/content/strong` | COLOR | #0f172a ← `color/slate/900` |
| `color/neutral/border/default` | COLOR | #cbd5e1 ← `color/slate/300` |
| `color/neutral/border/strong` | COLOR | #94a3b8 ← `color/slate/400` |
| `color/brand/decorative/gradient/from` | COLOR | #192450 ← `color/dodger-blue/975` |
| `color/brand/decorative/gradient/via` | COLOR | #1789fa ← `color/dodger-blue/600` |
| `color/brand/decorative/gradient/to` | COLOR | #55ebff ← `color/neon-cyan/300` |
| `color/status/active/on-surface/default` | COLOR | #4ade80 ← `color/green/400` |
| `color/status/active/content/default` | COLOR | #22c55e ← `color/green/500` |
| `color/status/active/on-surface/muted` | COLOR | #dcfce7 ← `color/green/100` |
| `color/status/error/border/strong` | COLOR | #ef4444 ← `color/red/500` |
| `color/status/error/border/default` | COLOR | #fee2e2 ← `color/red/100` |
| `color/status/warning/border/strong` | COLOR | #f59e0b ← `color/amber/500` |
| `color/status/info/border/default` | COLOR | #e0f2fe ← `color/sky/100` |
| `color/status/info/border/strong` | COLOR | #0ea5e9 ← `color/sky/500` |
| `color/status/success/border/strong` | COLOR | #10b981 ← `color/emerald/500` |
| `color/brand/primary/content/on-fill` | COLOR | #ffffff ← `color/white` |
| `color/brand/secondary/content/on-fill` | COLOR | #ffffff ← `color/white` |
| `color/status/error/content/on-fill` | COLOR | #ffffff ← `color/white` |
| `color/status/success/content/on-fill` | COLOR | #ffffff ← `color/white` |
| `color/status/info/content/on-fill` | COLOR | #ffffff ← `color/white` |
| `color/status/warning/content/on-fill` | COLOR | #ffffff ← `color/white` |
| `color/status/active/content/on-fill` | COLOR | #ffffff ← `color/white` |

</details>

<details>
<summary>Typography (51)</summary>

| Variable | Type | Desktop | Mobile |
|---|---|---|---|
| `typography/display/large/font-size` | FLOAT | 60 ← `font/size/6xl` | 48 ← `font/size/5xl` |
| `typography/display/large/line-height` | FLOAT | 72 | 48 |
| `typography/display/large/font-weight` | FLOAT | 700 ← `font/weight/bold` | 700 ← `font/weight/bold` |
| `typography/display/medium/font-size` | FLOAT | 48 ← `font/size/5xl` | 36 ← `font/size/4xl` |
| `typography/display/medium/line-height` | FLOAT | 56 | 44 |
| `typography/display/medium/font-weight` | FLOAT | 700 ← `font/weight/bold` | 700 ← `font/weight/bold` |
| `typography/display/small/font-size` | FLOAT | 36 ← `font/size/4xl` | 30 ← `font/size/3xl` |
| `typography/display/small/line-height` | FLOAT | 48 | 40 |
| `typography/display/small/font-weight` | FLOAT | 600 ← `font/weight/semibold` | 600 ← `font/weight/semibold` |
| `typography/heading/large/font-size` | FLOAT | 24 ← `font/size/2xl` | 24 ← `font/size/2xl` |
| `typography/heading/large/line-height` | FLOAT | 32 ← `font/leading/8` | 32 ← `font/leading/8` |
| `typography/heading/large/font-weight` | FLOAT | 600 ← `font/weight/semibold` | 600 ← `font/weight/semibold` |
| `typography/heading/medium/font-size` | FLOAT | 20 ← `font/size/xl` | 20 ← `font/size/xl` |
| `typography/heading/medium/line-height` | FLOAT | 28 ← `font/leading/7` | 28 ← `font/leading/7` |
| `typography/heading/medium/font-weight` | FLOAT | 600 ← `font/weight/semibold` | 600 ← `font/weight/semibold` |
| `typography/heading/small/font-size` | FLOAT | 16 ← `font/size/base` | 16 ← `font/size/base` |
| `typography/heading/small/line-height` | FLOAT | 24 ← `font/leading/6` | 24 ← `font/leading/6` |
| `typography/heading/small/font-weight` | FLOAT | 600 ← `font/weight/semibold` | 600 ← `font/weight/semibold` |
| `typography/body/large/font-size` | FLOAT | 16 ← `font/size/base` | 16 ← `font/size/base` |
| `typography/body/large/line-height` | FLOAT | 24 | 24 |
| `typography/body/large/font-weight` | FLOAT | 400 ← `font/weight/normal` | 400 ← `font/weight/normal` |
| `typography/body/medium/font-size` | FLOAT | 14 ← `font/size/sm` | 14 ← `font/size/sm` |
| `typography/body/medium/line-height` | FLOAT | 20 | 20 |
| `typography/body/medium/font-weight` | FLOAT | 400 ← `font/weight/normal` | 400 ← `font/weight/normal` |
| `typography/body/small/font-size` | FLOAT | 12 ← `font/size/xs` | 12 ← `font/size/xs` |
| `typography/body/small/line-height` | FLOAT | 16 | 16 |
| `typography/body/small/font-weight` | FLOAT | 400 ← `font/weight/normal` | 400 ← `font/weight/normal` |
| `typography/label/large/font-size` | FLOAT | 16 ← `font/size/base` | 16 ← `font/size/base` |
| `typography/label/large/line-height` | FLOAT | 24 ← `font/leading/6` | 24 ← `font/leading/6` |
| `typography/label/large/font-weight` | FLOAT | 500 ← `font/weight/medium` | 500 ← `font/weight/medium` |
| `typography/label/medium/font-size` | FLOAT | 14 ← `font/size/sm` | 14 ← `font/size/sm` |
| `typography/label/medium/line-height` | FLOAT | 20 ← `font/leading/5` | 20 ← `font/leading/5` |
| `typography/label/medium/font-weight` | FLOAT | 500 ← `font/weight/medium` | 500 ← `font/weight/medium` |
| `typography/label/small/font-size` | FLOAT | 12 ← `font/size/xs` | 12 ← `font/size/xs` |
| `typography/label/small/line-height` | FLOAT | 16 ← `font/leading/4` | 16 ← `font/leading/4` |
| `typography/label/small/font-weight` | FLOAT | 500 ← `font/weight/medium` | 500 ← `font/weight/medium` |
| `typography/caption/font-size` | FLOAT | 12 ← `font/size/xs` | 12 ← `font/size/xs` |
| `typography/caption/line-height` | FLOAT | 16 ← `font/leading/4` | 16 ← `font/leading/4` |
| `typography/caption/font-weight` | FLOAT | 400 ← `font/weight/normal` | 400 ← `font/weight/normal` |
| `typography/label/xsmall/font-size` | FLOAT | 10 ← `font/size/2xs` | 10 ← `font/size/2xs` |
| `typography/label/xsmall/line-height` | FLOAT | 16 ← `font/leading/4` | 16 ← `font/leading/4` |
| `typography/label/xsmall/font-weight` | FLOAT | 500 ← `font/weight/medium` | 500 ← `font/weight/medium` |
| `typography/prose/large/font-size` | FLOAT | 16 ← `font/size/base` | 16 ← `font/size/base` |
| `typography/prose/large/line-height` | FLOAT | 24 | 24 |
| `typography/prose/large/font-weight` | FLOAT | 400 ← `font/weight/normal` | 400 ← `font/weight/normal` |
| `typography/prose/medium/font-size` | FLOAT | 14 ← `font/size/sm` | 14 ← `font/size/sm` |
| `typography/prose/medium/line-height` | FLOAT | 22 | 20 |
| `typography/prose/medium/font-weight` | FLOAT | 400 ← `font/weight/normal` | 400 ← `font/weight/normal` |
| `typography/prose/small/font-size` | FLOAT | 12 ← `font/size/xs` | 12 ← `font/size/xs` |
| `typography/prose/small/line-height` | FLOAT | 18 | 16 |
| `typography/prose/small/font-weight` | FLOAT | 400 ← `font/weight/normal` | 400 ← `font/weight/normal` |

</details>

<details>
<summary>Product Style (3)</summary>

| Variable | Type | cariva app | back office | HosXP |
|---|---|---|---|---|
| `font-family/ui` | STRING | IBM Plex Sans Thai | IBM Plex Sans Thai | Aktiv Grotesk Thai |
| `font-family/prose` | STRING | IBM Plex Sans Thai Looped | IBM Plex Sans Thai Looped | Google Sans |
| `font-family/display` | STRING | Malila | Malila | Malila |

</details>


