# HosXP Canvas

Storybook: **Products / Mock HosXP / Canvas / Home / Board**.

This folder owns the board entry, separate from `../../prototypes/mock-hosxp-home/`. It reuses the workspace Canvas viewer and `workspace/canvas/frames.mock-hosxp.json` catalog. All seven frames render that prototype's actual HosxpHome stories; no screen UI is copied here.

Run Storybook with `npm --prefix design-system run storybook` from the workspace root. Open http://localhost:6006/canvas/index.html?frames=frames.mock-hosxp directly for the board. Run the HosXP prototype on port 5174 as well for standalone case links.

## Responsive groups — 2026-11-27

Five state groups (Ready, Recording, Paused, Stopped and Playback) each pair Desktop 1280×800 with Mobile 320×1120, 10 frames total. HosXP is desktop-based, so no extra tablet specimen is added. For a tablet-based Product, pair its tablet base with mobile instead.

Frames within a state share a top edge and have a 32px gap; state groups have 320px separation horizontally and vertically, two groups per row. Labels repeat the state and viewport. Mobile reuses the existing responsive screen, not a new Figma-authoritative layout. Each frame has independent local state. Zoom/pan or Fit to browse all groups.

## Pages by feature flow — 2026-11-27

The Page selector changes the board, not the selected frame: **อัดเสียง** (Record audio) contains Ready / Recording / Paused (6 frames); **ตรวจทานโน้ต** (Review notes) contains Stopped / Playback (4 frames). Select a frame by clicking its title on the board (or focus the title and press Enter/Space) for Preview/full-page links. There is no Frame dropdown. Each state still pairs Desktop + Mobile with 32px internal and 320px inter-group gaps.

The shared viewer reads `pages: [{ id, title, view }]` and each frame's `page` from the catalog. URL `page` + `case` + `mode` retain the chosen Page/frame across reload. During one visit each Page remembers its pan/zoom and selected frame; switching Page remounts the rendered screen instances and resets their local demo state. Read-only Storybook does not persist layout changes to source. Flat legacy catalogs are exposed as one Page named ทุกโฟลว (All flows); no existing frames are dropped by this fallback. Adding/reorganizing Pages currently requires catalog editing; no Page creation/rename UI is implemented.

Canvas controls can be hidden with ซ่อนแผงควบคุม (Hide control panel) or Cmd/Ctrl + Backslash (`\`), and restored using the same shortcut. Hiding removes the toolbar, frame tools and status hints, with no floating restore button. Preview fills the viewport while controls are hidden. The shortcut also works inside same-origin Storybook screen frames; cross-origin frames cannot forward their keyboard events.

## Claude artifact mock

The example is separate from Canvas and Prototypes: [Claude artifact mock](../../claude-artifacts/note-review-mock/README.md), Storybook Products / Mock HosXP / Claude Artifacts / ตรวจทานโน้ต Mock (Review notes Mock). This replaces the old mock location under Canvas.
