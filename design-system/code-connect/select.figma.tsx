import figma from "@figma/code-connect";
import { Select, SelectTrigger, SelectValue } from "../src/lib/app/components/ui/select";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Select,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-3909",
  {
    props: {
      size: figma.enum("size", { "lg": "lg", "default": "default" }),
      placeholder: figma.string("placeholder"),
      disabled: figma.enum("disabled", { true: true, false: false }),
      error: figma.enum("error", { true: true, false: false }),
    },
    example: ({ size, placeholder, disabled, error }) => (
      <Select disabled={disabled}>
        <SelectTrigger size={size} aria-invalid={error}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
    ),
  },
);
