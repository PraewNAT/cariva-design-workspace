# File Upload — Draft 26/11/2026

Source: [Figma](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4457-56068). [Figma docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4537-147576) use Document Template `4537:130394`, Blocks `4537:130684`, and 14 linked visual specimens. Main component API and geometry were not changed.

Implementation: `src/lib/app/components/app/file-upload.tsx`. Existing imports from `app/patterns.tsx` remain valid. Storybook: `Core/Components/File Upload`; all examples and states are grouped there.

## Contract

`FileUpload`: `variant` icon/image; `accept` comma-separated extensions, MIME or MIME wildcard; `maxSize` in bytes (default 10×1024×1024); `multiple` false; `disabled`; `label`, `description`, `error`; `className`. Default types are PNG/JPG/JPEG/PDF. Client checks are convenience validation; server/security validation belongs to Product.

`value` / `defaultValue`: `UploadEntry[]`; `onValueChange` receives the next list. Controlled value requires the consumer to update it. `onFilesSelected` returns accepted `File[]`; `onReject` returns `{file, reason}[]`. Multiple appends; single selection replaces with the first accepted file. Rejected files retain existing entries. File input resets after selection so the same file can be selected again after removal.

`UploadEntry`: `id`, `name`, `size` bytes, `state` idle/uploading/complete/error, optional `progress` (display clamped to 0–100), `error`. `FileUploadItem` is also exported separately. Idle/uploading show remove, error shows retry, complete shows success. `onRemove` notifies after list removal; Product owns request cancellation. `onRetry` is a callback, not a built-in transport. Retry without a callback is disabled. No simulated timer or network upload runs inside the component.

Browse uses a real file input and shared Button; drag/drop uses the same validation. Dropzone declares disabled semantics and ignores incoming selection when disabled. Status announces selected file names or rejection reasons. Long file names truncate with title; helper/error text can wrap.

## Visual rules and agreed differences

Icon dropzone 320×160px, image 320×196px, max-width 100%, radius 12px, gap 8px. User approved **padding 16px in code** to fit content while retaining the target size. Figma main components retain their original 24px; docs explicitly record the difference. Long text grows the surface rather than clipping it. UI font is the active UI role (IBM Plex Sans Thai in checked mode); heading 14/20, helper/item text 12/16. Item width 320/max-width 100%, radius 6px, min-height 56px; uploading adds 3px shared Progress track. Shared Button recipes are retained.

Image variant uses the original visible image fill from `6461:191`, saved locally as `app/assets/file-upload/upload.png` (56px slot). Generic icons use existing lucide dependency; exact vector parity with Figma is not certified. No new shared token or global primitive recipe changed.

Contrast: user chose to keep Figma error text 4.41:1 and the existing primary Dialog demo button 3.5:1 as pending findings. Do not claim full WCAG AA. See FILE-UPLOAD-AUDIT.md for verification and remaining limits.

## Upload motion — 26/11/2026

Uploading only: replaces the file icon with a spinner rotating linear 1s per turn; progress changes width with a 200ms ease-out transition following the real value from Product. prefers-reduced-motion disables the rotation and transition; the text Uploading... and the progress value remain. Complete/error/idle have no spinner. No percentage values are simulated in the production component. The Upload Animation story has a button that changes the simulated data 20→40 and complete for review.

## Renaming sets in Figma (26 Nov 2026, user confirmed as proposed)

| New name | Original name | instance |
|---|---|---|
| `file-upload` | `crv-file-upload` | 5 → 5 |
| `file-upload-image` (= `variant="image"`) | `crv-file-upload (img)` | 5 → 5 |
| `file-upload-item` | `crv-file-upload-item` | 4 → 4 |

Prop `state` already matches the code
