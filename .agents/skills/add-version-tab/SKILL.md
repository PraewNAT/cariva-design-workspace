---
name: add-version-tab
description: Manages version tabs of the legacy sidebar shell only when the user explicitly asks; does not run at commit time and does not start release numbering on its own
---

## Scope per the latest plan

Read AGENTS.md and rules/skill-routing.md before using this skill. The latest rules take precedence over any older conflicting steps. This skill does not allow publishing, pushing, deploying, or starting version numbers automatically. Perform external actions only when the user has actually assigned them.
It does not run automatically at commit time; during the Draft phase, use checkpoint/history per the plan. If the user asks for a tab in the legacy app, keep it separate from the DS release numbers and do not copy the whole project into a new snapshot system.


# Add Version Tab — Cariva DS

**No specific trigger phrase is needed** — it works automatically alongside the existing "ask before commit" step in the Git & PR Workflow (`CLAUDE.md`). Use it only in repos that have a sidebar shell from the `create-project` skill — check the **file structure of the current repo**, not earlier conversation (this supports the case where the user opens a new chat to continue work in an existing project).

## When to ask

While working, **do not ask anything about tabs/versions** — always assume by default that you are editing within the current tab/version.

**Ask only when a commit is near** — following the existing question "The work is done. Do you want to commit + push now?", add 1 more question at the same moment (not as a separate new prompt):

**"Do you want this work to be a new version (new tab) or to overwrite the current version?"**

- **Overwrite the existing one** → commit as usual; nothing more is needed from this skill
- **New version** → follow the Steps below first, then commit

## Steps (only when "new version" is chosen)

1. **Name the tab automatically** — use the format `{date} {time}`, e.g. `27 Aug 23:15`
   - **Exception:** if the user gives a version name, use the user's name immediately; no auto-naming
   - If the name (whether auto or user-given) duplicates an existing tab → append a sequence number, e.g. `27 Aug 23:15 (2)`

2. Create a new route/page for this version — **do not touch/delete the files of the previous version**. Earlier versions must remain reachable through the old tab exactly as before.

3. Add the new tab to the existing `CrvSidebar` — append it to the version list **within the project group currently being worked on**. Do not delete/reorder old versions, and do not create a new project group.

   `versions.json` has a 2-level structure (`projects[].versions[]`) — you must know which project you are in first:
   - If there is only one group → go into that group directly; no need to ask
   - If there are multiple groups → use the group of the tab the user has open; if still unclear, ask briefly **"Which project does this version belong to?"** with the group names listed as choices. Do not guess.

4. Move the work just edited (which is about to be committed) into this new page/route

5. **Write the change summary yourself (AI-written)** — read the `git diff` of the work about to be committed and summarize it in language a designer can easily understand (not a technical commit message), e.g. "Added an export CSV button and darkened the primary button color", not "Add CrvButton variant, update theme.ts" — add a new entry to `versions[]` **of the correct project group** in `versions.json` (from `create-project`) with this tab's `id`/`label`/`date`/`summary` — **do not make the user write it** unless the user wants to edit the text already written

6. Commit + push per the normal Git workflow — Vercel redeploys at the same link (no new link is created)

## Rules

- Do not delete or overwrite old tabs/versions without asking first
- The automatic tab name must not duplicate an existing tab — always check before naming
- If the current repo has no sidebar shell (not from `create-project`) → this skill does not run, and none of the questions above are asked; let the commit flow through the normal Git workflow
- If the user asks for a "new project" or says this work is **not a continuation of the existing version** (a completely different direction) → this is not a new version tab; hand off to the `create-project` skill, which will ask whether to make it a **new project group in the existing repo** or a **separate new repo** — do not decide on your own that it must always be a new repo
- The first version of each project group has no "view changes" icon (counted per group, not across the whole file) — when the 2nd version of any group is added, the icon starts appearing at that version
- The change summary must always be written by the AI; do not ask the user what to write — keep it short and concise, 1-2 sentences, in language a designer understands, without technical terms/file names/component names
