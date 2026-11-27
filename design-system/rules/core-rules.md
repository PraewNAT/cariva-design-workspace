# Cariva Core rules — adapted

For copied/external components, follow [Component adoption flow](component-adoption-flow.md). Reuse our existing components and Product recipes, including radius and geometry, rather than retaining the source library's shape and only changing colors/fonts. Respect explicit task constraints and report remaining gaps before claiming complete adoption.

Adapted from `/Users/natthaphorna/Cariva DS/rules/core-rules.md` and `rules/DESIGN.md` dated 24 November 2026. Used together with AGENTS.md and the [DESIGN.md](../DESIGN.md) of this workspace; older requirements are not read as approval to migrate or sync everything

## Reuse existing first

- Search Core and Product components through the Component Reuse Check before creating UI, including sidebar, header, modal, table and composed elements; no exception because writing the layout yourself is faster
- Use existing props/variants/tokens first; if it truly cannot be composed, state the limitation and propose an extension; do not silently create duplicates
- Use semantic colors and font roles per DESIGN.md; do not create a palette from experimental documents over Core
- Core does not depend on a Product's routing/API/business logic; Product-specific parts live in the Product area

## Naming and contract

- Figma components use kebab-case and code uses PascalCase; currently `crv-*` / `Crv*` is used; do not start a new `cv-*` / `Cv*` prefix set or automatically rename existing ones
- Screen frames use `{Flow}/{Screen Name}` in Title Case; state uses ` - {State}`; do not apply screen naming rules to components
- Read the actual props; do not create unsupported props from names in Figma; if there is a mapping, reuse the mapped component
- If several primitives must be composed, separate a wrapper/composition, e.g. button + badge; do not pass badge props to Button
- Keep the existing API and radius, especially for Figma alignment work; do not add props/variables or use special padding values to force a size

## Stack and implementation

- The current runtime is React/shadcn Base UI per the start order of 24 November 2026; MUI/Crv is in legacy reference
- New pages use the actual shadcn API; the Lab's migration-adapters convert only props that have consumers and do not use MUI sx or ThemeProvider
- React is currently 19; do not cite React 18 prohibitions as a permanent reason, and do not rewrite forwardRef that still works without work that calls for it
- When touching a component, check the existing selector/contract points; use markers owned by the component such as `data-ui` or `data-slot` according to the implementation; do not declare that every component has complete attributes/variant table without checking
- Defaults and metrics should come from a single recipe; when adjusting, consolidate within scope and do not rewrite every one to match the structure in the docs

## UI and accessibility

- Label is not a placeholder; an input must have an accessible name when its label is hidden
- Errors must have text and not rely on color change alone; icon buttons must have an accessible name
- Do not use a leading dot on status tags and do not use a middle dot to separate text
- Every rendered font must be >=12px; check long Thai, mobile, keyboard and modal focus restoration
- Use state/touch areas appropriate to the context, without forcing a change to the button's visual height to match old example numbers
- Border/shadow/radius use the agreed component or Product recipe; do not let the reference's no-border/no-pill rules override what the user chose
- Every UI change must check consumers on pages and portals and run a Component Audit with evidence

## Documentation and variable changes

- When the user says variables were adjusted, run the [Figma variable change flow](figma-variable-change-flow.md), reading every collection/mode/type completely
- After changing a component/token, check the related docs and stories, then audit before finishing; do not require creating a .md for every component or seven document types
- Code states the props/behavior actually implemented; Figma/agreements state the visual specification, with unimplemented gaps separated out
- Editing Markdown does not automatically permit writing to Figma; update only destinations that have a mapping and are in scope, and report what remains
- Do not start release numbering, publish, merge or delete source/branches automatically

## Points not accepted from the original

| Original statement | Agreement used here |
|---|---|
| content/secondary = Slate 500 | Slate 700 from current Figma |
| border/default/strong/disabled = Slate 300/400/200 | Slate 200/300/100 from current Figma |
| cariva app = Aktiv/Google Sans | IBM Plex Thai/Looped per the current Product Style; HosXP is a separate mode |
| label/xsmall 10px | Not allowed below 12px |
| Mandatory permanent MUI / React 18 | React 19 / shadcn Base UI active; MUI frozen |
| Mandatory radius, no-pill, button medium 36px | Keep the latest component contract; not changed from imported documents |
| No border on any card | Use the agreed Product recipe; do not wipe the table trial the user likes |
| warning on-fill must be dark but the token is still white | Report the conflict/contrast; do not change the source color or override silently |
| Every component already has a data-slot/variant table | Check the actual implementation before claiming |
| Every doc edit must sync Figma immediately | Do only the permitted mapping/scope; do not claim automation that does not yet exist |
