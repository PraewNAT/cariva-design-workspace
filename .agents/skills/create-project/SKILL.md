---
name: create-project
description: Creates a new prototype with React/shadcn and a Storybook that switches between Canvas / Preview and can open full page; applies to every Product without scaffolding over an existing project
---

# Create Project — Cariva prototype

> Workflow fit: used at step(s) S4 (prepare what is missing, when a prototype is needed) and flow 08 in the Storybook Workflows folder in `design-system/rules/workflow-map.md` (see the Skill column of each flow table). Load it when that step starts.

The user confirmed on 27 November 2026: every new prototype project uses React + TypeScript + shadcn/ui on Base UI + Tailwind and a Storybook that switches between Canvas / Preview and can open full page, replacing the old MUI/Crv workflow. This skill defines the delivery steps; it is not an automatic generator. Check the tooling that actually exists before starting: this workspace already has PrototypeShell and the Canvas viewer, but scaffolding a new app is still work the AI must do

## Starting work and finding the target

1. Read AGENTS.md, DESIGN-SYSTEM-PLAN.md and rules/skill-routing.md; name the Setup flow and steps S1–S5 per design-system/rules/workflow-map.md before working; screen work continues with U1–U6
2. Check the actual working directory, branch, remote, working changes and package. Do not scaffold over an existing app or write a Product app into design-system/. By default use products/<product-id>/prototypes/<prototype-id>/ in the same workspace; there is no need to attach a separate empty folder. If the Product or prototype id cannot be determined yet, ask only for that information. If a project already exists, reuse it and keep its existing stack; do not migrate automatically
3. Use the Product record per design-system/rules/product-setup-flow.md and onboarding per design-system/rules/new-project-guide.md. Ask only for missing information; do not guess the Product from the worker's name; do not require creating a remote repo or logging in before starting local work

## New flow: continue in the existing work item or split into a new one — 27 November 2026

“Work item” here means a prototype entry in the sidebar list, similar to a chat list; it is not a browser tab or a Page inside the Canvas, and it is not a command to create a new Codex chat.

- When the user asks for a **new flow**, first ask **“Continue in the existing work item, or split into a new work item?”** unless the request already states the answer clearly. Wait for the answer before adding the flow to the catalog/Canvas or creating a new work item. Reading requirements and searching for components may continue. Editing or extending a clearly existing flow uses the existing entry; do not ask again
- If **continuing in the existing work item**, use the existing prototype id and record, and add the flow/Page inside that work item's Canvas within the agreed scope; do not create a duplicate sidebar entry
- If **splitting into a new work item**, create a new prototype id and record in `workspace/prototypes.json` under the same Product, with a clearly separate name and URL, shown as a separate entry in the sidebar, with the work item's own Canvas catalog/entry at `products/<product-id>/canvas/<prototype-id>/` and `Products/<ProductName>/Canvas/<PrototypeName>`. Do not merge the new work item's frames/Pages into the old board, but the viewer and production components may be shared; do not copy screens unnecessarily
- Keep the work item's local source/fixtures in `products/<product-id>/prototypes/<prototype-id>/`, and bind the sidebar selection, Canvas, Preview/direct URL and docs to the same prototype id. Verify that selecting each entry opens the right work item, with no mixing of cases or overwriting of existing work. There is no need to create an extra server/port merely because the entry is split, if the existing runtime already separates routes and can be opened directly; a project with a separate runtime uses its own host per the rules below
- Record the method (`workspace-canvas` / `claude-artifact`) and the Claude link **of the split work item separately**, per the next heading; do not silently inherit the method or link of the original work item. If the user has not chosen yet, ask first. For the sidebar entry/Storybook artifact, point to that work item's real link
- Pages are used only to divide features/sub-flows **within a work item**; they do not replace splitting into a separate entry when the user chooses a new work item. Update the table of contents and docs to match the real structure. This rule does not permit automatically moving or splitting an entire existing work item

## Choosing the prototype method per project — 27 November 2026

Before starting a prototype, check the record by project/prototype id in `workspace/prototypes.json`. If there is no `prototypeMode` yet, ask UX/UI whether to use **our Canvas** (`workspace-canvas`) or a **Claude artifact** (`claude-artifact`), and wait for the answer before creating work that depends on this choice. Reading requirements/design may continue. Save the answer and reuse it next time; do not ask again. Do not apply the choice across projects, and do not automatically move existing work when the method changes

