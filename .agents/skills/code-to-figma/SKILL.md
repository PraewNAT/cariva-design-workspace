---
name: code-to-figma
description: Creates or updates Cariva screens in Figma from code or Storybook, anchored to the Figma DS; applies to the specified screen only and is not for breaking a prototype into a multi-state flow or building a DS library
---

# Code to Figma — Cariva screens

> Workflow fit: used at step(s) D4 (assemble editable frames) and D6 (send the actual Figma URL) in `design-system/rules/workflow-map.md` (see the Skill column of each flow table). Load it when that step starts.

A screen-level workflow caller for Cariva. It uses existing skills and does not maintain the implementation again.

```text
code-to-figma Patient List source=[path or URL] figma=[target Figma URL]
```

1. Read `shadcn/DESIGN.md`, `shadcn/tokens.json`, and `rules/figma-workflow.md` Part C, which is the single place holding the Cariva rules, source precedence, updating existing nodes, and completion evidence
2. Load `figma:figma-generate-design` from the current catalog for screen construction, and load `figma:figma-use` before calling `use_figma` as the plugin requires. If a dependency is missing, report it; do not claim the sync succeeded
3. Use Part C to limit the upstream fallback: Code is the default sync direction, but you must preserve the API/variables/radius of the existing target Figma component. Report conflicts before overwriting the shared DS, and verify the visuals/bindings

If asked to break an interaction flow into multiple states with annotations, build one frame per state with this same skill and the Part C rules, and annotate natively in Figma. The former external `prototype-to-figma` skill was removed on 2026-11-27; do not run two pipelines on the same screen.

Upstream source: [Figma — figma-generate-design](https://github.com/figma/mcp-server-guide/blob/main/skills/figma-generate-design/SKILL.md); use the version installed in the plugin at the time of work
