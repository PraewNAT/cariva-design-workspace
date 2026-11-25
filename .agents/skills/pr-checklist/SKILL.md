---
name: pr-checklist
description: ตรวจความพร้อมของ PR Cariva จาก diff และผล reuse/audit/docs ที่เกี่ยวข้อง ไม่ merge และไม่บังคับ MUI หรือ 7-file scaffold กับ shadcn
---

# PR Readiness

Resolve actual repo/branch/base from the task and Git configuration. Inspect the diff and affected consumers; do not assume main is the only path or that one folder holds all code (`shadcn/` is active, `legacy/mui/` is frozen).

Reuse component-reuse-check and component-audit findings for the same final code revision. Run only missing checks or checks invalidated by new changes; do not duplicate reports. Check documentation/story updates and meaningful regression coverage proportional to the change. Do not require every component to have seven files, Code Connect or Figma output.

Read package scripts before running required checks. For `shadcn/` code run its own scripts from that folder (`tokens:check`, `build`, `build-storybook`, `lint`); `legacy/mui/` is frozen, so run its tokens:check/export:check only if someone edits it. Never run another folder's scripts against this target. Report passed/failed/unavailable separately with evidence.

Keep Draft without DS release numbers. Summarize readiness and remaining actions; do not merge, push, publish, generate release tabs or alter test rules to obtain a pass.
