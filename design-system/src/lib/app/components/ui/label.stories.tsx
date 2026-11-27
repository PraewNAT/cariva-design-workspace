import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";
import { Label } from "./label";
const meta = {
  title: "Core/Components/Input/Label", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<div className=\"grid gap-2\"><Label htmlFor=\"label-example\">ชื่อผู้ใช้</Label><Input id=\"label-example\" /></div>", language: "tsx" } } },
  component: Label
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<div className="grid gap-2"><Label htmlFor="label-example">ชื่อผู้ใช้</Label><Input id="label-example" /></div>) };
