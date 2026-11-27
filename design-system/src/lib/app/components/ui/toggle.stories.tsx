import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Toggle } from "./toggle";
const meta = {
  title: "Core/Components/Toggle",
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
        code: '<Toggle aria-label="เน้นข้อความ">เน้นข้อความ</Toggle>',
        language: "tsx",
      },
    },
  },
  component: Toggle,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => <Toggle aria-label="เน้นข้อความ">เน้นข้อความ</Toggle>,
};

Default.play = async ({ canvas, userEvent }) => {
  const toggle = canvas.getByRole("button", { name: "เน้นข้อความ" });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await userEvent.click(toggle);
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
};

const rgb = (e: Element) => getComputedStyle(e).backgroundColor;

/** Figma `toggle-group-item`: pill 32 high, padding 4/12, min width 64, label 14/20 Regular. */
export const Geometry: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle aria-label="a">Label</Toggle>
      <Toggle aria-label="b" variant="outline">
        Label
      </Toggle>
    </div>
  ),
  play: async ({ canvas }) => {
    const t = canvas.getByRole("button", { name: "a" });
    expect([t.offsetHeight, t.offsetWidth]).toEqual([32, 64]);
    const cs = getComputedStyle(t);
    expect([
      cs.paddingLeft,
      cs.paddingTop,
      cs.fontSize,
      cs.lineHeight,
      cs.fontWeight,
      cs.columnGap,
    ]).toEqual(["12px", "4px", "14px", "20px", "400", "8px"]);
    expect(cs.borderRadius).toMatch(/9999|3.35544e\+07/);
  },
};

/** Figma `appearance` default and outline, each unselected, selected and disabled. */
export const Appearances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["default", "outline"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <Toggle variant={variant} aria-label={`${variant}-off`}>
            Label
          </Toggle>
          <Toggle variant={variant} defaultPressed aria-label={`${variant}-on`}>
            Label
          </Toggle>
          <Toggle variant={variant} disabled aria-label={`${variant}-dis`}>
            Label
          </Toggle>
          <Toggle
            variant={variant}
            disabled
            defaultPressed
            aria-label={`${variant}-dis-on`}
          >
            Label
          </Toggle>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    const b = (n: string) => canvas.getByRole("button", { name: n });
    expect(rgb(b("default-off"))).toBe("rgba(0, 0, 0, 0)");
    expect(rgb(b("default-on"))).toBe("rgb(238, 249, 255)");
    expect(getComputedStyle(b("default-dis")).color).toBe("rgb(148, 163, 184)");
    expect(rgb(b("default-dis-on"))).toBe("rgb(238, 249, 255)");
    expect(getComputedStyle(b("outline-off")).boxShadow).toContain(
      "226, 232, 240"
    );
    expect(rgb(b("outline-on"))).toBe("rgb(238, 249, 255)");
    expect(getComputedStyle(b("default-off")).boxShadow).not.toContain(
      "226, 232, 240"
    );
  },
};
