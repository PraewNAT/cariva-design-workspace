---
name: verify-ds-usage
description: ตรวจว่า code ใช้ component จริงหรือไม่ เป็นชื่อเดิมของ component-reuse-check ให้ใช้ workflow เดียวกัน ไม่รัน audit ซ้ำ
---

# Verify DS Usage — compatibility entry

Load `../component-reuse-check/SKILL.md` and follow its workflow/report for import tracing and real component reuse. Preserve this user's older command vocabulary without maintaining a separate MUI-only audit.

The existing `scripts/scan-ds-usage.py` is a legacy Crv/MUI heuristic helper only. Use it only on the existing `legacy/mui/code/core` implementation when helpful; inspect JSX/imports to verify its results. Do not apply Crv naming assumptions to shadcn or label all literal values defects. Do not claim Figma parity from source inspection.
