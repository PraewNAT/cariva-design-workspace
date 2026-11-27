> Workspace organization adopted 2026-11-27: Cariva Design Workspace now uses `design-system/` for DS, `products/<product-id>/prototypes/<prototype-id>/` for Product prototypes, and `workspace/` for tools. See [workspace structure](rules/workspace-structure.md) and [prototype index](products/README.md). `shadcn/` and `sync/canvas/` remain compatibility links. This records implemented folder organization, not completion of the future board/playground/parity capabilities below.

# Plan to Build a Design System from Code to Figma

> **Status as of 26 November 2026:** This plan was written before the decision to switch to shadcn (the DS now lives in `shadcn/` and MUI in `legacy/mui/`). The Figma-style Playground/panel has been cancelled. The current sequence of steps is in `shadcn/rules/workflow-map.md`.

Notes dated 21 November 2026 for a Design team of 2–3 people. The goal is to share one Design System between Design and Dev, starting from code. Latest decision: have AI build screens as code, together with a board page that gathers every case for an overview, without duplicating every screen case's design in Figma. The idea of building a component library in Figma is kept for separate consideration. Latest status as of 22 November 2026: the React + TypeScript and Storybook starter is set up, with shadcn, Impeccable and a project-level Prototype → Figma, and the dedicated skills component-reuse-check, case-planning and component-audit have been created. The board/canvas and the playground in the plan have not been developed yet.

# Desired approach

Latest screen workflow: have AI draft a list of cases from the requirements and logic for the user to check for completeness, then write the screens with mock data plus a board page gathering every case, placing each case side by side, grouped by screen or flow, with the case name and ID, such as default, loading, empty, error, success, validation and permission as relevant. The board must render from the project's real components and tokens, so that a component change shows on the board when it re-renders. Every case must be openable for review without clicking through a flow to reach that state. Completeness is measured against the agreed case list, and the list must be updated whenever there is a new requirement. For screen work, there is no need to recreate the design set in Figma.

# Style trial page from DESIGN.md

Before using a DESIGN.md from another source, have AI read it and summarize the styles that would change, such as font, color, spacing, size, corner radius and shadow, separating values stated in the file from values the AI chose to add when the information was incomplete, then build a style preview as a draft separate from the current Core, using the system's existing components built on shadcn as the base.

The preview must show the full component set, such as Button, Input, Select, Card and Dialog with the relevant states, plus at least one real Product screen with content and density close to real work, to judge whether the style suits the product.

On the canvas, place the original and the experiment side by side, using the same screen, data, cases and viewport size. If trying several DESIGN.md files, use the same sample set so the comparison is direct. The user continues adjusting the draft in the playground, or discards it, with Core unchanged.

Only after the user decides the style is suitable, show the list of token/style changes and their impact, save a checkpoint, then have AI bring the selected changes into Core, checking the components and every relevant board case according to the Component Audit plan. Do not duplicate components just to change styles without need, and do not start counting Design System versions from the experiment or from applying it.

This feature is part of the design experiment plan. The style trial page has not been built and Core has not been changed.

# Playground and Figma-style panels

Add a playground for experimenting with edits to screens from the board and with edits to components in the Design System, with panels and a usage pattern familiar from Figma to reduce new learning.

- Left: Layers for selecting elements

- Center: the screen or component being experimented on, with click-to-select elements, zoom and pan

- Right: Properties such as Layout, Size, Padding, Gap, Typography, Fill, Stroke, Radius and token binding

- Top: Undo/Redo, Reset, Cancel and Apply

Experiments are kept as a draft separate from the real source code, with default starting values. The user adjusts and sees the result immediately. If they do not like it, they can cancel and discard the draft, with the real code unchanged. If they leave while there are unconfirmed edits, they must be asked whether to discard or go back to continue experimenting.

When they like the result, they press Apply. This shows the list of changes and the scope, only this screen or the shared component, then has AI read that list and edit the real source code. Then re-render the board and check every affected case. Show a success status when the code has been edited and checked. If it fails, keep the draft and report what could not be done.

Store changes as data with identifiers for the related element, component and source, along with the old value, new value and token reference, so the AI does not have to guess from before and after images. A Design System edit must show the impact on users of the shared component before it is applied.

Initial scope: a panel for adjusting properties that can definitely be written back to the code. Unsupported fields must be clearly indicated. Drag-and-drop and full Figma-style free editing of the layers structure are later extensions. Development of the playground and panel has not started.

