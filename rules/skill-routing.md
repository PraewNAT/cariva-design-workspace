# Unified skill routing

One task uses one workflow per concern. The latest plan is `DESIGN-SYSTEM-PLAN.md`; folders share skills, not an assumed runtime or source tree.

| Workflow step | Skill | Boundary |
|---|---|---|
| New Product / prototype (S1–S5, flow 08) | create-project | React/shadcn + Storybook Canvas / Preview / full-page; no automatic deploy/push/versioning |
| Find what exists, plan cases (C1, U2) | component-reuse-check | includes case planning: confirmed / proposed / unresolved; no invented business rules |
| Write a component (U3, C4, F3) | shadcn + unslop | use actual package and Core; unslop is automatic and our tokens, fonts and geometry win over its recipes |
| Motion and feel (U3) | emil-design-eng | only when the task involves animation or polish |
| Component docs (U4) | document | code contract + approved visuals; creates and updates |
| Code quality, rendered consistency, accessibility (U5, F4) | component-audit | no duplicate discovery or Figma parity claims |
| Check or fix a Figma component or screen (F1–F2, D5, flows 07, 09, 11) | audit | token binding, naming, screen QA before handoff and map/fix; Figma only; report first, ask before fixing |
| Selected screen code → Figma (D1–D6, flow 05) | code-to-figma → figma:figma-generate-design | Part C; also used for one-frame-per-state prototype output; no mandatory Figma copy of all board cases |
| Figma → screen code (F1–F5, flow 06) | figma:figma-design-to-code | explicit direction; use installed plugin |
| Before merge / PR (flow 14) | pr-checklist | includes the changelog entry; reuse results from reuse-check/component-audit; no release numbers without explicit request |
| Diagram as text in the repo | mermaid-diagrams | do not run its upstream scripts; validate with awaited `mermaid.parse()` |
| Flow for a designer (who does what) | artifact-diagramming (+ artifact-design) | swimlane SVG artifact; fall back to mermaid-diagrams if the agent has no such skill |
| Rename screen/page frames (outside the main flows) | rename-frame | preserve existing custom workflow |
| Figma localization export (outside the main flows) | localization-export | preserve existing custom workflow |

## Skills reduced to 13 — 2026-11-27

The repo's skill set was cut from 24 to 13 so each workflow step has one owner.

- **Removed:** doc-coverage (covered by workflow U4, `npm run storybook:coverage` and pr-checklist), ux-writing (deferred; the `design:ux-copy` plugin covers it), add-version-tab and crv-component-code (legacy), prototype-to-figma and impeccable (links to a local Codex install, not part of the repo), ui-ux-pro-max (no workflow step used it; Figma tokens win anyway), and the project copy of impeccable in `.claude/skills`. Impeccable and ui-ux-pro-max remain available as plugins for people who have installed them; they are not part of this repo.
- **Merged:** design-review and map-fix into audit; changelog into pr-checklist; case-planning into component-reuse-check (the full text is kept as a section; the trigger phrases still work). Earlier removed aliases: verify-ds-usage → component-reuse-check, document-update → document.
- Copies of everything removed or merged are in `.skill-backups/2026-11-27-minimal/` and `.skill-backups/2026-11-27-dedupe/` (untracked).
- UI polish: use unslop for any UI work, emil-design-eng for motion. Our Figma tokens and `design-system/rules/agent-rules.md` win over every skill.

Board Maintenance, Apply Playground Changes, Catalog Maintenance and Design–Code Parity & Sync are planned, not implemented by this consolidation. Do not rename existing audits to imply these capabilities exist.

## Consolidation record — 2026-11-24

- Preserved the three user-authored skills from New Cariva DS with their agents metadata and report references.
- Moved the older custom skills intact into `.agents/skills`; retained old `skills/` links for scripts/documentation compatibility.
- Reused global impeccable/prototype-to-figma installations; removed the New folder's redundant figma-implement-design from the active set in favor of the installed Figma plugin.
- Original trees, policies and SHA-256 inventory are recoverable under `.skill-backups/2026-11-24-unify/`. Archives are not active skill directories.
- No app source, package dependencies, tokens, Figma nodes or release numbers changed.

## Stack switch record — 2026-11-26

- The user switched the design system from MUI to shadcn. `shadcn/` is the active DS (components, tokens, theme, Storybook, Canvas stories); the old MUI system, its tokens, rules, export bundle and generator scripts moved to `legacy/mui/` unchanged.
- Skills that read DESIGN.md, tokens or component specs now point at `shadcn/`. `crv-component-code` and the create-project export step stay legacy and point into `legacy/mui/`. There is no shadcn dev export yet.
- Root `package.json` now holds only the peer bridge and Code Connect tooling; the MUI dependencies and scripts live in `legacy/mui/package.json`.

## Prototype setup update — 2026-11-27

`create-project` now owns new React/shadcn prototype setup with Storybook Canvas / Preview switching and full-page preview for every Product. This supersedes the historical legacy create-project routing/export note above. The skill defines required delivery behavior; it does not imply a generator or completed mode switch exists in this checkout.

Workspace placement and prototype index follow [workspace-structure.md](workspace-structure.md) (2026-11-27). New prototypes can live in this repo under products/<product-id>/prototypes; design-system is canonical and shadcn is its compatibility link.
