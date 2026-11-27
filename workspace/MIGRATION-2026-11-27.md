# Cariva Design Workspace migration — 2026-11-27

**Component Reuse Check — Workspace organization**
Overall: DS/tooling was actually moved, keeping compatibility links; no components were copied and no mock Product app was created
Scope: root docs/rules, create-project, DS package, Canvas static assets and prototype index

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | single canonical source | shadcn -> design-system; sync/canvas -> ../workspace/canvas | New work uses canonical paths |
| — | Pass | Product DS and app are separate | design-system/src/lib/products/mira/components; products/mira/prototypes | Add an app when there is a requirement |

Summary: 2 pass, 0 need fixes, 0 not checkable in this scope
Next: build a Product prototype from a real requirement

**Component Audit — Migration regression**
Overall: build and focused interaction tests pass; no change to the Core visual recipe
Scope: package build, Canvas desktop/mobile, appointment renderer, config/links; did not audit every Core component or test a fresh clone on Windows

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | Existing label-content-name-mismatch in Date/Time | /tmp/cariva-workspace-tests.txt; same as the item left open before the migration | Fix Core separately once scope is given |
| — | Pass | build at canonical path | npm run build in design-system passes; existing bundle-size warning | No new dependencies |
| — | Pass | Storybook regression | test-run passes Board/Mobile/Appointment 3/3; no Canvas a11y violations in the focused run results | Used the existing servers |
| — | Pass | Docs and routing | README, AGENTS, CLAUDE, workspace rules, create-project, products/README; figma.config canonical paths | No external publish/sync |
| — | Could not check | Windows symlink checkout | Not tested on other machines | Use canonical paths when the tooling does not support symlinks |

Summary: 3 pass, 1 needs fix (previously open item), 1 not checkable
Next: review the Git diff and commit when the user instructs; the work is still local working changes, not a completed backup/push

The workspace name is Cariva Design Workspace, but the local checkout name and the Git remote are unchanged. No repo was created, the root directory was not moved, and nothing was deployed or published to Code Connect.
