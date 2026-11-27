# Cariva Design Workspace — 2026-11-27

## Ownership and location

| Area | Content owner |
|---|---|
| design-system/ | shared Core, tokens, theme, Product DS components, DS docs and Storybook |
| products/<product-id>/prototypes/<prototype-id>/ | app, screens, cases, fixtures and dependencies specific to the prototype |
| workspace/ | Canvas, catalog and preview tooling that are not production dependencies |
| legacy/mui/ | frozen reference; not used for new scaffolding |

A single workspace can be used; there is no need to attach another empty folder before creating a Product prototype. Do not scaffold over the DS or an existing app. If the Product/location is already known from the task, keep using it and do not ask again; do not move one Product's prototypes to another Product, and do not create a Product from a guess

Reusable Product DS stays in design-system/src/lib/products/<product-id>/components; Product screens live in products/<product-id>/prototypes. Do not create Core-to-prototype or Core-to-Product dependencies. Use the DS's source/import integration that has actually been verified, and do not claim a package/export exists that has not been built

Keep each app's package/lockfile and dependencies according to the runtime it actually uses. Merging repos does not mean merging dependencies or automatically adding npm workspaces. A prototype that chooses workspace-canvas has a run command and a local port that does not clash with other work, plus a Storybook entry (a local story or a composition from the app's Storybook, per actual capabilities). There is no guarantee that installing the DS alone can run every prototype.

## Index and keeping the work

Update products/README.md when a prototype is created/moved/changes status. Each entry must have the Product, name, path, status, command from the workspace root, local URL/port, Storybook entry, Figma source/mapping and the date last checked. For any field that does not exist, write not yet available/not yet checked; do not invent a URL or a check date. Do not put in credentials, a runtime PID or a local absolute path from another machine

Use the README.md in the prototype for contract/cases/setup details if it already exists; do not create versions/releases automatically. The index helps find work and is not a backup guarantee: check the Git diff and report uncommitted status; do not commit/push without a request

Currently there is a Mira Product DS but no confirmed Product prototype yet. The catalog/appointment/form examples in the DS are workspace examples; do not classify them as Mira or BWC based on their fictional content

## Compatibility

shadcn -> design-system and sync/canvas -> ../workspace/canvas are temporary symlinks to preserve existing references. New work uses the canonical path; do not create duplicate source in an alias. Windows/tools that do not support symlinks must use the canonical path. Do not delete an alias before checking all consumers. Old entries in audit/changelog notes are historical evidence; there is no need to change every history entry to look as if the new path had been used from the start

Only the displayed name changes to Cariva Design Workspace; do not automatically rename the open checkout, remote or branch


## Check for updates before starting work each day — confirmed by the user 27 November 2026

Before the first work of each day in this checkout, check for updates from the Git remote and pull following these steps. There is no need to pull again on every command on the same day unless the user asks or there is a reason to check for updates again. This rule is a start-of-work workflow, not a scheduled job or background automation

1. Check the repository, branch, working tree and the current branch's upstream first. Do not switch branches or guess the target branch; use the original worker's branch
2. When the remote is reachable, `git fetch` the upstream remote to check for incoming commits. If there is no upstream, report it and ask for the missing destination; do not set an upstream yourself
3. If there are incoming commits, the working tree is clean (including untracked files) and the branch can fast-forward, run `git pull --ff-only` from the verified upstream. Confirming this rule authorizes that step; there is no need to ask again each day
4. If there is unfinished work, report what updates exist and why it has not been pulled; do not stash, reset, clean, commit work on the user's behalf, or overwrite files yourself. If the branch has diverged, report first; do not merge/rebase automatically
5. If there are no incoming commits, say it is up to date. If there are only local commits not yet pushed, no pull is needed and do not push yourself. If the network/permissions make checking impossible, state that it could not be checked; do not claim it is up to date, and local work that does not depend on the update may continue
6. After a pull, read the changed rules/skills and check the impact on dependencies/config before continuing; do not install or upgrade dependencies automatically from an update check alone

Remember the daily check status in the work context of that checkout. If you cannot confirm that today's check was done, check again; do not use another machine's notes as evidence, and do not create a timestamp file that makes the working tree dirty just to record that a pull happened


## Always read create-project before starting any project — 27 November 2026

When the user asks to create a new project or prototype — whether they type the skill name or ask to implement a Figma screen as a new project — you must open and read this workspace's canonical `.agents/skills/create-project/SKILL.md` before scaffolding or writing any file, every time. Use the current version in the file; do not rely on memory from earlier work. Reading it and then continuing is covered by the existing authorization and is not a step to ask for approval again, and a single-component change is not automatically treated as a new project


## How to build a prototype per project

Read create-project and check workspace/prototypes.json before starting. If prototypeMode does not exist yet, ask UX/UI to choose between workspace-canvas and claude-artifact, then record it and keep using it, and report it; do not carry the choice across work items. Canvas has an entry in products/<product-id>/canvas/<prototype-id>/ and a Storybook group Products/<ProductName>/Canvas/<PrototypeName>

Claude is separate from Prototype/Canvas: use products/<product-id>/claude-artifacts/<work-id>/ and Products/<ProductName>/Claude Artifacts/<WorkName>. Store artifactPath, storybookArtifactTitle and claudeArtifacts: [{ id, title, url, addedOn, status }] in the existing record. The added-on date is YYYY-MM-DD in Asia/Bangkok; show each link's title and date, do not claim it is the date the artifact was created at the source, and do not discard old links. If a link is missing, ask UX/UI (awaiting-url/provided); do not invent a URL, except for a mock the user asked for, labelled separately from the real catalog. Do not require a local app/server or an iframe, and do not claim there is any automatic integration
