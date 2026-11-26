import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Separator } from "./separator";
const meta = {
  title: "Core/Components/Separator",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-xl p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity.",
      },
      source: {
        code: '<div className="grid gap-4"><p>ข้อมูลทั่วไป</p><Separator /><p>ข้อมูลการตรวจ</p></div>',
        language: "tsx",
      },
    },
  },
  component: Separator,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <div className="grid gap-4">
      <p>ข้อมูลทั่วไป</p>
      <Separator />
      <p>ข้อมูลการตรวจ</p>
    </div>
  ),
};

/** Figma `separator` (was divider-horizontal / divider-vertical): 1px line in `border/default`. */
export const Orientations: Story = {
  render: () => (
    <div className="flex items-start gap-12">
      <div className="w-[220px]">
        <Separator data-case="horizontal" />
      </div>
      <div className="flex h-[220px]">
        <Separator orientation="vertical" data-case="vertical" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const probe = document.createElement("span");
    probe.style.color = "var(--cds-border-default)";
    document.body.append(probe);
    const line = getComputedStyle(probe).color;
    probe.remove();
    const h = canvasElement.querySelector<HTMLElement>(
      '[data-case="horizontal"]'
    )!;
    const v = canvasElement.querySelector<HTMLElement>(
      '[data-case="vertical"]'
    )!;
    await expect([h.offsetWidth, h.offsetHeight]).toEqual([220, 1]);
    await expect([v.offsetWidth, v.offsetHeight]).toEqual([1, 220]);
    await expect(getComputedStyle(h).backgroundColor).toBe(line);
    await expect(getComputedStyle(v).backgroundColor).toBe(line);
  },
};
