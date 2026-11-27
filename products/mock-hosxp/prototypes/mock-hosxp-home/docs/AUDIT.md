# HosXP homepage — 2026-11-27

**Case Planning — CarivaSpace HosXP**
Overall: built the Ready screen from the source plus an interaction demo to try out the UI, without claiming backend rules
Scope: Figma Homepage 812:34676 and the local prototype

| Severity | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Confirmed | Ready screen, patient history, profile/vitals, actions | Figma 1280×800; Ready story | Use the screenshot as the visual target |
| — | Proposed addition | Start/pause/resume/stop, device/settings/close demo | The user asked to try out the outcome; Interaction story | Confirm business rules before connecting the API |

Summary: confirmed 1, proposed 1, must-ask 0 blocking the local prototype; coverage already exists 2
Next: review the prototype before defining backend behavior

**Component Reuse Check — CarivaSpace HosXP**
Overall: reuse Core per Code Connect and the shared workspace shell
Scope: HosxpHome, PrototypeShell and component imports

| Severity | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Uses the actual Button/CardProfile/CardMetric/TagColor/ButtonMic/Dialog | HosxpHome.tsx imports | Do not create clinical rules in Core |
| — | Pass | Sidebar uses the actual Core Sidebar and registry | workspace/presentation/PrototypeShell.tsx, workspace/prototypes.json | No DS mock examples in the selector |

Summary: pass 2, needs fix 0, cannot be checked 0 within this scope
Next: reuse a single screen renderer in standalone/Storybook

**Component Audit — CarivaSpace HosXP**
Overall: build/typecheck and 6 stories pass, including the sidebar; source contrast and font parity remain open
Scope: Ready/Recording/Mobile/Interaction/Workspace/Canvas; desktop 1280×800 and browser 320px

| Severity | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | inactive note placeholder contrast 2.34:1 | /tmp/hosxp-tests.txt; original source color | Wait for a design decision; do not change Core |
| — | Could not check | Font/mobile parity | No Aktiv/Malila; no mobile Figma | Read the README for fallback/adaptation |
| — | Pass | Interaction and keyboard | 6/6 pass; recording flow, Dialog/Escape, sidebar collapse and Cmd/Ctrl+Backslash hide/restore | No media permissions/API |
| — | Pass | Layout/assets/text | Logo 24×24/mic 100×100 loaded; computed fonts 12/14/16/36; mobile viewport/scroll 320/320 | Local asset matches the source slots |
| — | Pass | Build/typecheck/docs | Product build, DS build and Product tsc pass; README/PRODUCT/index updated | localhost 5174 is separate from Storybook 6006 |

Summary: pass 3, needs fix 1, cannot be checked 1
Next: review the UI; the Product DS destination has not been provided; no Figma writes or automatic sync

## Mira Recorder integration audit — 2026-11-27

**Component Reuse Check — HosXP consumes Mira**
Overall: uses the actual MiraRecorder, no UI copied; this cross-Product import was directly instructed by the user
Scope: HosxpHome imports/handlers, Mira component/theme and Storybook consumers

| Severity | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Direct reuse and correct ownership | @/lib/products/mira/components/mira-recorder; data-slot=mira-recorder in the browser | The component/theme stay in Mira; not promoted to Core |
| — | Pass | The host owns state/timer | HosxpHome: idle/recording/paused/stopped/playback | No microphone or API calls |
| — | Pass | Duplicate controls removed | The header keeps Start only when idle; pause/stop/playback live in MiraRecorder | Callbacks use the same state |

Summary: pass 3, needs fix 0, cannot be checked 0 within this scope
Next: review the integration in the local prototype

**Component Audit — Recorder integration and motion**
Overall: wired up the flow and animation without changing the Core recipe; the existing contrast/font gap remains open
Scope: HosXP 11 stories and Mira 8 stories, desktop/mobile 320, real-browser animation/pause; the CSS reduced-motion branch is implemented but the OS preference was not changed to test it in the browser

