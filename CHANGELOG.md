# Changelog — Cariva Design System

---

## Unreleased — 2026-11-27

- Skills cut from 24 to 13: removed doc-coverage, ux-writing, add-version-tab, crv-component-code, prototype-to-figma, ui-ux-pro-max and the impeccable copies; merged design-review and map-fix into audit, changelog into pr-checklist, case-planning into component-reuse-check; removed the aliases verify-ds-usage and document-update. Backups in `.skill-backups/` (untracked). `workflow-map.md` now has a **Skill** column on every flow table, each remaining skill states its workflow step, and the Storybook Workflows pages list the skills used. See `rules/skill-routing.md`.

- Removed the back office theme (CSS block, `backOffice` radius tokens, two stories and story wrappers) and updated the docs.

- Time Picker stories `Default` and `PageAndDialog`: the assertions now wait for the popover fade-in and focus return instead of checking immediately (they failed the same way before the status-line removal). Component unchanged.

- Storybook `Workflows` folder (Thai): 15 pages (`00` overview + 14 flows) showing, for each kind of instruction, what the designer and the AI do, where the AI stops to ask, the result and what is not verified. Swimlane diagrams are inline SVG drawn from data in `design-system/src/lib/features/workflows/`; step codes match `rules/workflow-map.md`. No change to components or tokens.

## Unreleased — 2026-11-26

- Visualization: 25 Core chart recipes on existing Chart/Recharts, responsive desktop/mobile, patterns/gradients/depth, accessible data tables and keyboard tooltips. Added30 stories alongside10 existing examples; Figma template docs50linked specimens. Code Connect discovery blocked by unpublished source components; mapping recorded locally.

- Ownership correction: CreditBadge, coin asset and six stories moved to lib/products/mira; Storybook Products/Mira/Components/Credit Badge. Figma docs move the same25 linked instances to Mira docs7296:35; Core Progress keeps36. Props and behavior unchanged.

- Tooltip: Standard5 and interactive guide8 variants, explicit accessible description; Mira Credit Tooltip9 variants in separate Product folder and Storybook group. Figma template docs split Core/Mira. Tabs underline stays above hover; slower350/320ms motion per feedback.

- Tabs motion: Standard underline and Pills background slide 200ms; Folder color/shadow fade 160ms. Keyboard focus-visible and reduced-motion disable transitions. No new dependency.

- Tabs: added Standard large/small, Pills default/line + stretch, and Folder with count/dot/icon; fixed orientation forwarding and kept the legacy line alias. Updated 10 stories, Markdown, and Figma template docs (27 instances). 15 scoped interactions pass; primary contrast remains open, see TABS-AUDIT.md.

- Progress scope correction: added the two missed Credit Badge sets in the existing section, both compact and remaining/used, with loading/hover/optional parts; later moved to the Mira Product DS, separate from Core Progress, per the ownership the user confirmed. Kept the 12px minimum; only the low text/track now use an existing token with better contrast. No shared tokens or billing logic changed. See PROGRESS-CREDIT-AUDIT.md.

- Progress/Radio Group/Rating: aligned all three pages with Figma; Progress linear/circular/4 colors and reduced motion, RadioField/disabled/focus/error, Rating with the original star in three sizes/half star/keyboard/controlled/readOnly. Updated Storybook (20 stories), checked shared consumers (15 stories), docs per the template (75 linked instances), and the audit. Kept the main Figma API/geometry; recorded the non-text contrast/Rating target limitations and the OS/device checks. See `PROGRESS-RADIO-RATING-AUDIT.md`; not committed/published yet.

- File Upload motion: uploading uses a 1s spinner and a 200ms progress width transition per the actual values, with reduced-motion support; added a simulated story and 9 interactions pass. Core Progress and transport unchanged.

- File Upload: added icon/image dropzone, type/size checks, local selection, and controlled item states using the existing Button/Progress; existing imports still work. The user approved 16px padding and aria-disabled; the error/primary demo contrast remains an open item. Updated Storybook, Markdown, and Figma docs per the Document Template; no real files are sent and no shared token changed.

- Figma docs: updated Avatar, Combobox/FieldLabel, Badge, Bottom Sheet, and Card on the existing frames, and created new Date/Time docs from the actual code contract. Added descriptions for 16 sets/variants and checked 58 linked instances; main props/geometry/radius unchanged. Hid GBoard in only 2 doc instances, as permitted. Links and check results are in `shadcn/docs/components/FIGMA-DOCUMENTATION.md`; Date/Time code is still draft 19/20 and awaits confirmation to fix the open items.

- Storybook: grouped every component under `Core/Components` (43 groups in total); Card/Checkbox/Chart compositions are combined into a single Docs page, Button and Source code are in one group, and Stepper/Rating/File Upload/Date Time Picker are split out of the combined pages by name. No production components/tokens changed; checked 32 stories and the build passes, with the existing contrast open items. Rules and check results are in `shadcn/docs/architecture/STORYBOOK-ORGANIZATION.md`.

- Card: uses the existing compositions; adjusted Horizontal absolute/added topMessage, Vertical actions with 1–2 buttons in a single row, and Small Horizontal slots 80/40, with long-text/mobile cases. The user approved Tag padding 8 for Card only, Profile max-width 100%, the Profile/Metric normal fill as bg/subtle, and Unit as content/secondary. 9 stories in total, with docs/audit; checked 12 stories including the existing Card/Chart/catalog, and the run passes. Kept abnormal contrast 4.41:1 and Button 3.50:1 as open items; no core token or Card primitive changed. The work is in the working tree on branch `praew`, not committed/published yet.

- Bottom Sheet: adjusted only `SheetContent side="bottom"` per Figma, with 24px top corners, Header default/search, icon/gradient, a `SheetBody` that scrolls separately from the footer, and a native input; other Sheet sides/Sidebar unchanged. Added Storybook with 7 stories in total and the docs `SHEET-FIGMA.md`/`SHEET-AUDIT.md`. Checked 9 stories and the run passes; contrast remains open and the software keyboard on a real phone is not yet checked. The work is in the working tree on branch `praew`, not committed/published yet.

### 🔀 Switching the DS from MUI to shadcn

