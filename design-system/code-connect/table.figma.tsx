import figma from "@figma/code-connect";
import { TableCell, TableHead, TableScrollShadow } from "../src/lib/app/components/ui/table";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  TableCell,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4582-11271",
  {
    example: () => (
      <TableCell>Cell</TableCell>
    ),
  },
);

figma.connect(
  TableHead,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4582-11202",
  {
    props: {
      label: figma.string("label"),
    },
    example: ({ label }) => (
      <TableHead>{label}</TableHead>
    ),
  },
);

figma.connect(
  TableScrollShadow,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4824-674",
  {
    props: {
      side: figma.enum("side", { "left": "left", "right": "right" }),
    },
    example: ({ side }) => (
      <TableScrollShadow side={side} />
    ),
  },
);
