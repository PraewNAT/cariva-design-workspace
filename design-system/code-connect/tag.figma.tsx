import figma from "@figma/code-connect";
import { Tag, TagColor } from "../src/lib/app/components/ui/tag";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Tag,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4459-31603",
  {
    props: {
      variant: figma.enum("variant", { "filled": "filled", "outlined": "outlined" }),
      color: figma.enum("color", { "default": "default", "secondary": "secondary", "error": "error", "success": "success", "warning": "warning" }),
      size: figma.enum("size", { "default": "default", "lg": "lg", "sm": "sm" }),
      label: figma.string("label"),
    },
    example: ({ variant, color, size, label }) => (
      <Tag variant={variant} color={color} size={size}>{label}</Tag>
    ),
  },
);

figma.connect(
  TagColor,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3936-5879",
  {
    props: {
      color: figma.enum("color", { "orange": "orange", "primary": "primary", "pink": "pink", "purple": "purple", "emerald": "emerald", "amber": "amber", "cyan": "cyan", "sky": "sky" }),
    },
    example: ({ color }) => (
      <TagColor color={color}>Label</TagColor>
    ),
  },
);
