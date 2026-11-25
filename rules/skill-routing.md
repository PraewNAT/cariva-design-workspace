# Unified skill routing

One task uses one workflow per concern. The latest plan is `DESIGN-SYSTEM-PLAN.md`; folders share skills, not an assumed runtime or source tree.

| Intent | Owner | Boundary |
|---|---|---|
| Existing component discovery, duplicate review, real DS usage | component-reuse-check | verify-ds-usage is a compatibility alias; no second audit |
| Requirements and case coverage | case-planning | confirmed / proposed / unresolved; no invented business rules |
| Code quality, rendered consistency and accessibility | component-audit | no duplicate discovery or Figma parity claims |
| shadcn implementation | shadcn | use actual package and Core; no MUI requirement |
| Visual design/critique | impeccable | project link uses existing global installation |
| UI motion polish | emil-design-eng | only when relevant |
| Design guidance/search | ui-ux-pro-max | use applicable product tokens |
| Selected screen code → Figma | code-to-figma → figma:figma-generate-design | Part C; no mandatory Figma copy of all board cases |
| Prototype flows with state annotations in Figma | prototype-to-figma | explicit Figma output; use Part C, not a second screen pipeline |
| Figma → screen code | figma:figma-design-to-code | explicit direction; use installed plugin |
| Legacy Crv/MUI component generation | crv-component-code | legacy only (`legacy/mui/code/core`); new work uses the shadcn skill |
| Figma binding/naming audit | audit | Figma only, not component-audit |
| Figma component correction | map-fix | preserve existing target API and tokens |
| Figma screen handoff QA | design-review | only requested Figma review; code QA belongs to component-audit |
| Component docs creation/update | document | code contract + approved visuals; document-update forwards here |
| Documentation coverage | doc-coverage | actual code/catalog/docs; Figma only when mapped |
| PR readiness | pr-checklist | reuse results from reuse-check/component-audit, avoid duplicate checks |
| Change history | changelog | Draft date/commit entries; no release number without explicit request |
| Figma localization export | localization-export | preserve existing custom workflow |
| Figma frame renaming | rename-frame | preserve existing custom workflow |
| Legacy project scaffold / version tabs | create-project / add-version-tab | explicit legacy request only; no automatic deploy/push/versioning |
| UX writing | ux-writing | preserved, deferred until requested |
| Flow for a designer (who does what) | artifact-diagramming (+ artifact-design) | swimlane SVG artifact; fall back to mermaid-diagrams if the agent has no such skill |
| Diagram as text in the repo | mermaid-diagrams | do not run its upstream scripts; validate with awaited `mermaid.parse()` |
| UI visual craft | unslop | after reuse check; our tokens, fonts and geometry win over its recipes |

Board Maintenance, Apply Playground Changes, Catalog Maintenance and Design–Code Parity & Sync are planned, not implemented by this consolidation. Do not rename existing audits to imply these capabilities exist.

## Consolidation record — 2026-11-24

- Preserved the three user-authored skills from New Cariva DS with their agents metadata and report references.
- Moved the older custom skills intact into `.agents/skills`; retained old `skills/` links for scripts/documentation compatibility.
- Reused global impeccable/prototype-to-figma installations; removed the New folder's redundant figma-implement-design from the active set in favor of the installed Figma plugin.
- Original trees, policies and SHA-256 inventory are recoverable under `.skill-backups/2026-11-24-unify/`. Archives are not active skill directories.
- No app source, package dependencies, tokens, Figma nodes or release numbers changed.

## Stack switch record — 2026-11-26

- The user switched the design system from MUI to shadcn. `shadcn/` is the active DS (components, tokens, theme, Storybook, Canvas stories); the old MUI system, its tokens, rules, export bundle and generator scripts moved to `legacy/mui/` unchanged.
- Skills that read DESIGN.md, tokens or component specs now point at `shadcn/`. `crv-component-code`, `verify-ds-usage` and the create-project export step stay legacy and point into `legacy/mui/`. There is no shadcn dev export yet.
- Root `package.json` now holds only the peer bridge and Code Connect tooling; the MUI dependencies and scripts live in `legacy/mui/package.json`.
