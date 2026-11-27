---
name: audit
description: "Checks Figma against the Cariva DS: token binding and naming of nodes (audit), QA of a screen or flow before handoff (formerly design-review), and mapping a Figma component to the DS and fixing it (formerly map-fix). Figma only; not the React component-audit or duplicate finding. Verify actual bindings before findings; fix within existing user authorization."
---

## Scope per the latest plan

Read AGENTS.md and rules/skill-routing.md before using this skill. The latest rules take precedence over any older conflicting steps. This skill does not allow publishing, pushing, deploying, or starting version numbers automatically. Perform external actions only when the user has actually assigned them.


# Audit Cariva Design System Integration

> Workflow fit: used at step(s) F1–F2 (read and compare the Figma side), D3 (library access) and D5 (audit the Figma that was written), V2 (trace variable impact) in `design-system/rules/workflow-map.md` (see the Skill column of each flow table). Load it when that step starts.

Use when the user says:

```text
audit [name] node-id=[id]
please audit this [component/page name]   (Thai: "ช่วย audit [component/page name] นี้ให้หน่อย")
check component [name]   (Thai: "เช็ค component [ชื่อ]")
```

## Required Context

- Read `shadcn/DESIGN.md` — token names, typography scale
- Read `shadcn/tokens.json` — hex values and token mapping
- Read `shadcn/rules/components/{name}.md` if it exists
- Use Figma inspection tools for the target node/page.

## Binding evidence gate

Required before classifying any token defect:

1. Confirm file key, node ID/type, main component versus instance, variant/state and exact property. Inspect relevant descendants; a set-level summary does not establish every variant.
2. Read the actual property binding from the current node: paint boundVariables.color for fill/stroke, node boundVariables for scalar properties, and text ranges for mixed text. Record paint index/range where relevant. Screenshots, hex matches and get_variable_defs summaries alone cannot prove binding identity or absence.
3. Resolve the observed variable ID to its current name, collection/type, applicable explicit or inherited mode, alias chain and resolved value. Inspect style references and instance overrides when relevant. Compare semantic role against the approved mapping; equal colors do not imply equal semantics and a different name alone is not a defect.
4. If tools disagree, repeat a scoped read of the same file/node/property and establish whether both sources describe the same current state. Report both observations as conflicting evidence / unverified until reconciled. Do not count the item as a confirmed defect or pass, assume a cache/tool bug, or change a correct binding to match a summary. If direct inspection is unavailable, report unverified rather than wrong/missing.
5. Each confirmed finding records file/node/property, variable ID/name, collection/mode, observed versus expected role and evidence source. Scope pass claims to inspected properties/states.
6. Before an authorized fix, re-read the affected property for intervening edits. Reuse existing variables and preserve API/radius. Read back binding and resolved value after writing; verify visuals if appearance may change. Explicitly correct an earlier false finding and say whether an edit occurred.

Load Figma plugin prerequisites from rules/skill-routing.md before tool use. Inspection does not authorize mutation.

## Audit Scope

Check only:

- **Naming convention** — use the active `design-system/docs/components/FIGMA-NAMING.md` mapping and actual contract; never apply frozen MUI/Crv naming to shadcn.
- Uses component base / shared component correctly
- Colors are bound to current semantic color tokens — no hardcoded hex
- Typography uses text styles / typography variables
- Spacing uses current spacing variables
- Radius/effect uses shared styles or variables
- Unexpected local overrides
- Deprecated or old tokens
- Raw primitive color used directly in components

## Do Not Check

- Visual taste unless it affects DS integration
- Product copy quality
- Layout redesign ideas
- Implementation code unless the user explicitly includes code

## Report Format

Report results in this format:

```
## Audit: [component name]

### ❌ Issues found
| # | Issue | Node | Should be |
|---|---|---|---|
| 1 | hardcoded #2563EB | contained/primary fill | semantic/color/primary/default |

### ⚠️ Unsure
- [things to ask before deciding]

### ✅ Passed
- [things that are correct]
```