# UX Writing to do later

UX Writing is to be added for the Design System and each Product in the future. For now it is recorded only as later work. Do not start designing a workflow, creating or installing a skill, or editing product copy until the user orders it to start.

# Skills to prepare

Status as of 22 November 2026: component-reuse-check, case-planning and component-audit have been created and installed in .agents/skills, with metadata for choosing when to use them, and rules have been added to AGENTS.md. All three use the same report format: overall result, scope, a table of level/result/item/evidence/next, a count summary, and one next step. Show no more than 8 items; if there are more, report the number remaining. Do not hide the limits of the check. Keep check-and-report modes separate from actual fixing. The skill structure and metadata pass the standard validator. They still need to be evaluated on real work. The other skills remain in the plan, based on the installed upstream skills and Storybook workflows.

1. **Design–Code Parity & Sync** compares tokens, properties, variants and appearance between code and Figma, with evidence and a status of matches, does not match, or cannot be checked. The default is Code → Figma, with no need to state the direction every time. Sync only the components or pages within the scope of the command. If the user adjusts Figma and wants to bring it back, they must explicitly order Figma → Code. Keep a baseline to know which side changed. If both sides edit the same part, show the conflict so one can be chosen before overwriting, not deciding from the latest date alone. Supports ordering sync to run automatically within the specified direction and scope. Checking on a schedule or on every PR needs additional automation/CI.

2. **Component Reuse & Duplicate Check** focuses on finding and reusing existing components before creating new ones, across Core, the central catalog and accessible projects. After writing, check the added or changed code for whether AI created a component or assembled UI that duplicates an existing one, comparing function, structure and behavior, not names alone, and specify the existing component that should be used and the places that need fixing. If it cannot be substituted, state why and propose adding a variant or splitting out a new one, without merging automatically. The token check is a supplement; not every hardcoded value counts as wrong.

3. **Case Planning** reads the requirements and logic and lays out a case list, such as loading, empty, error, permission, validation and long data, separating confirmed cases from proposals or questions for the user to decide.

4. **Code → Figma** creates or updates only the selected components or pages, using the existing library and Variables. Keep the mapping to the source and a baseline to support bringing Figma edits back into the code later. Check Auto Layout, properties, variants and use of instances.

5. **Board Maintenance** builds and updates the board from the case list, checking completeness, cases that cannot be opened, and mock data that does not match conditions, using real components and tokens.

6. **Apply Playground Changes** reads the list of changes in the draft that the user chose to apply, with the scope of only the screen or the shared component, edits the real code, then checks the board and the affected cases. The panel, draft, Undo/Redo and discard/apply buttons are features that must be developed separately from the skill.

7. **Component Catalog Maintenance** updates the list of shared components and A/B's components so AI discovers existing ones before creating new ones, and proposes what should move into Core, with the team reviewing first.

8. **Component Audit** checks quality after creating or editing a component and before bringing it into Core: use of tokens and Core components, clarity of props/variants, relevant states, layout under long text, empty data and screen size changes, keyboard/focus and accessible names, state examples on the board, and impact on the cases that use it. Reports pass / needs fixes / cannot be checked, with evidence and priority. Checks from the code and from running examples as far as accessible, and does not treat reading code alone as proof of complete behavior. Keep audit/report mode separate from actual fixing. Reuse & Duplicate Check is responsible for finding existing components and checking for duplicates, while Design–Code Parity is responsible for agreement with Figma.

Proposed starting order: Component Reuse & Duplicate Check → Case Planning → Board Maintenance, then develop the playground together with Apply Playground Changes. Code → Figma and Parity & Sync are added when some screens start being edited in Figma. Use a lightweight catalog from when A/B start sharing things.

# Starting technology and later changes

Start with React + shadcn/ui as the component base of the Design System, while the app framework/build tooling, supplementary libraries and the way components are delivered to Dev are chosen only as far as needed for experiments first, then adjusted later by reducing how tightly the parts are coupled, without building a system that supports every option in advance.

- **Core:** React components and tokens not tied to the router, API, server features or business logic of the app framework/Product, receiving data and callbacks via props, with clear export/import points.

- **Product:** screens, cases, data and logic specific to the Product, including the routing and API connections that are needed.

- **Board/Playground:** the team's working tools, separate from the components Dev takes into use, so a real app is not forced to install the editor or board.

