# Shared report contract

Use this same compact format for all three Cariva skills. Default to Thai; use the user's language when explicitly requested. Keep tool logs and internal reasoning out of the report. The Thai field labels and status words below are the literal report copy (English glosses are given in parentheses in the notes).

```text
**[Skill display name] — [Product or scope]**
ผลรวม: [one sentence describing the outcome, including whether anything was changed]
ขอบเขต: [mode; sources actually checked; important gaps]

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| สูง/กลาง/ต่ำ/— | status | concrete finding or case | file:line, story, requirement | action or decision |

สรุป: [counts for all items, not just displayed rows]
ต่อไป: [one recommended action, or ไม่ต้องดำเนินการเพิ่ม]
```

- Use exactly these fields, order and table columns. Do not add a second checklist or repeat findings in prose. Aim for one screen: about 12–18 lines, at most 8 table rows, concise cells without nested lists. (Field labels: ผลรวม = overall result, ขอบเขต = scope, ระดับ = severity, ผล = status, รายการ = item, หลักฐาน = evidence, ถัดไป = next (per row), สรุป = summary, ต่อไป = next step (overall), ไม่ต้องดำเนินการเพิ่ม = no further action needed.)
- Reuse/Audit statuses: ผ่าน (pass), ต้องแก้ (needs fix), ตรวจไม่ได้ (cannot check). Case Planning statuses: ยืนยันแล้ว (confirmed), เสนอเพิ่ม (proposed addition), ต้องถาม (needs an answer). For planning, record implementation coverage as มีแล้ว (exists)/ขาด (missing)/ตรวจไม่ได้ (cannot check) in รายการ (item) or ถัดไป (next), distinct from requirement certainty.
- Severity สูง (high) means blocks use or risks incorrect behavior; กลาง (medium) means a meaningful robustness/maintenance issue; ต่ำ (low) means minor refinement. Use — for passes and unranked proposals; never label every issue severe.
- Sort actionable high-impact items and blocking unknowns first. If there are more than 8, show the most relevant 8, state the omitted count and overall totals, and offer full detail. Never imply omitted items passed. With no findings, show one scoped pass row or an unavailable row and its evidence, not an empty table.
- Cite observed evidence: clickable absolute local file links with verified line numbers where possible; real story URLs/IDs or requirement sections otherwise. Never invent paths, IDs, test results or line numbers. A proposed case may cite its rationale as a proposal, not fabricate a requirement.
- An unknown check is ตรวจไม่ได้ (cannot check), not a failure or a pass. Mixed results must name the important gap in ขอบเขต (scope). No score or claim of complete coverage from static inspection alone.
- If multiple skills run together, give each the same short block and avoid reporting the same finding twice; cross-reference its owner skill. Integrate tool-mandated review links compactly where required.
