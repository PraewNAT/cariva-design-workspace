import figma from "@figma/code-connect";
import { ToastCard } from "../src/lib/app/components/ui/toast";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  ToastCard,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=6413-55828",
  {
    props: {
      severity: figma.enum("severity", { "error": "error", "warning": "warning", "info": "info", "success": "success", "notification": "notification" }),
      variant: figma.enum("variant", { "filled": "filled", "outlined": "outlined", "standard": "standard" }),
      title: figma.string("title"),
      description: figma.string("description"),
      showClose: figma.boolean("showClose"),
    },
    example: ({ severity, variant, title, description, showClose }) => (
      <ToastCard severity={severity} variant={variant} title={title} description={description} showClose={showClose} />
    ),
  },
);