- **Supplementary libraries:** keep the integration with forms, tables, charts or other services in the component/module responsible for it, to limit the places to edit when changing, without adding a wrapper to everything for no reason.

- **Delivery method:** start by calling Core within the repository through a defined import, then organize it as a shared package when needed. Give Dev documentation and usage examples matching the method actually used.

- **Theme:** Core has one starting theme for color, font, spacing and base values. Every Product uses it as the base, then can override fonts and colors via products/<product>/theme/, including adding Product-specific colors or tokens, without changing Core or duplicating components just because the look differs. The names and roles of the shared semantic tokens, such as primary, background, text and danger, are shared, but the values can differ by theme. Name specific colors by role and keep them in that Product. Core components reference tokens and are not tied to Product names. Theme scope must be separated so A/B previews on the board do not interfere with each other. When changing a theme, check contrast and color meaning, including layout with long text and Thai when the font changes, on every relevant board case.

Moving the app within React, such as from Vite to Next.js, still requires adjusting the related routing/build/server parts and retesting. Switching to a framework from a different family than React may require rewriting the components, even though tokens, cases and requirements can still be carried over. So there is no guarantee that the technology can be changed without migration work.

For now this only records the technology choice and design principles. Nothing has been installed or created as a project from this decision.

# System setup steps

1. Create a central Design System repository that holds Core components and tokens, while A/B-specific components live in that project.

2. Define shared tokens, such as color, font, spacing and corner radius, for the code to reference.

3. Connect a coding agent that can read code with a tool that writes to Figma, such as Figma Console MCP and Desktop Bridge, then open the target Figma file.

# Component creation steps

4. Prepare the component in code, clearly specifying props, variants and states.

5. Build a preview page or Storybook showing an example of each variant/state.

6. Have AI read the code and the related dependencies, then create the Figma component with Auto Layout, variants, properties and Variable bindings.

7. Compare against the real preview, try changing the text, stretching the size and switching variants, and fix until it is right.

8. Keep the mapping between the code component and the Figma component, then publish the library when ready. Code Connect can be added to connect components and properties to the Dev workflow.

# Maintenance steps when code changes

9. Have AI check the code and Figma and report the differences with evidence, separated into matches, does not match, and cannot be checked.

10. Have AI update the existing component in Figma, check that the instances in use are still correct, then publish a new library release.

A skill defines the steps for AI to check, but does not run on a schedule by itself. To check on every PR or on a schedule, CI or automation must be added.

# Managing projects A and B

Start simple by keeping Core and each Product in the same project/repository but in separate folders, with no need to split into multiple repositories from the start. A Product may use Core, but Core does not reference anything from a Product. New things that are not yet clearly shared should start in a Product, then move into Core when appropriate. Use a variant when the function is the same, split into a separate component when the function differs, and use the Product's theme/tokens when the difference is only base values.

## Starting folder structure

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

Each Product has its own Figma-style canvas for placing the frames of screens and cases, grouped by flow with names, with frames draggable to reposition and the work area zoomable and pannable. Positions and groupings are saved separately per Product, without mixing. When switching Products, open that Product's canvas and context. Core has a separate area for viewing shared components, and every Product still shares Core. The canvas is the area that shows the board of every case from the real code, while editing the design inside a frame uses the playground and properties panel in the plan. Moving a frame on the canvas changes the arrangement for review and does not change the layout in the real screen. This structure must also support trial-receiving Core before bringing it into a Product; separating folders alone does not give a usable snapshot separation, so a mechanism must be designed when developing it.

## Choosing a Product and remembering work context

When starting work, use the Product from the board, the screen or the file that is selected. If it is still unclear, ask the user to choose the first time, then remember the Product for the whole of that work, without asking again on every command until the user changes Product. Show which Product is being worked on, visibly on the board and easy to change. Keep context separate per task or session, not using one global value that interferes with someone else's work.

Once a Product is selected, AI must create or edit components, screens and cases in that Product's folder, and call the existing Core first. Selecting a Product does not permit editing everything in Core. If the work requires changing Core, show the scope and the cross-Product impact clearly.

Keep a list of Product and Core maintainers in a central file to use as defaults and to identify reviewers, with the selected work context taking priority. Maintainers can cross over to help another Product, with no fixed assignment of Products to people.

The person working on A does not need to follow B's work themselves. Use a central catalog in the Git repository for AI on both sides to read before creating a component, and update it when adding something new. Each entry states the name, function, status, Core/project-only, source location, maintainer, and Figma mapping, which can be a separate file per component.

