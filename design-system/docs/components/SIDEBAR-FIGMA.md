# Sidebar — Figma specification

Read from Figma on 26 November 2026: [Sidebar](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4716-62177) (Cariva Core Design System file). The user confirmed the names as proposed by Claude, including changing the width to 240. The `Documentation Card` doc frame (node `7223:102132`) was created on this page. The page also has a full-page screen example and the designer's "ปัญหา" (Issues) note, which were not touched.

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | prop | instances (before → after) |
|---|---|---|---|
| `sidebar` | `crv-sidebar` | `filled` (previously `with bg`), `logo` slot | 10 → 10 |
| `sidebar-menu-item` | `crv-sidebar-menu` | `active`, `expandable` true/false (previously `type` expand/default) | 62 → 62 |
| `sidebar-rail` | `crv-sidebar-rail` | — | 3 → 3 |
| `sidebar-rail-item` | `crv-sidebar-rail-item` | `state` default/hover/selected/disabled (previously `stage`), `badge`, `label` | 36 → 36 |

## Spec

- Sidebar width 240, fill `on-surface/default`, padding top/bottom 24, gap 16
- Menu: height 40, corner radius 12, padding 8/12, gap 12, text 14/20 Medium `content/primary`, icon 20 `content/secondary` · active: fill `on-surface/action/selected`, text `brand/primary/content/default`, icon `brand/primary/on-surface/default`
- Expandable menu: sub-items indented 24, side line 2px `border/default` (the selected item's line is `brand/primary/on-surface/default`), sub-item height 40, corner radius 8, padding 8/16
- Rail: width 64, logo section 64, Primary Nav, Secondary Nav, Profile gap 8 · item 64×60, icon box 32×32 corner radius 8, text 10/16 Medium, gap 4 · badge is an 8px red dot `status/error/on-surface/default`
- rail item colors: default `content/secondary` fill `bg/subtle` · hover fill `on-surface/action/hover` · selected fill `on-surface/action/selected-strong`, text and icon `brand/primary/content/default` · disabled `content/disabled`

## Figma name ↔ Code

| Figma | Code |
|---|---|
| `sidebar` (assembled) | `AppSidebar` (`app/app-sidebar.tsx`: `logo`, `sections[{label, items[{label, icon, href, active, disabled, children}]}]`; an item with `children` = `expandable`, can open/close, arrow points up when open), composed of `Sidebar` + `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel` |
| `sidebar-menu-item` | `SidebarMenuItem` + `SidebarMenuButton` (`isActive`) |
| `expandable` | `SidebarMenuSub` + `SidebarMenuSubItem` + `SidebarMenuSubButton` (`isActive`) |
| `sidebar-rail` | `SidebarIconRail` (`app/sidebar-rail.tsx`, props `logo`, `secondary`, `profile`) |
| `sidebar-rail-item` | `SidebarIconRailItem` (`icon`, `label`, `badge`, `isActive`, `disabled`) |
| `filled`, `state` hover | `filled` is Figma only (code always uses a white fill) · hover is CSS |

The original shadcn `SidebarRail` is a drag handle for resizing the width, not the Figma rail, so the new one is named `SidebarIconRail`

## Code (26 Nov 2026)

| Topic | Status |
|---|---|
| Width 240, fill `#FFFFFF` | matches (measured in story `FigmaSidebar`) |
| Menu button height 40, corner radius 12, gap 12, left padding 12 | matches (measured) |
| Sub-item height 40, corner radius 8 | matches (measured) |
| rail item 64×60, icon box 32 corner radius 8 | matches (measured) |
| `AppSidebar` width 240, top padding 24, button width 224 height 40, expandable menu open/close, disabled | passes (story `Assembled`) |
| Group heading spacing and size (12/18), logo section | set per Figma, **Not measured** |
| hover / pressed colors, rail focus, 2px side line of sub-items | set per Figma, **Not measured** |

**Impact:** the `Sidebar` used on every page goes from width 256 to 240, with a white fill instead of `bg-sidebar`; menu buttons are height 40 (previously 36), corner radius 12, medium text; hover/active use `--cds-*` tokens instead of `sidebar-accent`; `disabled` uses a text color instead of reduced opacity; sub-items have a 2px side line and height 40 (previously 28)

**Not yet checked:** the icon-only collapsed mode (`collapsible="icon"`) and the mobile Sheet (uses the same fill but not viewed visually), `SidebarMenuAction`/`Badge`/`Skeleton` which Figma does not have, and the logo