Continue into map-fix only when fixing is already authorized. For inspection-only requests, stop with findings and limitations. Ask only for a missing decision or new scope that blocks an authorized fix. No confirmed defect means no invented fix or mandatory closing question.

## Rules

- Do not change Figma or local files during audit phase.
- Do not create tokens/components.
- If a point is ambiguous, ask before recommending a structural change.
- Keep findings grounded in node IDs, component names, token/style names, or exact property names.
- If the user says "do not fix" (Thai: "ห้ามแก้") or "report only" (Thai: "report อย่างเดียว") → do not ask the closing question after the report

---

## Merged skill: Screen QA before handoff (formerly `design-review`, merged 2026-11-27)

Original copy: `.skill-backups/2026-11-27-minimal/design-review/`. The trigger phrases below still start this skill.

#### Scope per the latest plan

Read AGENTS.md and rules/skill-routing.md before use. The latest rules override any older steps that conflict. This skill does not allow publishing, pushing, deploying, or starting version numbers automatically. Take external actions only when the user has actually assigned them.


### Design QA

Use when the user says (Thai trigger phrases are kept so Thai-speaking users can still invoke it):

```
Please QA this screen  (Thai: "QA screen นี้ให้หน่อย")
Check this screen before handoff  (Thai: "เช็ค screen นี้ก่อน handoff")
Do a design QA of page [name]  (Thai: "ทำ design QA หน้า [name]")
Analyze this page  (Thai: "วิเคราะห์หน้านี้")
Please review this UI  (Thai: "ช่วยดู UI นี้ให้หน่อย")
Is it ready to send to dev yet?  (Thai: "พร้อมส่ง dev หรือยัง")
Check before handoff  (Thai: "เช็คก่อน handoff")
Can it be handed off yet?  (Thai: "handoff ได้ยัง")
```

---

#### Required Context

- Read `shadcn/DESIGN.md` — tone of voice and brand principles
- Read `shadcn/tokens.json`
- Inspect the target node in Figma before starting

---

#### Pre-flight (do this before every QA)

0. **Resolve DS applicability from the request, Product mapping and context; ask only when still ambiguous and material to the review.**
   - If **yes** → QA every category
   - If **no** → skip the entire DS Integration category (token binding, font, component naming, the Token gate) — leave only the UX-level QA
1. Automatically pull the children of the node you were given
2. List the names of all frames/states found, e.g. Default, Loading, Error, Empty, Session Expired
3. QA against this state list — do not flag a state that is already in the list as missing
4. Flag missing states only against confirmed requirements or implemented behavior. Otherwise report proposed cases/unanswered rules. Component specimens are not complete Product flows.

---

#### Before starting the analysis

Answer these 2 questions to yourself first:

1. What does this screen do? What outcome does the user want?
2. What data flows in and out of the flow?

---

#### QA Scope

##### 1. Missing states
Compare against the state list from Pre-flight — flag only those truly missing for the use case, e.g. Empty, Loading, Error, Success, Disabled

##### 2. Data edge cases
Very short / very long text, numbers that are 0 / negative / over a limit, an empty list / a single item / more items than fit on the page

##### 3. Error & Recovery
For each action, if it fails, does the user know what happened and what they can do next?

##### 4. Permission & Access
Are there states that some users see differently? For example read-only, no permission, locked account

##### 5. Interaction edge
Rapid repeated taps, submitting while loading, leaving the page midway, going back after a successful action

##### 6. DS Integration
- Fill/stroke bound with a semantic token (no hardcoded hex)
- Spacing bound with `spacing/*`
- Typography uses a `typography/*` text style
- Radius bound with `radius/*`
- Uses components from Cariva DS — does not build a custom frame instead

##### 7. Layout & Alignment
- Alignment is consistent within the same section
- Spacing between components is consistent
- The grid is correct — no element is cut off outside its container

