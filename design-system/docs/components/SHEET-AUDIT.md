# Bottom Sheet audit · 26 November 2026

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-45214). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


**Reuse & Duplicate Check — Core Bottom Sheet**
Overall: reuses the existing Sheet, adding a body part and Header options without creating a duplicate Drawer
Scope: before/after the change; source, docs-list/docs-show, Sheet, Input/Field, Button, RadioGroup, catalog and Sidebar

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Uses the existing Base UI Sheet with the real Input/Field/Button/RadioGroup; no duplicate implementation found in scope | `sheet.tsx`, `sheet.stories.tsx`, `CatalogNavigation.tsx` | No further component merging needed |
| — | Pass | Shared Core changes the recipe for bottom only; Header options have no effect on other sides; SheetBody is an additive API | `SheetSideContext`, OtherSides, MobileSidebarRegression | Keep this scope |

Summary: 2 pass, 0 need fixes, 0 unverifiable within the audited scope
Next: review the quality checks and open items below

**Component Audit — Core Bottom Sheet**
Overall: the approved fixes are all done and the tests ran across 9 stories; contrast issues remain open and the software keyboard has not been checked on a real device
Scope: Chromium desktop/mobile viewport 320/375/1280px, portal, native browser keyboard, catalog, top/right/left and mobile Sidebar; not a certification of every Product/theme or of full AA

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | Existing contrast: Button primary 3.50:1, Sidebar active 4.38:1, catalog destructive 4.13:1, all below 4.5:1 | [test log](</Users/natthaphorna/Cariva DS/output/sheet/storybook-tests.txt>) | The user asked to log it as open; colors are not changed in this round |
| — | Could not check | Software keyboard/visual viewport on real iOS/Android devices, and other Product/font modes | Tested only with a browser keyboard and viewport | Check on a device before certifying the mobile keyboard |
| — | Pass | Header 72/152px, title UI 20/28 weight600, input48, corner radius 24; gradient fills the Header; close32/icon16 | [consumer geometry](</Users/natthaphorna/Cariva DS/output/sheet/consumer-geometry.json>), [native measurements](</Users/natthaphorna/Cariva DS/output/sheet/native-keyboard.json>) | No further fix needed |
| — | Pass | Search/filter/empty/selection/confirm; Tab/Space, focus trap, Escape and focus restore | BottomDefault, BottomSearch; native-keyboard.json | Keep the native input; no simulated GBoard |
| — | Pass | Long Thai text/24 options; text≥12px, no horizontal overflow at 320px, body scrolls and footer stays within a 480px viewport | [mobile screenshot](</Users/natthaphorna/Cariva DS/output/sheet/mobile-thai.png>), native-keyboard.json | No further fix needed |
| — | Pass | Top/right/left keep the existing recipe; mobile Sidebar open–close/focus restore; catalog integration passes | OtherSides, MobileSidebarRegression, consumer-geometry.json | The existing 6px spacing on the other sides is out of scope and not changed |
| — | Pass | Stories/docs/code are consistent; build/migration, tokens, Storybook build, coverage39/39, focused lint pass | output/sheet logs; `SHEET-FIGMA.md`, coverage sheet7 | No publish/release |

Summary: 5 pass, 1 group needs fixes, 1 group unverifiable; interaction tests passing 9/9 does not equal full accessibility conformance
Next: certify the mobile keyboard on real devices, and split the contrast work out per the upstream decision

## Documentation and parity scope

Updated 7 Sheet stories, keeping the Default ID, coverage, DESIGN.md and changelog as Draft. Cites the actual Figma node, Header 72/152px, as the user confirmed; the previous Figma on-canvas docs (76/136px) were not written back in the Figma → Code work. The library was not published, and the Figma docs are not claimed to be synchronized.

The Header grows taller when the title wraps to multiple lines; body/footer heights follow their content, with no fixed keyboard height and no simulated GBoard. The Input is fluid, 327px wide on a 375px screen. The options and button conditions in the stories are fixtures, not Product business logic. This audit is not automated pixel parity.
