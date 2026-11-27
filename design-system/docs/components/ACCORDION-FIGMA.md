# Accordion — Figma specification

Read from Figma on 26 November 2026: [Accordion](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4166-93) (the Accordion page of the Cariva Core Design System file). Scope: the `accordion-item` component set (previously named `crv-accordion-standard`), 2 variants (`expanded` = false / true). The set and the `Frame 1` layer have been renamed to `AccordionIcon` (all 5 instances are still linked). The original names are backed up in plugin data (`oldName_2026-11-26`, `oldLayerNames_2026-11-26`)

## Anatomy

One item is one card: padding 16, gap 16, 1px border (`border/default`), corner radius `radius/12`, fill `on-surface/elevated`

- **AccordionTrigger** (row, gap 16): 40×40 icon box (`AccordionIcon`, fill `on-surface/subtle`, corner radius 12, 20px icon in `content/secondary`) + `Title` (16/24 SemiBold `content/primary`) + flexible spacer + 20px arrow (`content/secondary`); the arrow points up when open
- **Content** (when `expanded=true`): indented 56px (40 icon box + 16 gap), text 14/20 Regular `content/secondary`
- The example in Figma places 3 cards 16px apart

## Properties in Figma

| property | type | notes |
|---|---|---|
| `expanded` | variant false / true | Figma only; in code it is controlled by the `value` of Accordion (Base UI) |
| `showIcon` | boolean (true) | Figma only; code shows the icon box when the `icon` prop is passed |
| `icon` | instance swap | matches the `icon` prop of `AccordionTrigger` |
| `title` | text | content (children) of `AccordionTrigger` |
| `content` | text | content (children) of `AccordionContent` |
| `showBadge` | boolean (true) | **There is no badge in the design and the docs do not mention one**; probably a leftover, not yet removed, awaiting the user's decision |

There are no variants for hover, focus or disabled in Figma, so none are defined in this document

## Code

Source: `src/lib/app/components/ui/accordion.tsx`, consisting of `Accordion` (row of cards, gap 16) → `AccordionItem` (card) → `AccordionTrigger` (`icon` is optional) + `AccordionContent` (indented 56px automatically when the item has an icon)

| Topic | Figma | Code | Status |
|---|---|---|---|
| Overall structure | Separate cards, 16 apart | `Accordion` is a gap-4 row with no outer frame | Matches (measured) |
| Card | padding 16, 1px border, corner radius 12 | measured 16 / 1px / 12px | Matches (measured) |
| Title | 16/24 SemiBold | 16px / 24px / 600 | Matches (measured) |
| Icon box, arrow | 40×40, 20px | 40 and 20 | Matches (measured) |
| Text below | 14/20, indent 56, 16 below the title | 14px / 20px / pl 56 / pt 16 | Matches (measured) |
| Colors (card fill, border, title, icon box, arrow, text) | Bound to semantic variables | Bound to `--cds-*`, measured and matches the token values | Matches (measured) |
| On hover | Not defined | The original underline was removed | Decided by the user |

**Icons (fixed 26 Nov):** The icons in Figma are a Material set (SettingsRounded, LockOutlined, HelpOutlineRounded and a solid rounded arrow). The code originally used hugeicons stroke icons, so the look did not match; changed to the same icons as Figma (paths copied from Figma into `src/lib/app/components/app/icons.tsx`). The arrow is a single icon rotated 180° when open

**Icon color and secondary text (closed 26 Nov):** Previously the Accordion component in Figma bound its colors to **variables from an external library** (remote), in which `color/content/secondary` = Slate 700 (`#334155`), while the variable in this file and `tokens.json` at that time = Slate 500 (`#64748b`). The user asked to rebind: 24 bindings on the Accordion page (inside the `accordion-item` component set and plain nodes) were switched from the library variable to the same-named variable in this file. Checked that the values match the code; the example instances follow automatically. **Note:** at that time the variable in the file was Slate 500, but the user confirmed that secondary text must be **Slate 700**, so the `color/content/secondary` variable in the file was changed back to Slate 700 (`#334155`). The icon box, arrow and the text below are now `#334155` in both Figma and code. The previous value is backed up in the file's plugin data (`contentSecondaryBackup_2026-11-26`). The previous bindings are backed up in the plugin data of the Accordion page (`rebindBackup_2026-11-26`)

**Still bound to the library on the Accordion page (21 places, not changed):** variables that have no same-named counterpart in this file (`background`, `foreground`, `border`, `primary`, `muted-foreground` are shadcn UI kit-style names) in the documentation frames and helper layers (`.Utility / Title`, section), and 2 more `color/content/secondary` places outside the component. I do not guess which of ours these variables correspond to, so I left them; they do not affect the component

**Notes:** the code originally used `rounded-xl`, which in this theme is 24px, not 12px as in Figma; changed to `rounded-md` (12px). The original card, a single box with dividers, became separate cards, and a focus ring was added (there was none before)

**Not yet checked:** hover/focus against Figma (nothing to compare), contrast of secondary text (`content/secondary` is Slate 700 on a white fill, about 10:1), rendering when there is no icon (no indent); Figma has no example of the `showIcon=false` case yet
