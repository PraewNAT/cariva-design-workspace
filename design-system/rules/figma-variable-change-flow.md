# Flow when the user reports that Figma variables changed

Use when the user says "adjusted the border color", "changed the font", "adjusted the variables" (Thai: “ปรับสี border”, “เปลี่ยนฟอนต์”, “ปรับ variables แล้ว”) or changes any type of value in variables; the user does not need to repeat the sub-steps

## Scope and references

- When a color or font changes, the Figma foundation docs must be checked/updated per the [color and font documentation destinations](../design-references/figma/FOUNDATION-DOCS.md) specified by the user, not stopping at the token/code update; report plainly any destinations that could not yet be updated

- Current file: `XgxprkSY5mGbzIIwlmscCt`; if the user changes the destination, use the new destination explicitly and do not switch back to the old file on your own
- Read **every collection, every mode, every variable and every type the API makes accessible**, including COLOR/FLOAT/STRING/BOOLEAN and aliases; do not read only colors or the selection the user has open
- Read the file's local variables completely; if there is an external library that cannot be read, state the limitation and do not claim to have read the whole organization
- baseline/inventory: `design-references/figma/variables.latest.json` and `VARIABLES.md`; read the existing files before pulling new values

## Steps the AI must take

1. **Read and compare the whole set** Use IDs to identify collection/variable/mode together with names to distinguish rename, add, delete, mode change, type change, raw value, alias target and resolved value; an alias that changes while the color stays the same still counts as a change. Keep the previous snapshot before overwriting when there are differences
2. **Separate what the user just changed from existing drift** A snapshot is the Figma state that was previously read, not evidence that the code is synced. If there is no baseline, create one and say that this round cannot yet separate the change history
3. **Trace the impact** along aliases → tokens/theme/font assets/recipes → Core/Product components → stories/pages/charts → modal/popover portals → docs/Foundations; check actual dependencies and do not conclude that the color changed everywhere because a search found a single term
4. **Update only the mappings that are confirmed and in scope** For colors, edit `tokens.json` (both alias/value) and then run `npm run tokens:generate`; do not hand-edit generated files. For font/spacing/radius/typography/breakpoint/icon/opacity/blur/border-width, first check the adapter/recipe/generator that actually exists; if there is no mapping, report the gap and do not guess prop names or create a new system
5. **Preserve the latest constraints** If the new value conflicts with the 12px minimum font, an API/radius that must not change, the pending shadcn migration, or would alter business behavior, do the unblocked parts first and then report the conflict that needs a decision; a notice that variables changed (Thai: “เปลี่ยน variables”) is not permission to migrate everything
6. **Check related docs** Update the inventory/snapshot, DESIGN.md, component docs, Storybook/Foundations and affected mappings; do not require editing every file or writing Figma docs when there is no destination/authorization
7. **Verify actual results and audit** Check token generation/typecheck and story tests according to the impact; check computed styles on pages and portals, and mobile/long Thai/keyboard where relevant. A shared token change requires checking consumers broadly enough; do not disable tests/a11y to make them pass
8. **Summarize briefly** what changed, where it has impact, what has been updated, the check results, and the mappings/conflicts still outstanding. Store the new baseline with a status of which values have been applied / not yet mapped; do not claim auto sync of every value

## Example impact by type

| What changed | What to check next |
|---|---|
| Color/alias | semantic mapping, theme, text/icon/surface/border/state, chart, portal, contrast |
| font-family | Product/mode/role, font asset/weights/fallback, text geometry and Thai |
| font-size/line-height/weight | Typography modes, control sizing, wrapping, mobile and the 12px minimum |
| spacing/radius/border-width | recipes, auto-layout/code layout, page/modal consistency and the existing constraints |
| breakpoint | responsive mappings and affected viewports; do not assume a CSS mode switch already exists |
| opacity/blur/icon dimensions | renderer/units, contrast, hit area and icon alignment |
| add/delete/rename/type/mode | mapping compatibility and consumers that may break, before deleting or changing an API |

## What exists and what does not yet

This is a **rule the AI must follow when taking a task in chat**, not a background watcher or CI, and there is no generic script yet that maps every type of variable by itself. `tokens:check` only checks generated code against tokens.json and does not read Figma

At the start there were 635 local variables: Foundation 382, Semantic 199, Typography 51, Product Style 3, all modes read; there is no BOOLEAN in this round's snapshot, but it must be readable if one is added later. The Draft set is a reference and is not automatically promoted into Core
