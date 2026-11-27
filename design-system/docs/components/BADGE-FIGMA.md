# Badge · Figma → code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-57628). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


26 November 2026 · Core · branch `praew`

Source: [Badge page](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4518-82928), [crv-badge set](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4518-82967). Read the context/screenshot and the fill bindings of all 6 colors read-only. This component has no static image/SVG assets.

## Mapping and API

| Figma | Code | Status |
|---|---|---|
| `badge` (previously `crv-badge`) / `4518:82967` | `src/lib/app/components/ui/badge.tsx` → Badge | Extended the existing component; set renamed in Figma 26 Nov 2026 |
| `variant=dot` | `variant="dot"` | 8×8px, no text |
| `variant=standard` | `variant="standard"` | height 20px, minimum width 20px, expands with content |
| `color` | `primary / error / success / warning / info / default` | used only for dot/standard; the default color is primary |
| `badgeContent` | children | no duplicate prop added, 0 not hidden and 99+ not truncated automatically |
| `glow` (previously `Glow`) | `glow` (only `variant="dot"`) | Done 26 Nov 2026: `0 0 4px` shadow in the same color as the dot at 36% (measured in the `Glow` story) |

The existing variants `default`, `secondary`, `destructive`, `outline`, `ghost`, `link` keep their existing recipe. Not passing a variant still gives the existing default text badge; it does not change to a dot like the Figma default. The new color axis does not change the colors of the legacy variants. Keeps `render`, forwarded props/events/ref and Base UI useRender/mergeProps. The name `color=default` means the sunken fill in dot/standard, while `variant=default` means the existing text badge.

`dot` does not render children so that no text sits in the 8px circle. The caller must provide an accessible description, e.g. role img + aria-label, or aria-hidden if there is adjacent status text. Do not convey meaning by color alone. No focus/tabindex is added to an informational Badge; use `render={<a ... />}` when a link is needed and give it an accessible name from context.

## Visual specification

- dot: 8×8px, no border/padding/text.
- standard: h 20px, min-width 20px, horizontal padding 4px, vertical padding 2px, font 12px/line 16px Medium 500 per Product UI (`--font-ui`).
- Dots and counts use a circular/pill surface with no glow unless `glow` is set on the dot. The geometry does not depend on the inherited line-height on the page/portal.
- Multi-digit counts expand in width and keep the 20px height. The caller decides the count and how 99+ is shown; Badge adds no notification/business logic.

| Color | Background semantic token | Text semantic token |
|---|---|---|
| primary | brand/primary/on-surface/default | brand/primary/content/on-fill |
| error | status/error/on-surface/default | status/error/content/on-fill |
| success | status/success/on-surface/default | status/success/content/on-fill |
| warning | status/warning/on-surface/default | status/warning/content/on-fill |
| info | status/info/on-surface/default | status/info/content/on-fill |
| default | on-surface/sunken | content/primary |

Checked the actual bindings of all 6 standard colors: the generated context that shows the word success for every status was a wrong label from the tool. The real Figma binds status/error, success, warning, info correctly by role, so the existing semantic tokens are used and the variables and generated theme are not changed. It is not claimed that the color pairs pass AA just because tokens exist; primary/warning/info use white on-fill per Figma and the contrast is reported separately without override.

## Examples

```tsx
<Badge variant="standard" color="success">12</Badge>
<Badge variant="standard" color="default">99+</Badge>
<Badge variant="dot" color="error" role="img" aria-label="มีรายการแจ้งเตือนผิดพลาด" />
<Badge variant="dot" color="success" aria-hidden="true" />
<Badge variant="standard" color="success" render={<a href="/notifications" />}>3</Badge>
```

The link is a composition example, not a route created in the repo. The link story uses a simulated local anchor and checks keyboard focus. (The Thai `aria-label` in the example above, `มีรายการแจ้งเตือนผิดพลาด`, is sample UI copy meaning "There is an error notification item".)

## Consumers and coverage

Existing consumers: `CatalogFeedback.tsx` → `CoreCatalog`, and `Stepper` in `app/patterns.tsx`. The legacy recipes are kept for these consumers; the new badge is not automatically promoted to replace them. `AvatarBadge` uses a separate recipe with a border around the dot per the Avatar work; its API was not changed or altered in this task.

6 stories: Default (existing ID), FigmaVariants (12 combinations), CountContent (0/1/12/99+/9999), LegacyVariants, PageAndDialog and MobileThai. Checks dot/count geometry, the 12px minimum, count expansion without clipping, page/portal consistency, keyboard/focus and long Thai text at 320px.

The target Figma docs `4716:57628` have not been updated back because this task permits Figma→Code. This mapping is reference evidence, not a published Code Connect. Results and limitations are in [BADGE-AUDIT.md](BADGE-AUDIT.md).

## Renaming the sets in Figma (26 Nov 2026, the user confirmed as proposed)

`crv-badge` → `badge` (282 → 282 instances), prop `Glow` → `glow`; the variant values (`variant`, `color`) already match the code. The original names are backed up in plugin data
