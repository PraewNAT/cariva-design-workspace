# Toast — Figma specification

Read from Figma on 26 November 2026: [Toast](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4165-68) (Cariva Core Design System file). The user confirmed the names as proposed by Claude. This page already has a `Doc — crv-toast-standard` frame; old prop names and text were fixed (originals backed up in `docText_2026-11-26`)

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26`)

| New name | Original name | prop |
|---|---|---|
| `toast` | `crv-toast-standard` | `severity` error / warning / info / success / notification (lowercase), `variant` filled / outlined / standard, `showTitle`, `showDescription`, `showAction`, `showClose` (previously `Title?`, `Description?`, `Action?`, `On Close?`), `title`, `description`, `action` (previously `↳ Title`, `↳ Description`, `↳Instance`) |

Instance counts are the same before and after (25). The `crv-button-icon` sub-set used as the close button has not been renamed (it is on the Button page)

## Spec (15 variants)

- width 320, corner radius 12, padding 4/16 · icon 24 (36×40 frame, padding 8/12/8/0) · text padding 8/0, gap 4: title 16/24 Medium, description 14/20 Medium · action button (ghost, sm, 32) and close button (ghost icon 32) 16 from the left, 4 from the top
- filled: fill `status/{severity}/on-surface/default`, text and icon `status/{severity}/content/on-fill`, buttons `content/inverse` · Outline icon set
- outlined: white fill, 1px border `status/{severity}/border/strong`, icon `status/{severity}/content/default`, title `content/primary`, description `content/secondary`, close button `content/secondary` · Outline icon set
- standard: fill `status/{severity}/on-surface/subtle`, 1px border `status/{severity}/border/default`, shadow `shadow/status/{severity}` · Rounded icon set
- notification uses neutral colors instead of status: icon and close button `brand/primary/on-surface/default` · filled = white fill + `shadow/md` · outlined border `neutral/border/strong` · standard fill `neutral/on-surface/subtle`, border `neutral/border/default`, shadow `shadow/status/notification`
- icons per severity: error `error-outline` / `error` · warning `report-problem` / `warning` · info `info` · success `check-circle-outline` / `check-circle` · notification `info`

**Fixed docs that were wrong against Figma:** the old doc said the standard border is 2px; the real Figma is 1px

## Figma name ↔ Code

| Figma | Code |
|---|---|
| `severity` | `type` of `toast.add({ type })` (`error`, `warning`, `info`, `success`, `notification`); omitted = `notification` |
| `variant` | `data: { variant }` (`filled`, `outlined`, `standard`); omitted = `standard` |
| `title`, `description` | `title`, `description` of `toast.add` |
| `showAction`, `action` | `actionProps: { children, onClick }` (omitted = no button) |
| `showClose` | a real toast always has a close button · `ToastCard` can set `showClose={false}` |
| `showTitle`, `showDescription` | omitted = not shown |
| Static card for docs and examples | `ToastCard` (`ui/toast.tsx`) |

## Code (26 Nov 2026)

Source `src/lib/app/components/ui/toast.tsx`; icons are copied from Figma into `app/toast-icons.tsx`; the stacking, swipe and timer systems are still the original Base UI toast's; stories under `Core/Components/Toast`: `Default`, `AllVariants` (15 variants), `OptionalParts`, `LiveSeverityAndVariant`

| Topic | Status |
|---|---|
| Width 320, height 72, corner radius 12, title 16/24/500, description 14/20 | matches (measured) |
| filled error / success colors, white text, white button | matches (measured) |
| outlined: white fill, error and notification borders | matches (measured) |
| standard: light fill, status shadow, notification neutral fill | matches (measured) |
| filled notification white fill + md shadow | matches (measured) |
| a real toast via the toast manager accepts severity and variant | passes (story `LiveSeverityAndVariant`) |
| warning / info colors in all 3 variants, each icon compared against Figma one by one, button hover | set per token, **Not measured** |

**Impact:** the toast used everywhere (Catalog page) changes appearance: width 320 (previously 384), corner radius 12 (previously 24), no popover fill/shadcn shadow, a toast without `type` becomes a standard notification (light gray fill, blue icon), and the close button changes to the icon from Figma

**Removed things Figma does not have:** the loading icon and the original hugeicons icons (`type: "loading"` has no design; a loading state needs a design first). The original action button was outline and changes to ghost per Figma

**Not yet checked:** text longer than 3 lines (the doc says it should not be), stacking multiple toasts, shadcn Code Connect (not done yet)
