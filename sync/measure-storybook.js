// Runs inside the Storybook preview iframe (http://localhost:6006/iframe.html).
// Needs `node sync/server.mjs` running. Read-only: it only changes story args.
//
// For every Figma variant in sync/snapshots/figma.json it renders the matching
// story with the mapped args, measures the configured DOM parts, and writes
// sync/snapshots/code/<name>.json through the helper server.
// Load and run it from the page (it is an async function body):
//   const src = await (await fetch('http://localhost:6019/script/measure')).text();
//   await new (Object.getPrototypeOf(async function () {}).constructor)('ONLY', src)(['CrvButton']);
// ONLY = array of component names to limit the run, or null for all.
const SYNC = 'http://localhost:6019';

const config = await (await fetch(`${SYNC}/config`)).json();
const figmaSnap = await (await fetch(`${SYNC}/figma`)).json();
const channel = window.__STORYBOOK_ADDONS_CHANNEL__;

// Measure end states, not frames mid-transition (MUI animates colors on change).
if (!document.getElementById('sync-no-motion')) {
  const s = document.createElement('style');
  s.id = 'sync-no-motion';
  s.textContent = '*,*::before,*::after{transition:none!important;animation:none!important}';
  document.head.appendChild(s);
}

const once = (event, ms = 3000) =>
  new Promise((resolve) => {
    const t = setTimeout(() => { channel.off(event, h); resolve(false); }, ms);
    const h = () => { clearTimeout(t); channel.off(event, h); resolve(true); };
    channel.on(event, h);
  });
const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

const toHex = (s, extraAlpha = 1) => {
  const m = s && s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(parseFloat);
  const alpha = a * extraAlpha;
  if (alpha === 0) return null;
  const h = (x) => Math.round(x).toString(16).padStart(2, '0');
  return '#' + h(r) + h(g) + h(b) + (alpha < 0.999 ? h(alpha * 255) : '');
};
const px = (s) => Math.round((parseFloat(s) || 0) * 100) / 100;

// The element that actually paints the text: first descendant with its own text.
const textEl = (el) => {
  const walk = (n) => {
    if ([...n.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) return n;
    for (const c of n.children) { const f = walk(c); if (f) return f; }
    return null;
  };
  return walk(el) || el;
};

const measure = (root, part, props) => {
  const el = root.querySelector(part.dom);
  if (!el) return { missing: true };
  const o = {};
  if (!part.text) {
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    o.h = px(rect.height);
    if (part.width) o.w = px(rect.width);
    o.pad = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map(px);
    o.gap = cs.columnGap === 'normal' ? 0 : px(cs.columnGap);
    o.r = px(cs.borderTopLeftRadius);
    o.fill = toHex(cs.backgroundColor);
    const sEl = part.domStroke ? el.querySelector(part.domStroke) || el : el;
    const ss = getComputedStyle(sEl);
    const sw = ss.borderTopStyle === 'none' ? 0 : px(ss.borderTopWidth);
    o.stroke = sw ? toHex(ss.borderTopColor) : null;
    o.sw = o.stroke ? sw : 0;
    if (cs.opacity !== '1') o.opacity = px(cs.opacity);
  } else {
    const usePlaceholder =
      part.placeholderWhen && Object.entries(part.placeholderWhen).every(([k, v]) => props[k] === v);
    const t = usePlaceholder ? el : textEl(el);
    const cs = usePlaceholder ? getComputedStyle(t, '::placeholder') : getComputedStyle(t);
    o.fs = px(cs.fontSize);
    o.lh = cs.lineHeight === 'normal' ? 'auto' : px(cs.lineHeight);
    o.fw = px(cs.fontWeight);
    o.ff = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    o.color = toHex(cs.color, usePlaceholder ? parseFloat(cs.opacity || '1') : 1);
  }
  return o;
};

const argsFor = (cfg, props) => {
  const args = {};
  for (const [fProp, value] of Object.entries(props)) {
    const map = cfg.propMap[fProp];
    if (map === undefined) continue;
    if (typeof map === 'string') args[map] = value;
    else if (map[value] === undefined) return null; // variant not representable in code
    else Object.assign(args, map[value]);
  }
  return args;
};

const results = [];
for (const cfg of config.components) {
  if (ONLY && !ONLY.includes(cfg.name)) continue;
  const snap = figmaSnap.components[cfg.name];
  if (!snap || !cfg.storyId) { results.push({ name: cfg.name, skipped: 'no figma snapshot or storyId' }); continue; }

  let current = null;
  const rows = [];
  for (const line of snap.lines) {
    const key = line.split('|')[0];
    const props = Object.fromEntries(key.split(',').map((kv) => kv.split('=')));
    const args = argsFor(cfg, props);
    if (!args) { rows.push({ key, unmapped: true }); continue; }
    // A propMap value may name another story (`$story`) when the default
    // story's render ignores that arg (e.g. internal state).
    const storyId = args.$story || cfg.storyId;
    delete args.$story;
    if (storyId !== current) {
      channel.emit('setCurrentStory', { storyId, viewMode: 'story' });
      await once('storyRendered');
      current = storyId;
    }
    channel.emit('resetStoryArgs', { storyId });
    await once('storyRendered', 800);
    if (Object.keys(args).length) {
      channel.emit('updateStoryArgs', { storyId, updatedArgs: args });
      await once('storyRendered', 800);
    }
    await frame();
    const root = document.querySelector('#storybook-root');
    const parts = {};
    for (const part of cfg.parts) parts[part.key] = measure(root, part, props);
    rows.push({ key, story: storyId, args, parts });
  }
  const body = { name: cfg.name, storyId: cfg.storyId, measuredAt: new Date().toISOString(), rows };
  await fetch(`${SYNC}/snapshot/code/${cfg.name}`, { method: 'POST', body: JSON.stringify(body) });
  results.push({ name: cfg.name, rows: rows.length });
}
return results;
