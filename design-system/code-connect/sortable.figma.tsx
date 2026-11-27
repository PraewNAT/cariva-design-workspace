import figma from "@figma/code-connect";
import { Sortable, SortableHandle, SortableItem } from "../src/lib/app/components/ui/sortable";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Sortable,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64000",
  {
    props: {
      layout: figma.enum("layout", { "list": "list", "grid": "grid" }),
    },
    example: ({ layout }) => (
      <Sortable items={["a", "b"]} onItemsChange={() => {}} layout={layout}>{null}</Sortable>
    ),
  },
);

figma.connect(
  SortableItem,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-63939",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <SortableItem id="1">{title}</SortableItem>
    ),
  },
);

figma.connect(
  SortableHandle,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-63932",
  {
    props: {
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ disabled }) => (
      <SortableHandle disabled={disabled} />
    ),
  },
);
