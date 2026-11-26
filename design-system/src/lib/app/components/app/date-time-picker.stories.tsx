import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { DateTimePicker } from "./patterns";
const meta = { title: "Core/Components/Date Time Picker", component: DateTimePicker, tags: ["autodocs"], decorators: [(Story) => <div className="max-w-lg p-6"><Story /></div>] } satisfies Meta<typeof DateTimePicker>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Appointment: Story = {
  render: () => <DateTimePicker />,
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "เลือกวันที่" }));
    await waitFor(() =>
      expect(
        within(canvasElement.ownerDocument.body).getByRole("grid"),
      ).toBeVisible(),
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        within(canvasElement.ownerDocument.body).queryByRole("dialog"),
      ).not.toBeInTheDocument(),
    );
  },
};
