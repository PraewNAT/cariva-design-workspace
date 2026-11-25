# Shared project bootstrap

อ่าน [Workflow map](workflow-map.md) ก่อนเริ่ม: แผนภาพและตารางในไฟล์นั้นกำหนดลำดับ จุดถาม และเกณฑ์จบงาน รายละเอียดในไฟล์นี้ใช้ประกอบขั้นที่เกี่ยวข้อง ไม่ใช่ flow อีกชุด

This is a portable starting point for Codex and Claude, not a preinstalled app, DS or collection of skills. Guide the designer step by step. Do not invent project facts or require a full technical brief at setup.

## Objective

Use code as an interactive design prototype with realistic mock data and responsive behavior. Production developer adoption is optional. If requested after prototype approval, compose editable Figma frames using the target DS's actual components. If given a Figma design to implement, reuse existing code DS components first. Do not assume any particular brand, stack, typography, token values or viewport widths from the project this template came from.

## Onboarding stages

1. Inspect the current workspace and its existing rules/source. Determine whether this is a new Product in an existing workspace or a new repository. Ask only if ambiguous; never scaffold over existing work.
2. Read `docs/products/README.md` and existing Product records before asking. Collect only these four setup fields, preserving confirmed missing/central-only statuses:

```yaml
ชื่อ Product:
Figma DS กลาง URL:
Figma DS Product URL: # ใช้ของกลางอย่างเดียว / ยังไม่มี / URL
Figma ไฟล์ออกแบบหน้าจอ URL: # ยังไม่มี / URL
```

3. Store each real Product in `docs/products/<product-id>/PRODUCT.md`, with the four user fields and separately dated access/verification metadata. Index links only in README. Do not create fictional Product records, store credentials, or use a global active-Product file shared by collaborators. Ask only for missing/conflicting data; “ยังไม่มี” is a known status, not permission to create files in Figma.
4. Inspect available code DS, component docs, tools, skills and Figma access. Report available/missing/unverified honestly. Do not silently install dependencies, connect accounts or treat URLs as verified mappings. If the central DS does not exist yet, ask which foundation to use before inventing one.
5. Complete the setup phase before asking for the first screen: confirm the implementation base; inspect/prepare DESIGN.md and the tokens/theme structure from the selected company DS; reuse or prepare the component/docs/Storybook/mapping scaffolding. Resolve necessary unclear foundation decisions now. Do not implement the whole library, fabricate token values or treat empty scaffolding as completed components. Work within authorization for scaffold/dependency changes. Then summarize what is ready, missing or unverified. Only as the final setup step ask which first screen/flow to work on and whether AI should design it or implement existing Figma. If the user already specified it, retain that answer instead of asking again. Collect audience/purpose/business behavior when starting that design task, and implement only its needed component slice.
6. Find reusable components, plan relevant cases, separate confirmed requirements from proposals and unresolved business rules, and outline the scoped work. Prefer existing component or composition. If a new one is needed, recommend shared Core or Product-specific scope with reasons; ask only if the choice is not established.
7. Implement the authorized prototype using actual project contracts/tokens and installed skills. Before UI work, read available mandatory story/UI skill instructions. Add/update relevant docs/stories, exercise meaningful behavior, render the affected views, and audit. Discover actual check commands from project configuration. Report missing validation, not fabricated passes; do not claim full accessibility from passing interactions.
8. Show the prototype and accept revisions; preserve prior constraints. Only write to Figma when requested. Resolve a confirmed destination URL before creating components/frames, reuse established destinations, inspect existing Figma parts before adding new ones, and verify instance linkage/tokens/layout/parity afterward. Explain unsupported states or responsive behavior. Confirm this project's representative viewport policy without guessing widths.
9. Keep task handoff separate from Product setup: target paths, constraints, source changes, checks performed, blockers and next step. Resume from source evidence rather than assuming another AI's memory. Avoid concurrent edits to the same files. Stop paused work; do not publish, delete legacy or start release numbering merely from a design request.

## Communicate one step at a time

At each stage state where we are, what is needed from the user, and what happens next. Do independent authorized work while awaiting nonblocking details; do not proceed on dependent work without required answers. Preserve explicit user decisions within system/tool policies. Missing tools or permission denials are not authorization to bypass them.

## Establish project-specific rules progressively

When actual code/DS exists, document its source paths, tokens, component contracts, docs/tests and Figma mappings in this workspace. Use the included specialist workflow files and adapt actual paths/checks as the foundation becomes known. Reference them rather than duplicating rules across AGENTS.md and CLAUDE.md. Skills and tools still require discovery; do not claim they are installed.


## Specialist workflows included in this template

Read `rules/ds-foundation.md` during readiness/setup and before initial DS implementation; it owns the distinction between company DS and code base (MUI/shadcn/Ant/custom). Read `rules/ui-workflow.md` for UI creation/revision and `rules/figma-workflows.md` for either Figma direction or variable changes. Read `rules/skills-and-reporting.md` to discover installed capabilities and report evidence consistently. These files are included instructions, not installed tools. Prepare only the components/docs/tokens required for the first selected screen, then grow incrementally; never build the full library before starting.

## Authority and authorization

Code is a designer-facing prototype; its implementation stack need not match a future production app. Figma DS is the approved visual reference, code is evidence of implemented behavior, and current user decisions govern intended changes. If they conflict, inspect and report the difference; do not guess which artifact is newer or overwrite either direction automatically.

Prototype approval does not authorize Figma writes, deployment, publishing libraries, deleting legacy, changing stacks or release numbering. Continue routine authorized edits without repeated permission questions; ask only for unresolved scope/destination or consequential changes beyond the task.

Use one shared ruleset through these two entry points. Preserve company-specific rules and inspect existing instructions before merging. Instructions do not install skills, MCP connections, dependencies or background automation.
