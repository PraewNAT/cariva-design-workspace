import type { Meta, StoryObj } from "@storybook/react-vite";
import { Foundations } from "./Foundations";
const meta = {
  title: "Core/Foundations",
  component: Foundations,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Foundations>;
export default meta;
type Story = StoryObj<typeof meta>;
export const AllVariables: Story = {};
