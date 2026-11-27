import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Textarea } from "./textarea";
const meta = {
  title: "Core/Components/Textarea",
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
        code: '<Textarea aria-label="บันทึก" placeholder="เขียนบันทึก" rows={4} />',
        language: "tsx",
      },
    },
  },
  component: Textarea,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Textarea aria-label="บันทึก" placeholder="เขียนบันทึก" rows={4} />
  ),
};

Default.play = async ({ canvas, userEvent }) => {
  const input = canvas.getByRole("textbox");
  await userEvent.type(input, "บันทึกภาษาไทย");
  await expect(input).toHaveValue("บันทึกภาษาไทย");
};

export const Disabled: Story = {
  render: () => (
    <Textarea disabled aria-label="ปิดใช้งาน" defaultValue="ข้อมูลตัวอย่าง" />
  ),
};
export const Invalid: Story = {
  render: () => (
    <div className="grid gap-2">
      <Textarea
        aria-label="ข้อมูลผิดพลาด"
        aria-invalid
        aria-describedby="validation-message"
      />
      <p id="validation-message">กรุณาตรวจสอบข้อมูล</p>
    </div>
  ),
};

/** Figma `textarea`: default radius 8, padding 8/16, min height 96; lg radius 12, padding 12/16, min height 120. */
export const Sizes: Story = {
  render: () => (
    <div className="grid gap-4">
      <Textarea aria-label="default" placeholder="Placeholder" />
      <Textarea aria-label="lg" size="lg" placeholder="Placeholder" />
    </div>
  ),
  play: async ({ canvas }) => {
    const d = canvas.getByLabelText("default");
    const l = canvas.getByLabelText("lg");
    const ds = getComputedStyle(d);
    const ls = getComputedStyle(l);
    await expect([
      d.getBoundingClientRect().height,
      ds.borderTopLeftRadius,
      ds.paddingTop,
      ds.paddingLeft,
    ]).toEqual([96, "8px", "8px", "16px"]);
    await expect([
      l.getBoundingClientRect().height,
      ls.borderTopLeftRadius,
      ls.paddingTop,
    ]).toEqual([120, "12px", "12px"]);
  },
};
