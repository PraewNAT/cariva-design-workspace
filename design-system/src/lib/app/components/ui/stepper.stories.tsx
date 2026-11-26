import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Stepper as StepperDemo } from "../app/patterns";
import { StepIndicator, Stepper } from "./stepper";

const STEPS = [
  { title: "Step title", description: "Step description" },
  { title: "Step title", description: "Step description" },
  { title: "Step title", description: "Step description" },
];
const rgb = (e: Element) => getComputedStyle(e).backgroundColor;

const meta = {
  title: "Core/Components/Stepper",
  tags: ["autodocs"],
  component: Stepper,
  args: { steps: STEPS },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive example used on the Catalog page: next / back, vertical and loading toggles. */
export const Steps: Story = {
  render: () => <StepperDemo />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await expect(
      canvas.getByRole("button", { name: "ย้อนกลับ" })
    ).toBeDisabled();
    await userEvent.click(canvas.getByRole("button", { name: "ถัดไป" }));
    await expect(canvas.getByText("ตรวจสอบ").closest("li")).toHaveAttribute(
      "aria-current",
      "step"
    );
    await userEvent.click(canvas.getByRole("button", { name: "แนวตั้ง" }));
    expect(
      canvasElement
        .querySelector('[data-slot="stepper"]')!
        .getAttribute("data-orientation")
    ).toBe("vertical");
    await userEvent.click(canvas.getByRole("button", { name: "กำลังโหลด" }));
    expect(
      canvasElement.querySelector('li[data-state="loading"]')
    ).not.toBeNull();
    await userEvent.click(canvas.getByRole("button", { name: "ถัดไป" }));
    await expect(canvas.getByRole("button", { name: "ถัดไป" })).toBeDisabled();
  },
};

export const Horizontal: Story = {
  args: {
    value: 1,
    steps: [{ title: "Account" }, { title: "Details" }, { title: "Done" }],
  },
  play: async ({ canvasElement }) => {
    const ind = canvasElement.querySelectorAll('[data-slot="step-indicator"]');
    expect((ind[0] as HTMLElement).offsetWidth).toBe(24);
    expect(rgb(ind[0])).toBe("rgb(4, 120, 87)");
    expect(rgb(ind[1])).toBe("rgb(23, 137, 250)");
    expect(rgb(ind[2])).toBe("rgb(238, 249, 255)");
    expect(ind[0].querySelector("svg")).not.toBeNull();
    const items = canvasElement.querySelectorAll("li");
    expect((items[0] as HTMLElement).offsetWidth).toBe(120);
    expect(items[1].getAttribute("aria-current")).toBe("step");
    expect(
      (items[1] as HTMLElement).getBoundingClientRect().left -
        (items[0] as HTMLElement).getBoundingClientRect().left
    ).toBe(200);
    const conn = canvasElement.querySelectorAll('[data-slot="step-connector"]');
    expect([
      (conn[0] as HTMLElement).offsetWidth,
      (conn[0] as HTMLElement).offsetHeight,
    ]).toEqual([168, 2]);
    expect(rgb(conn[0])).toBe("rgb(4, 120, 87)");
    expect(rgb(conn[1])).toBe("rgb(226, 232, 240)");
  },
};

export const Vertical: Story = {
  args: { value: 1, orientation: "vertical" },
  play: async ({ canvasElement }) => {
    expect(
      (canvasElement.querySelector("li") as HTMLElement).offsetHeight
    ).toBe(88);
    const conn = canvasElement.querySelector(
      '[data-slot="step-connector"]'
    ) as HTMLElement;
    expect([conn.offsetWidth, conn.offsetHeight]).toEqual([2, 56]);
  },
};

/** The current step shows a spinner (Figma `loading=true`), in both orientations. */
export const Loading: Story = {
  render: (args) => (
    <div className="flex flex-col gap-10">
      <Stepper {...args} value={1} loading />
      <Stepper {...args} value={1} loading orientation="vertical" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const spinners = canvasElement.querySelectorAll(
      '[data-state="loading"][data-slot="step-indicator"] svg'
    );
    expect(spinners.length).toBe(2);
    expect(rgb(spinners[0].parentElement!)).toBe("rgb(23, 137, 250)");
  },
};

/** Figma `step-indicator` states: inactive, active, complete, loading, disabled. */
export const States: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["inactive", "active", "complete", "loading", "disabled"] as const).map(
        (state) => (
          <StepIndicator key={state} state={state} number={2} />
        )
      )}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const ind = canvasElement.querySelectorAll('[data-slot="step-indicator"]');
    expect(ind.length).toBe(5);
    expect(ind[2].querySelector("svg")).not.toBeNull();
    expect(ind[3].querySelector("svg")).not.toBeNull();
    expect(getComputedStyle(ind[4]).color).toBe("rgb(148, 163, 184)");
  },
};

export const WithDisabledStep: Story = {
  args: {
    value: 0,
    steps: [
      { title: "One" },
      { title: "Two" },
      { title: "Three", disabled: true },
    ],
  },
  play: async ({ canvasElement }) => {
    expect(
      canvasElement.querySelectorAll('li[data-state="disabled"]').length
    ).toBe(1);
  },
};

export const NoLabels: Story = {
  args: { value: 0, labels: false },
  play: async ({ canvasElement }) => {
    expect(
      (canvasElement.querySelector("li") as HTMLElement).offsetHeight
    ).toBe(24);
  },
};
