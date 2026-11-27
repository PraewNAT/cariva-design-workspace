---
name: design-review
description: QA a screen or flow in Figma before handoff, on request. Does not replace the code component-audit or case-planning
---

## Scope per the latest plan

Read AGENTS.md and rules/skill-routing.md before use. The latest rules override any older steps that conflict. This skill does not allow publishing, pushing, deploying, or starting version numbers automatically. Take external actions only when the user has actually assigned them.


# Design QA

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

## Required Context

- Read `shadcn/DESIGN.md` — tone of voice and brand principles
- Read `shadcn/tokens.json`
- Inspect the target node in Figma before starting

---

## Pre-flight (do this before every QA)

0. **Ask the user first: "Does this file follow Cariva DS?"**
   - If **yes** → QA every category
   - If **no** → skip the entire DS Integration category (token binding, font, component naming, the Token gate) — leave only the UX-level QA
1. Automatically pull the children of the node you were given
2. List the names of all frames/states found, e.g. Default, Loading, Error, Empty, Session Expired
3. QA against this state list — do not flag a state that is already in the list as missing
4. Flag only states that are not in the list and should exist for the real use case

---

## Before starting the analysis

Answer these 2 questions to yourself first:

1. What does this screen do? What outcome does the user want?
2. What data flows in and out of the flow?

---

## QA Scope

### 1. Missing states
Compare against the state list from Pre-flight — flag only those truly missing for the use case, e.g. Empty, Loading, Error, Success, Disabled

### 2. Data edge cases
Very short / very long text, numbers that are 0 / negative / over a limit, an empty list / a single item / more items than fit on the page

### 3. Error & Recovery
For each action, if it fails, does the user know what happened and what they can do next?

### 4. Permission & Access
Are there states that some users see differently? For example read-only, no permission, locked account

### 5. Interaction edge
Rapid repeated taps, submitting while loading, leaving the page midway, going back after a successful action

### 6. DS Integration
- Fill/stroke bound with a semantic token (no hardcoded hex)
- Spacing bound with `spacing/*`
- Typography uses a `typography/*` text style
- Radius bound with `radius/*`
- Uses components from Cariva DS — does not build a custom frame instead

### 7. Layout & Alignment
- Alignment is consistent within the same section
- Spacing between components is consistent
- The grid is correct — no element is cut off outside its container

### 8. Error states must have a message
- An error state has a message saying what happened, not just a color change
- (Deeper accessibility such as contrast ratio and touch target is already checked at the component level — do not re-check at the screen level. If you happen to see a clearly wrong spot, you may note it as 🟢 Info, but it does not count toward the verdict)

### 9. Copy & Tone
- Direct and specific
- Error messages say what happened and what to do next
- Placeholder is a hint — not a substitute for a label
- No placeholder content (Lorem ipsum, "Label", "Description")

### 10. Questions before dev picks up the work
Anything still unclear that must be asked of the designer or PM before dev starts

### 11. Naming
- Check only the main page/frame names (the state level that is handed off to dev) — names must be meaningful, not "Frame 123" or "Untitled"
- Do not check the sub-layers inside each frame

---

## How to explain every finding (important)

Write so that a designer who does not work with code can understand immediately — do not use dev/technical jargon without translating it:

- Do not just say "token not bound" or "wrong spec" — say **why it matters from a design perspective**, e.g. it conveys the wrong meaning, looks inconsistent with other screens, users may be confused
- Put technical token/values (e.g. `radius/sm`, hex code) only as reference at the end of the sentence, not as the main point of the finding
- Use the format: **[what you see] → [why it should not be this way from a design/UX perspective] → (token reference in parentheses if needed)**
  - Example instead of saying: "The Back button is not bound to `radius/sm` (8px)"
  - Say: "The Back button is fully rounded (pill-shaped), unlike the system-wide standard button which has rounded corners — it will look like it belongs to a different set (the standard button spec uses radius 8px)"
- If a finding concerns a token/color, explain it as "this color should be used when..." instead of the variable name directly

## Handoff Readiness Gate

After analyzing every item, summarize as a pass/fail checklist — answering one question: **"Can this be sent to dev yet?"**
Use the results from the QA Scope already analyzed — do not re-check

| Gate | Pass criteria | Result |
|---|---|---|
| Naming | Main page/frame names (state level) are meaningful | ✅/❌ |
| Token | No hardcoded hex/px — tokens fully bound *(skip if the file does not follow Cariva DS)* | ✅/❌ |
| States | Every state for the use case is present (from the Pre-flight list) | ✅/❌ |
| Edge cases | Empty / loading / error are covered | ✅/❌ |
| Text overflow | Everywhere that shows user or system text, it is defined what happens when the text is too long (truncate / wrap to a new line / scroll) and the layout does not break with the longest text | ✅/❌ |
| Copy | No placeholder content, error messages complete | ✅/❌ |
| Info for dev | Behavior/conditions that Figma does not convey have been passed on (annotation in Figma, handoff doc, or the PO has been told to write them in the requirements) — if unsure, list the questions dev is likely to ask and have the user confirm they are covered | ✅/❌ |
| Open questions | No questions waiting on a PM/designer to answer | ✅/❌ |

Examples that Text overflow must catch: a long user name pushes the button off screen, an input with no character-limit counter, a 3-line notification breaks the card, Thai text with no spaces breaks lines awkwardly

### Verdict criteria

In short: **Info = can send, Warning/Critical = cannot send yet**

- No problems found → 🟢 **READY** — can send to dev right away
- Only minor problems (🟢 Info) → 🟡 **READY WITH NOTES** — can send, but attach the notes for dev
- Real problems found (🔴 or 🟡) → 🔴 **NOT READY** — must fix first; list what needs fixing grouped by category

---

## Report Format

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

## Rules

- Do not edit Figma during QA — report only
- If unsure about copy, flag it as 🟢 Info instead of deciding yourself
- If the UI has multiple screens, analyze one screen at a time
- If the context is unclear, state it in section 10; do not guess
- Before flagging a finding with severe impact (especially 🔴 Critical such as a data leak, security, privacy), always look at an actual screenshot of that frame to compare before concluding — never conclude from the data tree/JSON alone, because some layers (e.g. a show/hide password icon toggle) may not appear in a depth-limited structure scan. If the scan does not reach it, dig deeper or take a screenshot instead of asserting from what was not found
