import figma from "@figma/code-connect";
import { MiraRecorder } from "../src/lib/products/mock-mira/components/mira-recorder";
import { WorkflowCard } from "../src/lib/products/mock-mira/components/workflow-card";

// Figma file: MIRA Component Library (37MSJL69dK206ouPp4F1xW)
// Set names in that file are `crv-card` (-> WorkflowCard) and `mira-recorder` (-> MiraRecorder).

figma.connect(
  WorkflowCard,
  "https://www.figma.com/design/37MSJL69dK206ouPp4F1xW/MIRA-Component-Library?node-id=0-108",
  {
    props: {
      color: figma.enum("color", {
        blue: "blue",
        emerald: "emerald",
        cyan: "cyan",
        pink: "pink",
        purple: "purple",
      }),
      showBadge: figma.boolean("Badge"),
      title: figma.string("Title"),
      subtitle: figma.string("Subtitle"),
    },
    example: ({ color, showBadge, title, subtitle }) => (
      <WorkflowCard
        color={color}
        showBadge={showBadge}
        title={title}
        subtitle={subtitle}
      />
    ),
  },
);

figma.connect(
  MiraRecorder,
  "https://www.figma.com/design/37MSJL69dK206ouPp4F1xW/MIRA-Component-Library?node-id=101-1374",
  {
    props: {
      state: figma.enum("state", {
        recording: "recording",
        pause: "pause",
        "ready-to-transcribe": "ready-to-transcribe",
        playback: "playback",
      }),
    },
    example: ({ state }) => <MiraRecorder state={state} />,
  },
);

// Do not connect the colour variants of `crv-card` (0:109, 0:115, 0:121, 0:131, 0:141): Figma rejects
// variant nodes. The old mappings on them were replaced by publishing the set with `--force` on
// 27 November 2026, and each variant then showed `WorkflowCard` with its colour (see README.md).
