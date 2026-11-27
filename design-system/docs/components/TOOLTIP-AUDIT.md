**Component Audit — Core Tooltip / Mira Credit Tooltip / Tabs correction**
Result: separated Core/Mira and added all 22 Figma variants; fixed the Tabs underline and slowed the animation; interaction passes 22/22 with contrast still outstanding
Scope: 8 Core Tooltip + 5 Mira + 7 Tabs + 2 catalog stories; native browser guide keyboard, source geometry/props and template docs; not a full Product accessibility certification

| Severity | Status | Item | Evidence | Next action |
|---|---|---|---|---|
| Medium | Needs fix | Guide primary Back/Next and Tabs still have contrast of about 3.2–3.5:1; the catalog has outstanding items for other controls | output/tooltip/tests.txt | Decide on the shared primary token separately |
| — | Pass | Standard tooltip role/id/aria-describedby are connected when open; hover/focus/Escape are testable | tooltip.tsx; Default/Keyboard stories | Keep text-only semantics |
| — | Pass | Action guide uses Popover: Next/Back change the example; native Enter adds a step, Escape returns focus | WithAction; browser | Do not put buttons inside role tooltip |
| — | Pass | Core Standard 12/16px, p4/8, r4; guide 240x168, r16; Mira text ≥12 and gap adjusted to 4 | CSS recipes; rendered stories | Let long text expand |
| — | Pass | Core 13 / Mira 9 linked specimens separated in docs; no text <12 or own horizontal overflow; 3 sets' props/geometry unchanged | figma-verification.json | Use the existing mapped nodes |
| — | Pass | Tabs underline z2 sits above hover; pointer 350ms / Folder 320ms; keyboard 0ms | tabs.css; native click screenshot; regression | Review the speed based on feedback |
| — | Pass | Build, scoped lint, token check and story-file coverage pass | output/tooltip/; coverage 44/44 Core modules | Not counted as coverage of every state |

Totals: 6 passed, 1 group needs fixing; does not claim contrast passes everywhere
Next: review Tooltip/Mira and the Tabs speed before deciding on the primary contrast at the source

**Reuse & Duplicate Check — Core / Mira**
Result: extended the existing Tooltip and composed Popover/Badge/Button; Mira does not copy primitives
Scope: Core Tooltip/Popover/Badge/Button and the Product Mira folder; not every Product in the repository

| Severity | Status | Item | Evidence | Next action |
|---|---|---|---|---|
| — | Pass | Mira imports Core Tooltip; Core has no Mira import. Guide reuses Popover/Button/Badge; Storybook separates Core/Products | source imports; Storybook titles | Keep the dependency from Product to Core |

Totals: 1 passed, 0 need fixing, 0 could not be checked
Next: no further action needed
