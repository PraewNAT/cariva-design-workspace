import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";
const meta = {
  title: "Core/Components/Badge", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<div className=\"flex flex-wrap gap-3\"><Badge>ใหม่</Badge><Badge variant=\"secondary\">กำลังดำเนินการ</Badge><Badge variant=\"outline\">รอยืนยัน</Badge><Badge variant=\"destructive\">ข้อผิดพลาด</Badge></div>", language: "tsx" } } },
  component: Badge
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<div className="flex flex-wrap gap-3"><Badge>ใหม่</Badge><Badge variant="secondary">กำลังดำเนินการ</Badge><Badge variant="outline">รอยืนยัน</Badge><Badge variant="destructive">ข้อผิดพลาด</Badge></div>) };
