# Cariva Design System / React + shadcn

Active stack: React19, Vite8, Tailwind4, shadcn Base UI, Storybook10 and Chart.js

- Getting started and handoff to Dev: [SHADCN-START](docs/handoff/SHADCN-START.md)
- Actual structure, mappings and limitations: [SHADCN-MIGRATION](SHADCN-MIGRATION.md)
- Design rules: [DESIGN.md](DESIGN.md)
- Shared AI rules: [Shared agent rules](rules/agent-rules.md); [AGENTS.md](AGENTS.md) for Codex and [CLAUDE.md](CLAUDE.md) for Claude Code read the same single set of rules
- Order of work for building/editing UI: [UI workflow](rules/ui-workflow.md)
- Order of steps and decision gates for every flow: [Workflow map](rules/workflow-map.md)
- Component and property names: Figma ↔ code: [FIGMA-NAMING](docs/components/FIGMA-NAMING.md)
- Canvas (Figma-style frame board): [sync/README](../sync/README.md)
- Next-phase plan: DESIGN-SYSTEM-PLAN.md
- Running source: src/lib; the previous MUI code lives in `legacy/mui/` at the repo root as a reference and is not imported into new work

`npm run dev` opens a short blank page (the Lab/Dashboard pages no longer exist); `npm run storybook` (port 6006) opens the catalog, Foundations, components and Canvas (Workspace/Canvas) with source code

Run `npm run tokens:generate` after editing a token source; run `npm run tokens:check`, `npm run build`, `npm run build-storybook` and the Storybook test-run before handing work off


All 38 Core components are covered: [Storybook coverage](docs/architecture/CORE-STORYBOOK-COVERAGE.md). Use `npm run storybook:coverage` to check story files.

The previous MUI Code Connect was removed on 26 November 2026 (53 map files, `code-connect/`, `figma.config.json`). Figma reported that there were no linked mappings to unpublish (90 entries tried, none found). The shadcn Code Connect has not been created yet; it will be done as a step following F5 of each component, at `shadcn/code-connect/`. Build outputs `dist/` and `storybook-static/` can be regenerated with the build scripts.
