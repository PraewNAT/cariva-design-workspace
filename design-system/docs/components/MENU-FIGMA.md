# Menu (dropdown-menu) — Figma specification

Read from Figma on 26 November 2026: [Menu](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4497-77728) (Cariva Core Design System file). All colors in the sets are bound to variables in the file (87 points, no old library)

The user ordered (26 Nov 2026) that this menu be used for every kind of list that drops down from a trigger, so it uses the same spec as **DropdownMenu, Select and Combobox**

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | instance (before → after) |
|---|---|---|
| `dropdown-menu-item` | `crv-menu-item` | 135 → 135 |
| `dropdown-menu-content` | `crv-menu` | 1 → 1 |

Original props unchanged (`variant` default / checkbox, `state` default / hover, `selected`, `disabled`, `scrollable`). The original-name text in the doc frame (7 places) has been changed to the new names

## Spec

- **Surface (`dropdown-menu-content`):** fill `on-surface/default`, corner radius 12, top/bottom padding 8 (no left/right padding, items are full width; the user changed this in Figma on 26 Nov 2026 from the original padding of 8 on all sides), 1px `border/default` border, `shadow/lg` shadow; the example is 200 wide with items 200 wide (height follows the content up to a maximum; `scrollable=true` allows scrolling)
- **Item (`dropdown-menu-item`):** height 40, padding 8/16, gap 12, corner radius 4, text 14/20 Medium `content/primary`; leading and trailing icons 20px color `content/secondary` (can be hidden)
- hover: fill `on-surface/action/hover` · selected: fill `on-surface/action/selected` and trailing icon color `brand/primary/content/default`
- disabled: text and icons `content/disabled`, normal fill
- `variant=checkbox`: the leading icon is a 16px checkbox (corner 4, `border/default` border; when checked, fill `brand/primary/on-surface/default` with a check icon)

## Figma names ↔ Code

| Figma | Code |
|---|---|
| `dropdown-menu-content` | `DropdownMenuContent`, `DropdownMenuSubContent`, `SelectContent`, `ComboboxContent` |
| `dropdown-menu-item` variant default | `DropdownMenuItem`, `DropdownMenuSubTrigger`, `DropdownMenuRadioItem`, `SelectItem`, `ComboboxItem` |
| `dropdown-menu-item` variant checkbox | `DropdownMenuCheckboxItem` |
| `state` hover | Figma only (code uses focus / highlighted) |
| `selected` | `data-selected` (Select, Combobox) / `data-checked` (checkbox, radio) |
| `disabled` | `disabled` |

The shared spec is in `ui/menu-recipe.ts` (`menuSurfaceClass`, `menuPopupClass`, `menuItemClass`)

## Code (26 Nov 2026)

| Item | Status |
|---|---|
| Surface: corner 12, top/bottom padding 8, left/right 0, white fill, `shadow/lg` shadow | matches (measured in story `FigmaMenu`; the Select popup was measured before being changed to padding 8 on all sides and has not been re-measured) |
| Item: height 40, padding 8/16, corner 4, text 14/20 weight 500 color `#0F172A` | matches (measured for both DropdownMenu and SelectItem) |
| disabled text `#94A3B8` with no opacity reduction, 16px checkbox fill `#1789FA` when checked, selected fill `#EEF9FF` | matches (measured in story) |
| Combobox popup, leading/trailing icons per the design, `scrollable`, 1px surface border | set per Figma, **not measured** |

**Note:** an item that is both selected and highlighted at once (e.g. when opening a Select that has a selected value) shows the hover color because Figma does not define a combined state; `DropdownMenuLabel`, `Separator`, `Shortcut` and the Context / Menubar menus were not touched

**Impact:** menu items were previously corner radius 24 (`rounded-xl`), padding 8/12, regular-weight 14 text, accent focus color; now corner 4, padding 8/16, weight 500, fill color per token; the surface was previously corner 24 with a 2xl shadow, now corner 12 with an lg shadow and a 1px border; the checkbox item's check box is on the left (previously the check mark was on the right); this affects everywhere that uses DropdownMenu / Select / Combobox, including the Catalog page
