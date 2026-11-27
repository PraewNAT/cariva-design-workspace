# File Upload audit — 26/11/2026

**Component Audit — Cariva Core File Upload**
Overall: implementation/docs done within scope; 8 story interactions pass, but accessibility still has contrast issues that the user chose to keep
Scope: icon/image, 4 item states, local selection, validation, controlled callbacks, page/Dialog, Thai/mobile; excludes real transport and certification of pixel parity of generic SVG icons

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| Medium | Needs fix | error text 4.41:1 and primary demo button 3.5:1 | output/file-upload/story-tests.txt | The user chose to keep the colors; record as open items |
| — | Pass | 8 stories: select/remove/reselect, drop reject type/size, controlled retry, states | output/file-upload/story-tests.txt | Keep regression cases |
| — | Pass | Real keyboard: Enter opens the file chooser, select/remove, and Escape returns focus from the Dialog | output/file-upload/native.json | No further action needed |
| — | Pass | page/Dialog recipe matches: 320×160, padding 16, radius 12, IBM Plex Sans Thai; hover border strong | output/file-upload/native.json | image 320×196; long text can expand |
| — | Pass | Minimum text 12px and no horizontal overflow on the pages checked; long Thai272px | output/file-upload/render.json | Do not claim physical-device coverage |
| — | Pass | Figma docs use the template; 14 linked specimens; no own-text overflow; docs minimum 20px | node4537:147576, template4537:130394 | main API/geometry unchanged |
| — | Pass | build, tokens check and story file coverage 41/41 | project commands; /private/tmp/upload-final-build.txt | Coverage counts files, not every state |
| Low | Could not check | exact SVG icon parity and upload/server security integration | Uses lucide icons; Product owns transport | Do not claim pixel parity/production transport |

Summary: 6 passed, 1 needs fixing (user acknowledged), 1 cannot be checked; story interactions 8/8 is not a full accessibility pass
Next: handle contrast at the source when the team is ready

**Component Reuse & Duplicate Check — Cariva Core File Upload**
Overall: extended the existing FileUpload examples; no duplicate implementation found within the scope checked
Scope: app/patterns.tsx, app/file-upload.tsx, the File Upload stories and shared Button/Progress

| Level | Result | Item | Evidence | Next |
|---|---|---|---|---|
| — | Pass | FileUpload uses the real Button/Progress; patterns.tsx re-exports; no duplicate transport/primitive created | app/file-upload.tsx, app/patterns.tsx | Keep this composition |

Summary: 1 passed, 0 need fixing, 0 cannot be checked
Next: no further action needed

Test infrastructure: restarted the project Storybook/Vitest worker after a stale setup import; dependencies unchanged. Drag tests use native DataTransfer/DragEvent to avoid serialization of the instrumented event helper. Approved disabled semantics were added at the container; contrast rules were not turned off and colors were not adjusted to make results pass.

## Motion follow-up — 26/11/2026

Overall: interaction stories 9/9 pass after adding Upload Animation; the previously open contrast issue remains. Browser computed styles confirm the spinner `spin` 1s and that the indicator transitions width only; complete removes the progress/spinner. Reduced motion was checked from the motion-safe/motion-reduce CSS branches; the real OS setting has not been tested yet. Build passes. Scope is FileUploadItem only; the central Button/Progress are unchanged. No new API or dependency.
