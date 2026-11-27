---
name: rename-frame
description: Batch rename screen/page frames in Figma to match the Cariva DS naming convention — use when the user says rename frame, จัดชื่อ frame (organize frame names), ตั้งชื่อ frame ให้ถูก (name frames correctly), rename screen
---

# Rename Frame — Cariva Design System

Use when the user says (Thai trigger phrases are kept so Thai-speaking users can still invoke it):

```text
rename frame [page/section name]
rename-frame [page/section name]
Organize frame names in [page name]  (Thai: "จัดชื่อ frame ใน [page name]")
Name the frames correctly [page/section]  (Thai: "ตั้งชื่อ frame ให้ถูก [page/section]")
```

## Scope

- Works with **screen/page frames only** — top-level frames that are screens, not components
- Works as a **batch per page or section** only — does not accept a single node-id; if the user gives a single node-id, ask whether to scan the whole page/section that node is in
- If a node found is a `COMPONENT`, `COMPONENT_SET`, or `INSTANCE` → skip it and do not touch it; say that the `audit`/`map-fix` skill must be used instead (a different naming convention: `crv-{name}` kebab-case)

## Required Context

Read every time:
- `legacy/mui/rules/core-rules.md` — section "Screen/Page Frame Naming Convention"

## Naming Convention

```text
{Flow}/{Screen Name}          Title Case, e.g. Auth/Login, Dashboard/Overview
{Flow}/{Screen Name} - {State} e.g. Auth/Login - Error, Auth/Login - Loading
```

- `/` automatically groups flows in the Figma layer outline — never put spaces around `/`
- The Flow comes from the name of the section/page the frame is in; if unclear, ask the user first; never guess
- The Screen Name is converted from the original frame name → Title Case, dropping meaningless words (e.g. "Copy", "Frame 12", auto-generated numbers)
- If the name is entirely numbers/auto-generated (e.g. "Frame 4821") and the Screen Name cannot be guessed from the content → ask the user instead of guessing

## Workflow

1. Confirm scope — the page name or section name to scan (if the user did not specify, ask first)
2. Inspect only the **top-level children** of that page/section — do not go deeper into a frame (those are the screen's own inner layers, not other screens)
3. Filter: keep only `FRAME` types that are not component instances and not decorative/divider frames (e.g. names like `---...`)
4. Build a comparison table: current name → proposed name per the convention above — if a frame's name already matches the convention, mark it "no change needed"
5. Show the table to the user for confirmation **once for the whole batch** before actually editing — never rename one at a time without asking
6. Once confirmed, rename every frame that needs it through the Figma tool in one go (or split into smaller batches if there are many)
7. Take a screenshot or list the names after the rename to verify, then report the result

## Report Format

```
## Rename Frame: [page/section name]

| Node ID | Original name | New name | Status |
|---|---|---|---|
| 123:456 | Login Page | Auth/Login | ✅ renamed |
| 123:789 | Test 1 | — | ⏭️ skip (component/instance, not in this scope) |
| 123:900 | Frame 4821 | — | ❓ need to ask for Screen Name |

### Additional questions needed
- [items whose Screen Name could not be guessed]
```

## Rules

- Do not guess the Flow name if it is not clear from the context of the page/section
- Do not rename components, component sets, or instances — a different convention (see the original Naming Convention section of `legacy/mui/rules/core-rules.md`)
- Do not edit layers inside a screen (e.g. sub-frames, small groups within the page) — top-level screen frames only
- Always confirm before editing; never batch-apply without letting the user see the table first
- If the user says "don't ask, just rename" (Thai: "ไม่ต้องถาม rename ไปเลย"), still show the summary table after finishing (for an audit trail) but skip the confirmation question beforehand
