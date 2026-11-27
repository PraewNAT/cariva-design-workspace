import figma from "@figma/code-connect";
import { MiraRecorder } from "../src/lib/products/mira/components/mira-recorder";
import { WorkflowCard } from "../src/lib/products/mira/components/workflow-card";

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

// The file already had per-variant mappings pointing at a non-existent `src/components/ui/WorkflowCard.tsx`;
// connecting each variant node replaces them (a mapping on the set alone does not override child mappings).
const colorNodes = { blue: "0-109", emerald: "0-115", cyan: "0-121", pink: "0-131", purple: "0-141" } as const;
for (const [color, node] of Object.entries(colorNodes)) {
  figma.connect(
    WorkflowCard,
    `https://www.figma.com/design/37MSJL69dK206ouPp4F1xW/MIRA-Component-Library?node-id=${node}`,
    {
      props: {
        showBadge: figma.boolean("Badge"),
        title: figma.string("Title"),
        subtitle: figma.string("Subtitle"),
      },
      example: ({ showBadge, title, subtitle }) => (
        <WorkflowCard
          color={color as "blue"}
          showBadge={showBadge}
          title={title}
          subtitle={subtitle}
        />
      ),
    },
  );
}