- Record `prototypeMode` and the path/Storybook title by work type in the existing record; do not create another table of contents. For Claude, use `artifactPath`, `storybookArtifactTitle` and the `claudeArtifacts` list in the format below. If the link is not yet known, ask UX/UI what this work item's artifact link is. While waiting use `url: null, status: "awaiting-url"`; once the link is received use `status: "provided"`, which is not evidence that it was opened and checked. Do not invent URLs or store tokens/credentials
- Separate by work type: workspace-canvas uses `products/<product-id>/canvas/<prototype-id>/` and `Products/<ProductName>/Canvas/<PrototypeName>`; **claude-artifact** uses `products/<product-id>/claude-artifacts/<work-id>/` and `Products/<ProductName>/Claude Artifacts/<WorkName>`, and is not put in the Prototype/Canvas folder or group. This item replaces the Canvas entry requirement in the split-into-a-new-work-item heading when the type is Claude
- One Claude work item can hold multiple links in the existing record via `claudeArtifacts: [{ id, title, url, addedOn, status }]`, used in place of the singular claudeArtifact for new work, without creating a duplicate catalog. Each link must have a name that conveys its flow/content and an added date in the form `YYYY-MM-DD` (Asia/Bangkok); show the name + date in the Storybook list/link catalog page so entries can be told apart. The added date is not the artifact's creation/edit date, which is not yet known. If UX/UI provides the source date, store it separately and state its meaning; do not overwrite or drop earlier links when adding a new link
- The Claude entry shows the name, date and real link from the central record, opening in a new tab with `rel="noopener noreferrer"`; if the link is missing, ask UX/UI and show that it is pending; do not create a made-up link unless the user explicitly asks for a mock, which must be a separate fixture and labeled Mock, not mixed into the real-work catalog. Do not force an iframe because the origin may not allow it
- Check the real capability before claiming that a Claude artifact can be created or updated. Choosing this method does not mean a Claude integration already exists. Do not scaffold a local app/server or copy an artifact automatically just to satisfy the local rules
- The React/shadcn rules, separate localhost, workspace sidebar, and Canvas/Preview/responsive frame arrangement in this skill apply to **workspace-canvas**. For Claude, use the actual artifact runtime and keep the external link in Storybook. This rule replaces the earlier text that required a local prototype for every project. Having a link is not an audit or code/Figma parity of the artifact

## Foundation for a new prototype

- Read design-system/DESIGN.md, design-system/tokens.json, design-system/rules/agent-rules.md and the project's shadcn skill. Use React + TypeScript + Vite for an empty target unless an app framework has already been agreed. Do not use legacy/mui or the MUI dev export
- Use component-reuse-check before implementing and after changes. Before coding, map each interactive role to the actual Core/Product component and import (for example, text entry → Textarea, single choice → RadioGroup/RadioField, action → Button), or record the missing contract. After coding, compare all native interactive JSX (`button`, `input`, `textarea`, `select`, `a`) against that map/catalog. Replace unexplained equivalents with DS components. Keep native controls when no compatible DS contract exists or native semantics are essential; record the concrete reason (such as a range input over a waveform seek track). This is a targeted guardrail, not a ban on native HTML. Use real Core/tokens; do not build imitation components. Check how the DS is brought into the actual target. Currently there is no ready-made shadcn dev export; do not claim there is a package to install. If vendoring is required, list the component dependencies, theme, fonts, styles and licenses completely. Record the source commit/imports actually checked; do not copy credentials, node_modules or the whole config from another project
- Core does not depend on routing/API/editor; screens, fixtures, cases and business logic live in Product; Canvas/preview tooling is separate from production components
- Every Product keeps its specific components in the Product area and in the Storybook group Products/<ProductName>/Components/<Component>, with docs/mapping consistent; do not put Product items in Core
- Use the Product font role/mode and verified semantic tokens; every rendered text is at least 12px

## Canvas is built together with the screens, flow by flow — user decided 2026-11-27

Whenever a task designs or changes a screen, page or flow in code (a new prototype, Figma → code, a new screen or state in an existing prototype, or design from requirements), create or update its Canvas **in the same task**. Do not ask whether to make it and do not leave it as a follow-up: the screen work is not done until the Canvas shows it. Component-only work uses Storybook stories and does not need a board.

