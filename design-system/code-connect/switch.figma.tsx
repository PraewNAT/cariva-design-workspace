import figma from "@figma/code-connect";
import { Switch } from "../src/lib/app/components/ui/switch";
import { SwitchField } from "../src/lib/app/components/app/switch-field";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  SwitchField,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-1672",
  {
    props: {
      label: figma.string("label"),
      description: figma.string("description"),
      disabled: figma.enum("disabled", { true: true, false: false }),
      error: figma.enum("error", { true: true, false: false }),
      labelPlacement: figma.enum("labelPlacement", { "end": "end", "start": "start" }),
    },
    example: ({ label, description, disabled, error, labelPlacement }) => (
      <SwitchField label={label} description={description} disabled={disabled} error={error} labelPlacement={labelPlacement} />
    ),
  },
);

figma.connect(
  Switch,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-1752",
  {
    props: {
      checked: figma.enum("checked", { true: true, false: false }),
      size: figma.enum("size", { "default": "default", "sm": "sm" }),
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ checked, size, disabled }) => (
      <Switch checked={checked} size={size} disabled={disabled} />
    ),
  },
);
