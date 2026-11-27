# Foundation documentation destinations

User decided 27 November 2026: when colors or fonts are updated, check and update the related Figma documentation below so it matches the values actually agreed on. Adjusting only tokens/code does not count as having completed the documentation.

| Change | Document to update |
|---|---|
| Color / palette / semantic color / alias / mode | [Color documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3791-2) — node 3791:2 |
| Fonts / font family / typography roles and related values | [Typography documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3814-1454) — node 3814:1454 |

Use the most recently confirmed variables/modes and specification as the reference. Update the existing documents at the mapped locations, do not create duplicate pages, and do not change tokens to match old documents. If code and Figma differ, state which side is not yet synced, and do not claim the documentation shows values that code already supports without evidence.

If a destination cannot be accessed or the edit does not succeed, report which part of the documentation is still pending, with the reason, before finishing, and do not claim it was updated. This request is to record both destinations and update the color documentation this round; it is not a request to change fonts or the palette.

## Color documentation update — 2026-11-27

Updated node 3791:2 in place from the current Semantic collection's Light Theme. Verified 199 semantic color variables: 109 non-accent table rows, with semantic-bound swatches and resolved hex/reference labels, plus the 90 accent aliases summarized as A01=50, A02=100, A03=300, A04=500, A05=700, A06=900.

Corrected the stale content/secondary, border/default/strong/disabled and success/warning border/default labels. Added missing selected-strong/sunken-strong, Neutral, Decorative Gradient, Active, status borders and on-fill entries. Replaced obsolete claims about Dark Theme availability, prohibited status borders and old accent shades. Pairing guidance now references the actual on-fill variables and explicitly requires contrast verification; no blanket accessibility pass is claimed.

Preserved the existing document's section/cell styling, fixed overlapping header/background-table rows, widened the value column and adjusted four 11px labels to the required 12px minimum. Final structural check: 20 visible sections, no section overlaps, minimum text size 12px. Content and Neutral sections were visually reviewed using Figma screenshots. Checked all 109 table values and semantic swatch bindings with no mismatches before the final resolved-fallback swatch correction; the correction retained those bindings and final screenshots showed the proper colors. No palette variables, font definitions, application code or generated tokens were changed. Typography destination was recorded only, not edited.

Before-text checkpoint: output/color-doc-before-2026-11-27.json. This snapshot is a recovery reference, not a complete Figma file backup. No code parity or full contrast audit was performed for this documentation-only update.
