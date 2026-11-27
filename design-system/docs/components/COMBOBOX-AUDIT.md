# Combobox verification · 26 November 2026

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4537-146774). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


Status: implementation and docs per the permitted list are done; an additional contrast finding at the popup is waiting for the user's confirmation before it is fixed. Not committed/pushed and Figma was not written.

**Component Reuse & Duplicate Check — Core Combobox**
Overall: fixed the existing Combobox and reused Field/InputGroup; no duplicate component found in the scope checked
Scope: Combobox, stories, FieldLabel, CatalogForm and CoreCatalog in this checkout

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Uses Base UI and the existing primitives; no new filtering engine or label/error wrapper | `combobox.tsx:85`, `combobox.stories.tsx:13`, `CatalogForm.tsx:96` | No new component needed |

Summary: pass 1, needs fix 0, could not check 0
Next: no further reuse action needed

**Component Audit — Core Combobox and FieldLabel**
Overall: 14 interaction tests pass; 7 Combobox stories show no automated a11y findings after play, but a native open-popup inspection found an additional contrast issue that is not yet fixed
Scope: default/lg, empty/filled/error/disabled, search/no results/keyboard, page/portal, mobile 320px, Field/InputGroup/Input regression and catalog; does not certify every Product or multiselect/chips

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | Highlighted option while the popup is open: rgb(15,112,230) on rgb(238,249,255), 14px gives 4.38:1, below 4.5:1; existing recipe/token | `output/combobox/open-option-contrast.json` | Reported; waiting for the user's confirmation before changing the colour |
| Medium | Needs fix | The catalog still has the existing contrast findings from other controls | `output/combobox/storybook-tests.txt` | Split the colour work out at its source per the earlier limitation |
| — | Could not check | HosXP, external Products, multiselect/chips and automated pixel parity | Not in the scope checked | Check when the scope is extended |
| — | Pass | Field 40/48px, input 16/24, label 12/14, icon box 20/24, assets all load, disabled label uses the token colour with opacity 1 | Sizes, States, Field States, `render-measurements.json` | No further fix needed |
| — | Pass | Native hover uses border/strong; focus/error/disabled and the 12px minimum were checked | native pointer measurements and States | Do not use synthetic hover to claim the CSS passes |
| — | Pass | Search, select, no results, keyboard, Dialog and focus restoration; page/portal typography matches | Default, NoResults, Keyboard, PageAndDialog | No further fix needed |
| — | Pass | Mobile 320px does not overflow, option 14px; popup width equals the 344px anchor with a 4px offset; regression passes | MobileThai, native measurements and 14 tests | No further fix needed |
| — | Pass | app build, migration check, tokens check, Storybook build, coverage 39/39, diff check; lint has no errors | build logs; there is an existing Fast Refresh warning from an exported hook | Do not move the hook out of scope |

Summary: pass 5, needs fix 2 (1 newly found and 1 group of existing problems), could not check 1; accessibility in every state is not certified from tests that end with the popup closed
Next: wait for the user's decision on the highlighted option contrast before further fixes

## Documentation and parity

Updated the Combobox stories to 7 while keeping the Default ID, Field States adds a disabled label regression, the coverage table, `INPUT-FIELD-FIGMA.md` and `COMBOBOX-FIGMA.md`. Documented the actual props, sizes, the error binding actually checked, local assets and Product scope in the portal. Figma docs still have old naming/sizes and were not written back; Code Connect was not published.

The Figma set has 18 variants; the code shows 10 basic states (5 per size) and uses real hover/focus/open instead of fake props. Anatomy/size and screenshots were compared visually, not by automated pixel parity. The existing popup item styling/radius is not claimed to match the Figma menu-item for every variant.

The user confirmed before the fixes to popup spacing, FieldLabel disabled, the test approach for hover/keyboard/modal/timing and container typography. The additional contrast finding was reported and left as is; it is not fixed automatically.

Evidence in `shadcn/output/combobox/`: state/open/mobile/Dialog screenshots, computed measurements, the contrast measurement and build/test logs. The screenshots were inspected; they are not implementation assets.
