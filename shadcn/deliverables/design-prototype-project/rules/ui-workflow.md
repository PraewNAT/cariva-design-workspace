# Create and revise UI

อ่าน [Workflow map](workflow-map.md) ก่อนเริ่ม: แผนภาพและตารางในไฟล์นั้นกำหนดลำดับ จุดถาม และเกณฑ์จบงาน รายละเอียดในไฟล์นี้ใช้ประกอบขั้นที่เกี่ยวข้อง ไม่ใช่ flow อีกชุด

Use project-guide.md and ds-foundation.md. Preserve current company/Product rules; do not import another company's palette, fonts, control sizes or framework assumptions.

1. Read selected Product record and current task/source. Confirm scope/output/constraints from context; ask only for genuinely missing decisions. Read available mandatory UI/story skills before changes.
2. Plan relevant happy/loading/empty/error/retry/validation/success/permission/responsive cases. Label confirmed, proposed and unresolved; do not invent business rules. Small fixes need focused cases, not a new full flow.
3. Discover existing components, documented props and compositions before writing. Use the chosen base's actual APIs. Propose new Core versus Product components only when reuse fails.
4. Implement the scoped prototype; preserve behavior on visual changes/refactors. Use the company's approved tokens/themes. Do not add libraries or enlarge scope just because a reference recommends them.
5. Update relevant component docs and stories/examples, including meaningful state transitions and source. Keep IDs stable and update the actual inventory when components change.
6. Review duplicate implementations and audit affected consumers, including page/portals, long text, keyboard/focus, desktop/mobile and relevant states. Use actual configured build/token/story tests, not invented commands. Fix scoped failures and rerun affected checks after code changes. Distinguish existing issues and inaccessible surfaces; do not disable rules to pass or claim full accessibility from interactions.
7. Show latest runnable preview/review and concise findings: changed, reused, docs, verification and pending. Do not publish automatically. Approval of the prototype is not automatic authorization to write Figma.

## Revision loop

Merge new feedback with earlier constraints, reproduce, find the smallest correct root cause, trace consumers, fix, update docs/stories and rerun affected checks. Changes to Core require impact review across accessible Products; ask before breaking out-of-scope APIs/behavior. Report inaccessible consumers honestly. Roll back only the requested experiment/diff and preserve concurrent edits; never reset the whole workspace to undo one change.

## Multiple Products and handoff

Product selection belongs to the task/chat, not a single global file. Use saved per-Product records; do not ask again once established. Resolve ambiguous scope before writing. Keep shared Core independent from Product logic and avoid cross-Product internal imports. Another repo may have different stack/rules: inspect it rather than assuming it updates automatically.

For work passed to another AI, record workspace/Product, scope, constraints, files changed, actual checks, pending decisions and next step in a task-specific document. Read source and current working changes before continuing. Do not overwrite another contributor or resume paused work without request. Shared instructions are not file locks or a background orchestrator.

## Read-only review Canvas

When requested, show multiple real screen/case renders side by side inside Storybook, with frame names, case IDs and flow connectors. Support zoom/pan and fit-to-view as appropriate. Keep this review surface separate from Product/Core code and use actual shared components/tokens. Do not build a design-editing Properties/Layers panel, draft savepoints or Apply/export automation unless separately requested. Do not assume a board exists until its implementation is found.

Keep a case inventory with source, precondition/action, expected outcome, confirmed/proposed/unresolved status, preview/story reference and actual test status. Drawing a case does not prove behavior passed. Derive relevant validation, loading/double-submit, errors/retry, success, keyboard/focus, responsive and long/missing-data cases from the task. Flag unknown permissions, authentication, rate limits and other business rules instead of inventing them. Do not claim all business cases are complete while decisions remain unresolved.

## Component documentation after changes

After changing a component, inspect all related documentation destinations: Markdown, Storybook and on-canvas Figma documentation. Update each destination included in the authorized task; explicitly list anything pending or inaccessible. A component description is metadata, not a replacement for requested visible documentation on the Figma canvas. Use current verified component values, real instances where examples are needed, and distinguish code behavior from Figma-only specification. Audit after the relevant updates; do not claim synchronization from a document change alone.
