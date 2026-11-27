# Cariva Design Workspace

A single workspace for the Design System and each Product's prototypes. Sources and tooling are kept separate so work is easy to find, without mixing experimental code into shared components.

## Structure

```text
cariva-design/                    # workspace name; the local checkout can keep its existing name
├── design-system/                # React/shadcn Core, Product DS, tokens, docs, Storybook
├── products/<product-id>/
│   └── prototypes/<prototype-id>/ # screens, cases, fixtures and the prototype app
├── workspace/
│   └── canvas/                   # board and frame catalogs
├── .agents/skills/               # canonical skills; skills/ is a compatibility link
├── rules/                        # shared rules and routing
├── legacy/mui/                   # frozen reference
├── sync/                         # sync tooling; canvas is a compatibility link
└── scripts/                      # peer bridge / Code Connect tooling
```

`shadcn/` is a compatibility link to `design-system/`, not a separate DS, and `sync/canvas/` points to `workspace/canvas/` to keep existing scripts/links working. The Git remote name and the local checkout are not renamed automatically.

## Getting started

- DS Storybook: `cd design-system && npm ci && npm run storybook` (currently port 6006)
- Workspace launcher: `cd design-system && npm run prototype` (port 5173) shows a sidebar for choosing real Product prototypes; there are no DS examples
- See the [prototype index](products/README.md) for real work, with run commands, ports, Figma and per-prototype status listed separately
- Read [create-project](.agents/skills/create-project/SKILL.md) before creating new work, and the [workspace scope](rules/workspace-structure.md) before choosing a location

## Requesting a prototype

```text
Create prototype [name] for Product [Product name]
Use this workspace and keep it in products/<product-id>/prototypes/<prototype-id>/
Figma: [link, if any — or design from requirements]
```

Thai trigger phrase (still works): `สร้าง prototype [ชื่อ] ของ Product [ชื่อ Product]`

There is no need to always attach a separate empty folder. If an app already exists, inspect and reuse it; do not scaffold over it. Follow the user's intent together with the node, rather than judging from the frame/component alone. The design must be accessible through the available tools, but Figma Desktop or gh/login is not required for local work. Creating a remote repo, publishing, pushing, deploying and writing to Figma must each be a separate request.

Every new Product prototype uses React/shadcn with its own dev host and can be opened in Storybook, with Canvas / Preview / full-page views using the same renderer and cases. Do not install Product dependencies into the DS just to combine the workspace.

## Reference rules

- [Workflow](design-system/rules/workflow-map.md)
- [Agent rules](design-system/rules/agent-rules.md)
- [Product setup](design-system/rules/product-setup-flow.md)
- [Figma component naming](design-system/docs/components/FIGMA-NAMING.md)

Organizing this workspace does not start release numbering and does not move or publish the Git repository.
