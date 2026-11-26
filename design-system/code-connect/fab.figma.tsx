import figma from "@figma/code-connect";
import { Fab } from "../src/lib/app/components/ui/fab";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Fab,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4497-77574",
  {
    props: {
      size: figma.enum("size", { "sm": "sm", "default": "default", "lg": "lg" }),
      color: figma.enum("color", { "primary": "primary", "secondary": "secondary" }),
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ size, color, disabled }) => (
      <Fab size={size} color={color} disabled={disabled} aria-label="Add" />
    ),
  },
);
