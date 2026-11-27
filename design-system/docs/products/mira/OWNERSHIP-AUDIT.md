# Core / Mira ownership audit — 2026-11-26

Only the components worked on in this chat were checked: 12 Figma pages, 36 component sets and 4 standalone components; compared the source section/name/description, source imports, Storybook titles and the actual docs/mapping; the Product is not inferred solely from sample patient data or metric names

| Category / Figma page | Source sets + standalone | Current ownership result |
|---|---|---|
| Avatar `4315:9628` | 2 + 0 | Core: Avatar / AvatarGroup |
| Combobox `4453:12569` | 1 + 0 | Core |
| Badge `4518:82928` | 1 + 0 | Core Badge; a different component from Mira Credit Badge |
| Bottom Sheet `4481:19038` | 2 + 0 | Core Header/Content |
| Card `4536:123342` | 4 + 1 | Core: horizontal/vertical/small/profile/metric; no evidence of Mira ownership found |
| Date/Time `4294:5594` | 6 + 2 | Core: date/calendar/time including actions/popup |
| File Upload `4457:56068` | 3 + 0 | Core: file/image dropzone and item |
| Progress `4456:16544` | 4 + 0 | Core linear/circular 2 sets; Mira Credit Badge 2 sets already separated |
| Radio `3815:5557` | 3 + 0 | Core group/standard/base |
| Rating `4887:4878` | 2 + 0 | Core star/rating |
| Tabs `3875:4437` | 5 + 1 | Core base/Pills/Standard/Folder including the standalone Folder |
| Tooltip `4167:286` | 3 + 0 | Core Standard/With Action 2 sets; Mira Credit Tooltip 1 set already separated |

Current mapping summary: Core 33 sets + 4 standalone, Mira 3 sets in 2 components. No evidence was found that any remaining component in this scope is additionally Mira, so no code or stories were moved this round

Mira code/stories/assets live in `src/lib/products/mira/components/`; Storybook separates `Products/Mira/Components/Credit Badge` and `Products/Mira/Components/Credit Tooltip`. Both reuse Core; no Core import from Mira and no import of the old Credit Badge path was found. Docs/mapping are in the same Mira folder as this report

Fixed leftovers found: the Figma descriptions of the Credit Badge sets `7089:1151` and `7094:365` still referenced `app/credit-badge.tsx` / Progress docs `4721:88932`. Updated to the Mira source path, Storybook group and Mira docs `7296:35`, without changing names/props/variants/main geometry. Credit Tooltip uses Mira docs `7292:35` per the existing mapping

**Reuse & Duplicate Check — Core / Mira ownership**
Result: no further Mira mixed into Core found within the checked scope; fixed two stale source descriptions
Scope: the 12 categories above and current code/docs; not an audit of every Product or a new runtime/accessibility audit

| Severity | Status | Item | Evidence | Next action |
|---|---|---|---|---|
| — | Pass | Mira 3 sets are in 2 Product components, separate folder/Storybook/docs | FIGMA-MAPPING.json; output/mira-ownership/audit.json | Keep ownership |
| — | Pass | Core does not import Mira; Mira reuses Core; no old Credit Badge imports found | scoped source search | No further moves needed |
| — | Pass | Fixed the Figma source descriptions of 2 sets that still pointed to the original Core docs/path | audit.json descriptionFix | Use Mira docs 7296:35 |

Totals: 3 passed, 0 need fixing, 0 could not be checked for the ownership scope; does not re-certify the quality items outstanding from the earlier audit
Next: use the existing Mira mapping for the next round of Product work

This round changed only documents and Figma descriptions, so build/interaction tests were not re-run, and the previous round's test results are not claimed as a new quality check. Detailed discovery evidence is in `output/mira-ownership/audit.json`