Each person has their own standing branch and does code edits only on that branch. AI must check that the current branch matches the person working before editing, and must not edit another person's branch or the central branch directly. Keep the standing branch for reuse; do not close or delete branches automatically when work ends or after merging changes. Selecting a Product is a folder context, separate from selecting the working person's branch. One person can help on multiple Products in their own branch.

Changes ready to share, especially Core and the central catalog, go through a PR for review and merging into the central point, without deleting the standing branch after merge. Then receive the selected changes from the central point back into each person's branch. If there is a conflict, show it and resolve it before merging, without overwriting the other person's work. Branch separation prevents work from overlapping while in progress, but does not eliminate conflicts at merge time, and does not make A/B see each other's work immediately. Reading the source of the other project requires access permission.

# Draft status and Design System updates on the board

At first the Design System is in Draft status and does not start counting versions or issuing numbered releases until the user explicitly orders it to start, because it is still experimental and changing often. Keep history and snapshots/commits internally to compare and roll back, without treating them as Design System version numbers. When the user tells it to start counting versions, only then define the number format and the first version.

## Saving multiple checkpoints and rolling back

There is a save-checkpoint button, where each press creates a new checkpoint that can be named, such as before changing navigation or after trying a color adjustment, and does not automatically overwrite an existing checkpoint. The user can open an old checkpoint to view before choosing to restore.

When rolling back from checkpoint 3 to checkpoint 1, checkpoints 2 and 3 remain and can be viewed or restored. Restoring becomes the new current state without deleting newer history. If overwriting is supported, it must be a separate command that the user deliberately chooses.

Each checkpoint must reference the Product code, Core components and tokens in use at that time, including positions and groupings on the canvas, so it can be reopened completely. Separate checkpoints per Product. Rolling back one Product must not silently roll back the Core shared by every Product; instead restore that Product's reference to its Core set and report the impact according to scope.

Use Git history and the necessary canvas/draft data instead of copying the whole project each time, to reduce space. Preview images are kept only for the checkpoints that need them. Having multiple checkpoints does not count as starting Design System versioning, and it still has to wait for the user's order before starting to count version numbers.

When the central Design System changes, the board should announce that there is a new change, with the list of components and tokens that changed, the impact on projects, before and after images when relevant, and migration guidance if usage changes. During Draft, no version number is shown. AI can help summarize the changelog, and it must be checked for accuracy before publishing.

The user can view changes and try the update by creating a preview from the selected snapshot, separate from the set the project currently uses, then rendering every relevant board case, comparing before and after, and reporting cases with problems.

If they do not want it, discard the experiment and keep using the existing set. If it is fine, choose to bring it into the project, then AI updates the source or dependency according to the real structure, with the necessary migration, via a branch/PR, checking the build and the affected cases before merging per the team's workflow. Applying changes during Draft does not start version counting.

Statuses are separated into has new changes, being tried, and applied. Internally keep which snapshot/commit A/B reference, to know what is in use and to roll back. Update the status after a successful import into the project, still without setting a version number until the user orders it.

Change detection, board notifications and trial updates are features that need further development. Currently they are recorded as a plan and have not been built or enabled.

# Start on GitHub and prepare to move to GitLab

Start by keeping the project on GitHub, designed so it can easily move to GitLab later, without tying the core logic of the Design System, board, playground and skills directly to GitHub.

- Separate the Git provider integration from the core logic, such as reading the repository, notifying of changes, and creating PRs/MRs, implementing only GitHub first, with no need to build a full GitLab integration now.

- Keep the catalog, cases, canvas layout, mapping and checkpoints in a format that can be exported or moved. Source reference data stores the repository identity, path and commit, with the GitHub URL as a link for viewing, not the only identifier, and no credentials are kept in this data.

- Keep build/test commands and the main tasks as scripts that can run locally, and have GitHub Actions call those scripts, so it can be adapted to GitLab CI/CD easily.

- Set the repository URL, provider, webhooks and credentials as separate configuration to reduce code edits when moving.

- Before choosing additional integrations, especially Figma, hosting or a package registry, consider the ability to change providers and record the limitations.

When moving, the code, commit history and each person's standing branches, plus checkpoints and files outside Git, must be fully checked. Set up permissions and connections again, move CI, and adjust the links handed to Dev, checking the importer's limits for issues/PRs and other data according to the actual tool. A repository move is not assumed to move all connected services automatically.

