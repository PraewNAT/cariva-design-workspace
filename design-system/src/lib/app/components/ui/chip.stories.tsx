import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Avatar, AvatarFallback } from "./avatar";
import { Chip } from "./chip";

const meta = {
  title: "Core/Components/Chip",
  tags: ["autodocs"],
  component: Chip,
  args: { children: "ชิป" },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Chip ตาม Figma `chip` (เดิม crv-chip-action): variant filled/outlined/surface, color default/primary, size default/sm, thumbnail และ onDelete ยังไม่มีเงาตอน pressed ดู docs/components/CHIP-FIGMA.md",
      },
    },
  },
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Chip>ชิป</Chip>,
  play: async ({ canvasElement }) => {
    const c = canvasElement.querySelector('[data-slot="chip"]') as HTMLElement;
    const r = c.getBoundingClientRect();
    await expect(Math.round(r.height)).toBe(32);
    await expect(getComputedStyle(c).borderTopLeftRadius).not.toBe("0px");
    await expect(getComputedStyle(c).backgroundColor).toBe(
      "rgb(248, 250, 252)"
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["filled", "outlined", "surface"] as const).map((v) => (
        <div key={v} className="flex gap-3">
          <Chip variant={v}>ชิป</Chip>
          <Chip variant={v} color="primary">
            ชิป
          </Chip>
          <Chip variant={v} disabled>
            ชิป
          </Chip>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const chips = canvasElement.querySelectorAll('[data-slot="chip"]');
    await expect(getComputedStyle(chips[1]).backgroundColor).toBe(
      "rgb(23, 137, 250)"
    );
    await expect(getComputedStyle(chips[2]).backgroundColor).toBe(
      "rgb(241, 245, 249)"
    );
    await expect(getComputedStyle(chips[4]).boxShadow).toContain(
      "139, 216, 255"
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Chip>Chip</Chip>
      <Chip size="sm">Chip</Chip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const [a, b] = canvasElement.querySelectorAll('[data-slot="chip"]');
    await expect([
      Math.round(a.getBoundingClientRect().height),
      Math.round(b.getBoundingClientRect().height),
    ]).toEqual([32, 24]);
    await expect(Math.round(a.getBoundingClientRect().width)).toBe(45);
    await expect(Math.round(b.getBoundingClientRect().width)).toBe(41);
  },
};

export const ThumbnailAndDelete: Story = {
  render: () => {
    const onDelete = fn();
    return (
      <Chip
        thumbnail={
          <Avatar size="sm">
            <AvatarFallback>OP</AvatarFallback>
          </Avatar>
        }
        onDelete={onDelete}
      >
        ชิป
      </Chip>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const del = canvas.getByRole("button", { name: "ลบ" });
    const r = del.getBoundingClientRect();
    await expect([Math.round(r.width), Math.round(r.height)]).toEqual([24, 24]);
    await userEvent.click(del);
  },
};

/** Figma: pressed adds shadow/sm (CSS :active, checked by hand); disabled keeps no shadow. */
export const PressedShadow: Story = {
  render: () => (
    <div className="flex gap-3">
      <Chip>Chip</Chip>
      <Chip disabled>Chip</Chip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const [a, b] = canvasElement.querySelectorAll(
      '[data-slot="chip"]'
    ) as NodeListOf<HTMLElement>;
    await expect(getComputedStyle(a).boxShadow).not.toContain("30, 58, 138");
    await expect(getComputedStyle(b).boxShadow).not.toContain("30, 58, 138");
  },
};
