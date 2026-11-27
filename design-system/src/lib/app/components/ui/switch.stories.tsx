import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { SwitchField } from "../app/switch-field";
import { Label } from "./label";
import { Switch } from "./switch";
const meta = {
  title: "Core/Components/Switch",
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
        code: "<Label><Switch defaultChecked />แจ้งเตือน</Label>",
        language: "tsx",
      },
    },
  },
  component: Switch,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Label>
      <Switch defaultChecked />
      แจ้งเตือน
    </Label>
  ),
};

Default.play = async ({ canvas, userEvent }) => {
  const item = canvas.getByRole("switch");
  await expect(item).toBeChecked();
  await userEvent.click(item);
  await expect(item).not.toBeChecked();
};

export const FigmaSwitch: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4" data-testid="row">
        <Switch defaultChecked aria-label="on" />
        <Switch aria-label="off" />
        <Switch size="sm" defaultChecked aria-label="sm-on" />
        <Switch disabled aria-label="dis-off" />
        <Switch disabled defaultChecked aria-label="dis-on" />
      </div>
      <SwitchField
        defaultChecked
        label="Accept terms and conditions"
        description="You agree to our Terms of Service and Privacy Policy."
      />
      <SwitchField
        labelPlacement="start"
        error
        label="Accept terms and conditions"
        description="You agree to our Terms of Service and Privacy Policy."
      />
      <SwitchField disabled label="Accept terms and conditions" />
    </div>
  ),
  play: async ({ canvas }) => {
    const rgb = (el: Element) => getComputedStyle(el).backgroundColor;
    const on = canvas.getByRole("switch", { name: "on" });
    const off = canvas.getByRole("switch", { name: "off" });
    const sm = canvas.getByRole("switch", { name: "sm-on" });
    expect([on.offsetWidth, on.offsetHeight]).toEqual([44, 24]);
    expect([sm.offsetWidth, sm.offsetHeight]).toEqual([36, 20]);
    const thumb = on.querySelector('[data-slot="switch-thumb"]') as HTMLElement;
    expect([thumb.offsetWidth, thumb.offsetHeight]).toEqual([20, 20]);
    expect(
      thumb.getBoundingClientRect().left - on.getBoundingClientRect().left
    ).toBe(22);
    expect(rgb(thumb)).toBe("rgb(255, 255, 255)");
    expect(rgb(on)).toBe("rgb(23, 137, 250)");
    expect(rgb(off)).toBe("rgb(226, 232, 240)");
    expect(rgb(canvas.getByRole("switch", { name: "dis-off" }))).toBe(
      "rgb(241, 245, 249)"
    );
    const labels = canvas.getAllByText("Accept terms and conditions");
    expect(getComputedStyle(labels[1]).color).toBe("rgb(220, 38, 38)");
    expect(getComputedStyle(labels[2]).color).toBe("rgb(148, 163, 184)");
    const field = canvas
      .getAllByText("You agree to our Terms of Service and Privacy Policy.", {
        selector: "p",
      })[0]
      .closest('[data-slot="switch-field"]') as HTMLElement;
    expect(getComputedStyle(field).columnGap).toBe("16px");
  },
};
