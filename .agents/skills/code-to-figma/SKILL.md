---
name: code-to-figma
description: Creates or updates Cariva screens in Figma from code or Storybook, anchored to the Figma DS; applies to the specified screen only and is not for breaking a prototype into a multi-state flow or building a DS library
---

# Code to Figma — Cariva screens

A screen-level workflow caller for Cariva. It uses existing skills and does not maintain the implementation again.

```text
code-to-figma Patient List source=[path or URL] figma=[target Figma URL]
```

1. Read `shadcn/DESIGN.md`, `shadcn/tokens.json`, and `rules/figma-workflow.md` Part C, which is the single place holding the Cariva rules, source precedence, updating existing nodes, and completion evidence
2. Load `figma:figma-generate-design` from the current catalog for screen construction, and load `figma:figma-use` before calling `use_figma` as the plugin requires. If a dependency is missing, report it; do not claim the sync succeeded
3. Use Part C to limit the upstream fallback: Code is the default sync direction, but you must preserve the API/variables/radius of the existing target Figma component. Report conflicts before overwriting the shared DS, and verify the visuals/bindings

If asked to break an interaction flow into multiple states with annotations, use `prototype-to-figma` and apply the Cariva rules in Part C as well; do not run both pipelines on the same screen. If asked to build a library, treat it as separate DS authoring work.

Upstream source: [Figma — figma-generate-design](https://github.com/figma/mcp-server-guide/blob/main/skills/figma-generate-design/SKILL.md); use the version installed in the plugin at the time of work
