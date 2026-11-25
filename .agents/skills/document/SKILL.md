---
name: document
description: สร้างหรืออัปเดตเอกสาร component Cariva จาก code contract และ visual specification ที่ตกลงไว้ ใช้กับ Markdown, Storybook หรือ Figma docs ที่ผู้ใช้ระบุ
---

# Component Documentation

Read AGENTS.md and the actual target component, related stories, approved theme/tokens and existing docs before writing. Locate existing documentation first; do not require a separate Markdown file or exactly seven source files per component.

- Code defines implemented props, variants, states and behavior. Approved tokens/specifications define visual rules; user/team decisions define usage guidance. Do not invent Do/Don't or infer product rules from appearance.
- Use the current source of truth regardless of documentation destination. If a task is Figma-first, describe Figma-only features as proposed until code support is verified. Report conflicts; do not silently combine values.
- Create missing docs or update changed sections in the existing appropriate destination. Preserve unaffected guidance. Document anatomy, relevant props/states, layout behavior, tokens and real usage examples with source evidence. Record unavailable evidence explicitly.
- Figma docs must use verified instances. Read the relevant Figma plugin skills before canvas writes; inaccessible Figma or unresolved sync decisions are pending updates, not proof of synchronization. Do not write to Figma merely because Markdown docs changed.
- After authorized component implementation, check/update affected docs and stories within the existing scope, then use component-audit on the final component and affected consumers. Documentation-only work needs factual/link verification, not a needless app rebuild.

Report destinations/sections updated, source references, verification performed and remaining gaps. Do not add release numbering or publish without an explicit task.
