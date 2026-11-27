# Figma documentation mapping

Updated 26 November 2026 per the request to update the docs of all components worked on in this chat. DS file: Cariva Core Design System (`XgxprkSY5mGbzIIwlmscCt`). This is an update of documents and descriptions, not publishing the library/Code Connect or changing the property API.

| Family | Page node | Docs node / actual link | Code source |
|---|---|---|---|
| Avatar | 4315:9628 | [Avatar docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4648-15632) | ui/avatar.tsx |
| Combobox + related FieldLabel | 4453:12569 | [Combobox docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4537-146774) | ui/combobox.tsx, ui/field.tsx |
| Badge | 4518:82928 | [Badge docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-57628) | ui/badge.tsx |
| Bottom Sheet | 4481:19038 | [Bottom Sheet docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-45214) | ui/sheet.tsx |
| Card | 4536:123342 | [Card docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4713-2014) | app/content-card.tsx, ui/card.tsx |
| Date/Time | 4294:5594 | [Date/Time docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7228-128) | app/date-time-pickers.tsx, ui/calendar.tsx, app/patterns.tsx |

The source paths above are under `shadcn/src/lib/app/components/`. Read the API from code, visual rules from what has been agreed, and audits from each family's file. The examples in the Figma docs are verified instances; they were not detached and no imitation components were created. AvatarGroup parity, contrast and Date/Time keyboard/a11y/geometry that are still awaiting permission are stated explicitly; the docs update is not treated as approval to change code.

Updated the 5 existing docs frames and created a new Date/Time docs. Adjusted 47 existing text points, added code/audit panels and Profile/Metric specimens in Card; the descriptions of the 16 component sets and variants point to the current code contract. Main component names, property definitions, variant geometry and radius were checked against the baseline and are unchanged.

Bottom Sheet uses the existing showKeyboard=false only on doc instances `4716:46098`, `4716:46282` as the user permitted; the main component is unchanged. Date range/birth in the new docs page override text values only on instances to match September 2024, keeping the link to the main component.

Baseline/verification are in `output/figma-docs/`; the earlier runtime audit of each component remains evidence as of the time it was checked. This work is documentation-only; app tests were not re-run, and it does not claim that Date/Time at 19/20 passing has become a passed audit just from writing documentation.

**Component Audit — Figma documentation follow-up**
Overall: all 6 documentation pages updated, visuals and links checked, with no change to code or main-component API
Scope: docs frames/text/description, verified instances, geometry and baseline of the 16 sets; not a new runtime audit round

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | The 5 existing frames and the new Date/Time use the real code API and separate out open items; all 6 pages checked visually and no text overflowing its frame was found | output/figma-docs/verification.json; links above | Use the existing nodes for the next update round |
| — | Pass | All 58 instances have main-component links; names/props/variant geometry/radius of the 16 sets unchanged | baseline.json compared with verification.json | Do not publish the library ourselves |
| — | Pass | GBoard hidden only on the 2 doc instances per confirmation; dates in the 2 doc instances fixed to match the calendar | keyboard=false; date specimen IDs in the write result | Main components kept as is |
| High | Needs fix | Date/Time code still has keyboard/ref, accessible names, popup geometry and test timing pending permission | DATE-TIME-AUDIT.md, 19/20 tests | Wait for the earlier confirmation before fixing code |
| Medium | Needs fix | The open contrast and AvatarGroup parity items are still stated in the docs; not claimed as all passing | Audit of each family | Decide separately by the original scope |

Summary: 3 passed, 2 original groups still need fixing in code; docs update complete; no claim that the runtime is ready for use from writing documentation
### Date/Time template follow-up — 26/11/2026

Adjusted the existing Date/Time page `7228:128` per Document Template `4537:130394` using Blocks `4537:130684`: Header, Vertical/Horizontal Stack, Guidance and Callout. Detached only the documentation block containers, as the template advises; the 11 UI example instances remain linked to main components, including the 6 existing instances that were kept. Main component and code not changed.

Checked visually and the editable structure: no flattened images over the UI, document text uses Inter per the template at a minimum size of 20px, and no document text overflowing its frame was found. Hid the empty example slots in Guidance and the availability badges that the template had ticked, so as not to claim support that has not been checked. The API and the open audit items 19/20 remain stated; adjusting the template does not make the runtime audit pass.

Next: get confirmation on the open Date/Time items so we can return to finish the code and audit

### File Upload — 26/11/2026

Updated the existing docs `4537:147576` per Document Template `4537:130394`/Blocks `4537:130684`, with 14 linked specimens covering both dropzones and the four item states. Source `app/file-upload.tsx`; see FILE-UPLOAD-FIGMA.md and FILE-UPLOAD-AUDIT.md. Main components unchanged; code padding 16px, as permitted, differs from Figma main 24px.

### Progress / Radio Group / Rating — 26/11/2026

Updated the existing mapped docs per Document Template: [Progress](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4721-88932), [Radio Group](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4537-147363), [Rating](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4887-55058). Used linked specimens 36/18/21, 75 in total; own text minimum 20px, no overflow found. Compared the 7 main sets: properties/variants/geometry unchanged. API/limitations per PROGRESS-FIGMA.md, RADIO-GROUP-FIGMA.md, RATING-FIGMA.md and the combined audit.

Credit Badge ownership correction: the25 existing linked instances from sets7089:1151/7094:365 moved from Progress docs4721:88932 into separate Mira docs7296:35. Core Progress retains36 specimens. Existing12px local text overrides and links are preserved. See products/mock-mira/CREDIT-BADGE.md and CREDIT-BADGE-AUDIT.md.

### Tabs — 26/11/2026

Updated [the existing docs 4838:64978](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4838-64978) per Document Template 4537:130394 / Blocks 4537:130684, covering Standard/Pills/Folder with 27 linked specimens. Own text minimum 20px with no horizontal overflow; property API and geometry of the 5 sets unchanged. Source UI uses IBM Plex Sans Thai. See TABS-FIGMA.md, TABS-AUDIT.md and output/tabs/figma-verification.json; primary contrast remains an open item.

### Tooltip Core / Mira - 2026-11-26

Updated Core documentation4716:60403 (13 linked specimens) and separate Mira documentation7292:35 (9 linked specimens) using Document Template4537:130394. Main APIs/variant geometry of three sets unchanged. Mira10px cost hints override to12px only in doc instances. Source/code ownership mapping: docs/products/mock-mira/FIGMA-MAPPING.json; contracts TOOLTIP-FIGMA.md and products/mock-mira/CREDIT-TOOLTIP.md; audit TOOLTIP-AUDIT.md.

### Core / Mira ownership audit - 2026-11-26

Checked12 previously implemented pages (36sets +4standalone). Confirmed Mira ownership remains Credit Badge2sets and Credit Tooltip1set, already separated into Product source/stories/docs. No additional Mira evidence found in this scope. Corrected stale Credit Badge source descriptions7089:1151/7094:365 to Product paths and docs7296:35. Detailed report: [Mira ownership audit](../products/mock-mira/OWNERSHIP-AUDIT.md). Documentation-only follow-up; no runtime quality re-certification.

### Visualization - 2026-11-26

Mapped docs7303:35 use Document Template4537:130394 with50 linked specimens for25 desktop/mobile chart sets. Contracts: VISUALIZATION-FIGMA.md; local node/code map: VISUALIZATION-MAPPING.json; audit: VISUALIZATION-AUDIT.md. Source main APIs unchanged. Code Connect remains pending: discovery found no published components in the supplied selection; local JSON is not a published connection.
