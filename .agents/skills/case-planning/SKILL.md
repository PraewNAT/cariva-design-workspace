---
name: case-planning
description: "Plan and review UI cases from Cariva requirements, flows and existing logic before screen implementation or after requirement changes. Separate confirmed requirements, proposed edge cases and unanswered business rules; map agreed cases to stories or board coverage."
---

# Case Planning

## Project context and boundaries

Read the applicable AGENTS.md and [report format](references/report-format.md) before reporting. Resolve Product from the current task, selected board/files or previous choice; retain it through the task. Ask only when ambiguity affects the work. A cross-Core audit can use Core as scope without inventing a Product.

Prefer Core → current Product → accessible other Products. Use catalog and actual repository layout; core/ and products/ are planned conventions, not proof these folders exist. src/stories currently contains starter examples, not approved Core. If a catalog or Storybook is missing, inspect accessible local source and state the limitation rather than blocking all useful work.

For Storybook, retrieve the installed-version CLI skill instructions and documented IDs through available Storybook tools. Use the installed shadcn skill for its APIs/composition; use Impeccable for relevant rendered UI review when available, not as a mandatory dependency for every check. Do not install packages or connect external accounts merely to run a report.

Default to inspection/planning and a report. Creating a proposed case is not approval to implement it. If implementation/refactoring is already authorized by the user's task, continue within that scope without redundant approval. Before code mutation check the actual branch against the known collaborator branch; do not invent one, switch another person's branch or mutate the shared branch. If identity/branch is unknown, finish read-only work and request the missing assignment before writing code. Shared Core changes must disclose cross-Product impact. Do not merge, publish, delete branches, or start design-system version numbering. Keep tests and rendering checks proportional to changes and claims.

## Workflow

1. Read available requirements, flow, relevant logic and existing case/story definitions. Preserve the selected Product. Identify actors, actions, transitions, data conditions and supported viewport/theme requirements without assuming business rules.
2. Identify meaningful cases for applicable loading, loaded, empty, no search results, error/retry, validation, success, permission/role, long or missing data and responsive behavior. Consider only relevant states; do not generate the Cartesian product of every variant and viewport.
3. Label each case ยืนยันแล้ว (explicit requirement or confirmed decision), เสนอเพิ่ม (reasoned recommendation) or ต้องถาม (unresolved rule). Existing code is evidence of current behavior, not proof of approved requirements. Never invent role permissions, eligibility, timings or backend outcomes.
4. For each case retain a clear name, source/rationale, actor/precondition, action if applicable, observable expected result, realistic mock data and a direct way to preview it. Reuse existing stable IDs. New IDs are proposed until implementation is authorized; a duplicated case must not reuse another case's identity.
5. Compare the agreed list with accessible stories/board cases. Record มีแล้ว only when the corresponding implementation is found; distinguish existence from a successful render/test. Mark missing, unavailable or unverified coverage honestly. Avoid demanding a case already covered by an equivalent fixture.
6. Prioritize questions that affect business behavior. Continue planning independent cases while awaiting answers. If the original task authorizes implementation, implement confirmed cases within scope; do not silently turn proposals into product requirements.

## Report emphasis

Use รายการ for a short case name and expected outcome, หลักฐาน for requirement/current behavior/proposal rationale, and ถัดไป for mock/preview coverage or one decision needed. Keep the full reasoning out of the chat report. Summarize certainty counts separately from implementation coverage. Do not declare ทุกเคสครบ; qualify completeness against the agreed requirements and available evidence. Report layout/accessibility defects through Component Audit rather than changing business requirements to fit current UI.
