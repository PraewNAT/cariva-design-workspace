import figma from "@figma/code-connect";
import { ButtonSplit } from "../src/lib/app/components/ui/button-split";
import { ButtonMic } from "../src/lib/app/components/app/button-mic";
import { DropdownMenuItem } from "../src/lib/app/components/ui/dropdown-menu";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  ButtonSplit,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=5981-34184",
  {
    props: {
      color: figma.enum("color", { "primary": "primary", "destructive": "destructive" }),
      size: figma.enum("size", { "lg": "lg", "default": "default", "sm": "sm" }),
      disabled: figma.enum("state", { "disabled": true }),
      label: figma.string("children"),
    },
    example: ({ color, size, disabled, label }) => (
      <ButtonSplit color={color} size={size} disabled={disabled} menu={<DropdownMenuItem>Menu item</DropdownMenuItem>}>
        {label}
      </ButtonSplit>
    ),
  },
);

figma.connect(
  ButtonMic,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=5862-33778",
  {
    props: {
      variant: figma.enum("variant", { "wave": "wave", "dot": "dot" }),
      status: figma.enum("status", { "active": "active", "inactive": "inactive" }),
    },
    example: ({ variant, status }) => (
      <ButtonMic variant={variant} status={status} label="Default - MacBook Pro Microphone (Built-in)" />
    ),
  },
);
