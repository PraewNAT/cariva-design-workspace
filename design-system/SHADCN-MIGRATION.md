# Shadcn migration / Draft 24 November 2026

> **Status as of 26 November 2026:** This document is a dated record of what was written at the time; it has not been updated for every decision made since. The Lab, Dashboard and Login pages mentioned here have been removed from `shadcn/`. Canvas uses the one in `sync/canvas`. The MUI code lives in `legacy/mui/`. The current order of steps and decision gates are in `rules/workflow-map.md` of `shadcn/`.

The user gave the order "switch it now" (Thai: “เปลี่ยนเลย”), so the real migration started in this workspace, keeping React 19 / Vite / Storybook 10 and using the installed shadcn `base-maia` / Base UI. Next.js and Radix from the reference are not automatically brought in.

## Structure in actual use

```text
src/
  App.tsx                         # Vite entry: Lab preview
  index.css                       # Tailwind/theme aliases + fonts
  lib/
    app/
      components/ui/              # Core primitives from official shadcn
      components/app/             # compositions and material SVG icons
      hooks/                      # app hooks
    core/design-system/
      tokens.ts                   # generated semantic colors + shared scales
      semantic.generated.css      # generated shadcn role mapping
      generatedPalette.ts         # generated color export
      catalog/migration-map.json  # legacy → replacement inventory
    features/
      lab-interpret/presentation/ # summary/lab results/shadcn Chart + Recharts/mock fixtures
      board/presentation/         # Core catalog + Foundations
code/core/                        # frozen MUI reference, not in the build
legacy/                           # old experiments + checkpoint manifest
```

There is no drag-and-drop playground, branch workflow, slot-saving system, Figma auto-sync, new Code Connect or automatic package distribution yet. These items are still in the earlier plan; they are not considered present just because the stack changed.

## Scope that changed

- The active app and Storybook use shadcn/Base UI, with no imports of MUI/Emotion/the legacy Core, and the MUI/Emotion dependencies have been removed
- Lab page: shadcn Sidebar, Button, Input, Select, Table, Badge, Tabs, Dialog, Textarea, Accordion and Card; shadcn Chart + Recharts
- The catalog has primitives and composed patterns for date-time/file/rating/stepper, with examples of forms, feedback, navigation and overlays
- Lab imports primitives directly; labelled fields/dialog are feature compositions. Controller hooks separate state, filtering, export and chart lifecycle. The old bridge is kept in legacy/shadcn-experiments/refactor-reference and is not in the active src.
- `tokens.json` is the source for semantic colors → tokens.ts + semantic.generated.css; `tokens:check` checks the local generated files and does not read Figma
- Primary #1789fa, secondary content Slate700, border default Slate200 / strong Slate300; IBM Plex Sans Thai UI, Looped prose, minimum 12px; Product radius uses the existing tokens
- Button default 40px uses 16/24 + padding8; small32 / large48; Input default40 and Lab medium48; overlay/theme use the same root token

## Compatibility and what not to claim

Changing the framework does not mean the visuals/props of all 47 Crv components were copied 1:1. The table below gives the replacement route and the differences; it is not evidence of Code–Figma parity for every variant or approval for production use.

- 192 semantic mappings in tokens.json versus the Figma snapshot of 199 semantic variables; all 648 in the snapshot are in the Foundations inventory; new values are not mapped by guessing
- Dark Theme has no approved Figma mode yet, so no dark palette is added by us. HosXP/Aktiv and Malila still need font assets handled with the team before the rendering can be certified
- Rating became a 1–5 score selector; Mic is a UI toggle; FileUpload picks a local file; there is no upload/recording backend
- shadcn APIs such as Select onValueChange, Dialog render composition and Button variant/size differ from Crv/MUI; see the real examples in Storybook before substituting them in an external consumer
- The history of the old MUI stories is kept in code/core; the new Storybook tests the new implementation, and there is no claim that the legacy 335 tests are all still applicable to the new contract
- The primary color with white text has a contrast of about 3.5:1 per the original Figma, so it does not yet pass AA for normal text; the color was not changed by us and there is no claim that accessibility passes entirely

## Replacement table for the previous components