- **One Canvas page per flow**, using the viewer's existing pages. Name each page after the flow in the user's words, and order the pages the way a user goes through the product. A flow is the sequence of states that reaches one goal.
- **Inside a flow**, frames follow the step order, read left to right and then top to bottom, titled `NN · <state> · <Desktop|Tablet|Mobile>` (numbers rise in step order). Each step is a primary-size + Mobile pair, spaced per "Grouping frames on the Canvas" below.
- **Connector lines (added 2026-11-27 after the user asked for a readable flow map):** the board catalog has a `title` and a `links` list, `{ from, to, label, kind }`, one entry per way of moving between steps. The label names the button pressed or the automatic trigger ("กด Save to HIS", "อัตโนมัติ 3 วิ (จำลอง)"); `kind` is `main` (green, forward), `alt` (blue dashed, back or optional) or `error` (red). Every step except the first needs an incoming line. Write only moves that the prototype really does. The viewer then draws the lines, an orange tag per flow, a board title and a first page **ผังรวมทุก flow** that shows all flows together.
- List the flows and their states in the case plan before building; if it is unclear which states belong to which flow, propose the list and ask. Do not invent steps to fill a board.
- When a screen or state changes or is removed, update or remove its frames, stories and fixtures in the same task.
- This does not remove the "continue in the existing work item or split into a new one" question above.
- A work item the user has recorded as `claude-artifact` has no local board; say so and ask whether they also want a local Canvas.
- Before delivery run `npm run canvas:check` (in `design-system/`) and open the board. The check covers catalog entries, flow pages, titles, step order and overlaps; it cannot tell whether a state is missing.

## Storybook: Canvas / Preview / Full page

Read the stories skill before editing UI/stories. Check the version and CLI help of the target package. Use the real scripts and reuse the correct server; do not use a newer CLI with an older version; do not automatically upgrade/install dependencies to match the skill. Request approval for installs or npx shadcn add per the rules actually in force when necessary

Every new prototype must have a Storybook entry and a clearly visible view switcher:

| View | Delivered behavior |
|---|---|
| Canvas | A board of multiple pages/cases that were agreed, with frame names and zoom/pan; each frame renders the real screen component, not an image or re-written UI |
| Preview | Click through the selected page/flow interactively; uses the same screens, fixtures and state logic as the Canvas; not docs/code snippets |
| Full page | Opens the selected case's Preview in a new tab without Storybook/board chrome; has in-page fullscreen when the browser supports it, with the normal keyboard/browser exit |

- Canvas means a board with multiple frames, not merely the name of Storybook's standard Canvas tab
- Switching Canvas / Preview keeps the selected screen/case. Store the selection/view in the URL or a mechanism that survives reload and allows sharing the local preview. Verify the direct link for real; do not invent a public URL
- Share the screens/cases catalog/metadata among the board, Preview, stories and docs; fixtures are deterministic and state how to reset state when switching cases; do not claim that state across multiple frames is synced if it has not been done
- Separate the board's pan/drag from the prototype's interaction; do not block buttons/forms and keyboard; check that portals/dialogs are not clipped or misplaced because of the iframe
- Search for an existing board before creating a new one. This DS checkout has workspace/canvas and Workspace/Canvas to check for reuse, but having an iframe does not mean a full mode switch/full page exists. Do not automatically pull the whole DS catalog into the prototype
- Organize stories by real Product/flow. Workspace tooling is separate from Core. Use the fullscreen layout for screen stories that need it. A workspace sidebar per the requirements below is required; do not create assumed release/version tabs
- The open-in-new-tab button has a name that says its destination and uses rel="noopener noreferrer"; where fullscreen is not supported, use the standalone Preview instead

### Grouping frames on the Canvas — standard for every project

The user confirmed on 27 November 2026: when creating or arranging a Canvas, pair the **Product's primary size + Mobile of the same page/state** next to each other, and leave space between groups so it is clear they are different pages/states.

- Use the primary size per the agreed design/Product: a Product that starts from Desktop uses Desktop + Mobile; a Product that starts from Tablet uses Tablet + Mobile. Do not automatically add Tablet as an extra size for a Product that is primarily Desktop, and do not assume a primary size when there is no evidence
- Place the primary size on the left and Mobile on the right, with top edges aligned and **32px** between the pair. Each flow reads as **one row**, left to right, with **640px** between step groups so line labels fit (a branch may sit on a second row, at least 640px below); groups never overlap. This replaces the earlier 320px, several-groups-per-row layout (changed 2026-11-27)
- Put the page/state name and viewport on each frame so the pairing is evident even when zooming or panning the board. Use the same real catalog/fixtures and screen components; do not copy UI to arrange the board
- If Mobile has no design yet, state that it is a responsive adaptation; if that cannot be done yet, report the gap and do not claim a complete Mobile set. Pairing does not permit inventing extra business cases
- Separate the Canvas entry from the prototype: use `products/<product-id>/canvas/<prototype-id>/` for the board entry and Storybook `Products/<ProductName>/Canvas/<PrototypeName>`; screen/flow stories stay in the existing Prototypes group, using the central viewer in the workspace without creating a duplicate implementation. Update the table of contents and docs to match
- Before delivery, verify that each pair is close together, groups are clearly separated, and no frames overlap, both in the overview and when zoomed in. Updating this skill is not an automatic move or rearrangement of the old boards of every Product

