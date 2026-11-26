import figma from "@figma/code-connect";
import { Badge } from "../src/lib/app/components/ui/badge";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Badge,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4518-82967",
  {
    props: {
      variant: figma.enum("variant", { "dot": "dot", "standard": "standard" }),
      color: figma.enum("color", { "primary": "primary", "error": "error", "success": "success", "warning": "warning", "info": "info", "default": "default" }),
      glow: figma.boolean("glow"),
      content: figma.string("badgeContent"),
    },
    example: ({ variant, color, glow, content }) => (
      <Badge variant={variant} color={color} glow={glow}>{content}</Badge>
    ),
  },
);
