import figma from "@figma/code-connect";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../src/lib/app/components/ui/sheet";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  SheetContent,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-63659",
  {
    props: {
      side: figma.enum("side", { "right": "right", "left": "left", "bottom": "bottom", "top": "top" }),
      title: figma.string("title"),
      description: figma.string("description"),
    },
    example: ({ side, title, description }) => (
      <Sheet>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    ),
  },
);

figma.connect(
  SheetHeader,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4485-31705",
  {
    props: {
      variant: figma.enum("variant", { "search": "search", "default": "default" }),
      showTopColor: figma.boolean("showTopColor"),
    },
    example: ({ variant, showTopColor }) => (
      <SheetHeader variant={variant} showTopColor={showTopColor}>
        <SheetTitle>Title</SheetTitle>
      </SheetHeader>
    ),
  },
);

figma.connect(
  SheetContent,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4485-31742",
  {
    example: () => (
      <Sheet>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    ),
  },
);