## Building UI, documentation, and acceptance checks

Use the case-planning section of component-reuse-check for agreed cases; separate confirmed/proposed/unresolved; do not invent business rules to fill the board. Update stories/docs/mappings per what is actually implemented, then run component-audit on the final result and the affected consumers

Criteria before delivering each prototype:

- Storybook opens for real, switches Canvas / Preview by mouse and keyboard, and keeps the selection
- Full page/new tab opens exactly the selected case, with no board chrome in the standalone Preview; direct URL/reload works and fullscreen can be exited
- Check the agreed desktop/mobile, overflow with long Thai text, and computed text minimum of 12px
- Check the key flows, focus/forms/overlays in both modes, and reduced motion if there are animations
- Run the build/focused checks per the real tooling; report what was not checked and blockers plainly; do not call a skill-only edit a UI implementation
- Deliver the setup/run commands, source/import instructions, the Storybook/Canvas/Preview links actually opened and checked, and the cases/gaps; do not start release numbering or version metadata on your own

## External scope

Creating a prototype does not authorize creating a remote repo, pushing, deploying, publishing a package/library, or writing to Figma automatically. Do those only when the user instructs and the destination is known. Do not copy the legacy Crv/MUI guard hooks into the new shadcn setup


## Separate localhost for each prototype — user confirmed 27 November 2026

Every prototype must have its own dev host/run command that can be opened without opening Storybook and can still be browsed through Storybook. Use the same renderer, screens and case fixtures; do not embed Storybook as a standalone app. Record the ports/URLs actually verified. Do not take another project's port. The full-page button in Storybook points to the same case on the prototype host; state that both servers must be running when used together. Do not tie every Product to the same port or silently use a URL from another project


## Cariva Design Workspace — 27 November 2026

Read rules/workspace-structure.md before choosing a location. The DS lives in design-system/, every Product's prototypes live in products/<product-id>/prototypes/<prototype-id>/, and tooling lives in workspace/; shadcn and sync/canvas are compatibility links, not another source. Do not rename the checkout/remote because of the workspace naming

After creating or moving work, update products/README.md with the Product, name/path, status, run command from the root, verified local URL/port, Storybook entry, Figma mapping/source and the date actually checked. State any missing fields; do not create an app or assumed data. Merging the workspace does not permit merging every Product's dependencies into the DS: keep packages/lockfiles and runtimes separate when needed; do not add npm workspaces automatically

Use the user's intent to define the work together with the Figma node; do not require full-screen frames only, and do not require Figma Desktop or a gh login when other tools can reach it or the work is local. The setup step does not permit automatic remote repo/push/deploy


## Workspace sidebar — required in every new prototype project

A standalone prototype must have a sidebar for choosing a prototype by Product from the real table of contents; do not default to opening a screen directly with no way to choose work. Use the shared shell in workspace/presentation/PrototypeShell.tsx and the list workspace/prototypes.json when in this workspace; do not create a duplicate sidebar implementation in every Product

- Show Product groups and the prototypes that actually exist; selecting one opens it; groups collapse/expand; do not create assumed version entries
- The collapse/expand button is in the sidebar header: collapsing leaves a rail that still lets you pick work, with accessible names/tooltips
- Cmd/Ctrl + Backslash (`\`) hides the whole sidebar, leaving no floating button or hint on screen, and the content expands to fill the area. Press again to restore the sidebar, and focus must not stay stuck on a hidden element
- The shortcut hint appears only in the sidebar footer, hidden with the sidebar/rail. When capturing screens to Figma, use the fully hidden mode
- The Storybook preview of a screen shows UI only, so it can be compared with Figma, but there must also be a story for the shell/work selection; the normal local host has the shell enabled

The user insisted that this skill be read before creating every new project/prototype (27 November 2026), including when work is assigned from Figma without naming the skill
