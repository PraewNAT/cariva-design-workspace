import figma from "@figma/code-connect";
import { Chip } from "../src/lib/app/components/ui/chip";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Chip,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4459-62796",
  {
    props: {
      size: figma.enum("size", { "default": "default", "sm": "sm" }),
      variant: figma.enum("variant", { "filled": "filled", "outlined": "outlined", "surface": "surface" }),
      color: figma.enum("color", { "default": "default", "primary": "primary" }),
      disabled: figma.enum("state", { "disabled": true }),
      label: figma.string("label"),
    },
    example: ({ size, variant, color, disabled, label }) => (
      <Chip size={size} variant={variant} color={color} disabled={disabled}>{label}</Chip>
    ),
  },
);
