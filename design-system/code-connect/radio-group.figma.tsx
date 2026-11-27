import figma from "@figma/code-connect";
import { RadioField, RadioGroup, RadioGroupItem } from "../src/lib/app/components/ui/radio-group";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  RadioGroup,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5863",
  {
    props: {
      label: figma.string("label"),
      description: figma.string("description"),
      error: figma.enum("error", { true: true, false: false }),
      disabled: figma.enum("disabled", { true: true, false: false }),
    },
    example: ({ label, description, error, disabled }) => (
      <RadioGroup label={label} description={description} error={error} disabled={disabled}>
        <RadioField value="1" label="Option 1" />
        <RadioField value="2" label="Option 2" />
      </RadioGroup>
    ),
  },
);

figma.connect(
  RadioField,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5910",
  {
    props: {
      label: figma.string("label"),
      description: figma.string("description"),
      variant: figma.enum("variant", { "default": "default", "outlined": "outlined", "groupItem": "groupItem" }),
      disabled: figma.enum("disabled", { true: true, false: false }),
      error: figma.enum("error", { true: true, false: false }),
      labelPlacement: figma.enum("labelPlacement", { "end": "end", "start": "start" }),
    },
    example: ({ label, description, variant, disabled, error, labelPlacement }) => (
      <RadioField value="1" label={label} description={description} variant={variant} disabled={disabled} error={error} labelPlacement={labelPlacement} />
    ),
  },
);

figma.connect(
  RadioGroupItem,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3848-6592",
  {
    props: {
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ disabled }) => (
      <RadioGroupItem value="1" disabled={disabled} />
    ),
  },
);
