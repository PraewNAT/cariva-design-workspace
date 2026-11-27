# Mira Credit Badge ownership migration - 2026-11-26

**Component Audit - Mira Credit Badge**
Result: moved component, asset and six stories from Core to Mira with behavior unchanged.
Scope: six Mira Credit Badge + six Core Progress stories; Figma docs move. No new visual specification.

| Severity | Status | Item | Evidence | Next action |
|---|---|---|---|---|
| - | Pass | 12/12 scoped stories pass; build passes | output/credit-move/tests.txt, build.txt | Keep behavior |
| - | Pass | Same25 linked specimens moved; Core retains36. No text below12px or owned horizontal overflow | figma-verification.json | Reuse mapped docs |
| - | Pass | Product imports Core Progress/Skeleton; no Core import of Mira or old code path remains | source search; imports | Keep dependency direction |

Totals: 3 passed; no migration failures. Earlier audit details below remain historical evidence, with current paths corrected.
Next: review the new Mira group.

# Progress coverage correction — 26/11/2026

**Component Audit — Progress / Credit Badge**
Result: filled in the two missed Credit Badge sets, covering all 4 sets in section 4457:16647; 12/12 Progress story interactions pass
Scope: compact 2 sizes × 4 statuses with native hover, remaining/used, depleted text/zero aliases, loading/optional parts, page/Dialog and Thai 320px. Not connected to a real credit system

| Severity | Status | Item | Evidence | Next action |
|---|---|---|---|---|
| — | Pass | 12/12 Progress stories including 6 credit stories; loading→loaded and the Dialog actually opened before the visibility check | output/progress-credit/tests.txt | Keep the test cases |
| — | Pass | compact 160×32/132×24; track 64/48×4; UI font 12/16; native hover=#f1f5f9 | browser-evidence.json | Keep a single recipe on the page/Dialog |
| — | Pass | 320px does not overflow even with long numbers/Thai labels; coin source 16px actually loaded | browser-evidence.json | No further action needed |
| — | Pass | low text warning/content/strong contrast 5.02:1; primary/warning track uses subtle to fix a source that was close to, but below, 3:1 | PROGRESS-FIGMA.md | Keep the existing central token; record the visual difference |
| — | Pass | Figma docs 61 linked specimens (12+24+16+9), visible credit labels ≥12; no own overflow; 2 main APIs/geometry unchanged | figma-verification.json; docs 4721:88932 | Source 10px is still the original data; do not claim main font sync |
| — | Pass | Build, scoped lint, tokens check pass; shared Progress/Skeleton not modified | build.txt; actual commands | No further action needed |
| Low | Could not check | Physical OS reduced motion / screen readers / billing integration | CSS motion-reduce; Product owns data/status | Do not claim full AA or billing readiness |

Totals: 6 passed, 0 need fixing within the checked scope, 1 could not be checked
Next: use the coverage-corrected Progress review and keep Product logic separate from presentation

**Component Reuse & Duplicate Check — Progress Credit**
Result: a single CreditBadge composed from the real Progress/Skeleton; no duplicates found within the checked scope
Scope: src/lib/products/mira/components/credit-badge.tsx, src/lib/products/mira/components/credit-badge.stories.tsx and the Progress/Skeleton imports

| Severity | Status | Item | Evidence | Next action |
|---|---|---|---|---|
| — | Pass | Both Figma sets map to CreditBadge through presentation props; no threshold or request logic created | src/lib/products/mira/components/credit-badge.tsx; source 7089:1151/7094:365 | Product passes amount/status/progress |

Totals: 1 passed, 0 need fixing, 0 could not be checked
Next: no further action needed

The previous round dropped CreditBadge from scope on its own; this correction confirms all 4 sets are covered. The exclusion text in the earlier audit is historical and has been corrected. Main Figma was not renamed and its API not changed; source aliases depleted2 / depleted 2 are numeric-zero presentation. 10px labels were adjusted to 12px only in code/doc instances, so the detailed badge may be wider than the source; width is not forced, which would shrink the text. The original icon uses a 16px PNG from Figma, not a flattened image of the component.
