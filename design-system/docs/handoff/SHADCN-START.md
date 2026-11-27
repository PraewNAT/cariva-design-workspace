# Getting started with Cariva Core

1. Install with `npm install` in this workspace, then `npm run storybook` (port 6006) to see Core/Foundations/example cases
2. Core: `src/lib/app/components/ui`; app compositions: `src/lib/app/components/app`; Core catalog: `src/lib/features/board/presentation`; token source: `tokens.json`
3. New pages import primitives, e.g. `import { Button } from '@/lib/app/components/ui/button'` and `<Button>บันทึก</Button>` (`บันทึก` = "Save"); medium is the default 40, not size=medium as in MUI
4. Bring `src/app/globals.css` into the entry along with Tailwind 4 and the @ alias to src; for the required dependencies see package.json and the source imports; do not copy node_modules, legacy or board into the UI package
5. Product themes use CSS variables at the root, and portals inherit the same set; backOffice uses data-product=backOffice on the document root in the real app so that modals outside the subtree get the same radius/theme
6. Before changing Core, search for what already exists, update the related doc/story, then audit the page + portal + mobile + keyboard and run the checks per AGENTS.md

The repo is at https://github.com/PraewNAT/cariva-ds (the latest work has not been pushed); no fake URLs are created. Handoff is source files + Storybook first; see SHADCN-MIGRATION.md for breaking API changes and the items without full parity yet; an npm package/registry will be agreed with the Dev team later
