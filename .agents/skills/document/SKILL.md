---
name: document
description: Create or update Cariva component documentation from the agreed code contract and visual specification. Use with the Markdown, Storybook or Figma docs the user specifies
---

# Component Documentation

Read AGENTS.md and the actual target component, related stories, approved theme/tokens and existing docs before writing. Locate existing documentation first; do not require a separate Markdown file or exactly seven source files per component.

- Code defines implemented props, variants, states and behavior. Approved tokens/specifications define visual rules; user/team decisions define usage guidance. Do not invent Do/Don't or infer product rules from appearance.
- Use the current source of truth regardless of documentation destination. If a task is Figma-first, describe Figma-only features as proposed until code support is verified. Report conflicts; do not silently combine values.
- Create missing docs or update changed sections in the existing appropriate destination. Preserve unaffected guidance. Document anatomy, relevant props/states, layout behavior, tokens and real usage examples with source evidence. Record unavailable evidence explicitly.
- For components owned by any Product, follow [component-reuse-check — Product ownership](../component-reuse-check/SKILL.md#product-ownership--user-decision-2026-11-26) from the start. Keep contracts/audits/mappings in `shadcn/docs/products/<product-id>/`, Storybook docs under `Products/<ProductName>/Components/<Component>`, and mapped Figma Product docs separate from Core using the existing Document Template. Check source paths, ownership labels, examples, links and Figma source descriptions after moves; keep authorized destinations synchronized and explicitly report any pending destination. Do not describe a Product composition as Core just because it reuses Core primitives or lives in the shared Figma file.
- Figma docs must use verified instances. Read the relevant Figma plugin skills before canvas writes; inaccessible Figma or unresolved sync decisions are pending updates, not proof of synchronization. Do not write to Figma merely because Markdown docs changed.
- For every Cariva component's Figma documentation, use the existing [Document Template](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4537-130394), with Blocks component set `4537:130684`, rather than inventing a separate layout. Inspect the current template before writing; preserve its typography, spacing, colors and composition. Select its Header, Vertical/Horizontal Stack, Guidance and Callout blocks as appropriate to the content. Update the mapped docs frame in place; Date/Time `7228:128` is a completed usage example, not the template source.
- Follow the template's instruction to detach only documentation block containers when needed to place content in their gray areas; keep actual component specimens as verified, linked instances. Populate or hide unused placeholders. Availability badges and other status indicators must reflect verified support, never inherit the template's checked defaults as evidence. Keep pending implementation/audit findings explicit. Verify the final editable layout and text overflow visually. If the template is inaccessible, report the blocked template update instead of silently substituting a new layout.
- After authorized component implementation, check/update affected docs and stories within the existing scope, then use component-audit on the final component and affected consumers. Documentation-only work needs factual/link verification, not a needless app rebuild.

Report destinations/sections updated, source references, verification performed and remaining gaps. Do not add release numbering or publish without an explicit task.
