import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { PrototypePreview } from "./PrototypePreview";
const meta = {
  title: "Workspace/Prototype",
  component: PrototypePreview,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PrototypePreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = { args: { caseId: "catalog" } };
export const Appointment: Story = { args: { caseId: "appointment" }, play: async ({ canvas }) => {
  await expect(canvas.getByRole("main", { name: "วันที่และเวลา" })).toBeVisible();
} };
export const Form: Story = { args: { caseId: "form" } };
