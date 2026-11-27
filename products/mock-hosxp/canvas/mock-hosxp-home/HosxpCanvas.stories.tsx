import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
  title: "Products/CarivaSpace HosXP/Canvas/Home",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Board: Story = {
  render: () => <iframe title="HosXP prototype Canvas" src="./canvas/index.html?frames=frames.carivaspace-hosxp" allow="fullscreen" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0 }} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTitle("HosXP prototype Canvas")).toBeVisible();
  },
};