| Severity | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | original source placeholder/timeline contrast | test-run reports the same as the earlier Product audits | Do not change Product colors in the motion work |
| — | Pass | recording/pause animation | browser animationName=mira-recording-wave, scaleY matrix .956717; pause animationName=none and the time stays at 12 seconds | Motion uses transform only |
| — | Pass | Parent flow and focus | Start→Mira focus; pause/resume/stop; stop→ready; discard→confirm→idle | No audio file or simulated AI result is created |
| — | Pass | Mobile and build | browser viewport 320/scroll 320; recorder 198px in the HosXP sidebar layout; DS/Product build and Product tsc | See the logs in /tmp/hosxp-recorder-* |
| — | Could not check | live reduced-motion preference | The reduce media query disables the animation in CSS; the browser checked the default preference | Do not claim the OS preference toggle was tested |

Summary: pass 3, needs fix 1 (an existing open item), cannot be checked 1
Next: review the UI and preserve Mira's ownership when more consumers are added

Motion behavior:

| Before | After | Why |
|---|---|---|
| Mic image pulses in HosXP | MiraRecorder's wave moves only while recording | Feedback lives in the component actually used |
| Recording bars are static | staggered scaleY 1.4–1.88s; reduced motion turns it off | Does not animate height/layout |
| Duplicate pause/stop controls in the header | Actions from MiraRecorder drive the parent state | Reduces duplicate controls and state drift |

Test-run initially used an old cached HosXP module despite the updated browser UI; restarting only the verified Storybook6006 process refreshed the runner. No dependencies or component behavior were changed to satisfy the stale version.

Final verification: Storybook test-run passed19/19 affected stories after cache reset; DS build, Product build and Product TypeScript check passed. Existing contrast findings are retained, not marked passed. Scoped lint has no errors and retains the existing Fast Refresh constant-export warning in MiraRecorder.

## Canvas extension — 2026-11-27

**Component Reuse & Duplicate Check — HosXP Canvas**
Overall: uses the existing viewer and screens; no HosXP UI is duplicated
Scope: workspace Canvas, HosxpHome stories and the standalone case resolver

| Severity | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Uses the actual screens and shared fixtures | frames.carivaspace-hosxp.json → cases.ts → stories/main.tsx | No component needs to be added |

Summary: pass 1
Next: no further action needed

**Component Audit — HosXP Canvas**
Overall: added a 7-case board and per-case standalone links
Scope: checked Canvas desktop, Preview interaction, direct standalone Paused and focused stories; Figma parity not re-checked

| Severity | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | 7 frames use the actual stories | browser board shows Ready/Recording/Paused/Stopped/Playback and 2 mobile cases | Use Fit/zoom to check each page |
| — | Pass | Selection persists when switching Preview | Selected Paused, Preview shows Pause and pressing resume returns to Recording | None |
| — | Pass | standalone case matches the board | localhost:5174/?case=hosxp-paused shows Pause, 12s | None |
| — | Pass | focused story tests and build | 9/9 stories pass; Product Vite build passes | None |
| Low | Needs fix | original source contrast and heading-order | a11y warnings in HosXP stories; shared component not changed this round | Left open per the earlier audit |
| — | Could not check | actual browser fullscreen | The existing control is present, but fullscreen was not entered this round | Check when a browser that supports it is used |

Summary: pass 4, needs fix 1, cannot be checked 1
Next: take feedback on the board and keep the source gaps as in the earlier report

Navigation follow-up: moved only the board story into `products/carivaspace-hosxp/canvas/hosxp-home/`, grouped as Products / CarivaSpace HosXP / Canvas / Home / Board. Prototype screen stories remain unchanged. The shared viewer and catalog stay in workspace/canvas; no duplicate HosXP implementation was introduced.

