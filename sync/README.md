# Figma ↔ Code drift check

This tool compares components in Figma against the components actually rendered in Storybook and reports which ones differ.
It checks values measured on both sides, so it does not rely on anyone remembering what was changed before.

> **Note (26 Nov 2026):** The DS has switched to shadcn (`shadcn/`). The Figma-vs-Storybook comparison scripts (`components.json`, `measure-storybook.js`, `regress-storybook.js`) are still configured for the MUI Storybook in `legacy/mui/` and have not yet been adapted to read the shadcn one. The **Canvas** works with both (for shadcn, use `?frames=frames.shadcn`).

Status: **Pilot**. Currently 3 are configured: CrvButton, CrvInput and CrvDropdown.

## What is compared

Compares every variant that is not hover / pressed / focused, for each configured part (e.g. `box`, `label`, `field`), using these values:

- Height, padding, gap, radius
- Fill color, border color, border width
- Text: size, line height, weight, family and color

**Not yet covered:** hover/pressed/focus, shadow, icon, content-dependent width, behavior, and props that have no visual effect.

## Files

| File | Purpose |
|---|---|
| `components.json` | Per-component config: Figma node, story, variant-to-prop mapping (`propMap`), parts to measure (`parts`) and which side is the source of truth (`source`) |
| `figma-extract.js` | Runs in Figma via figma-console `figma_execute` (read-only) |
| `measure-storybook.js` | Runs in the Storybook preview iframe to measure the actually rendered DOM |
| `server.mjs` | Local helper (port 6019) that receives the measurements from Storybook and writes them to files |
| `compare.mjs` | Compares the two sides and writes `report.md` and `report.json` |
| `snapshots/figma.json` | Values from Figma at the time they were pulled |
| `snapshots/code/*.json` | Values from Storybook at the time they were measured |

## How to run (Claude can run this for you)

1. Open Figma Desktop on the Cariva Core Design System file and keep the Desktop Bridge plugin open
2. Start Storybook: `npm run storybook`
3. Start the helper: `node sync/server.mjs`
4. Figma: put the entries from `components.json` in place of `__CONFIG__` in `figma-extract.js`, run it via `figma_execute`, then save the result to `snapshots/figma.json`
5. Storybook: open `iframe.html` and run
   ```js
   const src = await (await fetch('http://localhost:6019/script/measure')).text();
   await new (Object.getPrototypeOf(async function () {}).constructor)('ONLY', src)(['CrvButton']);
   ```
   Run only a few components at a time, because every variant has to be re-rendered
6. Generate the report: `node sync/compare.mjs`, then open `sync/report.md`

## Add a component

Add an entry to `components.json`:

- `nodeId`: taken from the `*.figma.tsx` file (Code Connect)
- `storyId`: found at `http://localhost:6006/index.json`
- `propMap`: maps a Figma variant to a React prop, in 3 ways:
  - Give the prop name directly
  - Give an object per variant value
  - Use `"$story": "<id>"` when the main story does not use that arg
- `parts`: the Figma layer name (use `"."` when it means the variant itself) paired with a CSS selector in the DOM. Add `text: true` for text, `domStroke` when the border sits on another element, and `ignore` to skip values that should not be compared

## Checking that a refactor does not change the look

`regress-storybook.js` collects the computed style of every element in every story (ignoring class names, attributes and text) and reduces it to a fingerprint per story. Run it before and after a refactor; if the fingerprints match for every story, the look has not changed.

```js
const src = await (await fetch('http://localhost:6019/script/regress')).text();
new Function('LABEL', 'FILTER', src)('before', '');   // FILTER = story id prefix, if you want to run only part of it
// wait until window.__regress.before.done is true (the full run takes about 40 seconds)
```

Keep the Browser pane open while it runs, because a hidden page runs very slowly. The story `experiments-cariva-layout-comparison--compare` gives unstable results (it shrinks the iframe via `ResizeObserver`), so it can differ even when nothing was changed.

## Reading the results

- **Differs** means a difference was found, but not which side is correct. Check `source` in `components.json` together with the edit history.
- Items under "Differs in every component" are usually theme- or token-level issues (e.g. font family), not a problem of any one component.
- **Matches** means it matches only on the values checked in the list above; it is not a guarantee for every state or every behavior.

## Canvas (Figma-style frames)

`node sync/server.mjs` then open http://localhost:6019/canvas (Storybook must run on :6006).
Each frame is a live Storybook story in an iframe on an infinite pan/zoom board.

- Pan: drag the background or hold space · Zoom: ⌘/ctrl + wheel · Move frame: drag its title · Resize: corner grip
- Add: type a story id in the bar and press `+ Frame` (the list autocompletes from `/index.json`)
- Layout lives in `sync/canvas/frames.json` and saves automatically — an AI can edit that file to add or arrange frames

The same board is also a Storybook page (**Canvas/Overview**), served from `/canvas/` via `staticDirs`, so it ships with every Storybook build (e.g. the Vercel preview). There it is read-only; arrange frames locally at `/canvas` on the sync server, then commit `frames.json`.
