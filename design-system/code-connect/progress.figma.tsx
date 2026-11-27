import figma from "@figma/code-connect";
import { CircularProgress, Progress } from "../src/lib/app/components/ui/progress";
import { CreditBadge } from "../src/lib/products/mira/components/credit-badge";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Progress,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4456-16573",
  {
    props: {
      variant: figma.enum("variant", { "determinate": "determinate", "indeterminate": "indeterminate", "buffer": "buffer" }),
      color: figma.enum("color", { "primary": "primary", "error": "error", "success": "success", "warning": "warning" }),
    },
    example: ({ variant, color }) => (
      <Progress variant={variant} color={color} value={60} />
    ),
  },
);

figma.connect(
  CircularProgress,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4456-16646",
  {
    props: {
      variant: figma.enum("variant", { "indeterminate": "indeterminate", "determinate": "determinate" }),
      size: figma.enum("size", { "sm": "sm", "default": "default", "lg": "lg" }),
      color: figma.enum("color", { "primary": "primary", "error": "error", "success": "success", "warning": "warning" }),
    },
    example: ({ variant, size, color }) => (
      <CircularProgress variant={variant} size={size} color={color} value={60} />
    ),
  },
);

figma.connect(
  CreditBadge,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7089-1151",
  {
    props: {
      size: figma.enum("size", { "default": "default", "sm": "sm" }),
      status: figma.enum("status", { "default": "default", "low": "low", "depleted": "depleted", "loading": "loading" }),
      progressVisible: figma.boolean("progressVisible"),
      valueVisible: figma.boolean("valueVisible"),
    },
    example: ({ size, status, progressVisible, valueVisible }) => (
      <CreditBadge variant="compact" size={size} status={status} progressVisible={progressVisible} valueVisible={valueVisible} />
    ),
  },
);

figma.connect(
  CreditBadge,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7094-365",
  {
    props: {
      variant: figma.enum("variant", { "remaining": "remaining", "used": "used" }),
      status: figma.enum("status", { "default": "default", "low": "low", "depleted": "depleted", "depleted2": "depleted", "depleted 2": "depleted" }),
      progressVisible: figma.boolean("progressVisible"),
      showIcon: figma.boolean("showIcon"),
    },
    example: ({ variant, status, progressVisible, showIcon }) => (
      <CreditBadge variant={variant} status={status} progressVisible={progressVisible} showIcon={showIcon} />
    ),
  },
);
