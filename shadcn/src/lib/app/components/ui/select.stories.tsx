import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";
const meta = {
  title: "Core/Components/Select", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Select items={[{ value: \"all\", label: \"ทั้งหมด\" }, { value: \"liver\", label: \"ตับ\" }]} defaultValue=\"all\"><SelectTrigger aria-label=\"กลุ่มการตรวจ\" className=\"w-full\"><SelectValue /></SelectTrigger><SelectContent aria-label=\"กลุ่มการตรวจ\"><SelectGroup><SelectItem value=\"all\">ทั้งหมด</SelectItem><SelectItem value=\"liver\">ตับ</SelectItem></SelectGroup></SelectContent></Select>", language: "tsx" } } },
  component: Select
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Select items={[{ value: "all", label: "ทั้งหมด" }, { value: "liver", label: "ตับ" }]} defaultValue="all"><SelectTrigger aria-label="กลุ่มการตรวจ" className="w-full"><SelectValue /></SelectTrigger><SelectContent aria-label="กลุ่มการตรวจ"><SelectGroup><SelectItem value="all">ทั้งหมด</SelectItem><SelectItem value="liver">ตับ</SelectItem></SelectGroup></SelectContent></Select>) };

Default.play = async ({ canvas, userEvent, canvasElement }) => { const trigger = canvas.getByRole("combobox"); await userEvent.click(trigger); const body = within(canvasElement.ownerDocument.body); await userEvent.click(await body.findByRole("option", { name: "ตับ" })); await expect(trigger).toHaveTextContent("ตับ"); await waitFor(() => expect(body.queryByRole("listbox")).not.toBeInTheDocument()); };
