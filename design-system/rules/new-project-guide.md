# AI-guided onboarding for new projects

Use together with [Product setup](product-setup-flow.md) and [UI workflow](ui-workflow.md). The goal is for designers to start work without needing to know the code structure or skill names. The AI must guide in short steps, not ask everything at once, and not force every Product to have a new repo

## How the user can start

> Start a new project; help me set up and guide me step by step according to our workflow (Thai: "เริ่มโปรเจกต์ใหม่ ช่วย setup และไกด์ฉันทีละขั้นตาม workflow ของเรา")

## Conversation principles

- Start with “which step we are at now / what is needed from you / what will be done once it is received”; use design-work language and do not make the user pick configs that the AI can check itself
- Each round, ask only what is needed for the next step, grouping related questions; do not ask for all requirements when receiving the setup information
- Read the records before asking; reuse existing information and the status “Not yet created” (Thai: “ยังไม่มี”); if a necessary answer is still missing, wait and do not interpret silence as approval
- Separate information the user gave, what was found, proposals and what is still unconfirmed; do not create fictional names/URLs/stacks/businesses as fact
- After each step, record the substantive status and name the next step; do not create release numbers or a new task system

## Step 0 — Choose the workspace

The AI checks cwd, entry instructions, files, package config and Product records first. If a workspace already exists, do not scaffold over it. If it is unclear whether this is a new Product in the existing workspace or a new repo, ask the user to choose between these two options first

If you have not given a folder and a new repo must be created, the AI asks for the folder name/location or uses the open workspace as confirmed, and does not move/delete existing source. Copying a template does not authorize creating an app, installing dependencies, linking accounts or deploying automatically

Result: know where to record and whether this is new work or a continuation

## Step 1 — Receive the 4 starting fields

Use the form and recording method in product-setup-flow.md without adding mandatory fields:

```yaml
Product name:
Central Figma DS URL:
Product Figma DS URL: # Central only / Not yet created / URL
Screen-design Figma file URL: # Not yet created / URL
```

If the information already exists, keep using it and do not have it filled in again. If there is no central DS either, record that information is pending and ask only which DS to use or whether to design a new base. Do not guess that Cariva is used, and do not create a library from the answer “Not yet created” (Thai: “ยังไม่มี”)

Result: an actual Product record and the list of destinations still missing

## Step 2 — AI checks readiness

The AI checks accessible files/URLs/permissions, the DS code and Storybook that actually exist, mappings, fonts/tokens and installed tools/skills. Use read-only commands first and do not ask the designer to install everything themselves

Report briefly as “exists / does not exist yet / could not be checked” and then propose what is needed for the first task. Separate having a URL from access and library linkage. If tools are missing, state the options available and request a connection only when necessary; do not claim setup fully succeeded

If it is an empty repo and the user asks to continue creating a prototype, the AI proposes a prototype stack with reasons before proceeding; it need not match the production stack but does not move an existing stack without reason, and does not copy package/node_modules/credentials from old projects as defaults

Result: know what the first task can do and what blockers there are

## Step 3 — Prepare the base and structure before starting design

After checking readiness and confirming the component base, check/prepare the DESIGN.md rules and the tokens/theme structure from the selected DS, including the component, docs, Storybook and mapping structure, reusing existing items first. Do not yet create the whole component set and do not copy another company's values as defaults

Ask for necessary base requirements, such as theme/font that conflicts or is unclear, at this step; do not guess and then wait to fix it during screen work. For setup-only work, proposing scaffold/dependencies that are needed must fall within the permitted scope, and state what has not actually been installed

Result: the base and structure that actually exist, with the status of the parts still missing, separating empty structure from components already implemented

## Step 4 — Summarize setup, then choose the first task

Before asking about the page/flow, summarize the setup: which of Product information, DS/permissions, component base, design rules, tokens/theme and the component/docs/Storybook/mapping structure are ready, which are missing, and which could not be checked. Do not claim everything is ready while a blocker remains

**Asking which page/flow to start is the final step of setup**, after the summary above; it is not a condition that the user must answer before the structure is prepared. If the user has already specified the first task, use the earlier answer and do not ask again

Ask “setup within scope is ready; which page/flow do you want to start with, and should I design it or do you already have Figma?”, adjusting the word “ready” to the actual status; if it is not yet ready, state the limitations first

