# Date / Time — Figma → Code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7228-128). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


Draft · 26 November 2026 · Core · working tree on branch `praew`; not committed/published

Design source: [Date/Time](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4294-5594). Direction Figma → Code; not written back to Figma.

| Figma | Code / Storybook |
|---|---|
| Date Picker 7204:61101 | `DatePicker` in `app/date-time-pickers.tsx`; Core/Components/Date & Time/Date Picker |
| crv-calendar 7204:61134 | the existing `Calendar` in `ui/calendar.tsx`; Core/Components/Calendar |
| crv-calendar-day 7204:61116 | the existing `CalendarDayButton`; no new date engine created |
| crv-time-picker 7204:61359 | `TimePicker`; Core/Components/Date & Time/Time Picker |
| time-popup 7204:61352 (previously crv-time-popup), time-column 7204:61334, time-option 7204:61376, time-actions 7204:61348 (previously crv-time-actions) | inside TimePicker; the existing Button/Popover/Field and shared Input recipe |
| existing appointment example | `DateTimePicker` in `patterns.tsx`; Core/Components/Date & Time/Date Time Picker |

## Behaviour the user confirmed

DatePicker single closes after a day is chosen; range keeps the date range from React DayPicker and closes when the range is complete; birth is a single that does not allow choosing the future, with no minimum/maximum age set. Every date shown on the trigger and in the appointment example uses `DD/MM/YYYY` (the year of the real Date) and is not automatically converted to the Buddhist Era (B.E.). The date in the field and the calendar are not given different values as in the Figma specimen, which is inconsistent.

TimePicker uses 24 hours, hours 00–23, minute steps 00/15/30/45. Choosing the hour/minute edits the draft value; OK confirms and closes, Escape/click outside closes without changing the saved value, Clear sends null and closes. Now reads the browser clock at the moment of pressing, rounds down to the 15-minute step, e.g. 09:37→09:30, and OK still has to be pressed. There is no realtime interval, timezone conversion, API or business rules in Core.

The existing DateTimePicker is composed from these two components instead of a native time input. The default time 09:00 stays as before; it shows the date and time status from the real confirmed values.

## Actual API

DatePicker accepts `mode` single (default)/range/birth, `value`/`defaultValue`, `onValueChange`, `defaultMonth`, `minDate`, `maxDate`, `disabledDates`. Single/birth use Date|undefined; range uses DateRange|undefined and a callback of the same type. Birth uses the current date as the upper bound and allows a stricter maxDate. The min/max rules must be passed in from the Product and are not inferred from the appointment context.

TimePicker accepts `value`/`defaultValue` string|null, `onValueChange`, `placeholder`, `disabledHours: number[]`, `disabledMinutes: number[]`, `getNow?:()=>Date` (default is the browser clock; stories inject a fixed clock for testing). The supported value format is `HH:mm` with minutes of 00/15/30/45; a malformed external value gets aria-invalid and opens with an empty draft value, without silently changing the caller's data. Disabled hours/minutes cannot be selected with the keyboard; OK/Now are disabled when the value to be applied is not allowed.

Both accept `id`, `label`, `ariaLabel`, `description`, `error`, `disabled`, `className`. label/description/error use the existing Field. The trigger is a button that uses the shared Input visual recipe, not a field to type a date/time into; there is no free-text parsing. When `value` is passed it is treated as controlled, including value=undefined/null; otherwise it uses internal state from defaultValue. The component does not write the caller's value on its own outside onValueChange.

```tsx
const [date, setDate] = useState<Date>();
const [time, setTime] = useState<string | null>(null);
<DatePicker label="วันที่" value={date} onValueChange={setDate} />
<DatePicker mode="birth" label="วันเกิด" />
<TimePicker label="เวลา" value={time} onValueChange={setTime} />
```

## Visual recipes

The trigger has a reference width of 320px/max-width 100%, height 40px, text 16/24 Regular, icon 20px, Input radius per theme, padding 8/16. Labels 12/16, error/helper 12/16 and active UI text no smaller than 12px.

Calendar uses the installed React DayPicker 10.0.2; it keeps the existing mode/selection engine/component overrides. The content grid is adjusted to 296px within an outer 320px (padding 12), header/nav 32px, the arrow is shown at 16px via a scale wrapper around the original 24px asset, weekday 14/20, day rows 40px gap 8, day button 32px text 12/16 Medium. Range uses the brand subtle fill to connect the range and primary circles at the ends; outside/disabled use content/disabled without reducing the opacity of the whole block. A 6-week month grows in height with the number of rows and the 5-row height is not locked. The Calendar root can shrink to the available space on mobile.

The Time popup is 192px wide; the Hour/Minute listboxes are separate, with an hour viewport of 5 rows, scrollable through 00–23; options 32px/gap 8, label 14/20, options 12/16 Medium, footer uses Button sm. It uses the Popover Portal and the shared control recipes. The popup referenced in Figma has a physical border; the current recipe uses an inset ring so the total height is 293px instead of the specimen's 295px, without adding padding outside the spacing scale to force the height. The Date popup is 324px for a 5-row month versus Figma's 326px for the same reason; pixel parity is not yet considered to pass in full.

SVGs from Figma are in `ui/assets/calendar/` and `app/assets/date-time/`; the original SVG/viewBox/root size is kept, with no temporary URLs at runtime. The Birth and default images use separate asset files per node; clock 20px. No package was added and shadcn add was not run.

## Open items during the audit

Waiting for confirmation before further fixes: calendar ref/keyboard, accessible name including the visible label, tests waiting for the popup to close, popup radius 16px, the selected hour in the middle of the viewport and equal-width columns. Waiting for a decision about keeping the contrast as in Figma. Detailed results are in DATE-TIME-AUDIT.md when the final audit round is done.

The composition is referenced from [shadcn Date Picker](https://ui.shadcn.com/docs/components/base/date-picker) (Calendar + Popover), using the real source in the repo, without copying another stack or upgrading dependencies.

## Renaming sets in Figma (26 Nov 2026, the user confirmed as proposed)

| New name | Original name | Changed prop | instances |
|---|---|---|---|
| `date-picker` | `Date Picker` | `State` → `state`: default / `focussed` → `open` / `Date Range` → `range` / `Birth` → `birth` | 4 → 4 |
| `calendar` | `crv-calendar` | `Selection` → `mode`: single / range / birth | 8 → 8 |
| `calendar-day` | `crv-calendar-day` | `State` → `state` in lower case (`range-start`, `range-end`) | 385 → 385 |
| `time-picker` | `crv-time-picker` | — | 6 → 6 |
| `time-column` | `crv-time-column` | — | 10 → 10 |
| `time-option` | `crv-time-option` | — | 0 → 0 |

`mode` values in code: `DatePicker` `single` / `range` / `birth`; `Calendar` `single` / `range`
