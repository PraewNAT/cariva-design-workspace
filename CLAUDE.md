# Cariva Design Workspace

You are an AI assistant for the team that uses the **Cariva Design System**.

Read these files before every session:
- `shadcn/DESIGN.md` — visual principles, token, typography
- `shadcn/tokens.json` — the actual hex value of every semantic token (source of truth comes from Figma)
- `shadcn/rules/agent-rules.md` — the DS's (shadcn) UI work rules
- `shadcn/rules/workflow-map.md` — the order of steps and decision points of every flow (state the flow name and step code before starting work)

**Structure of this repo:** `shadcn/` is the current DS (component, tokens, Storybook) · `legacy/mui/` is the old MUI-style DS, kept for reference only; do not write new code into it · the root holds shared tools and docs (skills, sync, scripts, peer bridge)

---

## Available skills

Read `skills/{skill}/SKILL.md` before every task.

**🎨 Design System**

| Skill name | What it does | How to use |
|---|---|---|
| audit | Check a Figma component or screen: token binding and naming, QA before dev handoff, and map/fix to match the DS — report first, then ask whether to fix | `audit [name] node-id=[id]`, `QA screen [name] node-id=[id]`, `map [name] node-id=[id]` or `fix [name] node-id=[id]` (Thai: "แก้ [ชื่อ] node-id=[id]") |
| rename-frame | Batch rename screen/page frames to match the naming convention (`{Flow}/{Screen Name}`) — confirm the whole batch before changing | `rename frame [page/section name]` |

**📋 UI Flow & Review**

| Skill name | What it does | How to use |
|---|---|---|
| localization-export | Extract text from Figma, categorize it, and export/update it as Excel for the localization team | `export text [name] node-id=[id]` (Thai: "export ข้อความ [ชื่อ] node-id=[id]") or `update localization [name] node-id=[id]` (Thai: "อัปเดต localization [ชื่อ] node-id=[id]") |

**📝 Documentation**

| Skill name | What it does | How to use |
|---|---|---|
| document | Create or update a doc for a component (replaces the old `document-update`) | `create component doc [name] node-id=[id]` (Thai: "สร้าง doc component [ชื่อ] node-id=[id]") |

**💻 Code**

| Skill name | What it does | How to use |
|---|---|---|
| shadcn | Add/edit DS components with shadcn | `add component [name]` (Thai: "เพิ่ม component [ชื่อ]") |
| impeccable | Critique, audit or polish an existing interface (on request; reference only, our tokens and rules win) | `critique this screen`, `polish this component` |
| ui-ux-pro-max | Look up styles, palettes, font pairings and chart types (reference only; never replaces Figma tokens) | `suggest a palette`, `find a style` |
| unslop | Polish the UI's look (applied automatically to UI creation/adjustment work under our DS rules) | Just give UI task commands; no need to invoke it yourself |
| component-reuse-check | Find existing Core/Product components before building, check code for duplicates, and plan/review UI cases (confirmed / proposed / unresolved) | `check whether components are really used [path]` (Thai: "เช็คว่าใช้ component จริงไหม [path]") |
| pr-checklist | Run the checklist before merge and record the change in the changelog | `check this PR before merge` (Thai: "เช็ค PR นี้ก่อน merge") |

**🚀 Project Setup**

| Skill name | What it does | How to use |
|---|---|---|
| **create-project** | Create a React/shadcn prototype in `products/<product-id>/prototypes/<prototype-id>/` with its own localhost, Storybook Canvas / Preview / full-page views, and an index | Use when creating a new prototype; read the skill and inspect any existing app before scaffolding; never creates a repo, pushes or deploys automatically |

---

## Rules to know

- **The DS stack is not a choice** — Cariva DS is **React + shadcn/ui (Base UI) + Tailwind v4**, located at `shadcn/`; not MUI, not plain CSS (the user ordered the change from MUI on 26 November 2026)
  - Components live at `shadcn/src/lib/app/components/ui/` and token/theme at `shadcn/src/lib/core/design-system/` — use what exists before writing new, following the rules in `shadcn/rules/`
  - **Do not write new code into `legacy/mui/`** and do not use MUI `Crv*` components in new work; if you need to look at the old spec, read it for reference only
  - **There is no shadcn dev export yet** (the old export belonged to MUI and has moved to `legacy/mui/export/`); when writing code outside this repo, copy the component/tokens/theme from `shadcn/` and tell the user that there is no export script yet
  - **Do not ask the user which stack to use** — it is not a choice
  - **Do not create components that duplicate what the DS already has.** If the DS does not have what the design needs → you may create it, but you must add a comment marking it and report to the user that it is a DS gap
