import figma from "@figma/code-connect";
import { Rating } from "../src/lib/app/components/app/rating";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Rating,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4887-7022",
  {
    props: {
      size: figma.enum("size", { "default": "default", "sm": "sm", "lg": "lg" }),
      disabled: figma.enum("disabled", { true: true, false: false }),
    },
    example: ({ size, disabled }) => (
      <Rating size={size} disabled={disabled} />
    ),
  },
);

figma.connect(
  Rating,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4887-6941",
  {
    props: {
      size: figma.enum("size", { "default": "default", "sm": "sm", "lg": "lg" }),
    },
    example: ({ size }) => (
      <Rating size={size} />
    ),
  },
);
