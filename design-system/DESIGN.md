# Cariva DS — Design Guidelines

## Date format

- Dates in input fields and date display text use **DD/MM/YYYY**, for example `20/01/2022`, with day and month zero-padded to two digits
- Date ranges use `20/01/2022 - 09/02/2022`
- This rule defines the display format only; it does not automatically change the CE/BE year or existing data values

Updated 25 November 2026, adapted from the document the user sent, following the latest instruction and the current Figma; this does not confirm that every runtime has been synced.

Direction: clean, friendly and work-tool-like; keep information dense within groups that read easily, and leave clear space between groups. The surface and layout guidance below adapts ideas from `awesomic.com-DESIGN.md`, provided by the user, applied to Cariva's Product UI.

## References

- Visual tokens: [Figma DS](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt) and the full list in [VARIABLES.md](design-references/figma/VARIABLES.md)
- Current code: `tokens.json` → `npm run tokens:generate` → `src/lib/core/design-system/tokens/tokens.ts`, `generatedPalette.ts` and `semantic.generated.css`; the theme entry is `src/app/globals.css` (shadcn Base UI)
- Applying the rules: [Core rules](rules/core-rules.md); when told that variables were edited, follow the [Variable change flow](rules/figma-variable-change-flow.md)
- Values from older documents or snapshots are evidence of the time they were read; they do not override the latest Figma or the user's instructions

## Color

Use semantic tokens in components and in the CSS/theme adapter; do not put raw hex or primitive Slate/Tailwind values in directly to stand in for a role. Hex values in documents/export files may be used as reference; they are not permission to hardcode them in the UI.

| Role | Token | Last value read |
|---|---|---|
| Page background | `color/bg/white` | White |
| App shell | `color/bg/subtle` | Slate 100 |
| Card/input/menu | `color/on-surface/default` | White |
| Modal/popover | `color/on-surface/elevated` | White |
| Primary text/icon | `color/content/primary` | Slate 900 |
| Secondary text/icon | `color/content/secondary` | **Slate 700 / #334155** |
| Placeholder | `color/content/placeholder` | Slate 500 |
| Disabled content | `color/content/disabled` | Slate 400 |
| General border/divider | `color/border/default` | **Slate 200 / #E2E8F0** |
| Emphasized border | `color/border/strong` | **Slate 300 / #CBD5E1** |
| Disabled border | `color/border/disabled` | **Slate 100 / #F1F5F9** |
| Focus/system border | `color/border/system` | Blue 600 / #2563EB |
| Validation error border | `color/border/error` | Red 600 / #DC2626 |
| Primary action | `color/brand/primary/on-surface/default` | Dodger blue 600 / #1789FA |
| Selected surface | `color/on-surface/action/selected` | Dodger blue 50 |

- `bg` is for page-level backgrounds; `on-surface` is for component surfaces and interaction states; `content` is for text and icons
- `brand/primary` and `brand/secondary` are used by brand role; do not interpret brand secondary as secondary text
- Destructive/error/validation use `color/status/error/*`; success/warning/info use the status family that matches the meaning, with text or an icon, and do not rely on color alone
- `color/accent/*` is for chart data series, avatars or decorative groups; do not use it in place of error/validation/brand colors; the legend and line patterns must also help tell the data apart
- Focus uses `color/border/system`; do not create text/icon/danger/field/foreground color groups or new aliases to get around an existing semantic token
- On a filled surface use the `content/on-fill` of that family when the runtime has a mapping; `content/inverse` is for inverse backgrounds, and `content/on-brand` is the existing compatibility token, not a new token whose use should be extended
- Figma and `tokens.json` now have on-fill for all 7 families (read live from the Cariva Core Design System file on 26 November 2026). All of them are white as currently rendered, and Figma notes that secondary, warning and active are awaiting a contrast fix, so do not claim AA passes just because a token exists
- If a token is missing, report the gap/proposal; do not silently create a token or adjust a color for one page

Some primary/filled color pairs in Figma still fail AA contrast for normal-size text. This must be reported and fixed at the source per the team's decision; do not change a color for one page to make an audit pass, and do not call it fully accessible.

## Fonts by Product Style

Read live from Figma on 24 November 2026; temporary values until the user confirms with the team.

