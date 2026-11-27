**Component Audit — Core / Tabs**
Overall: Standard/Pills/Folder all added and docs updated; interaction passes, contrast issues remain
Scope: Tabs recipes, 10 dedicated stories, CatalogNavigation and 5 Core catalog stories; browser desktop/320px and Dialog. Not an accessibility certification for every Product

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | Primary blue/white 3.5:1 is below 4.5:1; includes selected labels/counts | output/tabs/tests.txt; Figma Callout | Decide the color at the source; the central token is not changed in this work |
| Medium | Needs fix | Catalog still has contrast and label-content-name-mismatch issues in other controls | tests.txt, catalog sections | Fix separately in the owning component; do not claim catalog a11y passes |
| — | Pass | Standard 48/32, Pills 36/48, Folder 56; minimum text 12; original SVG icons | Browser computed styles, tabs.css | Use the central recipes |
| — | Pass | Real keyboard: disabled is focusable but Enter does not select; on the next tab Enter opens the panel; Dialog Escape restores focus | Browser native keyboard + KeyboardAndDisabled / PageAndDialog | Keep the Base UI contract |
| — | Pass | Page/Dialog use matching padding/radius/font/height; at 320px page width320 and Folder scrolls internally | Browser computed geometry; MobileThai | Keep the wrapper |
| — | Pass | 15/15 interaction stories, build/token/coverage pass; lint has one existing cva export warning | output/tabs/; 43/43 story-file coverage | Not counted as full-state coverage |
| — | Pass | Markdown, Storybook and Figma template docs complete with 27 linked specimens; own text≥20 does not overflow horizontally | figma-verification.json; mapped4838:64978 | Reuse the existing node next time |

Summary: 5 pass, 2 groups need fixes; no runtime test failures in the scope that was run
Next: decide the contrast at the source before claiming normal-text AA

**Reuse & Duplicate Check — Core / Tabs**
Overall: extends the existing Tabs; no duplicate primitive or Badge created
Scope: searched source consumers and checked after the change; existing Base UI Tabs + Badge

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | All three families live in a single tabs.tsx / Core/Components/Tabs; CatalogNavigation reuses the existing export | src/lib/app/components/ui/tabs.tsx; CatalogNavigation.tsx | No further action needed |

Summary: 1 pass, 0 need fixes, 0 unverifiable
Next: no further action needed

### Motion follow-up - 2026-11-26

Pointer selection: computed indicator transition 0.2s and transform follows the selected item; real keyboard Right/Enter: computed transition 0s and correct active item. Uses existing Base UI Indicator. Reduced-motion media override disables all transitions; actual OS preference was not toggled in this audit. 15 focused interaction stories and build passed; existing contrast findings remain. Evidence: output/tabs/motion-tests.txt and motion-build.txt.

Motion correction: hover surface previously covered Standard underline. Raised indicator above tab surface; real pointer click now preserves visible2px underline, transition0.35s. Slowed Standard/Pills to350ms and Folder to320ms per user feedback. Keyboard/reduced-motion remain immediate.
