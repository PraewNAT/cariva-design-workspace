# Figma ↔ Code drift report

Generated 2026-11-24T09:00:29.419Z · Figma snapshot 2026-11-24T08:54:13.373Z

Values compared: height, padding, gap, radius, fill/border color, text (size, line height, weight, family, color) of variants that are not hover/pressed/focused

| Component | Status | Variants compared | Differences |
|---|---|---|---|
| CrvButton | ⚠️ Differs | 60/120 | 7 |
| CrvInput | ⚠️ Differs | 10/18 | 3 |
| CrvDropdown | ⚠️ Differs | 10/18 | 3 |

## Differs in every component (probably theme/token level)

- **font family**: Figma `IBM Plex Sans Thai` → code `Aktiv Grotesk Thai`

## CrvButton — ⚠️ Differs

Figma node `3646:28000` · Source: figma

| Part | Value | Figma | Code | Variants affected |
|---|---|---|---|---|
| box | height | 40 | 36 | 20 variants (e.g. contained · primary · medium) |
| label | font size | 16 | 14 | 20 variants (e.g. contained · primary · medium) |
| label | line height | 24 | 20 | 20 variants (e.g. contained · primary · medium) |
| box | border color | #2da4ff (color/brand/primary/border/strong) | #8bd8ff | outlined · primary · medium, outlined · primary · large, outlined · primary · small |
| box | padding | 8 16 8 16 | 8 15 8 15 | outlined · primary · disabled · medium, outlined · error · disabled · medium, outlined · neutral · disabled · medium |
| box | padding | 12 24 12 24 | 12 23 12 23 | outlined · primary · disabled · large, outlined · error · disabled · large, outlined · neutral · disabled · large |
| box | padding | 8 12 8 12 | 8 11 8 11 | outlined · primary · disabled · small, outlined · error · disabled · small, outlined · neutral · disabled · small |

## CrvInput — ⚠️ Differs

Figma node `3760:6623` · Source: figma

| Part | Value | Figma | Code | Variants affected |
|---|---|---|---|---|
| field | height | 36 | 39 | 5 variants (e.g. small) |
| value | font size | 14 | 16 | 5 variants (e.g. small) |
| value | line height | 20 | 24 | small · true, small · true · true |

## CrvDropdown — ⚠️ Differs

Figma node `3875:3909` · Source: figma

| Part | Value | Figma | Code | Variants affected |
|---|---|---|---|---|
| field | height | 36 | 38 | 5 variants (e.g. small) |
| label | text color | #dc2626 (color/status/error/content/default) | #0f172a (color/content/primary) | medium · true, small · true, medium · true · true, small · true · true |
| label | text color | #94a3b8 (color/content/disabled) | #0f172a (color/content/primary) | medium · true, small · true |
