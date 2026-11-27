---
name: pr-checklist
description: "Check Cariva PR readiness from the diff and the related reuse/audit/docs results, and record the change in the changelog (formerly the changelog skill). Does not merge and does not force MUI or the 7-file scaffold on shadcn"
---

# PR Readiness

> Workflow fit: used at step(s) before opening or updating a PR (after U6/F5/D6/V5, with the commit gate) in `design-system/rules/workflow-map.md` (see the Skill column of each flow table). Load it when that step starts.

Resolve actual repo/branch/base from the task and Git configuration. Inspect the diff and affected consumers; do not assume main is the only path or that one folder holds all code (`shadcn/` is active, `legacy/mui/` is frozen).

Reuse component-reuse-check and component-audit findings for the same final code revision. Run only missing checks or checks invalidated by new changes; do not duplicate reports. Check documentation/story updates and meaningful regression coverage proportional to the change. Do not require every component to have seven files, Code Connect or Figma output.

Read package scripts before running required checks. For `shadcn/` code run its own scripts from that folder (`tokens:check`, `build`, `build-storybook`, `lint`, and `workflows:check` when the workflow map, Workflows pages or skills changed); `legacy/mui/` is frozen, so run its tokens:check/export:check only if someone edits it. Never run another folder's scripts against this target. Report passed/failed/unavailable separately with evidence.

Keep Draft without DS release numbers. Summarize readiness and remaining actions; do not merge, push, publish, generate release tabs or alter test rules to obtain a pass.

## Full-page prototype links in the PR description (user decided 2026-11-27)

When a PR touches a Product prototype (anything under `products/<product>/prototypes/` or its Storybook stories), the PR description must include a "Full-page prototype links" section so reviewers can open the prototype without the Storybook sidebar:

1. List the prototypes from `products/README.md` / `workspace/prototypes.json` that the diff affects. Skip DS examples; they are not Product screens.
2. Get the real story IDs from the running Storybook `/index.json` (entries whose title starts with `Products/<ProductName>/Prototypes/`) or from the stories file; never invent an ID.
3. Take the Storybook preview base URL from the Vercel bot comment on the PR (the `cariva-ds-storybook` URL) and build `<base>/iframe.html?id=<story-id>&viewMode=story`. One line per key state (for example the default state and the mobile state), each labelled with the story name.
4. State plainly that the Vercel preview needs a Vercel team login and that a link was not opened by the AI if it was not. If the base URL is not available yet, write "preview not ready" instead of guessing.
5. A standalone deployment of the prototype app is not part of this step; mention it only if the user asks.

---

## Merged skill: Changelog entry (formerly `changelog`, merged 2026-11-27)

Original copy: `.skill-backups/2026-11-27-minimal/changelog/`. The trigger phrases below still start this skill.

### Changelog

Read the current diff/commits and existing changelog in the actual target package. Infer the authorized scope from the request; ask only for a missing baseline that materially changes the summary.

During Draft use a dated heading with an available commit/checkpoint reference. Do not default to v1.0.0, ask for major/minor/patch, or number/publish a DS release until the user explicitly requests starting releases. A Git commit is history, not a numbered DS release.

Summarize only verified added/changed/removed behavior, fixes, token changes and migration impact. Use Thai prose with exact English component/token/prop names. Skip empty categories; do not invent rationale. When writing is requested, prepend to the existing changelog without changing older entries; if none exists use an appropriate package/project location and report it. A request only to summarize does not require creating a file.

Once releases are explicitly enabled, follow the team's actual version policy and assigned version. Do not publish or push as a side effect of writing history.
