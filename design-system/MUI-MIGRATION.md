# MUI import — 24 November 2026

> **Status as of 26 November 2026:** This document is a dated record of what was written at the time; it has not been updated for every decision made since. The MUI code imported then now lives in `legacy/mui/` of the repo (the original `/Users/natthaphorna/Cariva DS` was restructured) and is for reference only. The current order of steps and decision gates are in `rules/workflow-map.md` of `shadcn/`.

The Core from `/Users/natthaphorna/Cariva DS` was brought into this workspace as a temporary base at the user's instruction, while the stack is being agreed with Dev. Work was not moved back into the old repository, and the original was not modified.

## Imported

- The original `code/core`: 407 files covering 47 component folders, theme, tokens, icons, stories, unit tests, documentation and Code Connect
- `tokens.json`, `figma.config.json`, `code-connect/` and the token generator
- The original specs kept in `design-references/mui/rules` and the original package metadata, including a manifest recording the SHA-256 of each file before adjustment
- MUI 7.3.11, icons 7.3.11, date pickers 7.29.4, Emotion and fonts, per the dependencies actually installed in the original
- Kept the destination workspace's React 19, Vite 8 and Storybook 10; did not move peer-bridge, secrets, node_modules or the Storybook 8 config

## Connection-only adjustments

- Story imports changed to `@storybook/react-vite`
- Fixed the checkbox/radio callback arguments in stories, the ModalDemo type, and a token that does not actually exist in the Sidebar story (`bg.page` → `bg.subtle`)
- React 19: use JSX type import and do not pass an unknown ref through SwitchBase props
- Narrowed the return type of the Table/Tabs style helpers to match what the callbacks actually return, so they can be composed into sx without changing style values
- Load the MUI theme/fonts in the app and Storybook and prebundle dependencies so the test runner does not reload mid-run
- Kept the original `code/core/CLAUDE.md` as a reference at `design-references/mui/CORE-CLAUDE.original.md` so the old rules do not override the current AGENTS.md

`code/core/tokens.ts` and `tokens.json` still match the original files; the design and API of Button were not changed.

## Getting it running

```sh
npm ci
npm run dev
npm run storybook -- --no-open
```

The main app on port 5173 shows the actual MUI components; Storybook on port 6006 shows the original library, and the Workspace page has a Code panel, usage and implementation source read from the actual files.

The earlier experiments are all still there; open them separately with `npm run dev:experiments` on port 5174 and `npm run storybook:experiments` on port 6007. They are not used as the main Core.

## Check results

- `npm run build`: passed, including typecheck of the MUI source and stories
- `npm run build-storybook`: passed
- `npm run tokens:check`: passed
- `npm run lint`: passed, with the existing Fast Refresh warnings still present
- Storybook rendering/interaction: 312 stories passed, including the three new migration-page stories
- Checked the desktop page, mobile at 390px and the modal; no JavaScript errors or page overflow found on the pages checked. The preview page text checked is no smaller than 12px
- Tested opening the modal with Enter, confirming, Escape and returning focus, plus comparing the size/font/corner radius of the page button and the modal button

## Remaining limitations

- Accessibility does not pass yet: the runner reports 209 story/rule pairs across 174 stories covering 11 rule groups, such as contrast, field/dialog/progress names and table semantics. See the list in `reports/mui-migration/storybook-results.json`. This is not a certification of the whole library, and the count is not the number of separate bugs
- The existing a11y `todo` was kept; no rules were reduced and no checks turned off. The primary colour `#1789fa` on white has a contrast of about 3.5:1 and needs a design decision to fix, separate from the import work
- Figma has not been synced to the latest: the old Button medium used metrics 36px, icon 20px and a fixed height, while the latest Figma wants Hug 40px, icon 24px; the font/mode data in the old tokens may also differ from the latest Figma
- Aktiv/Malila fonts require Adobe Fonts per the team's licence and config; this workspace kept the existing fallback and has not added loading of the remote kit, so there is no guarantee it renders in Aktiv on every machine
- Some of the original `.ai.md` docs, specs and integrations are out of date, with headings/values that may not match the implementation; the Workspace / Setup and source page states the scope that was checked, and there is no claim that every doc file is current
- The original Code Connect was kept, but nothing was published, no mapping was edited in Figma and parity was not confirmed
- The original unit tests were kept, but this round relied mainly on Storybook browser tests; the original unit-test runner has not been set up again

## Backup and rollback point

Before the import, the previous workspace files were kept at `backups/2026-11-24-before-mui.tar.gz`, including package/lock/config/source and symlinks, but not dependencies, build output or `.git`.

To roll back, extract the archive into an empty folder first, then run `npm ci` in that folder. Do not extract over new work without checking, because the archive does not delete files added later. Keeping this snapshot is not the start of DS version numbering.

Next step: agree the stack with Dev, then pick Button as the first sync task in the stated direction, and update docs and audit again.