| Role | cariva app | HosXP |
|---|---|---|
| `font-family/ui` | IBM Plex Sans Thai | Aktiv Grotesk Thai |
| `font-family/prose` | IBM Plex Sans Thai Looped | Google Sans |
| `font-family/display` | Malila | Malila |

- UI is for controls, tables, labels and screen text; prose is for continuous reading paragraphs; display is for the selected display/marketing contexts and is not automatically used for forms/tables
- Choose the Product/mode first; do not assume every Product uses the same font. Foundation fonts are separate from Product Style and must not be used to override a Product's role
- Use the role names `ui`/`prose`; the `sans`/`serif` present in legacy are compatibility aliases
- Do not choose Inter/Roboto or a new font as a design choice on your own. A generic CSS fallback may be kept for robustness, but do not claim the fallback is rendering the Figma font
- Check the font assets and weights actually loaded, especially fonts that depend on Adobe Fonts; report fallbacks/missing files and do not assume they are installed
- The active `carivaApp` uses IBM Plex Sans Thai UI / Looped prose in shadcn; the HosXP and Malila assets are not yet certified complete; the font values in code/core are a legacy reference

## Font sizes

**Never render text smaller than 12px**, including metadata, badges, chart labels/tooltips and on mobile. Even though the legacy file has `label/xsmall = 10px`, it is not an option allowed in new UI.

| Group | Sizes in local tokens | Principle |
|---|---|---|
| Heading | 24 / 20 / 16px | Headings, in order of importance |
| Body | 16 / 14 / 12px | UI content |
| Label | 16 / 14 / 12px | controls and actions |
| Caption | 12px | necessary metadata |
| Prose | 16 / 14 / 12px | continuous reading paragraphs |

Choose the existing text style/recipe first; do not adjust font-size for a single page to force a control height. Weights use 400/500/600/700 per the styles that exist. Sizes and line-heights must be read from the Typography mode and the actual component contract before changing.

The old document specifies a body line-height of 20/16, but local tokens still have 22/18 in some roles; record this as drift and do not change geometry across Core by copying the document. Check real Thai text, including vowels/tone marks, long text and the computed size on desktop/mobile/portal.

## Surfaces and depth

Let differences in surface help group information before adding borders or shadows. Use the existing semantic token colors; do not bring Awesomic's Zinc palette or black buttons over Cariva's colors.

| Area | Guidance | Token used |
|---|---|---|
| Main content background | Use white as the base of new pages; leave space between work groups | `color/bg/white` |
| App shell / large work groups | Use a light gray background when a workspace or a meaningful group must be separated | `color/bg/subtle` |
| Card / data panel | Use a white panel on a different-level background; a shadow is not the default for every Card | `color/on-surface/default` |
| Inner background of a controls group | An extra pattern for when multiple levels of interaction must be shown; not the default for filter/toolbar | `color/on-surface/subtle` |
| Borders and dividers | Use when needed to see boundaries or to read continuous data | `color/border/default` |
| Overlay / panels floating above the page | Use the existing surface and elevation recipe | `color/on-surface/elevated` |

- A white background next to a white panel can still use a border; there is no requirement to remove the border of every Card or Table
- Use an inset shell **only where it is needed to group interaction**, such as a selector whose inner boundary must be visible, or a step panel with multiple levels of interaction; it is not the default pattern of every section
- **Do not wrap a chart, chart group or whole table in a gray background and then nest a white panel inside it.** Let charts and tables be a single-layer panel, using borders/dividers only as far as they help the boundary read
- **Start a table's filter/toolbar by placing the controls directly on the page background**, grouping with spacing and alignment; do not wrap the whole bar in a gray background just because a filter and a search field are together. Show the selected state on the control itself, such as an underline or bolder text
- Table data is a white background; for a summary-number strip a light background may be used when the whole strip is one group and has no white panel nested inside it
- Before adding a shell you must be able to explain which controls it groups or which interaction it separates; if it exists only to create a decorative frame, leave space between the groups instead
- Shadows suit an overlay or a panel that must actually look floating; use a shadow/elevation token or the existing recipe, and if there is none yet, propose adding one first; do not copy multi-layer shadow values in for one page
- Friendliness comes from white space, surfaces and hierarchy together; do not change the radius of an agreed component to look like the reference image
- `bg/subtle` is Slate 100 and `bg/solid` is Slate 200. The phrase “flat color background” is not a token name; a gradient is a separate matter. The default for work pages is a flat color background; do not add a glow or gradient to every group

