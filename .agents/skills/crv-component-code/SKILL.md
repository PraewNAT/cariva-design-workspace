---
name: crv-component-code
description: Creates or edits legacy Crv/MUI DS components in legacy/mui/code/core per the existing contract; not for implementing screens or shadcn components
---

> **Legacy (MUI).** The current DS is shadcn in `shadcn/` — this skill is used only when asked to edit code in `legacy/mui/` (moved there on 26 Nov 2026). Use the `shadcn` skill for new work

## Scope per the latest plan

Read AGENTS.md and rules/skill-routing.md before using this skill. The latest rules take precedence over any older conflicting steps. This skill does not allow publishing, pushing, deploying, or starting version numbers automatically. Perform external actions only when the user has actually assigned them.


# Cariva Component Code Generator

Use it to create/update a Cariva DS component together with its component contract and team-specific artifacts. If the task is implementing a screen composed from existing components, use `figma:figma-design-to-code` and `rules/figma-workflow.md` Part B instead; do not run two workflows redundantly.

Use when user says:

```text
create code [component]   (Thai: "สร้าง code [component]")
generate code for crv-[name]   (Thai: "generate code สำหรับ crv-[name]")
convert [component] to React   (Thai: "แปลง [component] เป็น React")
code crv-[name]
```

## Stack (referenced from the product repo)

- Next.js 16.2.4 (App Router) — every component must have `"use client"`
- MUI 9.0.0
- TypeScript 6.0.2
- React Hook Form 7 + Yup — input components must use `forwardRef`
- i18next 26 — the caller passes an already-resolved string; do not pass i18n keys into a component
- Jest 30 + React Testing Library 16

---

## Required reading (in order; do not skip)

1. `CLAUDE.md` — confirm stack + naming convention + wrapper rules
2. `legacy/mui/rules/core-rules.md` — prop mapping rules
3. `legacy/mui/tokens.json` — usage rules and token grouping
4. `legacy/mui/tokens.json` — the actual hex value of every token (semantic + foundation); use it to verify a token really exists before putting it in code
5. `code/tokens.ts` — typography, spacing, radius values
6. `legacy/mui/rules/components/{name}.md` — the spec of the component about to be created

If any file in items 1–6 cannot be found → ask the user first; do not assume

---

## ★ Figma Ground Truth Scan (mandatory before generating — do not skip)

**Reason:** the doc in `.md` may be outdated or wrong; Figma is always the source of truth

If the figma-console MCP is open → do all of the following before generating:

### 1. Dump every combination from Figma

```js
// Run in figma_execute — replace NODE_ID with that component's component set
const node = await figma.getNodeByIdAsync('NODE_ID');
const variants = node.children.map(v => ({
  name: v.name,
  fills: v.fills,
  strokes: v.strokes,
  children: v.children?.map(c => ({ name: c.name, fills: c.fills, strokes: c.strokes }))
}));
console.log(JSON.stringify(variants, null, 2));
```

### 2. Build a complete ground truth table for every combination

For every combination of variant × color × state:

| combo | bg token | border token | content token |
|---|---|---|---|
| contained/primary/default | ... | ... | ... |
| contained/primary/hover | ... | ... | ... |
| ... (every row) | | | |

**Do not skip or guess** — every row must come from the real Figma dump

### 3. Compare with the doc

If the doc in `legacy/mui/rules/components/{name}.md` is wrong → **fix the doc first**, then generate code  
If the doc is already correct → generate code from the ground truth table that was built (not from the doc alone)

---

## Output structure

Create every file in `packages/react/src/components/{ComponentName}/`:

```
{ComponentName}/
├── {ComponentName}.tsx          ← main component
├── {ComponentName}.types.ts     ← TypeScript types
├── {ComponentName}.stories.tsx  ← Storybook stories covering every variant
├── {ComponentName}.test.tsx     ← Jest + RTL
├── {ComponentName}.ai.md        ← copy from legacy/mui/rules/components/ to sit near the source
├── {ComponentName}.figma.tsx    ← Figma Code Connect mapping
└── index.ts                     ← barrel export
```

Naming: Figma `cv-button-icon` → folder/component `CvButtonIcon`

---

## Code rules

### Component (.tsx)

- Start the file with `"use client"` every time
- Use `forwardRef` for every component that takes an event/input (button, input, select, tabs)
- The Props interface must match Figma variants 1:1 — prop names match Figma properties
- Do not import from `@mui/material/*` in source — wrap via theme/styled only (except in wrapper components where necessary)
- Do not hardcode hex, px, rem — use tokens from `@cariva/tokens` or the Tailwind preset only
- Label / placeholder are accepted as `string` (the caller resolves i18next itself)

