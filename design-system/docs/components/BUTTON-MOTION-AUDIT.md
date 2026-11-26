# Button motion — 2026-11-27

Code-only motion requested for button-decorative 5844:33868 and button-mic 5862:33778. Reused Button decorative and ButtonMic; no new props, tokens or Figma writes. Core consumers include HosXP and Mira Recorder. The shared stylesheet only matches requested variants/states.

| Before | After | Why |
|---|---|---|
| Static decorative gradient | 6s side aura + hover glow | AI feedback without moving label/layout |
| Static active wave | Five staggered scaleY cycles, 1.6–2s | Status feedback, not real audio metering |
| Disabled/inactive/dot | Remain static; reduced-motion disables effects | Preserve state meaning and motion preference |

**Component Reuse & Duplicate Check — Core Button motion**
ผลรวม: ใช้ components และ API เดิม ไม่สร้างซ้ำ
ขอบเขต: Button, ButtonMic, HosXP และ Mira Recorder ที่เกี่ยวข้อง

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | Existing variants/components | decorative class และ active wave selector ใน shared CSS | ไม่มี |

สรุป: ผ่าน 1
ต่อไป: ไม่ต้องดำเนินการเพิ่ม

**Component Audit — Core Button motion**
ผลรวม: focused checks ผ่าน; source a11y gaps เดิมยังอยู่
ขอบเขต: decorative/default, mic active/inactive/disabled/dot, page/Dialog, HosXP Interaction และ Mira Recorder PageAndDialog

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | Focused stories | 8/8 รวม MotionStates และ AiMotionPageAndDialog | ไม่มี |
| — | ผ่าน | Geometry และ portal consistency | 32/40/48px, page/Dialog เทียบ height/radius/font/padding ใน play test | ไม่มี |
| — | ผ่าน | Rendered motion gates | browser: decorative side aura 6s, wave 1.6–2s, inactive/disabled animation none | ไม่มี |
| — | ผ่าน | DS build | build ผ่าน | ไม่มี |
| กลาง | ต้องแก้ | Source contrast เดิม | white-on-primary 3.5:1 และ consumer warnings ใน test report | ค้าง; ไม่เปลี่ยน palette รอบนี้ |
| — | ตรวจไม่ได้ | Live reduced-motion preference | มี CSS fallback/conditional assertions แต่ไม่ได้สลับ browser preference จริง | ตรวจเมื่อจำลองได้ |

สรุป: ผ่าน 4, ต้องแก้ 1, ตรวจไม่ได้ 1
ต่อไป: รับ feedback จังหวะ motion

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
