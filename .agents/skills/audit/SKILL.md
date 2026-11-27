---
name: audit
description: Checks token binding and naming of Figma nodes only; not the React component-audit or duplicate finding
---

## Scope per the latest plan

Read AGENTS.md and rules/skill-routing.md before using this skill. The latest rules take precedence over any older conflicting steps. This skill does not allow publishing, pushing, deploying, or starting version numbers automatically. Perform external actions only when the user has actually assigned them.


# Audit Cariva Design System Integration

Use when the user says:

```text
audit [name] node-id=[id]
please audit this [component/page name]   (Thai: "ช่วย audit [component/page name] นี้ให้หน่อย")
check component [name]   (Thai: "เช็ค component [ชื่อ]")
```

## Required Context

- Read `shadcn/DESIGN.md` — token names, typography scale
- Read `shadcn/tokens.json` — hex values and token mapping
- Read `shadcn/rules/components/{name}.md` if it exists
- Use Figma inspection tools for the target node/page.

## Audit Scope

Check only:

- **Naming convention** — does the component name match the format `crv[Component]/[variantName]` (camelCase)?
- Uses component base / shared component correctly
- Colors are bound to current semantic color tokens — no hardcoded hex
- Typography uses text styles / typography variables
- Spacing uses current spacing variables
- Radius/effect uses shared styles or variables
- Unexpected local overrides
- Deprecated or old tokens
- Raw primitive color used directly in components

## Do Not Check

- Visual taste unless it affects DS integration
- Product copy quality
- Layout redesign ideas
- Implementation code unless the user explicitly includes code

## Report Format

Report results in this format:

```
## Audit: [component name]

### ❌ Issues found
| # | Issue | Node | Should be |
|---|---|---|---|
| 1 | hardcoded #2563EB | contained/primary fill | semantic/color/primary/default |

### ⚠️ Unsure
- [things to ask before deciding]

### ✅ Passed
- [things that are correct]
```

After the report is done, **ask immediately:** "Do you want me to fix the issues found?"
- If **yes** → load the `map-fix` skill right away, passing along the data already inspected so nothing is inspected again
- If **no** → end with just the report

If no issues are found, say the audit passed and mention any residual uncertainty. Then ask what the user wants to do next

## Rules

- Do not change Figma or local files during audit phase.
- Do not create tokens/components.
- If a point is ambiguous, ask before recommending a structural change.
- Keep findings grounded in node IDs, component names, token/style names, or exact property names.
- If the user says "do not fix" (Thai: "ห้ามแก้") or "report only" (Thai: "report อย่างเดียว") → do not ask the closing question after the report
