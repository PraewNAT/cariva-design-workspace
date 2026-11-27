# Prototype workspace — 2026-11-27

**Component Reuse Check — Workspace tooling**
Overall: reuses the existing board and DS examples; no duplicate Product UI created
Scope: sync/canvas, WorkspaceCanvas, CoreCatalog, CatalogAppointment, CatalogForm and the Vite entry

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | A single renderer in Vite and Storybook | PrototypePreview.tsx + App.tsx + PrototypePreview.stories.tsx | Add Product screens to the registry when real work arrives |
| — | Pass | Tooling is separate from Core | features/prototype and features/board; no Core imports back into tooling | No Core changes needed |

Summary: 2 pass, 0 need fixes, 0 unverifiable in this scope
Next: add real Product cases when requirements arrive

**Component Audit — Workspace tooling**
Overall: the feature is ready to use; outstanding items remain in the existing DS examples, plus a native fullscreen limitation
Scope: Canvas/Preview, standalone localhost, keyboard, URL reload, 320px frame; not an audit of every Core component

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | contrast 3.5:1 and label-content-name-mismatch in the reused examples | /tmp/cariva-prototype-test.txt; catalog/appointment stories | Fix in Core as a separate task; shared behavior not changed this round |
| — | Could not check | native fullscreen succeeds | the browser rejected requestFullscreen; a notice and a link are shown instead | Test in a browser that allows it; new-tab preview checked and passes |
| — | Pass | mode switch, selection, link and mobile | 5 stories pass; Board play switches/selects cases, Mobile play measures 320px; browser measured preview top 125.19 > toolbar bottom 113.19 | No further fixes needed |
| — | Pass | standalone and popup | opened the real link from Canvas to localhost:5173/?case=appointment; keyboard/Escape returns focus to the date trigger | No further fixes needed |
| — | Pass | build and docs | npm run build passes (bundle-size warning); STORYBOOK-ORGANIZATION.md and the create-project skill | No new dependencies |

Summary: 3 pass, 1 needs fixes, 1 unverifiable; interaction stories pass 5/5 but this does not claim that a11y passes for all the examples
Next: review the outstanding Core items separately from the workspace feature

Limitations: the direct Canvas URL keeps mode/case, but a Storybook shell reload starts from the story's URL; the state of each frame/host is not synced. Static Storybook still references the localhost prototype and server 5173 must be started separately when using the full-page button. The current examples are the DS catalog/form/date-time, not a newly designed Product prototype
