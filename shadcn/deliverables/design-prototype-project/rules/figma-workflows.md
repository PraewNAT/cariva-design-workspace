# Figma and code directions

Use project-guide.md, ds-foundation.md and ui-workflow.md. Inspect installed Figma skills/tools and their mandatory prerequisites before calls. A request to document a flow does not authorize Figma writes.

## Figma → Code

On a supplied design URL and implementation request: identify Product and main component versus instance override; inspect latest variants/states/bindings/layout; find the existing code equivalent; compare approved visuals and actual contracts; report conflicts or missing mapping; update existing code within scope; update docs/stories/mapping; test/audit and compare render to the requested Figma states. Do not silently promote a screen override to shared Core. Do not write old code back over the new Figma design. New APIs or unknown business interactions require an explicit decision when outside scope.

## Code → editable Figma Design

Inspect source and rendered prototype, complete relevant code docs/tests/audit, and let the user review. Write Figma only when requested. Reuse the saved per-Product central DS, Product DS and screen-design destinations, which may be separate files. Ask only for missing/ambiguous destination URLs. Before adding a component, find existing parts, recommend Core or Product with a reason and resolve scope. Validate file/node/access before writing; do not silently use current selection.

Reuse real components/instances/variables/styles. Create or update reusable DS parts only when authorized, then compose the selected screen states in the design file. Verify actual cross-file library access; copying a component locally is not linked-library reuse. Do not publish libraries or claim linkage without evidence. Do not substitute screenshots/detached lookalikes/runnable code for requested editable reusable components.

After writing, audit actual instances, bindings/naming, variants, auto-layout/constraints and visual parity with the prototype. Code audit does not prove Figma parity. Fix scoped differences and return actual created/updated node URLs with verified and pending findings. Responsive frames/prototype transitions need not behave like CSS or real app logic; explain limitations.

Confirm representative viewport policy for this Product before making a new standard; do not invent widths or create every state/breakpoint automatically. Read existing decisions instead of asking repeatedly.

## Variable changes

Read accessible collections/modes/types/aliases and compare to the previous snapshot before replacing it. Preserve changed baselines, distinguish new changes from historical drift, trace affected mappings/consumers, update only supported in-scope adapters and generated output through actual generators, then update docs/tests/audit. Report unreadable libraries/unmapped types/conflicts. Snapshot existence is not code parity; there is no automatic watcher merely because instructions exist.

## Representative frames

For a requested screen output, propose two representative sizes: one desktop/tablet frame and one mobile frame. Reuse approved Product dimensions; if no widths are established, propose and confirm them before treating them as a standard. Existing explicit project policies override this suggested default. Test fluid responsive behavior in code between those sizes. Additional Figma sizes/states require agreed scope rather than automatically exporting every combination.

## New component placement

Search Core and selected Product components first, including subcomponents. Prefer reuse or composition. If a new component is needed, recommend Core or Product with a concrete reuse/domain reason. Ask only if that decision is unclear and request the target Figma URL before creating it. Keep DS and screen-design file destinations separate; reuse already confirmed URLs without asking again.