### Types (.types.ts)

- Export `interface {ComponentName}Props`
- Variant props are literal unions: `'small' | 'medium' | 'large'`, not `string`
- If wrapping MUI, extend from the MUI props as specified in `legacy/mui/rules/core-rules.md`

### Stories (.stories.tsx)

- Use the CSF3 format (`Meta`, `StoryObj`)
- **There must be 1 story per Figma variant** — compare against `legacy/mui/rules/components/{name}.md` line by line
- Have a `Default` story that uses the prop values of the Figma default
- Have an `AllVariants` story that shows every variant at once in a grid (for visual review)
- Add `parameters.docs.description` with a short explanation per story

### Test (.test.tsx)

Cover only 4 categories; do not over-test:

1. **Render** — the component renders without crashing for every main variant
2. **Props pass-through** — props passed in are displayed correctly (label, placeholder, value)
3. **Event** — onClick / onChange / onBlur are all called
4. **State** — disabled, loading, error states behave as expected

Do not:
- Visual regression (use Storybook + Chromatic later)
- Snapshot tests
- Test MUI internal behavior (trust that MUI works correctly)

### AI doc (.ai.md)

- Copy everything from `legacy/mui/rules/components/{name}.md` and paste it directly
- Add a short header at the top:
  ```
  > Source of truth: ../../../../legacy/mui/rules/components/{name}.md
  > This file is a mirror for AI handoff. Do not edit directly.
  ```

### Figma Code Connect (.figma.tsx)

- Use `@figma/code-connect`
- Map Figma variant props → component props directly
- Add an `example` covering default usage
- Specify the Figma node URL if known; if not known, put `// TODO: node URL` and tell the user in the end-of-task summary

### Barrel (index.ts)

```ts
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './ComponentName.types'
```

---

## Verification (do before finishing the task — do not skip)

1. Every variant in `legacy/mui/rules/components/{name}.md` has a matching story in `.stories.tsx` — list cross-check
2. Every token used in the code really exists in `legacy/mui/tokens.json`
3. No hardcoded hex/px/rem in `.tsx`
4. `.ai.md` matches `legacy/mui/rules/components/{name}.md` character for character (no drift)
5. The component has `"use client"` on the first line
6. If it is a form component (input/select/tabs), it must use `forwardRef`

### ★ Visual Verify — do not claim "done" before completing all of it

7. **Storybook must be running** — if the dev server is not running, report to the user to run it
8. **Screenshot the AllVariants story** — use computer-use or the browser MCP to capture the image
9. **Screenshot the Figma component set** — use `figma_take_screenshot` or `figma_get_component_image`
10. **Compare combination by combination** — report the differences found (if there are none, state "verified: no diff")
11. **Do not report done if items 8–10 have not been done** — if Storybook is not open, tell the user plainly that the dev server must be run before visual verify

12. **Publishing Code Connect is mandatory** — run `npm run code-connect:publish` from the project root every time after creating/editing `.figma.tsx` (the token is read from `.env.local` automatically). If there is no token, report the error clearly; do not skip this step
13. End-of-task report: state the files created + variant count + token count + Code Connect publish result + visual verify result + caveats

---

## Stop conditions

Stop and ask the user first; do not assume, if:

- `legacy/mui/rules/components/{name}.md` does not exist → recommend running the `component-doc` skill first
- A token referenced in the .md does not exist in `legacy/mui/tokens.json` → token drift, must sync first (skill `token-sync`)
- The Figma variants do not match the doc (when the MCP is open) → must audit first (skill `audit`)
- The component is in the custom group (ai-bubble, ai-streaming, ai-suggest) → do not wrap MUI; the pattern must be discussed first

---

## Example invocation flow

```text
User: create code crv-button   (Thai: "สร้าง code crv-button")

AI:
1. Read CLAUDE.md
2. Read legacy/mui/rules/core-rules.md
3. Read legacy/mui/tokens.json
4. Read code/tokens.ts — typography section
5. Read legacy/mui/rules/components/crv-button.md
6. ★ Figma scan — dump every combination from the component set node
7. ★ Build a ground truth table covering every variant × color × state
8. ★ Compare with the doc — if wrong, fix the doc first
9. Generate 7 files in legacy/mui/code/core/components/CrvButton/ from the ground truth table
10. cross-check variants, tokens, no hardcoded values
11. ★ Screenshot AllVariants (Storybook) + Screenshot Figma — compare images, report differences
12. Report: "Created CrvButton, all 7 files — 18 variants, 8 tokens, visual verify: no diff"
```
