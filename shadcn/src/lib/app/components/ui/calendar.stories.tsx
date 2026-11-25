import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "./calendar";
const meta = {
  title: "Core/Components/Calendar", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "(<Calendar mode=\"single\" aria-label=\"วันนัดหมาย\" labels={{ labelDayButton: (date) => `${date.getDate()} ${date.toLocaleDateString(\"th-TH\", { month: \"long\", year: \"numeric\" })}` }} />)", language: "tsx" } } },
  component: Calendar
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Calendar mode="single" aria-label="วันนัดหมาย" labels={{ labelDayButton: (date) => `${date.getDate()} ${date.toLocaleDateString("th-TH", { month: "long", year: "numeric" })}` }} />) };
