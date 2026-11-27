import figma from "@figma/code-connect";
import { Tooltip, TooltipContent, TooltipTrigger } from "../src/lib/app/components/ui/tooltip";
import { TooltipWithAction } from "../src/lib/app/components/app/tooltip-with-action";
import { MiraCreditTooltip } from "../src/lib/products/mock-mira/components/credit-tooltip";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  Tooltip,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-398",
  {
    variant: {"placement":"top"},
    props: {
      side: figma.enum("placement", { "top": "bottom", "bottom": "top", "left": "right", "right": "left" }),
    },
    example: ({ side }) => (
      <Tooltip>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent side={side}>My Tooltip</TooltipContent>
      </Tooltip>
    ),
  },
);

figma.connect(
  Tooltip,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-398",
  {
    variant: {"placement":"bottom"},
    props: {
      side: figma.enum("placement", { "top": "bottom", "bottom": "top", "left": "right", "right": "left" }),
    },
    example: ({ side }) => (
      <Tooltip>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent side={side}>My Tooltip</TooltipContent>
      </Tooltip>
    ),
  },
);

figma.connect(
  Tooltip,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-398",
  {
    variant: {"placement":"left"},
    props: {
      side: figma.enum("placement", { "top": "bottom", "bottom": "top", "left": "right", "right": "left" }),
    },
    example: ({ side }) => (
      <Tooltip>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent side={side}>My Tooltip</TooltipContent>
      </Tooltip>
    ),
  },
);

figma.connect(
  Tooltip,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-398",
  {
    variant: {"placement":"right"},
    props: {
      side: figma.enum("placement", { "top": "bottom", "bottom": "top", "left": "right", "right": "left" }),
    },
    example: ({ side }) => (
      <Tooltip>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent side={side}>My Tooltip</TooltipContent>
      </Tooltip>
    ),
  },
);

figma.connect(
  Tooltip,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-398",
  {
    variant: {"placement":"none"},
    example: () => (
      <Tooltip>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent showArrow={false}>My Tooltip</TooltipContent>
      </Tooltip>
    ),
  },
);

figma.connect(
  TooltipWithAction,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-3485",
  {
    props: {
      step: figma.string("step"),
      content: figma.string("content"),
      placement: figma.enum("placement", { "bottom-start": "bottom-start", "bottom": "bottom", "bottom-end": "bottom-end", "top": "top", "top-end": "top-end", "top-start": "top-start", "left": "left", "right": "right" }),
    },
    example: ({ step, content, placement }) => (
      <TooltipWithAction trigger={<button>Open</button>} step={step} placement={placement}>{content}</TooltipWithAction>
    ),
  },
);

figma.connect(
  MiraCreditTooltip,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7118-777",
  {
    props: {
      balance: figma.string("balance"),
      validUntil: figma.string("validUntil"),
      costHintVisible: figma.boolean("costHintVisible"),
      status: figma.enum("status", { "default": "default", "depleted": "depleted", "low": "low" }),
      placement: figma.enum("placement", { "top": "top", "top-end": "top-end", "none": "none" }),
    },
    example: ({ balance, validUntil, costHintVisible, status, placement }) => (
      <MiraCreditTooltip trigger={<button>Credit</button>} balance={balance} validUntil={validUntil} costHintVisible={costHintVisible} status={status} placement={placement} />
    ),
  },
);
