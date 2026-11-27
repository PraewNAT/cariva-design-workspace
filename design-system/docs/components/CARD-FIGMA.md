# Card — Figma → Code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4713-2014). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


Draft · 26 November 2026 · Core · branch `praew` · not committed/published

Design source: [Cariva Core Design System / Card](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4536-123342). Read the real nodes and screenshots; did not write back to Figma.

## Mapping and scope

| Figma | Existing code | Variants checked |
|---|---|---|
| `card-horizontal` 4570:20745 | `CardHorizontal` | `imagePosition` left/right/absolute; reference size 420×190, min-height 190, corner radius 16, content padding 16 |
| `card-vertical` 4657:31022 | `CardVertical` | width 330, padding 16, corner radius 16, image 3:2, actions 1–2 buttons in a row gap 16 |
| `card-small-horizontal` 4570:20655 | `CardSmallHorizontal` | 344×104 for short text, corner radius 12, padding 12/16, image 80×80 corner radius 8, action slot 40×40 |
| `card-profile` 6550:55333 | `CardProfile` | subtle/white/outlined; 320×116 when there is a 40 avatar and 2 detail fields; padding 12 corner radius 12 |
| `card-metric` 6557:330 | `CardMetric` | normal/abnormal; 90×56, padding 8, corner radius 12, warning icon 12 |

This work changes the compositions in `app/content-card.tsx` and the stories; it does not change the shared primitive `ui/card.tsx`, Button, Badge or Avatar. The existing Card remains usable for the catalog and chart. No production consumer of the compositions outside stories was found in the checked checkout.

## API the code actually supports

`CardVertical`, `CardHorizontal`, `CardSmallHorizontal` accept `title` (required), `description`, `image`, `tag`, `actions`, `className` and div props. Slots are the caller's ReactNode; no image, button or business data is generated automatically. No slot passed = that part is hidden. The boolean props `showImg`/`showTag`/`showDescription` from Figma do not exist yet because the existing composition API is used.

- `CardHorizontal` adds `topMessage?: ReactNode`; `imagePosition` accepts left/right/absolute. The code default stays `left` to preserve the existing API, unlike the Figma default which is right; set `imagePosition="right"` when that layout is needed.
- The left/right image has a max width of 178px (42.381% of the card), while absolute is the full card height with a max width of 183px (43.5714%), placed overlaid on the right behind the content. The top content reserves room for the image and the button sits on the top layer at full width. **absolute does not stack the image vertically**.
- `CardVertical` actions are children of a flex row: 1 button fills the row, 2 buttons split it equally with gap 16. Figma uses Button sm 32px; the caller passes real Buttons. There is no prop `button="1"|"2"` in the code.
- `CardSmallHorizontal` uses `image` as the 80px left slot and `actions` as the 40px right slot. The tag group and title/description have gap 8; this recipe does not truncate title/description.
- All three Cards have a reference width and `max-width:100%`; height can grow when text is long. Information is not hidden with a fixed height just to force the short-text spec size.
- `CardProfile` accepts `avatar`, `name` (required), `identifier`, `details: {label,value}[]`, `style="subtle"|"white"|"outlined"`. Normal width is 320px with max-width 100% so it shrinks to the available space. `style` is the existing visual variant, not inline CSS. Name/identifier still truncate per the original contract. Core makes no judgement about identity or personal data.
- `CardMetric` accepts `label`, `value` (required), `unit`, `status="normal"|"abnormal"`; the value 0 is displayed normally. Judging abnormal must be done outside the component; the component has no medical threshold or logic.

## Typography and tokens

Title 20/28 SemiBold 600; description 14/20 Regular; topMessage 12/16 Regular. Profile name 16/24 SemiBold, identifier 12/16 Regular, detail label 12/16 Medium, value 14/20 Medium. Metric label/unit 12/16 Medium, value 14/20 Medium. The browser checked uses IBM Plex Sans Thai; all three content recipes set `--font-ui` directly. No text is rendered below 12px.

Figma bindings actually read: abnormal fill `color/status/error/on-surface/subtle` and value `color/status/error/content/default` (the generated context mislabels it as success, but the real value is error). Unit in Figma uses `color/content/disabled`; the user approved the code changing only Unit to `content/secondary` to fix contrast, so this is an agreed difference. Profile subtle and Metric normal use `--cds-bg-subtle` #f1f5f9 per Figma without changing the shared token. Tag uses the existing Badge standard success and overrides side padding 8 for Card only, as approved by the user, without changing the shared Badge.

## Working example

```tsx
<CardHorizontal
  image={<img src={imageUrl} alt="คำอธิบายภาพ" />}
  imagePosition="absolute"
  tag="ใหม่"
  topMessage="อัปเดตล่าสุด"
  title="หัวข้อ"
  description="คำอธิบาย"
  actions={<Button size="sm">ดูรายละเอียด</Button>}
/>
<CardVertical
  title="หัวข้อ"
  actions={<><Button size="sm" variant="outline">ยกเลิก</Button><Button size="sm">ยืนยัน</Button></>}
/>
```

The placeholder checkerboard and avatar in the stories are the original asset exports from Figma in `app/assets/card/`; they are used to compare slot geometry and are not real Product data. Arrow16 is used only on the Horizontal button; Small Horizontal uses the Core icon button as an example of a dynamic action slot. Metric uses the existing WarningRounded12 from Figma. Temporary asset URLs are not used at runtime.

## Verification and limitations

Storybook: **Core → Components → Card** (primitive and compositions together in a single Docs). Stories: Default, Vertical, VerticalTwoActions, Horizontal, SmallHorizontal, Profile, Metric, OptionalContent, LongThai, PageAndDialog. 10 stories in total in `ui/card.stories.tsx`; the old links in Patterns now use `core-components-card--*`. The audit data from before the regrouping still refers to the IDs at the time of the check. Rendering was compared for page/portal, long Thai text, empty slots and keyboard/focus; details/open items are in `CARD-AUDIT.md`.

Everything fixed as confirmed: Profile/Metric subtle fill, Unit content/secondary, Tag padding 8 and Profile max-width 100%. The Profile story was additionally checked in a 240px frame; at mobile 320px the whole page and the Dialog do not overflow horizontally. Tests ran and passed 12 stories including the existing Card/Chart/catalog; build/migration, tokens, Storybook build, coverage 39/39 and focused lint pass. The browser checked keyboard Enter, focus trap and Escape returning focus.

The user asked to keep the Metric abnormal colour at contrast 4.41:1 and record it as an open item; Button primary 3.50:1 is a shared open item that was reported before, and the shared token is not changed. A passing test run does not mean AA or pixel parity passes everywhere.
