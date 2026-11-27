// Checks that every local prototype has a Canvas board built together with it, arranged flow by flow,
// with labelled connector lines between the steps.
// Run: npm run canvas:check   (from design-system/)
// It checks files and layout data only; it does not render the screens or know which states a flow should have.
import fs from "node:fs";
import path from "node:path";

const repo = path.resolve(import.meta.dirname, "../..");
const errors = [];
const warnings = [];
const read = file => fs.readFileSync(path.join(repo, file), "utf8");
const exists = file => fs.existsSync(path.join(repo, file));
const dirs = dir => (exists(dir) ? fs.readdirSync(path.join(repo, dir), { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name) : []);

const catalog = JSON.parse(read("workspace/prototypes.json")).prototypes;

// 1. every prototype folder is listed in the catalog
for (const product of dirs("products")) {
  for (const id of dirs(`products/${product}/prototypes`)) {
    const folder = `products/${product}/prototypes/${id}`;
    if (!catalog.some(p => p.path === folder)) errors.push(`${folder}: not listed in workspace/prototypes.json`);
  }
}

// 2. every listed prototype (except Claude artifacts) has a Canvas arranged by flow
let boards = 0;
for (const p of catalog) {
  if (p.prototypeMode === "claude-artifact") continue;
  const where = `prototype ${p.id}`;
  if (!p.canvasPath || !exists(p.canvasPath)) { errors.push(`${where}: no Canvas folder (canvasPath)`); continue; }
  const story = fs.readdirSync(path.join(repo, p.canvasPath)).find(n => n.endsWith(".stories.tsx"));
  const name = story && read(`${p.canvasPath}/${story}`).match(/frames=([A-Za-z0-9._-]+)/)?.[1];
  if (!name) { errors.push(`${where}: no Canvas story that opens a frames catalog (?frames=...)`); continue; }
  const file = `workspace/canvas/${name.replace(/\.json$/, "")}.json`;
  if (!exists(file)) { errors.push(`${where}: ${file} does not exist`); continue; }
  boards++;
  const board = JSON.parse(read(file));
  const pages = board.pages ?? [];
  // connector lines: what to press (or what happens) to get from one step to the next
  const stepOf = id => { const f = board.frames.find(x => x.id === id); return f && f.title.replace(/ · (Desktop|Tablet|Mobile)$/, ""); };
  const links = board.links ?? [];
  const reached = new Set();
  if (!links.length) errors.push(`${file}: no "links"; draw a labelled line for each way to move between steps`);
  for (const l of links) {
    const from = stepOf(l.from), to = stepOf(l.to);
    if (!from || !to) errors.push(`${file}: link ${l.from} -> ${l.to} points to a missing frame`);
    else if (from === to) errors.push(`${file}: link ${l.from} -> ${l.to} starts and ends on the same step`);
    else reached.add(to);
    if (!l.label?.trim()) errors.push(`${file}: link ${l.from} -> ${l.to} has no label (name the button or the automatic trigger)`);
    if (l.kind && !["main", "alt", "error"].includes(l.kind)) errors.push(`${file}: link kind "${l.kind}" must be main, alt or error`);
  }
  const firstStep = board.frames.map(f => f.title.replace(/ · (Desktop|Tablet|Mobile)$/, "")).sort()[0];
  for (const step of new Set(board.frames.map(f => f.title.replace(/ · (Desktop|Tablet|Mobile)$/, "")))) {
    if (step !== firstStep && !reached.has(step)) errors.push(`${file}: no line leads to "${step}"`);
  }
  if (!pages.length) errors.push(`${file}: no pages; use one Canvas page per flow`);
  for (const f of board.frames) if (!pages.some(g => g.id === f.page)) errors.push(`${file}: frame "${f.title}" has no flow page`);
  for (const page of pages) {
    if (!page.title) errors.push(`${file}: page "${page.id}" has no flow name`);
    const frames = board.frames.filter(f => f.page === page.id);
    if (!frames.length) { errors.push(`${file}: flow "${page.title}" has no frames`); continue; }
    const steps = new Map();
    const ordered = [...frames].sort((a, b) => a.y - b.y || a.x - b.x);
    let last = 0;
    for (const f of ordered) {
      const m = f.title.match(/^(\d{2}) · (.+) · (Desktop|Tablet|Mobile)$/);
      if (!m) { errors.push(`${file}: frame title "${f.title}" must be "NN · state · Desktop|Tablet|Mobile"`); continue; }
      const [, num, state, viewport] = m;
      if (Number(num) < last) errors.push(`${file}: flow "${page.title}" is out of step order at "${f.title}" (read left to right, top to bottom)`);
      last = Number(num);
      const key = `${num} · ${state}`;
      steps.set(key, [...(steps.get(key) ?? []), viewport]);
    }
    for (const [step, views] of steps) {
      if (!views.includes("Mobile")) warnings.push(`${file}: "${step}" has no Mobile frame (report it as a gap)`);
      if (!views.some(v => v !== "Mobile")) warnings.push(`${file}: "${step}" has no Desktop/Tablet frame`);
    }
    for (let i = 0; i < frames.length; i++) {
      for (let j = i + 1; j < frames.length; j++) {
        const a = frames[i], b = frames[j];
        if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h) errors.push(`${file}: "${a.title}" overlaps "${b.title}"`);
      }
    }
  }
}

for (const w of warnings) console.warn("warning:", w);
if (errors.length) {
  console.error(errors.map(e => "✗ " + e).join("\n"));
  process.exit(1);
}
console.log(`Canvas check passed: ${catalog.length} prototype(s), ${boards} board(s) arranged by flow. This does not check that every needed state is present or renders.`);
