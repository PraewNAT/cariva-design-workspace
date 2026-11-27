# Rating — Draft 26/11/2026

[Figma source](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4887-4878) · [Figma docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4887-55058). Template docs use21 linked instances:6 ratings and15 star variants. No Figma main property/name/geometry changes.

Implementation `app/rating.tsx`; `app/patterns.tsx` re-exports Rating, preserving existing imports. All cases remain under `Core/Components/Rating`.

`value`/`defaultValue` number0–5 (clamped; non-finite becomes0), `onValueChange(number)`, `precision`1/0.5, `size`sm/default/lg (18/24/30px), disabled, readOnly, label, className. defaultValue3 preserves the old example's behavior. Controlled consumers update value from the callback. A fractional value renders partially filled stars even when interactive precision is1; choosing a new value then uses the chosen precision.

Five original StarSharp vectors are rendered from local `assets/rating/star-full.svg` and `star-empty.svg` as masks. Each source SVG remains20×19 inside a24px base slot; size variants scale the whole slot. Half values clip the filled star over its outlined shape. Active accent/amber/A04; empty border/default; disabled content/disabled. No raw replacement color or new token.

Shared RadioGroup + Base UI Radio.Root handle1–5 or0.5–5 choices. Pointer preview is temporary; click/arrow commits. Native ArrowRight half-step verified. Hover scale matches Figma child width23/29/36px for the18/24/30 slots and is disabled by reduced-motion. Keyboard selection adds focus indication without movement. Each instance owns unique IDs and radio group state. Disabled is gray/noninteractive with aria-disabled and removed tab stops. readOnly exposes an accessible score image without input controls, and keeps normal colors. Numeric score/status is12/16px; label14/20px.

Known limits: original amber/empty outlines have low non-text contrast on white; compact18px and half-star pointer targets are below24px. Preserve source visuals and report these instead of claiming complete WCAG conformance. For display-only use readOnly (or disabled when gray is intended); Product defines meaning. No clinical severity semantics or backend persistence are implemented. Page/Dialog and long Thai cases are checked; physical touch hardware and screen readers remain unverified.


## Renamed in Figma — 26 November 2026

Renamed the sets and props in Figma to match the code (original names backed up in plugin data `oldName_2026-11-26`; the instance counts 6 and 75 are the same as before): `<Rating>` → `rating` (`size` lg/default/sm, `disabled` false/true) and `Star` → `rating-star` (`size`, `value` empty/half/full, previously `Active` False/Half/Full, `state` default/hover, previously `Hovered`). The text in the Rating Figma doc frame still uses the original names
