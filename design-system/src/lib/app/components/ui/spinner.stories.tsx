import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./spinner";
const meta = {
  title: "Core/Components/Spinner", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<div role=\"status\" className=\"flex items-center gap-3\"><Spinner /><span>กำลังโหลด</span></div>", language: "tsx" } } },
  component: Spinner
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<div role="status" className="flex items-center gap-3"><Spinner /><span>กำลังโหลด</span></div>) };
