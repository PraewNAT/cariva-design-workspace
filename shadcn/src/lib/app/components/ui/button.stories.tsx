import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";
import { DownloadRounded } from "../app/icons";
import { Button } from "./button";
import { Spinner } from "./spinner";
const meta = {
  title: "Core/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "บันทึก" },
  parameters: {
    docs: {
      description: {
        component:
          "shadcn Base UI Button / Core recipe เดียวกันบนหน้าและ Dialog ขนาด default คือ medium 16/24 + padding 8/16 = 40px ไม่กำหนด height ใช้ existing size/variant API; loading ใช้ disabled + Spinner",
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { onClick: fn() },
  play: async ({ canvas, userEvent, args }) => {
    const b = canvas.getByRole("button");
    b.focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          "default",
          "outline",
          "secondary",
          "ghost",
          "destructive",
          "link",
          "decorative",
        ] as const
      ).map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button>Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon-sm" aria-label="ดาวน์โหลดขนาดเล็ก">
        <DownloadRounded />
      </Button>
      <Button size="icon" aria-label="ดาวน์โหลดขนาดกลาง">
        <DownloadRounded />
      </Button>
      <Button size="icon-lg" aria-label="ดาวน์โหลดขนาดใหญ่">
        <DownloadRounded />
      </Button>
    </div>
  ),
  play: async ({ canvas }) => {
    for (const [name, height] of [
      ["Small", 32],
      ["Medium", 40],
      ["Large", 48],
      ["ดาวน์โหลดขนาดเล็ก", 32],
      ["ดาวน์โหลดขนาดกลาง", 40],
      ["ดาวน์โหลดขนาดใหญ่", 48],
    ] as const)
      await waitFor(() =>
        expect(
          canvas.getByRole("button", { name }).getBoundingClientRect().height,
        ).toBe(height),
      );
  },
};
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <DownloadRounded />
        ดาวน์โหลดบันทึก
      </>
    ),
  },
  play: async ({ canvas }) => {
    const b = canvas.getByRole("button");
    await expect(getComputedStyle(b.querySelector("svg")!).color).toBe(
      getComputedStyle(b).color,
    );
  },
};
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button")).toBeDisabled();
  },
};
export const Loading: Story = {
  args: {
    disabled: true,
    "aria-busy": true,
    children: (
      <>
        <Spinner />
        กำลังบันทึก
      </>
    ),
  },
};
export const LongThai: Story = {
  args: { children: "บันทึกรายละเอียดผลการตรวจสุขภาพสำหรับผู้รับบริการ" },
  globals: { viewport: { value: "mobile390", isRotated: false } },
  render: (args) => (
    <div className="max-w-full">
      <Button {...args} className="max-w-full whitespace-normal break-words" />
    </div>
  ),
};
export const BackOffice: Story = {
  decorators: [
    (Story) => (
      <div data-product="backOffice">
        <Story />
      </div>
    ),
  ],
};
