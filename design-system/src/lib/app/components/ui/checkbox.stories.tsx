import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import {
  CheckboxCard,
  CheckboxField,
  CheckboxGroup,
} from "../app/checkbox-patterns";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Core/Components/Checkbox",
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
          "Checkbox ตาม Figma `checkbox`: เช็กถูก, indeterminate, error (aria-invalid), disabled; รวม Field, Group และ Card ไว้ที่นี่. ดู docs/components/CHECKBOX-FIGMA.md",
      },
    },
  },
  component: Checkbox,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Label>
      <Checkbox defaultChecked />
      ยอมรับเงื่อนไข
    </Label>
  ),
};

Default.play = async ({ canvas, userEvent }) => {
  const item = canvas.getByRole("checkbox");
  await expect(item).toBeChecked();
  await userEvent.click(item);
  await expect(item).not.toBeChecked();
};

export const States: Story = {
  render: () => (
    <div className="flex gap-4">
      <Checkbox aria-label="ว่าง" />
      <Checkbox aria-label="เลือก" defaultChecked />
      <Checkbox aria-label="บางส่วน" indeterminate />
      <Checkbox aria-label="ผิดพลาด" error />
      <Checkbox aria-label="ปิดใช้งาน" disabled />
      <Checkbox aria-label="ปิดใช้งานและเลือก" disabled defaultChecked />
    </div>
  ),
  play: async ({ canvas }) => {
    const bg = (n: string) =>
      getComputedStyle(canvas.getByLabelText(n)).backgroundColor;
    const ring = (n: string) =>
      getComputedStyle(canvas.getByLabelText(n)).boxShadow;
    await expect(bg("เลือก")).toBe("rgb(23, 137, 250)");
    await expect(bg("บางส่วน")).toBe("rgb(23, 137, 250)");
    await expect(canvas.getByLabelText("บางส่วน")).toHaveAttribute(
      "aria-checked",
      "mixed"
    );
    await expect(ring("ผิดพลาด")).toContain("239, 68, 68");
    await expect(bg("ปิดใช้งาน")).toBe("rgb(241, 245, 249)");
    await expect(bg("ปิดใช้งานและเลือก")).toBe("rgb(241, 245, 249)");
    await expect(
      getComputedStyle(canvas.getByLabelText("ปิดใช้งาน")).opacity
    ).toBe("1");
  },
};

const text = {
  label: "ยอมรับเงื่อนไข",
  description: "คุณยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว",
};

export const Field: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <CheckboxField {...text} defaultChecked />
      <CheckboxField {...text} labelPlacement="start" />
      <CheckboxField {...text} error />
      <CheckboxField {...text} disabled />
    </div>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const boxes = canvasElement.querySelectorAll('[data-slot="checkbox"]');
    for (const b of boxes) {
      const r = b.getBoundingClientRect();
      await expect([Math.round(r.width), Math.round(r.height)]).toEqual([
        16, 16,
      ]);
      await expect(getComputedStyle(b).borderTopLeftRadius).toBe("4px");
    }
    await expect(getComputedStyle(boxes[0]).backgroundColor).toBe(
      "rgb(23, 137, 250)"
    );
    await userEvent.click(boxes[1] as HTMLElement);
    await expect(boxes[1]).toBeChecked();
    await expect(getComputedStyle(boxes[3]).backgroundColor).toBe(
      "rgb(241, 245, 249)"
    );
  },
};

export const Group: Story = {
  render: () => (
    <CheckboxGroup label="แถบด้านข้าง" description="เลือกรายการที่ต้องการแสดง">
      <CheckboxField label="ล่าสุด" defaultChecked />
      <CheckboxField label="หน้าแรก" />
      <CheckboxField label="แอปพลิเคชัน" />
    </CheckboxGroup>
  ),
  play: async ({ canvasElement }) => {
    await expect(
      canvasElement.querySelectorAll('[data-slot="checkbox"]').length
    ).toBe(3);
  },
};

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <CheckboxCard {...text} />
      <CheckboxCard {...text} defaultChecked />
      <CheckboxCard {...text} error />
      <CheckboxCard {...text} disabled />
    </div>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const cards = canvasElement.querySelectorAll('[data-slot="checkbox-card"]');
    const r = cards[0].getBoundingClientRect();
    await expect(Math.round(r.width)).toBe(409);
    await expect(getComputedStyle(cards[1]).backgroundColor).toBe(
      "rgb(238, 249, 255)"
    );
    await userEvent.click(cards[0] as HTMLElement);
    await expect(
      cards[0].querySelector('[data-slot="checkbox"]')
    ).toBeChecked();
  },
};
