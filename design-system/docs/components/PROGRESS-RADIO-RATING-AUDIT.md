# Progress / Radio Group / Rating — audit 26/11/2026

> Correction: the previous exclusion of Credit Badge was a scope mistake. Both sets are now included; PROGRESS-CREDIT-AUDIT.md supersedes that exclusion and records the expanded Progress coverage. The35-story result below is historical evidence for the original three-component pass.

**Component Audit — Cariva Core**
Overall: implemented and updated Storybook/Markdown/Figma docs fully; 35/35 story interactions pass, with accessibility limitations remaining from the source visuals
Scope: Progress 6, Radio Group 6, Rating 8 stories; regression 15 File Upload/Stepper/Sheet/catalog. Checked carivaApp and backOffice, mobile 320px, page/Dialog, real keyboard. Excludes credit badges, backend, physical touch/OS preference and screen-reader certification

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | Radio border/default and Rating amber/empty outline have low non-text contrast; Rating 18px/half-step has a hit area below 24px | Figma bindings; computed browser styles; RATING-FIGMA.md / RADIO-GROUP-FIGMA.md | Keep the source visuals and record the open items; do not change central tokens just to pass the audit |
| — | Pass | 20/20 component stories and 15/15 consumer interactions; disabled style and SVG mask have focused regression tests | output/progress-radio-rating/component-tests.txt, consumer-tests.txt | Keep regression cases |
| — | Pass | Native Rating ArrowRight 4→4.5; Radio ArrowUp skips disabled; focus/system inset 2px | output/progress-radio-rating/browser-evidence.json | No further action needed |
| — | Pass | Progress 4px/circular 24/40/56; Radio 16/dot 10; Rating 18/24/30; page/Dialog recipes match; Thai 320px does not overflow, minimum text 12px | browser-evidence.json; Storybook states | Use the same primitives |
| — | Pass | Figma template complete for 3 pages, 75 linked specimens, own-doc text ≥20px/no overflow; 7 main contracts/geometry unchanged | figma-verification.json; mapped Figma links | Update the existing mapped nodes |
| — | Pass | Build, scoped oxlint, tokens check, story file coverage 41/41 | Commands actually run; output/progress-radio-rating/build.txt | Not a certification for every Product/every state |
| Low | Could not check | Reduced-motion checked via CSS branches only; real OS preference/physical touch/screen reader not yet tested | motion-safe/motion-reduce rules; progress.css | Check when suitable devices/AT are available |

Summary: 5 passed, 1 needs fixing, 1 cannot be checked; do not claim full WCAG AA even though all interaction tests pass
Next: fix the accessibility visual gaps at the source when the team is ready, keeping this evidence/these limitations in the handoff

**Component Reuse & Duplicate Check — Cariva Core**
Overall: really uses shared/Base UI primitives; no duplicates found within the scope checked
Scope: ui/progress.tsx, ui/radio-group.tsx, app/rating.tsx, patterns.tsx and the shared consumers listed above

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Extended the existing Progress/RadioGroup; CircularProgress uses the Base UI Progress root; RadioField uses RadioGroupItem; Rating uses the shared RadioGroup + Base UI Radio.Root and the original SVG | source imports; old Rating replaced with a re-export, no duplicate kept | Keep the composition; the existing Spinner is untouched |

Summary: 1 passed, 0 need fixing, 0 cannot be checked
Next: no further action needed

## Decisions within the scope the user permitted

- Did not ask for confirmation again per the latest instruction, but kept the constraints on shared tokens/main Figma APIs. Did not change the File Upload contrast that the user had previously decided to keep; the regression still reports the same error 4.41:1 and primary demo 3.5:1, which are not treated as new defects from these three.
- Did not change the credit badge on the Progress page or other components that colleagues are working on.
- Progress default track 12→4px affects Stepper/catalog per Figma; the FileUpload 3px override is kept. Shared consumers tested.
- Radio disabled uses the data-disabled that Base UI actually renders; does not use the disabled pseudo-class, which does not match the span radio. Error/disabled precedence is clear. RadioField separates the accessible label from the description and omits the 1px legacy padding to preserve the spacing scale.
- Rating uses the original 20×19 SVG in a 24px slot via a CSS mask with a correctly quoted URL; added a regression that checks the computed mask so it does not revert to a rectangle. Hover uses 23/29/36px per the source. No network/business data is simulated.
- Names/props/variants/radius of the main Figma components are unchanged; only the docs template and descriptions changed. The naming table lists the actual code mapping, separate from rename proposals.
