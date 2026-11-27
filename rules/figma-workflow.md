# Figma Workflow

> **Note (26 Nov 2026):** This document was written in the MUI era. The parts that mention `Crv*`, MUI props and `.ai.md` apply to `legacy/mui/` only, while the Figma-side steps are generally applicable. The current DS is shadcn in `shadcn/` (rules in `shadcn/rules/`)

Covers — **Figma authoring** (creating/editing components in Figma) and **Figma → Code** (implementing React from Figma), including **screen-level Code → Figma** (Part C)

**Related docs**
- Screens / templates: `legacy/mui/rules/pixel-perfect-ui.md`
- Component contracts: `shadcn/rules/components/{name}.md`
- Code conventions: `legacy/mui/code/CLAUDE.md`
- Per-component AI rules: `legacy/mui/code/core/components/{Component}/{Component}.ai.md`

---

## Part A — Figma Authoring (creating and editing components in Figma)

### Tools Required

- **figma-console MCP** — must be connected through the Desktop Bridge plugin in Figma Desktop
- Verify: `figma_get_status` with `probe: true`
- If it drops: Figma Desktop → Plugins → Development → Figma Desktop Bridge → Run

### A1 — Prop Naming Rules

1. Use MUI prop names where possible
2. If a MUI prop cannot be used in Figma (for example `children`), name it in Figma and document the mapping in `rules/components.md`

**Variant axes (create separate frames):**
- `size=small|medium|large` — when the visual sizing differs
- `state=default|hover|focused|filled` — interaction states (CSS pseudo — do not expose as a code prop)
- `disabled=false|true` — separate boolean axis → MUI `disabled={true}`
- `error=false|true` — separate boolean axis → MUI `error={true}`
- `selected=false|true` — separate boolean axis → MUI `selected={true}`

**Do not merge `disabled` or `error` into the `state` axis** — they are separate MUI props

### A2 — Variable Binding (mandatory)

Bind variables on every property where it is possible; do not hardcode

**Spacing mapping:**

| Raw px | Variable |
|---:|---|
| 2 | `spacing/2xs` |
| 4 | `spacing/xs` |
| 8 | `spacing/sm` |
| 12 | `spacing/md` |
| 16 | `spacing/lg` |
| 24 | `spacing/xl` |
| 28 | `spacing/2xl` |
| 32 | `spacing/3xl` |
| 40 | `spacing/4xl` |

If a value falls between tokens, round to the nearest token; do not create a one-off local value

```js
// ✅ correct
node.setBoundVariable('paddingTop', findVar('spacing/lg'));
node.fills = [colorFill('color/on-surface/default')];

// ❌ wrong
node.paddingTop = 16;
```

**Color fills:**
```js
const colorFill = varName => {
  const v = allVars.find(v => v.name === varName);
  return figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v);
};
```

**Typography:**
```js
const style = allStyles.find(s => s.name === 'typography/label/medium');
await textNode.setTextStyleIdAsync(style.id);
```

**Async API (mandatory):**
```js
await figma.loadAllPagesAsync();
const allVars   = await figma.variables.getLocalVariablesAsync();
const allStyles = await figma.getLocalTextStylesAsync();
const node      = await figma.getNodeByIdAsync('1234:5678');
// primaryAxisSizingMode: use 'AUTO', not 'HUG'
```

### A3 — Purple Dashed Border (mandatory)

Every component set must have a purple dashed border `#8A38F5` — it is created automatically by `combineAsVariants()`

```js
// Multiple variants → COMPONENT_SET
const set = figma.combineAsVariants(variants, page);
set.name = 'crv-component-name';

// Single variant → COMPONENT
const comp = figma.createComponentFromNode(existingFrame);
comp.name = 'crv-component-name';
```

Do not create a FRAME as the final deliverable — it must always be a COMPONENT or COMPONENT_SET

### A4 — Audit

Report every finding with:
- **Severity**: 🔴 Critical / 🟡 Warning / 🟢 Info
- **What**: the actual prop/token/layer name
- **Why**: the rule that is violated
- **Fix**: what needs to change

**Severity:**
- 🔴 a dev would implement the wrong behavior (wrong token category, missing prop, undocumented state)
- 🟡 visual drift (hardcoded spacing, wrong surface token)
- 🟢 naming inconsistency (no visual impact)

Do not auto-fix after an audit — wait for the user to say "fix it now" (Thai: "แก้เลย")

### A5 — Fix

Fix only when the user explicitly orders it:
1. **Edit existing** — modify nodes in place with `figma_execute`
2. **Rebuild** — only when the user orders it or the structure cannot support a fix

After every fix: `figma_capture_screenshot` and verify before reporting done

### A6 — Naming Convention

- Figma: `crv-{component-name}` kebab-case
- Code: `Crv{ComponentName}` PascalCase
- Do not use the `cv-` prefix (deprecated)

### A7 — Annotation Rules

**Purple stroke on COMPONENT_SET** — a native Figma annotation from `combineAsVariants()`; do not report it as a hardcoded stroke, and do not remove it or replace it with a variable

---

## Part B — Figma → Code (implementing React from Figma)

### Principle: Figma wins on conflict (for Figma → Code)

`shadcn/rules/components/*.md` is a checklist and a contract, not a substitute for reading Figma

If a rule conflicts with the actual Figma node → **trust Figma** → implement from Figma → **update the rule in the same task**

### B1 — Inspect Figma first (mandatory)

Before writing code, inspect the node with the figma-console MCP:

