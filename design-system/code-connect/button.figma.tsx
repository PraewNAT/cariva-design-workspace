import figma from "@figma/code-connect";
import { Button } from "../src/lib/app/components/ui/button";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Button,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3646-28000",
  {
    props: {
      variant: figma.enum("variant", { "elevated": "elevated", "default": "default", "outline": "outline", "ghost": "ghost" }),
      color: figma.enum("color", { "primary": "primary", "destructive": "destructive", "secondary": "secondary" }),
      size: figma.enum("size", { "default": "default", "lg": "lg", "sm": "sm" }),
      disabled: figma.enum("state", { "disabled": true }),
      label: figma.string("children"),
    },
    example: ({ variant, color, size, disabled, label }) => (
      <Button variant={variant} color={color} size={size} disabled={disabled}>
        {label}
      </Button>
    ),
  },
);
