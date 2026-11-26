import figma from "@figma/code-connect";
import { ToggleGroup, ToggleGroupItem } from "../src/lib/app/components/ui/toggle-group";
import { LanguageSwitcher } from "../src/lib/app/components/app/language-switcher";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  ToggleGroupItem,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64425",
  {
    props: {
      label: figma.string("label"),
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ label, disabled }) => (
      <ToggleGroupItem value="a" disabled={disabled}>{label}</ToggleGroupItem>
    ),
  },
);

figma.connect(
  ToggleGroup,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64515",
  {
    props: {
      orientation: figma.enum("orientation", { "horizontal": "horizontal", "vertical": "vertical" }),
      variant: figma.enum("appearance", { "default": "default", "outline": "outline" }),
    },
    example: ({ orientation, variant }) => (
      <ToggleGroup orientation={orientation} variant={variant}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    ),
  },
);

figma.connect(
  ToggleGroup,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=6939-31550",
  {
    props: {
      orientation: figma.enum("orientation", { "horizontal": "horizontal", "vertical": "vertical" }),
      size: figma.enum("size", { "xs": "xs", "sm": "sm", "default": "default", "lg": "lg" }),
    },
    example: ({ orientation, size }) => (
      <ToggleGroup variant="joined" orientation={orientation} size={size}>
        <ToggleGroupItem value="a">One</ToggleGroupItem>
        <ToggleGroupItem value="b">Two</ToggleGroupItem>
      </ToggleGroup>
    ),
  },
);

figma.connect(
  ToggleGroupItem,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=6938-236",
  {
    props: {
      size: figma.enum("size", { "xs": "xs", "sm": "sm", "default": "default", "lg": "lg" }),
      selected: figma.enum("selected", { "true": ["a"], "false": [] }),
      disabled: figma.enum("state", { "disabled": true }),
      label: figma.string("label"),
    },
    example: ({ size, selected, disabled, label }) => (
      <ToggleGroup variant="joined" size={size} defaultValue={selected}>
        <ToggleGroupItem value="a" disabled={disabled}>{label}</ToggleGroupItem>
      </ToggleGroup>
    ),
  },
);

figma.connect(
  LanguageSwitcher,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64498",
  {
    props: {
      disabled: figma.enum("disabled", { true: true, false: false }),
    },
    example: ({ disabled }) => (
      <LanguageSwitcher disabled={disabled} />
    ),
  },
);
