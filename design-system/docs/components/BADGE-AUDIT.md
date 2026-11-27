# Badge verification · 26 November 2026

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-57628). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


Status: implementation per the confirmed list; glow is on hold. There are contrast issues from Figma that are not yet fixed, so accessibility is not considered fully passing. Not committed/pushed and nothing written to Figma.

**Component Reuse & Duplicate Check — Core Badge**
Overall: extended the existing Badge; no duplicate new component in the checked scope
Scope: Badge, stories, CatalogFeedback, Stepper and AvatarBadge to separate the contracts

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Added dot/standard with cva and semantic tokens in the existing Badge; legacy variants and AvatarBadge keep their existing recipe | `badge.tsx:43`, `CatalogFeedback.tsx:45`, `patterns.tsx:108` | No additional component needed |

Summary: 1 pass, 0 need fixes, 0 unverifiable
Next: no further action needed on reuse

**Component Audit — Core Badge**
Overall: 9 story tests pass including regression; native measurements confirm 12 combinations, but there is contrast that needs a source-level decision
Scope: dot/count in all 6 colors, 0/1/12/99+/9999, legacy variants, page/portal, mobile 320px, link focus, Stepper/catalog; HosXP and external apps not certified

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | standard primary 3.50:1, warning 3.19:1, info 4.10:1 are below 4.5:1 per Figma; error 4.83/success 5.48/default 16.30 pass the criterion for this pair | `output/badge/render-measurements.json` | Reported; colors not changed on our own, awaiting a source-level decision |
| Medium | Needs fix | legacy Badge, Stepper and catalog have pre-existing contrast findings | `output/badge/storybook-tests.txt` | Keep the existing limitation; do not expand the color work |
| — | Could not check | Every Product/font mode and automatic Figma pixel parity | Checked only this checkout | Check when scope is added |
| — | Pass | dot 8px, standard 20px/min 20, typography 12/16 Medium 500, padding 4/2px; actual bindings match all 6 colors | Figma read-only, FigmaVariants, render measurements | Keep the agreed values |
| — | Pass | Multi-digit counts expand, are not clipped, 0 is not hidden and 99+ is not truncated by itself; no text rendered inside the dot | CountContent, `badge.tsx:56` | The caller sets the count/label |
| — | Pass | Page/portal geometry and typography match; Dialog returns focus and the link receives keyboard focus | PageAndDialog | No further fixes needed |
| — | Pass | Mobile 320px does not overflow, text ≥12px; legacy variants/Stepper/catalog regression passes | MobileThai, Default, LegacyVariants, Steps | No further fixes needed |
| — | Pass | build/migration, tokens, Storybook build, coverage 39/39, diff check pass; lint has no errors | output logs; Fast Refresh warning from the existing exported badgeVariants | Do not split files outside the scope |

Summary: 5 pass, 2 groups need fixes, 1 unverifiable; passing tests does not mean AA passes everywhere
Next: submit for review together with the contrast that is not yet fixed

## Documentation and limitations

Updated 6 Badge stories and the actual source examples, keeping the Default ID; coverage is 6; the mapping/API/visual recipe and consumers are in `BADGE-FIGMA.md`. No glow prop or badgeContent added. Figma on-canvas docs were not written back or renamed. No Code Connect publication.

The default-color dot (sunken fill on white) has low contrast; using that dot alone to convey status is not sufficient; use text/label or surrounding context as the docs say; it is not claimed that every color of dot passes non-text contrast on every background. Source colors are not changed in this task.

The count uses children and expands in width, so it is not limited to 20×20 when it has multiple digits. Stories use simulated data, with no notification logic or backend. The Figma images are a visual target; no images were pasted into the UI.

Evidence that was visually checked: `shadcn/output/badge/figma-variants.png`, `counts.png`, `mobile.png`, `dialog.png`, `render-measurements.json`, build and test logs.
