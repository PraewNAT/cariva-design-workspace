# FAB (Floating Action Button) — Figma specification

Read from Figma on 26 November 2026: [Floating Action Button](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4497-64124) (Cariva Core Design System file). All 60 color points are bound to variables in the file.

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| New name | Original name | instance (before → after) |
|---|---|---|
| `fab` | `crv-fab` | 6 → 6 |

`size` values: small → `sm`, medium → `default`, large → `lg`; `color` values: neutral → `secondary` (primary unchanged); `state` unchanged. The text `crv-fab` in the `📄 FAB Doc` frame (2 places) has been changed to `fab`. The prop names in the doc frame (`size: small | medium | large`, `neutral`) have not been updated yet.

## Spec

| size | Size | Icon |
|---|---|---|
| `sm` | 40 | 20 |
| `default` | 56 | 24 |
| `lg` | 64 | 28 |

- Circular; primary: fill `brand/primary/on-surface/default` (hover `…/hover`, pressed `…/pressed`), icon `brand/primary/content/on-fill`
- secondary (neutral): fill `on-surface/default`, 1px `border/default` border (hover and pressed: border `border/strong`, fill `on-surface/action/hover` / `…/pressed`), icon `neutral/content/default`
- disabled: fill `on-surface/action/disabled`, icon `content/disabled`, no shadow (secondary border `border/disabled`)
- Shadow: normal `shadow/2xl` · hover `shadow/xl` · pressed `shadow/md` (effect styles in Figma)

## Shadow token (new 26 Nov 2026)

Added a `shadow` group to `tokens.json`, read from the actual `shadow/*` effect styles in Figma (`sm`, `default`, `md`, `lg`, `xl`, `2xl`, `inner`, `status/error|warning|info|success|notification`). The generator outputs `--cds-shadow-<name>` in `semantic.generated.css`, used in Tailwind as `shadow-[var(--cds-shadow-2xl)]`, and `glow/*` (`primary`, `error`, `success`, `warning`, `info`, `default`) is output as `--cds-glow-<name>`. The `system` effect style (focus ring) and `blur/*` are not included.

## Figma names ↔ Code

| Figma | Code |
|---|---|
| `fab` | `Fab` (`ui/fab.tsx`) |
| `size` sm / default / lg | `size` |
| `color` primary / secondary | `color` |
| `state` disabled | `disabled` |
| `state` hover / pressed | CSS (`hover:`, `active:`) |

## Code (26 Nov 2026)

The DS has no FAB (Button `icon-lg` is 48 tall, unlike 40 / 56 / 64, and has no shadow), so it was newly created in Core, built on the same Base UI Button primitive as Button. This is a DS gap that has been reported.

| Item | Status |
|---|---|
| Sizes 40 / 56 / 64, icon 24 (default) | matches (measured in story) |
| Fill colors: primary `#1789FA`, secondary white, disabled `#F1F5F9`, disabled has no shadow | matches (measured in story) |
| Normal shadow is tinted `rgba(30,58,138)` from the token | matches (checked that the value exists) |
| Hover / pressed shadow, secondary border, icons 20 / 28 | set per Figma, **not measured** |

**Added by us:** 2px keyboard focus ring `border/system` (Figma has no focus state)

**Impact on other parts:** the new shadow token is now used by Button `elevated`, the hover shadow of Checkbox Card and the pressed shadow of Chip (see each component's doc)
