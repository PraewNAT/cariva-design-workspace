import figma from "@figma/code-connect";
import { Step, StepIndicator, Stepper } from "../src/lib/app/components/ui/stepper";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Stepper,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64198",
  {
    props: {
      orientation: figma.enum("orientation", { "horizontal": "horizontal", "vertical": "vertical" }),
    },
    example: ({ orientation }) => (
      <Stepper steps={[{ title: "Step 1" }, { title: "Step 2" }, { title: "Step 3" }]} orientation={orientation} />
    ),
  },
);

figma.connect(
  Step,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64147",
  {
    props: {
      title: figma.string("title"),
      description: figma.string("description"),
    },
    example: ({ title, description }) => (
      <Step title={title} description={description} />
    ),
  },
);

figma.connect(
  StepIndicator,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64136",
  {
    props: {
      number: figma.string("number"),
    },
    example: ({ number }) => (
      <StepIndicator>{number}</StepIndicator>
    ),
  },
);
