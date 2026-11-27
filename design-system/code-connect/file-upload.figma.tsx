import figma from "@figma/code-connect";
import { FileUpload, FileUploadItem } from "../src/lib/app/components/app/file-upload";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  FileUpload,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4457-56094",
  {
    example: () => (
      <FileUpload variant="icon" />
    ),
  },
);

figma.connect(
  FileUpload,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=6461-126",
  {
    example: () => (
      <FileUpload variant="image" />
    ),
  },
);

figma.connect(
  FileUploadItem,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4457-56129",
  {
    props: {
      state: figma.enum("state", { "idle": "idle", "uploading": "uploading", "complete": "complete", "error": "error" }),
    },
    example: ({ state }) => (
      <FileUploadItem item={{ id: "1", name: "file.pdf", size: 1024, state }} />
    ),
  },
);
