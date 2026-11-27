import figma from "@figma/code-connect";
import { Button } from "../src/lib/app/components/ui/button";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Button,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3730-5246",
  {
    props: {
      variant: figma.enum("variant", { "default": "default", "outline": "outline", "ghost": "ghost" }),
      color: figma.enum("color", { "primary": "primary", "destructive": "destructive", "secondary": "secondary" }),
      size: figma.enum("size", { "lg": "icon-lg", "default": "icon", "sm": "icon-sm" }),
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ variant, color, size, disabled }) => (
      <Button variant={variant} color={color} size={size} disabled={disabled} aria-label="Action" />
    ),
  },
);

figma.connect(
  Button,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3730-5454",
  {
    props: {
      variant: figma.enum("variant", { "default": "default", "outline": "outline", "ghost": "ghost" }),
      size: figma.enum("size", { "sm": "sm", "default": "default", "lg": "lg" }),
    },
    example: ({ variant, size }) => (
      <Button variant={variant} size={size} loading>
        Loading
      </Button>
    ),
  },
);

figma.connect(
  Button,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4165-5267",
  {
    props: {
      size: figma.enum("size", { "lg": "lg", "default": "default", "sm": "sm" }),
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ size, disabled }) => (
      <Button variant="link" size={size} disabled={disabled}>Link</Button>
    ),
  },
);

figma.connect(
  Button,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=5844-33868",
  {
    props: {
      size: figma.enum("size", { "lg": "lg", "default": "default", "sm": "sm" }),
      disabled: figma.enum("state", { "disabled": true }),
      label: figma.string("children"),
    },
    example: ({ size, disabled, label }) => (
      <Button variant="decorative" size={size} disabled={disabled}>{label}</Button>
    ),
  },
);
