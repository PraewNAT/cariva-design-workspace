import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Toggle } from "./toggle";
const meta = {
  title: "Core/Components/Toggle", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Toggle aria-label=\"เน้นข้อความ\">เน้นข้อความ</Toggle>", language: "tsx" } } },
  component: Toggle
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Toggle aria-label="เน้นข้อความ">เน้นข้อความ</Toggle>) };

Default.play = async ({ canvas, userEvent }) => { const toggle = canvas.getByRole("button", { name: "เน้นข้อความ" }); await expect(toggle).toHaveAttribute("aria-pressed", "false"); await userEvent.click(toggle); await expect(toggle).toHaveAttribute("aria-pressed", "true"); };
