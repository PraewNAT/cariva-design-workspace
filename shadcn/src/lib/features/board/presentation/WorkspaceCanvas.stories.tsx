import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Figma-style board of live stories — the repo's `sync/canvas/index.html`,
 * served at `/canvas/`. Frames come from `sync/canvas/frames.shadcn.json`.
 */
function WorkspaceCanvas() {
  return (
    <iframe
      title="Cariva Canvas"
      src="./canvas/index.html?frames=frames.shadcn"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0 }}
    />
  );
}

const meta = {
  title: "Workspace/Canvas",
  component: WorkspaceCanvas,
  parameters: { layout: "fullscreen", docs: { disable: true } },
} satisfies Meta<typeof WorkspaceCanvas>;

export default meta;
export const Board: StoryObj<typeof meta> = {};
