# Button — separate sets (icon / loading / link / decorative)

Read from Figma on 26 November 2026, Button page in the Cariva Core Design System file. The user confirmed the names and API as proposed by Claude. The usage documentation is in the `Button Doc (Template)` frame of the Button page. For the main `button` set see [BUTTON-FIGMA.md](BUTTON-FIGMA.md); for `button-split` / `button-mic` see [BUTTON-SPLIT-FIGMA.md](BUTTON-SPLIT-FIGMA.md) / [BUTTON-MIC-FIGMA.md](BUTTON-MIC-FIGMA.md)

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26` / `oldVariantNames_2026-11-26`)

| New name | Previous name | Changed props | instances before → after |
|---|---|---|---|
| `button-icon` (108 variants) | `crv-button-icon` | `variant` contained / outlined / ghost → `default` / `outline` / `ghost`; `color` primary / error / neutral → `primary` / `destructive` / `secondary`; `size` large / medium / small → `lg` / `default` / `sm` | 141 → 141 |
| `button-loading` (9 variants) | `crv-button-loading` | `variant` contained / outlined / text → `default` / `outline` / `ghost`; `size` small / medium / large → `sm` / `default` / `lg` | 3 → 3 |
| `button-link` (12 variants) | `crv-link` | `size` large / medium / small → `lg` / `default` / `sm` | 1 → 1 |
| `button-decorative` (12 variants) | `crv-button-decorative` | `size` → `lg` / `default` / `sm` | 1 → 1 |

## Spec (read from variables in Figma)

**button-icon:** round, size lg 48 (padding 12, icon 24) · default 40 (padding 8, icon 24) · sm 32 (padding 8, icon 16). Colors are the same as the main button by `variant` × `color`. This is the only set that has contained + neutral (fill `neutral/on-surface/default`, hover `/hover`, pressed `/pressed`, icon `neutral/content/default`), and when disabled, ghost has fill `on-surface/action/disabled` (the text button has none)

**button-loading:** a button with a loading icon (`data-usage`) + text. While loading, every kind uses text and icon color `content/disabled` · contained fill `on-surface/action/disabled` · outline no fill, 1px `border/default` line · ghost no fill. Size and padding are the same as the main button (32 / 40 / 48, icon 16 / 24 / 24)

**button-link:** corner radius 12, no horizontal padding (vertical 8 / 8 / 12), with icons before and after, text 16/24 Medium underlined, color `content/link/default` (hover `/hover`, pressed `/pressed`, disabled `content/disabled`)

**button-decorative:** pill with fill `brand/decorative/gradient/from` + an overlaid radial gradient (from `from` transparent at the center → `via` at 75% → `to` at the edge; ellipse 50% of the width wide and 130% of the height tall). hover has a glow shadow `0 0 4px` in primary 36% · pressed opacity 85% · disabled fill `on-surface/action/disabled`, no gradient, text `content/disabled`

## Figma names ↔ code (uses the same `Button`, `ui/button.tsx`)

| Figma | Code |
|---|---|
| `button-icon` `size` lg / default / sm | `size="icon-lg"` / `"icon"` / `"icon-sm"` |
| `button-icon` `variant` / `color` | `variant` `default` / `outline` / `ghost`, `color` `primary` / `destructive` / `secondary` |
| `button-loading` | `<Button disabled aria-busy><Spinner />…</Button>` (no `loading` prop) |
| `button-link` | `variant="link"` |
| `button-decorative` | `variant="decorative"` |
| `data-usage` loading icon | `Spinner` (uses the `DataUsageRounded` icon) |

## Code (26 Nov 2026)

| Topic | Status |
|---|---|
| Icon buttons: sizes 48 / 40 / 32, icons 24 / 24 / 16, padding, fill / text / border colors for 3 variants × 3 colors, disabled colors for every kind | Matches (measured in the `IconButtons` story) |
| loading: height, padding, gap, text size, icon size for all 3 sizes, disabled colors, outline has a border, ghost is transparent, width 104 (default) | Matches (measured in the `LoadingButtons` story) |
| link: height 32 / 40 / 48, horizontal padding 0, gap, color `#2563EB`, underline, corner radius 12, icons, disabled | Matches (measured in the `LinkButtons` story) |
| link hover `#1D4ED8` | Matches (measured with a real mouse) |
| decorative: height, padding, gap, fill `#192450`, radial gradient (`#1789FA` 75% → `#55EBFF`), white text, disabled fill `#F1F5F9` no gradient | Matches (measured in the `DecorativeButtons` story) |
| Overall comparison with Figma (icon, loading, decorative, link) | Checked visually (matches) |