Final navigation verification: Storybook review resolves the new Board entry in its separate Canvas group. `test-run` was invoked twice for the moved Board story but returned an empty report, so automated execution of that new entry is unverified. The nine pre-move consumer stories passed earlier; do not count the blank response as an additional pass. Product TypeScript and diff whitespace checks passed.

## Responsive grouping — 2026-11-27

Overall: arranged 10 frames into 5 groups by state, pairing Desktop + Mobile; HosXP has no added Tablet, per the user's correction
Scope: board metadata/docs, reuse of the viewer and the existing HosxpHome; no change to screen/Core styles

| Severity | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | viewports within a group are close together | Desktop 1280 + Mobile 320px, gap 32px; groups separated by 320px | None |
| — | Pass | No duplicate UI | the catalog uses the existing stories and props | None |
| — | Pass | focused consumer tests | Ready and Interaction pass; the Board runner returns no result, as in the earlier open item | None |
| — | Could not check | mobile Figma parity | There is no mobile source layout yet | responsive adaptation only |

Summary: pass 3, cannot be checked 1
Next: take feedback on the board layout

## Canvas Pages — 2026-11-27

Overall: separated Pages by flow from the Frame selector using the existing viewer; no production/Core components changed
Scope: shared Canvas viewer, HosXP catalog and docs; the legacy fallback was checked from code only, the old board was not actually opened

| Severity | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Page changes the set of frames | browser: อัดเสียง (Record audio) 6 frames, ตรวจทานโน้ต (Review notes) 4 frames | None |
| — | Pass | Switching Page remembers the earlier frame | Going back to อัดเสียง (Record audio) still has hosxp-paused selected | None |
| — | Pass | direct URL/reload | reload page=review-notes keeps the Page/frame | None |
| — | Could not check | legacy board render and sync-server persistence | There is a single-page fallback/save path but the 6019 server was not tested | Check when using the legacy/sync server |

Summary: pass 3, cannot be checked 1
Next: take feedback on splitting the flows into Pages

Panel visibility follow-up: browser verified the hide button removes toolbar/tools and blurs hidden controls to BODY; Ctrl+Backslash restores controls and focuses the hide button. The same real keyboard shortcut was exercised twice from the Preview's CC textbox: it hid chrome and gave Preview top=0, then restored controls. Same-origin iframe keyboard forwarding is implemented; cross-origin forwarding is intentionally unavailable. No screen/Core styling was changed.

Frame selector follow-up: removed the Frame dropdown per user request. Page remains; frame titles support click and Enter/Space selection. Preview/full-page still follow the selected frame. This supersedes earlier references to a separate Frame selector.

## Claude artifact mock — 2026-11-27

Overall: an example artifact work item, separate and Storybook-only, uses the existing sidebar through an optional fixture input; no mock is added to the real catalog
Scope: PrototypeShell and the ClaudeArtifact story; the user permitted the example.com links as simulated, they are not a real Claude artifact

| Severity | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | work items are separate and labelled Mock | browser shows the Homepage and the Claude artifact Mock in the same Product | None |
| — | Pass | external link contract | href example.com, target=_blank, rel=noopener noreferrer | Use real links when UX/UI provides them |
| — | Pass | reuse and regression | uses the existing PrototypeShell; Workspace story passes, Product TypeScript passes | None |
| — | Could not check | automated runner for the new story | test-run does not return a result for this new story; render/sidebar checked with the browser | Not counted as an automated pass |

Summary: pass 3, cannot be checked 1
Next: review the example before using it with a real artifact

Claude organization follow-up: the mock moved out of Canvas to products/carivaspace-hosxp/claude-artifacts/note-review-mock and Storybook Claude Artifacts. The mock now renders two separately named links with added-on dates (2026-11-27); dates are not claims about creation at Claude. Canonical create-project, AGENTS and workspace rules now use a per-work claudeArtifacts array and separate artifact paths/titles. Old mock source path in the preceding historical entry is superseded.
