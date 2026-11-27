# Storybook component organization

26 November 2026 · The user confirmed that every component lives in one place · branch `praew` · no commit/publish

Every component lives under **Core → Components → component name**. The primitive, composed examples, variants, states and docs of a single component sit in the same CSF/Docs; there is no need to search Patterns or Composed any more. Foundations, the Shadcn catalog and Workspace/Canvas are overviews and remain separate.

| Previous location | Current location | Stories |
|---|---|---|
| Components/Card + Patterns/Content Card | Components/Card | 10 including Default and all 5 Card types |
| Components/Checkbox + Patterns/Checkbox | Components/Checkbox | 5 including Field/Group/Card |
| Components/Chart + Composed/Trend Chart | Components/Chart | 10 including TrendComparison/TrendMissingData |
| Core/Button | Components/Button | 9 and Source code; `core-button` IDs kept |
| Composed patterns/Steps | Components/Stepper | 1 |
| Composed patterns/Score, MultipleRatings | Components/Rating | 2 |
| Composed patterns/LocalFile | Components/File Upload | 1 |
| Composed patterns/Appointment | Components/Date Time Picker | 1 |

The actual index shows 43 component groups (39 UI modules + 4 composed components), 113 stories across the whole Storybook. No component story is left outside Components. The Docs/Source code of Button is now bound to the Button group. Card/Checkbox/Chart use the Docs of the original groups, so the main Docs URLs do not change and the extra examples appear on the same page.

The story IDs of examples moved from Patterns/Composed change to follow the new groups; there is no automatic redirect from old links. Use each component's main Docs or the current sidebar. Old audit logs keep the original IDs as of the time they were checked; the evidence history is not rewritten retroactively. Production component code, tokens and business behavior did not change in this regrouping work.

**Component Audit — Storybook navigation**
Overall: every component is placed under Components and the examples of the same component are merged; behavior tests pass for 32 stories
Scope: CSF/MDX index, Docs render, story moves, import paths, play functions and build; not a visual audit of every component anew

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | The existing contrast issues of Button, Checkbox, Metric, Rating/Stepper still appear in the a11y logs | output/storybook-navigation/storybook-tests.txt | Colors not changed in the regrouping work |
| — | Pass | All 43 component groups are in Components; no Patterns/Composed/duplicate component groups | index.json, sidebar | Keep the grouping rule in agent-rules.md |
| — | Pass | Card 10/Checkbox 5/Chart 10 merged into a single Docs; Button Source code is in Button | index.json and Docs browser render | Use these main groups |
| — | Pass | The 32 stories that were moved or are related pass when run; the original play functions are still there | storybook-tests.txt; Trend focused rerun | Do not reduce assertions |
| — | Pass | build/migration, Storybook build, coverage 39/39, diff check pass | output/storybook-navigation logs | Do not claim coverage of every state from the file check |

Summary: 4 pass, 1 needs fixes (an existing group), 0 unverifiable in the navigation scope; does not claim that AA passes everywhere
Next: open the Card Docs and review the regrouped sections


## Prototype workspace — 2026-11-27

- Run `npm run prototype` in `shadcn/` for the independent Vite host at `http://localhost:5173/?case=catalog` (strict port; do not replace an unrelated server). It runs without Storybook.
- Run `npm run storybook` for `Workspace/Canvas` at port 6006. Its Canvas / Preview selector uses `sync/canvas/frames.prototype.json`; “เปิดเต็มหน้า” (Open full page) opens the matching case on port 5173 without Storybook chrome. Both servers must be running for that link.
- `PrototypePreview.tsx` owns the shared case registry and renderer; Vite App and `Workspace/Prototype` stories use that same renderer. Current cases are existing DS examples (catalog, appointment, form), not new approved Product screens.
- Add actual Product screens to the shared registry and stories, then add verified story IDs and standalone case URLs to the frame catalog. Keep Product implementations in their Product area.
- Mode/case persist in the direct Canvas URL; Storybook shell reload currently initializes Canvas from its configured URL. Form state is local to each rendered frame/preview, not synchronized across modes or hosts. Selecting another case remounts its screen.
- Full-page new-tab preview works independently. Native fullscreen is optional and reports when the browser refuses it. Static Storybook builds retain local prototype URLs; replace them with verified deployment destinations only when deploying is requested.
- The existing component board remains available through `frames.shadcn.json`. No Product/Core API changed.


## Superseded prototype examples — 2026-11-27

Workspace/Canvas Board/Mobile and Workspace/Prototype Catalog/Appointment/Form were deleted on request and are no longer used as project entries. Use Products/CarivaSpace HosXP/Prototypes/Home for real work, together with the Product's Canvas; local host 5174 and workspace/prototypes.json are the current selector entries. Port 5173 is a workspace launcher with no mock screen

Sidebar order: Core/Components starts with Button → Button Mic → Button Split → Fab. Remaining component groups sort alphabetically. Story titles and IDs remain unchanged; Product components remain under Products. Configured in .storybook/preview.tsx.

## Foundation and date/time grouping — 2026-11-27

Core → Foundations is ordered before Core → Components. Date Picker, Time Picker and Date Time Picker share Core → Components → Date & Time, with each component's existing stories and interaction coverage preserved. This changes Storybook navigation only; component implementations and contracts are unchanged. Story IDs follow the new hierarchy.

## Input grouping — 2026-11-27
Field composition examples are nested under Core → Components → Input → Field, beside the Input stories. Input is the primary group name; the reusable Field wrapper remains visible as a child story group. This is a Storybook navigation change only; component contracts are unchanged.

## Input family grouping — 2026-11-27
Input-related stories are nested under Core → Components → Input: Field, Input Group, Input Otp, Label and the base Input stories. This keeps the sidebar from presenting the label/composition primitives as competing top-level controls. Storybook grouping only; code APIs remain separate.

## Dropdown naming — 2026-11-27
The Storybook group for the existing Select primitive is named Dropdown so the sidebar uses the user-facing term. The source component and imports remain `Select`; only the Storybook title and coverage index label change.
