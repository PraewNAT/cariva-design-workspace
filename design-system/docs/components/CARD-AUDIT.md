# Card audit — final round results

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4713-2014). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


26 November 2026 · branch `praew` · working tree; pre-fix checkpoint at `output/card/baseline/`; not committed/published

**Reuse & Duplicate Check — Core Card**
Overall: adjusted from the existing compositions; no duplicate Card created and the shared primitive unchanged
Scope: source before/after the fix, Storybook docs, Card/Badge/Button/Avatar, all 5 content-card variants and consumers in checkout

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Uses the real Card/Badge/Button/Avatar; no duplicates found in scope; Metric uses the existing WarningRounded | content-card.tsx, content-card.stories.tsx | No dependency added |
| — | Pass | Added only topMessage and layout/slots in the wrappers; did not edit ui/card.tsx or shared controls | baseline/content-card.tsx compared against source; Card/Chart/catalog tests | Keep the existing API |

Summary: pass 2, needs fix 0, could not check 0 within the scope checked
Next: deliver the audit result and the open items below

**Component Audit — Core Card**
Overall: everything fixed as confirmed and tests ran and passed 12 stories; the contrast the user asked to keep is recorded as an open item
Scope: Chromium page/Dialog, viewport 320/1200px, all 5 variants, empty/long Thai slots, source/tokens, native keyboard and regression; does not certify every Product/theme or pixel parity

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | Metric abnormal value 4.41:1 and shared Button 3.50:1 are below 4.5:1 | [test log](</Users/natthaphorna/Cariva DS/output/card/storybook-tests.txt>) | The user asked to keep the abnormal colour and record it as an open item; shared Button not changed |
| — | Could not check | Every Product/font mode and automated pixel parity | Only the active theme/this checkout was checked | Do not claim everything passes |
| — | Pass | Horizontal 420×190 / absolute overlaid on the right; Vertical 330×370.66 / 2 buttons in one row gap 16; Small 344×104 / slots 80 and 40 | [render data](</Users/natthaphorna/Cariva DS/output/card/render-audit.json>), screenshots | Height grows when text is long |
| — | Pass | Profile shrinks from 320 to 240px in a Dialog; at viewport 320px the whole page and portal do not overflow; a 240px frame regression exists | [mobile measurements](</Users/natthaphorna/Cariva DS/output/card/mobile-portal.json>), Profile story | Keep max-width 100% |
| — | Pass | Profile/Metric normal bg/subtle #f1f5f9; Tag padding 2/8; Unit secondary contrast 9.45/9.47:1 | [approved fixes](</Users/natthaphorna/Cariva DS/output/card/approved-fixes.json>), render data | No change to tokens or the shared Badge |
| — | Pass | Text ≥12px; long Thai does not overflow in the 3 content recipes; page/portal use the same typography and Button recipe | render data, PageAndDialog | Do not claim responsive sizes must be equal |
| — | Pass | Optional slots / value 0; Enter works, focus trap and Escape returns focus | [keyboard evidence](</Users/natthaphorna/Cariva DS/output/card/native-keyboard.json>), OptionalContent | Component is still presentational |
| — | Pass | 12 stories ran and passed; build/migration, tokens, Storybook build, coverage 39/39, lint and diff check pass; docs match the API | output/card logs; CARD-FIGMA.md | Do not call accessibility fully passing |

Summary: pass 6, needs fix 1 group, could not check 1 group; all 5 decisions were answered and carried out as approved
Next: submit for review and split the contrast work out at its source per the user's decision

## Documentation and limitations

Updated CARD-FIGMA.md from the real API and the real Figma nodes, fixed the earlier text that described absolute as vertical, and increased stories from 5 to 9 while keeping the 5 original IDs. The checkerboard/avatar images are the original assets from Figma, while actions are an example of a dynamic slot; the Metric icon is the existing 12px component. Figma was not written to or synced, and it is not claimed that Code Connect is linked.

Height for long Thai text grows with the content; the text of the 3 content recipes is not forcibly truncated; name/identifier of Profile still truncate as before. Metric status must be determined externally; there are no medical thresholds in Core. Tests that ran and passed still show accessibility contrast findings per the log. Unit secondary is a difference from Figma that the user approved; it does not mean Figma was synced to match. The fill and Tag changes are limited to Card as confirmed.

## Storybook organization follow-up

Component examples now live together in `Core/Components/Card`, with10stories in `ui/card.stories.tsx`. The9composition stories moved from `app/content-card.stories.tsx`; production component code is unchanged. Earlier evidence IDs above describe the audit at that time. Navigation follow-up evidence: `output/storybook-navigation/`, docs/architecture/STORYBOOK-ORGANIZATION.md.
