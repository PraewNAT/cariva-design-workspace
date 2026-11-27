# Mira Product DS

Source: [MIRA Component Library](https://www.figma.com/design/37MSJL69dK206ouPp4F1xW/MIRA-Component-Library?node-id=0-1), read 2026-11-27.

Mira is a Product design system. Its **Mira Semantic / Mode 1** collection contains 25 local aliases: five roles each for blue, emerald, cyan, pink and purple Workflow Cards. Preserve these separately from Core brand/status tokens. Runtime CSS is `src/lib/products/mira/theme/mira.css`; snapshot is `theme/tokens.json`. Per-token IDs, alias targets, resolved values and property definitions are saved in FIGMA-SOURCE-2026-11-27.json.

| Family | Gradient start → end | Icon / badge surface | Strong | Subtle |
|---|---|---|---|---|
| blue | #eef9ff → #d8f0ff | #bae6ff | #164e92 | #2da4ff |
| emerald | #ecfdf5 → #d1fae5 | #a7f3d0 | #064e3b | #10b981 |
| cyan | #ebfeff → #cdfbff | #a1f5ff | #134f66 | #00bcdc |
| pink | #fdf2f8 → #fce7f3 | #fbcfe8 | #831843 | #ec4899 |
| purple | #faf5ff → #f3e8ff | #e9d5ff | #581c87 | #a855f7 |

Card gradients are radial, ellipse 100% × 100%, centered 50% 0%, derived from the Figma paint transform. These values are Mira source data, not authorization to recolor Core or unrelated Mira components.

Resolved Product Style roles: UI **Aktiv Grotesk Thai**, display **Malila** (remote collection modes `cariva app` / `back office`). No font files for either are installed. New Mira components scope these family names with IBM Plex Sans Thai fallback; previews do not claim font parity. Recorder time resolves imported `theme/foreground` to #020618. Other Recorder surfaces, status colors, borders, shadow and decorative action use verified shared Core recipes matching the source bindings.

Geometry: Workflow Card 180×180, radius32, padding24, icon box40/radius12, asset24. Recorder width325/radius16/padding16 with bottom24; recording/pause 364px tall. Transport variants grow from source432 to438px to accommodate 12px timeline text without clipping. Long content can grow cards and width is bounded by available space.

Source `Soon` and timeline labels use 10px. Workspace minimum takes precedence: both render at12px. This is an explicit code deviation; Figma is unchanged. Preserve source subtle colors; low contrast remains an audit finding pending a Product design decision.

Recording motion (user requested2026-11-27): only recording waveform bars scale between.45 and1 on staggered1.4–1.88s ease-in-out loops. No flashing opacity or layout changes; pause and transport stay static. Reduced motion removes the animation. This is a new code behavior requested by the user, not motion extracted from the static Figma specimen.
