# External component adoption

Recorded 2026-11-25 following the user's clarification about consistent control curvature.

1. Identify Product/mode and inspect our actual DS components and recipes first.
2. Break imported UI into constituent controls. A Date Picker includes field/trigger, icons, popup and calendar day controls.
3. Reuse existing shared code primitives and local Figma DS instances where supported. Appearance overrides on foreign instances do not establish reuse. Report unsupported replacements and remaining remote dependencies; do not silently detach or create another library.
4. Match OUR approved radius/shape, height, padding/gaps, border treatment, typography/line-height, semantic colors, icon size/alignment and interaction states. Use existing props, variants and tokens; no ad hoc geometry to force a match.
5. Keep the same role/variant/size consistent within the chosen Product, including page and overlay usage. Fields and popups may intentionally have different radii; do not flatten everything to one radius.
6. Preserving approved geometry means preserving our DS recipe, not the source library's recipe. Explicit color/font-only scope or geometry restrictions still apply: report remaining differences before claiming completion.
7. Audit every affected variant and nested control, including open/closed, selected/range, hover/focus, disabled/error where relevant. Inspect rendered results and preserve behavior/content.
8. Update related docs. Distinguish visual consistency, token bindings, actual component reuse, behavior parity and code/Figma sync. State remaining gaps and unverified states.

Observed example: the copied Date Picker received Cariva colors and typography but retained its original field, which still differs from our Input. This workflow does not claim that field replacement or geometry alignment has already happened.