- AI designs: ask for the goal, users and key tasks only where not yet known when work actually starts
- Designer designs: use the existing screen URL or ask only for what is missing, then ask about business behavior that the image cannot explain
- Use mock data stated to be simulated; there is no need to ask for real patient/customer data

Result: setup ends as a clear phase and there is a first task for design; then create only the components that page needs

## Step 5 — Propose a small plan before starting

The AI summarizes the pages/cases to be done, the components to reuse, the data or behavior that must be asked about, and what is out of scope. Use the case-planning and reuse workflows as appropriate. If a component must be added, propose Core/Product with reasons and use the existing flow; do not ask for a Figma destination until Figma actually has to be written

A request to do the work counts as authorization within scope; no approval is added at every step. If the API/business/destination must be expanded beyond the task, ask only about that part

Result: a plan that can proceed without guessing business rules

## Step 6 — Build the prototype and let you try it

Follow the UI workflow; do not copy the testing steps to create new criteria. Open a preview that actually works with the available tools, with the agreed cases and mock data. Update docs/stories and check/audit according to the impact. Hand over the points you can try and the limitations; publishing a public URL is not required

Take feedback and use the existing revision loop. If you pause work, stop and keep the status; do not start over entirely when switching AI

Result: a web prototype checked within scope, or a report of what is still blocked

## Step 7 — Bring it to Figma when you ask

When the user approves the prototype and asks to bring it to Figma, enter the code-to-design flow. Use the recorded destination; if it is missing, ask and request the URL. Build screens from Figma components/instances, not pasted images. Check both structure and visual parity, and report the limitations

Use the sizes and viewport policy that the Product/project rules have approved; do not guess new numbers. For the current Cariva workspace, use desktop/tablet + mobile per the central rules; a new template must confirm that project's policy

Result: Figma node links and check results, or a status of still waiting for the destination/permission

## Step 8 — Record so work can continue

Update the Product record only when setup information changes. Task details/check results/outstanding items are kept in the task handoff per the UI workflow, separately; do not turn the central rules into per-task reports

Next time the AI reads the information and says briefly which step it will continue from, and does not ask the 4 fields again. If you move machines/repos, the record files must be taken along and permissions re-checked; no memory across machines is promised

## Using the structure in the future

The portable structure is at `templates/design-prototype-project/` and contains entry points, the onboarding guide, DS preparation, UI/revision workflow, two-way Figma, skills/reporting guidelines and a Product records area. It does not copy Cariva's URLs, credentials, node IDs, Product data or absolute host paths

This structure is a bootstrap for having the AI help adapt the rules to a new workspace; it is not a copy of the DS or of the whole skill set, and does not guarantee that slash commands or MCPs can be called immediately. When actually copying, check the destination files and do not overwrite existing entry rules; if they exist, propose merging the rules instead


## New-company DS and the component base

The existing workflow can be used with another company's DS, but Cariva's components/tokens/fonts are not used automatically. In the readiness check after receiving the 4 fields, check existing code/config first; if unclear, ask whether an existing code DS exists and whether it uses MUI, shadcn, Ant Design, custom, or whether the AI should recommend one. Record the result separately from the 4 fields, do not add a mandatory field to setup, and do not migrate existing code on your own

Then choose the first page, check what is needed, and only then prepare DESIGN.md, tokens/theme, component code, docs/Storybook, mapping and the prototype with check results according to scope; do not create the whole library in advance. The portable structure has details in rules/ds-foundation.md, rules/ui-workflow.md, rules/figma-workflows.md and rules/skills-and-reporting.md inside the structure itself, with no dependency referring back to this workspace

## New prototype standard — 27 November 2026

When the user asks to create a new prototype, use [create-project](../../.agents/skills/create-project/SKILL.md): React/shadcn and a Storybook that switches between a multi-case Canvas / a clickable Preview, and can open the Preview full-page, reusing the same screen components and case metadata. This standard applies to every Product; it is not an automatic migration of existing projects, and this documentation update does not mean the mode switch has been implemented

## Single workspace — 27 November 2026

Use [workspace structure](../../rules/workspace-structure.md): a prototype can be created in products/<product-id>/prototypes/<prototype-id>/ inside this workspace, with no requirement for a folder separate from the repo; do not scaffold over design-system or an existing app. Update products/README.md after creating/moving work and keep each app's local host separate
