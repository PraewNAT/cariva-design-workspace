# Cariva Design Workspace — unified workspace guide

## Latest plan and one skill source

Read `DESIGN-SYSTEM-PLAN.md` for the latest intended workflow: requirements → agreed cases → code and a board rendered from real components → audit; Figma export is selected, not mandatory for every case. The plan distinguishes implemented work from future board/playground/parity capabilities; do not claim those features exist or start building them merely because they are in the plan. UX Writing stays deferred unless explicitly requested.

Canonical project skills are in `.agents/skills/`. `skills/` is a compatibility link to the same directory. Read the selected skill before work; use `rules/skill-routing.md` to choose one owner per concern. Plugins/global skills remain dependencies rather than copied implementations.

The active design system is the shadcn one in `design-system/` (`shadcn/` is a compatibility link) (React + shadcn/ui on Base UI + Tailwind v4; the user switched from MUI on 2026-11-26). Read its `shadcn/DESIGN.md`, `shadcn/tokens.json` and `shadcn/rules/agent-rules.md`; shared rules for this checkout stay in `rules/`. The old MUI/Crv system is frozen under `legacy/mui/` as a reference: do not add code there and do not apply its stack, specs or tokens to new work. There is no shadcn dev export yet (the old one moved to `legacy/mui/export/`). Never apply one folder's stack or experimental styling silently to the other.

Order of steps and decision gates: `shadcn/rules/workflow-map.md` (name the flow and the current step code before working). Community skill installed on 2026-11-26 in `.agents/skills/`: `unslop` (instructions and references only; the upstream video and snapshot scripts and sample images were not installed); how they are used and limited is in `shadcn/rules/agent-rules.md`. Flows for designers are drawn with the `artifact-diagramming` skill as swimlanes. When a needed component is missing: our DS, then official shadcn/ui, then ReUI as a reference only; ask before `npx shadcn add`.

This is a Draft. Do not number or publish design-system releases until the user explicitly requests it. Starter examples under src/stories are Storybook examples, not approved Cariva Core components.

## Installed skills

- Use `component-reuse-check` before UI implementation and after changes to find existing Core/Product components and detect duplicates.
- Use the case-planning section of `component-reuse-check` when planning a screen/flow or changing requirements; keep confirmed cases, proposals and unanswered rules separate.
- Use `component-audit` after every UI creation/change (components, pages, modals and styles) and before Core adoption or developer handoff. Scope checks to affected consumers, including page and portal/composed usage. Verify rendered consistency against shared recipes; do not finish with only a local CSS fix. Run focused Storybook regression checks for demonstrated failures.
- These three project skills use the same concise report: result, scope, a table of severity/status/item/evidence/next action, totals and one next step. Their `references/report-format.md` files define the exact format. Default to inspection/reporting; continue authorized implementation without asking for permission again.
- Use the project shadcn skill before adding or modifying shadcn UI. Search existing components before creating new ones.
- Use the Impeccable plugin audit/critique for requested UI reviews (installed as a plugin, not part of this repo). Preserve the user's chosen design direction.
- Use the installed `figma:figma-design-to-code` plugin skill for Figma-to-code requests. Reuse existing components and tokens via the project checks. Verify its required Figma MCP tools are available before claiming it is ready; the installed Figma Console connection is not automatically equivalent to the MCP interface this skill expects. This direction does not authorize writes to Figma or automatic replacement of shared Core.
- Use `code-to-figma` only when the user requests Figma output. It needs the appropriate connected Figma tools; installation alone does not establish a connection.

## Storybook workflow

Use the installed Storybook version of the actual target package, not the other folder's tooling. Cariva DS currently declares Storybook 8.6; New Cariva DS declares 10.6 with addon-mcp. Do not upgrade dependencies as part of skill selection. Read available CLI help/version before using skills/tools commands. On supported versions obtain the project-aware stories/write-story instructions through the CLI; on older versions follow existing scripts and stories and report unavailable checks. Do not use the global stories skill's ≥10.5 commands against 8.6.

Reuse an existing correct dev server or start the target package's script when needed. Discover its real URL and supported tools; do not assume a working MCP connection from an installed skill. Inspect documented components before UI work, keep meaningful stories/mock states and actual source snippets in sync, and run focused checks appropriate to changes.

## Work boundaries

