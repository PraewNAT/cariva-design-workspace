# Avatar verification · 26 November 2026

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4648-15632). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


Status: done within the single Avatar scope → code, Storybook and Markdown; the existing catalog and Figma docs limitations are noted below. Not committed, pushed, published (web/library) and no Code Connect created.

**Component Reuse & Duplicate Check — Core Avatar**
Overall: the existing implementation was fixed; no duplicates found in the checked scope
Scope: before/after fixing `avatar.tsx`, stories, `CatalogFeedback` and `CoreCatalog`; external application repositories not checked

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Uses the existing Avatar/Base UI and subcomponents; Sample is only a story fixture | `src/lib/app/components/ui/avatar.tsx:1`, `avatar.stories.tsx:25`, `CatalogFeedback.tsx:7` | No new component needed |

Summary: 1 pass, 0 need fixes, 0 unverifiable
Next: no further action needed within the reuse scope

**Component Audit — Core Avatar**
Overall: recipe fixed and the real render checked; Avatar 6 stories pass test/a11y, while the catalog has pre-existing contrast findings outside the scope
Scope: 24 Avatar combinations, broken/missing image, group/count, page/portal, carivaApp mobile 320px; HosXP and external Products are not certified

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | Contrast of Button/Badge/Pagination in the existing catalog: 21 desktop + 20 mobile elements; no Avatar appears in the findings | `output/avatar/storybook-tests.txt` | Fix colors at the source in a separate contrast task; do not override Avatar |
| — | Could not check | HosXP/font assets and consumers in other app repositories | Checked only this checkout; no app destination in scope | Check when that Product's work comes up |
| — | Pass | Sizes 40/32/24/20px, initials ≥12px, icons 24/20/16/12px, badge box 12/dot 8px | `FigmaVariants`, `output/avatar/render-measurements.json` | Keep the confirmed 12px exception |
| — | Pass | Images load fully; a broken/missing image shows the fallback and does not increase the Avatar size | `FigmaVariants`, `ImageFallback` | No further fixes needed |
| — | Pass | Page and portal have the same geometry/font/color; opens with Enter, Escape closes and returns focus | `PageAndDialog`, `MobileThai`; inherited line-height fixed at the root | No further fixes needed |
| — | Pass | Mobile 320px does not overflow (scrollWidth=320), Dialog=288px, long Thai text is readable; group/count are the same size | `GroupSizes`, `MobileThai`, `output/avatar/mobile-dialog.png` | Keep the existing group layout per the scope |
| — | Pass | build, migration check, tokens check, Storybook build, coverage 39/39, per-file lint and story interactions 8/8 | `output/avatar/build.txt`, `storybook-build.txt`, `storybook-tests.txt`; oxlint exit 0 | No need to rerun if code is not changed |

Summary: 5 pass, 1 needs fixes (pre-existing, out of scope), 1 unverifiable; automated Avatar a11y found no violations, which is not a certification of accessibility in every context
Next: submit for Storybook review of the visuals, keeping the catalog contrast as outstanding work at the source

## Documentation check and Figma parity

- Updated `avatar.stories.tsx` to 6 stories, keeping the Default ID, the source example and the size controls; the coverage row is 6.
- Added `AVATAR-FIGMA.md` for the mapping, API, visual recipe, assets, consumers and the confirmed exceptions.
- Single Avatar: compared the design context + screenshot against the browser render for all 24 combinations; measured size/icon/badge and used local assets in the right slots. Initials sm/xs intentionally differ at 12px. There is no automated pixel-diff or automatic Figma parity measurement.
- AvatarGroup: checked for regressions in the existing composition; it still differs from the Figma group overlap/instance widths and has no `max` prop. It is not described as fully synced for the group.
- Figma on-canvas docs and descriptions still contain MUI snippets/10px. The Figma-side fix is pending because this round permits Figma → Code only; nothing was written back or published.
- Kept all working changes from other tasks on branch `praew`.

## Evidence

Evidence in `shadcn/output/avatar/`: `variants.png`, `groups.png`, `mobile.png`, `mobile-dialog.png`, `render-measurements.json`, build logs and the Storybook test log. The browser images are a manual visual comparison; the JSON is computed browser geometry. The screenshots were inspected; they are not Figma images pasted into the UI.