1. `figma_get_status` — confirm the Desktop Bridge is connected
2. Open the component set / reference frame
3. Record the structure:
   - **Top-level children** — sibling vs nested
   - **All variant axes** — every combination that must be supported in Storybook
   - **Per-layer fills/strokes** — a token per layer; do not assume a single bg for the whole component
   - **Layout** — direction, alignment, gap, padding per frame

```text
crv-example
├── Header     → token A, padding X
├── content    → token B, padding Y
└── Footer     → token C, padding Z, border? (verify)
```

### B2 — Read docs as checklist

1. `shadcn/rules/components/{name}.md` — props, slots, token table
2. `legacy/mui/code/core/components/{Component}/{Component}.ai.md` — exports, AI rules
3. `legacy/mui/code/CLAUDE.md` — tokens, imports, MUI wrapper rules

Note the gaps between the doc and Figma, then plan a fix after implementing

### B3 — Implement

1. **Mirror the Figma hierarchy in JSX** — the footer is usually a sibling, not nested inside the padding
2. **Tokens only** — `colors`, `spacing`, `radius` from `@/ds/tokens`; no raw hex/px in `sx`
3. **MUI wrapper** — extend MUI but override the layout to match Figma
4. **Styles file** — keep variant logic in `{Component}Styles.ts` when the logic is complex
5. **Exports** — public API through `index.ts`; stories import from `index.ts`

### B4 — Storybook coverage (mandatory)

A story per important variant axis:
- Layout types, breakpoints, boolean toggles that change the anatomy
- At least 1 realistic content example

Story title pattern: `{Category}/Crv{Component}`

### B5 — Visual verify (mandatory)

Before marking done:
1. Run Storybook and open the new stories
2. Compare with Figma — `figma_take_screenshot` on the matching variant
3. Check only: bg color per section, border/divider, CTA order per breakpoint, padding/gap/typography

If different → fix the code first → update the rules afterwards

### B6 — Sync documentation

| File | Update when |
|---|---|
| `shadcn/rules/components/{name}.md` | anatomy, tokens, layout, prop mapping change |
| `legacy/mui/code/core/components/{Component}/{Component}.ai.md` | new props, slots, implementation rules |
| `legacy/mui/code/CLAUDE.md` | a new global pattern with broad applicability |

### Common failure modes

| Mistake | Fix with |
|---|---|
| Trust stale rule over Figma | Inspect the node; update the rule after the fix |
| Single wrapper with uniform padding | Split into sibling sections per Figma |
| Footer same color as body | Read the fill on the actual footer layer |
| MUI `DialogActions` border-top | Only when Figma has a divider stroke |
| Single story for a multi-axis component | A story per axis combination |
| Stories import deep path | Always import from `index.ts` |

### Quick checklist

```
[ ] Figma node inspected — structure, variants, per-layer tokens
[ ] shadcn/rules/components/*.md read; conflicts noted
[ ] JSX mirrors top-level Figma frames
[ ] Tokens only — no hardcoded hex/px
[ ] index.ts exports + stories import from index
[ ] Storybook stories cover key variants
[ ] Visual compare Storybook vs Figma
[ ] rules + .ai.md updated if Figma differs from the doc
```


---

## Part C — Selected Code → Figma

Latest policy: `AGENTS.md` and `DESIGN-SYSTEM-PLAN.md`. Parts A/B above remain legacy authoring/Figma-first procedures, not a global requirement that all new UI start in Figma or use MUI. Keep token binding/API safeguards for the target DS; resolve conflicts with the approved source rather than automatically rounding imported designs or changing anatomy.

### Source and destination

Code defines implemented API/behavior and the selected screen composition/content. Approved tokens/specifications and current Product typography decisions define visual authority. Existing target Figma components retain their radius, variable bindings and property API; broader preview preferences do not authorize replacing those rules. Surface drift as a conflict rather than silently choosing one side.

Resolve Product from the task and retain it. Discover an existing mapping; at first setup request both its DS file and Design file together and save the real pair in an explicit repository mapping. Never invent file keys, mappings or baseline support. DS files hold shared components/variables; Design files hold screens built from instances. Source-only work and board cases do not require Figma copies.

### Workflow

1. Inspect only selected source/dependencies and the actual rendered state/viewport. Record path, route/story, commit and dirty status. If runtime cannot run, distinguish static reconstruction from verified visual parity.
2. Read existing mappings, destination nodes, DS components/styles/variables and relevant Code Connect files. Verify real tool capabilities and cross-file library permissions before writing.
3. For selected screen output use code-to-figma → installed figma-generate-design/figma-use. For state-by-state prototype output use code-to-figma with one frame per state and this same policy (the external prototype-to-figma skill was removed on 2026-11-27).
4. Reuse existing nodes and instances. Keep editable text/vectors, Auto Layout and variable/style bindings; no complete-UI raster as deliverable. Create/update shared DS assets only when the task explicitly includes that scope. Missing DS matches are gaps to resolve, not permission for fallback primitives. Product-local components require agreed scope.
5. Update mapped nodes rather than duplicating. Inspect designer edits and preserve baseline/source evidence where available. If both sides changed the same contract/layout, show the conflict before overwriting. No automatic reverse sync; Figma → Code requires that direction in the user's task.
6. Compare rendered source and result at matching states/viewports; read back node structure, real instances, props and bound variables/styles. Report unsupported variants, visual deviations and checks that could not run. Update actual source/node mapping and provenance within authorized scope; do not claim a parity engine or background watcher exists.

Do not publish a library, change source/tokens, write Code Connect mappings or create files merely as a side effect of screen export. When task scope includes such work, perform the necessary preparation and verify real capability/permissions. Keep shared-DS impacts distinct from local screen overrides. Draft changes do not start numbered releases.
