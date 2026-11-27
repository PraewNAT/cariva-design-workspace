# Send to another AI

This kit is a set of instructions to adapt for use in an existing or new project. It does not install a DS, skills or the Figma MCP, and it contains no code/colors/fonts/URLs from the originating company.

## Message you can copy and send

> Read README.md, rules/project-guide.md and rules/workflow-map.md in this kit first. My project may already have DS code and existing rules, so inspect what exists and propose a merge of the rules that preserves the existing instructions, without overwriting whole files. The goal is to use AI to assemble a web prototype from the components that exist, so I can click through and test it and check responsiveness. When I approve and order it, assemble editable frames in Figma with components from the DS. And when I send a Figma design to implement, use the existing code components first. Guide me step by step, ask only for the information that is missing, check which tools are actually accessible, and do not build the whole component set in advance.

## Information I am attaching

```yaml
Product name:
Central Figma DS URL:
Product Figma DS URL: central only / not yet created / URL
Screen-design Figma file URL: not yet created / URL
```

- Give the AI access to the real repository/folder, or attach package.json and the file structure if it cannot be accessed yet
- Attach DESIGN.md and AGENTS.md / CLAUDE.md / any existing rules; do not replace them with the template automatically
- Attach the Storybook URL or the list of components/docs that exist, if known
- You can state the work you want to start and any known restrictions right away. The AI must remember them and not ask again when setup ends

## What the AI must do before starting UI

1. Summarize the objective and how it differs from the existing rules, and report any conflicts
2. Read the Product records, ask only for the fields still missing, and store each Product separately
3. Inspect the code base (e.g. MUI/shadcn/Ant/custom), tokens, docs, Storybook, skills and Figma access from real evidence
4. Prepare only the missing scaffolding and summarize readiness before asking for the first screen as the final step of setup
5. Plan the cases and reuse, then implement/test/document/audit according to the scope

If you want a Canvas that lays out multiple pages/cases with flow lines and zoom/pan, without a panel for editing the design, say so. For rules on color, fonts, size and geometry, read them from the destination company's DS

## Handing work back between AIs

Use TASK-HANDOFF.md and fill in the real status. Do not send credentials or claim that the other AI's tools are installed and ready

## How to get the AI to follow the flow

Start by naming the flow and the current step code, and use the table as the pass criteria for each step. If a step is skipped, cite evidence that the work already exists. Do not read "has documentation" as "implemented/tested". Show Mermaid when explaining the overview, and keep the real results in the handoff