# Handoff to Dev

Prepare a handoff package containing the GitHub repository link with access permissions, links to the boards of the relevant Products, and a short getting-started guide, with no links sent and no real people invited during this planning stage.

- **GitHub:** the code for Core components, tokens and Product-specific parts. Specify the branch/commit or checkpoint that Dev should reference, to avoid confusion with experimental work that keeps changing.

- **Board:** view the appearance, every agreed case, and try the behavior, specifying the same code set as the one handed off.

- **Getting started:** what needs to be installed, the commands to install dependencies and run the example project/board, how to import and use components, and the relevant file locations. Use real, verified commands once there is an implementation.

Before building for real use, agree with Dev on the framework, the existing libraries to build on, props/states/accessibility, and how to bring Core into the project. If in the same repository, import from Core according to the established structure. If in different repositories, during the experiment phase have Dev clone and run it to check together, then prepare Core as a package once it is ready for use across multiple projects, without starting Design System version counting until the user orders it.

Dev can take components and tokens into real apps after quality checks, while the board and playground are the team's working tools, separate from the app delivered to real users. Screens that use mock data must be connected to the API, user permissions and business logic completely before real use.

# Code to Figma workflow and the file pair for each Product

One Product has 2 Figma files as a pair: the DS file holds the main components, variants and variables; the Design file holds screens made of instances from the DS file; they are not files from different Products.

The first time a Product is set up, ask for the DS file link and the Design file link together, then save the destination pair in the repo's central mapping. Subsequent times, use the existing pair for the selected Product without asking again. Ask again only when there is no data, the destination is ambiguous, it is inaccessible, or the user orders a file change, without choosing another file on its own.

1. The user selects the screen or component in code to bring into Figma.

2. AI checks the components and tokens that the screen uses against the DS file and the existing mapping, using existing ones first and adding or updating only what is necessary, without needing to complete the whole library before starting the first screen.

3. Check readiness and the permissions to publish/use the Library across files. When the Library is ready, assemble the screen in the Design file with real instances and an editable layout, while Product-specific components can be kept as local components within the agreed scope.

4. Remember the mapping of code component to DS node and of screen/case to Design node, to update existing ones instead of creating duplicates.

5. When bringing a design back into code, separate instance or layout adjustments specific to a page from changes to the main component in the DS, which may affect many pages/Products. The default sync is still Code → Figma; Figma → Code is used when the user orders that direction.

This is an agreed workflow. No real Product link pair has been set up and no automatic mapping-saving system has been built. Library publishing and receiving updates across files must be checked against real capabilities and permissions; automatic sync is not assumed from installing skills alone.

# Tools and scope

The coding agent reads code/styles/tokens; Southleft's Figma Console MCP together with Desktop Bridge is used to write native components and Variables; Figma Desktop opens the target file; Storybook/preview helps check the real appearance.

Code Connect pairs components and properties with code; it is not a system that automatically syncs every aspect of appearance. Tokens can sync when a pipeline is set up. Adding a variant or changing the structure requires updating Figma too.

Having the tools ready does not guarantee conversion quality; it must be tested and the results checked.

# First experiment and next questions

Start with one Button, before expanding to Input and the whole library. Measure whether the result can be used further, how much time cleanup takes compared with building it by hand, and whether the existing one can be updated without breaking instances.

Issues still to be decided: token format, the scope of variants to show in Figma, how to store mapping and baseline, how to handle conflicts when both sides edit at the same time, the mechanism for trial-receiving a Core snapshot separate from the set a Product is using, and the check/publish steps. The starting structure is agreed as a single repository with core/ and products/ separated. The default sync is Code → Figma, and version counting has not started until the user says so.

Component Reuse & Duplicate Check, Case Planning and Component Audit have been ordered to be created and installed. Design–Code Parity & Sync, the board/playground workflow and the other dedicated skills have not been created yet. UX Writing is recorded as later work and has not been started.

# References

[Figma Console MCP](https://github.com/southleft/figma-console-mcp)

[Figma Write to Canvas](https://developers.figma.com/docs/figma-mcp-server/write-to-canvas/)

[Code Connect](https://github.com/figma/code-connect)

Examples of companies discussed are about connecting and maintaining a Design System on both sides, not evidence that everything syncs automatically: [Spotify](https://www.youtube.com/watch?v=SmarocuBv6c), [Atlassian](https://www.youtube.com/watch?v=-qlAjXbbn6k)

