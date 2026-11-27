import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./slider";
const meta = {
  title: "Core/Components/Slider", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Slider defaultValue={[50]} aria-label=\"ระดับ\" />", language: "tsx" } } },
  component: Slider
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Slider defaultValue={[50]} aria-label="ระดับ" />) };
