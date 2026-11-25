#!/usr/bin/env node
// Compare the Figma snapshot with the Storybook measurements and write
// sync/report.md + sync/report.json.  No network, no Figma needed:
//
//   node sync/compare.mjs
//
// Differences are grouped (same part, property, Figma value, code value) so a
// size-wide change reads as one line instead of one line per variant.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const config = read('components.json');
const figma = read('snapshots/figma.json');
const vars = figma.vars || {};

const parseLine = (line) => {
  const [key, ...parts] = line.split('|');
  const out = {};
  for (const p of parts) {
    const i = p.indexOf(':');
    const name = p.slice(0, i);
    const body = p.slice(i + 1);
    if (body === 'missing') { out[name] = { missing: true }; continue; }
    const o = {};
    for (const kv of body.split(';').filter(Boolean)) {
      const j = kv.indexOf('=');
      const k = kv.slice(0, j);
      const v = kv.slice(j + 1);
      o[k] = k === 'pad' ? v.split(',').map(Number) : /^-?\d+(\.\d+)?$/.test(v) ? Number(v) : v;
    }
    out[name] = o;
  }
  return [key, out];
};

const NUM = ['h', 'w', 'gap', 'sw', 'fs', 'lh', 'fw', 'opacity'];
const COLOR = ['fill', 'stroke', 'color'];
const close = (a, b) => Math.abs(a - b) < 0.5;
const label = (k, v) => {
  if (v === null || v === undefined) return '—';
  if (COLOR.includes(k)) return vars[`c:${v}`] ? `${v} (${vars[`c:${v}`]})` : v;
  if (k === 'pad') return v.join(' ');
  return String(v);
};

const compareProps = (f, c, ignore = []) => {
  const diffs = [];
  if (f.missing || c.missing) {
    if (f.missing !== c.missing) diffs.push({ prop: 'part', figma: f.missing ? 'missing' : 'present', code: c.missing ? 'missing' : 'present' });
    return diffs;
  }
  const keys = new Set([...Object.keys(f), ...Object.keys(c)]);
  for (const k of keys) {
    if (ignore.includes(k) || k === 'vis' || k === 'r') continue;
    let fv = f[k];
    let cv = c[k];
    if (k === 'opacity') { fv = fv ?? 1; cv = cv ?? 1; }
    if (k === 'sw') { fv = fv ?? 0; cv = cv ?? 0; }
    if (NUM.includes(k)) {
      if (fv === undefined || cv === undefined || fv === 'auto' || cv === 'auto') continue;
      if (!close(fv, cv)) diffs.push({ prop: k, figma: fv, code: cv });
    } else if (COLOR.includes(k)) {
      if ((fv || null) !== (cv || null)) diffs.push({ prop: k, figma: fv || null, code: cv || null });
    } else if (k === 'pad') {
      if (!fv || !cv) continue;
      // A CSS border sits inside the padding box; a Figma inside stroke does not.
      const ok = fv.every((x, i) => close(x, cv[i]) || (c.sw && close(x, cv[i] + c.sw)));
      if (!ok) diffs.push({ prop: k, figma: fv, code: cv });
    } else if (k === 'ff') {
      if (fv && cv && fv !== cv) diffs.push({ prop: k, figma: fv, code: cv });
    }
  }
  // Radius: treat any value >= half the height as a pill on both sides.
  if (f.r !== undefined && c.r !== undefined && !ignore.includes('r')) {
    const pill = (o) => o.h && o.r >= o.h / 2;
    if (!(pill(f) && pill(c)) && !close(f.r, c.r)) diffs.push({ prop: 'r', figma: f.r, code: c.r });
  }
  return diffs;
};

const report = { generatedAt: new Date().toISOString(), figmaExtractedAt: figma.extractedAt, components: [] };
for (const cfg of config.components) {
  const snap = figma.components[cfg.name];
  const codeFile = path.join(ROOT, 'snapshots', 'code', `${cfg.name}.json`);
  if (!snap) { report.components.push({ name: cfg.name, status: 'unchecked', reason: 'no Figma snapshot' }); continue; }
  if (!fs.existsSync(codeFile)) { report.components.push({ name: cfg.name, status: 'unchecked', reason: 'no Storybook measurement' }); continue; }
  const code = JSON.parse(fs.readFileSync(codeFile, 'utf8'));
  const codeRows = Object.fromEntries(code.rows.map((r) => [r.key, r]));
  const ignoreBy = Object.fromEntries(cfg.parts.map((p) => [p.key, p.ignore || []]));

  const groups = new Map();
  const unmapped = [];
  let compared = 0;
  for (const line of snap.lines) {
    const [key, fParts] = parseLine(line);
    const row = codeRows[key];
    if (!row || row.unmapped) { unmapped.push(key); continue; }
    compared++;
    for (const [pk, f] of Object.entries(fParts)) {
      for (const d of compareProps(f, row.parts[pk] || { missing: true }, ignoreBy[pk])) {
        const id = `${pk}.${d.prop}|${JSON.stringify(d.figma)}|${JSON.stringify(d.code)}`;
        if (!groups.has(id)) groups.set(id, { part: pk, ...d, variants: [] });
        groups.get(id).variants.push(key);
      }
    }
  }
  const diffs = [...groups.values()].sort((a, b) => b.variants.length - a.variants.length);
  report.components.push({
    name: cfg.name,
    nodeId: cfg.nodeId,
    source: cfg.source,
    status: compared === 0 ? 'unchecked' : diffs.length ? 'differs' : 'matches',
    variantsCompared: compared,
    variantsTotal: snap.variantsTotal,
    unmapped,
    diffs,
  });
}

