# Figma Workflow

> **หมายเหตุ (26 พ.ย. 2026):** เอกสารนี้เขียนในยุค MUI ส่วนที่พูดถึง `Crv*`, MUI props และ `.ai.md` ใช้กับ `legacy/mui/` เท่านั้น ส่วนขั้นตอนฝั่ง Figma ใช้ได้ทั่วไป DS ปัจจุบันคือ shadcn ใน `shadcn/` (กฎใน `shadcn/rules/`)

ครอบคลุมงาน — **Figma authoring** (สร้าง/แก้ component ใน Figma) และ **Figma → Code** (implement React จาก Figma) รวมถึง **Code → Figma ระดับหน้าจอ** (Part C)

**Related docs**
- Screens / templates: `legacy/mui/rules/pixel-perfect-ui.md`
- Component contracts: `shadcn/rules/components/{name}.md`
- Code conventions: `legacy/mui/code/CLAUDE.md`
- Per-component AI rules: `legacy/mui/code/core/components/{Component}/{Component}.ai.md`

---

## Part A — Figma Authoring (สร้างและแก้ component ใน Figma)

### Tools Required

- **figma-console MCP** — ต้องเชื่อมต่อผ่าน Desktop Bridge plugin ใน Figma Desktop
- Verify: `figma_get_status` with `probe: true`
- ถ้าหลุด: Figma Desktop → Plugins → Development → Figma Desktop Bridge → Run

### A1 — Prop Naming Rules

1. ใช้ MUI prop names ถ้าทำได้
2. ถ้า MUI prop ใช้ใน Figma ไม่ได้ (เช่น `children`) ให้ตั้งชื่อ Figma แล้ว document mapping ใน `rules/components.md`

**Variant axes (สร้าง frame แยกต่างหาก):**
- `size=small|medium|large` — เมื่อ visual sizing ต่างกัน
- `state=default|hover|focused|filled` — interaction states (CSS pseudo — ห้าม expose เป็น code prop)
- `disabled=false|true` — boolean axis แยก → MUI `disabled={true}`
- `error=false|true` — boolean axis แยก → MUI `error={true}`
- `selected=false|true` — boolean axis แยก → MUI `selected={true}`

**ห้ามรวม `disabled` หรือ `error` เข้า `state` axis** — เป็น MUI props แยกกัน

### A2 — Variable Binding (mandatory)

Bind variables ทุก property ที่ทำได้ ห้าม hardcode

**Spacing mapping:**

| Raw px | Variable |
|---:|---|
| 2 | `spacing/2xs` |
| 4 | `spacing/xs` |
| 8 | `spacing/sm` |
| 12 | `spacing/md` |
| 16 | `spacing/lg` |
| 24 | `spacing/xl` |
| 28 | `spacing/2xl` |
| 32 | `spacing/3xl` |
| 40 | `spacing/4xl` |

ถ้าค่าตกระหว่าง token ให้ round ไป token ที่ใกล้ที่สุด ห้ามสร้าง one-off local value

```js
// ✅ correct
node.setBoundVariable('paddingTop', findVar('spacing/lg'));
node.fills = [colorFill('color/on-surface/default')];

// ❌ wrong
node.paddingTop = 16;
```

**Color fills:**
```js
const colorFill = varName => {
  const v = allVars.find(v => v.name === varName);
  return figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v);
};
```

**Typography:**
```js
const style = allStyles.find(s => s.name === 'typography/label/medium');
await textNode.setTextStyleIdAsync(style.id);
```

**Async API (mandatory):**
```js
await figma.loadAllPagesAsync();
const allVars   = await figma.variables.getLocalVariablesAsync();
const allStyles = await figma.getLocalTextStylesAsync();
const node      = await figma.getNodeByIdAsync('1234:5678');
// primaryAxisSizingMode: ใช้ 'AUTO' ไม่ใช่ 'HUG'
```

### A3 — Purple Dashed Border (mandatory)

ทุก component set ต้องมี purple dashed border `#8A38F5` — เกิดอัตโนมัติจาก `combineAsVariants()`

```js
// Multiple variants → COMPONENT_SET
const set = figma.combineAsVariants(variants, page);
set.name = 'crv-component-name';

// Single variant → COMPONENT
const comp = figma.createComponentFromNode(existingFrame);
comp.name = 'crv-component-name';
```

