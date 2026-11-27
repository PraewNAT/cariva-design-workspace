---
name: component-reuse-check
description: "Find reusable Cariva Core and Product components before UI implementation, review changed code for duplicate components or hand-built equivalents, and plan/review UI cases from requirements (formerly case-planning): separate confirmed requirements, proposed edge cases and unanswered business rules, and map agreed cases to stories."
---

# Component Reuse & Duplicate Check

> Workflow fit: used at step(s) S3 (check the foundation), U2 (lay out the cases), C1–C2 (search what exists, propose the scope), F2 (find the code mapping), D3 in `design-system/rules/workflow-map.md` (see the Skill column of each flow table). Load it when that step starts.

## Project context and boundaries

Read the applicable AGENTS.md and [report format](references/report-format.md) before reporting. Resolve Product from the current task, selected board/files or previous choice; retain it through the task. Ask only when ambiguity affects the work. A cross-Core audit can use Core as scope without inventing a Product.

Prefer Core → current Product → accessible other Products. Use catalog and actual repository layout; core/ and products/ are planned conventions, not proof these folders exist. src/stories currently contains starter examples, not approved Core. If a catalog or Storybook is missing, inspect accessible local source and state the limitation rather than blocking all useful work.

For Storybook, retrieve the installed-version CLI skill instructions and documented IDs through available Storybook tools. Use the installed shadcn skill for its APIs/composition; use Impeccable for relevant rendered UI review when available, not as a mandatory dependency for every check. Do not install packages or connect external accounts merely to run a report.

Default to inspection/planning and a report. Creating a proposed case is not approval to implement it. If implementation/refactoring is already authorized by the user's task, continue within that scope without redundant approval. Before code mutation check the actual branch against the known collaborator branch; do not invent one, switch another person's branch or mutate the shared branch. If identity/branch is unknown, finish read-only work and request the missing assignment before writing code. Shared Core changes must disclose cross-Product impact. Do not merge, publish, delete branches, or start design-system version numbering. Keep tests and rendering checks proportional to changes and claims.

## Workflow

### Product ownership — user decision, 2026-11-26

Before choosing implementation paths or Storybook titles, check ownership from the user's instruction, saved Product mappings and relevant Figma section/description. A component in a shared Core Figma file, or with a `crv-` name, can still belong to a Product. Do not infer ownership solely from sample patient data or visual similarity. Ask only if unresolved ownership affects placement; reuse confirmed decisions.

For components owned by any Product, separate them from Core and other Products from the start. Reuse the saved Product id, display name and existing folder conventions. In the active shadcn workspace:

- Keep source, component-specific styles, stories and assets under `shadcn/src/lib/products/<product-id>/components/`; use Storybook `Products/<ProductName>/Components/<Component>` rather than adding Product scenarios to a Core group.
- Compose/import shared Core primitives from the owning Product. Core must not import Product internals; one Product must not silently depend on another Product's internals. Do not copy Core implementations or promote Product behavior into Core merely to simplify imports.
- Keep contracts/audits and actual node-to-source mappings under `shadcn/docs/products/<product-id>/`, reusing the Product's existing mapping (for example `FIGMA-MAPPING.json`). Follow the document skill for Markdown, Storybook and mapped Figma docs; ownership, paths, groups and links must agree. Core docs may link to Product docs but must not present Product components as Core. Keep Figma Product documentation separate and use the existing Document Template. This rule does not independently authorize Figma writes or publication.
- When correcting a mixed-in component within authorized scope, move its existing implementation/assets/stories, update consumers and documentation references (including Figma source descriptions when authorized), preserve public behavior and linked specimens, and verify affected Core/Product stories. Do not leave a Core re-export that creates a Core-to-Product dependency.

Mira is an example, not an exception: use `shadcn/src/lib/products/mira/components/`, `Products/Mira/Components/<Component>` and `shadcn/docs/products/mira/`. Credit Badge (compact and remaining/used sets) and Credit Tooltip are confirmed Mira Product DS. Consult saved mappings for current nodes; their old Core Progress/Tooltip location does not establish ownership. Apply the same separation to every other Product using its own id/name.