// Differences that show up in every compared component are systemic (e.g. font family).
const checked = report.components.filter((c) => c.diffs);
const sig = (d) => `${d.prop}|${JSON.stringify(d.figma)}|${JSON.stringify(d.code)}`;
const systemic = checked.length > 1
  ? [...new Set(checked[0].diffs.map(sig))].filter((s) => checked.every((c) => c.diffs.some((d) => sig(d) === s)))
  : [];
report.systemic = systemic.map((s) => { const [prop, f, c] = s.split('|'); return { prop, figma: JSON.parse(f), code: JSON.parse(c) }; });

fs.writeFileSync(path.join(ROOT, 'report.json'), JSON.stringify(report, null, 2) + '\n');

// ---- Markdown -------------------------------------------------------------
const STATUS = { matches: '✅ ตรงกัน', differs: '⚠️ ต่างกัน', unchecked: '⏸ ยังตรวจไม่ได้' };
const PROP = { h: 'ความสูง', w: 'ความกว้าง', pad: 'padding', gap: 'gap', r: 'radius', fill: 'สีพื้น', stroke: 'สีเส้นขอบ', sw: 'ความหนาเส้นขอบ', fs: 'font size', lh: 'line height', fw: 'font weight', ff: 'font family', color: 'สีตัวอักษร', opacity: 'opacity', part: 'ชิ้นส่วน' };
const short = (key) => key.split(',').filter((kv) => !/=(default|false)$/.test(kv)).map((kv) => kv.split('=')[1]).join(' · ') || 'default';
const lines = [];
lines.push('# Figma ↔ Code drift report', '');
lines.push(`สร้างเมื่อ ${report.generatedAt} · Figma snapshot ${report.figmaExtractedAt}`, '');
lines.push('ค่าที่เทียบ: ความสูง, padding, gap, radius, สีพื้น/เส้นขอบ, ตัวอักษร (size, line height, weight, family, สี) ของ variant ที่ไม่ใช่ hover/pressed/focused', '');
lines.push('| Component | สถานะ | variant ที่เทียบ | จุดต่าง |', '|---|---|---|---|');
for (const c of report.components) {
  lines.push(`| ${c.name} | ${STATUS[c.status]} | ${c.variantsCompared ?? 0}/${c.variantsTotal ?? '?'} | ${c.diffs ? c.diffs.filter((d) => !systemic.includes(sig(d))).length : c.reason} |`);
}
if (report.systemic.length) {
  lines.push('', '## ต่างกันทุก component (น่าจะเป็นเรื่องระดับ theme/token)', '');
  for (const d of report.systemic) lines.push(`- **${PROP[d.prop] || d.prop}**: Figma \`${label(d.prop, d.figma)}\` → code \`${label(d.prop, d.code)}\``);
}
for (const c of report.components) {
  if (!c.diffs) continue;
  const own = c.diffs.filter((d) => !systemic.includes(sig(d)));
  lines.push('', `## ${c.name} — ${STATUS[c.status]}`, '', `Figma node \`${c.nodeId}\` · ต้นฉบับ: ${c.source}`, '');
  if (!own.length) lines.push('ไม่พบจุดต่างนอกจากรายการระดับ theme ด้านบน');
  else {
    lines.push('| ชิ้นส่วน | ค่า | Figma | Code | variant ที่โดน |', '|---|---|---|---|---|');
    for (const d of own) {
      const vs = d.variants.length > 4 ? `${d.variants.length} variants (เช่น ${short(d.variants[0])})` : d.variants.map(short).join(', ');
      lines.push(`| ${d.part} | ${PROP[d.prop] || d.prop} | ${label(d.prop, d.figma)} | ${label(d.prop, d.code)} | ${vs} |`);
    }
  }
  if (c.unmapped.length) lines.push('', `variant ใน Figma ที่ยัง map เข้าโค้ดไม่ได้: ${c.unmapped.map(short).join(', ')}`);
}
fs.writeFileSync(path.join(ROOT, 'report.md'), lines.join('\n') + '\n');
console.log(report.components.map((c) => `${c.name}: ${c.status} (${c.diffs ? c.diffs.length : 0} groups)`).join('\n'));
