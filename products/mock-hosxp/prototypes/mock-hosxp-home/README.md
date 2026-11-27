# HosXP homepage prototype

Figma → Code from [Homepage 812:34676](https://www.figma.com/design/cc5bDyHoQauXzugSwTH4Wd/CarivaSpace-for-HosXP?node-id=812-34676), inspected 2026-11-27. Initial desktop target 1280×800.

## Run

Install the existing toolchain with `npm --prefix design-system ci` on a fresh checkout. No new dependency was installed for this prototype. It shares the workspace's React/shadcn source and installed Vite toolchain through design-system/vite.mock-hosxp.config.ts; no published DS package is assumed.

- `npm --prefix products/mock-hosxp/prototypes/mock-hosxp-home run dev` → http://localhost:5174/
- `npm --prefix products/mock-hosxp/prototypes/mock-hosxp-home run build`
- `npm --prefix design-system run storybook` → port 6006; Products / Mock HosXP / Prototypes / Home
- Canvas story uses workspace/canvas/frames.mock-hosxp.json; Preview and standalone use the same HosxpHome renderer.

Standalone has the shared workspace sidebar. Collapse/expand in its header; Cmd/Ctrl + Backslash hides it completely and restores it. Hide sidebar for the Figma comparison. Former Workspace examples/DS examples were removed from the selector and Storybook at the user's request. Only actual registered projects appear in workspace/prototypes.json.

## Cases and limits

Confirmed visual case: Ready to record with Patient History, profile, nine vital values, disease/allergy tags, nurse complaint, microphone picker and Mira AI Settings entry. Fixtures are copied from the provided design; no clinical interpretation or abnormal-value rule is inferred.

Prototype interaction proposals implemented for trying the UI: history collapse; start/pause/resume/stop; editable note fields after stop; microphone selection; settings dialog; close/cancel/reopen. These are local demo states, not approved backend business rules. No microphone capture, patient API, transcription or persistence. Recording duration is elapsed demo time, not an audio file.

## Visual authority

Reuse actual Button, CardProfile, CardMetric, TagColor, ButtonMic and Dialog. Static logo and microphone image are local assets downloaded from Figma and used in their original slots at 24×24 and 100×100. Preserve Core geometry and semantic tokens; layout composes them in Product CSS.

Figma: Aktiv Grotesk Thai UI, Google Sans prose, Malila display. Google Sans is locally available; Aktiv/Malila are unavailable, so Product-local fallbacks are IBM Plex Sans Thai and Georgia. No Core font replacement. All rendered text remains ≥12px. Mobile stacks panels and uses two-column vitals below 480px; no mobile Figma was supplied, so this is responsive adaptation, not verified mobile parity.

Known source contrast gap: inactive note placeholders use content/disabled on subtle (2.34:1); preserve source and report. Native Core components may carry existing contrast differences. Figma documentation/write or library publishing is not part of this screen implementation.

## Mira Recorder integration — 2026-11-27

User explicitly authorized HosXP to consume the Mira Product DS Recorder. Import its existing implementation from `@/lib/products/mock-mira/components/mira-recorder`; do not copy it into HosXP or promote it into Core. The component and its theme remain owned by Mira. No other cross-Product integration is implied.

Start Record mounts the real MiraRecorder in the note area and moves focus into it. HosXP owns elapsed time, playback position and state: recording→recording, paused→pause, stopped→ready-to-transcribe, playback→playback. Pause freezes the recording timer; stop retains elapsed duration and exposes the transport controls and editable note fields. Playback/seek are demo position changes, not an audio file. A zero-duration recording cannot play. Transcribe displays explicit local demo feedback and sends nothing. Discard requires a local confirmation then clears the demo session and returns to Start Record. The old duplicate header Pause/Resume/Stop buttons were removed.

The Recorder animates waveform bars only in recording state: staggered1.4–1.88s scaleY feedback, no layout/height animation. Pause and all transport states stay static; prefers-reduced-motion disables the wave animation. This is visual demo feedback, not microphone level metering. Real audio permissions, storage and transcription remain unimplemented.

Storybook now also covers Paused, Stopped, Playback, MobileRecording and DiscardRecording. The Interaction story verifies actual Mira component rendering, focus, animated recording/static pause and stop-to-note editing.

## HosXP Canvas — 2026-11-27

Open http://localhost:6006/canvas/index.html?frames=frames.mock-hosxp with Storybook running. Seven frames render the existing screen: desktop Ready, Recording, Paused, Stopped/note editing and Playback at 1280×800; mobile Ready and Recording at 320×1000. Mobile is the existing responsive adaptation, not a new Figma specification. Zoom/pan and Fit use the existing workspace viewer. Select a case, switch Canvas / Preview or open the corresponding standalone case on port 5174. Both servers must run for standalone links.

`workspace/canvas/frames.mock-hosxp.json` is the shared fixture catalog. `src/cases.ts` resolves its props for stories and standalone `?case=` links; unknown cases fall back to Ready. Reload resets to the selected fixture. Each board frame is independent and interactive; elapsed timers run locally. Frame state is not synchronized with Preview. The viewer's layout changes on Storybook are temporary, not saved to source. This is a review board, not a Figma layer editor.

Canvas entry is now separate: `products/mock-hosxp/canvas/mock-hosxp-home/`, Storybook **Products / Mock HosXP / Canvas / Home / Board**. Screen stories remain under Prototypes / Home; the board no longer appears inside that group.

Canvas layout update: the earlier seven-frame arrangement is superseded by five state groups, each pairing Desktop / Mobile (10 frames). See the separate Canvas README for dimensions and spacing.

## Transcribe → note → save → rating — 2026-11-27

Source: Figma section [ASR Recorder → Transcribe → Rating, 812:34976](https://www.figma.com/design/cc5bDyHoQauXzugSwTH4Wd/CarivaSpace-for-HosXP?node-id=812-34976). The user chose the main path first and this existing work item. Canvas pages, one per flow: **อัดเสียง** (Ready, Recording, Paused, Ready to transcribe, Playback), **สร้างโน้ต** (Generating, Note ready), **บันทึกเข้า HIS** (Saving, Saved, Closing session), **ให้คะแนน** (Good feedback, Feedback sent).

Changed to follow Figma: the recorder floats over the "Ready to record" area; the header shows `ButtonSplit` Stop (with elapsed time) or Transcribe; the earlier proposal of editable note fields after Stop is removed.

Assumptions and demo behaviour: only the 3-second "Note saved!" time comes from a Figma annotation; generating (3 s), saving (2 s) and closing (2 s) are placeholders. The split button menu offers Hide / Show recorder (the menu content is not in Figma). Copy All copies the mock note and shows a short Thai status. Canvas frames and state stories hold their first step (`holdInitial`).

Not built yet (the screens say so when pressed): Bad feedback with reasons, "Replace this note?" before a new recording, edit results, empty results, the error dialogs, the Delete-recording and Back-to-HOSxP dialogs as drawn in Figma (the earlier Thai demo dialogs remain), and closing errors.

Differences from Figma: the success check and loading spinner use DS icons (the Figma GIFs, 4.8 MB and 7.8 MB, were not downloaded); the logo stays visible on the Generating screen although that Figma frame hides it; Malila and Aktiv Grotesk Thai are not installed, so fallbacks render; a one-line "Prototype demo" note is added; there is no mobile Figma, so mobile is a responsive adaptation.
