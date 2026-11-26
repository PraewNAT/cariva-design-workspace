import figma from "@figma/code-connect";
import { Separator } from "../src/lib/app/components/ui/separator";
import { ScrollArea } from "../src/lib/app/components/ui/scroll-area";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Separator,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7308-121838",
  {
    props: {
      orientation: figma.enum("orientation", { "horizontal": "horizontal", "vertical": "vertical" }),
    },
    example: ({ orientation }) => (
      <Separator orientation={orientation} />
    ),
  },
);

figma.connect(
  ScrollArea,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4164-476",
  {
    props: {
      orientation: figma.enum("orientation", { "vertical": "vertical", "horizontal": "horizontal" }),
      track: figma.enum("track", { true: true, false: false }),
    },
    example: ({ orientation, track }) => (
      <ScrollArea orientation={orientation} track={track} className="h-48 w-48">
        <div className="p-4">Content</div>
      </ScrollArea>
    ),
  },
);
