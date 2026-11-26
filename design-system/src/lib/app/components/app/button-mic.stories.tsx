import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";
import { ButtonMic } from "./button-mic";

const label = "Default - MacBook Pro Microphone (Built-in)";
const meta = {
  title: "Core/Components/Button Mic",
  component: ButtonMic,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Figma `button-mic`: 200×32 microphone picker. variant wave | dot, status active | inactive (Figma deactive). Caller supplies the device name and the status; no audio logic. See BUTTON-MIC-FIGMA.md.",
      },
    },
  },
  args: { label },
} satisfies Meta<typeof ButtonMic>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: label });
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

export const VariantsAndStatus: Story = {
  render: (args) => (
    <div className="grid gap-4">
      {(["wave", "dot"] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-4">
          <ButtonMic {...args} variant={variant} status="active" />
          <ButtonMic {...args} variant={variant} status="inactive" />
        </div>
      ))}
    </div>
  ),
};

export const FigmaSpecs: Story = {
  render: (args) => (
    <div className="grid gap-4">
      <ButtonMic {...args} variant="wave" status="active" />
      <ButtonMic {...args} variant="wave" status="inactive" />
      <ButtonMic {...args} variant="dot" status="active" />
      <ButtonMic {...args} variant="dot" status="inactive" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const items = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('[data-slot="button-mic"]')
    );
    await expect(items).toHaveLength(4);
    for (const item of items) {
      const cs = getComputedStyle(item);
      await expect([item.offsetWidth, item.offsetHeight]).toEqual([200, 32]);
      await expect(cs.paddingTop).toBe("8px");
      await expect(cs.columnGap).toBe("4px");
      await expect(cs.borderRadius).toBe("12px");
      await expect([
        cs.fontSize,
        cs.lineHeight,
        cs.fontWeight,
        cs.color,
      ]).toEqual(["12px", "16px", "500", "rgb(51, 65, 85)"]);
    }
    const bars = (el: HTMLElement) =>
      Array.from(
        el.querySelectorAll<HTMLElement>('[data-slot="button-mic-wave"] > span')
      );
    await expect(bars(items[0]).map((b) => b.offsetHeight)).toEqual([
      8, 12, 16, 12, 8,
    ]);
    await expect(bars(items[0]).map((b) => b.offsetWidth)).toEqual([
      4, 4, 4, 4, 4,
    ]);
    await expect(getComputedStyle(bars(items[0])[0]).backgroundColor).toBe(
      "rgb(74, 222, 128)"
    );
    await expect(bars(items[1]).map((b) => b.offsetHeight)).toEqual([
      8, 8, 8, 8, 8,
    ]);
    await expect(getComputedStyle(bars(items[1])[0]).backgroundColor).toBe(
      "rgb(220, 38, 38)"
    );
    const wave = items[0].querySelector<HTMLElement>(
      '[data-slot="button-mic-wave"]'
    )!;
    await expect([wave.offsetWidth, wave.offsetHeight]).toEqual([28, 16]);
    const dot = items[2].querySelector<HTMLElement>(
      '[data-slot="button-mic-dot"]'
    )!;
    await expect([dot.offsetWidth, dot.offsetHeight]).toEqual([16, 16]);
    await expect((dot.firstElementChild as HTMLElement).offsetWidth).toBe(8);
    await expect(getComputedStyle(dot.firstElementChild!).backgroundColor).toBe(
      "rgb(74, 222, 128)"
    );
    await expect(
      getComputedStyle(
        (items[3].querySelector('[data-slot="button-mic-dot"]') as HTMLElement)
          .firstElementChild!
      ).backgroundColor
    ).toBe("rgb(220, 38, 38)");
  },
};
