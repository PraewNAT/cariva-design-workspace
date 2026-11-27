# Active shadcn sizing / 24 November 2026

- Button size default = medium40: padding8 + label16/24 or icon24; sm32 / lg48; outline is an inset ring and takes no extra layout space; no fixed height is forced on medium
- Input default40: text16/24 + padding8; the Lab page's medium48 size uses padding12; Select has the same geometry and does not use the MUI-style fieldset/legend
- Radius follows the existing Product tokens: carivaApp pill / backOffice12, not edited per screen; font no smaller than 12
- Accordion: **outdated** (the old lines about trigger py12 and the 48/50px box) replaced by separate cards with padding 16 per the new Figma of 26 November 2026; see `docs/components/ACCORDION-FIGMA.md`. The "Accordion" section further down in this file is MUI history
- Buttons on pages and in Dialogs use the same Core Button recipe and do not override font/padding/radius in Product CSS; icons use currentColor
- Keyboard/focus and geometry are checked in Core/Components/Button, the Core/Shadcn catalog and Lab stories; for mapping/API differences from MUI see SHADCN-MIGRATION.md

## MUI history before the runtime change (not used as the current implementation)

# Accordion, Button and Input — sizing in actual use

Updated 24 November 2026 from Figma file `e9ypItGZbm2poUZLUQxu66` and the existing code contract; no props added and radius unchanged

## Accordion

References collapsed `4167:190` and expanded `4167:188` at a width of 450px

- Place the vertical padding of 12px top and bottom on the trigger only (a single layer); the outer root has horizontal padding of 12px and bottom 12px only when expanded
- Trigger gap 16px, title 16px / line-height 24px, icon wrapper 38px and chevron 24px
- Collapsed with icon 62px; without an icon and with a single-line title 48px; height is not locked because a long title must be able to grow
- Expanded with an icon and single-line 24px content = 62 + gap 8 + content 24 + bottom 12 = 106px; longer content grows as needed
- Arrow points down when closed and up when open; keyboard Enter/Space toggles open/closed
- Consumers do not add duplicate box padding around the Accordion and do not override trigger geometry per page; a box with a 1px border adds 2px to the outer height per the box model

## Button

References medium standard `3646:27999` / outlined `3646:28269` and the button-icon set `3730:5246`

- Medium is 40px tall from 8px top/bottom padding + 16px label / 24px line-height or a 24px icon; no fixed pixel height is forced on medium
- Standard: horizontal padding 16px, gap 8px; icon-only: 8px padding around a 24px icon gives 40×40px
- Applies to contained/outlined/text/elevated, loading, disabled, decorative and split using existing variants only; no contained neutral is created because it is not in the contract
- Outline is an inside stroke and does not add layout size; the medium code draws it via a pseudo-element so that no 7px padding or locked height is needed to compensate for the border
- `buttonSizing.medium.height=40` is the expected geometry for users who scale and for checking, not a fixed height that medium must use
- Small/large keep the existing 32/48px contract; this work does not change radius, semantic colors or the Product font-family
- Main pages and modals must use the same recipe, and the actual computed dimensions/font/padding are checked

## Input

References the Field of the standard input: medium `3760:6622` height 48px and small `3760:6621` height 40px, not the total height including label/helper

- Small: font 16px / line-height 24px, vertical padding 8px, field 40px
- Medium: font 16px / line-height 24px, vertical padding 12px, field 48px
- Uses the same recipe for CrvInput and CrvInputHorizontal, including focused/filled/disabled/error states and start adornment
- Label/helper are separate from the field and may make the whole component taller than 40/48px; do not cut label/helper to make the whole block match the field numbers
- TextArea is multi-line; do not shrink it to 40px like a single-line input

## Verification

Storybook: Disclosure/CrvAccordion and Experiments/Control sizing, including page/modal consumers in BWC Lab Interpret, have regression geometry, long Thai/mobile and keyboard coverage; audit results are in `reports/control-sizing-audit.md`; this does not mean every spacing/color/font in Figma has been synced

## Dropdown outline and icon color in consumers

Updated after an image with a cropped border was found: when Dropdown hides the MUI legend, `.MuiOutlinedInput-notchedOutline` must be placed at `top: 0` inside the field, not left at the default top -5px together with overflow hidden; check default/focus/error/disabled without changing radius or props

Page CSS metadata should target only that text element; do not use selectors such as `.lab-save-bar span` that recolor the Button's icon wrapper. Icons inside buttons must inherit the same semantic color as the text of that variant; also check the computed color on the svg
