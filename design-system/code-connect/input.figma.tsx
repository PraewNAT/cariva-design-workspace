import figma from "@figma/code-connect";
import { Input } from "../src/lib/app/components/ui/input";
import { Textarea } from "../src/lib/app/components/ui/textarea";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Input,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3760-6623",
  {
    props: {
      size: figma.enum("size", { "lg": "lg", "default": "default" }),
      placeholder: figma.string("placeholder"),
      disabled: figma.enum("disabled", { true: true, false: false }),
      error: figma.enum("error", { true: true, false: false }),
    },
    example: ({ size, placeholder, disabled, error }) => (
      <Input size={size} placeholder={placeholder} disabled={disabled} aria-invalid={error} />
    ),
  },
);

figma.connect(
  Input,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3760-6895",
  {
    props: {
      size: figma.enum("size", { "lg": "lg", "default": "default" }),
      placeholder: figma.string("placeholder"),
      disabled: figma.enum("disabled", { true: true, false: false }),
      error: figma.enum("error", { true: true, false: false }),
    },
    example: ({ size, placeholder, disabled, error }) => (
      <Input size={size} placeholder={placeholder} disabled={disabled} aria-invalid={error} />
    ),
  },
);

figma.connect(
  Textarea,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4164-1571",
  {
    props: {
      size: figma.enum("size", { "lg": "lg", "default": "default" }),
      placeholder: figma.string("placeholder"),
      disabled: figma.enum("disabled", { true: true, false: false }),
      error: figma.enum("error", { true: true, false: false }),
    },
    example: ({ size, placeholder, disabled, error }) => (
      <Textarea size={size} placeholder={placeholder} disabled={disabled} aria-invalid={error} />
    ),
  },
);
