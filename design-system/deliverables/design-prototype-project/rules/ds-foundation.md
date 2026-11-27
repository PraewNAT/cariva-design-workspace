# Prepare the selected company's DS

Read the [Workflow map](workflow-map.md) before starting: the diagrams and tables in that file define the order, the decision points and the exit criteria. The details in this file support the relevant steps and are not another flow.

Read project-guide.md first. This file owns DS discovery and incremental implementation, not a fixed brand or library.

## Distinguish design authority and implementation base

Company Figma DS defines approved visuals. MUI, shadcn/ui, Ant Design or custom code is the implementation base; neither replaces the other. After the four-field setup, inspect package/config/imports first. If no base is confirmed, ask: “Do you already have DS code, and which component base would you like to use, e.g. MUI, shadcn, Ant Design, or would you like a recommendation?” (Thai: “มีโค้ด DS เดิมไหม และอยากใช้ฐาน component อะไร เช่น MUI, shadcn, Ant Design หรือให้ช่วยแนะนำ?”) This is a later readiness decision, not a fifth required field in initial setup. Offer an evidence-based recommendation if the designer is unsure; do not choose silently or migrate an existing stack. Record the chosen base/version and its actual entry paths separately from the four user fields. Stack changes do not imply permission to replace approved Figma styles.

## Inventory before implementation

Inspect available Figma/code/docs first. Record present, missing or inaccessible for visual guidance, tokens/theme, components, stories, docs, mappings, preview and checks. Ask for existing source access only if needed; having no code is valid and leads to a proposed prototype foundation. Do not copy another company's proprietary code/assets into this project by default.

## Setup completion gate

Before asking for the first screen/flow, establish the approved visual guidance and tokens/theme scaffold plus component/docs/Storybook/mapping structure, reusing existing artifacts. Ask about unresolved foundation decisions at this stage. Summarize readiness and blockers before inviting the designer to choose a first screen. This gate requires an honest setup status, not a complete component library or permission to install everything. If a first task was supplied earlier, retain it while completing setup.

## After setup: prepare only what the first task needs

1. Choose the first screen/flow and inspect its actual primitives and compositions.
2. Establish source provenance for relevant color, type, spacing, geometry, icons and states. Write DESIGN.md from observed/approved rules; mark gaps rather than inventing a complete DS.
3. Map required tokens/theme to the chosen implementation base. Retain variable IDs/modes/aliases when accessible. Separate foundation values, semantic roles and Product overrides. Do not hand-edit generated files or claim every variable type has a mapping if it does not.
4. Reuse existing code components and documents first. Compare equivalent role/variant/size and preserve implementation contracts. Missing functionality requires a reasoned proposal, not a duplicate lookalike.
5. For new parts recommend shared Core or Product scope with a reason; ask only if unclear. Implement and document the approved subset incrementally.
6. Provide Storybook for reusable UI examples/source/state coverage when appropriate to the chosen stack. Inspect existing installation/config first. Propose necessary setup, reuse authorization already given, and do not fabricate tool availability.
7. Record Figma-to-code mapping using real file/node/component paths. Code Connect is optional; metadata alone is not sync.
8. Test and audit the implemented slice before expanding. Do not build an entire company's library as onboarding work.

## Component documentation contract

Update the existing appropriate Markdown/Storybook destination. A separate Markdown file per tiny component is not mandatory. Every implemented reusable component needs discoverable documentation covering actual supported props/variants, anatomy when useful, relevant states, theme/token references, usage/source example, behavior/accessibility expectations and known gaps, proportional to complexity. Describe implemented behavior separately from Figma-only proposals. Never invent props or declare parity from name matching.

## Workspace artifacts to establish as needed

- DESIGN.md: approved visual rules, sources and unresolved items.
- Actual tokens/theme and code source in the chosen stack's existing conventions.
- Component inventory/mapping and discoverable docs/stories.
- Product-specific themes/compositions separated from Core; Core must not import Product business logic.
- Runnable prototype, realistic synthetic fixtures and meaningful behavior tests.
- Task handoff and verification evidence. None of these files exists merely because a template mentions them.
