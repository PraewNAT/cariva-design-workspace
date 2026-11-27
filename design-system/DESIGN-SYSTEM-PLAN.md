# Plan for building a Design System from Code to Figma

> **Status as of 26 November 2026:** This document is a dated record as written and has not been updated for every decision made since. The Figma-style Playground/panel has been cancelled (see agent-rules). The Canvas is view-only and uses `sync/canvas`. The current order of steps and decision gates are in `rules/workflow-map.md` of `shadcn/`.

## Latest decision — 24 November 2026

Settle the components in the Figma Design System first. When the user gives the go-ahead, switch all code to shadcn, based on the structure of `/Users/natthaphorna/structure-lab-interpret/`, and make the code-side visuals match the agreed Figma. Keep the old code until replacement or deletion is permitted. The current MUI is a temporary base only. The migration has not started and no new skills are created.

Details of the structure actually found, the proposed structure, and the existing skills that can be used are in [SHADCN-STRUCTURE-AND-SKILLS.md](./SHADCN-STRUCTURE-AND-SKILLS.md). This new agreement overrides the old stack-selection/ordering text below only where they conflict; it does not automatically approve Next.js or Radix.

Note dated 21 November 2026 for a Design team of 2–3 people. The goal is a Design System shared between Design and Dev, starting from code. Latest decision: have AI build screens as code, together with a board page collecting every case for an overview, without duplicating every case's screen design in Figma. The idea of building a component library in Figma is kept for separate consideration. Status as of 22 November 2026: the React + TypeScript and Storybook starter is set up, with shadcn, Impeccable and project-level Prototype → Figma, and the dedicated skills component-reuse-check, case-planning and component-audit have been created. The board/canvas and playground in the plan have not yet been developed.

# Desired approach

Latest screen workflow: have AI list cases from requirements and logic for the user to check for completeness, then write the screens with mock data and a board page collecting every case, placing each case side by side, grouped by screen or flow with a case name and code, e.g. default, loading, empty, error, success, validation and permission as relevant. The board must render from the project's real components and tokens, so that component changes show on the board when re-rendered. Every case must be openable for inspection without clicking through the flow to reach that state. Completeness refers to the agreed case list, and the list must be updated when new requirements arrive. For screen work, do not recreate the design set in Figma.

# Style trial page from DESIGN.md

Before using a DESIGN.md from another source, have AI read it and summarize the styles that would change, such as fonts, colors, spacing, sizes, corner radius and shadow, separating values specified in the file from values AI chose to add where the information was incomplete, then build a style preview as a draft separate from the current Core, using the system's existing components built on shadcn as the base.

The preview must show the full set of components, such as Button, Input, Select, Card and Dialog with relevant states, and at least one real Product screen with content and density close to real work, to judge whether the style suits the product.

On the canvas, place the original and the experiment side by side, using the same screens, data, cases and viewport size. If trying several DESIGN.md files, use the same sample set so the comparison is direct. The user can keep adjusting the draft in the playground or discard it, with the Core unchanged.

Once the user picks a style that fits, show the list of token/style changes and their impact, save a checkpoint, then have AI bring the selected changes into the Core, and check every related component and board case according to the Component Audit plan. Do not create duplicate components just to change styles unnecessarily, and do not start counting Design System versions from the experiment or its adoption.

This feature is part of the design experimentation plan. The style trial page has not been built and the Core has not been changed.

# Figma-style playground and panels (cancelled)

**Approved Canvas instead:** a Storybook page placing several screens side by side, with zoom/pan and fit-all. There is no design-editing panel, no draft and no Apply flow. See `Workspace/Canvas board`.

**Latest decision 25 November 2026:** the user cancelled the Playground editor and permitted its implementation to be deleted. Only a Canvas page in Storybook for viewing screens is wanted. See [Canvas](docs/canvas/README.md). The editor details below are the history of the cancelled plan and should not be rebuilt until requested again.

Add a playground for trying edits to screens from the board and to components in the Design System, with panels and usage patterns familiar from Figma to reduce relearning.

- Left: Layers for selecting elements

- Center: the screen or component under experiment; click to select elements, zoom and pan

- Right: Properties such as Layout, Size, Padding, Gap, Typography, Fill, Stroke, Radius and token binding

