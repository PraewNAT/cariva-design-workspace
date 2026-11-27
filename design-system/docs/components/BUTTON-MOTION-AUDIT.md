# Button motion — 2026-11-27

Code-only motion requested for button-decorative 5844:33868 and button-mic 5862:33778. Reused Button decorative and ButtonMic; no new props, tokens or Figma writes. Core consumers include HosXP and Mira Recorder. The shared stylesheet only matches requested variants/states.

| Before | After | Why |
|---|---|---|
| Static decorative gradient | 6s side aura + hover glow | AI feedback without moving label/layout |
| Static active wave | Five staggered scaleY cycles, 1.6–2s | Status feedback, not real audio metering |
| Disabled/inactive/dot | Remain static; reduced-motion disables effects | Preserve state meaning and motion preference |

**Component Reuse & Duplicate Check — Core Button motion**
Overall: reuses the existing components and API; nothing duplicated
Scope: Button, ButtonMic, and the related HosXP and Mira Recorder

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Existing variants/components | decorative class and active wave selector in the shared CSS | None |

Summary: Pass 1
Next: no further action needed

**Component Audit — Core Button motion**
Overall: focused checks pass; the original source a11y gaps remain
Scope: decorative/default, mic active/inactive/disabled/dot, page/Dialog, HosXP Interaction and Mira Recorder PageAndDialog

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | Focused stories | 8/8 including MotionStates and AiMotionPageAndDialog | None |
| — | Pass | Geometry and portal consistency | 32/40/48px; page/Dialog compared on height/radius/font/padding in the play test | None |
| — | Pass | Rendered motion gates | browser: decorative side aura 6s, wave 1.6–2s, inactive/disabled animation none | None |
| — | Pass | DS build | build passes | None |
| Medium | Needs fix | Original source contrast | white-on-primary 3.5:1 and consumer warnings in the test report | Open; palette not changed this round |
| — | Could not check | Live reduced-motion preference | CSS fallback/conditional assertions exist but the real browser preference was not toggled | Check when it can be simulated |

Summary: Pass 4, Needs fix 1, Could not check 1
Next: collect feedback on the motion timing

Updated BUTTON-SETS-FIGMA.md, BUTTON-MIC-FIGMA.md, ButtonSource.mdx and stories. This is new requested code motion, not extracted Figma motion. Figma docs were not edited because the request explicitly targets code. Code Connect usage/API remains unchanged.

## Original-gradient edge aura — 2026-11-27

| Before | After | Why |
| --- | --- | --- |
| Replacement side gradients (rejected by user) | Exact original Figma radial fill restored | Preserve the requested design |
| Broad moving light | Edge-masked copy of the same gradient, scaleX 1.12–.80 and opacity .12–.95 over 6s | Only cyan edges breathe; central overlay stays transparent |
| Constant glow | Fine-pointer hover strengthens glow over 240ms | Requested hover feedback |

Scope: shared Core decorative Button across Products, page and Dialog. Existing component/tokens/geometry reused; no new props/dependencies. Disabled/aria-disabled omit aura; reduced motion removes aura/glow/transitions. ButtonMic unchanged. Figma untouched; no claim of synced motion.

Focused tests: 4/4 passed, including exact original gradient colors/stops, moving transform, disabled gates and page/Dialog parity. Build passed. Browser inspected restored gradient; actual hover previously verified at 8px drop-shadow with 45% token opacity. Existing source contrast gaps remain. Full animated-gradient contrast across every phase and live OS reduced-motion toggle remain unverified.

Motion visibility refinement: increased side-layer travel and opacity after user feedback that the movement was no longer visible. Feathered outer mask edges avoid a hard moving seam; original base gradient remains unchanged.

Smoothness correction: removed the masked duplicate layer that produced visible stripes. The original continuous Figma gradient now breathes via centered background-size 112%–100% over 6s. This repaints the small button background; no moving mask seams or label motion. Supersedes the overlay implementation above.

Emil visibility refinement: continuous original gradient now breathes between 165% and 100% centered width over 5s, retaining a smooth ease-in-out loop. Wider travel makes both cyan edges visibly approach and retreat without layered seams.

| Before | After | Why |
| --- | --- | --- |
| 112%–100%, 6s | 165%–100%, 5s | Make edge travel perceptible while retaining seamless acceleration/deceleration |

Focused decorative and page/Dialog tests: 2/2 passed. Source contrast gaps and live reduced-motion verification remain pending as recorded above.

Quiet microphone refinement: inactive red bars now animate scaleY .65–1 with existing stagger; active green motion unchanged. Shared ButtonMic consumers receive the illustrative quiet motion. MotionStates and FigmaSpecs pass 2/2, covering geometry, disabled and conditional reduced-motion gates. Browser story inspected; real audio input and OS reduced-motion toggle not tested. Documentation updated in BUTTON-MIC-FIGMA.md and Storybook.

Idle color refinement: added soft static cyan inset light on both sides using the existing gradient-to token. The 165%–100% / 5s animation remains unchanged. This is a requested code visual adjustment beyond the static Figma fill.

Loop pacing refinement: 4s cycle with cubic-bezier(.37,0,.63,1), reducing perceived dwell at the turnarounds. Color and travel unchanged.

Latest pacing: 3s, cubic-bezier(.25,0,.75,1), shortening the turnaround dwell further after user feedback. Color and travel unchanged.

Clarified pacing: restore 5s cycle with linear interpolation. User wanted to remove turnaround dwell rather than accelerate the fade. Both halves connect immediately; fill, color and travel stay unchanged. Supersedes earlier speed refinements.

Emil perceptual-dwell correction: cap background expansion at 125% instead of 165%, keeping cyan within the visible button throughout the 5s linear loop. Removes the visually inactive out-of-bounds part rather than accelerating the fade. Original gradient stops/colors and idle side light unchanged.

| Before | After | Why |
| --- | --- | --- |
| 165% expansion pushes cyan beyond clipping | 125% expansion keeps light visible | Continuous perceived motion at the turnaround |

Latest user-requested speed: 2.5s linear cycle (1.25s per direction); 125%–100% travel and colors unchanged.

Color continuity correction: removed the added inset cyan shadows, which overlapped the original gradient and created an apparent extra color layer. Uses only the original continuous fill; 2.5s animation and outer hover glow unchanged. Supersedes idle inset-light refinement.

Emil gradient refinement: replace transparent-to-blue alpha interpolation with opaque token-based stops at 0/25/50/75/100%. Intermediate navy/blue mixes soften the central transition. This is an explicitly requested code deviation from the original Figma gradient interpolation. Animation remains 2.5s linear, 125%–100%.

| Before | After | Why |
| --- | --- | --- |
| Transparent navy blended over navy base | Opaque navy and gradual navy/blue mixes | Reduce visible transition bands without changing motion |
