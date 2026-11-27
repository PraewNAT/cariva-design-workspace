import figma from "@figma/code-connect";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../src/lib/app/components/ui/dialog";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Dialog,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4712-1805",
  {
    props: {
      align: figma.enum("align", { "start": "start", "center": "center" }),
    },
    example: ({ align }) => (
      <Dialog>
        <DialogContent>
          <DialogHeader align={align}>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  },
);