- Top: Undo/Redo, Reset, Cancel and Apply

Experiments are kept as a draft separate from the real source code, with default values. The user adjusts and sees the result immediately; if they dislike it, they can cancel and discard the draft with the real code unchanged. If they leave while there are unconfirmed edits, they must be able to choose between discarding and going back to keep experimenting.

When they like the result, they press Apply, which shows the list of changes and the scope, this screen only or the shared component, then AI reads that list and edits the real source code, then re-renders the board and checks every affected case. Show a success status once the code has been edited and checked. If it fails, keep the draft and report what could not be done.

Store the changes as data carrying identifiers of the related element, component and source, with the old value, new value and token reference, so AI does not have to guess from before-and-after images. A Design System edit must show the impact on users of the shared component before being applied.

Initial scope: a panel that adjusts properties that can reliably be written back to code. Unsupported fields must be clearly marked. Drag-and-drop and free-form restructuring of layers in full Figma style are later extensions. Development of the playground or panel has not started.

# UX Writing to be done later

UX Writing work is wanted for the Design System and each Product in the future. For now it is only recorded as later work: do not design a workflow, create or install a skill, or edit product copy until the user orders it to start.

# Skills to prepare

Status as of 22 November 2026: component-reuse-check, case-planning and component-audit have been created and installed in .agents/skills with metadata for selecting them, and rules added to AGENTS.md. All three use the same report format: overall result, scope, a table of level/result/item/evidence/next, count summary, and one next step; show no more than 8 items, and if there are more, state the number remaining; do not hide audit limitations. Audit and report modes are separate from actual fixing. The skill structure and metadata pass the standard validator. They still need to be evaluated on real work. Other skills remain in the plan, with upstream skills and Storybook workflows as the base as installed.

1. **Design–Code Parity & Sync** compares tokens, properties, variants and appearance between code and Figma, with evidence and a status of matches, does not match, or cannot be checked. The default is Code → Figma, without restating the direction each time. Sync only the components or screens within the scope of the command. If the user adjusts Figma and wants it brought back, they must explicitly order Figma → Code. Keep a baseline to know which side changed. If both sides edited the same part, show the conflict for a choice before overwriting, and do not decide by latest date alone. Supports ordering sync to run automatically within a stated direction and scope. Time-based checks or checks on every PR need added automation/CI.

2. **Component Reuse & Duplicate Check** focuses on finding and reusing existing components before creating new ones, across the Core, the central catalog and accessible projects. After writing, check the added or changed code for whether AI created a component or assembled UI that duplicates an existing one, comparing function, structure and behavior rather than name alone, naming the existing component that should be used and where to fix. If the existing one cannot be substituted, give the reason and propose adding a variant or splitting out a new one, without merging automatically. Token-usage checking is supplementary; not every hardcode counts as wrong.

3. **Case Planning** reads requirements and logic and lays out a case list, e.g. loading, empty, error, permission, validation and long data, separating confirmed cases from proposals or questions for the user to decide.

4. **Code → Figma** creates or updates only the selected components or screens, using the existing library and Variables, keeping a mapping to source and a baseline to support bringing Figma edits back into code later, and checking Auto Layout, properties, variants and use of instances.

5. **Board Maintenance** creates and updates the board from the case list, checking completeness, cases that cannot be opened, and mock data that does not match conditions, using real components and tokens.

6. **Apply Playground Changes** reads the list of changes in the draft the user chose to apply, with the scope of this screen only or the shared component, edits the real code, then checks the board and affected cases. The panel itself, drafts, Undo/Redo and the discard/apply buttons are a feature to develop separately from the skill.

7. **Component Catalog Maintenance** updates the list of shared and A/B components so AI discovers what exists before creating new, proposing what should move into the Core, reviewed by the team first.

8. **Component Audit** checks quality after creating or editing a component and before bringing it into the Core: use of tokens and Core components, clarity of props/variants, relevant states, layout with long text, empty data and changing screen sizes, keyboard/focus and accessible names, state examples on the board, and impact on the cases that use it. Reports pass / needs fixing / cannot check with evidence and priority. Checks from code and from running examples as far as accessible; reading code alone is not taken as proof of full behavior. Separate audit/report mode from actual fixing. Reuse & Duplicate Check is responsible for finding existing items and checking for duplicates, while Design–Code Parity is responsible for agreement with Figma.