ห้ามสร้าง FRAME เป็น deliverable สุดท้าย — ต้องเป็น COMPONENT หรือ COMPONENT_SET เสมอ

### A4 — Audit

Report ทุก finding พร้อม:
- **Severity**: 🔴 Critical / 🟡 Warning / 🟢 Info
- **What**: prop/token/layer name จริง
- **Why**: rule ที่ละเมิด
- **Fix**: สิ่งที่ต้องเปลี่ยน

**Severity:**
- 🔴 dev implement ผิด behavior (wrong token category, missing prop, undocumented state)
- 🟡 visual drift (hardcoded spacing, wrong surface token)
- 🟢 naming inconsistency (no visual impact)

ห้าม auto-fix หลัง audit — รอ user สั่ง "แก้เลย"

### A5 — Fix

Fix เฉพาะเมื่อ user สั่งชัดเจน:
1. **Edit existing** — modify nodes in place ด้วย `figma_execute`
2. **Rebuild** — เฉพาะเมื่อ user สั่ง หรือ structure ไม่รองรับ fix

หลัง fix ทุกครั้ง: `figma_capture_screenshot` และ verify ก่อน report done

### A6 — Naming Convention

- Figma: `crv-{component-name}` kebab-case
- Code: `Crv{ComponentName}` PascalCase
- ห้ามใช้ `cv-` prefix (deprecated)

### A7 — Annotation Rules

**Purple stroke บน COMPONENT_SET** — native Figma annotation จาก `combineAsVariants()` ห้าม report เป็น hardcoded stroke และห้ามลบหรือ replace ด้วย variable

---

## Part B — Figma → Code (implement React จาก Figma)

### Principle: Figma wins on conflict (สำหรับ Figma → Code)

`shadcn/rules/components/*.md` คือ checklist และ contract ไม่ใช่ substitute สำหรับการอ่าน Figma

ถ้า rule ขัดกับ Figma node จริง → **trust Figma** → implement จาก Figma → **update rule ในงานเดียวกัน**

### B1 — Inspect Figma first (mandatory)

ก่อนเขียนโค้ด inspect node ด้วย figma-console MCP:

1. `figma_get_status` — confirm Desktop Bridge เชื่อมต่อ
2. เปิด component set / reference frame
3. บันทึก structure:
   - **Top-level children** — sibling vs nested
   - **All variant axes** — ทุก combination ที่ต้อง support ใน Storybook
   - **Per-layer fills/strokes** — token ต่อ layer อย่าสมมติ bg เดียวทั้ง component
   - **Layout** — direction, alignment, gap, padding ต่อ frame

```text
crv-example
├── Header     → token A, padding X
├── content    → token B, padding Y
└── Footer     → token C, padding Z, border? (verify)
```

### B2 — Read docs as checklist

1. `shadcn/rules/components/{name}.md` — props, slots, token table
2. `legacy/mui/code/core/components/{Component}/{Component}.ai.md` — exports, AI rules
3. `legacy/mui/code/CLAUDE.md` — tokens, imports, MUI wrapper rules

Note gaps ระหว่าง doc กับ Figma แล้ว plan fix หลัง implement

### B3 — Implement

1. **Mirror Figma hierarchy ใน JSX** — footer มักเป็น sibling ไม่ใช่ nested ใน padding
2. **Tokens only** — `colors`, `spacing`, `radius` จาก `@/ds/tokens` ห้าม raw hex/px ใน `sx`
3. **MUI wrapper** — extend MUI แต่ override layout ให้ตรง Figma
4. **Styles file** — เก็บ variant logic ใน `{Component}Styles.ts` เมื่อ logic ซับซ้อน
5. **Exports** — public API ผ่าน `index.ts`; stories import จาก `index.ts`

### B4 — Storybook coverage (mandatory)

Story ต่อแต่ละ variant axis สำคัญ:
- Layout types, breakpoints, boolean toggles ที่เปลี่ยน anatomy
- อย่างน้อย 1 realistic content example

Story title pattern: `{Category}/Crv{Component}`

### B5 — Visual verify (mandatory)

ก่อน mark done:
1. รัน Storybook และเปิด stories ใหม่
2. เทียบกับ Figma — `figma_take_screenshot` บน matching variant
3. เช็คเฉพาะ: bg color ต่อ section, border/divider, CTA order ต่อ breakpoint, padding/gap/typography

