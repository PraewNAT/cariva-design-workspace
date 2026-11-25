---
name: component-reuse-check
description: "Find reusable Cariva Core and Product components before UI implementation and review changed code for duplicate components or hand-built equivalents. Use for reuse checks during component or screen work; not a general quality or Figma parity audit."
---

# Component Reuse & Duplicate Check

## Project context and boundaries

Read the applicable AGENTS.md and [report format](references/report-format.md) before reporting. Resolve Product from the current task, selected board/files or previous choice; retain it through the task. Ask only when ambiguity affects the work. A cross-Core audit can use Core as scope without inventing a Product.

Prefer Core → current Product → accessible other Products. Use catalog and actual repository layout; core/ and products/ are planned conventions, not proof these folders exist. src/stories currently contains starter examples, not approved Core. If a catalog or Storybook is missing, inspect accessible local source and state the limitation rather than blocking all useful work.

For Storybook, retrieve the installed-version CLI skill instructions and documented IDs through available Storybook tools. Use the installed shadcn skill for its APIs/composition; use Impeccable for relevant rendered UI review when available, not as a mandatory dependency for every check. Do not install packages or connect external accounts merely to run a report.

Default to inspection/planning and a report. Creating a proposed case is not approval to implement it. If implementation/refactoring is already authorized by the user's task, continue within that scope without redundant approval. Before code mutation check the actual branch against the known collaborator branch; do not invent one, switch another person's branch or mutate the shared branch. If identity/branch is unknown, finish read-only work and request the missing assignment before writing code. Shared Core changes must disclose cross-Product impact. Do not merge, publish, delete branches, or start design-system version numbering. Keep tests and rendering checks proportional to changes and claims.

## Workflow

1. Identify pre-write discovery, post-write duplicate review, or both. Read the relevant requirement and changed files; if Git history is unavailable use task-known files and state the comparison limit. Do not scan the entire repository blindly.
2. Search the catalog, documented Storybook components and relevant source for candidates. Search by purpose and behavior as well as name. Follow imports to establish whether the code uses the real shared implementation rather than a lookalike.
3. Compare props, states, composition, accessibility behavior and theming. A similar appearance or name is not proof of equivalence. Report an exact reusable candidate with its source and usage evidence, or explain the gap.
4. Prefer existing component → composition → appropriate variant/extension → new Product component with a reason. A domain-specific wrapper such as PatientCard built from Core Card is legitimate reuse, not automatically a duplicate. Product B code is a candidate for review/promotion, not permission to import its internals into A; respect ownership and dependency direction.
5. After implementation, inspect added/changed components and inline markup for duplicate behavior, including renamed copies and ad hoc replacements of an available shared component. Do not equate every literal value with a defect; flag token drift only when a relevant token exists and should apply.
6. Recommend a focused replacement, extension or justified separation. Do not silently consolidate components or change public props. When an authorized fix is made, verify affected stories/consumers and distinguish fixed findings from remaining ones.

## Report emphasis

Each action row identifies the new/changed implementation and the existing candidate. Include searched scope and inaccessible Products in ขอบเขต. State ไม่พบของซ้ำในขอบเขตที่ตรวจ rather than claiming repository-wide uniqueness without evidence. Delegate broader robustness/accessibility defects to Component Audit and avoid duplicate findings.
