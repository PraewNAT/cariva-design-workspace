# Toggle Group — Figma specification

Read from Figma on 26 November 2026: [Toggle Group](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=6938-115) (Cariva Core Design System file; this page has 🚧). The user confirmed the approach Claude proposed: use the Draft set (capsule) as the main `toggle-group`, and do not build the original set (joined squares). This page had no doc frame before; a `Documentation Card` (node `7286:104536`) has been created.

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | prop |
|---|---|---|
| `toggle-group-item` | `crv-segment-item` | `appearance` segmented / default / outline, `selected`, `state` default / hover / pressed / disabled, `label` |
| `toggle-group` | `crv-toggle-group-new` | `orientation` horizontal / vertical, `appearance` default / outline |
| `language-switcher` | `crv-language-switcher` | `language` TH / EN, `disabled` |
| `toggle-button` | `crv-toggle-button` | `size` medium / small / large / xSmall → `default` / `sm` / `lg` / `xs`; `label`, `icon`, `selected`, `state` |
| `toggle-button-group` | `crv-toggle-group` | `size` same, `orientation` horizontal / vertical |

**Re-bound in Figma:** all three Draft sets used instances of `crv-segment-item` from an external library (19 places) and 52 color bindings pointed at variables of the old library; these were changed to the same-named instances and variables within the file (the original entries are backed up in `remoteMain_2026-11-26` and `remoteBindings_2026-11-26`). Only the `LanguageRounded` icon from the icon library remains.

## Spec

- item: capsule, height 32, padding 4/12, gap 8, min width 64, text 14/20 Regular `content/primary`
- default: normal is transparent · hover / pressed / selected fill `on-surface/action/selected` · disabled text `content/disabled` (the selected item still has a fill)
- outline: same as default but with a 1px `border/default` border in every state
- segmented: the selected item has fill `on-surface/elevated`; unselected items have no hover or pressed
- group: gap 8 · vertical width 64
- language-switcher: 160×40 track, fill `on-surface/subtle`, padding 4, gap 4, fully rounded corners, globe icon 16 `content/secondary`, then TH / EN

## Figma name ↔ code

| Figma | Code |
|---|---|
| `toggle-group` | `ToggleGroup` (`variant` default / outline, `orientation`) |
| `appearance` | prop `variant` (`default`, `outline`, `segmented`) |
| `toggle-group-item` | `ToggleGroupItem` and standalone `Toggle` (`value`, `disabled`, `defaultPressed`) |
| `appearance=segmented` | `SegmentedControl` (= `ToggleGroup variant="segmented"`, single selection) |
| `language-switcher` | `LanguageSwitcher` (`app/language-switcher.tsx`; `value`, `defaultValue`, `onValueChange`, `disabled`) |
| `selected`, `state` hover / pressed | Base UI `data-pressed` and CSS |

## Code (26 Nov 2026)

Sources: `ui/toggle.tsx`, `ui/toggle-group.tsx`, `app/language-switcher.tsx`. The globe icon is copied from Figma into `app/icons.tsx`. Stories at `Core/Components/Toggle` and `Core/Components/Toggle Group`: `Geometry`, `Appearances`, `AppearanceAndOrientation`, `Selection`, `Segmented`, `LanguageSwitchers`

| Topic | Status |
|---|---|
| item height 32, width 64, padding 12/4, gap 8, text 14/20/400, fully rounded corners | matches (measured) |
| default and outline: normal, selected, disabled | matches (measured) |
| group: gap 8, vertical width 64, height 3 items + 8 + 8, outline border | matches (measured) |
| segmented: track `#F8FAFC`, padding and gap 4, height 40, selected item white | matches (measured) |
| language-switcher 160×40, switches language, pressing again does not deselect, disabled | matches (measured and tested) |
| hover / pressed colors of default and outline | set per Figma **not yet measured with a real mouse** |

**Impact:** the existing `Toggle` and `ToggleGroup` (used on the Catalog page) change appearance from the shadcn capsule to the Figma capsule: height 32, min width 64, gap 8 (previously 8 / could be joined) and no 3px focus ring

**Removed things Figma does not have:** the `sm` / `lg` sizes and the group `spacing` (this set has a single size, height 32). Multiple sizes would need a design (the original `crv-toggle-button` set has 4 sizes, but we chose not to build them)

**Not yet checked:** options with icons (Figma has none), multiple selection (`multiple`) — Figma has no separate design for it

## Joined-square button set `toggle-button` / `toggle-button-group` (26 Nov 2026, user confirmed as proposed to use both systems)

Renamed `crv-toggle-button` → `toggle-button` (instances 40 → 40) and `crv-toggle-group` → `toggle-button-group`; original names backed up in plugin data

**Spec (read from variables in Figma):**
- group: a single frame with a built-in 1px `border/default` stroke (group height = button height), corner radius 8 clipping the content, no gap between buttons, separated by a 1px line on the left (vertical: top line) of the 2nd button onward
- sizes: xs height 24 padding 8 gap 4 text 12/16 · sm height 32 padding 12 gap 4 text 12/16 · default height 36 padding 16 gap 8 text 14/20 · lg height 48 padding 24 gap 12 text 16/24 · text Medium · icon 16 / 16 / 20 / 24 (off by default)
- normal: text `content/secondary` · hover fill `on-surface/action/hover`, text `content/primary` · pressed fill `on-surface/action/pressed` · disabled text `content/disabled`
- selected: fill `brand/primary/on-surface/default` (hover `/hover`, pressed `/pressed`), text `brand/primary/content/on-fill` · selected and disabled: fill `on-surface/action/disabled`, text `content/disabled`

**Figma name ↔ code:**

| Figma | Code |
|---|---|
| `toggle-button-group` | `ToggleGroup variant="joined"` (`size` `xs` / `sm` / `default` / `lg`, `orientation`) |
| `toggle-button` | `ToggleGroupItem` inside a joined group (`ui/toggle.tsx` variant `joined`) |
| `label`, `icon` | children (text / `svg`) |
| `selected` | group `defaultValue` / `value` (Base UI `data-pressed`) |
| `state` hover / pressed / disabled | CSS / `disabled` |

**Code:** measured in the story `JoinedSizesAndOrientation` (4 sizes × horizontal/vertical: height, group width ±3px, padding, text, selected/unselected colors, divider, 1px inset frame, radius 8) and `JoinedStatesAndIcon` (disabled both selected and unselected, icon 24 at lg). Hover on an unselected button (`#F1F5F9`) and on a selected one (`#0F70E6`) was measured with a real mouse. The image comparison with Figma matches

**Decided by Claude / user confirmed:** use both systems in a single `ToggleGroup` (`variant` adds `joined`) · `size` applies only to `joined` (the capsule system has a single size per Figma) · named `toggle-button-group` because `toggle-group` is already used by the capsule system

**Impact:** adds a variant and a `size` prop to `ToggleGroup` / `toggleVariants`; existing usage is unaffected

**Not measured:** pressed (held down) at every size, hover at sizes other than default, icons at xs / sm / default sizes, the standalone `toggle-button` outside a group (there is no separate API; it is used only inside a group)