1. Identify pre-write discovery, post-write duplicate review, or both. Read the relevant requirement and changed files; if Git history is unavailable use task-known files and state the comparison limit. Do not scan the entire repository blindly.
2. Search the catalog, documented Storybook components and relevant source for candidates. Search by purpose and behavior as well as name. Follow imports to establish whether the code uses the real shared implementation rather than a lookalike.
3. Compare props, states, composition, accessibility behavior and theming. A similar appearance or name is not proof of equivalence. Report an exact reusable candidate with its source and usage evidence, or explain the gap.
4. Prefer existing component → composition → appropriate variant/extension → new Product component with a reason. A domain-specific wrapper such as PatientCard built from Core Card is legitimate reuse, not automatically a duplicate. Product B code is a candidate for review/promotion, not permission to import its internals into A; respect ownership and dependency direction.
5. After implementation, inspect added/changed components and inline markup for duplicate behavior, including renamed copies and ad hoc replacements of an available shared component. Do not equate every literal value with a defect; flag token drift only when a relevant token exists and should apply.
6. Recommend a focused replacement, extension or justified separation. Do not silently consolidate components or change public props. When an authorized fix is made, verify affected stories/consumers and distinguish fixed findings from remaining ones.

## Report emphasis

Each action row identifies the new/changed implementation and the existing candidate. Include searched scope and inaccessible Products in ขอบเขต (scope). State ไม่พบของซ้ำในขอบเขตที่ตรวจ (no duplicates found in the checked scope) rather than claiming repository-wide uniqueness without evidence. Delegate broader robustness/accessibility defects to Component Audit and avoid duplicate findings.

---

## Merged skill: Case planning (formerly `case-planning`, merged 2026-11-27)

Original copy: `.skill-backups/2026-11-27-minimal/case-planning/`. The trigger phrases below still start this skill.

### Case Planning

#### Project context and boundaries

Read the applicable AGENTS.md and [report format](references/report-format.md) before reporting. Resolve Product from the current task, selected board/files or previous choice; retain it through the task. Ask only when ambiguity affects the work. A cross-Core audit can use Core as scope without inventing a Product.

Prefer Core → current Product → accessible other Products. Use catalog and actual repository layout; core/ and products/ are planned conventions, not proof these folders exist. src/stories currently contains starter examples, not approved Core. If a catalog or Storybook is missing, inspect accessible local source and state the limitation rather than blocking all useful work.

For Storybook, retrieve the installed-version CLI skill instructions and documented IDs through available Storybook tools. Use the installed shadcn skill for its APIs/composition; use Impeccable for relevant rendered UI review when available, not as a mandatory dependency for every check. Do not install packages or connect external accounts merely to run a report.

Default to inspection/planning and a report. Creating a proposed case is not approval to implement it. If implementation/refactoring is already authorized by the user's task, continue within that scope without redundant approval. Before code mutation check the actual branch against the known collaborator branch; do not invent one, switch another person's branch or mutate the shared branch. If identity/branch is unknown, finish read-only work and request the missing assignment before writing code. Shared Core changes must disclose cross-Product impact. Do not merge, publish, delete branches, or start design-system version numbering. Keep tests and rendering checks proportional to changes and claims.

#### Workflow

1. Read available requirements, flow, relevant logic and existing case/story definitions. Preserve the selected Product. Identify actors, actions, transitions, data conditions and supported viewport/theme requirements without assuming business rules.
2. Identify meaningful cases for applicable loading, loaded, empty, no search results, error/retry, validation, success, permission/role, long or missing data and responsive behavior. Consider only relevant states; do not generate the Cartesian product of every variant and viewport.
3. Label each case ยืนยันแล้ว (confirmed: explicit requirement or confirmed decision), เสนอเพิ่ม (proposed addition: reasoned recommendation) or ต้องถาม (needs an answer: unresolved rule). Existing code is evidence of current behavior, not proof of approved requirements. Never invent role permissions, eligibility, timings or backend outcomes.
4. For each case retain a clear name, source/rationale, actor/precondition, action if applicable, observable expected result, realistic mock data and a direct way to preview it. Reuse existing stable IDs. New IDs are proposed until implementation is authorized; a duplicated case must not reuse another case's identity.
5. Compare the agreed list with accessible stories/board cases. Record มีแล้ว (exists) only when the corresponding implementation is found; distinguish existence from a successful render/test. Mark missing, unavailable or unverified coverage honestly. Avoid demanding a case already covered by an equivalent fixture.
6. Prioritize questions that affect business behavior. Continue planning independent cases while awaiting answers. If the original task authorizes implementation, implement confirmed cases within scope; do not silently turn proposals into product requirements.

#### Report emphasis

Use รายการ (item) for a short case name and expected outcome, หลักฐาน (evidence) for requirement/current behavior/proposal rationale, and ถัดไป (next) for mock/preview coverage or one decision needed. Keep the full reasoning out of the chat report. Summarize certainty counts separately from implementation coverage. Do not declare ทุกเคสครบ (all cases complete); qualify completeness against the agreed requirements and available evidence. Report layout/accessibility defects through Component Audit rather than changing business requirements to fit current UI.
