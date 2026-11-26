import figma from "@figma/code-connect";
import { BreadcrumbLink, BreadcrumbPage, BreadcrumbEllipsis } from "../src/lib/app/components/ui/breadcrumb";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  BreadcrumbLink,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-5059",
  {
    variant: {"type":"link"},
    props: {
      text: figma.string("text"),
    },
    example: ({ text }) => (
      <BreadcrumbLink href="#">{text}</BreadcrumbLink>
    ),
  },
);

figma.connect(
  BreadcrumbLink,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-5059",
  {
    variant: {"type":"hover"},
    props: {
      text: figma.string("text"),
    },
    example: ({ text }) => (
      <BreadcrumbLink href="#">{text}</BreadcrumbLink>
    ),
  },
);

figma.connect(
  BreadcrumbLink,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-5059",
  {
    variant: {"type":"dropdown"},
    props: {
      text: figma.string("text"),
    },
    example: ({ text }) => (
      <BreadcrumbLink href="#">{text}</BreadcrumbLink>
    ),
  },
);

figma.connect(
  BreadcrumbPage,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-5059",
  {
    variant: {"type":"page"},
    props: {
      text: figma.string("text"),
    },
    example: ({ text }) => (
      <BreadcrumbPage>{text}</BreadcrumbPage>
    ),
  },
);

figma.connect(
  BreadcrumbEllipsis,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-5059",
  {
    variant: {"type":"ellipsis"},
    example: () => (
      <BreadcrumbEllipsis />
    ),
  },
);