**Decided by Claude / user confirmed:** no `loading` prop added (uses `disabled` + `aria-busy` + `Spinner`; keeping the outline border while loading relies on `aria-busy`) · icon buttons use the code's existing size names (`icon-*`) with no new prop · `Spinner` changed its icon to Figma's `data-usage` system-wide

**Impact:**
- `Button variant="link"` was previously primary blue and underlined on hover; now it is always underlined, uses the link color, has no horizontal padding and corner radius 12
- `Button variant="decorative"` changed from a linear gradient to radial per Figma, and the `--decorative-gradient` token in the theme changed too (generated from `scripts/generate-shadcn-theme.js`)
- `size="icon-sm"` was previously 24px (padding 4); now 32px (padding 8, icon 16)
- `variant="default" color="secondary"` was previously the shadcn secondary color; now it is neutral (`#E2E8F0`, text `#0F172A`)
- `Spinner` was previously a hugeicons stroke icon; now it is the ring icon from Figma everywhere Spinner is used

**Not yet measured:** hover / pressed of every icon button kind (set from the token, checked visually against Figma), pressed 85% and the hover glow of decorative, hover / pressed / arrows of link other than the default size, the width of loading / decorative when the text differs from "Label" (a 2px deviation from the font is tolerated)

## Requested code motion — 27 November 2026

`Button variant="decorative"` preserves the original Figma radial gradient exactly. An edge-masked copy of that same gradient breathes inward/outward over 6s (scaleX 1.12–0.80, opacity .12–.95). The central 44% of the overlay is transparent, so the label region retains the original fill. Fine-pointer hover strengthens the outer glow over 240ms. No new colors, props or geometry. Disabled/aria-disabled omit the aura; reduced motion removes aura/glow/transitions. Figma remains unchanged; only code motion is added.

Motion visibility refinement: increased side-layer travel and opacity after user feedback that the movement was no longer visible. Feathered outer mask edges avoid a hard moving seam; original base gradient remains unchanged.

Smoothness correction: removed the masked duplicate layer that produced visible stripes. The original continuous Figma gradient now breathes via centered background-size 112%–100% over 6s. This repaints the small button background; no moving mask seams or label motion. Supersedes the overlay implementation above.

Emil visibility refinement: continuous original gradient now breathes between 165% and 100% centered width over 5s, retaining a smooth ease-in-out loop. Wider travel makes both cyan edges visibly approach and retreat without layered seams.

Idle color refinement: added soft static cyan inset light on both sides using the existing gradient-to token. The 165%–100% / 5s animation remains unchanged. This is a requested code visual adjustment beyond the static Figma fill.

Loop pacing refinement: 4s cycle with cubic-bezier(.37,0,.63,1), reducing perceived dwell at the turnarounds. Color and travel unchanged.

Latest pacing: 3s, cubic-bezier(.25,0,.75,1), shortening the turnaround dwell further after user feedback. Color and travel unchanged.

Clarified pacing: restore 5s cycle with linear interpolation. User wanted to remove turnaround dwell rather than accelerate the fade. Both halves connect immediately; fill, color and travel stay unchanged. Supersedes earlier speed refinements.

Emil perceptual-dwell correction: cap background expansion at 125% instead of 165%, keeping cyan within the visible button throughout the 5s linear loop. Removes the visually inactive out-of-bounds part rather than accelerating the fade. Original gradient stops/colors and idle side light unchanged.

| Before | After | Why |
| --- | --- | --- |
| 165% expansion pushes cyan beyond clipping | 125% expansion keeps light visible | Continuous perceived motion at the turnaround |

Latest user-requested speed: 2.5s linear cycle (1.25s per direction); 125%–100% travel and colors unchanged.

Color continuity correction: removed the added inset cyan shadows, which overlapped the original gradient and created an apparent extra color layer. Uses only the original continuous fill; 2.5s animation and outer hover glow unchanged. Supersedes idle inset-light refinement.

Emil gradient refinement: replace transparent-to-blue alpha interpolation with opaque token-based stops at 0/25/50/75/100%. Intermediate navy/blue mixes soften the central transition. This is an explicitly requested code deviation from the original Figma gradient interpolation. Animation remains 2.5s linear, 125%–100%.

| Before | After | Why |
| --- | --- | --- |
| Transparent navy blended over navy base | Opaque navy and gradual navy/blue mixes | Reduce visible transition bands without changing motion |
