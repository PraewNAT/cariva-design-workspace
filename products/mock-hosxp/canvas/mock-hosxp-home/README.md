# HosXP Canvas

Storybook: **Products / Mock HosXP / Canvas / Home / Board**.

This folder owns the board entry, separate from `../../prototypes/mock-hosxp-home/`. It reuses the workspace Canvas viewer and `workspace/canvas/frames.mock-hosxp.json` catalog. Every frame renders that prototype's actual HosxpHome stories; no screen UI is copied here.

Run Storybook with `npm --prefix design-system run storybook` from the workspace root. Open http://localhost:6006/canvas/index.html?frames=frames.mock-hosxp directly for the board. Run the HosXP prototype on port 5174 as well for standalone case links.

## One page per flow — 2026-11-27

| Page (flow) | Steps, in order | Frames |
|---|---|---|
| อัดเสียง | 01 Ready, 02 Recording, 03 Paused, 04 Ready to transcribe, 05 Playback | 10 |
| สร้างโน้ต | 06 Generating note, 07 Note ready | 4 |
| บันทึกเข้า HIS | 08 Saving to HIS, 09 Note saved, 10 Closing session | 6 |
| ให้คะแนน | 11 Good feedback, 12 Feedback sent | 4 |

Each step pairs Desktop 1280×800 (left) with Mobile 320×1120 (right), 32px apart; each flow is one row, left to right, with 640px between steps. HosXP is desktop-based, so there is no tablet frame. Mobile is a responsive adaptation (no mobile Figma). Canvas frames hold their step; use Preview to interact. The earlier **ตรวจทานโน้ต** page was merged into **อัดเสียง** because the Figma flow has no editable note after Stop.

## Flow map and connector lines

The first page, **ผังรวมทุก flow**, stacks every flow as a row and connects them. Lines come from `links` in the catalog and name the button or automatic trigger: green is the forward path, blue dashed goes back or is optional, red is reserved for errors. The **เส้นโยง** button hides them. The map is read-only; move frames on a flow page. Lines are routed by simple rules, not by hand, so check a new board for lines that are hard to follow. Only moves the prototype really does are drawn; sub-flows that are not built have no lines.

## Smoothness and toolbar

Animations and timed transitions pause in Canvas. Mobile frames support native scrolling; Ctrl/Command + wheel zooms the board. Desktop + Mobile pairs are visible by default; **จอมือถือ** toggles the mobile screens. In Storybook the board is read-only, so the story-id field and **+ Frame** are hidden (they remain in the editor served by `sync/server.mjs`, where changes are saved). The bottom bar has zoom out, the current zoom, zoom in and **พอดีจอ** (fit every screen).

## Using the pages

The Page selector changes the board, not the selected frame. Select a frame by clicking its title on the board (or focus the title and press Enter/Space) for Preview/full-page links. There is no Frame dropdown.

The shared viewer reads `pages: [{ id, title, view }]` and each frame's `page` from the catalog. URL `page` + `case` + `mode` retain the chosen Page/frame across reload. During one visit each Page remembers its pan/zoom and selected frame; switching Page remounts the rendered screen instances and resets their local demo state. Read-only Storybook does not persist layout changes to source. Flat legacy catalogs are exposed as one Page named ทุกโฟลว (All flows); no existing frames are dropped by this fallback. Adding/reorganizing Pages currently requires catalog editing; no Page creation/rename UI is implemented.

Canvas controls can be hidden with ซ่อนแผงควบคุม (Hide control panel) or Cmd/Ctrl + Backslash (`\`), and restored using the same shortcut. Hiding removes the toolbar, frame tools and status hints, with no floating restore button. Preview fills the viewport while controls are hidden. The shortcut also works inside same-origin Storybook screen frames; cross-origin frames cannot forward their keyboard events.

## Claude artifact mock

The example is separate from Canvas and Prototypes: [Claude artifact mock](../../claude-artifacts/note-review-mock/README.md), Storybook Products / Mock HosXP / Claude Artifacts / ตรวจทานโน้ต Mock (Review notes Mock). This replaces the old mock location under Canvas.

## Canvas navigation and action links — 2026-11-27

Canvas frames are inspection surfaces. Mobile frames allow native scrolling; Ctrl/Command + wheel over Mobile forwards zoom to the board. Controls do not activate in Canvas. Desktop wheel gestures reach the board. Use **เล่น Preview** or **เปิดเต็มหน้า** to interact with the selected case. Canvas passes `canvasStill=1`; HosXP recording/playback/timed state transitions stop in this mode. Embedded CSS animation loops pause, while finite entrance animations finish so their content remains visible. Preview is unloaded when returning to Canvas. Other future prototypes must explicitly honor the flag for their own JavaScript timers.

All links with both endpoints on the current page are visible by default. Selecting a frame emphasizes its incoming/outgoing lines without hiding other links. `sourceLabel` matches the actual control's accessible name/text in the embedded screen and anchors the line at that control. Automatic transitions use the frame boundary. Missing/inaccessible controls show a pending label without a misleading frame-edge action line. DOM, accessible-name, font, resize and scroll updates trigger a debounced anchor recalculation; observers are cleaned up on board rebuild. Cross-origin frames cannot expose their controls to the board. Links are recomputed after frame load and layout edits; toggling links does not reload screens.

Validation: focused browser check confirmed wheel zoom over a frame, non-interactive frame surfaces and no unresolved named source controls across the current overview. Catalog/layout check passed. This is not a measured FPS guarantee on every device; the board still mounts live component documents for visual fidelity.

Focused Storybook results: Board, Interaction and Happy Path interaction assertions passed. Accessibility findings remain in the preview consumers: primary/Transcribe contrast (3.5:1), timeline text (2.56:1), placeholder text (2.34:1), and Voice Recorder heading order. These are not resolved by the Canvas navigation changes; no shared color change was made.

Canvas overview shows Desktop + Mobile by default: 32px within each pair and 640px between state groups. The Mobile toggle can hide/show the mobile frames. Mobile supports scrolling while controls remain inactive in Canvas.

Validation for action anchors and Mobile scrolling: browser checks confirmed the Start Record line starts at the actual button bounds, recovers after a delayed accessible-name change, Mobile scrolls 328px with a wheel gesture, and Ctrl + wheel changes Canvas zoom from 60% to 73%.
