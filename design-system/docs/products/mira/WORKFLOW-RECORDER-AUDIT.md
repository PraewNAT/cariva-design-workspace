# Mira Product DS audit — 2026-11-27

**Component Reuse Check — Mira**
Result: added two Product compositions and a separate theme; no variant added to Core
Scope: WorkflowCard, MiraRecorder, Card/Button/TagColor candidates, existing credit components and local source mapping

| Severity | Status | Item | Evidence | Next action |
|---|---|---|---|---|
| — | Pass | Card + Recorder actually use Core primitives | imports in workflow-card.tsx and mira-recorder.tsx | Do not promote into Core |
| — | Pass | Mira Semantic is not mixed with Core | theme/mira.css, tokens.json; 25 tokens; data-mira-theme scope | Preserve the Product namespace |
| — | Pass | No existing WorkflowCard found in the checkout | the source context references src/components/ui/WorkflowCard.tsx, which does not exist; existing Mira has Credit Badge/Tooltip | Keep the new files' mapping separate |

Totals: 3 passed, 0 need fixing, 0 could not be checked within this scope
Next: use the Mira imports in the Product that needs them; do not copy into or modify Core

**Component Audit — Mira**
Result: implementation and interaction tests pass; contrast findings and parity/publication limitations remain
Scope: 5 card colors, 4 recorder states, callbacks/controlled interactions, keyboard seek, long Thai, 320px and PageAndDialog; does not claim WCAG conformance or pixel parity for the whole library

| Severity | Status | Item | Evidence | Next action |
|---|---|---|---|---|
| Medium | Needs fix | Source subtle card text/badge and recorder timeline have low contrast | /tmp/mira-tests.txt; timeline 2.56:1; source colors unchanged | Wait for a Product design decision; do not silently change the central palette |
| — | Could not check | Font parity | Source Aktiv Grotesk Thai / Malila has no local font files; scoped fallback | Add licensed font assets when available |
| — | Could not check | Figma docs and Code Connect | no mapped doc frame; discovery: No published components found in this selection | Use the Document Template when writing to Figma; publish the library before CC |
| — | Pass | Geometry/typography/assets | Browser card 180×180/icon 24, recorder 325×364, transport 325×438; mobile 288px root in 320px viewport, fonts 12/16/36; local SVGs loaded | Differences of badge/ruler 10→12px and transport +6px are recorded in DESIGN.md |
| — | Pass | Interactions and portal | test-run 17/17; focused reruns after fixes; Interaction, PageAndDialog, MobileThai, Callbacks | Parent owns real media APIs |
| — | Pass | Product isolation/build | npm run build and active-stack check pass; no added dependencies; Core recipe files unchanged | Keep Product styling scoped |

Totals: 3 passed, 1 needs fixing (source contrast), 2 could not be checked
Next: review the source contrast and font assets before claiming complete parity/accessibility

Reference artwork remains a reference waveform; waveform/seek values are app-controlled. No actual recording, audio upload or transcription was performed by the audit. Figma canvas was read only; code-to-Figma sync/publication was not performed.

Native keyboard verification: browser range changed5→6 seconds with ArrowRight and updated visible time. Synthetic userEvent keyboard did not invoke native range defaults, so that check was moved to real browser verification; no duplicate key handler was added to component. Control stories Sidebar Default and Credit Badge Compact passed; Sidebar Default retained a pre-existing contrast finding.

## Recording motion consumer update — 2026-11-27

HosXP now directly consumes MiraRecorder under explicit user authorization. Recording bars use CSS transform-only activity feedback; pause/transport are static and CSS reduced motion disables animation. Timer announcements are off. Zero-duration Play/seek is disabled and covered by ZeroDuration. See HosXP docs/AUDIT.md for consumer flow, viewport and real-browser animation evidence. Existing source contrast/font/Figma publication gaps remain unchanged; no Core colors or geometry changed.
