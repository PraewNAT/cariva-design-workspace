# Button Mic — Figma specification

Read from Figma on 26 November 2026: the `button-mic` set (previously `crv-button-mic`, node `5862:33778`, Button page in the Cariva Core Design System file). The user confirmed the name and API as proposed by Claude. The usage documentation is in the `Button Doc (Template)` frame of the Button page (mic section: used only for selecting an audio device, not a record button)

## Sets in Figma (renamed; original names backed up in plugin data `oldName_2026-11-26` / `oldVariantNames_2026-11-26`)

| New name | Previous name | Changed prop | instances before → after |
|---|---|---|---|
| `button-mic` | `crv-button-mic` | `status` active / `deactive` → active / `inactive` | 1 → 1 |

Other props unchanged: `variant` wave / dot, `state` default / hover / pressed

## Spec (read from variables in Figma)

- Width 200, height 32, corner radius 12, padding 8, gap 4, transparent fill, text 12/16 Medium `content/secondary`
- Order: status indicator → 16 mic icon → device name (truncated with …) → 16 down arrow
- `variant=wave`: 28×16 sound wave, 5 bars, each 4 wide, gap 2, rounded corners · active heights 8 / 12 / 16 / 12 / 8 in `status/active/on-surface/default` · inactive all bars 8 tall in `status/error/on-surface/default`
- `variant=dot`: 16×16 box with an 8 round dot · active green, inactive red (same variables as wave)
- hover: fill `on-surface/action/hover` · pressed: fill `on-surface/action/pressed`

## Figma names ↔ code

| Figma | Code |
|---|---|
| `button-mic` | `ButtonMic` (`app/button-mic.tsx`) is a `<button>` |
| `variant` | `variant`: `wave` / `dot` |
| `status` | `status`: `active` / `inactive` |
| device name | `label` |
| `state=hover / pressed` | CSS (`hover:` / `active:`) |
| mic icon | `MicNoneRounded` (copied from Figma into `app/icons.tsx`) |

## Code (26 Nov 2026)

| Topic | Status |
|---|---|
| Width 200, height 32, corner radius 12, padding 8, gap 4, text 12/16 Medium `#334155` | Matches (measured in the `FigmaSpecs` story) |
| wave: 28×16 frame, bars 4 wide with heights 8/12/16/12/8 (active) and all 8 (inactive), green `#4ADE80` / red `#DC2626` | Matches (measured) |
| dot: 16×16 frame, 8 dot, color per status | Matches (measured) |
| hover `#F1F5F9` | Matches (measured in the browser with a real mouse) |
| Overall comparison with Figma (4 kinds) | Checked visually (matches) |
| keyboard focus | Checked in the `Default` story |

**Decided by Claude / user confirmed:** `deactive` renamed to `inactive` · the sound wave is a static image per Figma, with no animation and no reading of real audio levels; the caller passes `status` and `label` itself; there is no code for choosing a device or recording audio

**Impact:** a new component, no effect on existing code · the 1 instance in Figma is still there

**Not yet measured:** pressed color `#E2E8F0` (set from the token), the display when the device name is very long beyond truncation with …, the button has no menu of its own (opening the device list is the caller's job)

## Requested code motion — 27 November 2026

Supersedes the earlier static-wave decision: active wave bars now scale vertically in staggered 1.6–2s cycles. Layout heights/widths remain 8/12/16/12/8 and 4px; only their visual transform changes. Inactive, disabled, aria-disabled and prefers-reduced-motion stay static. Dot remains static. This remains a device picker; animation is illustrative status feedback, not live audio levels, capture or a recording indicator. All consumers of ButtonMic receive this behavior, including HosXP. API and Figma remain unchanged; Storybook MotionStates covers active/inactive/disabled/dot.

### Quiet red wave motion
User-requested refinement: inactive red wave now has gentle low-amplitude staggered motion (8px bars scaled .65–1), compared with the taller green active wave. Disabled/aria-disabled, dot and reduced-motion stay static. This is illustrative motion, not actual audio measurement; status API and device behavior are unchanged. Supersedes earlier inactive-static motion guidance.
