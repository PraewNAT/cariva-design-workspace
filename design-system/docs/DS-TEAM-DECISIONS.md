# Decisions waiting on the DS team

Updated 27 November 2026. Nothing here has been changed on the code side; per the colour rule, new colours or tokens are decided by the DS team first. When a decision is made, change Figma first, then follow the variable change flow (`rules/figma-variable-change-flow.md`) and record it in `CHANGELOG.md`.

## 1. White text on the primary colour is below 4.5:1

- **Where:** `color/brand/primary/on-surface/default` = `#1789FA` (alias `color/dodger-blue/600`) with white text, for example the primary Button.
- **Measured:** contrast 3.5:1 (computed from the two hex values with the WCAG 2.x formula). WCAG AA asks 4.5:1 for normal text and 3:1 for large text and UI components.
- **Evidence:** `docs/components/BUTTON-MOTION-AUDIT.md`.
- **Decision needed:** keep it as an accepted limitation, or change the primary colour or the text colour on it.

## 2. Scrollbar colours have no semantic token

- **Where:** Figma binds the scrollbar thumb to `slate/500` (`#64748B`) and the track to `slate/100` (`#F1F5F9`) directly (Foundation variables).
- **Code today:** semantic tokens with equal values (`--cds-content-placeholder`, `--cds-on-surface-sunken`), which carry a different meaning.
- **Evidence:** `docs/components/SCROLLBAR-FIGMA.md`.
- **Decision needed:** create scrollbar thumb and track tokens (names to be chosen by the DS team), or confirm that the current semantic tokens are the intended ones.

## 3. The Mira library still has a "back office" mode

- **Where:** MIRA Component Library (`37MSJL69dK206ouPp4F1xW`), Product Style font modes `cariva app` and `back office`, as read on 27 November 2026 (`docs/products/mock-mira/FIGMA-SOURCE-2026-11-27.json`).
- **Code today:** the back office theme was removed from code on 27 November 2026 because the user confirmed that it does not exist.
- **Decision needed:** remove or rename the mode in Figma. After that, update `docs/products/mock-mira/DESIGN.md` and the HosXP / Mira font note in `DESIGN.md`.
