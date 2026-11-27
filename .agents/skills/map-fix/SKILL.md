---
name: map-fix
description: Map a Figma component to Cariva DS and fix it to match — usable both at the start and after an audit. Use when the user says map, fix, แก้ (fix), แมป (map), map-fix
---

# Map & Fix — Cariva Design System

Use when the user says (Thai trigger phrases are kept so Thai-speaking users can still invoke it):

```text
map [name] node-id=[id]
fix [name] node-id=[id]
fix [name] node-id=[id]  (Thai: "แก้ [ชื่อ] node-id=[id]")
map [name] node-id=[id]  (Thai: "แมป [ชื่อ] node-id=[id]")
map-fix [name] node-id=[id]
```

## Required Context

Before every map, read:
- `shadcn/DESIGN.md` — token names, typography scale
- `shadcn/tokens.json` — hex values and token mapping
- `shadcn/rules/components/{component name}.md` if it exists — source of truth for properties and variants
- The actual component code at `shadcn/src/lib/app/components/ui/{code-name}.tsx` and its stories — the props, variants and sizes that really exist
- `shadcn/docs/components/FIGMA-NAMING.md` — component name in Figma ↔ component name in code

## Mapping Scope

Map and fix:

- Color tokens — change hardcoded hex → semantic token
- Typography styles — bind the DS text style
- Spacing variables — bind the spacing token
- Radius variables/styles — bind the radius token
- Effect styles — bind the shared effect style
- Component base / shared component when available
- States and variants to the existing Cariva pattern
- **Component names** — check whether the component name matches the `FIGMA-NAMING.md` table; if not, propose a name and ask for confirmation before editing
- **Property names and values** — the property names and values in Figma must equal the props and values in the shadcn code of that component (e.g. Button: `variant` = `default | outline | secondary | ghost | destructive | link`, `size` = `default | sm | lg | icon…`). Read from the actual `.tsx` file, not from memory. If they do not match, propose the correct name and ask for confirmation before editing. If the code has a prop that Figma lacks, or vice versa, report it as a gap; do not add or remove it yourself

## Notes

- Work on one frame at a time only — if you are given a whole section or flow, list the frames found first, then ask which frame to start with
- If continuing from an audit — you can use the data already inspected; no need to inspect again

## Rules

- Do not use tokens from an old design system.
- Do not use local styles when a shared style exists.
- Do not create new tokens or components by default — if what is needed does not yet exist in the DS, tell the user first
- Do not invent props or variants that the shadcn component in `shadcn/src/lib/app/components/ui/` does not have.
- If a component base is missing, or a needed variant/state is incomplete, tell the user what should be created before creating it.
- Always ask for confirmation before editing; never edit on your own without asking
- Preserve visual intention unless the DS mapping requires a correction.

## Output

When reporting results, state:

- What was mapped/fixed
- The related nodes
- Component names and property names that already match the code, and those that do not yet (with the correct names proposed)
- What is missing — components, variants, states, tokens, or styles not yet in the DS
- Questions before creating anything new in the DS