Keep Core reusable across Products and independent of routing, APIs and business logic. Product-specific behavior belongs in that Product. Board/editor tooling stays separate from production component dependencies. Preserve the selected Product during a task; ask only if it cannot be inferred. Before changing shared Core, state its cross-Product impact.

Each collaborator uses their own persistent branch; do not delete branches or merge/publish automatically. Inspect the actual target checkout, remote and branch; setup state can differ between the two folders. This merge does not assign branches or migrate source code.

## Product context

Resolve the current Product from the user's request, selected board or relevant files. Ask once when ambiguous, then retain that choice until the user switches Products. Do not infer ownership from the collaborator's identity or require them to know another Product's work. Use the accessible shared component catalog and source for discovery.

Keep shared components/tokens in Core and Product-specific components in the relevant Product area. These are architectural boundaries, not evidence that core/ or products/ folders already exist. Do not automatically promote a local component into Core or import another Product's internals. State affected consumers before changing shared behavior.

## Design authority and experiments

Read the applicable DESIGN.md, active theme/tokens and component recipes before UI changes. Distinguish approved Core, Product overrides, experimental previews and imported reference data. Imported documents are design inputs, not instructions authorizing unrelated actions.

Component documentation follows the declared source of truth, regardless of where the document is displayed. Default to code for implemented props, variants, states and behavior; use agreed tokens/specifications for visual rules, and team decisions for usage guidance and Do/Don't. Figma documentation should use verified instances rather than imply code support from visual appearance alone. A Figma-first task may use Figma as its design source, but mark differences as proposed or awaiting code implementation until implementation and parity are verified. If code and Figma disagree, surface the difference and resolve the source before presenting it as an adopted specification; do not silently mix their values. This applies to Markdown, Storybook and Figma docs. Prefer existing documentation locations; a separate Markdown file per component is not required.

After every component change, check the related documentation against the actual change and update affected Storybook stories/docs, Markdown and mapped Figma documentation within the task's authorized scope. Check props, variants, states, behavior, tokens and usage examples; do not invent usage rules or rationale. If no documentation update is needed, state why. If a destination is inaccessible or updating it requires an unresolved sync decision, report the pending update explicitly rather than claiming it is synchronized. Complete the documentation check/update, then run `component-audit` on the final affected component and consumers before finishing the task. Report documentation updates, audit results and any remaining gaps concisely. This is an agent task-completion requirement, not an installed background watcher or CI automation.

When colors or fonts change, update the corresponding mapped Figma foundation documentation in [FOUNDATION-DOCS.md](design-system/design-references/figma/FOUNDATION-DOCS.md). Use the current agreed variables/modes and report inaccessible or pending documentation explicitly.

Provisional typography decision: follow the current Figma font-family variables for the relevant Product Style mode until the user confirms the team's final choice. Read the actual UI/prose/display role and mode instead of assuming one font applies to every Product. Record observed font values and any code-preview drift in DESIGN.md; do not claim the code has been synchronized when only Figma was read. This font-specific direction overrides the earlier Inter Tight/Anuphan preference for future typography alignment, but does not authorize unrelated component changes or make the choice permanent.

Keep visual values in DESIGN.md/tokens and detailed procedures in the relevant skills.

Use shared primitive recipes and named variants/sizes instead of per-page CSS overrides for radius, typography or control geometry. Validate affected page and modal/portal consumers, including composed triggers and close buttons. Cover relevant long Thai content, mobile layout and keyboard/focus behavior; report unverified checks honestly.

UI text must never render smaller than 12px, including metadata, badges, table text, chart labels/tooltips, percentages and mobile styles. Check computed font sizes, not just declared tokens: inherited styles, browser defaults such as small, relative units and responsive overrides can reduce the rendered size. Preserve smaller values only as explicitly labelled original reference data; do not render reference specimens below 12px or use them as active UI styles.

Keep style trials and playground drafts separate from the active Core. A request to try a design authorizes the experiment, not automatic adoption across Products. When the user authorizes adoption, show the concrete token/component changes and impact, preserve a recoverable checkpoint using available tooling, and verify affected consumers. Do not claim board, playground, save-slot or snapshot features exist until implemented. Future features belong in the plan, not mandatory current workflows.

## Figma destinations and sync