##### 8. Error states must have a message
- An error state has a message saying what happened, not just a color change
- (Deeper accessibility such as contrast ratio and touch target is already checked at the component level — do not re-check at the screen level. If you happen to see a clearly wrong spot, you may note it as 🟢 Info, but it does not count toward the verdict)

##### 9. Copy & Tone (only when requested or included in agreed acceptance criteria)
- Direct and specific
- Error messages say what happened and what to do next
- Placeholder is a hint — not a substitute for a label
- Distinguish intentional specimens/mock text from missing production copy. Do not fail a component specimen for placeholder text. Mark copy not assessed when outside scope.

##### 10. Questions before dev picks up the work
Anything still unclear that must be asked of the designer or PM before dev starts

##### 11. Naming
- Check only the main page/frame names (the state level that is handed off to dev) — names must be meaningful, not "Frame 123" or "Untitled"
- Do not check the sub-layers inside each frame

---

#### How to explain every finding (important)

Write so that a designer who does not work with code can understand immediately — do not use dev/technical jargon without translating it:

- Do not just say "token not bound" or "wrong spec" — say **why it matters from a design perspective**, e.g. it conveys the wrong meaning, looks inconsistent with other screens, users may be confused
- Put technical token/values (e.g. `radius/sm`, hex code) only as reference at the end of the sentence, not as the main point of the finding
- Use the format: **[what you see] → [why it should not be this way from a design/UX perspective] → (token reference in parentheses if needed)**
  - Example instead of saying: "The Back button is not bound to `radius/sm` (8px)"
  - Say: "The Back button is fully rounded (pill-shaped), unlike the system-wide standard button which has rounded corners — it will look like it belongs to a different set (the standard button spec uses radius 8px)"
- If a finding concerns a token/color, explain it as "this color should be used when..." instead of the variable name directly

#### Handoff Readiness Gate

After analyzing every item, summarize as a pass/fail checklist — answering one question: **"Can this be sent to dev yet?"**
Use the results from the QA Scope already analyzed — do not re-check

| Gate | Pass criteria | Result |
|---|---|---|
| Naming | Main page/frame names (state level) are meaningful | ✅/❌ |
| Token | No hardcoded hex/px — tokens fully bound *(skip if the file does not follow Cariva DS)* | ✅/❌ |
| States | Every state for the use case is present (from the Pre-flight list) | ✅/❌ |
| Edge cases | Empty / loading / error are covered | ✅/❌ |
| Text overflow | Everywhere that shows user or system text, it is defined what happens when the text is too long (truncate / wrap to a new line / scroll) and the layout does not break with the longest text | ✅/❌ |
| Copy | Agreed copy requirements met; otherwise not assessed / not applicable | ✅/❌ |
| Info for dev | Behavior/conditions that Figma does not convey have been passed on (annotation in Figma, handoff doc, or the PO has been told to write them in the requirements) — if unsure, list the questions dev is likely to ask and have the user confirm they are covered | ✅/❌ |
| Open questions | No questions waiting on a PM/designer to answer | ✅/❌ |

Examples that Text overflow must catch: a long user name pushes the button off screen, an input with no character-limit counter, a 3-line notification breaks the card, Thai text with no spaces breaks lines awkwardly

##### Verdict criteria

In short: **Info = can send, Warning/Critical = cannot send yet**

- No problems found → 🟢 **READY** — can send to dev right away
- Only minor problems (🟢 Info) → 🟡 **READY WITH NOTES** — can send, but attach the notes for dev
- Real problems found (🔴 or 🟡) → 🔴 **NOT READY** — must fix first; list what needs fixing grouped by category

---

#### Report Format

Severity:
- 🔴 **Critical** — dev will definitely implement it wrong if not fixed
- 🟡 **Warning** — visual drift or UX that should be fixed before handoff
- 🟢 **Info** — notes that do not affect implementation

