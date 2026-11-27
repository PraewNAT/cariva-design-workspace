---
name: component-audit
description: "Audit Cariva React and shadcn component quality after creation or changes and before Core adoption or developer handoff. Check cross-surface visual consistency, contracts, tokens, state coverage, rendered robustness and accessibility with evidence; not duplicate discovery or Code\u2013Figma parity."
---

# Component Audit

## Project context and boundaries

Read the applicable AGENTS.md and [report format](references/report-format.md) before reporting. Resolve Product from the current task, selected board/files or previous choice; retain it through the task. Ask only when ambiguity affects the work. A cross-Core audit can use Core as scope without inventing a Product.

Prefer Core → current Product → accessible other Products. Use catalog and actual repository layout; core/ and products/ are planned conventions, not proof these folders exist. src/stories currently contains starter examples, not approved Core. If a catalog or Storybook is missing, inspect accessible local source and state the limitation rather than blocking all useful work.

For Storybook, retrieve the installed-version CLI skill instructions and documented IDs through available Storybook tools. Use the installed shadcn skill for its APIs/composition; use Impeccable for relevant rendered UI review when available, not as a mandatory dependency for every check. Do not install packages or connect external accounts merely to run a report.

Default to inspection/planning and a report. Creating a proposed case is not approval to implement it. If implementation/refactoring is already authorized by the user's task, continue within that scope without redundant approval. Before code mutation check the actual branch against the known collaborator branch; do not invent one, switch another person's branch or mutate the shared branch. If identity/branch is unknown, finish read-only work and request the missing assignment before writing code. Shared Core changes must disclose cross-Product impact. Do not merge, publish, delete branches, or start design-system version numbering. Keep tests and rendering checks proportional to changes and claims.

## Workflow

1. Identify target components, relevant Product themes, change scope and consumers. Read intended contract, props, variants, tokens, agreed cases and representative usage. For small edits review affected behavior and consumers, not the whole system repeatedly.
2. Check semantic tokens and Core composition, clear prop/variant contracts, valid combinations and relevant disabled/loading/error states. Confirm from requirements/usage which states apply; do not demand irrelevant states or require every numeric literal to be tokenized.
3. Inspect rendered stories or the real preview where accessible. Check long text, Thai text, missing data, supported viewport sizes and affected themes. Check keyboard/focus, appropriate semantics and accessible names; inspect contrast when visual evidence permits. Record what was actually exercised.
4. Run available focused Storybook interaction/accessibility tests and required project checks appropriate to authorized changes. Reuse the installed-version tooling and existing tests. Passing automated checks is not proof of complete accessibility or UX quality. Do not lower test rules or replace meaningful tests with easier cases to obtain a pass.
5. Check affected existing consumers/stories for regressions. Missing mocks or preview dependencies are validation gaps, not automatic component defects. If render/browser/tests cannot run, finish static checks and clearly mark the unverified dimensions ตรวจไม่ได้ (cannot check).
6. Report observable defects with reproduction evidence, severity and a focused action. Separate observations from inferences. Default audit is read-only for product code; apply fixes only when included in the task's authorization. Preserve the chosen visual direction, show shared-Core impact and verify fixes. Report failed checks and unresolved gaps rather than claiming completion.

## Report emphasis

Use ผ่าน (pass) / ต้องแก้ (needs fix) / ตรวจไม่ได้ (cannot check) for individual checks. Include tests/rendering actually run and the main gap in ขอบเขต (scope). Count distinct checks, not tool calls. The summary cannot say all passed while material checks remain unverified. Reuse & Duplicate Check owns duplicate consolidation; Code–Figma parity is outside this skill. Component Audit may note token misuse but should not redesign the system or rewrite its business rules.

## Cross-surface consistency

For UI creation or changes, trace the changed primitive into the affected page, modal/popover portal and composed trigger/close consumers. Compare the same semantic variant and size using computed styles: radius, height, horizontal padding, font family/size/weight/line-height, icon box/alignment and focus treatment. Different named sizes/variants are valid; do not flatten intentional variants or demand identical widths for different labels.

Inspect primitive recipes and consumer CSS together. A local override that fixes one modal while the page retains another recipe is not a system-wide fix. Prefer one shared primitive recipe and semantic tokens; remove conflicting per-screen recipes within authorized scope. Account for portal inheritance and wrappers that replace data-slot. Use stable component-owned markers (this project's Button uses data-ui="button") rather than relying exclusively on wrapper-overwritable slots.

Before completion, show affected variants/sizes and composed DialogTrigger/DialogClose in Storybook, exercise the relevant page + modal, and verify keyboard/focus behavior. Add focused regression coverage for demonstrated cross-surface failures when justified. A test that only reads the intended constant or checks that both import Button is insufficient. Compare actual rendered geometry/styles; report unrendered surfaces as ตรวจไม่ได้ (cannot check). State audited consumers and intentional exceptions in the existing report format. Default remains read-only unless implementation is authorized.
