import figma from "@figma/code-connect";
import { CheckboxCard, CheckboxField, CheckboxGroup } from "../src/lib/app/components/app/checkbox-patterns";
import { Checkbox } from "../src/lib/app/components/ui/checkbox";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  CheckboxField,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5291",
  {
    props: {
      label: figma.string("label"),
      description: figma.string("description"),
      disabled: figma.enum("disabled", { true: true, false: false }),
      error: figma.enum("error", { true: true, false: false }),
      labelPlacement: figma.enum("labelPlacement", { "end": "end", "start": "start" }),
    },
    example: ({ label, description, disabled, error, labelPlacement }) => (
      <CheckboxField label={label} description={description} disabled={disabled} error={error} labelPlacement={labelPlacement} />
    ),
  },
);

figma.connect(
  CheckboxGroup,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5374",
  {
    props: {
      label: figma.string("label"),
      description: figma.string("description"),
      error: figma.enum("error", { true: true, false: false }),
      disabled: figma.enum("disabled", { true: true, false: false }),
    },
    example: ({ label, description, error, disabled }) => (
      <CheckboxGroup label={label} description={description} error={error} disabled={disabled}>
        <CheckboxField label="Option" />
      </CheckboxGroup>
    ),
  },
);

figma.connect(
  Checkbox,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5417",
  {
    props: {
      checked: figma.enum("checked", { true: true, false: false }),
      indeterminate: figma.enum("indeterminate", { true: true, false: false }),
      disabled: figma.enum("state", { "disabled": true }),
      error: figma.enum("error", { true: true, false: false }),
    },
    example: ({ checked, indeterminate, disabled, error }) => (
      <Checkbox checked={checked} indeterminate={indeterminate} disabled={disabled} error={error} />
    ),
  },
);

figma.connect(
  CheckboxCard,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=6697-362",
  {
    props: {
      label: figma.string("label"),
      description: figma.string("description"),
      checked: figma.enum("checked", { true: true, false: false }),
      disabled: figma.enum("state", { "disabled": true }),
      error: figma.enum("error", { true: true, false: false }),
    },
    example: ({ label, description, checked, disabled, error }) => (
      <CheckboxCard label={label} description={description} checked={checked} disabled={disabled} error={error} />
    ),
  },
);
