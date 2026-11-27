# Component names: Figma ↔ code

26 November 2026 · Figma: Cariva Core Design System (`XgxprkSY5mGbzIIwlmscCt`) · Code: `src/lib/app/components/ui/`

This is a naming proposal. Rename in Figma one component at a time, while working on that component. Rows marked ✅ have been renamed (updated 26 Nov 2026); the rest are still proposals. See each component's summary section at the end of the file, with property names and values matched to the code.

## Naming rules

1. A component's name in Figma = the component's file name in the code, in kebab-case with no `crv-` prefix, e.g. `button`, `input`, `dropdown-menu`
2. Property name = the prop name in the code (camelCase) and values = the values the code accepts, e.g. `variant` = `default | outline | ghost`
3. If the code uses a single component but Figma splits it into several sets (e.g. icon buttons), merge them into one set, separated by a property the way the code does it (`size=icon`). Merging like this changes the structure in Figma, so do it only once confirmed
4. Sub-parts are named after the parts in the code, e.g. `dropdown-menu-item`, `sheet-header`
5. Compositions that the code has in `patterns.tsx` use the same name as the pattern

## Table

The ⚠ mark = a structural decision (merge the set or keep it separate) is needed before renaming

| Figma now | node id | Proposed name (code) | Notes |
|---|---|---|---|
| crv-autocomplete | 4454:12745 | `combobox` | ✅ renamed in Figma |
| crv-avatar ✅ | 4315:10055 | `avatar` | |
| crv-avatar-group ✅ | 4457:63950 | `avatar-group` | Composition built from `avatar` |
| crv-button-standard | 3646:28000 | `button` | Main set ✅ renamed |
| crv-button-icon ✅ | 3730:5246 | `button-icon` | Code `Button` `size=icon-lg / icon / icon-sm` (= Figma `lg` / `default` / `sm`) |
| crv-button-loading ✅ | 3730:5454 | `button-loading` | Code `Button loading` |
| crv-link ✅ | 4165:5267 | `button-link` | Code `Button variant="link"` |
| crv-fab | 4497:77574 | `fab` | ✅ renamed; new `Fab` in Core (not merged with Button) |
| crv-badge ✅ | 4518:82967 | `badge` | |
| crv-chip-action | 4459:62796 | `chip` | ✅ renamed; created a new `Chip` in Core (does not use Toggle) |
| crv-breadcrumb-base | 3875:5059 | `breadcrumb-item` | ✅ renamed |
| crv-breadcrumb-standard | 3875:5038 | `breadcrumb` | ✅ renamed |
| crv-bottom-sheet-header ✅ | 4485:31705 | `sheet-header` | `sheet` with `side=bottom` |
| crv-bottom-sheet-content ✅ | 4485:31742 | `sheet-content` | |
| Drawer (frame) | 4497:77983 | `sheet` | `side=right` |
| crv-card-vertical | 4657:31022 | `card-vertical` | ✅ renamed; code `CardVertical` composed from `Card` |
| crv-card-horizontal | 4570:20745 | `card-horizontal` | ✅ renamed (`type` → `imagePosition`) |
| crv-card-small-horizontal | 4570:20655 | `card-small-horizontal` | ✅ renamed |
| crv-checkbox-standard | 3815:5291 | `checkbox-field` | ✅ renamed; code `CheckboxField` |
| crv-checkbox-base | 3815:5417 | `checkbox` | ✅ renamed (the box itself = `Checkbox`) |
| crv-checkbox-group | 3815:5374 | `checkbox-group` | ✅ renamed; code `CheckboxGroup` |
| crv-dropdown | 3875:3909 | `select` | ✅ renamed (`size` medium → lg, small → default) |
| crv-menu-item | 4454:12758 | `dropdown-menu-item` | ✅ renamed; used with DropdownMenu / Select / Combobox |
| crv-menu | 6617:313 | `dropdown-menu-content` | ✅ renamed (the dropdown menu surface) |
| crv-file-upload ✅ | 4457:56094 | `file-upload` | `FileUpload` in `app/file-upload.tsx`; re-exported from `patterns.tsx` |
| crv-file-upload-item ✅ | 4457:56129 | `file-upload-item` | `FileUploadItem`; Figma names unchanged |
| crv-input-standard | 3760:6623 | `input` | ✅ renamed |
| crv-input-horizontal | 3760:6895 | `input-horizontal` | ✅ renamed; code not yet implemented (`Field orientation=horizontal`) |
| crv-text-area-standard | 4164:1571 | `textarea` | ✅ renamed |
| crv-input-otp-standard | 4315:1164 | `input-otp` | ✅ renamed (`state` → `error`) |
| crv-input-otp-base | 4315:749 | `input-otp-slot` | ✅ renamed (matches `InputOTPSlot`) |
| crv-modal | 4712:1805 | `dialog` | ✅ renamed (`type` → `align`) |
| Overlay (section) | 4722:90374 | `overlay` | No matching item in the code; needs checking first |
| crv-pagination-standard | 4230:1661 | `pagination` | |
| crv-pagination-page-base | 4230:972 | `pagination-link` | |
| crv-pagination-controller-base | 4230:1777 | `pagination-controller` | |
| crv-pagination-rows-per-page | 4230:1695 | `pagination-rows-per-page` | pattern |
| crv-pagination-jump-to-page | 4230:1696 | `pagination-jump-to-page` | pattern |
| crv-linear-progress ✅ | 4456:16573 | `progress` | `Progress`; 3 variants × 4 colors |
| crv-circular-progress ✅ | 4456:16646 | `circular-progress` | `CircularProgress` in `ui/progress.tsx`; does not replace the existing Spinner |
| crv-radio-group ✅ | 3815:5863 | `radio-group` | `RadioGroup` label/description/error |
| crv-radio-standard ✅ | 3815:5910 | `radio-field` | `RadioField` composition |
| crv-radio-base ✅ | 3848:6592 | `radio-group-item` | `RadioGroupItem` |
| `<Rating>` ✅ | 4887:7022 | `rating` | `app/rating.tsx`; patterns re-export; full/half · Figma renamed 26 Nov (`size` lg/default/sm, `disabled`) |
| Star ✅ | 4887:6941 | `rating-star` | original vectors used inside Rating · `size`, `value` empty/half/full, `state` default/hover |
| crv-sidebar ✅ | 7204:64877 | `sidebar` | `Sidebar` in `ui/sidebar.tsx`, width 240; `with bg` → `filled` |
| crv-sidebar-menu ✅ | 4735:102038 | `sidebar-menu-item` | `SidebarMenuButton` + `SidebarMenuSub`; `type` → `expandable` |
| crv-sidebar-rail ✅ | 5472:34956 | `sidebar-rail` | `SidebarIconRail` (`app/sidebar-rail.tsx`) |
| crv-sidebar-rail-item ✅ | 5472:34937 | `sidebar-rail-item` | `SidebarIconRailItem`; `stage` → `state` |
| crv-sortable ✅ | 7204:64000 | `sortable` | `Sortable` (`ui/sortable.tsx`, dnd-kit) |
| crv-sortable-item ✅ | 7204:63939 | `sortable-item` | `SortableItem` |
| crv-sortable-handle ✅ | 7204:63932 | `sortable-handle` | `SortableHandle` |
| Stepper (frame) | 4714:6228 | `stepper` | Existing pattern (example on the Catalog page) |
| crv-stepper-new ✅ | 7204:64198 | `stepper` | `Stepper` (`ui/stepper.tsx`) |
| crv-step ✅ | 7204:64147 | `step` | `Step` |
| crv-step-indicator ✅ | 7204:64136 | `step-indicator` | `StepIndicator` |
| Stepper / Check icon, Loading icon ✅ | 7204:64271, 7204:64134 | `step-check-icon`, `step-loading-icon` | `StepCheckIcon`, `StepLoadingIcon` |
| crv-switch ✅ | 3875:1672 | `switch-field` | `SwitchField` (`app/switch-field.tsx`) |
| crv-switch-base ✅ | 3875:1752 | `switch` | `Switch` (`ui/switch.tsx`) 44×24 / 36×20 |
| Tabs (section) | 3875:4441 | `tabs` | Standard / Pills / Folder; 5 sets + standalone, docs 4838:64978; TABS-FIGMA.md |
| crv-table-head ✅ | 4582:11202 | `table-head` | `TableHead` (`size` is set on `Table`; `sort`, `sortPosition`, `compact`) |
| crv-table-cell ✅ | 4582:11271 | `table-cell` | `TableCell` (`compact`; `alternate` = `striped` on `Table`; `disabled` on `TableRow`) |
| crv-tableText-cell ✅ | 4705:20105 | `table-text-cell` | `TableTextCell` (`description`) |
| crv-table-scroll-shadow ✅ | 4824:674 | `table-scroll-shadow` | `TableScrollShadow` (`side`) |
| crv-table-footer ✅ | 4829:33634 | `table-footer` | Renamed 26 Nov 2026 (5 instances); use `TablePagination` instead; awaiting a decision on "Go to" style pagination |
| bwc-table/* | 7195:… | — | Deleted from Figma 26 Nov 2026 (the user ordered all of BWC deleted) |
| crv-tooltip-standard ✅ | 4167:398 | `tooltip` | `Tooltip` (`ui/tooltip.tsx`), 5 variants (`placement` = the edge where the arrow sits); docs 4716:60403 |
| crv-tooltip-with-action ✅ | 4167:3485 | `tooltip-with-action` | `TooltipWithAction` (`app/tooltip-with-action.tsx`), 8 variants; docs 4716:60403 |
| Section 1 (Date/Time page) | 4947:7100 | `date-time-picker` | pattern: `calendar` + `popover` + `input` |

Source: the table replaces `src/lib/core/design-system/catalog/migration-map.json` (47 entries), compared against the 53 nodes that used to be Ready for dev

## Button: agreed property names (26 November 2026)

The user chose for the **code to follow Figma** on structure (adding the `color` axis) and for property names to match shadcn wherever shadcn has a name. **Status:** the user confirmed; values renamed in Figma and code fixed (26 November 2026), except `elevated` in the code, which is not yet done because there is no shadow token yet

Set `crv-button-standard` → `button` (node `3646:28000`, renamed)

| property | Figma now | New name | Code |
|---|---|---|---|
| `variant` | contained | `default` | Exists |
| `variant` | outlined | `outline` | Exists; border color must be adjusted to `brand/primary/border/strong` |
| `variant` | text | `ghost` | Exists (the user confirmed they match) |
| `variant` | elevated | `elevated` | **Newly added**; shadcn does not have it |
| `color` | primary | `primary` | **New axis added**; shadcn does not have it |
| `color` | error | `destructive` | Uses shadcn's name |
| `color` | neutral | `secondary` | The user confirmed it corresponds to `secondary` |
| `size` | small | `sm` | Fix gap to 4 and font to 12/16 to match Figma |
| `size` | medium | `default` | Already matches (height 40) |
| `size` | large | `lg` | Fix gap to 12 to match Figma |
| `state` | default / hover / pressed / disabled | `state` (Figma only) | In code these are CSS hover, active and the `disabled` prop |
| `startIconVisible`, `endIconVisible`, `startIcon`, `endIcon` | Exist | Keep original names (Figma only) | shadcn places icons as children |
| `children` | Button text | `children` | Exists |

Other sets on the Button page: `crv-button-icon` → `size=icon / icon-sm / icon-lg`, `crv-link` → `variant=link`, `crv-button-loading` → `loading` prop. Detailed table not yet done

**Not yet checked:** hover/pressed/disabled colors of each color, icon sizes, `elevated` shadow

## Accordion: agreed names (26 November 2026)

| Figma | New name | Code |
|---|---|---|
| Set `crv-accordion-standard` | `accordion-item` (renamed) | `AccordionItem` (one card) |
| layer `Frame 1` (icon box) | `AccordionIcon` (renamed) | `icon` prop of `AccordionTrigger` |
| layers `Title`, `AccordionTrigger`, `AccordionContent` | Already match the code names | `AccordionTrigger`, `AccordionContent` |
| properties `expanded`, `showIcon`, `title`, `content` | Keep original names (Figma only) | Code controls open state with the Accordion's `value` |
| property `icon` | `icon` | `icon` prop (new) |
| property `showBadge` | Not yet removed | No badge in the design; awaiting the user's decision |

Details and measurements: [ACCORDION-FIGMA.md](ACCORDION-FIGMA.md)

## Input Field and Autocomplete: agreed names (26 November 2026)

| Original Figma | New name | Notes |
|---|---|---|
| `crv-input-standard` | `input` | Renamed |
| `crv-input-horizontal` | `input-horizontal` | Renamed; code not yet done (phase 2) |
| `crv-text-area-standard` | `textarea` | Renamed |
| `crv-autocomplete` | `combobox` | Renamed; code not yet changed |
| `size`: medium / large (Input Field) | `default` / `lg` | Renamed |
| `size`: small / medium (Autocomplete) | `default` / `lg` | Renamed |

Details and measurements: [INPUT-FIELD-FIGMA.md](INPUT-FIELD-FIGMA.md)

## Breadcrumb: agreed names (26 November 2026)

| Original Figma | New name |
|---|---|
| `crv-breadcrumb-base` | `breadcrumb-item` (renamed) |
| `crv-breadcrumb-standard` | `breadcrumb` (renamed) |
| `type`: default / active | `link` / `page` (renamed); `hover`, `dropdown`, `ellipsis` keep their original names |

Details and measurements: [BREADCRUMB-FIGMA.md](BREADCRUMB-FIGMA.md)

## Card: agreed names (26 November 2026)

| Original Figma | New Figma | Code |
|---|---|---|
| `crv-card-vertical` | `card-vertical` | `CardVertical` |
| `crv-card-horizontal` (`type`) | `card-horizontal` (`imagePosition` left/right/absolute) | `CardHorizontal` |
| `crv-card-small-horizontal` | `card-small-horizontal` | `CardSmallHorizontal` |
| `crv-card-profile` | `card-profile` | `CardProfile` |
| `crv-card-metric` | `card-metric` | `CardMetric` |

Details: [CARD-FIGMA.md](CARD-FIGMA.md)

## Checkbox: agreed names (26 November 2026)

| Original Figma | New Figma | Code |
|---|---|---|
| `crv-checkbox-base` | `checkbox` | `Checkbox` |
| `crv-checkbox-standard` | `checkbox-field` | `CheckboxField` |
| `crv-checkbox-group` | `checkbox-group` | `CheckboxGroup` |
| `crv-checkbox-card` | `checkbox-card` | `CheckboxCard` |
| prop `color` primary / error | prop `error` false / true | prop `error` → `aria-invalid` |

Details: [CHECKBOX-FIGMA.md](CHECKBOX-FIGMA.md)

## Chip: agreed names (26 November 2026)

| Original Figma | New Figma | Code |
|---|---|---|
| `crv-chip-action` | `chip` | `Chip` |
| `size` medium / small | `size` default / sm | `size` |
| `thumbnailVisible` / `deleteVisible` | (original names) | `thumbnail` / `onDelete` |

Details: [CHIP-FIGMA.md](CHIP-FIGMA.md)

## Sheet (Drawer page): agreed names (26 November 2026)

| Original Figma | New Figma | Code |
|---|---|---|
| `crv-drawer-basic` (`direction`) | `sheet` (`side`) | `Sheet` / `SheetContent side` |
| `crv-drawer-close` | `sheet-close` | Close button in `SheetContent` |

Details: [SHEET-DRAWER-FIGMA.md](SHEET-DRAWER-FIGMA.md)

## Select (Dropdown page): agreed names (26 November 2026)

| Original Figma | New Figma | Code |
|---|---|---|
| `crv-dropdown` | `select` | `Select` / `SelectTrigger` |
| `size` medium / small | `size` lg / default | `size` |

Details: [SELECT-FIGMA.md](SELECT-FIGMA.md)

## FAB: agreed names (26 November 2026)

| Original Figma | New Figma | Code |
|---|---|---|
| `crv-fab` | `fab` | `Fab` |
| `size` small / medium / large | `size` sm / default / lg | `size` |
| `color` neutral | `color` secondary | `color="secondary"` |

Details: [FAB-FIGMA.md](FAB-FIGMA.md)

## Input OTP: agreed names (26 November 2026)

| Original Figma | New Figma | Code |
|---|---|---|
| `crv-input-otp-standard` (`state` default / error) | `input-otp` (`error` false / true) | `InputOTP` + `InputOTPGroup` |
| `crv-input-otp-base` | `input-otp-slot` | `InputOTPSlot` |

Details: [INPUT-OTP-FIGMA.md](INPUT-OTP-FIGMA.md)

## Menu: agreed names (26 November 2026)

| Original Figma | New Figma | Code |
|---|---|---|
| `crv-menu-item` | `dropdown-menu-item` | `DropdownMenuItem`, `SelectItem`, `ComboboxItem` (shared spec `menu-recipe.ts`) |
| `crv-menu` | `dropdown-menu-content` | `DropdownMenuContent`, `SelectContent`, `ComboboxContent` |

Details: [MENU-FIGMA.md](MENU-FIGMA.md)

## Overlay, Modal and Pagination: names decided by Claude (26 November 2026, user away, not yet confirmed)

| Original Figma | New Figma | Code |
|---|---|---|
| `crv-overlay/sm`, `crv-overlay/md+` | `overlay/sm`, `overlay/md+` | `DialogOverlay`, `SheetOverlay` |
| `crv-modal` (`type` default / alignCenter) | `dialog` (`align` start / center) | `Dialog`, `DialogHeader align`, `DialogBody`, `DialogFooter` |
| `crv-table-pagination` | `pagination` | `TablePagination` |
| `crv-table-pagination-page` | `pagination-link` | `PaginationLink` |
| `crv-table-pagination-controller` | `pagination-control` | `PaginationFirst/Previous/Next/Last` |
| `crv-table-pagination-rows` | `pagination-rows` | `PaginationRows` |
| `crv-table-pagination-summary` | `pagination-summary` | `PaginationSummary` |

Details: [OVERLAY-FIGMA.md](OVERLAY-FIGMA.md), [DIALOG-FIGMA.md](DIALOG-FIGMA.md), [PAGINATION-FIGMA.md](PAGINATION-FIGMA.md)


Credit follow-up: `7089:1151` compact + `7094:365` remaining/used map to `src/lib/products/mira/components/credit-badge.tsx` (`CreditBadge`) under `Products/Mira/Components/Credit Badge` (Mira Product DS; docs7296:35). Source names/API remain unchanged; aliases depleted2/depleted 2 map to numeric depleted presentation.

| mira-tooltip-credit ✅ | 7118:777 | `credit-tooltip` | `MiraCreditTooltip` (`products/mira/components/credit-tooltip.tsx`), 9 variants; docs 7292:35 |
| crv-tag-standard ✅ | 4459:31603 | `tag` | `Tag` (`ui/tag.tsx`) `size` sm/default/lg, `content` label/count |
| crv-tag-color ✅ | 3936:5879 | `tag-color` | `TagColor` |
| crv-toast-standard ✅ | 6413:55828 | `toast` | `Toast` / `ToastCard` (`ui/toast.tsx`) severity × variant |
| crv-toggle-group-new ✅ | 7204:64515 | `toggle-group` | `ToggleGroup` (`appearance` = `variant`) |
| crv-segment-item ✅ | 7204:64425 | `toggle-group-item` | `ToggleGroupItem` / `Toggle` |
| crv-language-switcher ✅ | 7204:64498 | `language-switcher` | `LanguageSwitcher` (`app/language-switcher.tsx`) |
| crv-toggle-button ✅ | 6938:236 | `toggle-button` | `ToggleGroupItem` in `ToggleGroup variant="joined"` |
| crv-toggle-group ✅ | 6939:31550 | `toggle-button-group` | `ToggleGroup variant="joined"` (`size` xs / sm / default / lg) |

## Remaining renames (26 Nov 2026, user confirmed as proposed)

| Original name | New name | ✅ |
|---|---|---|
| Date Picker 7204:61101 | `date-picker` (`state` default / open / range / birth) | ✅ |
| crv-calendar 7204:61134 | `calendar` (`mode`) | ✅ |
| crv-calendar-day 7204:61116 | `calendar-day` | ✅ |
| crv-time-picker / time-column / time-option | `time-picker` / `time-column` / `time-option` | ✅ |
| crv-file-upload (img) 6461:126 | `file-upload-image` | ✅ |
| crv-credit-badge 7089:1151 | `credit-badge` (`size` default / sm) | ✅ |
| crv-credit-badge 7094:365 | `credit-badge-usage` (`showIcon`) | ✅ |
| crv-tabs-standard 6086:59 / base 4724:141435 | `tabs-standard` / `tabs-standard-trigger` | ✅ |
| crv-tabs-pills 3875:4462 / base 3875:4448 | `tabs-pills` (`stretch`) / `tabs-pills-trigger` | ✅ |
| crv-tabs-folder-base 4725:18223 | `tabs-folder-trigger` | ✅ |
| crv-browser-scroll ✅ 4164:476 | `scrollbar` (`orientation` vertical / horizontal, `end`, `track`) | ✅ `ScrollBar` / `ScrollArea` |

(BWC deleted). Other `crv-` items without pages are waiting to be done; the 25 Chart sets now have a code mapping in VISUALIZATION-MAPPING.json (Code Connect pending publication)

Visualization: page7204:64878, 25 card sets map to `app/visualization-chart.tsx` / `VisualizationChart`, one named variant per source recipe. Desktop/mobile are responsive reference layouts; docs7303:35. See VISUALIZATION-MAPPING.json for all actual node IDs. Standalone plots remain internal rendering dependencies; Code Connect is not published.

## Button Split / Button Mic (26 Nov 2026, user confirmed as proposed)

| Original name | New name | Code | ✅ |
|---|---|---|---|
| crv-button-split 5981:34184 | `button-split` (`color` primary / destructive, `size` sm / default / lg) | `ButtonSplit` (`ui/button-split.tsx`) | ✅ |
| crv-button-mic 5862:33778 | `button-mic` (`variant` wave / dot, `status` active / inactive) | `ButtonMic` (`app/button-mic.tsx`) | ✅ |

Details: [BUTTON-SPLIT-FIGMA.md](BUTTON-SPLIT-FIGMA.md), [BUTTON-MIC-FIGMA.md](BUTTON-MIC-FIGMA.md)

## Remaining Button sets (26 Nov 2026, user confirmed as proposed)

| Original name | New name | Changed props | instance |
|---|---|---|---|
| crv-button-icon 3730:5246 | `button-icon` | `variant` contained / outlined / ghost → `default` / `outline` / `ghost`; `color` primary / error / neutral → `primary` / `destructive` / `secondary`; `size` large / medium / small → `lg` / `default` / `sm` | 141 → 141 |
| crv-button-loading 3730:5454 | `button-loading` | `variant` contained / outlined / text → `default` / `outline` / `ghost`; `size` → `sm` / `default` / `lg` | 3 → 3 |
| crv-link 4165:5267 | `button-link` | `size` → `lg` / `default` / `sm` | 1 → 1 |
| crv-button-decorative 5844:33868 | `button-decorative` | `size` → `lg` / `default` / `sm` | 1 → 1 |

Details: [BUTTON-SETS-FIGMA.md](BUTTON-SETS-FIGMA.md)

## Divider / Keyboard / Browser Scroll (26 Nov 2026, user confirmed as proposed)

| Original name | New name | Code | ✅ |
|---|---|---|---|
| divider-horizontal 4677:10310 + divider-vertical 4677:10311 | `separator` 7308:121838 (`orientation` horizontal / vertical) | `Separator` (`ui/separator.tsx`) | ✅ |
| crv-browser-scroll 4164:476 | `scrollbar` (`orientation` values fixed, `bg` → `track`) | `ScrollBar` / `ScrollArea` (`ui/scroll-area.tsx`) | ✅ |
| Keyboard page (G-Board) | — | No code (refers to the system keyboard) | — |

Details: [SEPARATOR-FIGMA.md](SEPARATOR-FIGMA.md), [SCROLLBAR-FIGMA.md](SCROLLBAR-FIGMA.md), [KEYBOARD-FIGMA.md](KEYBOARD-FIGMA.md)

## Missed `crv-` names (26 Nov 2026)

| Original name | New name | instance before → after |
|---|---|---|
| crv-time-popup 7204:61352 | `time-popup` | 4 → 4 |
| crv-time-actions 7204:61348 | `time-actions` | 5 → 5 |
| crv-tabs-folder 4725:21088 | `tabs-folder` | 4 → 4 |
| crv-table-footer 4829:33634 | `table-footer` | 5 → 5 |

All 4 are single components (not variant sets). Code Connect is already linked using the original nodes; no changes needed