Proposed initial order: Component Reuse & Duplicate Check → Case Planning → Board Maintenance, then develop the playground together with Apply Playground Changes. Code → Figma and Parity & Sync are added when some screens start being edited in Figma. Use a lightweight catalog from when A/B start sharing.

# Initial technology and later changes

Start with React + shadcn/ui as the component base of the Design System. The app framework/build tooling, supplementary libraries and the way components are delivered to Dev are chosen only as far as needed for the experiment first, and can be adjusted later by keeping the parts loosely coupled, without building a system that supports every option in advance.

- **Core:** React components and tokens not bound to the router, API, server features or business logic of the app framework/Product. They take data and callbacks through props and have clear export/import points.

- **Product:** screens, cases, data and logic specific to the Product, including the necessary routing and API wiring.

- **Board/Playground:** the team's working tools, separate from the components Dev takes into use, so a real app is not forced to install an editor or board.

- **Supplementary libraries:** keep the integration with forms, tables, charts or other services inside the component/module responsible for it, to limit where changes are needed when swapping, without adding a wrapper to every one for no reason.

- **Delivery method:** start by calling the Core inside the repository through the defined import, then organize it as a shared package when needed. Give Dev documentation and usage examples that match how it is actually used.

- **Theme:** the Core has one default theme for colors, fonts, spacing and base values. Every Product uses it as a base, then can override fonts and colors through products/<product>/theme/, including adding colors or tokens specific to the Product, without changing the Core or recreating components merely because the appearance differs. The names and roles of shared semantic tokens such as primary, background, text and danger are used in common, but their values can differ per theme. Name Product-specific colors by role and keep them in that Product. Core components reference tokens and are not bound to a Product name. Theme scope must be separated so A/B previews on the board do not interfere with each other. When a theme changes, check contrast and color meaning, including layout with long text and Thai when fonts change, across every related case on the board.

Moving the app within React, e.g. from Vite to Next.js, still requires adjusting the related routing/build/server parts and retesting. Changing to a framework outside the React family may require rewriting the components, even though tokens, cases and requirements can still be carried over, so there is no guarantee that the technology can be changed without migration work.

For now this records technology choices and design principles; no project has been installed or created from this decision.

# Setup steps

1. Create the central Design System repository, holding the Core components and tokens, while the components specific to A/B live in that project.

2. Define the central tokens, such as color, fonts, spacing and corner radius, for the code to reference.

3. Connect a coding agent that can read code with a tool that writes to Figma, such as Figma Console MCP and Desktop Bridge, then open the destination Figma file.

# Component creation steps

4. Get the component in code ready, specifying props, variants and states clearly

5. Build a preview page or Storybook showing an example of each variant/state

6. Have AI read the code and related dependencies, then create the Figma component with Auto Layout, variants, properties and Variable bindings

7. Compare with the real preview, try changing the text, stretching the size and switching variants, then fix until tidy

8. Keep the mapping between the code component and the Figma component, then publish the library when ready. Code Connect can be added to link components and properties to the Dev workflow

# Maintenance steps when code changes

9. Have AI check the code and Figma and report the differences with evidence, split into matches, does not match and cannot be checked

10. Have AI update the existing component in Figma, check that the instances in use are still correct, then publish the new library version

Skills define the steps for AI to check but do not run on a schedule by themselves. To check on every PR or on a schedule, CI or automation must be added.

# Managing projects A and B

Start simply by keeping the Core and each Product in the same project/repository but in separate folders, with no need to split into multiple repositories at the start. A Product can use the Core, but the Core does not reference anything of a Product. New items not yet clear to be shared start in the Product, then move into the Core when appropriate. Use a variant when the function is the same, split into separate components when the function differs, and use the Product's theme/tokens when they differ only in base values.

## Initial folder structure

```text
design-system/
├── core/
│   ├── tokens/
│   └── components/
├── products/
│   ├── product-a/
│   │   ├── components/
│   │   ├── screens/
│   │   └── cases/
│   └── product-b/
│       ├── components/
│       ├── screens/
│       └── cases/
└── board/
```

