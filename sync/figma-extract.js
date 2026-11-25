// Runs inside Figma (figma-console `figma_execute`, Desktop Bridge plugin).
// Replace __CONFIG__ with one entry of sync/components.json before running.
// Read-only: it never changes the document.
//
// Returns one snapshot: for every variant of the component set, the measured
// values of each configured part. Save the result to
// sync/snapshots/figma/<name>.json (see sync/README.md).
const CONFIG = __CONFIG__;

const toHex = (c, a = 1) => {
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return '#' + h(c.r) + h(c.g) + h(c.b) + (a < 0.999 ? h(a) : '');
};
const varCache = {};
const varName = async (id) => {
  if (!id) return null;
  if (!(id in varCache)) {
    const v = await figma.variables.getVariableByIdAsync(id);
    varCache[id] = v ? v.name : null;
  }
  return varCache[id];
};
const solid = async (paints) => {
  if (!Array.isArray(paints)) return [null, null];
  const p = paints.find((x) => x.type === 'SOLID' && x.visible !== false);
  if (!p) return [null, null];
  const a = (p.opacity ?? 1) * (p.color.a ?? 1);
  return [toHex(p.color, a), await varName(p.boundVariables?.color?.id)];
};
const num = (x) => (typeof x === 'number' ? Math.round(x * 100) / 100 : null);

const findPart = (root, sel) => {
  if (sel === '.') return root;
  // Prefer a visible match, so hidden alternates don't win.
  const all = root.findAll((n) => n.name === sel);
  return all.find((n) => n.visible) || all[0] || null;
};

const measure = async (n, part) => {
  if (!n) return { missing: true };
  const o = { vis: n.visible };
  if (!part.text) {
    o.h = num(n.height);
    if (part.width) o.w = num(n.width);
    if ('layoutMode' in n && n.layoutMode !== 'NONE') {
      o.pad = [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft].map(num);
      o.gap = num(n.itemSpacing);
    }
    if ('cornerRadius' in n) o.r = typeof n.cornerRadius === 'number' ? num(n.cornerRadius) : num(n.topLeftRadius);
    o.rVar = await varName(n.boundVariables?.topLeftRadius?.id);
    [o.fill, o.fillVar] = await solid(n.fills);
    [o.stroke, o.strokeVar] = await solid(n.strokes);
    o.sw = o.stroke ? num(typeof n.strokeWeight === 'number' ? n.strokeWeight : n.strokeTopWeight) : 0;
    o.opacity = num(n.opacity);
  } else {
    if (n.type !== 'TEXT') {
      const t = n.findOne((c) => c.type === 'TEXT');
      if (!t) return { missing: true };
      n = t;
    }
    o.fs = num(n.fontSize);
    o.lh = n.lineHeight && n.lineHeight.unit === 'PIXELS' ? num(n.lineHeight.value)
      : n.lineHeight && n.lineHeight.unit === 'PERCENT' ? num((n.lineHeight.value / 100) * n.fontSize) : 'auto';
    o.fw = num(n.fontWeight);
    o.ff = n.fontName && n.fontName.family;
    [o.color, o.colorVar] = await solid(n.fills);
    if (n.textStyleId && typeof n.textStyleId === 'string') {
      const s = await figma.getStyleByIdAsync(n.textStyleId);
      o.style = s ? s.name : null;
    }
    o.text = n.characters.slice(0, 40);
  }
  return o;
};

const extract = async (cfg) => {
  const set = await figma.getNodeByIdAsync(cfg.nodeId);
  if (!set) return { name: cfg.name, nodeId: cfg.nodeId, error: 'node not found' };
  const variants = set.type === 'COMPONENT_SET' ? set.children : [set];
  const skip = cfg.skip || {};
  const rows = [];
  for (const v of variants) {
    const props = v.variantProperties || {};
    if (Object.entries(skip).some(([k, vals]) => vals.includes(props[k]))) continue;
    const parts = {};
    for (const part of cfg.parts) parts[part.key] = await measure(findPart(v, part.figma), part);
    rows.push({ id: v.id, props, parts });
  }
  return {
    name: cfg.name,
    nodeId: cfg.nodeId,
    figmaName: set.name,
    extractedAt: new Date().toISOString(),
    variantsTotal: variants.length,
    variants: rows,
  };
};

// Compact form: one line per variant, so a whole library fits in one result.
//   "variant=contained,size=medium|box:h=40;pad=8,16,8,16;fill=#1789fa|label:fs=16;…"
// `vars` maps each value seen to the Figma variable bound to it.
const compact = (snap, vars) => {
  if (snap.error) return snap;
  const lines = snap.variants.map((row) => {
    const key = Object.entries(row.props).map(([k, v]) => `${k}=${v}`).join(',');
    const parts = Object.entries(row.parts).map(([pk, o]) => {
      if (o.missing) return `${pk}:missing`;
      const kv = [];
      for (const [k, v] of Object.entries(o)) {
        if (k.endsWith('Var') || k === 'text' || k === 'style') continue;
        if (v === null || v === undefined || (k === 'vis' && v) || (k === 'opacity' && v === 1)) continue;
        kv.push(`${k}=${Array.isArray(v) ? v.join(',') : v}`);
      }
      for (const k of ['fill', 'stroke', 'color', 'r']) {
        const name = o[k === 'r' ? 'rVar' : k + 'Var'];
        if (name && o[k] != null) vars[`${k === 'r' ? 'r' : 'c'}:${o[k]}`] = name;
      }
      if (o.style) vars[`ts:${o.fs}/${o.lh}/${o.fw}`] = o.style;
      return `${pk}:${kv.join(';')}`;
    });
    return [key, ...parts].join('|');
  });
  return { name: snap.name, nodeId: snap.nodeId, figmaName: snap.figmaName, variantsTotal: snap.variantsTotal, lines };
};

// CONFIG may be one entry or an array of entries.
const list = Array.isArray(CONFIG) ? CONFIG : [CONFIG];
const vars = {};
const components = [];
for (const cfg of list) components.push(compact(await extract(cfg), vars));
return { extractedAt: new Date().toISOString(), components, vars };
