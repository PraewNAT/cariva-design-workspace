import figma from "@figma/code-connect";
import { Tabs, TabsList, TabsTrigger } from "../src/lib/app/components/ui/tabs";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  TabsList,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=6086-59",
  {
    props: {
      size: figma.enum("size", { "default": "default", "sm": "sm" }),
    },
    example: ({ size }) => (
      <Tabs defaultValue="a">
        <TabsList variant="standard" size={size}>
          <TabsTrigger value="a">Tab</TabsTrigger>
          <TabsTrigger value="b">Tab</TabsTrigger>
        </TabsList>
      </Tabs>
    ),
  },
);

figma.connect(
  TabsTrigger,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4724-141435",
  {
    props: {
      label: figma.string("Label text"),
    },
    example: ({ label }) => (
      <TabsTrigger value="a">{label}</TabsTrigger>
    ),
  },
);

figma.connect(
  TabsList,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-4462",
  {
    props: {
      stretch: figma.enum("stretch", { true: true, false: false }),
      tabVariant: figma.enum("tabVariant", { "default": "default", "line": "line" }),
    },
    example: ({ stretch, tabVariant }) => (
      <Tabs defaultValue="a">
        <TabsList variant="pills" stretch={stretch} tabVariant={tabVariant}>
          <TabsTrigger value="a">Tab</TabsTrigger>
          <TabsTrigger value="b">Tab</TabsTrigger>
        </TabsList>
      </Tabs>
    ),
  },
);

figma.connect(
  TabsTrigger,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-4448",
  {
    props: {
      label: figma.string("label"),
    },
    example: ({ label }) => (
      <TabsTrigger value="a">{label}</TabsTrigger>
    ),
  },
);

figma.connect(
  TabsTrigger,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4725-18223",
  {
    example: () => (
      <TabsTrigger value="a">Tab</TabsTrigger>
    ),
  },
);
