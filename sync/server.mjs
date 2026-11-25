#!/usr/bin/env node
// Local helper for the Figma ↔ code drift check (sync/README.md).
// Serves the config and snapshots to the Storybook page and Figma plugin
// that take the measurements, and writes what they send back to disk, so
// large snapshots never have to pass through the chat.
//
//   node sync/server.mjs            → http://localhost:6019
//
// GET  /config                 → sync/components.json
// GET  /script/regress         → regress-storybook.js (all-story style fingerprint)
// GET  /canvas                 → Figma-style frame canvas (sync/canvas/index.html)
// GET/POST /canvas/frames?name=  → frame layout (sync/canvas/<name>.json, default frames)
// GET  /snapshot/:side/:name   → sync/snapshots/:side/:name.json
// POST /snapshot/:side/:name   → writes sync/snapshots/:side/:name.json
// side = figma | code
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.SYNC_PORT || 6019);
const SAFE = /^[A-Za-z0-9_-]+$/;

const send = (res, status, body, type = 'application/json') => {
  res.writeHead(status, {
    'Content-Type': type,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
};

http
  .createServer((req, res) => {
    if (req.method === 'OPTIONS') return send(res, 204, '');
    const parts = req.url.split('?')[0].split('/').filter(Boolean);

    if (req.method === 'GET' && parts[0] === 'ping') return send(res, 200, { ok: true });
    if (req.method === 'GET' && parts[0] === 'config') {
      return send(res, 200, fs.readFileSync(path.join(ROOT, 'components.json'), 'utf8'));
    }
    if (req.method === 'GET' && parts[0] === 'script' && parts[1] === 'measure') {
      return send(res, 200, fs.readFileSync(path.join(ROOT, 'measure-storybook.js'), 'utf8'), 'text/javascript');
    }
    if (req.method === 'GET' && parts[0] === 'script' && parts[1] === 'regress') {
      return send(res, 200, fs.readFileSync(path.join(ROOT, 'regress-storybook.js'), 'utf8'), 'text/javascript');
    }
    if (parts[0] === 'canvas') {
      const name = (new URL(req.url, 'http://x').searchParams.get('name') || 'frames').replace(/[^A-Za-z0-9_.-]/g, '');
      const frames = path.join(ROOT, 'canvas', `${name}.json`);
      if (req.method === 'GET' && !parts[1]) {
        return send(res, 200, fs.readFileSync(path.join(ROOT, 'canvas', 'index.html'), 'utf8'), 'text/html; charset=utf-8');
      }
      if (parts[1] === 'frames' && req.method === 'GET') return send(res, 200, fs.readFileSync(frames, 'utf8'));
      if (parts[1] === 'frames' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            fs.writeFileSync(frames, JSON.stringify(JSON.parse(body), null, 2) + '\n');
            send(res, 200, { ok: true });
          } catch (e) {
            send(res, 400, { error: String(e) });
          }
        });
        return;
      }
    }
    if (req.method === 'GET' && parts[0] === 'figma') {
      return send(res, 200, fs.readFileSync(path.join(ROOT, 'snapshots', 'figma.json'), 'utf8'));
    }

    if (parts[0] === 'snapshot' && ['figma', 'code'].includes(parts[1]) && SAFE.test(parts[2] || '')) {
      const dir = path.join(ROOT, 'snapshots', parts[1]);
      const file = path.join(dir, `${parts[2]}.json`);
      if (req.method === 'GET') {
        if (!fs.existsSync(file)) return send(res, 404, { error: 'not found' });
        return send(res, 200, fs.readFileSync(file, 'utf8'));
      }
      if (req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const json = JSON.parse(body);
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n');
            send(res, 200, { ok: true, file: path.relative(ROOT, file) });
          } catch (e) {
            send(res, 400, { error: String(e) });
          }
        });
        return;
      }
    }
    send(res, 404, { error: 'unknown route' });
  })
  .listen(PORT, () => console.log(`sync server on http://localhost:${PORT}`));
