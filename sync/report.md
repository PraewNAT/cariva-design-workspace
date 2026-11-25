# Figma ↔ Code drift report

สร้างเมื่อ 2026-11-24T09:00:29.419Z · Figma snapshot 2026-11-24T08:54:13.373Z

ค่าที่เทียบ: ความสูง, padding, gap, radius, สีพื้น/เส้นขอบ, ตัวอักษร (size, line height, weight, family, สี) ของ variant ที่ไม่ใช่ hover/pressed/focused

| Component | สถานะ | variant ที่เทียบ | จุดต่าง |
|---|---|---|---|
| CrvButton | ⚠️ ต่างกัน | 60/120 | 7 |
| CrvInput | ⚠️ ต่างกัน | 10/18 | 3 |
| CrvDropdown | ⚠️ ต่างกัน | 10/18 | 3 |

## ต่างกันทุก component (น่าจะเป็นเรื่องระดับ theme/token)

- **font family**: Figma `IBM Plex Sans Thai` → code `Aktiv Grotesk Thai`

## CrvButton — ⚠️ ต่างกัน

Figma node `3646:28000` · ต้นฉบับ: figma

| ชิ้นส่วน | ค่า | Figma | Code | variant ที่โดน |
|---|---|---|---|---|
| box | ความสูง | 40 | 36 | 20 variants (เช่น contained · primary · medium) |
| label | font size | 16 | 14 | 20 variants (เช่น contained · primary · medium) |
| label | line height | 24 | 20 | 20 variants (เช่น contained · primary · medium) |
| box | สีเส้นขอบ | #2da4ff (color/brand/primary/border/strong) | #8bd8ff | outlined · primary · medium, outlined · primary · large, outlined · primary · small |
| box | padding | 8 16 8 16 | 8 15 8 15 | outlined · primary · disabled · medium, outlined · error · disabled · medium, outlined · neutral · disabled · medium |
| box | padding | 12 24 12 24 | 12 23 12 23 | outlined · primary · disabled · large, outlined · error · disabled · large, outlined · neutral · disabled · large |
| box | padding | 8 12 8 12 | 8 11 8 11 | outlined · primary · disabled · small, outlined · error · disabled · small, outlined · neutral · disabled · small |

## CrvInput — ⚠️ ต่างกัน

Figma node `3760:6623` · ต้นฉบับ: figma

| ชิ้นส่วน | ค่า | Figma | Code | variant ที่โดน |
|---|---|---|---|---|
| field | ความสูง | 36 | 39 | 5 variants (เช่น small) |
| value | font size | 14 | 16 | 5 variants (เช่น small) |
| value | line height | 20 | 24 | small · true, small · true · true |

## CrvDropdown — ⚠️ ต่างกัน

Figma node `3875:3909` · ต้นฉบับ: figma

| ชิ้นส่วน | ค่า | Figma | Code | variant ที่โดน |
|---|---|---|---|---|
| field | ความสูง | 36 | 38 | 5 variants (เช่น small) |
| label | สีตัวอักษร | #dc2626 (color/status/error/content/default) | #0f172a (color/content/primary) | medium · true, small · true, medium · true · true, small · true · true |
| label | สีตัวอักษร | #94a3b8 (color/content/disabled) | #0f172a (color/content/primary) | medium · true, small · true |
