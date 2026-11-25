import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator";
const meta = {
  title: "Core/Components/Separator", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<div className=\"grid gap-4\"><p>ข้อมูลทั่วไป</p><Separator /><p>ข้อมูลการตรวจ</p></div>", language: "tsx" } } },
  component: Separator
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<div className="grid gap-4"><p>ข้อมูลทั่วไป</p><Separator /><p>ข้อมูลการตรวจ</p></div>) };
