# Coverage audit — 26 November 2026

Went through every Figma page done so far, comparing the sets and variants in Figma → the API in code → the story that can be opened → the doc frame in Figma

## Result per page

| Page | Doc frame in Figma | Stories / API complete for every variant | What was fixed this round |
|---|---|---|---|
| Button | Yes (Template) | Not complete: done for `button` (4 variant × 3 color × 4 state × 3 size) | Fixed prop names and tokens in the doc, standard `button` section |
| Breadcrumb | Yes | Complete (the dropdown is an illustrative example, the menu does not really open yet) | — |
| Tooltip | Yes (Core 4716:60403, Mira 7292:35) | Complete: tooltip 5 → `Placements` + `WithoutArrow`, tooltip-with-action 8 → `ActionPlacements`, credit-tooltip 9 → `StatusesAndPlacements`; measured in `FigmaSpecs` | Renamed the sets, bound tokens per Figma, guide button icon, Mira reverted to 10px / gap 2 |
| Button (separate sets icon / loading / link / decorative) | Yes (Button Doc) | Complete: icon 108 → `IconButtons`, loading 9 → `LoadingButtons`, link 12 → `LinkButtons`, decorative 12 → `DecorativeButtons` (hover / pressed are CSS, partly checked with a real mouse) | Renamed the sets, fixed the code for link / decorative / icon-sm / neutral, added measurement stories |
| Divider (separator) | Yes (Documentation Card) | Complete: horizontal / vertical → `Default`, `Orientations` | Merged the 2 parts into the set `separator`, bound the colour `border/default`, added stories |
| Browser Scroll (scrollbar) | Yes (Documentation Card) | Complete: 8 variants (vertical / horizontal × end × track) → `Scrollbars` (`end` is not a prop) | Fixed the orientation values, `bg` → `track`, fixed `ScrollBar` to match Figma |
| Keyboard | Yes (Documentation Card) | Not a component (reference to G-Board), no code | Wrote a doc stating that it is a reference image |
| Button Split / Button Mic | Yes (split / mic sections in Button Doc) | Complete: split 24 variants → `ColorsAndSizes` + `FigmaSpecs`; mic 12 variants → `VariantsAndStatus` + `FigmaSpecs` (hover / pressed are CSS) | Created new + renamed the sets + linked Code Connect |
| Card | Yes (Code contract & audit) | stories complete for every set | — |
| Checkbox | Yes | Complete (field, group, card) | Fixed `color=error` → `error=true`, `MUI mapping` → `Code mapping` in the doc |
| Chip | Yes | Complete | Fixed `size: small/medium` → `sm/default`, removed the word MUI in the doc |
| Drawer (Sheet) | Yes | Complete, all 4 sides | — |
| Dropdown (Select) | Yes | Complete | Fixed `size` in the doc |
| Input Field | Yes | `input-horizontal` added (see below) | Fixed `size` and radius in the doc |
| Input OTP | Yes | Complete | — |
| Menu | Yes | Added a scrollable story (`scrollable`) | Fixed the name `crv-dropdown` → `select` in the doc |
| Overlay | Yes | Complete (no variants) | — |
| Dialog (Modal) | Yes | Added stories for `align=center` and no icon | — |
| Pagination | Yes (created in the previous round) | Complete, all 4 Cases | — |
| Sidebar | Yes | Complete, including the assembled set | — |
| Sortable | Yes | Complete | The doc frame was inside a section and overflowed its edge; moved out to page level |
| Stepper | Yes | Complete for every state and vertical | — |
| Switch | Yes | Complete | — |
| Table | Yes (Table Doc, prop names fixed) | Complete: sm / default, striped, hover, disabled, sorting, compact, text cell, scroll shadow, composed example | — |
| Tag | Yes (numbers/names fixed to match Figma) | Complete: filled/outlined, 5 colours, 3 sizes, count, icon, tag-color 8 colours | — |
| Toast | Yes (prop names fixed) | Complete, 15 variants (`AllVariants`) + a toggleable part + a real toast | — |
| Toggle Group (including joined) | Newly created | Complete: appearance 3 variants, horizontal/vertical, segmented, language-switcher | The original sets `crv-toggle-button`/`crv-toggle-group` are not done yet |
| Combobox (Autocomplete) | Yes (Code contract & audit) | Complete | — |

## Added this round

- `Field orientation="labelStart"` = Figma `input-horizontal` (label 80 wide on the left, gap 16); story `Horizontal` measured: label 80, field 320 wide and 40 and 48 high
- New stories: `FigmaDialogCenter`, `FigmaDialogNoIcon`, `FigmaMenuScrollable`

## Remaining gaps (not done)

- **Button**: all Button sets are now renamed, built in code and connected via Code Connect (`button-icon`, `button-loading`, `button-link`, `button-decorative`, `button-split`, `button-mic`; see BUTTON-SETS-FIGMA.md, BUTTON-SPLIT-FIGMA.md, BUTTON-MIC-FIGMA.md); updated 27 November 2026. Still unmeasured: hover/pressed states of the icon buttons.
- `input-horizontal` still has no horizontal `InputGroup` with a leading icon (the Figma example has a search icon); `InputGroup` can be put inside `Field orientation="labelStart"` but there is no story yet
- The "Not measured" lists in each `*-FIGMA.md` file (hover / pressed / focus colours at many points) are unchanged
- Code example text in the Button and Input Field docs that refers to MUI (`MUI mapping` on some pages) may remain; only the main keywords used in place of prop names were checked

## How it was checked

Figma: read the sets and variants on every page via script, then scanned the text in the doc frames for old terms (`crv-`, `MUI`, `medium`, `small`, `contained`, `type=`, `color=`) · Code: went through the story names of each component and opened the suspect story files; did not render every variant one by one