Each Product has its own Figma-style canvas for placing frames of its screens and cases, grouped by flow with names, with frames draggable, and the workspace zoomable and pannable. Positions and grouping are saved per Product without mixing. When switching Product, open that Product's canvas and context. The Core has a separate area for viewing shared components, and every Product still shares the Core. The Canvas is the area that shows the board collecting every case from real code, while design editing inside a frame uses the playground and properties panel per the plan. Moving a frame on the canvas changes the arrangement for review, not the layout in the real screen. This structure must also support trialing an incoming Core before bringing it into a Product; separate folders alone do not make a usable separate snapshot, so a mechanism must be designed when developing.

## Choosing a Product and remembering work context

When starting work, use the Product from the board, the screen or the file currently selected. If it is not clear, ask the user to choose the first time, then remember that Product for the whole task and do not ask again on every command until the user changes Product. Show the Product being worked on clearly on the board, with a clear way to change it. Keep context separate per task or session, and do not use a single global value that disturbs another person's work.

Once a Product is selected, AI must create or edit components, screens and cases in that Product's folder and use the existing Core first. Selecting a Product does not permit editing everything in the Core. If the work needs a Core change, show the scope and cross-Product impact clearly.

Keep the list of maintainers for the Products and the Core in a central file, to use as defaults and to name reviewers, with the context of the selected work taking priority. Maintainers can cross over to help on another Product; there is no fixed limit tying Products to individual people.

The person working on A does not have to follow B's work themselves. Use a central catalog in the Git repository for AI on both sides to read before creating a component and to update when adding something new. Each entry states the name, function, status (Core/project-only), source location, maintainer and Figma mapping; this can be split into a separate file per component.

Each person has their own standing branch and does code edits only in that branch. AI must check that the current branch matches the person working before editing, and must not edit another person's branch or the central branch directly. Keep the standing branch for reuse; do not close or delete the branch automatically when the work ends or after changes are merged. Choosing a Product is a folder context, separate from choosing the worker's branch; one person can help on several Products in their own branch.

Changes ready to share, especially the Core and the central catalog, go through a PR for review and merging into the central point, without deleting the standing branch after the merge, then take the chosen changes from the central point back into each person's branch. If there is a conflict, show it and resolve it before merging, and do not overwrite another person's work. Separating branches prevents work from colliding while in progress, but does not eliminate conflicts at merge time and does not make A/B see each other's work immediately. Reading the source of another project needs access permission.

# Draft status and Design System updates on the board

At first the Design System is in Draft status and does not start counting versions or issuing numbered releases until the user explicitly orders it to start, as it is still experimental and changes often. Keep history and internal snapshots/commits for comparison and rollback, without treating them as Design System version numbers. When the user tells it to start counting versions, then define the number format and the first version.

## Saving multiple checkpoints and rolling back

There is a button to save a checkpoint, where each save creates a new point that can be named, e.g. before changing navigation or after trying a color adjustment, and does not automatically save over an earlier point. The user can open an old point and view it before choosing to restore.

When rolling back from point 3 to point 1, points 2 and 3 remain and can still be viewed or restored. A restore becomes the new current state without deleting newer history. If overwriting is supported, it must be a separate command the user deliberately chooses.

Each point must reference the Product code, Core components and tokens in use at that time, including positions and grouping on the canvas, so it can be reopened completely. Separate checkpoints per Product. Rolling back one Product does not silently roll back the Core shared with every Product; restore that Product's reference to its Core set and report the impact according to scope.

Use Git history and the necessary canvas/draft data instead of copying the whole project each time, to reduce space. Keep preview images only for the points that need them. Having multiple checkpoints does not count as starting Design System versioning, which still waits for the user's order before numbering starts.

When the central Design System changes, have the board announce that there are new changes, with the list of components and tokens changed, the impact on projects, before and after images where relevant, and migration advice if usage changes. During Draft, do not show version numbers. AI can help summarize the changelog, which must be checked for accuracy before being published.

The user can open the changes and try an update by creating a preview from the chosen snapshot, separate from the set the project is currently using, then render every related board case, compare before and after, and report the cases with problems.

If they do not want it, discard the experiment and keep using the original set. If it is fine, choose to adopt it in the project, then AI updates the source or dependency according to the real structure, with the necessary migration, through a branch/PR, checking the build and affected cases before merging per the team's workflow. Adopting changes during Draft does not start version counting.