ถ้าต่าง → แก้โค้ดก่อน → update rules ทีหลัง

### B6 — Sync documentation

| File | Update เมื่อ |
|---|---|
| `shadcn/rules/components/{name}.md` | anatomy, tokens, layout, prop mapping เปลี่ยน |
| `legacy/mui/code/core/components/{Component}/{Component}.ai.md` | props, slots, implementation rules ใหม่ |
| `legacy/mui/code/CLAUDE.md` | global pattern ใหม่ที่ใช้ได้กว้าง |

### Common failure modes

| Mistake | แก้ด้วย |
|---|---|
| Trust stale rule เหนือ Figma | Inspect node; update rule หลัง fix |
| Single wrapper with uniform padding | Split เป็น sibling sections ตาม Figma |
| Footer สี same กับ body | อ่าน fill บน footer layer จริง |
| MUI `DialogActions` border-top | เฉพาะเมื่อ Figma มี divider stroke |
| Story เดียวสำหรับ multi-axis component | Story ต่อ axis combination |
| Stories import deep path | Import จาก `index.ts` เสมอ |

### Quick checklist

```
[ ] Figma node inspected — structure, variants, per-layer tokens
[ ] shadcn/rules/components/*.md อ่านแล้ว; conflicts noted
[ ] JSX mirrors top-level Figma frames
[ ] Tokens only — no hardcoded hex/px
[ ] index.ts exports + stories import from index
[ ] Storybook stories ครอบ key variants
[ ] Visual compare Storybook vs Figma
[ ] rules + .ai.md updated ถ้า Figma ต่างจาก doc
```


---

## Part C — Selected Code → Figma

Latest policy: `AGENTS.md` and `DESIGN-SYSTEM-PLAN.md`. Parts A/B above remain legacy authoring/Figma-first procedures, not a global requirement that all new UI start in Figma or use MUI. Keep token binding/API safeguards for the target DS; resolve conflicts with the approved source rather than automatically rounding imported designs or changing anatomy.

### Source and destination

Code defines implemented API/behavior and the selected screen composition/content. Approved tokens/specifications and current Product typography decisions define visual authority. Existing target Figma components retain their radius, variable bindings and property API; broader preview preferences do not authorize replacing those rules. Surface drift as a conflict rather than silently choosing one side.

Resolve Product from the task and retain it. Discover an existing mapping; at first setup request both its DS file and Design file together and save the real pair in an explicit repository mapping. Never invent file keys, mappings or baseline support. DS files hold shared components/variables; Design files hold screens built from instances. Source-only work and board cases do not require Figma copies.

### Workflow

1. Inspect only selected source/dependencies and the actual rendered state/viewport. Record path, route/story, commit and dirty status. If runtime cannot run, distinguish static reconstruction from verified visual parity.
2. Read existing mappings, destination nodes, DS components/styles/variables and relevant Code Connect files. Verify real tool capabilities and cross-file library permissions before writing.
3. For selected screen output use code-to-figma → installed figma-generate-design/figma-use. For state-by-state prototype output use prototype-to-figma instead, with this same policy. Do not run both pipelines on the same deliverable.
4. Reuse existing nodes and instances. Keep editable text/vectors, Auto Layout and variable/style bindings; no complete-UI raster as deliverable. Create/update shared DS assets only when the task explicitly includes that scope. Missing DS matches are gaps to resolve, not permission for fallback primitives. Product-local components require agreed scope.
5. Update mapped nodes rather than duplicating. Inspect designer edits and preserve baseline/source evidence where available. If both sides changed the same contract/layout, show the conflict before overwriting. No automatic reverse sync; Figma → Code requires that direction in the user's task.
6. Compare rendered source and result at matching states/viewports; read back node structure, real instances, props and bound variables/styles. Report unsupported variants, visual deviations and checks that could not run. Update actual source/node mapping and provenance within authorized scope; do not claim a parity engine or background watcher exists.

Do not publish a library, change source/tokens, write Code Connect mappings or create files merely as a side effect of screen export. When task scope includes such work, perform the necessary preparation and verify real capability/permissions. Keep shared-DS impacts distinct from local screen overrides. Draft changes do not start numbered releases.
