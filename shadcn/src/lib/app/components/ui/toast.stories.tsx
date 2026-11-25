import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Button } from "./button";
import { toast, Toaster } from "./toast";
const meta = {
  title: "Core/Components/Toast", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Toaster><Button onClick={() => toast.add({ title: \"บันทึกแล้ว\", description: \"ข้อความตัวอย่าง\" })}>แสดง Toast</Button></Toaster>", language: "tsx" } } },
  component: Toaster
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Toaster><Button onClick={() => toast.add({ title: "บันทึกแล้ว", description: "ข้อความตัวอย่าง" })}>แสดง Toast</Button></Toaster>) };

Default.play = async ({ canvas, userEvent, canvasElement }) => { await userEvent.click(canvas.getByRole("button", { name: "แสดง Toast" })); await expect(await within(canvasElement.ownerDocument.body).findByText("บันทึกแล้ว")).toBeVisible(); };