For each finding, state: node name / the problem / what it should be

**Every report must use this template exactly. Do not reorder it. Do not skip sections** — if a category has no findings, still show the heading and write "No issues found" instead of skipping it:

```markdown
## Design QA: [screen/flow name]
*(Follows Cariva DS / Does not follow Cariva DS)*

**What this screen does:** ...
**States found:** ...

### 🔴 Critical
[list or "No issues found"]

### 🟡 Warning
[always group by category, e.g. Copy, Interaction/Loading state, Edge case, DS Integration — put a short group heading before each group, do not dump everything into one list / or "No issues found"]

### 🟢 Info
[list or "No issues found"]

### ✅ Passed
- [what is correct]

---

## Handoff Readiness Gate
| Gate | Result |
|---|---|
[the full Gate table from above]

## Verdict: 🟢/🟡/🔴 [READY / READY WITH NOTES / NOT READY] — X Critical, Y Warning, Z Info

[1-2 line summary: what must be fixed first — required every time]
```

---

#### Rules

- Do not edit Figma during QA — report only
- If unsure about copy, flag it as 🟢 Info instead of deciding yourself
- If the UI has multiple screens, analyze one screen at a time
- If the context is unclear, state it in section 10; do not guess
- Before flagging a finding with severe impact (especially 🔴 Critical such as a data leak, security, privacy), always look at an actual screenshot of that frame to compare before concluding — never conclude from the data tree/JSON alone, because some layers (e.g. a show/hide password icon toggle) may not appear in a depth-limited structure scan. If the scan does not reach it, dig deeper or take a screenshot instead of asserting from what was not found

---

## Merged skill: Map a Figma component to the DS and fix it (formerly `map-fix`, merged 2026-11-27)

Original copy: `.skill-backups/2026-11-27-minimal/map-fix/`. The trigger phrases below still start this skill.

### Map & Fix — Cariva Design System

Use when the user says (Thai trigger phrases are kept so Thai-speaking users can still invoke it):

```text
map [name] node-id=[id]
fix [name] node-id=[id]
fix [name] node-id=[id]  (Thai: "แก้ [ชื่อ] node-id=[id]")
map [name] node-id=[id]  (Thai: "แมป [ชื่อ] node-id=[id]")
map-fix [name] node-id=[id]
```

#### Required Context

Before every map, read:
- `shadcn/DESIGN.md` — token names, typography scale
- `shadcn/tokens.json` — hex values and token mapping
- `shadcn/rules/components/{component name}.md` if it exists — source of truth for properties and variants
- The actual component code at `shadcn/src/lib/app/components/ui/{code-name}.tsx` and its stories — the props, variants and sizes that really exist
- `shadcn/docs/components/FIGMA-NAMING.md` — component name in Figma ↔ component name in code

#### Mapping Scope

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

#### Notes

- Inventory requested frames and work through the authorized scope. Ask which frame only when the target is genuinely ambiguous.
- Reuse unchanged audit evidence, but re-read the affected property before mutation under the binding evidence gate.

#### Rules

- Do not use tokens from an old design system.
- Do not use local styles when a shared style exists.
- Do not create new tokens or components by default — if what is needed does not yet exist in the DS, tell the user first
- Do not invent props or variants that the shadcn component in `shadcn/src/lib/app/components/ui/` does not have.
- If a component base is missing, or a needed variant/state is incomplete, tell the user what should be created before creating it.
- Continue fixes already authorized by the user; ask only for missing decisions or scope expansion. Read-only requests do not authorize fixes.
- Preserve visual intention unless the DS mapping requires a correction.

#### Output

When reporting results, state:

- What was mapped/fixed
- The related nodes
- Component names and property names that already match the code, and those that do not yet (with the correct names proposed)
- What is missing — components, variants, states, tokens, or styles not yet in the DS
- Questions before creating anything new in the DS
