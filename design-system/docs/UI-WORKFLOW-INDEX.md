# UI workflow index

Note from 25 November 2026, shared by both Codex and Claude. The details are kept in the owning files so that there are not multiple duplicate sets of rules.

| Flow discussed | Where to read |
|---|---|
| Overview of every flow with step codes and decision points | [Workflow map](../rules/workflow-map.md) |
| Start a new project, with the AI guiding step by step, plus a copyable skeleton | [New project guide](../rules/new-project-guide.md) / [Portable template](../deliverables/design-prototype-project/README.md) |
| Set up a Product with 4 fields of information, stored separately and reused without asking again | [Product setup](../rules/product-setup-flow.md) / [Product list](products/README.md) |
| Take on work, choose the workspace/Product and start | [UI workflow](../rules/ui-workflow.md#practical-guide-choosing-work-and-projects) |
| Create new UI: cases → reuse → implement → docs → test → audit | [Steps 1–7](../rules/ui-workflow.md) |
| Revisions, bugs, refactors, reverting, experiments and pausing work | [Revision work](../rules/ui-workflow.md#practical-guide-when-there-is-a-revision-request) |
| Multiple Products, multiple repositories and editing Core together | [Choosing a project](../rules/ui-workflow.md#practical-guide-choosing-work-and-projects) |
| Codex/Claude continuing each other's work, splitting work and handoff | [Handoff and work status](../rules/ui-workflow.md#handoff-notes-and-work-status) |
| Examples of how to give instructions and where to ask | [Example instructions](../rules/ui-workflow.md#examples-of-how-to-give-instructions) |
| Edit a component in Figma and have the code follow | [Figma component → Code](../rules/figma-component-to-code-flow.md) |
| Take a component/screen from code to Figma, separating the DS from the design file | [Code → Design](../rules/code-to-design-flow.md) |
| Change variables in Figma and trace the impact | [Variable change flow](../rules/figma-variable-change-flow.md) |
| Take in a component from outside and adapt it to fit the DS | [Component adoption](../rules/component-adoption-flow.md) |
| See, in Thai swimlane diagrams, what the designer and the AI each do for common instructions (add/change a component via Figma or AI, code ↔ Figma, variables, new Product, audit, git) | Storybook `Workflows` folder (source: `src/lib/features/workflows/`) |

The main rules are in the [Shared agent rules](../rules/agent-rules.md), with AGENTS.md and CLAUDE.md pointing to the same single set of rules. Flowcharts are Mermaid in Markdown, with step text so they can be read even when not rendered. This document does not start implementation, sync, publishing or automation, and the Login board/URL matter remains on hold
