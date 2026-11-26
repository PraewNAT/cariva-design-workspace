import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Input } from "./input";
const meta = {
  title: "Core/Components/Input", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Input aria-label=\"ชื่อผู้ใช้\" placeholder=\"กรอกชื่อผู้ใช้\" />", language: "tsx" } } },
  component: Input
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Input aria-label="ชื่อผู้ใช้" placeholder="กรอกชื่อผู้ใช้" />) };

Default.play = async ({ canvas, userEvent }) => { const input = canvas.getByRole("textbox"); await userEvent.type(input, "ชื่อไทยสำหรับทดสอบ"); await expect(input).toHaveValue("ชื่อไทยสำหรับทดสอบ"); };

export const Disabled: Story = { render: () => <Input disabled aria-label="ปิดใช้งาน" defaultValue="ข้อมูลตัวอย่าง" /> };
export const Invalid: Story = { render: () => <div className="grid gap-2"><Input aria-label="ข้อมูลผิดพลาด" aria-invalid aria-describedby="validation-message" /><p id="validation-message">กรุณาตรวจสอบข้อมูล</p></div> };
