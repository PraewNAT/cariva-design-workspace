import figma from "@figma/code-connect";
import { Combobox, ComboboxInput } from "../src/lib/app/components/ui/combobox";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Combobox,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4454-12745",
  {
    props: {
      size: figma.enum("size", { "default": "default", "lg": "lg" }),
      placeholder: figma.string("placeholder"),
      disabled: figma.enum("disabled", { true: true, false: false }),
      error: figma.enum("error", { true: true, false: false }),
    },
    example: ({ size, placeholder, disabled, error }) => (
      <Combobox items={[]}>
        <ComboboxInput placeholder={placeholder} size={size} disabled={disabled} aria-invalid={error} />
      </Combobox>
    ),
  },
);