Statuses are split into new changes available, being trialed and adopted. Record which snapshot/commit A/B reference internally to know what is in use and to allow rollback. Update the status after a successful import into the project, still without setting a version number until the user orders it.

Detecting changes, notifying on the board and trial updates are features that need further development. For now this is recorded as a plan, not yet built or enabled.

# Start on GitHub and prepare to move to GitLab

Start by keeping the project on GitHub, designed so it can move to GitLab easily later, without binding the core logic of the Design System, board, playground and skills directly to GitHub.

- Separate the Git provider integration from the core logic, e.g. reading the repository, change notifications, and creating PRs/MRs, implementing only GitHub first, with no need to build a full GitLab integration now

- Keep the catalog, cases, canvas layout, mapping and checkpoints in an exportable or movable format. Source reference data stores the repository identity, path and commit, with the GitHub URL as a link for viewing, not the only identifier, and no credentials are kept in this data

- Keep build/test commands and main tasks as scripts that run locally, and have GitHub Actions call those scripts, so they can be adapted to GitLab CI/CD conveniently

- Set the repository URL, provider, webhooks and credentials apart as configuration to reduce code changes when moving

- Before choosing additional integrations, especially Figma, hosting or package registry, consider the ability to switch provider and record the limitations

When moving, check that the code, commit history and each person's standing branches are complete, along with checkpoints and files outside Git. Set up permissions and connections anew, move CI, and adjust the links handed to Dev, checking the importer's limits for issues/PRs and other data according to the actual tool. A repository move is not assumed to move all connected services automatically.

# Handoff to Dev

Prepare a handoff package containing the GitHub repository link with access permission, links to the boards of the relevant Products, and a short getting-started guide, with no links sent and no real people invited during this planning stage.

- **GitHub:** Core components code, tokens and Product-specific parts, stating the branch/commit or checkpoint that Dev should use as reference, to avoid confusion with experimental work that keeps changing.

- **Board:** view the appearance and every agreed case and try the behavior, stating the same code set as the one handed over.

- **Getting started:** what to install, the dependency install command and the commands to run the project/sample board, how to import and use a component, and the relevant file locations. Use the real, verified commands once an implementation exists.

Before building for real use, agree with Dev on the framework, existing libraries to build on, props/states/accessibility and how to bring the Core into the project. If in the same repository, import from the Core according to the structure set. If in a different repository, during the experiment Dev clones and runs it to review together, then prepare the Core as a package when it is ready for use across multiple projects, without starting Design System version counting until the user orders it.

Dev can take the components and tokens into the real app after a quality check, while the board and playground are the team's working tools, separate from the app delivered to real users. Screens using mock data must be wired to the API, user permissions and business logic completely before real use.

# Code to Figma workflow and the file pair of each Product

One Product has 2 Figma files as a pair: the DS file holds the main components, variants and variables; the Design file holds screens composed of instances from the DS file, not files of different Products.

The first time a Product is set up, ask for the DS file link and the Design file link together, then record the destination pair in the repo's central mapping. Next time, use the same pair for the selected Product without asking again. Ask again only when the information is missing, the destination is ambiguous, inaccessible, or the user orders the file changed, and do not choose another file on your own.

1. The user selects the screen or component in code to bring into Figma

2. AI checks the components and tokens that page uses against the DS file and the existing mapping, using what exists first and adding or updating only what is needed, with no need to build the whole library before the first page

3. Check readiness and permissions for publishing/using the Library across files. When the Library is ready, compose the screen in the Design file with real instances and an editable layout, while Product-specific components can be kept as local components within the agreed scope

4. Remember the mapping of code components to DS nodes and of screens/cases to Design nodes, so existing ones are updated instead of recreated

5. When bringing a design back into code, separate adjustments to an instance or a layout on one screen from changes to the main component in the DS, which may affect many screens/Products. The default sync direction is still Code → Figma; Figma → Code is used when the user orders that direction

This is an agreed workflow. No real Product link pair has been set and no automatic mapping-recording system built. Publishing the Library and receiving updates across files must be checked against real capabilities and permissions; automatic syncing is not assumed from installing skills alone.

# Tools and scope