## Layout and density

- Allowed spacing scale: `0, 2, 4, 8, 12, 16, 20, 24, 28, 32, ...px`. From 4px upward values must be divisible by 4, with 2px as the exception. It applies to padding, margin, gap and layout spacing, on both mobile and large screens. Choose from the existing tokens in this set first; do not use in-between values such as 6, 10, 14 or 18px
- Mobile and large screens may choose different steps in the scale according to space; there is no need to reduce every component proportionally. This is a spacing rule; it does not automatically change border width, radius, typography or the approved component sizes
- Lay out the page so the headings, key tasks and the information needed for decisions are seen before secondary details; align the left edges of headings, numbers and data groups so they relate to each other
- Airy between groups, compact within a group: use the existing spacing tokens, such as gap 12/16px between related information and 24/32px between major sections, chosen by content and viewport
- A Panel uses padding by the existing size and recipe, such as 16/24px; do not use the values above to override the padding of Button, Input or Accordion
- One Card should answer one clear question or combine one clear task; there is no need to split every number into the same Card pattern. A summary strip or a shared group of numbers can be used
- Use columns of different sizes when the data has different weight, such as a main chart paired with tasks to follow; use an equal grid when the data should be compared directly
- On mobile, order the groups by importance and keep readable text sizes; a table that must be wide scrolls within the table area and does not make the whole page overflow

## Information order and typography

- Keep the font-family and type scale per the Product Style above; the user deferred the new font decision, so it has not been changed to Cosmica or Manrope
- Use weight 600 for key headings, 500 for item names or actions and 400 for content, per the existing text styles; do not make every part equally bold
- Main content in new work should start from 14/16px and use 12px for necessary metadata; do not reduce important data across a whole table to 12px just to fit more data in. The existing component contract must be kept until an adjustment is approved
- Summary numbers must sit near the label and unit, showing the time period or comparison base when needed; do not use large numbers as decoration. Choose an existing text style according to importance
- Use secondary text via `content/secondary`; `content/placeholder` is for placeholders and is not used in place of metadata across a whole page
- Do not add negative tracking to the whole page, or apply English heading styles to Thai without checking vowels, tone marks and line wrapping

## Controls, charts and details that make a page easy to read

- Make the primary action stand out according to the importance of the task, using the existing variants and brand colors; secondary actions use the existing secondary patterns; do not make every button equally prominent
- Keep the Button/Input size, padding, radius, icon and focus recipe per Core, both on the page and in a modal; do not copy Awesomic's 49px-tall button, 14/16px radius or glossy black surface in place of the existing contract
- A status tag uses text and a semantic color that matches the status; do not add a dot before the tag and do not use a middle dot (`·`) to separate metadata
- A chart must have a readable data-series name, unit and time period; use the data-series colors per the accent rule above, make the colors and line patterns in the legend match the actual chart, and keep the grid as secondary information
- Use the existing icon family by role; a person image is used when it helps identify the owner or the data owner; do not automatically add an avatar, icon badge or illustration to every Card
- Vivid colors, natural imagery and texture are used as emphasis only in meaningful contexts; if more is wanted, make it a separate Product experiment first; do not use it in place of status colors or add decorative scenes behind tables and forms
- Motion responds to actions and respects reduced motion; the data-reading area should stay still, and no scrolling text or automatically changing words in work-page headings

## Scope adopted from Awesomic

Adopted: the principle of using white–gray space, grouping by surface, an inset shell only for controls that need it, shadows only where needed, and placing numbers with context, adapted to Cariva's semantic tokens and Core

Not adopted: the new font, new color palette, 13/15px font sizes, glossy black buttons, the sizes and radius of the marketing web, chapter-level spacing of 128–160px, and large terrain/glass/wordmark imagery as defaults for the Dashboard

This document update sets the direction for the next work; it is not evidence that the code, experimental pages or Figma have been adjusted accordingly. When starting to apply it, check what exists first, separate experiments from Core, and update stories/docs with an audit per AGENTS.md.

## Scope of applying the rules

The color and font rules above apply to upcoming work; do not carry over the 8/12/16px radius, the 36px button size, no-pill or no-card-border from older documents as new requirements. Keep the agreed component API/radius/recipe and the existing ones first. The user ordered the shadcn migration to start on 24 November 2026; see SHADCN-MIGRATION.md; migration is not treated as parity for every Figma variant.

