# Structure and skills for the new plan

> **Status as of 26 November 2026:** This document is a dated record of what was written at the time and has not been updated for every decision made since. The agreement to "keep the old code until permission is given" still applies in the form of `legacy/mui/`. The current order of steps and decision gates are in `rules/workflow-map.md` of `shadcn/`.

Note from 24 November 2026 / Status: the user has ordered the migration to start. See SHADCN-MIGRATION.md for the actual structure and check results.

## Latest agreements

1. Settle the components in the Figma Design System first. Keep the old code until the user allows it to be replaced or deleted.
2. When the user orders the start, switch the code of the whole component set to shadcn and adjust the appearance to match the agreed Figma.
3. Base the structure on `/Users/natthaphorna/structure-lab-interpret/`, picking only the parts that suit the DS and not carrying over the Lab's business logic.
4. Use the existing skills and do not create new ones. The user allowed active code to be restructured on 25 November 2026.
5. The earlier MUI migration was a temporary base, not the permanent target stack. Do not continue automatically from the old plan.

## Structure actually found in the reference folder

```text
app/                              # Next.js routes, layout, globals.css
lib/
  app/
    components/ui/                # shadcn primitives
    components/app/               # shared app parts, e.g. page-header, edge-states
    hooks/                        # alias is set up, not confirmed that any file is in use yet
    i18n/, messages/, utils.ts
  core/                           # shared utilities and i18n not tied to a page
  features/<feature>/
    presentation/                 # screens and parts of the feature
    infrastructure/               # the feature's data connections
  infrastructure/                 # config, auth, HTTP, composition
assets/brand/
components.json
```

Evidence: components.json and the directory layout; package.json shows Next.js 16 / React 19, Tailwind 4, and uses Radix with the shadcn style radix-nova in the reference folder. This does not mean the current workspace has changed to Next.js or Radix.

## Proposed structure for this DS

```text
app/                              # route/layout if Next.js is chosen later
lib/
  app/
    components/
      ui/                         # shared Core primitives from shadcn
      app/                        # reusable compositions/patterns, e.g. Table toolbar
    hooks/
    utils.ts
  core/
    design-system/
      tokens/                     # primitives and semantic tokens
      themes/                     # default theme and Product overrides
      catalog/                    # registry/index for finding existing items
      figma/                      # mappings and verified baselines
  features/
    board/presentation/           # area showing real cases, separate from components handed to Dev
    playground/presentation/      # planned feature, not created during the automatic migration
    <product>/presentation/        # Product-specific screens and components
  infrastructure/                 # integrations that are actually needed, added when used
design-references/                # DESIGN.md and references separate from approved tokens
docs/
  plans/
  handoff/
.storybook/
.agents/skills/
AGENTS.md
```

This structure was applied to the active src on 25 November 2026; see docs/architecture/STRUCTURE.md for the actual locations. The name `ui` means Core used across Products, while `features/<product>` is Product-specific; do not create two duplicate Cores again.

- Place stories and docs near the component where appropriate; seven files per component are not mandatory
- Separate themes per Product while sharing the central components. Do not lock a Product's colors/fonts into a primitive
- Do not import the app's board/playground or infrastructure into the UI Core
- If Vite is kept, use Vite's entry/routes instead of Next.js-style `app/`, while keeping the same layering
- Before actually starting, check the framework, the primitive base (Radix/Base UI), aliases and how components are handed to Dev together with the team. Referencing the structure does not mean every dependency is approved

## Reusable skills

This project already uses the symlink `.agents/skills → ../../Cariva DS/.agents/skills`, so there is no need to copy or reinstall. If a project is opened in a different location, set the path/link or copy the skills together with their references correctly, and do not rely on a symlink that points nowhere

| Group | Skill | Usage and limits |
|---|---|---|
| Core | component-reuse-check | Search Core/Product before creating, re-check after editing, works with shadcn |
| Core | component-audit | Check code, tokens, cross-surface, states and accessibility after editing |
| Core | case-planning | Plan the cases before writing UI, separating confirmed items/proposals/questions |
| Core | shadcn | Use when starting new code, read the real target's components.json |
| Core | document | Update docs from the implemented contract and the agreed visual spec |
| Core | doc-coverage | Check the components/stories/docs that actually exist, not every one is required to have a .md |
| Core | changelog | Record changes as a Draft, do not start release numbering on its own |
| Core | pr-checklist | Use when there is a real Git/PR, reuse the earlier audit/reuse results, do not rerun without reason |
| Figma work | audit | Check bindings/naming in Figma, not a code audit; must resolve the new target's paths and tokens |
| Figma work | map-fix | Use the existing workflow to fix mappings/bindings; must review the old rules and read the real target first, do not overwrite the new approach with old MUI specs |
| Figma work | design-review | Check Figma screens before handoff, does not replace component-audit |
| Figma work | rename-frame | Tidy frame names on request, does not rename across the whole file automatically |
| Figma work | code-to-figma | Send selected screens to Figma via a plugin; has old path references that must be resolved per workspace |
| Optional | impeccable | Helps critique/polish in the chosen direction, is a link to the global installation |
| Optional | emil-design-eng | Interaction/motion details, not a mandatory step for every component |
| Optional | ui-ux-pro-max | Look up guidance to support decisions, must not override the agreed Figma/tokens |
| Optional | prototype-to-figma | Break a prototype into flows/states on request, do not use together with code-to-figma on the same task |
| Brought over | localization-export | Extract text from Figma, produce/update the localization sheet and help translate; works with shadcn, not tied to MUI; call it when there is localization work |
| Later | ux-writing | Wait for the user to order the start, per the earlier agreement |

This is a scope check from the skill definitions/routing plus reading some of them in detail. It did not test every skill end to end or guarantee that every legacy path works without adjustment. Use the existing ones as the base and adjust configuration/references when actually starting, instead of writing new skills

## Not bringing in the new set

Per the user's order, do not bring `crv-component-code`, `create-project`, `add-version-tab` and the duplicate aliases `verify-ds-usage`, `document-update` into the new set. Keep the originals in Cariva DS and do not delete them through the shared symlink. The list above is a skill selection plan; the new set has not actually been split out or installed

## Tools/skills from outside the folder

- Figma plugin: figma-use, figma-generate-library, figma-generate-design, figma-design-to-code, figma-code-connect are used as the work requires, no need to copy skill code into the repo
- Storybook: use stories/write-story and the test/review CLI according to the version installed in the real target
- MCP is a tool connection, not an automatic sync system
- Design–Code Parity & Sync and board/playground/catalog automation are not considered implemented just because the skills exist

## Order when the user orders the start later

1. Confirm the component/spec in Figma, separating new items from old ones
2. Check and lock the structure/stack with Dev, then keep a checkpoint
3. Migrate one component at a time, starting with Table or Button in the agreed order, reusing shadcn and keeping the necessary contract
4. Compare the visuals against the real Figma, then update the related cases, stories, docs and mapping
5. Component Audit and regression of consumers before sharing
6. Do not delete MUI/the old code or publish until the user allows it

For now, stop at recording the plan and using the existing skills; no code migration, skill creation, dependency changes or Figma edits come from this record
