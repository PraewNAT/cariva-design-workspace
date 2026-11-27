# Date/Time audit — awaiting decisions

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7228-128). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


26 November 2026 · Core · branch `praew` · checkpoint `output/date-time/baseline/` · not committed/published

**Reuse & Duplicate Check — Core Date/Time**
Overall: reuses the existing Calendar/Popover/Field/Button and Input recipe, adds reusable DatePicker/TimePicker without creating a duplicate date engine
Scope: source, docs-list/docs-show, Calendar consumers including the appointment example and the catalog; no dependency added

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Calendar keeps the React DayPicker engine; DatePicker is composed from Popover+Calendar per shadcn; TimePicker uses the existing Button/Field | date-time-pickers.tsx, calendar.tsx | No additional package installed |
| — | Pass | The existing DateTimePicker is composed from the two new components; Core has no API/routing/age rules | patterns.tsx, DATE-TIME-FIGMA.md | Check consumers in the final round |

Summary: pass 2, needs fix 0, could not check 0 in the reuse scope
Next: wait for decisions from the component audit

**Component Audit — Core Date/Time**
Overall: core functionality done; interaction passes 19/20 but there are still defects/open items waiting for permission before they are fixed
Scope: Chromium page/Dialog, mobile 320px, native keyboard, Figma context, controlled/uncontrolled, Calendar/appointment/catalog; handoff or full AA not yet certified

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| High | Needs fix | CalendarDayButton creates a ref but does not pass it to the Button; native keyboard starts at the navigation button instead of the date | baseline/calendar.tsx; native-audit.json calendarActiveElement | Waiting for permission to wire up the ref |
| Medium | Needs fix | The accessible name of the trigger does not include the value/placeholder; day 1 shows 1 but the name is 01/09/2024 | Storybook label-content-name-mismatch | Waiting for permission to add the visible text to the name |
| Medium | Needs fix | The Time Default test checks focus before the popup is removed from the DOM; some closing stories have a transient focus-guard | tests 19/20; native focusAfterClose=true | Waiting for permission to make the tests wait until the DOM is actually closed |
| Medium | Needs fix | Popover rounded-2xl computes to 32px instead of Figma's 16; hour 08 is at the end of the viewport; the divider makes the columns slightly unequal | time-popup.png, native-audit.json | Waiting for permission to fix Date/Time only |
| Medium | Needs fix | The primary selected colour and the clickable outside-month days still have low contrast; error/shared controls have existing open items | Storybook color-contrast | Waiting for a decision to keep the colour / record it |
| — | Could not check | Every Product/font mode and complete pixel parity | source/render for this scope only | Do not claim everything passes |
| — | Pass | Single/Range/Birth constraints, draft/OK/Now 09:37→09:30/Clear/Escape, disabled options, format DD/MM/YYYY | stories 19 pass; native 23:15; source | No additional business rules created |
| — | Pass | Trigger 40px text 16/24 icon 20, UI text ≥12; native 320px does not overflow; build/migration/tokens/Storybook build/coverage 40/40 pass | output/date-time logs/native-audit.json | Check again in the final round after the fix |

Summary: pass 2, needs fix 5 groups, could not check 1 group; work not yet closed
Next: get confirmation only for the items reported, then fix and run focused regression before handoff

## Parity scope

In the Figma specimen the dates in the field and in some calendar months do not match; the code uses the same real Date, as the user confirmed. The inset-ring popup recipe has an outer size 2px smaller than the physical-border specimen (Time 293 vs 295, Date 324 vs 326), keeping the spacing/content and not adding padding outside the scale to force the height. Complete pixel parity is not claimed. The original SVGs were not edited in paths/viewBox; the root 24 arrow uses a wrapper scale so that it shows as 16px per Figma.

There are 3 Calendar stories, 6 DatePicker, 8 TimePicker and 1 DateTimePicker; every example is in its own Core/Components group. Figma was not edited and Code Connect was not published. The unit tests in Storybook and the native keyboard check are browser checks, not certification for every assistive technology.
