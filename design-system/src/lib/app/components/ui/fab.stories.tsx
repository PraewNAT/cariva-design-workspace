import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Fab } from "./fab";

const icon = <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />;

const meta = {
  title: "Core/Components/Fab",
  tags: ["autodocs"],
  component: Fab,
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Fab ตาม Figma `fab` (เดิม crv-fab): size sm 40 / default 56 / lg 64, color primary / secondary, เงาจาก token `--cds-shadow-*` ดู docs/components/FAB-FIGMA.md",
      },
    },
  },
} satisfies Meta<typeof Fab>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Fab aria-label="เพิ่ม">{icon}</Fab>,
  play: async ({ canvas }) => {
    const b = canvas.getByRole("button", { name: "เพิ่ม" });
    const r = b.getBoundingClientRect();
    await expect([Math.round(r.width), Math.round(r.height)]).toEqual([56, 56]);
    const cs = getComputedStyle(b);
    await expect(cs.backgroundColor).toBe("rgb(23, 137, 250)");
    await expect(cs.boxShadow).toContain("30, 58, 138");
  },
};

export const SizesAndColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["primary", "secondary"] as const).map((c) => (
        <div key={c} className="flex items-center gap-6">
          <Fab color={c} size="sm" aria-label={`${c} เล็ก`}>
            {icon}
          </Fab>
          <Fab color={c} aria-label={`${c} กลาง`}>
            {icon}
          </Fab>
          <Fab color={c} size="lg" aria-label={`${c} ใหญ่`}>
            {icon}
          </Fab>
          <Fab color={c} disabled aria-label={`${c} ปิด`}>
            {icon}
          </Fab>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    const size = (n: string) =>
      Math.round(canvas.getByLabelText(n).getBoundingClientRect().width);
    await expect([
      size("primary เล็ก"),
      size("primary กลาง"),
      size("primary ใหญ่"),
    ]).toEqual([40, 56, 64]);
    const icon24 = canvas
      .getByLabelText("primary กลาง")
      .querySelector("svg") as SVGElement;
    await expect(Math.round(icon24.getBoundingClientRect().width)).toBe(24);
    const sec = getComputedStyle(canvas.getByLabelText("secondary กลาง"));
    await expect(sec.backgroundColor).toBe("rgb(255, 255, 255)");
    const dis = getComputedStyle(canvas.getByLabelText("primary ปิด"));
    await expect(dis.backgroundColor).toBe("rgb(241, 245, 249)");
    await expect(dis.boxShadow).not.toContain("30, 58, 138");
  },
};