- **The DS's Figma source:** the file "Cariva Core Design System" (`XgxprkSY5mGbzIIwlmscCt`); the file "[Shadcn] Cariva Core Design System" is no longer used
- Do not hardcode hex or px — use tokens from the central DS only (a hook in `.claude/hooks/` blocks it automatically)
- If you need a new color → tell the DS team first; do not create it yourself
- **Screens always come with a Canvas (2026-11-27):** whenever a screen or flow is designed or changed in code, create or update its Canvas in the same task, one Canvas page per flow, frames in step order, with labelled lines showing which button leads where and an all-flows map (see the `create-project` skill)
- Figma wins — if a doc conflicts with Figma, trust Figma
- **The order of work and decision points** are at `shadcn/rules/workflow-map.md`; state the flow name and the current step code before working; do not skip a step without evidence
- **Every new component must be linked to Code Connect** — create/update `shadcn/code-connect/*.figma.tsx` for every set, run a dry-run, then publish before saying it is done (publishing needs the user's authorization; ask once and reuse the answer, and load the `figma:figma-code-connect` plugin skill before mapping); details in `shadcn/rules/workflow-map.md`
- **If the component you need does not exist** → search our Core/Product → official shadcn/ui → ReUI (reui.io/components) as a reference example, then adapt it into our recipe; **ask before running `npx shadcn add`** because it adds a dependency
- **When you need to draw a flow for the designer** → use the skill `artifact-diagramming` to draw a swimlane (you/Claude lanes); see details in `shadcn/rules/agent-rules.md`; use Mermaid when it must be kept as text in the repo
- **Updating `shadcn/tokens.json` must read values from the real Figma variables only** (then run `npm run tokens:generate` in the `shadcn/` folder) — do not guess, do not compute/estimate values yourself, and do not trust a doc frame or a node that is not directly a variable collection (for example a component's documentation page that may have variables from another file mixed in, or an "AI Readable" style doc frame that was verified before and found not to match the live variables) — the reliable method is to pull directly from the variable collection (for example via Figma Console MCP's `figma_get_variables` connected to the Desktop Bridge plugin in Figma Desktop); if the live variables cannot be accessed (Bridge not connected, no permission, the correct collection cannot be found, etc.) **tell the user about the problem directly and stop and wait**; do not fall back to guessing or using values from a source that is not the live variables without telling them

---

## Git & PR Workflow

The designer does not need to decide anything about branches — Claude handles it all; you may use normal git terms (commit, push, PR, merge)

**While working:**
- Everyone automatically has their own branch; do not ask what to name the branch or when to open/delete a branch
- This flow applies to **editing every kind of file in the project**, not just components — including skills (`skills/**`), `CLAUDE.md`, `rules/**`, `tokens.json`, `index.html`, or any other file on the machine
- Put another way: **every time a file is edited, however small or whatever type of file, always work on a branch**; never edit files directly on `main`

- Before editing, renaming or committing, check whether there are uncommitted changes you did not make (another chat or AI may be using the same folder): do not touch or commit them, tell the designer in plain language and ask whether that work is finished; commit only your own files and check the list before and after

**Every time one task is finished (small or large):**
- Always stop and ask first: **"This task is done. Want to commit + push now?"** (Thai: "งานนี้เสร็จแล้วครับ อยาก commit + push เลยไหม?")
- Do not commit/push on your own without asking, even if it looks like a small task
- If it has been pushed and there is no open PR yet, ask next whether to open a PR now or wait to accumulate other work first
- If a PR is already open, pushing to the same branch automatically updates the existing PR (no need to open a new one)

**When opening/updating a PR:**
- Always give the PR link
- Attach a preview link (e.g. Vercel) with a short summary of what was done — this is the only thing the designer needs to look at before merging; there is no need to read the diff/code

**Every time you come back to chat (no matter the topic):**
- Check the status of any open PR first, without waiting for the designer to ask, and report if it has been merged
- If it has been merged → sync the designer's branch with main automatically; do not ask about deleting/creating a new branch

**If you hit a merge conflict:**
- Say plainly that someone edited the same file at the same time, then fix it; the designer does not need to fix it themselves

**Check for updates from main every time a new session starts:**
- Every time a new session is opened (no matter what the topic), check whether `main` has new commits that the current branch does not have yet, before starting to answer or doing other work — not just at certain moments (such as before starting a new task or when the user asks "is there an update?" (Thai: "มีอัพเดทไหม"))
- If there are → merge `main` into the current branch automatically without asking first (it is bringing things up to date with the latest information, not submitting work)
- If you hit a conflict during the merge → fix it yourself, then summarize for the designer in plain language what was fixed; the designer does not need to fix it themselves
- If the conflict is so complex that you are not sure the fix is right (for example content that conflicts in meaning, not just in file structure), stop and ask the designer before deciding yourself
- **Do not explain the sync/merge/branch mechanics to the designer** — report only a short result such as "Your work has been updated to the latest version" (Thai: "อัพเดทงานให้เป็นเวอร์ชันล่าสุดแล้วครับ"), or if there is nothing new, do not report at all; only when you hit a conflict that really has to be asked about, explain it in plain language without using the terms merge/branch

**Overall principle:** the designer has only 2 jobs — (1) answer yes/no when asked whether to commit/push/open a PR (2) look at the preview and press merge — Claude handles everything else

---

## When notified that the DS has been updated

Open a new Claude Code session — the AI will read the latest `shadcn/tokens.json` automatically


## Cariva Design Workspace — user decision 2026-11-27

Use [workspace structure rules](rules/workspace-structure.md) for new work. Canonical DS path is `design-system/`; `shadcn/` is a compatibility symlink. Product prototypes belong in `products/<product-id>/prototypes/<prototype-id>/` in this same workspace; do not require a separate empty folder or forbid all Product work inside this repository. Never scaffold into DS or overwrite an existing app. Canvas tooling is `workspace/canvas/`, with `sync/canvas/` retained as a compatibility symlink. Maintain `products/README.md` with actual paths, run commands, local ports, Storybook and Figma references/status. Every new prototype uses React/shadcn with its own dev host plus shared-renderer Storybook Canvas / Preview / full-page access. Existing DS examples are not Product screens. Older absolute bans/legacy setup instructions conflicting with this decision are superseded; no automatic repo creation, commit, push, deployment or Figma writes.


## Daily repository update — 2026-11-27

Before starting work for the first time each day, check the branch/upstream and run `git fetch` to look for updates. If there are incoming commits and the working tree is clean, run `git pull --ff-only` from the existing upstream. Do not stash/reset/clean or merge/rebase on your own when there is unfinished work or the branch has diverged; report first instead. If there is no upstream or the remote is unreachable, state the limitation and do not claim the repo has been updated. Details and conditions are in the [workspace rules](rules/workspace-structure.md). This rule is not background automation and does not permit pushing.


## Always read create-project before starting any project — 27 November 2026

When the user asks to create a new project or prototype, whether by typing the skill name or by asking to implement a Figma screen as a new project, you must open and read this workspace's canonical `.agents/skills/create-project/SKILL.md` before scaffolding or writing any file, every time. Use the current version in the file; do not rely on memory from earlier work. Having read it, you may proceed under the existing authorization; this is not a step to request approval again, and editing a single component is not automatically treated as a new project.


## Delivery links — user decision 2026-11-27

Every delivery summary and PR description must include verified links to (1) the main Storybook, (2) the relevant Product prototype, and (3) its Canvas. If the full set is not available, include only item 1, the main Storybook. Do not invent missing destinations or include unrelated Product links. Label local URLs as local and deployed previews as previews; do not imply a new commit is deployed before verification. Discover actual story IDs from source/catalog. The main Storybook is https://cariva-ds-storybook.vercel.app.

Always include [Storybook หลัก](https://cariva-ds-storybook.vercel.app/) in replies that share a PR link, including short PR-link-only requests and commit/push completion replies. This applies even when Prototype and Canvas links are unavailable.

Prototype delivery links must use `<storybook-base>/iframe.html?id=<workspace-story-id>&viewMode=story` to hide Storybook manager UI while keeping the Product work-history sidebar. They must open the Product workspace story that renders `PrototypeShell` (for Mock HosXP: `products-mock-hosxp-prototypes-home--workspace`) so the work-history sidebar is visible. A single-state story such as `--ready` is a screen preview, not the workspace Prototype entry. Canvas full-page screen links remain separate.
