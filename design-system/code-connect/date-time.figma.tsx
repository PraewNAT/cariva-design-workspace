import figma from "@figma/code-connect";
import { DatePicker, TimePicker } from "../src/lib/app/components/app/date-time-pickers";
import { Calendar } from "../src/lib/app/components/ui/calendar";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  DatePicker,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-61101",
  {
    props: {
      mode: figma.enum("state", { "range": "range", "birth": "birth", "default": "single", "open": "single" }),
    },
    example: ({ mode }) => (
      <DatePicker mode={mode} />
    ),
  },
);

figma.connect(
  Calendar,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-61134",
  {
    variant: {"mode":"single"},
    example: () => (
      <Calendar mode="single" />
    ),
  },
);

figma.connect(
  Calendar,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-61134",
  {
    variant: {"mode":"range"},
    example: () => (
      <Calendar mode="range" />
    ),
  },
);

figma.connect(
  Calendar,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-61134",
  {
    variant: {"mode":"birth"},
    example: () => (
      <Calendar mode="single" />
    ),
  },
);

figma.connect(
  Calendar,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-61116",
  {
    example: () => (
      <Calendar mode="single" />
    ),
  },
);

figma.connect(
  TimePicker,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-61359",
  {
    props: {
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ disabled }) => (
      <TimePicker disabled={disabled} />
    ),
  },
);

figma.connect(
  TimePicker,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-61334",
  {
    example: () => (
      <TimePicker />
    ),
  },
);

figma.connect(
  TimePicker,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-61325",
  {
    example: () => (
      <TimePicker />
    ),
  },
);