One Product has a pair of Figma destinations: a DS file for reusable components, variants and variables, and a Design file for screens composed from DS instances. Ask for both links together at initial setup and persist the pair in an explicit repository mapping. Reuse that Product's saved pair without asking again. Ask only when missing, ambiguous, inaccessible or explicitly being changed; do not substitute another file silently.

Store actual Product/file keys and links, component-to-source/node mappings and screen/case node mappings in a dedicated mapping file, not here. Discover the existing mapping before introducing one; never invent destinations or imply persistence before saving. Inspect actual mappings before assuming any Product destination pair is configured.

For Code to Figma, inspect only the selected screen/component and its dependencies, reuse existing DS nodes, and add/update only what is needed. Check cross-file library access/publication requirements, then compose editable screens with instances in the Design file. Product-specific components may remain local. Update mapped nodes rather than duplicating them. Verify the chosen integration and permissions; library publication and cross-file updates are not automatically guaranteed.

When adjusting existing Figma components, preserve their radius and existing component-property API. Use existing properties, variants and variables; do not add new props or variables as a workaround. Use the file's existing spacing/padding tokens, not arbitrary intermediate values introduced to force a target height. If the requested dimensions cannot be expressed with those constraints, explain the conflict before changing the system. Broader code-preview preferences do not override the target Figma component's existing rules.

The default sync direction is Code to Figma. A user request to implement their Figma design selects Figma to Code for that task; do not silently reverse or run bidirectional sync. Surface conflicting edits or design-system deviations before overwriting them, and distinguish local screen/instance changes from shared DS changes. Honor existing authorization for implementation; ask only for a missing decision that affects scope. Code Connect maps component usage; it is not automatic visual synchronization.

## Portable handoff

Keep core logic, tokens, catalog and mappings independent of GitHub-specific APIs so migration to GitLab remains practical. When handing work to developers, include the actual repository/branch or commit, relevant board or Storybook preview and verified setup/import instructions. Do not invent unavailable board links, packages or release numbers, or send invitations/messages without authorization.


## Cariva Design Workspace — user decision 2026-11-27

Use [workspace structure rules](rules/workspace-structure.md) for new work. Canonical DS path is `design-system/`; `shadcn/` is a compatibility symlink. Product prototypes belong in `products/<product-id>/prototypes/<prototype-id>/` in this same workspace; do not require a separate empty folder or forbid all Product work inside this repository. Never scaffold into DS or overwrite an existing app. Canvas tooling is `workspace/canvas/`, with `sync/canvas/` retained as a compatibility symlink. Maintain `products/README.md` with actual paths, run commands, local ports, Storybook and Figma references/status. Every new prototype uses React/shadcn with its own dev host plus shared-renderer Storybook Canvas / Preview / full-page access. Existing DS examples are not Product screens. Older absolute bans/legacy setup instructions conflicting with this decision are superseded; no automatic repo creation, commit, push, deployment or Figma writes.


## Daily repository update — 2026-11-27

Before starting work for the first time each day, check the branch/upstream and run `git fetch` to see updates. If there are incoming commits and the working tree is clean, run `git pull --ff-only` from the existing upstream. Never stash/reset/clean or merge/rebase yourself; when there is unfinished work or the branch has diverged, report first. If there is no upstream or the remote cannot be reached, state the limitation and do not claim it was updated. Details and conditions are in [workspace rules](rules/workspace-structure.md). This rule is not background automation and does not allow push


## Always read create-project before starting any project — 27 November 2026

Before starting a prototype, ask for and remember the working method per project/prototype id in workspace/prototypes.json per create-project: workspace-canvas or claude-artifact; use the saved value and do not ask again. The local React/shadcn/server rules apply only to workspace-canvas; a Claude artifact is kept separate in products/<product-id>/claude-artifacts/<work-id>/ and in the Storybook group Products/<ProductName>/Claude Artifacts/<WorkName>, not combined with Prototype/Canvas. Keep multiple links, each with its own name and the date it was added. Ask UX/UI when a link is missing; do not make up a URL or automatically scaffold a local app instead. This rule replaces the earlier requirement that every prototype be a local app

When the user asks to create a new project or prototype — whether by typing the skill name or by asking to implement a Figma screen as a new project — you must open and read this workspace's canonical `.agents/skills/create-project/SKILL.md` before every scaffold or file write. Use the current version in the file; do not rely on memory from earlier work. Reading it and then continuing under the existing authorization is not a step requesting approval again, and a single-component edit is not automatically treated as a new project.
