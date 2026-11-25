import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { DateTimePicker, FileUpload, Rating, Stepper } from "./patterns";
const meta = {
  title: "Core/Composed patterns",
  component: Stepper,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-lg p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Steps: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole("button", { name: "ย้อนกลับ" })).toBeDisabled();
    await userEvent.click(canvas.getByRole("button", { name: "ถัดไป" }));
    await expect(canvas.getByText("2 ตรวจสอบ").closest("li")).toHaveAttribute(
      "aria-current",
      "step",
    );
    await userEvent.click(canvas.getByRole("button", { name: "ถัดไป" }));
    await expect(canvas.getByRole("button", { name: "ถัดไป" })).toBeDisabled();
  },
};
export const Score: Story = {
  render: () => <Rating />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "5 ดาว" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("5 จาก 5");
  },
};
export const LocalFile: Story = {
  render: () => <FileUpload />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.upload(
      canvas.getByLabelText("เลือกไฟล์เอกสาร"),
      new File(["mock"], "demo.csv", { type: "text/csv" }),
    );
    await expect(canvas.getByRole("status")).toHaveTextContent("demo.csv");
    await userEvent.click(canvas.getByRole("button", { name: "ล้างไฟล์" }));
    await expect(canvas.getByRole("status")).not.toHaveTextContent("demo.csv");
  },
};
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

export const MultipleRatings: Story = {
  render: () => <div className="grid gap-8"><Rating /><Rating /></div>,
  play: async ({ canvas, userEvent }) => {
    const groups = canvas.getAllByRole("radiogroup", { name: "ให้คะแนนประสบการณ์" });
    await expect(groups).toHaveLength(2);
    await expect(groups[0].getAttribute("aria-labelledby")).not.toBe(groups[1].getAttribute("aria-labelledby"));
    await userEvent.click(within(groups[0]).getByRole("radio", { name: "5 ดาว" }));
    await expect(within(groups[0]).getByRole("radio", { name: "5 ดาว" })).toBeChecked();
    await expect(within(groups[1]).getByRole("radio", { name: "3 ดาว" })).toBeChecked();
    await userEvent.click(within(groups[1]).getByRole("radio", { name: "1 ดาว" }));
    await expect(within(groups[0]).getByRole("radio", { name: "5 ดาว" })).toBeChecked();
  },
};
