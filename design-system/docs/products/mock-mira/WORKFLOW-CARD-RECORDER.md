# Mira Workflow Card and Recorder

Implemented from MIRA Component Library, not promoted into Core. See [Product visual specification](DESIGN.md) and [source snapshot](FIGMA-SOURCE-2026-11-27.json).

## WorkflowCard

Source set `0:108`, variants blue `0:109`, emerald `0:115`, cyan `0:121`, pink `0:131`, purple `0:141`.

Import `WorkflowCard` from `@/lib/products/mira/components/workflow-card`. Required `title`; optional `subtitle`, `color` (five values, default blue), `icon` ReactNode, `showBadge` (default true), `badgeLabel` (default Soon), `className` and div attributes. Default per-color emergency-bed icons are exact local Figma SVG exports. The card is presentational; its caller owns navigation, availability and interaction semantics. A Soon badge does not by itself impose a business permission rule.

```tsx
<WorkflowCard color="emerald" title="Title" subtitle="Description" showBadge />
```

Stories: Products/Mira/Components/Workflow Card. Five individual colors, AllColors, WithoutBadge and LongThai. Mira badge recipe has Product-specific surface/content colors and12px text rather than reusing an unrelated counter Badge.

## MiraRecorder

Source set `101:1374`: recording `101:1373`, pause `101:1372`, ready-to-transcribe `101:1370`, playback `101:1371`.

Import `MiraRecorder` from `@/lib/products/mira/components/mira-recorder`. Props:

| Prop | Contract |
|---|---|
| state | recording / pause / ready-to-transcribe / playback; default recording; controlled |
| title | default Voice Recorder |
| elapsedSeconds | displayed HH:MM:SS; default1; caller owns clock |
| durationSeconds, positionSeconds | seek bounds and current position; defaults721 /0; clamped to nonnegative finite range |
| waveform | optional readonly height values; finite/clamped1–100px bars; otherwise recording uses source reference heights and transport uses exact local Figma SVG |
| onPause, onResume, onStop, onDiscard, onPlay, onTranscribe | action callbacks; no media/transcription side effects inside component |
| onSeek | receives bounded seconds from timeline keyboard/range or5-second transport buttons |

```tsx
<MiraRecorder state={state} elapsedSeconds={elapsed} positionSeconds={position}
  durationSeconds={duration} onPause={pause} onStop={stop}
  onPlay={play} onSeek={setPosition} onTranscribe={transcribe} />
```

Recorder composes Core Card, Button and TagColor. Uses matching installed Material Symbols for transport controls and the exact Figma Transcribe icon. The parent must update controlled props after callbacks and implement audio permissions, recording, playback, data deletion and transcription. Source artwork is reference waveform geometry, not proof of a real recording. No microphone request/API/upload is made by this DS component.

Stories: Products/Mira/Components/Recorder. Four states, AllStates, Interaction, PageAndDialog, MobileThai and Callbacks. Interaction is a local demo harness; callbacks remain app-owned in production. Figma timeline text10px is rendered12px, so transport cards are438px rather than432px. No arbitrary shrink below12px is used to force the old height.

## Documentation and Code Connect status

Markdown and Storybook reflect implemented code. The supplied page contains no mapped docs frame; no Figma canvas write was made in this Figma-to-code task. Future Figma docs must use the existing Document Template in Core and verified Mira instances, not invent a layout.

Code Connect discovery returned **No published components found in this selection** on2026-11-27. get_code_connect_map returned empty. Source generation referenced `src/components/ui/WorkflowCard.tsx` with malformed names such as WorkflowCard/blue; that file/export does not exist in this checkout and was not treated as working code. No existing remote mapping was overwritten and no library was published. A parser-based local file `design-system/code-connect/mira-library.figma.tsx` is also present from concurrent work and was left untouched. Its presence does not verify a successful remote publication; our MCP discovery remains unpublished/empty. Publication and mapped Figma docs remain pending.

## Recording motion and HosXP consumer — 2026-11-27

Waveform bars animate only when `state="recording"`, using deterministic staggered CSS scaleY cycles1.4–1.88s. Container geometry stays unchanged. Paused and transport states have no waveform animation; prefers-reduced-motion disables it. This is activity feedback, not a measured audio signal. Timer output uses role timer and aria-live off to avoid announcing every tick. A zero-duration transport disables Play.

The user authorized CarivaSpace HosXP to import this Mira component directly. Its app controls timers/state/callbacks and local confirmation; component/theme ownership remains Mira, not shared Core. See products/carivaspace-hosxp/prototypes/hosxp-home/README.md for the host contract. Other cross-Product imports remain subject to the workspace boundary rules.
