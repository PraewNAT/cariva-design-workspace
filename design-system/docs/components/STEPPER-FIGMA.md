# Stepper — Figma specification

Read from Figma on 26 November 2026: [Stepper](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4714-4654) (Cariva Core Design System file; section `Stepper / ReUI reference / New`). The user confirmed the names as proposed by Claude. The `Documentation Card` frame (node `7223:103363`) was created on this page.

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | prop | instances (before → after) |
|---|---|---|---|
| `stepper` | `crv-stepper-new` | `orientation` horizontal / vertical, `labels`, `loading` | 0 → 0 |
| `step` | `crv-step` | `orientation`, `state` inactive / active / complete / loading / disabled, `title`, `description`, `showDescription`, `showLabel` | 24 → 24 |
| `step-indicator` | `crv-step-indicator` | `state` (the same five values), `number` | 34 → 34 |
| `step-check-icon` | `Stepper / Check icon` | — | — |
| `step-loading-icon` | `Stepper / Loading icon` | — | — |

The `orientation` and `state` values were changed to lowercase

## Spec

- Indicator: circle 24, number 14/20 Regular · inactive fill `on-surface/action/selected`, text `content/primary` · active fill `brand/primary/on-surface/default`, text `brand/primary/content/on-fill` · complete fill `status/success/on-surface/default` with a 16 check mark · loading same fill as active with a 16 spinning icon · disabled text `content/disabled`
- step: gap 8, title 14/20 `content/primary`, description 14/20 `content/secondary` · horizontal: indicator above the text · vertical: indicator on the left
- stepper horizontal: each cell 120, gap 80, connector 168×2 (4 away from the indicator on both sides) · vertical: each row 88, connector 56×2, 4 away from the indicator
- connectors past completed steps are `status/success/on-surface/default`, the rest `border/default`

## Figma name ↔ Code

| Figma | Code |
|---|---|
| `stepper` | `Stepper` (`ui/stepper.tsx`; `steps[{title, description, disabled}]`, `value` starting from 0, `orientation`, `labels`, `loading`) |
| `step` | `Step` (`title`, `description`, `state`, `orientation`, `showLabel`) |
| `step-indicator` | `StepIndicator` (`state`, `number`) |
| `step-check-icon` / `step-loading-icon` | `StepCheckIcon` / `StepLoadingIcon` (path copied from Figma) |
| `state` of each step | computed in `Stepper` from `value` (previous = complete, current = active or loading) unless `disabled` is set |
| `loading` of the `stepper` set | prop `loading` (the current step shows the spinner) |

The original `Stepper` in `app/patterns.tsx` (a Badge + Progress example on the Catalog page) was switched to use the new `Stepper`. It still exports the original name and keeps the `ย้อนกลับ` (Back) / `ถัดไป` (Next) buttons as before, adding the `แนวตั้ง` (Vertical) and `กำลังโหลด` (Loading) buttons, but no longer has a Progress bar.

## Code (26 Nov 2026)

Storybook `Core/Components/Stepper` has these stories: `Steps` (interactive example on the Catalog page with `แนวตั้ง` (Vertical) and `กำลังโหลด` (Loading) buttons), `Horizontal`, `Vertical`, `Loading` (both orientations), `States` (indicators in all five states), `WithDisabledStep`, `NoLabels`

| Topic | Status |
|---|---|
| Indicator 24 round, active color `#1789FA`, complete `#047857`, inactive `#EEF9FF` | matches (measured in story `Horizontal`) |
| Each cell 120, gap 80, connector 168×2, connector color follows completed steps | matches (measured) |
| vertical: row 88, line 2×56 | matches (measured in story `Vertical`) |
| `labels=false` height 24 | matches (measured) |
| Horizontal connector position when labels are present, disabled text color, spinner | set per Figma, **Not measured** |

**Decided by Claude:** the spinner during loading rotates with CSS and stops when the user has reduced motion set · the API is `steps[]` + `value` instead of composing `Step` yourself (`Step` and `StepIndicator` are still exported if you want to compose them yourself)

**Impact:** the `Stepper` on the Catalog page changes appearance (no longer Badge + Progress); anyone who used `Stepper` from `patterns` still gets an example with built-in control buttons, as before

**Not yet checked:** interaction (Figma has no hover / focus; steps are not clickable), line wrapping when the title is long on mobile
