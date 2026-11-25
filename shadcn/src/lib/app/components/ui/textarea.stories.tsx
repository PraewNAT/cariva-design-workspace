import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Textarea } from "./textarea";
const meta = {
  title: "Core/Components/Textarea", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Textarea aria-label=\"บันทึก\" placeholder=\"เขียนบันทึก\" rows={4} />", language: "tsx" } } },
  component: Textarea
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Textarea aria-label="บันทึก" placeholder="เขียนบันทึก" rows={4} />) };

Default.play = async ({ canvas, userEvent }) => { const input = canvas.getByRole("textbox"); await userEvent.type(input, "บันทึกภาษาไทย"); await expect(input).toHaveValue("บันทึกภาษาไทย"); };

export const Disabled: Story = { render: () => <Textarea disabled aria-label="ปิดใช้งาน" defaultValue="ข้อมูลตัวอย่าง" /> };
export const Invalid: Story = { render: () => <div className="grid gap-2"><Textarea aria-label="ข้อมูลผิดพลาด" aria-invalid aria-describedby="validation-message" /><p id="validation-message">กรุณาตรวจสอบข้อมูล</p></div> };
