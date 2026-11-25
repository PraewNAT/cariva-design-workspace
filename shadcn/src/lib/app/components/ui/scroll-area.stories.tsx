import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "./scroll-area";
const meta = {
  title: "Core/Components/Scroll Area", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<ScrollArea className=\"h-48 rounded-lg border p-4\" aria-label=\"รายการทั้งหมด\">{Array.from({ length: 20 }, (_, i) => <p key={i}>รายการที่ {i + 1}</p>)}</ScrollArea>", language: "tsx" } } },
  component: ScrollArea
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<ScrollArea className="h-48 rounded-lg border p-4" aria-label="รายการทั้งหมด">{Array.from({ length: 20 }, (_, i) => <p key={i}>รายการที่ {i + 1}</p>)}</ScrollArea>) };
