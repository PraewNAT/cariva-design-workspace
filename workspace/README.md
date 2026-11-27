# Workspace tooling

[Canvas](canvas/) is tooling that the DS Storybook serves at /canvas/, not a production Core dependency; sync/canvas is a compatibility link

[PrototypeShell](presentation/PrototypeShell.tsx) uses the real Core Sidebar/Buttons and the registry in [prototypes.json](prototypes.json), shared by every prototype; it has a rail and Cmd/Ctrl + Backslash to hide everything

The DS mock examples and the Workspace/Canvas and Workspace/Prototype groups were removed at the user's request on 27 November 2026. The Canvas for real work lives under Product, e.g. CarivaSpace HosXP; track the list at the [prototype index](../products/README.md)

### Canvas Pages

`workspace/canvas/index.html` supports feature/flow Pages through optional catalog `pages: [{ id, title, view: { x, y, zoom } }]` and frame `page` IDs. The Page selector filters the board; frame titles select the case for Preview and full-page links; Fit and + Frame operate only on the active Page. Selection is encoded in `page`, `case`, and `mode` URL parameters. Per-Page pan/zoom and frame selection are retained during a visit; screen demo state resets when the Page remounts. Catalogs without Pages remain a single `ทุกโฟลว` (All flows) Page. Storybook viewing does not save source edits; the existing sync-server save path is unchanged. Page creation/renaming remains a catalog edit, not an implemented editor UI.

Canvas chrome: `ซ่อนแผงควบคุม` (Hide control panel) or Cmd/Ctrl + Backslash hides/restores toolbar, frame tools and hints. No floating control remains; Preview fills the screen while hidden. The shortcut is bound in same-origin screen iframes as well as the board document. Cross-origin embeds retain their browser isolation.