- **`shadcn/`** is the current DS: 79 component files (shadcn + Base UI), tokens/theme (`tokens.json` → generated), Storybook 10, Core catalog + Foundations, DESIGN.md, and the rules in `shadcn/rules/`; the example pages (Lab, Dashboard, Login) are not included, as the user instructed
- **`legacy/mui/`** keeps the original MUI/Crv in full, contents unchanged: `code/`, the original Storybook, tests, `tokens.json`, `tokens/`, the MUI-era `rules/`, `export/`, and the generator/export scripts plus its own `package.json`
- **Root `package.json`** now keeps only the peer bridge and Code Connect (MUI/Emotion/Storybook 8/Vite/React removed)
- Updated `CLAUDE.md`, `AGENTS.md`, `README.md`, `rules/skill-routing.md`, `.claude/launch.json`, the hook `guard-ds-usage.py`, and the skills that read DESIGN.md/tokens so they point to `shadcn/`; the `crv-component-code` skill is labeled legacy
- Canvas (`sync/canvas`) is shown in the shadcn Storybook at `Workspace/Canvas`
- There is no shadcn dev export yet
- Removed the MUI Code Connect: 53 map files, `code-connect/`, `figma.config.json`, and the `code-connect:*` scripts in the root package.json. Tried to unpublish 90 entries in Figma; Figma replied that there were no mappings to delete (0 deleted). The shadcn Code Connect has not been created yet
- Button (Figma ↔ shadcn): renamed the values of 120 variants in Figma, added the `color` prop and adjusted the sm/lg sizes in code; the theme now emits all `--cds-*` variables from tokens.json; `elevated` does not exist yet (waiting for the shadow token)
- Accordion (Figma ↔ shadcn): renamed the set to `accordion-item` in Figma; in code, each item is a separate card (padding 16, corner radius 12 per Figma, previously 24); added the `icon` prop to `AccordionTrigger`, heading weight 600, secondary text indented 56, and removed the underline on hover; the `showBadge` property in Figma is not removed yet; switched the icons to the same Material set as Figma; rebound 24 colors on the Figma Accordion page from the old library variables to the file's own variables
- Input Field (Figma ↔ shadcn), phase 1: renamed the sets in Figma (`input`, `input-horizontal`, `textarea`, `combobox`) and the size values to `default`/`lg`; in code, `Input`, `Textarea`, `InputGroup`, and `Field` have a `size` prop (40/48), a 1px `border/default` border as an inset ring, 2px focus and error, disabled with its own colors, textarea corner radius 8/12, label 12/14, helper text 12, and a secondary label; `input-horizontal` and Combobox are not done yet
- Breadcrumb (Figma ↔ shadcn): renamed the sets to `breadcrumb-item` / `breadcrumb` and `type` to `link`/`page` in Figma; in code, links are brand blue with dark blue on hover, the current page uses the secondary color, weight 500, gap 12, and the separator and ellipsis are Material icons (ellipsis box 32); added the `FullRow` story, which includes a dropdown variant
- Card (Figma ↔ shadcn): renamed the sets to `card-vertical`/`card-horizontal`/`card-small-horizontal`/`card-profile`/`card-metric` and `type` to `imagePosition` in Figma; in code, `Card` has padding 16 (small 12), a 1px border, title 20/28, description 14/20, and added `CardVertical`/`CardHorizontal`/`CardSmallHorizontal` in `app/content-card.tsx` and `CardProfile`/`CardMetric`; fixed the 10px labels in Figma for profile/metric (10 places) to 12/16
- Checkbox (Figma ↔ shadcn): renamed the sets to `checkbox`/`checkbox-field`/`checkbox-group`/`checkbox-card` and the `color` prop to `error` in Figma; in code, `Checkbox` has corner radius 4, indeterminate, error, and disabled with its own colors, focus changes color (no ring), and added `CheckboxField`/`CheckboxGroup`/`CheckboxCard` in `app/checkbox-patterns.tsx`; the card has no hover shadow yet (waiting for the shadow token)
- Chip (Figma ↔ shadcn): renamed the set to `chip` and `size` to `default`/`sm` in Figma; added a new `Chip` in Core (`ui/chip.tsx`) with variant filled/outlined/surface, color default/primary, thumbnail, and onDelete; there is no pressed shadow yet (waiting for the shadow token)
- Sheet / Drawer (Figma ↔ shadcn): renamed the sets to `sheet` / `sheet-close` and `direction` to `side` in Figma, and rebound 133 colors from the old library variables to the file's own variables; in code, `Sheet` on the right/left/top sides has padding 16, gap 16, title 14/20, close button 32, and a horizontal footer (bottom unchanged, per Bottom Sheet)
- Select (Figma ↔ shadcn): renamed the set to `select` and `size` to `default`/`lg` in Figma and fixed the names in the doc frame; in code, `SelectTrigger` is 40/48 tall with an inset border bound to `--cds-border-*` (focus/error 2px), disabled with its own colors, and a Material arrow 20/24; the opened list is not touched yet
- FAB (Figma ↔ shadcn): renamed the set to `fab`, `size` to `sm`/`default`/`lg`, and `color` neutral to `secondary` in Figma, and fixed the names in the doc frame; added a new `Fab` in Core (`ui/fab.tsx`) in sizes 40/56/64 with hover/pressed shadows
- Tag / Toast / Toggle Group (Figma ↔ shadcn, the user confirmed as proposed): in Figma, renamed to `tag` (`size` sm/default/lg, `content` label/count), `tag-color`, `toast` (`severity`/`variant` lowercase, `show*`), `toggle-group`, `toggle-group-item`, and `language-switcher`, and rebound the instances/colors of the Draft Toggle Group set from the old library to the file's own; fixed the wrong numbers and names in the Tag / Toast doc frames and created the Toggle Group doc frame; code: new `Tag`/`TagColor` (`ui/tag.tsx`), `Toast` covers all 15 variants + `ToastCard` (`toast.add({ type: severity, data: { variant } })`, width 320, corner radius 12), `Toggle`/`ToggleGroup` are capsules per Figma (variant default/outline/segmented, removed the sm/lg sizes and spacing), and new `SegmentedControl` and `LanguageSwitcher`
- Tooltip (Figma ↔ shadcn, the user confirmed as proposed): renamed the sets in Figma to `tooltip` / `tooltip-with-action` / `credit-tooltip` (instance counts 5 / 8 / 9, unchanged; original names backed up in plugin data) and fixed the text in the doc frames to match the real thing; the code binds tokens per Figma (`on-surface/invert`, `on-surface/sunken`), the Back/Next button icons use the Material arrow and chevron from Figma instead of hugeicons, the credit tooltip reverts to the Figma values (cost-hint 10px, gap 2px, depleted text color `status/error/content/default`), and added the `FigmaSpecs` story, which measures the size/color of the tooltip, guide, and credit tooltip
- Renamed the remaining 27 `crv-` sets in Figma (Avatar, Badge, Bottom Sheet, Date/Time, File Upload, Progress, Radio, Tabs, Browser Scroll; the user confirmed as proposed): 1,210 instances in total, same count before/after; original names backed up in plugin data; prop values match the code (Avatar size lg/default/sm/xs, Radio color → error, Tabs size default/sm and pills `stretch`, Progress/Credit badge size, Date/Time `state`/`mode`); added `glow` to Badge (dot only, shadow 0 0 4px in the same color as the dot at 36%) with a `Glow` story; fixed the text in the doc frames that referenced the original names/values
- Code Connect for shadcn (the user instructed "do all of them"): created `figma.config.json` (root) and `shadcn/code-connect/` with 34 `*.figma.tsx` files totaling 114 mappings (94 in the first pass + 20 missed ones picked up in a re-check pass: card-small-horizontal, breadcrumb, pagination-rows/summary/footer, sheet-close, sidebar-rail, step icons, tabs-folder, table-text-cell, time popup/actions, overlay, scrollbar, and Button icon/loading/link/decorative), covering every already-renamed set on every page (Button, Badge, Avatar, Card, Checkbox, Chip, Fab, Input/Select/Combobox, Dialog, Menu, Sheet, Tabs, Table, Tag, Toast, Toggle Group, Tooltip, Progress/Credit badge, etc.); type-check passes, dry-run passes, published, and verified with `get_code_connect_map` on sample nodes (the import path is correct: `@/lib/app/components/ui/...`); added the `code-connect:parse|dry-run|publish` scripts at the root; added the rule "every new component must be connected to Code Connect" in `CLAUDE.md`, `shadcn/rules/agent-rules.md`, `workflow-map.md`, and `figma-component-to-code-flow.md`; not yet connected: `crv-button-mic`, `crv-button-split`, `crv-toggle-*`, `bwc-table`, and the 25 Chart variants (see `shadcn/code-connect/README.md`)
- Removed all of BWC (the user instructed this on 26 Nov 2026): removed the `BWC Table / Draft` section (7 parts, 163 instances, all in that one section and used nowhere else) from the Table page in Figma — the BWC Table Draft variable collection no longer exists in Figma, so it was removed from the snapshot `design-references/figma/variables.latest.json` and `VARIABLES.md` (648 → 635 variables); removed the BWC text in `AGENTS.md`, `CARIVA-COMPONENT-SYNC-FLOW.md`, `TABLE-FIGMA.md`, `FIGMA-NAMING.md`, `code-connect/README.md`, and `figma-variable-change-flow.md`, and changed the title of `shadcn/index.html`; what remains is the guard text in `agent-rules.md` / `control-sizing.md` (do not use the old BWC colors), which is a rule, not BWC data; recoverable from the Figma Version history
- Button Split / Button Mic (Figma ↔ shadcn, the user confirmed as proposed): in Figma, renamed `crv-button-split` → `button-split` (`color` error → `destructive`, `size` → `sm`/`default`/`lg`) and `crv-button-mic` → `button-mic` (`status` deactive → `inactive`), instance counts 3 / 1, unchanged; new code `ButtonSplit` (`ui/button-split.tsx`, Base UI Button + DropdownMenu) and `ButtonMic` (`app/button-mic.tsx`) + the `MicNoneRounded` icon from Figma; stories `Core/Components/Button Split` and `Button Mic` (with `FigmaSpecs` measuring size/color/structure, hover measured with a real mouse); fixed the names in the Button Doc frame; added the Code Connect mapping
- Remaining Button sets (Figma ↔ shadcn, the user confirmed as proposed): in Figma, renamed `crv-button-icon` → `button-icon`, `crv-button-loading` → `button-loading`, `crv-link` → `button-link`, `crv-button-decorative` → `button-decorative`, with prop values matching the code (instance counts 141 / 3 / 1 / 1, unchanged); code `Button`: `variant=link` uses the link color with an always-on underline, no side padding, corner radius 12; `decorative` is a radial gradient per Figma (navy fill + gradient, hover glow, pressed 85%, disabled gray fill; `--decorative-gradient` in the theme changed from linear to radial); `icon-sm` is 32px (icon 16 + padding 8); `default + secondary` uses the neutral color; a disabled ghost icon button has a fill; loading (disabled + aria-busy) keeps the outline border and a transparent ghost; `Spinner` uses the `data-usage` icon from Figma (the `AddRounded` and `DataUsageRounded` icons copied from Figma), and the Spinner in Button grows to 24 / 16; stories `IconButtons`, `LoadingButtons`, `LinkButtons`, `DecorativeButtons` measure size/color
- Code Connect for Visualization (the user instructed): `shadcn/code-connect/visualization.figma.tsx` connects the `crv-chart-01…25` cards and the 25 `Chart plot / …` parts to `VisualizationChart` per `VISUALIZATION-MAPPING.json`, 50 mappings in total (166 mappings across 36 files overall); type-check, dry-run, and publish pass; verified back from Figma with 2 sample nodes
- Both Toggle systems (the user answered "use all" and confirmed as proposed): in Figma, renamed `crv-toggle-button` → `toggle-button` (instance count 40, unchanged) and `crv-toggle-group` → `toggle-button-group` (`size` xSmall / small / medium / large → `xs` / `sm` / `default` / `lg`); in code, `ToggleGroup` gains `variant="joined"` + `size` (square buttons joined together, 1px inset frame, corner radius 8, 1px divider, selected color primary with hover/pressed per Figma); the existing capsule system is unchanged; stories `JoinedSizesAndOrientation`, `JoinedStatesAndIcon`; added a toggle-button-group block to the doc frame and fixed the text that said it was not done yet; added the Code Connect mapping
- Divider / Browser Scroll / Keyboard (the user confirmed as proposed): in Figma, merged `divider-horizontal` + `divider-vertical` into a `separator` set (`orientation`, instance count 7, unchanged, line color bound to `border/default`); `scrollbar` fixed the swapped `orientation` value names (Horizontal/Orientation → vertical, Vertical/Orientation4 → horizontal), `bg` → `track`, and fixed the thumb position for the horizontal / end / no-track variants; in code, `ScrollBar` is adjusted to a 15px lane with padding 4 and a 7px thumb colored `content-placeholder`, with an `on-surface-sunken` fill when `track`, and `ScrollArea` gains `orientation` / `track`; stories `Scrollbars` and `Orientations` measure the values; added doc frames on 3 pages (Keyboard is noted as a G-Board reference image with no code); asked the DS team to consider a scrollbar token; added the Code Connect mapping
- Renamed 4 missed `crv-` parts in Figma: `crv-time-popup` → `time-popup`, `crv-time-actions` → `time-actions`, `crv-tabs-folder` → `tabs-folder`, `crv-table-footer` → `table-footer` (instance counts 4 / 5 / 4 / 5, unchanged; original names backed up in plugin data); fixed the text that referenced the original names in the table doc; the existing Code Connect still works (same nodes)
- Code Connect for the MIRA Component Library file (the user instructed): `shadcn/code-connect/mira-library.figma.tsx` connects `mira-recorder` → `MiraRecorder` (verified back) and `crv-card` → `WorkflowCard` (the 5 color variants still have an old incorrect mapping left in Figma, which must be removed first); 170 mappings across 38 files in total
- **New shadow token:** added a `shadow` category to `tokens.json`, read from the `shadow/*` effect styles in Figma (sm, default, md, lg, xl, 2xl, inner, status/*) and emitted as `--cds-shadow-*` in `semantic.generated.css`, and `glow/*` emitted as `--cds-glow-*`; already used by Button `variant="elevated"` (primary/secondary), the Checkbox Card hover shadow (shadow/sm, glow), and the Chip pressed shadow (shadow/sm)
- Input OTP (Figma ↔ shadcn): renamed the sets to `input-otp` / `input-otp-slot` and the group's `state` to `error` in Figma, and fixed the names in the doc frame; in code, `InputOTP` has separate 40×40 slots with corner radius 12 and gap 12, an inset border bound to `--cds-border-*` (active/error 2px), disabled with its own colors, and a new `error` prop; fixed the error variant in Figma so the slot border is border/error 2px, matching the code
- Menu (Figma ↔ shadcn): renamed the sets to `dropdown-menu-item` / `dropdown-menu-content` and fixed the names in the doc frame in Figma; added `ui/menu-recipe.ts`, a shared spec (surface corner radius 12, top/bottom padding 8, no left/right padding, shadow/lg shadow, 1px border; items 40 tall, padding 8/16, corner radius 4, 14/20 Medium) used by DropdownMenu, Select, and Combobox; the checkbox item has a check box on the left per Figma
- Switch / Stepper (Figma ↔ shadcn, the user confirmed as proposed): in Figma, renamed to `switch` (`size` default/sm), `switch-field` (`color` → `error`), `stepper`, `step`, `step-indicator`, `step-check-icon`, `step-loading-icon` (`orientation`/`state` values lowercase) and created the doc frame on the Stepper page; code: `Switch` is 44×24 / 36×20 using the new DS tokens + `SwitchField` (`app/switch-field.tsx`), new `Stepper`/`Step`/`StepIndicator` (`ui/stepper.tsx`), and `Stepper` in `patterns` now uses the new one
- Went through every Figma page already done to check completeness (`docs/components/COVERAGE-AUDIT.md`): added `Field orientation="labelStart"` (Figma `input-horizontal`), Dialog stories for align=center / no icon and a scrollable menu, moved the Sortable doc frame out of the section, and fixed old prop names in the doc frames of Button / Checkbox / Chip / Dropdown / Input Field / Menu
- Table (Figma ↔ shadcn, the user confirmed as proposed): in Figma, renamed `crv-table-head`/`cell`/`tableText-cell`/`scroll-shadow` to `table-head`/`table-cell`/`table-text-cell`/`table-scroll-shadow` (`size` small → sm) and fixed the names in `Table Doc`; code: `Table` has `size`/`striped`, `TableHead` has `sort`/`sortPosition`/`compact`, `TableCell` has no border, with hover/disabled/striped per token, new `TableTextCell`, `TableScrollShadow`, and the `ArrowDownwardFilled` icon; removed what Figma does not have: `TableCaption`, `TableFooter`, the asc/desc sort states, and `onSort` (`TableHead sort` is left with left/right); the footer uses `TablePagination`; BWC Table (Draft) is not touched
- Overlay / Modal / Pagination (Figma ↔ shadcn, names decided by Claude while the user was away): renamed in Figma to `overlay/sm`, `overlay/md+`, `dialog` (`type` → `align`), `pagination`, `pagination-link`, `pagination-control`, `pagination-rows`, `pagination-summary`, and rebound 111 Pagination colors from the old library; code: the Dialog/Sheet overlay uses `--cds-overlay-backdrop` (black 40%, no blur), Dialog has corner radius 16 + a 2xl shadow + header/footer per Figma (`DialogHeader align icon`, `DialogBody`), Pagination has round 32px buttons with a blue fill on the current page + `PaginationFirst/Last/Summary/Rows` and a new `TablePagination` · added a doc frame (Documentation Card) on the Figma Pagination page
- Rating / Sidebar / Sortable (Figma ↔ shadcn, the user confirmed as proposed): in Figma, renamed to `rating`, `rating-star`, `sidebar`, `sidebar-menu-item` (`expandable`), `sidebar-rail`, `sidebar-rail-item` (`state`), `sortable`, `sortable-item`, `sortable-handle` and created doc frames on the Sidebar and Sortable pages; code: Sidebar is 240 wide with a white fill, menu buttons are 40 tall with corner radius 12, sub-items have a 2px side line, using `--cds-*` tokens; new `AppSidebar` (`app/app-sidebar.tsx`, a fully assembled sidebar), `SidebarIconRail`/`SidebarIconRailItem` (`app/sidebar-rail.tsx`), new `Sortable`/`SortableItem`/`SortableHandle` (`ui/sortable.tsx`, added `@dnd-kit/core`, `sortable`, `utilities`), and the `DragIndicatorRounded` icon
- The user cleared Ready for dev in the Figma file "Cariva Core Design System" on all 53 nodes, and switched the Figma source from "[Shadcn] Cariva Core Design System" to this file
- `shadcn/tokens.json` follows the live Figma: added 7 `on-fill` tokens (all white). `content/secondary` was temporarily Slate 500; the user confirmed on 26 November 2026 that it must be Slate 700, so the variable in Figma and tokens.json were changed back to Slate 700 (`#334155`)
- Brought `workflow-map.md` (flows S/U/C/F/D/V/H) into `shadcn/rules/` while preserving the existing rules, and added the component name table `docs/components/FIGMA-NAMING.md` and the reference order for when a component does not exist (Core → shadcn/ui → ReUI)
- Installed the `mermaid-diagrams` and `unslop` skills in `.agents/skills/` (instructions and reference docs only, no scripts) and added the rule to draw flows with `artifact-diagramming`
- Fixed the outdated `agent-rules.md` (paths, removed pages, Slate 500 secondary text, branch rules)

---

## v1.4.1 — 2026-10-26

### 🐛 `CrvTextArea` — dragging the resize handle can no longer shrink it below `minRows`

- **Problem** — the frame (`OutlinedInput`) has a `minHeight` of 120/104 but the `<textarea>` inside does not. When dragging the bottom-right handle upward, the textarea shrinks to ~16px while the frame stays the same height, so the handle ends up floating in the middle of the frame
- **Code** — set the textarea's `min-height` = `minRows × line-height` (medium 24px, small 20px; default 4 lines) in `CrvTextArea.tsx` · the textarea that MUI hides for measuring height (`aria-hidden`) is not touched, and the consumer's `sx` is not affected
- Added a test confirming the style (jsdom has no layout, so the actual drag cannot be tested)
- Checked: no other component in `code/core` sets `resize` itself (`CrvInput` multiline has no drag handle)

---

## v1.4.0 — 2026-09-29

### ✨ `body/medium` and `body/small` — line-height snapped to the 4px grid

- **Problem** — Desktop used 22 / 18, which is not on the 4px grid. Whenever body text is mixed with a control or icon in the same row, it is off by 2px and has to be compensated elsewhere (encountered firsthand while fixing the checkbox: the label needed a 20px line box while the description was 22), and component heights were not equal across breakpoints because Mobile already used 20 / 16
- **Figma** — `typography/body/medium/line-height` and `typography/body/small/line-height` in Desktop mode are now **20 / 16**, equal to Mobile · `label/*` is untouched (still aliased to `font/leading/*` as before)
- **Code** — `typography.lineHeight.body` is now `{ large: 24, medium: 20, small: 16 }`
- **`prose/*` stays at 22 / 18 on Desktop** — previously prose and body differed only in typeface; now they differ in line-height too: body is for short UI text (field, cell, description, helper — all 33 files that actually use it are like this) · prose is for long paragraphs
- Consequences: the description in `crv-checkbox-standard` / `-card` / `-group`, `crv-card`, `crv-modal` and the cells in `crv-table` are 2px shorter per line · buttons and fields do not move because their height comes from their own token
- Updated docs: `rules/DESIGN.md` (typography table + Prose heading)

---

## v1.3.9 — 2026-09-28

### ✨ `crv-checkbox-card` — new component, split out from the outlined checkbox

- Previously the card-style checkbox was `type=outlined` in `crv-checkbox-standard`, which could not really use `labelPlacement` and made it hard to color differently from the other states
- **Figma** — `crv-checkbox-card` (node 6697:362) 10 variants: `checked × state(default|hover|disabled) × color` · padding `spacing/lg` radius `radius/16` gap `spacing/md` · the whole card is the hit target
- **Hover** — changes the effect, not the color: unchecked uses `shadow/sm` (lifts up) · checked uses `glow/primary` / `glow/error` (`0 0 4px` at 36% of its own color, drawn behind the node) · `disabled` has no hover
- **Code** — new `CrvCheckboxCard` with story/test · added a `glow()` helper in `theme/shadows.ts` mirroring the `glow/*` effect styles · `crv-checkbox-card.md` + `CrvCheckboxCard.ai.md`

### ✨ `crv-checkbox-base` — added `color=error`

- Previously `color=error` only changed the label color while the checkbox box stayed the normal gray, even though `crv-checkbox-card` already used a red border
- **Figma** — base now has 15 variants (added `color=primary|error`): unchecked `status/error/border/strong` · focus `border/error` · checked/indeterminate `status/error/on-surface/default` → focus `.../pressed`
- **Code** — `CrvCheckboxBase` passes `color` through to the icon and to the focus/hover styles in every state · `CrvCheckbox` `color=error` is therefore red on both the box and the label
- 🐛 Also fixed the primary focus ring, which had been wrong all along — it used `brand/primary/on-surface/default` (#1789fa) while Figma uses `color/border/system` (#2563eb)
- ✨ **focusVisible / hover have a halo** — `glow/primary` · `glow/error` (`0 0 4px` at 36% of its own color) placed on the control's root per the effect style Figma applies on all 6 variants · especially necessary for `color=error`, because the border change #ef4444 → #dc2626 alone is almost impossible to see
- ✨ **hover uses the same look as `state=focusVisible`** — base has no separate `hover` variant in Figma (15 variants), so instead of inventing a new color (the old code used `border/strong`, which does not exist in Figma), `:hover` and `:focus-visible` now share the same rule: unchecked → `border/system` / `border/error` border on a white fill · checked → `.../on-surface/pressed` fill · `disabled` has no hover

### 🐛 checkbox — align the control with the first line of the label

- Previously `alignSelf` differed between `default` / `groupItem` and 1px was compensated on the label, which went off when the label wrapped to 2 lines
- **Figma** — every variant of standard and card wraps the control in a 20px-tall line box (`typography/lineHeight/label/medium`)
- **Code** — `getControlSlotSx()` is 16×20, vertically centered · dropped `pt: 1px` and the `type` condition

### 🧹 checkbox — removed duplicate variants and unused props

- **`disabled` overrides `color`** across the whole family — removed `disabled=true + color=error` from standard (6 left), group (3 left), base (15 left), and card (10 left) because the tokens are identical to primary everywhere
- `crv-checkbox-standard` dropped the `type` variant — the compact row is `descriptionVisible=false`, not a separate variant · **the code side also removed the `type` prop / `CrvCheckboxType`** (`CrvCheckboxGroup` now passes `descriptionVisible={false}`) ⚠️ breaking
- `crv-checkbox-group` removed `errorMessage` / `errorMessageVisible`, which were declared but never bound to any layer, **in both Figma and code** (⚠️ breaking — place the validation message under the group yourself in the form), and added `checkBoxSlot` for row 7 and beyond
- `crv-checkbox-card` variant `state=disabled` — label/description now use `content/disabled` (previously the text stayed normally dark even though the box was gray)

### 🐛 `crv-avatar` size=xSmall — 18px → 20px

- The value in code never matched Figma (Figma is 20×20 on all 6 variants)
- **Code** — `AVATAR_SIZE_PX.xSmall` is now 20 · the icon padding therefore becomes 4px per Figma · initials use the label scale by size (large 14/20 · medium 12/16 · small 10/16 · xSmall 10/16) with padding 8/4/4/2; previously a single `body/small` was used for every size
- The `crv-chip-action` size=small thumbnail is therefore 20px, matching Figma

### 🐛 `crv-table-head` `compact=true` — ignores the sort icon and label

- The `compact=true` variant in Figma has a single layer, the checkbox slot, but the code could still draw the sort icon if `leftSort` / `rightSort` were passed
- **Code** — `compact` wins over `leftSort`, `rightSort`, and `label`

---

## v1.3.8 — 2026-09-21

### ✨ `crv-chip-action` — added a white-fill variant

- The chip could not be placed on a colored or image background, because `filled` is gray/blue and `outlined` has a transparent fill, so the background color behind it shows through
- Added `variant=surface` — `color/on-surface/default` fill, no border, no shadow (16 new variants in Figma, 48 in total)
- hover/pressed use the same colors as the other variants · with `color=primary` the text is blue, not white
- Updated docs: `rules/components/crv-chip-action.md`, `CrvChipAction.ai.md`

---

## v1.3.7 — 2026-09-21

### ✨ `crv-menu` — added a variant with a scrollbar

- A menu with many items had no spec for how tall it can get, and no scrollbar appearance for devs to follow
- **Figma** — `crv-menu` changed from a single component to a component set: `scrollable=false` (height follows the items, as before) · `scrollable=true` is at most 6 items = 256px, then scrolls
- **Scrollbar** — thumb 6px wide with a full radius, colored `color/border/strong`, with a 4px inset from the right edge and 8px at the top and bottom to match the list's padding · transparent track
- **Code** — `crvMenuPaperSx` adds `maxHeight` + `overflowY` + scrollbar styling (supports both WebKit and Firefox via `scrollbar-color`) → `CrvDropdown` and `CrvAutocomplete` get this automatically, with no change needed at the call sites
- Updated docs: `rules/components/crv-menu.md`, `CrvMenuItem.ai.md`

---

## v1.3.6 — 2026-09-18

### 🐛 `crv-chip-action` size=small — the avatar is as large as the chip itself

- The small chip is 24px tall with 4px padding, but the thumbnail uses a 24px `size=small` avatar, the same as the medium chip → the avatar fills the full height and overflows the padding
- **Figma** — swapped the `crv-avatar` in all 20 `size=small` variants to `size=xSmall` (18px) · the chip is still 24px tall
- **Code** — `CrvChipAction` picks the avatar size by size: small → `xSmall` (18px, icon slot 12px) · medium → `small` (24px), as before
- Updated docs: `rules/components/crv-chip-action.md`, `CrvChipAction.ai.md`

---

## v1.3.5 — 2026-09-18

### ✨ `CrvButtonDecorative` — faster aurora + glowing label/icon

- The aurora flows twice as fast: the 2 layers go from 6s / 8.5s → **3s / 4.25s** (same ratio, so the rhythm still does not visibly repeat)
- The label and icon glow in `brand/decorative/gradient/to` — normally a soft glow (text 6px · icon 3px, 70%) · hover adds a tight, full-color glow layer (text 3px + 10px · icon 2px + 5px) that fades in gradually
- Present only while animating — with `animated={false}` or `disabled` there is no glow · the static frame still matches Figma
- No new colors; uses the existing decorative tokens

---

## v1.3.4 — 2026-09-17

### 🐛 Button width does not match Figma — the label font size does not follow size

- Figma binds the button label to `typography/label/small|medium|large` by size (12/16 · 14/20 · 16/24) in every kind — standard, decorative, split, loading
- Old code: `CrvButton` used 16/24 for every size · `CrvButtonDecorative` and `CrvButtonSplit` used 14/20 for every size → buttons that hug their content came out too wide or too narrow, e.g. Restart (medium) in Mira was 116.7 wide instead of 108
- Added `label` to `buttonSizing` so all three read from a single place
- `CrvButton variant="outlined"`: the stroke in Figma sits outside the frame and takes no space, but the CSS border takes 1px per side → subtracted from the side padding (16 → 15 on medium) so the total width equals Figma
- Measured in the browser (Mira › Voice Recorder): Delete 36 · Restart 107.9 · Transcribe 133.1 vs Figma 36 · 108 · 133

---

## v1.3.3 — 2026-09-17

### 🐛 `CrvButton` / `CrvButtonDecorative` — the icon is farther from the label than in Figma

- Figma spaces the icon and label **4 / 8 / 12px** apart (small / medium / large) in every kind (standard, decorative, the action of split), and the code set `gap` correctly, but MUI adds a further margin to the icon slot (`margin-right: 8px`, `margin-left: -2px/-4px`) → the actual spacing was **12 / 16 / 20px** and the padding on the icon side was left at 10 instead of 12 · size=small was also forced by MUI to an 18px icon instead of 16
- Cleared the margin of `.MuiButton-startIcon` / `.MuiButton-endIcon` and made `buttonSizing` control the icon size → measured in the browser: gap 4 / 8, icon 16 / 20, padding 12, matching Figma
- `CrvButtonSplit` is not affected (it lays itself out and does not use MUI's slots)

---

## v1.3.2 — 2026-09-17

### 🐛 `crv-avatar` content=icon — the icon with badge=true is larger than with badge=false

- **Figma** — the `content=icon, badge=true` variant placed the icon (`person`) floating outside `min-width` and oversized: medium 24 (should be 20), small 20 (should be 16), xSmall 18 (should be 12) → moved it into `min-width` so the layer structure is the same as `badge=false`, bound the size to `icon/size/*`, and centered it · now the only difference is the badge at the bottom-right corner
- **Code** — the icon size table of `CrvAvatar` was copied from this wrong variant (24/24/20/18) and the default icon rendered at the glyph size instead of the slot → fixed to slot **24 / 20 / 16 / 12** · padding **8 / 6 / 4 / 3**, the same with and without a badge
- Updated docs: `rules/components/crv-avatar.md`, `CrvAvatar.ai.md` and `📄 Avatar Doc` in Figma (Sizes & Token Usage)

---

## v1.3.1 — 2026-09-16

### 🐛 Field issues that had been wrong from the start

- **`CrvDropdown` loses its top border** — MUI lifts `.MuiOutlinedInput-notchedOutline` (which is a `<fieldset>`) up to `top: -5px` so that the notch legend can straddle the top border, but we set `overflow: hidden` on the root, so it **clips off the top 5px together with the entire top border**, leaving only the left, right, and bottom (and the rounded top corners are cut off too) · we already hide the legend, so there is no need to lift it — set `top: 0`
- **`CrvDateTimePicker` end icon is misaligned** — Figma (`crv-input-standard`) gives the Field **equal 16 padding on both left and right** and **8** between the text and the icon, but the old version had:
  - right padding of 12 (left 16), which is asymmetric
  - the button that opens the picker has its own padding of 8 → pushing the field height from 48 up to **56**
  - MUI applies `edge="end"` to that button, which adds `margin-right: -12px` on top → the icon ends up **4px** from the edge instead of 16
  - fixed all three layers, and restored the tap area to 40×40 with an overlay so the icon does not move

Measured the actually rendered values: height **48** · text **16** from the left · icon **16** from the right · **8** between them — matching Figma in all three modes (date / time / dateTime)

---

## v1.3.0 — 2026-09-09

### 🏷️ Renames (deprecated aliases provided, so nothing existing breaks)

| Old | New | Reason |
|---|---|---|
| `crv-stepper-icon` | `crv-stepper-marker` | It is no longer just an icon — there are both number and icon variants, and the word marker covers both |
| `crv-mobile-stepper` | `crv-stepper-compact` | The old name was tied to a device, even though it can be used anywhere space is limited (dialog, side panel), and `crv-stepper` already has `smallScreen` to handle device concerns |
| `CrvStepperIcon` | `CrvStepperMarker` | Following the Figma name |
| `CrvMobileStepper` | `CrvStepperCompact` | Following the Figma name |
| `getMobileStepperSx` and its siblings | `getStepperCompactSx` etc. | internal style helper |

`CrvStepperIcon`, `CrvMobileStepper`, `CrvStepperIconProps`, `CrvStepperIconState`, `CrvMobileStepperProps`, `CrvMobileStepperProgressType` are still exported as deprecated aliases — existing code does not break

### 🔧 Restructuring

- **Rebuilt the whole `crv-stepper-marker` set** — split into 2 axes, `content` (`number` / `icon`) × `status` (`Default`, `Active`, `Done`, `Error`, `Warning`, `Info`, `Success`), 14 variants in total
- **Removed the `Ellipse 1` layer from all 14 variants** — moved the fill (with its variable binding) up to the component's own frame, which already has `cornerRadius: 9999` + `clipsContent`, then switched to a centered auto-layout; it looks identical pixel for pixel, but 14 layers are gone and there are no longer two stacked circles
- **Cleared the leftover `padding: 7px`** in all 7 `number` variants — a leftover value with no effect (the old layoutMode was `NONE`), and 7 is not in the spacing scale
- **`crv-stepper-base` now uses `crv-stepper-marker` for all 14 markers** — previously they were components from another DS, with the glyph swapped to match the state (Done/Success → `check`, Error → `close`, Warning → `priority-high`, Info → `info`)
- **All 12 `crv-stepper` variants are now assembled from `crv-stepper-base`** — previously hand-built with frames + components from another DS; there are now 0 remote instances left, and the set size is unchanged at 2078×916 (the 3 vertical variants are 1px narrower, following the base's real size)
- **`crv-stepper-compact` now uses `crv-button-standard`** instead of the buttons from another DS, for all 6 buttons

### 🐛 Bug fixes

- **`Inactive` and `Active` used to look exactly the same** — added `status=Active` to `crv-stepper-marker` (fill `color/brand/primary/on-surface/muted`, number `color/brand/primary/on-surface/default`), which is now clearly distinct from `Default`
- **Step 2 in `crv-stepper` was wrongly `Inactive` in 9 variants**, and the step number was stuck at "1" in 4 other places — fixed so every variant is Complete → Active(2) → Inactive(3)

### 🧰 Tooling

- **`npm run tokens:generate` did not actually exist**, even though the README, `tokens.ts`, and `generatedPalette.ts` tell you to run it — added now, together with `tokens:check`
- **`generate-tokens.js` would wipe out all typography if anyone ran it** — it rewrote the whole `tokens.ts` from a template left over since Jun (no `fontFamily.ui`/`prose`, the old display scale, wrong label line-height); changed so it replaces only the `colors` block and touches nothing else
- **`export/cariva-ds-dev-export/` was stuck at 2026-06-19** — there was no script to generate it; it was made by hand once and nobody rebuilt it again. Added `npm run export:dev` / `export:check` and put them in `pr-checklist`
- **The DS's `package.json` was overwritten by the one from `@agent/peer-bridge` on 2026-06-26** (`78b5615`), causing the `test`, `test:run`, `code-connect:dry-run`, and `code-connect:publish` scripts to disappear — the `crv-component-code` skill tells you to run `code-connect:publish` every time, but it did not exist. Restored
- **Restored `@figma/code-connect` to devDependencies** (`^1.5.3`) — it disappeared when `package.json` was overwritten, even though 44 `.figma.tsx` files still import it
- **First check results after all the fixes:** `tokens:check` ✅ · `export:check` ✅ · `test:run` ✅ 36 files / 199 tests · `typecheck:ds` ❌ 19 errors, all pre-existing, no new errors from this round of work
- **`npm run typecheck` has never checked `code/` since that day** — `tsconfig.json` was overwritten in the same way and now covers only peer-bridge's `src/`; added `tsconfig.ds.json` (the original config from before it was overwritten) + a separate `npm run typecheck:ds`, leaving peer-bridge's alone

### 🆕 Missing Buttons — now all present in code

Figma has 7 buttons, but the code had only 4, and 2 of those were missing axes:

- **`CrvButton` gains `color="neutral"` and `variant="elevated"`** — neutral works only with outlined / text / elevated (matching Figma, which has no contained neutral), enforced by the type so it cannot be misused by accident · elevated = white fill + `shadow/sm` shadow → hover `shadow/xl` → pressed `shadow/md`
- **`CrvButtonIcon` gains `color="neutral"`** for all of contained / outlined / ghost
- **`CrvButtonDecorative` (new)** — a gradient button for AI actions, 3 sizes + a glow on hover
- **`CrvButtonMic` (new)** — a microphone selection button with an animated 5-bar sound wave (respects `prefers-reduced-motion`)
- **`CrvButtonSplit` (new)** — a main action + a button that opens other options, using one fill across the whole block per Figma (not MUI's `ButtonGroup`); `triggerLabel` is required because the right side has no text
- All 3 new ones come with the full set: types, styles, stories, tests, `.ai.md`, a doc in `rules/components/`, and Code Connect (dry-run passes for all)
- **Added `code/core/theme/shadows.ts`** — shadows used to be hardcoded and scattered across components; there are now `shadows.sm|default|md|lg|xl|2xl|inner` tokens matching the effect styles in Figma
- **Synced 6 more tokens**: `color/brand/decorative/gradient/{from,via,to}` and `color/status/active/*`, which exist in Figma but had never been exported

### 🔍 A second check against Figma found 4 mismatches

- **`CrvButton` had no story for `elevated` / `neutral`** — the code was added but we forgot to expose it in Storybook. Added `ElevatedPrimary/Error/Neutral`, `OutlinedNeutral`, `TextNeutral`, the `ElevatedStates` table, `NeutralColor`, and put the new options in the control panel · `AllVariants` now includes elevated too
- **The `CrvButtonDecorative` gradient went in the wrong direction** — the old version was written as a light ellipse at the bottom of the button, but Figma runs from dark blue in the center out to light at the left and right edges (derived from `gradientTransform`: an ellipse of 50% of the width × 129.76% of the height, centered on the button). Fixed to the actual values, and added `opacity: 0.85` when pressed, as Figma does
- **The `standard` toast border was 2px thick although Figma uses 1px** — every variant in Figma is 1px. Fixed for both status and notification
- **`color/status/{severity}/border/default` in `tokens.json` did not match the real variable** — it was recorded as the `300` shade, but the variable in Figma aliases to `100`, which made the toast border much darker than designed. Fixed to the values from the real variable (`#fee2e2` / `#fef3c7` / `#e0f2fe` / `#d1fae5`) and updated `rules/DESIGN.md`
- **The `outlined` toast background was `transparent`, but Figma uses `color/bg/white`** — fixed to match; otherwise it is unreadable when placed on a dark background

### 📏 Button size scale — consolidated in one place, and long-standing errors fixed

Went through every component set in Figma and found that **every button uses exactly the same scale**, but the code had remembered it wrong all along and spread it across 5 files

| Size | Height | Padding V | Padding H | Gap | Icon |
|---|---|---|---|---|---|
| `small` | 32 | 8 | 12 | 4 | 16 |
| `medium` | **36** | 8 | 16 | 8 | 20 |
| `large` | 48 | 12 | 24 | 12 | 24 |

- **Added `code/core/theme/buttonSizing.ts`** as the single place that holds this scale — `CrvButton`, `CrvButtonIcon`, `CrvLink`, `CrvButtonDecorative`, and `CrvButtonSplit` all pull from it (exported from `code/core`, along with `shadows` / `statusShadow`, which were added the previous round but never exported)
- **`medium` had been 40 tall all along, while Figma is 36** — wrong in `CrvButton`, `CrvButtonIcon`, and `CrvLink` alike
- **Left-right padding was fixed at 16 for every size** — in reality it differs by size (12 / 16 / 24), just as the top-bottom padding already differs
- **`gap` was fixed at 8 for every size** — it is actually 4 / 8 / 12
- **`small` had top-bottom padding of 4 instead of 8** — so the small button was shorter than 32
- **The icon of the small button was 20 instead of 16** (`CrvButtonIcon`) and the icon in `CrvLink` was fixed at 20 for every size
- Checked the values the browser actually computes: **all 5 components match Figma at every size**
- Also updated the size tables in `rules/components/crv-button-{standard,icon,split}.md`, `crv-link.md`, and the related `.ai.md` files to match

### 🧹 Cleaning up leftovers in Figma

- **`crv-button-split` fixed on the Figma side** — checked all 24 variants: in `size=small` the outer frame is now 32 tall, equal to its inner children (previously 36, colliding with medium), and the `trigger` padding at medium is now symmetric at 8 on every side, exactly matching what the code already had, so no further code change is needed
- **`crv-stepper-desktop` has been deleted** — the whole Stepper page no longer has `padding: 7` or `Ellipse 1` (what remains is `Ellipse 5`, which is the dot of `crv-stepper-compact`, by design)
- **`crv-stepper-base` state=Info now matches** — both `text=Left` and `text=Center` use `color/status/info/on-surface/default`
- **The Notification shadow in code was wrong** — Figma uses `shadow/md` (navy) for `filled` and `shadow/status/notification` (3-layer translucent navy) for `standard`, but the code tinted both shadows with the brand color · fixed, and removed the duplicate `statusShadow` in `crvToastStyles.ts` so that the single one from `theme/shadows.ts` is used
- **Fixed the Toast doc in Figma** — the `Variant=Outlined` description said "no fill" although it actually uses `color/bg/white`, the `Variant=Standard` description still stated a 2px border, and the Do/Don't still called itself "alert" even though this component is the Toast (so the prohibition "do not use alert in place of Toast" contradicted itself). Rewrote all three places

### 🔵 Stepper marker — wrong colors in every state and 5 statuses missing

Opened in Storybook, it did not match Figma at all, even though `rules/components/crv-stepper.md` had the correct values written from the start — the code never followed them

| status | Old code | Figma |
|---|---|---|
| `default` | `content/disabled` fill + white number | `bg/solid` fill + `content/secondary` number |
| `active` | solid blue fill + white number (same as done) | `brand/primary/on-surface/muted` fill + `brand/primary/on-surface/default` number |
| `error` / `warning` / `info` / `success` | **transparent fill** + status-colored icon | solid status-colored circle + white icon |

- **`CrvStepperMarker` had only 2 of the 7 statuses** and no `content` axis at all — it now matches Figma 1:1 (`status` 7 values × `content` 2 values = 14 variants); the old `state` prop still works as deprecated
- **The icons differed from Figma** — the old version used `Error` / `WarningAmber` / `Info` / `CheckCircle`, which are glyphs that already contain a circle, so it became a circle inside a circle · Figma uses `close`, `priority-high`, `info` (outlined), and `check` in the rounded style, placed on a plain colored circle
- Found that `content=icon` in the component set uses `panorama-fish-eye` as a **placeholder** — the real icon comes from `crv-stepper-base`, which swaps it in by state; this is recorded in the rules, and the code follows this structure (the marker does not bind an icon to a status itself)
- Storybook now shows all 14 variants (previously only 2) · the Code Connect map covers the new axes and the parse check passes
- **Added `CrvStepper.test.tsx` (16 tests)** locking down the whole color table — this kind of drift will no longer go unnoticed

### ✏️ Stepper — the Inactive title color and the Optional text that were never styled

- **Fixed in Figma: `state=Inactive` now gives `Step title` the `color/content/primary`** color, the same as the other states (previously `content/secondary`, which made it paler than the word Optional below it) — now all 14 variants always use the same color for the title and Optional · synced into the code
- **`Optional` never received the styles written for it** — the rule in the code targets `.MuiStepLabel-optional`, but MUI v7 places that text as a bare text node with no class to hook onto, so the whole block had been dead code all along · now wrapped in our own `<span class="crv-step-optional">`
- A consequence of the above: **`Optional` used the wrong size** — it was meant to be `body/small` (12/18), but Figma uses `caption/caption` (12/16) and has **no gap** from the title (the code put in margin-top 2px). It now matches
- **The font weight of the Step title was wrong** — Figma uses `typography/label/medium`, which is **Medium (500)**; the code used Regular (400)

### ✨ `CrvButtonDecorative` animation — flowing aurora light

Follows the "Colorful Buttons" (fluid aurora backdrop) concept from freefrontend, but **rewritten from scratch with our own tokens**; the original code was not copied, and no colors outside the set are used

- Two blurred layers of soft circular blobs move against each other at **6s** and **8.5s** — the periods do not divide evenly, so the rhythms drift apart and the loop is never visibly repeated
- **Uses only the 3 existing tokens** (`brand/decorative/gradient/{from,via,to}`) · a navy blob is placed on the bottom layer to **preserve the dark color core per Figma**, so the button does not wash out to light blue all over
- The original uses 12 `<div>`s — ours lives on 2 pseudo-elements at `z-index: -1` inside the button's own stacking context, **adding no DOM at all**, and the text does not have to compete for stacking order
- **Animates only `transform`**, entirely on the compositor, with no repaint per frame
- Stops when `animated={false}`, `prefers-reduced-motion: reduce`, or `disabled` — in every case it falls back to the static gradient exactly per Figma
- Added the `animated` prop (default `true`) so it can be turned off when the screen is crowded or several of these buttons sit in a row
- New `Animated` story + 7 tests · **Note: Figma has no animation for this component; the static frame is where the two sides match** — recorded in `rules/components/crv-button-decorative.md`

### 🔄 Code

- **`CrvToast` rewritten to match the new `crv-toast-standard`** — previously it was `variant=primary|secondary` + 4 severities, with no Description and no Action button, and Code Connect still pointed to a component that had since been deleted
  - `variant`: `filled` | `outlined` | `standard` (the old values `primary` / `secondary` still work, mapped to `filled` / `standard` and marked deprecated)
  - `severity`: added `notification` (neutral fill/border + brand icon)
  - Added `title`, `description`, `action`, and `onClose` — the close button is shown only when `onClose` is passed, and it uses the DS's `CrvButtonIcon` instead of MUI's `IconButton`
  - Icons match Figma: Filled/Outlined use the outlined style, Standard uses the solid style
  - The `shadow/status/*` shadows are built as a 3-layer box-shadow from each severity's token
  - Code Connect points to the new node `6413:55828`, with every property mapped
  - Added `CrvToast.test.tsx` (19 tests) and rewrote the stories to cover all 15 combinations
- **Added 9 `color/neutral/*` tokens to `tokens.json`** — they had always existed in Figma but were never synced, which made it impossible to write the Notification colors without hardcoding

### 🎨 Icon

- **The entire icon library is now connected with Code Connect — 1,076 of 1,077 sets × 5 styles** — previously Dev Mode showed icons as unnamed instances; it now shows `<ArrowBackRounded />` according to the style selected in Figma. Generated with `npm run icons:connect`, which pulls the list of names from Figma itself, so new icons need no manual mapping. Only `flags` is skipped, because it is a set of national flags, not icons
- **`chevron-up` / `chevron-down` → `ExpandLess` / `ExpandMore`** the paths were compared and match in both filled and rounded — `chevron-down` is used in 25 places across Button, Breadcrumb, Accordion, and Dropdown
- **Added `code/core/icons/`** — 9 icon sets × 5 styles that Figma uses but MUI does not have: 8 sets were removed from MUI as of v5 (`eco`, `polymer`, `amp-stories`, `exposure-*`) and `dock-to-right`, which comes from Material Symbols. Generated from the vectors in Figma with `npm run icons:custom`, using MUI's `createSvgIcon`, colored by `currentColor` like the other icons, with tests covering all 45
- **`Component 1` / `Component 2` → `picture-in-picture` / `picture-in-picture-alt`** (the Design System Owner fixed this in Figma) — in the old sets the filled/outlined styles were swapped between the two sets; the new sets are correct in all 5 styles
- **Aligned 4 sets with the library** — `picture-in-picture`, `picture-in-picture-alt`, `arrow-circle-up`, and `dock-to-right` had "Include stroke in layout" turned on, which made the set 2px larger than the others and the dashed-line color wrong. Now all 1,076 sets are identical
- `CrvLink` Code Connect used to show `startIconVisible`, which does not exist on `CrvLink`; it now shows `startIcon={<actual icon />}`; `CrvTableTextCell` and `CrvDrawer` used to be skipped at publish because their examples contained conditions, now fixed; `CrvButton` had pointed at a section instead of the component set since Jun, now fixed

### 🎨 Token

- **Complete set of status border tokens — `color/status/{error,warning,info,success}/border/default|strong`** — previously incomplete and not following one pattern (error had only `strong`, info had none at all, success/warning had only `default` but used steps 700/600, which are as dark as a solid fill). They now follow the same pattern as all the other border families: `default` = hue/300, `strong` = hue/500, with the scope set to stroke only
  - Changed the values of 2 tokens: `success/border/default` emerald/700 → **emerald/300**, `warning/border/default` amber/600 → **amber/300** — checked the entire Figma file and the code, and nothing uses these two
  - `error/border/strong` (red/500) had always existed in Figma but was never synced into `tokens.json` — added now
  - Fixed rule 7 in `rules/DESIGN.md`, which used to forbid creating status border tokens (approved by the Design System Owner)
- **New effect styles `shadow/status/{error,warning,info,success,notification}`** — a soft 3-layer shadow (y 8/−2/2, blur 8/8/4, spread 0/2/0, 6%/4%/12%) colored by `status/*/on-surface/default`; `notification` uses the same base color as `shadow/*` (`#1e3a8a`) to suit the neutral fill

### 🔔 Alert (replaces `crv-toast-standard` — Figma only, not in code yet)

- **Moved `<Alert>` (`6413:55828`) from the MUI kit to the DS's own entirely** — 15 variants: `Severity` (Error, Warning, Info, Success, Notification) × `Variant` (Filled, Outlined, Standard); no component, variable, or style from another library remains
  - Icons → our library at 24px, with the shapes compared against the old ones one by one (the outlined warning uses outlined `report-problem`, following MUI Alert's default)
  - Action button → `crv-button-standard` text/neutral/small, close button → `crv-button-icon` ghost/neutral/small + `close`; the Action button swap slot accepts only `crv-button-standard`
  - Colors, borders (`status/*/border/default|strong`), text styles `label/large` + `label/medium`, all spacing, `radius/12`, top-bottom padding `spacing/xs`
  - **Added `Severity=Notification`** following the colors of the old toast notification: icon/close button `brand/primary`, fill and border neutral — Filled `bg/white` + `shadow/md`, Outlined `neutral/border/strong`, Standard `neutral/on-surface/subtle` + `neutral/border/default`
- Buttons on a solid fill (Filled) have their color overridden to `content/inverse`, because the buttons in the DS do not yet have a white-on-colored-fill option
- **Named it `crv-toast-standard`, replacing the old one** (the Design System Owner deleted the old `4165:5387`) and updated `Doc — crv-toast-standard` (formerly named `crv-alert-standard`): entirely new content, the Variant section is now 3 columns, with examples for all 15 variants + an example with every part turned on, replacing the 13 examples that still pointed at the deleted component
- Fixed a bug that arose when adding Notification: the copied variants were not connected to the properties (toggles for Action / close button / Title / Description, and the button swap slot). Now all 15 variants are wired identically
- ⚠️ **`CrvToast.figma.tsx` still points at `4165:5387`, which has been deleted** — the next Code Connect publish will fail until the `CrvToast` code is updated to match

### ⚠️ Still open

- `CrvStepperMarker` in code supports only `state='default' | 'done'`, but Figma has 7 `status` values + a `content` axis — Code Connect maps only `Default` / `Done`
- `crv-stepper-base` `state=Info`: `text=Left` uses `color/brand/primary/on-surface/default` but `text=Center` uses `color/status/info/on-surface/default`
- ~~`crv-stepper-desktop` is still an instance from another DS — the only place left with `padding: 7` (2 places) and `Ellipse 1` (1 place) in the Stepper category~~ → **Cleared on 2026-09-16** — the component was deleted from Figma; the whole Stepper page now has neither
- **19 pre-existing type errors** found by `typecheck:ds` — all of them existed before (compared against `d828de9`, identical at every point), mostly in `*.stories.tsx`, e.g. `CrvModal` missing the `open` prop in 5 places, `CrvSidebar.stories.tsx` calling `colors.bg.page`, which no longer exists, 2 places in `CrvTabs.stories.tsx`, and 1 place in `CrvLink.figma.tsx`
- **`CrvStepper` has no tests** — `test:run` passes all 36 files, but none of them covers Stepper
- **`npm audit` reports 10 vulnerabilities** (critical 1, high 2) in dependencies — not fixed yet, because `audit fix --force` would upgrade across major versions
- **Code Connect cannot yet publish/dry-run** — it needs `FIGMA_ACCESS_TOKEN` in `.env.local`, which is not on this machine yet
- **MUI versions contradict each other in 3 places** — `package.json` says `^7.1.0`, `code/core/CLAUDE.md` says v9, the export's README says `^6.1.6`, and `@mui/x-date-pickers` was downgraded from `^8.29.0` → `^7.23.3` when it was overwritten; a dev needs to confirm which version is used

---

## v1.2.0 — 2026-09-07

### 🐛 Bug fixes

- **The icon color in every button was wrong across the whole system (Figma)** — the VECTOR inside every icon instance (459 nodes in 7 component sets / 288 variants) was bound to `color/content/secondary`, so the icon came out gray no matter what color the button was; e.g. a blue-fill contained button got a gray arrow instead of white. Fixed so that the **icon uses the same token as the `label` of that variant**; rebound 804 fills in total, covering `crv-button-standard`, `crv-button-icon`, `crv-button-loading`, `crv-link`, `crv-button-decorative`, `crv-button-mic`, `crv-button-split`
  (`crv-button-mic` is still `color/content/secondary` — that is correct, because its label uses this token)
- **`crv-fab` had the same bug** — the icons in all 24 variants were bound to `color/content/secondary`, so a blue-fill FAB got a gray icon. FAB has no label, so it follows the fill color the same way as `crv-button-icon`: primary default → `color/content/on-brand`, primary hover/pressed → `color/content/inverse`, neutral in every state → `color/neutral/content/default`, disabled → `color/content/disabled`
- **The docs and the tokens in code have not matched Figma since v1.1.0** — all synced now:

  | Item | Old | Fixed to (per Figma) |
  |---|---|---|
  | `color/content/secondary` | `#475569` slate/600 | `#64748b` slate/500 |
  | `typography/label/medium` line-height | 22 | 20 |
  | `typography/label/small` line-height | 18 | 16 |
  | `typography/label/xsmall` line-height | 14 | 16 |
  | `typography/display/large` | 64/72 · 40/48 | 60/72 · 48/48 |
  | `typography/display/small` | 40/48 · 32/40 | 36/48 · 30/40 |
  | font-family names | `sans` / `serif` | `ui` / `prose` |
  | `typography/prose/*` | absent from the docs/code | all 3 sizes added |

  Fixed in `rules/DESIGN.md`, `tokens.json`, `code/core/tokens.ts`
  ⚠️ **The `label` line-height affects every component that uses the label style** (button, tab, chip, menu, etc.) — the old values were accidentally copied from `body`; run a regression test before release

### 🆕 Added

- **Filled in the examples in the Figma docs in 65 places across 12 pages** — previously many docs described variants but had no examples to look at
  Progress (16), Toast (8), Tag (7), Button icon neutral (3), Stepper (4), Card (2), Tabs (2), Avatar (1), Switch (1)
  Rule: include every axis with a visible difference (variant/color/type/severity); for position axes (`labelPlacement`, `placement`, `breakpoint`), include 1 representative
- **Added 7 new doc sections** for components that had never been documented, with real examples — `crv-button-decorative`, `crv-button-mic`, `crv-button-split`, `crv-sidebar-rail`, `crv-checkbox-standard`, `crv-checkbox-group`, `crv-radio-standard`
  ⚠️ No section has Do/Don't yet — placeholders are in place, waiting for the Design System Owner to write them
- Added the variant property **`size`** to `crv-tabs-standard-base` (`4724:141435`) — `large` (existing) and `small` (new), 8 variants in total
  `small`: 32px tall · icon 16 · `typography/label/small` (12/16) · padding `spacing/sm` · gap `spacing/xs`
- `CrvTabsStandard` accepts the prop **`size?: 'small' | 'large'`** (default `large`) — previously there was no size at all
- Added `typography.fontFamily.ui` / `.prose` in `code/core/tokens.ts` (`.sans` / `.serif` still work but are now marked deprecated; the 101 call sites have not been migrated yet)

### ✏️ Changed

- `crv-tabs-standard` changed from a **single COMPONENT → a COMPONENT_SET** with a `size` variant so that the size can be switched from a dropdown
  The set's Node ID is **`6086:59`** (the `size=large` variant is still the original node `4838:9365` — existing instances do not break)
- Updated the Code Connect of `CrvTabsStandard` to point to the new set, with `size` mapped

### 📌 Good to know before use

- If anything references `crv-tabs-standard` by node id `4838:9365`, change it to `6086:59`
- The `tabs` of `crv-tabs-standard` is a **SLOT** — `size` controls only the default tabs that come with the component; if you put in your own `crv-tabs-standard-base` instance, you must also set `size` on that instance (this case has not been tested)
- `size=small` of tabs binds font-size/line-height directly to the `typography/label/small/*` variables and does not use a text style, because the font `Aktiv Grotesk Thai` could not be loaded in the environment where the fix was made — so the original typeface was kept to match `size=large`
- `color/content/secondary` and `color/content/placeholder` are now the same value (`slate/500` `#64748b`) — **confirmed as intentional**
- **The component set border now has a standard** — `#ae00ff` · weight 1 · align OUTSIDE · dash 6/4 (excluding cornerRadius, which each component may use differently), taken from `crv-button-standard`
  Previously the file had 8 mixed styles; adjusted the 21 sets that did not match. Now all 72 component sets are identical (not counting `Icon/*`, 1,076 of them, which are a different library)
- **`crv-menu-item` state disabled** — the icon used to stay at `color/content/secondary` although the label was `color/content/disabled`; fixed to match in 2 variants
  The other 6 variants, where the icon (`content/secondary`) is lighter than the label (`content/primary`), were **not fixed** — it is a pattern of de-emphasizing the leading icon that is probably intentional; if not, let us know

---

## v1.1.0 — 2026-08-31

### 🆕 Added
- Added the text styles `typography/prose/large`, `typography/prose/medium`, `typography/prose/small` — for long continuous reading content (AI replies, articles), with the size/line-height exactly equal to `body/*`, differing only in font-family
- Added 9 variables to support `prose/*` (`font-size`, `line-height`, `font-weight` × 3 sizes)

### ✏️ Changed
- Renamed the token `font-family/sans` → **`font-family/ui`**
- Renamed the token `font-family/serif` → **`font-family/prose`**
  (the font values in each mode are all unchanged; only the names changed, to be more meaningful)
- Fixed the font-family of `typography/body/large·medium·small` — it had been wrongly bound to `prose`; corrected to `ui` (see 🐛 below)
- Adjusted the size of `typography/display/large`: Desktop 64px → 60px, Mobile 40px → 48px
- Adjusted the size of `typography/display/small`: Desktop 40px → 36px, Mobile 32px → 30px
- Adjusted the `typography/label/xsmall` line-height (Mobile): 14px → 16px — to match the existing ratio and to be safe for Thai vowels/tone marks at the smallest font-size in the system
- Adjusted `color/content/secondary`: `#475569` → **`#64748b`** — to differ more clearly from `content/primary`, while still passing WCAG AA (contrast ~4.76:1)

### 🐛 Bug fixes
- The `body/*` text styles used to bind the wrong font-family (`prose` instead of `ui`), causing the **help-text and placeholder in every input component** (crv-input-standard, crv-input-horizontal, crv-text-area-standard) to render in the wrong font — fixed

### 📌 Good to know before use
- If anything references the token names `font-family/sans` or `font-family/serif` directly (e.g. in code or another plugin), change them to `font-family/ui` / `font-family/prose` per the new names
- The button (`crv-button-standard`) still has a wrong label size (small/medium should be `label/medium` but are still `label/large`) — it cannot be fixed yet because the font `Aktiv Grotesk Thai` cannot be loaded in the current environment; waiting for a decision on the font

---

## v1.0.1 — 2026-08-28

### 🐛 Bug fixes

- Fixed `CrvDropdown` — fields with `size="small"`/`size="medium"` were not actually applied and rendered at MUI's defaults (57px tall, 16px text) everywhere they were used, instead of the Figma sizes (`small` 38px/14px, `medium` 48px/16px) — the cause was that MUI `Select` clones the `input` element and then overrides the `sx` set on `<OutlinedInput>` wholesale with `Select`'s own `sx`. Moved all the size/color/border styling into the `sx` of `Select` instead
- Checked `CrvPagination` (which uses `CrvDropdown` internally) — it does not have the same bug, because it customizes through the public `sx` prop of `CrvDropdown` (which lands on `FormControl`, not directly on `Select`)

---

## v1.0.0 — 2026-07-06

### 🆕 Initial Release

**Components**

| Component | Notes |
|---|---|
| `crvButton` | Primary action button |
| `crvButtonIcon` | Icon-only button |
| `crvInput` | Text input field |
| `crvCheckbox` | Checkbox input |
| `crvSelect` | Dropdown select |
| `crvTabs` | Tab navigation (Standard) |
| `crvTabsPills` | Tab navigation, pill style |
| `crvTabsFolder` | Outermost-level tab navigation |
| `crvTagStandard` | Status/category label |
| `crvAvatar` | User avatar |
| `crvBreadcrumb` | Breadcrumb navigation |
| `crvPagination` | Pagination control |
| `crvSidebar` | Sidebar navigation |
| `crvMenuItem` | Sidebar menu item |
| `crvTableCell` | Table cell |
| `crvTableHead` | Table header cell |
| `crvCard` | Content card container |

## Draft — 2026-11-27 · Product prototypes and Mira DS

- Added CarivaSpace HosXP homepage prototype in its Product folder, standalone localhost5174, Product Storybook/Canvas and shared collapsible workspace sidebar. Removed DS mock example projects/stories from navigation.
- Required reading create-project before every new project/prototype; restored sidebar/shortcut contract and daily repository update guidance.
- Added Mira Workflow Card five colors and Recorder four states, with25 Product-only Mira Semantic tokens and local Figma assets. Documented12px minimum deviations, font fallbacks, source contrast findings and pending library publication/Code Connect/Figma docs.
- Local builds and focused Storybook tests recorded in Product audits. No release numbered, deployment, Figma canvas write, library publication, commit or push performed for these changes.

### Draft — 2026-11-27 · HosXP consumes Mira Recorder

- Start Record now mounts the real Mira Product DS Recorder in HosXP; the user authorized this cross-Product dependency. HosXP owns pause/resume/stop, demo playback/seek, local discard confirmation and transcription feedback.
- Added recording-only waveform animation with reduced-motion support; paused and transport states remain static. Removed duplicate HosXP header recording controls and the old microphone pulse.
- Updated HosXP/Mira contracts and stories for recording, pause, stopped, playback, mobile and discard. No real microphone, audio upload or transcription API added.
