import figma from "@figma/code-connect";
import { CardHorizontal, CardVertical, CardProfile, CardMetric } from "../src/lib/app/components/app/content-card";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  CardHorizontal,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4570-20745",
  {
    props: {
      imagePosition: figma.enum("imagePosition", { "absolute": "absolute", "right": "right", "left": "left" }),
    },
    example: ({ imagePosition }) => (
      <CardHorizontal imagePosition={imagePosition} title="Header" description="Description" />
    ),
  },
);

figma.connect(
  CardVertical,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4657-31022",
  {
    example: () => (
      <CardVertical title="Header" description="Description" />
    ),
  },
);

figma.connect(
  CardProfile,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=6550-55333",
  {
    props: {
      name: figma.string("name"),
      identifier: figma.string("identifier"),
    },
    example: ({ name, identifier }) => (
      <CardProfile name={name} identifier={identifier} />
    ),
  },
);

figma.connect(
  CardMetric,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=6557-330",
  {
    props: {
      label: figma.string("label"),
      unit: figma.string("unit"),
      value: figma.string("value"),
      status: figma.enum("status", { "normal": "normal", "abnormal": "abnormal" }),
    },
    example: ({ label, unit, value, status }) => (
      <CardMetric label={label} unit={unit} value={value} status={status} />
    ),
  },
);
