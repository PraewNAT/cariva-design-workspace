# Chip — Figma specification

Read from Figma on 26 November 2026: [Chip](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4459-62744) (Cariva Core Design System file); every colour in the set is bound to a variable in the file (392 places, no old library, no raw colours)

## Sets in Figma (renamed; the original names are backed up in plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| New name | Original name | instances (before → after) |
|---|---|---|
| `chip` | `crv-chip-action` | 8 → 8 |

The `size` values changed medium → `default`, small → `sm`; `variant` (filled / outlined / surface), `color` (default / primary) and `state` are unchanged

## Spec

- Capsule (corner radius 9999) padding 4; `default` height 32 text 14/20 Medium; `sm` height 24 text 12/16 Medium; the text has 4 left and right padding
- thumbnail (avatar) 24 (sm 20); delete button 24 (sm 16), hidden by default
- filled default: fill `on-surface/subtle` · filled primary: fill `brand/primary/on-surface/default`, text `brand/primary/content/on-fill`, icon `content/on-brand`
- outlined: 1px border `border/default` (primary: `brand/primary/border/default`, text `brand/primary/content/default`)
- surface: fill `on-surface/default`, no border (primary: text `brand/primary/content/default`)
- hover / pressed: fill `on-surface/action/hover` / `…/pressed` (filled primary uses `brand/primary/on-surface/hover` / `pressed`; outlined and surface primary use `brand/primary/on-surface/subtle`); pressed has a drop shadow with radius 2
- disabled: fill `on-surface/action/disabled` (outlined has no fill), text and icon `content/disabled`
- delete icon: `content/secondary` (primary: `brand/primary/content/default`, filled primary: `content/on-brand`)

## Figma names ↔ Code

| Figma | Code |
|---|---|
| `chip` | `Chip` (`ui/chip.tsx`) |
| `size` default / sm | `size` |
| `variant`, `color` | `variant`, `color` |
| `state` disabled | `disabled` |
| `state` hover / pressed | CSS (`hover:`, `active:`) |
| `thumbnailVisible` | prop `thumbnail` |
| `deleteVisible` | prop `onDelete` (a delete button appears when a function is passed) |
| `label` | children |

## Code (26 Nov 2026)

The existing DS had no Chip (Badge is a display-only label that cannot be pressed), so it was created new in Core as a DS gap that has been reported; `npx shadcn add` was not used

| Topic | Status |
|---|---|
| Height 32 / 24, width 45 / 41 (text "Chip"), capsule corner radius | matches (measured in story) |
| Fill for filled default / primary / disabled, outlined primary border | matches (measured in story) |
| Delete button 24×24 | matches (measured in story) |
| hover / pressed colours, icon colour, thumbnail 24/20, sm delete button 16 | set per Figma, **not measured** |
| Delete icon | uses the Material "cancel" shape, the same stroke as Figma (the path was not copied from Figma) |

**Decided together with the user:** when pressed, use the `shadow/sm` shadow from token `--cds-shadow-sm` (added 26 Nov 2026, not yet measured while really pressed); disabled has no shadow; `surface` is a white fill with no border per Figma (the user has not yet confirmed that this is intentional)

**Added by Claude:** a 2px keyboard focus ring `border/system` (Figma has no focus state)
