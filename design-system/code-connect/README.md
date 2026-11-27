# Code Connect — Figma ↔ shadcn

Links the component sets in Figma (file Cariva Core Design System `XgxprkSY5mGbzIIwlmscCt`) to the code in `shadcn/src/lib/app/components/`, so Dev Mode shows the DS's real code and imports (first linked on 26 November 2026: 38 files, 170 mappings after a second re-check pass, which picked up 20 additional mappings for sets that had been missed)

## Rules

**Every new component must be connected through Code Connect every time** (user ordered this on 26 November 2026). If you add or rename a set in Figma that has matching code, add/edit the `*.figma.tsx` file in this folder, then run the steps below before saying it is done. See the full rule in [workflow-map.md](../rules/workflow-map.md)

## How to add / edit a map

1. Open that component's file (or create `name.figma.tsx`) and add `figma.connect(Component, "<URL of the set in Figma>", { props, example })`. Use the node id of the **component set** (not an instance). The prop values and the value names in `figma.enum` must match Figma according to the table in [FIGMA-NAMING.md](../docs/components/FIGMA-NAMING.md)
2. Type-check: `npx tsc -p shadcn/code-connect/tsconfig.json` (at the repo root) must report no errors in this folder
3. From the **repo root**: `npm run code-connect:parse` (see the parse result), `npm run code-connect:dry-run` (check without sending), then `npm run code-connect:publish`
4. Check in Dev Mode or with `get_code_connect_map` that the new node shows the correct component/import

`FIGMA_ACCESS_TOKEN` must be in `.env.local` (the user adds it; the script `scripts/code-connect.sh` loads it). The config is in `figma.config.json` at the root (`importPaths` must include `ui/*`, `app/*` and `products/mock-mira/components/*`, because `*` matches only the file name)

## Visualization

`visualization.figma.tsx` connects the `crv-chart-01…25` cards (25 sets) and `Chart plot / …` (25 parts) to `VisualizationChart`, using `variant` according to `docs/components/VISUALIZATION-MAPPING.json` (written by the ChatGPT side). The `title` prop is linked to the card's text prop `title`, while the data (`data`, `series`) is basic sample data not tied to Figma, and `viewport` desktop / mobile is not passed as a prop (the chart adapts to the width by itself). The set names are still `crv-chart-NN / …` as that work defined them

## MIRA Component Library file (`37MSJL69dK206ouPp4F1xW`)

`mira-library.figma.tsx` connects `mira-recorder` (4 states → `MiraRecorder` `state`) and `crv-card` (`color` → `WorkflowCard`; the props in Figma are named `Badge`, `Title`, `Subtitle`, `Icon`, `color`) of that file (`products/mock-mira/components/`). **Pending:** the 5 color variants of `crv-card` (nodes `0:109`, `0:115`, `0:121`, `0:131`, `0:141`) have old, incorrect mappings in the Figma file (names like `WorkflowCard/blue` point to `src/components/ui/WorkflowCard.tsx`, which does not exist) that cannot be overwritten by publishing. Those mappings must be deleted in Figma Dev Mode first, then publish again

## Known limitations

- The `false` value of a boolean prop is not shown in the example (Code Connect shows only `true`), so you will not see `showTopColor={false}`, `progressVisible={false}`, `valueVisible={false}`, `costHintVisible={false}` when Figma has them turned off (the default in code is `true`). If it must be shown, split the connect by value (`variant: { ... }`). Example: `Tooltip` with `placement=none` is split out as `showArrow={false}`
- Inner sub-parts that have no export of their own map to the parent component: `calendar-day` → `Calendar`, `time-column` / `time-option` → `TimePicker`, `rating-star` → `Rating`, `sheet-content` → `SheetContent side="bottom"`
- The examples are basic compositions (e.g. `Sidebar`, `Sortable`, `Stepper` filled with sample data), not the real values of that page

## Separate Button sets

`button-sets.figma.tsx` connects `button-icon` (`size` lg / default / sm → `icon-lg` / `icon` / `icon-sm`), `button-loading`, `button-link`, `button-decorative` to the same single `Button` (set names and values were renamed in Figma on 26 Nov 2026)

## Not yet connected (no matching code)

- Button: `crv-button-mic`, `crv-button-split` (no code exists)
- `Component Base` on the Breadcrumb page (a template part)

`scrollbar` is connected to `ScrollArea` (`orientation`, `track`) and `separator` to `Separator` in `misc.figma.tsx`
