import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./progress";
const meta = {
  title: "Core/Components/Progress", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Progress value={60} aria-label=\"ความคืบหน้า\" />", language: "tsx" } } },
  component: Progress,
    args: { value: 60 }
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Progress value={60} aria-label="ความคืบหน้า" />) };