## Bottom Sheet — checked 26 November 2026

Only `SheetContent side="bottom"`: top corners 24px, Header Default/Search 72/152px for a one-line title, title UI 20/28px SemiBold, icon 32/24px, close 32px with a 16px icon. The browser uses `--font-ui` as IBM Plex Sans Thai per the active theme; no typography drift was found in the scope checked. Search is composed of Field/Input lg 48px and helper 12/16px. The decorative background uses the original Figma SVG filling the Header. API details/outstanding items and the keyboard scope are in `docs/components/SHEET-FIGMA.md` and `SHEET-AUDIT.md`; the recipes of the other Sheet sides are unchanged.

## Card — checked 26 November 2026

CardHorizontal/CardVertical/CardSmallHorizontal use UI20/28 SemiBold for the title and 14/20 for the description; the browser's active theme is IBM Plex Sans Thai. Horizontal has min-height190 with the image positioned absolutely overlapping on the right, Vertical actions in a single row gap16, Small slots80/40. The central Card primitive is not edited. The user confirmed that Profile/Metric normal uses bg/subtle #f1f5f9, Tag inside Card has padding8, Profile has max-width100% and Unit changes to content/secondary (differs from Figma at this point only). abnormal4.41:1 and shared Button3.50:1 are kept as outstanding items; this is not treated as all AA passing; details in `docs/components/CARD-AUDIT.md`.

### Tabs alignment — 2026-11-26 (Draft)

Figma Tabs Standard/Pills/Folder text uses IBM Plex Sans Thai Medium; rendered UI matches IBM Plex Sans Thai 14/20px (Standard small12/16px), with no observed family drift on page/Dialog. Standard height48/32px, Pills items36/48px, Folder56px. Source spacing6px is represented by centered fixed-height Pills; original icon/curve vectors retained. Detailed mapping and known contrast gap in docs/components/TABS-FIGMA.md; no global token changes.

### Selection animation - 2026-11-26

Standard underline and Pills background use Base UI Indicator with interruptible 350ms transform/size transitions, cubic-bezier(.4,0,.2,1). Folder color/shadow transition for 320ms. Panel selection stays immediate. Keyboard focus-visible and prefers-reduced-motion disable transitions. The existing Figma template Callout documents this code motion decision; specimens remain static linked instances. No new dependency or public prop.

### Tooltip Core / Mira - 2026-11-26

Observed Figma text roles: IBM Plex Sans Thai, Standard/Mira Medium12/16px, guide Regular14/20px. Browser matches this family. Standard body4px radius and padding4/8; guide16px radius, width240, minbody112/footer56. Mira uses same Core primitive in its own Product folder, text minimum12 and gap4; status colors remain Product-local. Source helper10px and gap2 are recorded as reference differences, never active UI values. No global token changes.

### Mira Credit Badge ownership - 2026-11-26

Credit Badge belongs to Mira Product DS, not Core Progress. Component and icon are in src/lib/products/mock-mira/components, six stories under Products/Mock Mira/Components/Credit Badge. It reuses Core Progress/Skeleton without changing their recipes. Contract and mapping live in docs/products/mock-mira/CREDIT-BADGE.md and FIGMA-MAPPING.json.

### Visualization - 2026-11-26 (Draft)

25 Core recipes reuse ChartContainer/Recharts. Source card radius12px, border/default1px, padding16, gap12, plot220px, UI title/axis/legend14/20 Regular. Source and browser family: IBM Plex Sans Thai. Existing accent blue/teal/violet/orange A04 palette matches source; do not replace global --chart-* roles. Width is responsive, reference560/320px, min-height350 with wrapping legends. No new global token. Renderer/pattern-density/data-fixture differences and pending Code Connect are recorded in docs/components/VISUALIZATION-FIGMA.md.


## Product font observations — 2026-11-27

HosXP Homepage 812:34676 (file cc5bDyHoQauXzugSwTH4Wd): UI Aktiv Grotesk Thai, prose Google Sans, display Malila. Mira DS 37MSJL69dK206ouPp4F1xW resolves UI Aktiv Grotesk Thai and display Malila from Product Style modes cariva app/back office. Aktiv/Malila font assets are not installed; previews use explicit Product-local fallbacks and do not claim font parity. Core font tokens remain unchanged. Mira-specific card colors belong to its local Mira Semantic collection, not Core brand overrides.