A coding agent reads code/styles/tokens; Southleft's Figma Console MCP together with Desktop Bridge is used to write native components and Variables; Figma Desktop opens the destination file; Storybook/preview helps check the real appearance.

Code Connect pairs components and properties with code; it is not a system that syncs every aspect of appearance automatically. Tokens can sync when a pipeline is set up. Adding a variant or changing structure requires updating Figma too.

Having the tools ready does not guarantee conversion quality; it must be tried and the real results checked.

# First experiment and next questions

Start with one Button, before expanding to Input and the whole library. Measure whether the result can be reused, how much time cleanup takes versus building by hand, and whether the existing one can be updated without breaking instances.

Issues still to decide: token format, the scope of variants to show in Figma, how to keep the mapping and baseline, how to handle conflicts when both sides edit at once, the mechanism for trialing a Core snapshot separate from the set a Product is using, and the check/publish steps. The initial structure is agreed as a single repository separating core/ and products/. The default sync is Code → Figma, and version counting does not start until the user says so.

Component Reuse & Duplicate Check, Case Planning and Component Audit have been ordered built and installed. Design–Code Parity & Sync, the board/playground workflow and other specific skills have not yet been built. UX Writing is recorded as later work and has not been started.

# References

[Figma Console MCP](https://github.com/southleft/figma-console-mcp)

[Figma Write to Canvas](https://developers.figma.com/docs/figma-mcp-server/write-to-canvas/)

[Code Connect](https://github.com/figma/code-connect)

The example companies discussed are about connecting and maintaining a Design System across two sides, not evidence that everything syncs automatically: [Spotify](https://www.youtube.com/watch?v=SmarocuBv6c), [Atlassian](https://www.youtube.com/watch?v=-qlAjXbbn6k)


## Update 24 November 2026: starting shadcn
The user ordered “เปลี่ยนเลย” (switch now) after confirming that the existing runtime was still MUI, so the migration has started in this folder, using the existing React/Vite + shadcn Base UI, split into ui/app/core/features per SHADCN-STRUCTURE-AND-SKILLS.md, without changing to Next.js or Radix and without automatically changing remote Figma/Code Connect. Actual results and limitations are in SHADCN-MIGRATION.md. Keep the legacy and checkpoint first.
# Current goal — 25 November 2026

This latest ruling overrides the earlier plan sections below that required Dev to take the code into real use. The old plan is not deleted, but package/distribution and developer adoption are paused until requested again.

1. **AI designs with code:** use the existing code DS to assemble a web prototype that can be clicked for real, to try flows, mock data and responsive behavior, checking stories/docs/audit per the workflow. When the user approves the design and orders it taken to Figma, assemble editable frames with components from the Figma DS to match the prototype
2. **The user designs in Figma:** the user sends a URL with a request to make it a prototype; AI reads the design, checks the mapping and assembles with the existing code DS first, without creating duplicate components or changing the library based on the reference's appearance

Dev does not need to be in this loop, and it is not guaranteed that the prototype code matches the production stack of every Product. There is no need to prepare a package or have Dev pull/update as a mandatory step. The change of objective does not permit changing the stack, deleting old things, or publishing the web.

Limitations to report per task: Figma library/cross-file permissions, missing components/variants, overrides, typography/layout differences, prototype interactions and responsive constraints that are not equal to real CSS behavior. Initial approval does not equal automatic two-way sync. If DS/API must be added beyond scope, propose and confirm first; do not use pasted images or detach in place of reusable instances without telling.

Workflow documents: [unified flow](docs/UI-WORKFLOW-INDEX.md), [UI](rules/ui-workflow.md), [Code → Design](rules/code-to-design-flow.md), [Figma → Code](rules/figma-component-to-code-flow.md). Rules shared by both Codex and Claude are in [agent-rules](rules/agent-rules.md)

---

# Confirmed Figma screen sizes — 25 November 2026

For the latest prototype ↔ Figma goal, do Figma for only **one desktop/tablet size and one mobile size, 2 sizes per agreed screen/case**, do not create tablet as a separate third size, and do not expand every state on your own. The web prototype can still be used to view responsive behavior between widths. No px numbers have been set: use the confirmed Product/reference sizes, or propose them for confirmation before setting them as the standard. Details and conditions are in `rules/code-to-design-flow.md` and the central rules.

