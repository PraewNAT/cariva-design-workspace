import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
const meta = {
  title: "Core/Components/Select",
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
        code: '<Select items={[{ value: "all", label: "ทั้งหมด" }, { value: "liver", label: "ตับ" }]} defaultValue="all"><SelectTrigger aria-label="กลุ่มการตรวจ" className="w-full"><SelectValue /></SelectTrigger><SelectContent aria-label="กลุ่มการตรวจ"><SelectGroup><SelectItem value="all">ทั้งหมด</SelectItem><SelectItem value="liver">ตับ</SelectItem></SelectGroup></SelectContent></Select>',
        language: "tsx",
      },
    },
  },
  component: Select,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Select
      items={[
        { value: "all", label: "ทั้งหมด" },
        { value: "liver", label: "ตับ" },
      ]}
      defaultValue="all"
    >
      <SelectTrigger aria-label="กลุ่มการตรวจ" className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent aria-label="กลุ่มการตรวจ">
        <SelectGroup>
          <SelectItem value="all">ทั้งหมด</SelectItem>
          <SelectItem value="liver">ตับ</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

Default.play = async ({ canvas, userEvent, canvasElement }) => {
  const trigger = canvas.getByRole("combobox");
  await userEvent.click(trigger);
  const body = within(canvasElement.ownerDocument.body);
  await userEvent.click(await body.findByRole("option", { name: "ตับ" }));
  await expect(trigger).toHaveTextContent("ตับ");
  await waitFor(() =>
    expect(body.queryByRole("listbox")).not.toBeInTheDocument()
  );
};

const items = [
  { value: "all", label: "ทั้งหมด" },
  { value: "liver", label: "ตับ" },
];

/** Figma `select` size default = 40, lg = 48; states error and disabled. */
export const FigmaStates: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Select items={items}>
        <SelectTrigger aria-label="ปกติ" className="w-full">
          <SelectValue placeholder="เลือก" />
        </SelectTrigger>
      </Select>
      <Select items={items}>
        <SelectTrigger size="lg" aria-label="ใหญ่" className="w-full">
          <SelectValue placeholder="เลือก" />
        </SelectTrigger>
      </Select>
      <Select items={items}>
        <SelectTrigger aria-label="ผิดพลาด" aria-invalid className="w-full">
          <SelectValue placeholder="เลือก" />
        </SelectTrigger>
      </Select>
      <Select items={items} disabled>
        <SelectTrigger aria-label="ปิดใช้งาน" className="w-full">
          <SelectValue placeholder="เลือก" />
        </SelectTrigger>
      </Select>
      <Field size="lg">
        <FieldLabel>กลุ่มตัวอย่าง</FieldLabel>
        <Select items={items}>
          <SelectTrigger
            aria-label="ในฟิลด์"
            size="lg"
            aria-invalid
            className="w-full"
          >
            <SelectValue placeholder="เลือก" />
          </SelectTrigger>
        </Select>
        <FieldError>กรุณาเลือกกลุ่ม</FieldError>
        <FieldDescription>ข้อความช่วย</FieldDescription>
      </Field>
    </div>
  ),
  play: async ({ canvas }) => {
    const h = (n: string) =>
      Math.round(canvas.getByLabelText(n).getBoundingClientRect().height);
    await expect(h("ปกติ")).toBe(40);
    await expect(h("ใหญ่")).toBe(48);
    await expect(
      getComputedStyle(canvas.getByLabelText("ปกติ")).boxShadow
    ).toContain("226, 232, 240");
    await expect(
      getComputedStyle(canvas.getByLabelText("ผิดพลาด")).boxShadow
    ).toContain("220, 38, 38");
    const dis = getComputedStyle(canvas.getByLabelText("ปิดใช้งาน"));
    await expect(dis.backgroundColor).toBe("rgb(241, 245, 249)");
    await expect(dis.opacity).toBe("1");
    const chevron = canvas
      .getByLabelText("ใหญ่")
      .querySelector("svg") as SVGElement;
    await expect(Math.round(chevron.getBoundingClientRect().width)).toBe(24);
  },
};
