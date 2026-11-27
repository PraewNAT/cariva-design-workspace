# Sheet (Figma Drawer page) — Figma specification

Read from Figma on 26 November 2026: [Drawer](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4497-77575) (Cariva Core Design System file). The mobile Bottom Sheet (header with a decorative color) is in [SHEET-FIGMA.md](SHEET-FIGMA.md)

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26` / `oldNames_2026-11-26`)

| New name | Original name | instances (before → after) |
|---|---|---|
| `sheet` | `crv-drawer-basic` (prop `direction` renamed to `side`: right / left / bottom / top) | 2 → 2 |
| `sheet-close` | `crv-drawer-close` | 6 → 6 |

**Colors rebound:** every color point previously bound to variables from the old library (116 + 1 points) was switched to the same-named variables in the file, 133 points (counting nested parts); no old library remains. The previous list is backed up in plugin data `remoteBindings_2026-11-26`

## Spec (right / left / top)

- padding 16, gap 16, border 1px `border/default`, fill `on-surface/elevated`
- header: title 14/20 Medium `content/primary` + description 14/20 `content/secondary` (gap 8), and a 32×32 round close button with a 20px icon in `content/secondary`
- body is the swappable content area (gap 16); footer has sm (32) buttons laid out horizontally, gap 8
- Example sizes in Figma: right / left 400×480, top / bottom 640×360

## Figma name ↔ Code

| Figma | Code |
|---|---|
| `sheet` | `Sheet` + `SheetContent` (`ui/sheet.tsx`) |
| `side` right / left / top | `side` |
| `side` bottom | `side="bottom"` per Bottom Sheet (see SHEET-FIGMA.md), **not the Drawer page spec** |
| `title`, `description` | `SheetTitle`, `SheetDescription` |
| `sheet-close` | Close button inside `SheetContent` |
| Body / Footer | `SheetBody`, `SheetFooter` |

## Code (26 Nov 2026)

| Topic | Status |
|---|---|
| padding 16, gap 16, fill `on-surface/elevated`, title 14/20 Medium, close button 32×32 | matches (measured in story `Sides`) |
| Max width 400 (right / left) | Set, Not measured |
| Border color `border/default` (only the side adjacent to the content) | Set, Not measured |
| Close icon 20px, horizontal footer with sm buttons | Set, Not measured |

**Decided with the user:** side bottom remains the existing Bottom Sheet (unchanged); the border is drawn only on the side adjacent to the content instead of all four sides, because the panel sits flush against the screen edge and the mobile Sidebar uses the same `SheetContent`

**Impact:** `Sheet` right / left / top goes from padding 24 to 16, the title is smaller, the footer is laid out horizontally and aligned right (previously vertical), and the close button is 32; the mobile Sidebar (`side="left"` that sets `p-0` and its own colors) passes the existing test, Not yet checked visually

## Bottom Sheet (renamed 26 Nov 2026, the user confirmed as proposed)

| New name | Original name | instances |
|---|---|---|
| `sheet-header` (`variant` default / search, `icon`, `showIcon`, `showTopColor`) | `crv-bottom-sheet-header` (`type`, `Icon`) | 8 → 8 |
| `sheet-content` | `crv-bottom-sheet-content` | 2 → 2 |

Code: `SheetHeader` `variant` default / search already matches
