# Avatar: Figma → code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4648-15632). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


26 November 2026 · Core · React/shadcn Base UI · branch `praew`

Source: [Avatar page](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-9628), [Avatar set](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-10055). Read the design context and screenshot of the actual set; the MUI snippets still left in Figma are not used as the implementation contract.

## Mapping and the anatomy actually used

| Figma | Code | Status |
|---|---|---|
| `crv-avatar` / `4315:10055` | `src/lib/app/components/ui/avatar.tsx` → `Avatar` | Fixed the existing implementation; Figma not renamed |
| `size=large / medium / small / xSmall` | `size="lg" / "default" / "sm" / "xs"` | Keeps the existing API, adds `xs` |
| `variant=circular` | `rounded-full` on Avatar | No new variant prop |
| `content=image` | `AvatarImage` + `AvatarFallback` | When the image fails to load, uses the Base UI fallback |
| `content=text` / `initials` | children of `AvatarFallback` | The caller passes initials; full names are not truncated automatically |
| `content=icon` | icon as children of `AvatarFallback` | SVG sizes follow the Avatar; the SVG images in stories have native dimensions matching Figma |
| `badge=true` | compose `AvatarBadge` | online dot; no boolean prop added on the Root |
| `crv-avatar-group` / `4457:63950` | `AvatarGroup` + `AvatarGroupCount` | existing composition; the caller chooses the count, no `max` prop |

The code source is the authority for API/behavior; Figma is the visual target in this task. This table is a reference mapping, not a published Code Connect. No Figma property/component renaming or write-back in this task.

## Visual recipe

| Code size | Avatar | Initials size/line-height | Icon box |
|---|---|---|---|
| `lg` | 40×40px | 14/20px, weight 500 | 24×24px |
| `default` | 32×32px | 12/16px, weight 500 | 20×20px |
| `sm` | 24×24px | **12/16px**, weight 500 | 16×16px |
| `xs` | 20×20px | **12/16px**, weight 500 | 12×12px |

The user confirmed a 12px minimum on 26 November 2026: `sm/xs` intentionally differ from Figma, which is still 10px. Uses fixed-size flex centering instead of copying the min-width/padding that made the fallback stretch. Fonts are not scaled down to squeeze in full names; pass initials and place the full name beside the Avatar. The fallback clips content that exceeds the bounds while keeping its original size.

- Font: `font-sans` of the active theme; carivaApp uses IBM Plex Sans Thai. HosXP/Malila were not checked in this task.
- Fallback background: `color/on-surface/sunken`; initials: `color/content/primary`; SVG icons: `color/content/secondary`.
- No border overlay around a single Avatar, per the target. Images use object-cover and rounded-full without clipping the badge.
- The badge is a 12×12px box including a 2px border in `color/on-surface/default`, with an inner 8×8px dot in `color/status/success/on-surface/default`.
- Badge `lg/default`: the box edge protrudes 2px from the right and bottom. `sm/xs`: the box sits half outside the bottom-right corner per Figma (uses a 50% transform of the 12px box).
- The badge is status information; the caller must pass an accessible label such as `aria-label="โอภาส ออนไลน์"` (Thai sample: a person's name plus "online") on `Avatar role="img"` and use `aria-hidden` on the dot so it is not announced twice; if the name/status is already outside, a decorative Avatar can be used.
- The Avatar itself is not a button and adds no tab stop. Use a real Button/trigger when an action is needed; the stories test opening a Dialog by keyboard and focus return after Escape.

## AvatarGroup and consumers

The actual consumer in the repo: `src/lib/features/board/presentation/components/CatalogFeedback.tsx` → `CoreCatalog`. Uses the existing component with no per-page overrides. The existing Default example still uses the existing story ID.

AvatarGroup keeps the existing 8px overlap and 2px ring border. AvatarGroupCount was adjusted to use the selected surface/secondary content and sizes of 40/32/24/20px matching the Avatars in the same group. Use the same size within a group; the caller computes the extra count themselves. No business logic or `max` prop added.

**Group parity is not certified:** the Figma group uses overlap and widths that are not uniform, e.g. medium max=2 differs from max=3–5 and some xSmall instances are 17/18px wide. This task adjusts the single Avatar and checks the group as an affected consumer, keeping the existing group layout; that irregularity is not copied into Core.

## Stories, docs and assets

- `Default`: the existing example group and size control.
- `FigmaVariants`: 24 combinations (3 contents × 4 sizes × badge on/off), checks actual sizes, full image load, icon geometry and badge.
- `ImageFallback`: broken image and no image at every size, checks text of at least 12px.
- `GroupSizes`: every size with a count, no max prop.
- `PageAndDialog`: compares computed styles on the page and in the portal with keyboard/focus restoration.
- `MobileThai`: 320px, long Thai names and text at the 12px minimum.

The assets in `src/lib/app/components/ui/assets/avatar/` are all seven files, portrait PNGs and person SVGs from the design context. Stories use local imports; no temporary Figma URLs at runtime. The paths and native dimensions of the SVGs are not changed. The portrait images are examples from Figma, not real user data.

The Figma docs at `4648:15632` still reference 10px and MUI as far as can be read; **pending** because this task is Figma → Code and does not allow Figma writes or publication automatically. Markdown/Storybook already describe the implemented contract and the 12px exception.

Latest results and limitations: [AVATAR-AUDIT.md](AVATAR-AUDIT.md).

## Renaming the sets in Figma (26 Nov 2026, the user confirmed as proposed)

| New name | Previous name | instances before → after |
|---|---|---|
| `avatar` (`size` lg / default / sm / xs) | `crv-avatar` | 193 → 193 |
| `avatar-group` (`size` lg / default / sm / xs, `max`) | `crv-avatar-group` | 10 → 10 |

The previous `size` values large / medium / small / xSmall were changed to match the code. The single previous `variant=circular` value is kept. The original names are backed up in plugin data `oldName_2026-11-26` / `oldVariantNames_2026-11-26`
