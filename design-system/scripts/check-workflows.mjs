// Checks that the Thai Storybook Workflows pages stay consistent with rules/workflow-map.md and the skills.
// Run: npm run workflows:check   (from design-system/)
import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "src/lib/features/workflows");
const errors = [];
const warn = [];
const fail = msg => errors.push(msg);

// 1. Load the flow data (TypeScript) by bundling it in memory.
const bundled = await build({ entryPoints: [path.join(dir, "flows.ts"), path.join(dir, "flow-overview.ts"), path.join(dir, "skills.ts")], bundle: true, format: "esm", write: false, outdir: "out", platform: "node" });
const load = async name => {
  const file = bundled.outputFiles.find(f => path.basename(f.path) === name);
  return import("data:text/javascript;base64," + Buffer.from(file.text).toString("base64"));
};
const { flows } = await load("flows.js");
const { overviewFlow } = await load("flow-overview.js");
const { skills } = await load("skills.js");
const all = [overviewFlow, ...flows];

// 2. Read workflow-map.md: step codes and the skill named in each row.
const map = fs.readFileSync(path.join(root, "rules/workflow-map.md"), "utf8");
const mapSteps = new Map();
for (const line of map.split("\n")) {
  const m = line.match(/^\| ([SUCFDVH][1-9]) [^|]*\| ([^|]*) \|/);
  if (m) mapSteps.set(m[1], m[2].trim());
}
if (mapSteps.size < 30) fail(`workflow-map.md: expected ~34 step rows with a Skill column, found ${mapSteps.size}`);

// 3. Known skills: project skills + plugin skills (contain ":" ) + artifact-diagramming.
const skillDir = path.resolve(root, "../.agents/skills");
const projectSkills = new Set(fs.readdirSync(skillDir).filter(n => fs.existsSync(path.join(skillDir, n, "SKILL.md"))));
const claudeDir = path.resolve(root, "../.claude/skills");
if (fs.existsSync(claudeDir)) for (const n of fs.readdirSync(claudeDir)) if (fs.existsSync(path.join(claudeDir, n, "SKILL.md"))) projectSkills.add(n);
const isKnownSkill = name => projectSkills.has(name) || name.includes(":") || name === "artifact-diagramming" || name === "artifact-design";
const namesIn = text => text.replace(/\([^)]*\)/g, "").split(/[,;]| และ | or /).map(x => x.trim().split(/\s+/)[0]).filter(x => /^[a-z][a-z0-9:-]+$/.test(x));

// 4. Per-flow checks.
const nums = new Set();
const slugs = new Set();
for (const f of all) {
  const where = `flow ${f.num} (${f.slug})`;
  if (f.slug !== "end-to-end") {
    if (nums.has(f.num)) fail(`${where}: duplicate number`);
    nums.add(f.num);
  }
  if (slugs.has(f.slug)) fail(`${where}: duplicate slug`);
  slugs.add(f.slug);
  const ids = new Set();
  for (const s of f.steps) {
    if (ids.has(s.id)) fail(`${where}: duplicate step id ${s.id}`);
    ids.add(s.id);
    if (s.code && !mapSteps.has(s.code)) fail(`${where}: step code ${s.code} is not in workflow-map.md`);
    if (s.label.length > 46) warn.push(`${where}: label of step ${s.id} is long (${s.label.length} chars) and may not fit the box`);
  }
  for (const b of f.back ?? []) {
    const from = f.steps.find(s => s.id === b.from), to = f.steps.find(s => s.id === b.to);
    if (!from || !to) fail(`${where}: back arrow ${b.from}->${b.to} points to a missing step`);
    else if (from.lane !== to.lane) fail(`${where}: back arrow ${b.from}->${b.to} crosses lanes, so it will not be drawn`);
  }
  for (const k of f.skills ?? []) {
    const name = k.split(" — ")[0];
    for (const n of namesIn(name.replace(/ \+ /g, ", "))) if (!isKnownSkill(n)) fail(`${where}: skill "${n}" is not in .agents/skills or a known plugin`);
  }
  // a Storybook page must exist for every flow
  // the end-to-end diagram is drawn inside the overview page (00-overview.mdx), not on its own page
  const file = f.slug === "end-to-end" ? "00-overview.mdx" : fs.readdirSync(dir).filter(n => n.endsWith(".mdx")).find(n => fs.readFileSync(path.join(dir, n), "utf8").includes(`slug="${f.slug}"`));
  if (!file) fail(`${where}: no .mdx page uses slug "${f.slug}"`);
}

// 5. Skill column in workflow-map.md must only name known skills.
for (const [code, text] of mapSteps) {
  if (text === "—") continue;
  for (const n of namesIn(text)) if (!isKnownSkill(n)) fail(`workflow-map.md ${code}: skill "${n}" is not in .agents/skills or a known plugin`);
}

// 6. Storybook titles: no "/" inside the page name (it would create a sub-folder) and numbers match.
for (const n of fs.readdirSync(dir).filter(x => x.endsWith(".mdx"))) {
  const t = fs.readFileSync(path.join(dir, n), "utf8").match(/<Meta title="([^"]+)"/)?.[1];
  if (!t) { fail(`${n}: no Meta title`); continue; }
  if (t.split("/").length !== 2) fail(`${n}: title "${t}" must be "Workflows/<name>" with no extra "/"`);
}

// 7. Skills page must list exactly the project skills.
const listed = new Set(skills.map(s => s.name));
for (const n of projectSkills) if (!listed.has(n)) fail(`skills page is missing project skill "${n}"`);
for (const n of listed) if (!projectSkills.has(n)) fail(`skills page lists "${n}" but .agents/skills has no such skill`);

for (const w of warn) console.warn("warning:", w);
if (errors.length) {
  console.error(errors.map(e => "✗ " + e).join("\n"));
  process.exit(1);
}
console.log(`Workflows check passed: ${all.length} flows, ${mapSteps.size} map steps, ${projectSkills.size} project skills.`);