| Legacy | shadcn | Notes |
|---|---|---|
| CrvAccordion | accordion | Uses the new shadcn API |
| CrvAutocomplete | combobox | Uses the new shadcn API |
| CrvAvatar | avatar | Uses the new shadcn API |
| CrvAvatarGroup | avatar | Uses the new shadcn API |
| CrvBadge | badge | Badge / AvatarBadge; notification count is a Product composition |
| CrvBottomSheet | sheet | SheetContent side="bottom" |
| CrvBreadcrumb | breadcrumb | Uses the new shadcn API |
| CrvBreadcrumbBase | breadcrumb | Uses the new shadcn API |
| CrvButton | button | Uses the new shadcn API |
| CrvButtonDecorative | button | variant="decorative", color from the Figma gradient |
| CrvButtonIcon | button | size="icon-sm/icon/icon-lg" with aria-label |
| CrvButtonMic | button | Button + aria-pressed: UI toggle only, not connected to a microphone service |
| CrvButtonSplit | dropdown-menu | Button + DropdownMenuTrigger/MenuGroup |
| CrvCard | card | Uses the new shadcn API |
| CrvCheckbox | checkbox | Uses the new shadcn API |
| CrvCheckboxBase | checkbox | Uses the new shadcn API |
| CrvCheckboxGroup | field | FieldGroup/FieldSet + Checkbox |
| CrvChipAction | toggle | Toggle for selection; Button for the remove action |
| CrvCircularProgress | spinner | Uses the new shadcn API |
| CrvDateTimePicker | calendar | composed DateTimePicker in app/patterns.tsx: Calendar/Popover + Input time |
| CrvDrawer | sheet | Uses the new shadcn API |
| CrvDropdown | select | Uses the new shadcn API |
| CrvFab | button | Button size=icon-lg; place it fixed in the Product when needed |
| CrvFileUpload | input | composed FileUpload: picks a local file, does not send to an API yet |
| CrvInput | input | Uses the new shadcn API |
| CrvInputHorizontal | field | Field orientation=horizontal + Input |
| CrvInputOtp | input-otp | Uses the new shadcn API |
| CrvInputOtpBase | input-otp | Uses the new shadcn API |
| CrvLinearProgress | progress | Uses the new shadcn API |
| CrvLink | button | Button variant=link / anchor uses buttonVariants |
| CrvMenuItem | dropdown-menu | Uses the new shadcn API |
| CrvModal | dialog | Uses the new shadcn API |
| CrvPagination | pagination | Uses the new shadcn API |
| CrvRadio | radio-group | Uses the new shadcn API |
| CrvRadioBase | radio-group | Uses the new shadcn API |
| CrvRadioGroup | radio-group | Uses the new shadcn API |
| CrvRating | radio-group | composed Rating: RadioGroup 1–5, the old star visual has not been copied |
| CrvSidebar | sidebar | Uses the new shadcn API |
| CrvStepper | progress | composed Stepper: current step + Progress |
| CrvSwitch | switch | Uses the new shadcn API |
| CrvSwitchBase | switch | Uses the new shadcn API |
| CrvTable | table | Uses the new shadcn API |
| CrvTabs | tabs | Uses the new shadcn API |
| CrvTag | badge | Uses the new shadcn API |
| CrvTextArea | textarea | Uses the new shadcn API |
| CrvToast | toast | Uses the new shadcn API |
| CrvTooltip | tooltip | Uses the new shadcn API |

## Checks and rollback

`npm run build`, `npm run tokens:check`, `npm run migration:check`, `npm run build-storybook`; interaction/accessibility pass through the Storybook test-run per the skill. The actual report is at `reports/shadcn-migration-audit.md`

The original MUI is kept at code/core and the checkpoint `backups/2026-11-24-before-shadcn.tar.gz` (before editing the runtime/source but after downloading the first set of primitives). To roll back, extract into a new folder and install dependencies per the checkpoint; do not extract over the workspace automatically. No legacy was deleted and no remote Figma/Code Connect was written in this work.

## Structure consolidation / 2026-11-25

Active source follows docs/architecture/STRUCTURE.md. Entry/styles now live in src/app; generated tokens and themes have separate folders; prototype fixtures live in each feature infrastructure. All source imports, generators, Storybook theme import, components.json and handoff theme path updated. Legacy preserved.
