> Canonical workspace paths changed 2026-11-27: this package lives in `design-system/`; historical `shadcn/` references resolve through a compatibility symlink. Product prototype apps live in `products/<product-id>/prototypes/<prototype-id>/`; Canvas assets live in `workspace/canvas/`. See [workspace rules](../../../rules/workspace-structure.md) and [prototype index](../../../products/README.md).

# Active source structure

Adapted 25 November 2026 from /Users/natthaphorna/structure-lab-interpret, using the existing Vite / React 19 / shadcn Base UI

```text
src/
  main.tsx                         # Vite bootstrap
  app/
    App.tsx                        # minimal entry (components only)
    globals.css                    # shared theme entry and Product overrides
  lib/
    app/
      components/ui/               # shared shadcn primitives, stories and docs
      components/app/              # compositions and icons
      hooks/
      utils.ts
    core/design-system/
      tokens/                      # generated tokens.ts and generatedPalette.ts
      themes/                      # generated semantic CSS
      catalog/                     # migration registry
      figma/                       # comparison fixtures, not live sync
    features/
      board/presentation/          # Foundations and Core catalog
```

Dependencies: app entry → feature presentation → shared app components / Core tokens. UI primitives must not import board or Product features. Mock data sits inside the owning feature; it is not a real backend integration. Core tokens do not import React or Product screens. Keep stories/docs colocated with their actual component.

Use @ as src. Import the theme from src/app/globals.css. generators write to core/design-system/tokens and themes; change tokens.json and regenerate rather than editing generated output.

No new Next.js/Radix/API/auth/i18n dependencies or unused empty infrastructure layers. Add feature infrastructure integrations when actually needed. code/core and legacy/shadcn-experiments remain frozen references and are not active source; preserved per user instruction. No Figma changes, component API changes, visual redesign, border or radius changes in this refactor.

## Coding conventions / 2026-11-25

Reference project separates feature model contracts, presentation components/controllers and data adapters. Use that separation with the existing Vite runtime. LabResult and Result types are at feature root; mock infrastructure imports those contracts. Lab page views compose shadcn directly. Labelled fields and dialogs are feature compositions, not replacement primitives. Controller hooks own event state, filtering and CSV. Recharts owns SVG rendering and resize lifecycle; shared TrendChart composes the official shadcn Chart primitives. Dashboard retains its native layout experiment and uses the shared shadcn/Recharts chart composition. Stock shadcn primitives already follow the reference function/component-props conventions and were retained, with imports formatted consistently. Do not create arbitrary hooks for simple local UI state or new business/infrastructure layers without need.

Public screen/story props and story IDs remain unchanged. LabGroupSelect uses onValueChange(string), LabDialog uses contentProps typed from DialogContent; the old synthetic Select event and MUI paper slot contract were retired internally. Historical bridge is retained under legacy/shadcn-experiments/refactor-reference.

## Audit follow-up / 2026-11-25

LabResultTabs has no size prop. LabSearchField and LabGroupSelect support only small/medium; large was never implemented and is no longer advertised. Existing 40/48px recipes are preserved. Dashboard Specimen/SpecimenStatus are independent feature model contracts; fixture data satisfies that contract. LabPreviewOptions and resolveLabPreviewOptions are the single source for screen/controller inputs and defaults. saveDraft/saveNote own their original state transitions. Rating uses per-instance useId.

LabOverviewSection, LabScoresSection, LabResultsSection and LabPanels own distinct sections; Dashboard has metrics/workload/follow-ups/delivery/queue/detail components. CoreCatalog composes eight named catalog sections; button demo and pagination state live in their owning sections. No extra DOM wrappers were introduced. All internal section components remain covered through their public page stories. No Figma edits are required for this internal refactor.

## Core Storybook coverage / 2026-11-25

Every Core UI module now has a colocated story file. All UI modules are under Core/Components; Button retains its core-button IDs. Related compositions share the same component CSF and Docs page. Stepper, Rating, File Upload and Date Time Picker have their own component entries. Default examples show each component independently with the required parent/subcomponent composition. The docs Source panel shows actual example JSX. Examples with fixed compositions intentionally disable Controls; the native component prop table remains available. Input/Textarea include disabled and invalid states; existing Button variants/sizes/states remain. Coverage means all 39 UI modules are discoverable, not all exported subparts/possible variant combinations fully tested.

Run node scripts/check-story-coverage.js to catch missing colocated stories. Use the live Storybook index and interaction test-run to establish successful registration/rendering.

LabResultsContent uses TableHeader/thead with TableHead/th inside the header row and stable column keys. LabSearchField honors caller id or creates one; LabNoteField honors caller id and rows, with minRows retained as the fallback. Existing consumers preserve their visual values. SelectContent forwards its existing aria-label/aria-labelledby to its internal list so accessible naming does not require a new prop.
