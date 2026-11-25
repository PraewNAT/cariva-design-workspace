// Visual regression fingerprint for every Storybook story — run in the
// preview iframe (iframe.html). It renders each story, records the computed
// styles of every element on the page, and keeps one fingerprint per story on
// `window.__regress[label]`. Compare two labels to prove a refactor changed no
// styles:
//
//   const src = await (await fetch('http://localhost:6019/script/regress')).text();
//   new Function('LABEL', 'FILTER', src)('before', '');   // runs in background
//   window.__regress.before.done                           // poll until true
//
// Class names, attributes and text are ignored on purpose: a refactor may
// rename emotion classes or add data-* attributes without changing the look.
(async () => {
  const PROPS = [
    'display', 'position', 'width', 'height', 'min-height',
    'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'gap',
    'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
    'border-top-color', 'border-top-style', 'border-top-left-radius', 'border-bottom-right-radius',
    'background-color', 'background-image', 'color', 'opacity', 'box-shadow',
    'font-size', 'line-height', 'font-weight', 'font-family', 'text-transform',
    'flex-direction', 'align-items', 'justify-content', 'overflow-x', 'overflow-y', 'visibility',
  ];
  const style = document.createElement('style');
  style.textContent = '*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}';
  document.head.appendChild(style);

  const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
  const index = await (await fetch('/index.json')).json();
  const ids = Object.values(index.entries)
    .filter((e) => e.type === 'story' && (!FILTER || e.id.startsWith(FILTER)))
    .map((e) => e.id);

  const out = (window.__regress = window.__regress || {})[LABEL] = { done: false, total: ids.length, stories: {} };
  const hash = (s) => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  // setTimeout, not rAF: rAF never fires while the preview pane is hidden.
  const frame = () => new Promise((r) => setTimeout(r, 16));
  const render = (id) => new Promise((resolve) => {
    const done = (ok) => { channel.off('storyRendered', onOk); channel.off('storyErrored', onErr); channel.off('storyThrewException', onErr); clearTimeout(t); resolve(ok); };
    const onOk = () => done(true);
    const onErr = () => done(false);
    const t = setTimeout(() => done(false), 5000);
    channel.on('storyRendered', onOk); channel.on('storyErrored', onErr); channel.on('storyThrewException', onErr);
    channel.emit('setCurrentStory', { storyId: id, viewMode: 'story' });
  });

  for (const id of ids) {
    const ok = await render(id);
    await frame(); await frame();
    await new Promise((r) => setTimeout(r, 60));
    const rows = [];
    for (const el of document.body.querySelectorAll('*')) {
      if (['SCRIPT', 'STYLE', 'LINK', 'META'].includes(el.tagName)) continue;
      if (el.closest('.sb-wrapper, .sb-errordisplay, .sb-nopreview, .sb-preparing-story, .sb-preparing-docs')) continue;
      const cs = getComputedStyle(el);
      rows.push(el.tagName + '{' + PROPS.map((p) => cs.getPropertyValue(p)).join(';') + '}');
    }
    out.stories[id] = { ok, n: rows.length, h: hash(rows.join('\n')) };
    out.rows = out.rows || {};
    if (FILTER) out.rows[id] = rows; // keep full rows only for a targeted re-run
  }
  out.done = true;
})();
