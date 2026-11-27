import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";
const meta = {
  title: "Core/Components/Skeleton", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<div className=\"grid gap-3\" role=\"status\" aria-label=\"กำลังโหลด\"><Skeleton className=\"h-6 w-48\" /><Skeleton className=\"h-4 w-64\" /><Skeleton className=\"h-4 w-56\" /></div>", language: "tsx" } } },
  component: Skeleton
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<div className="grid gap-3" role="status" aria-label="กำลังโหลด"><Skeleton className="h-6 w-48" /><Skeleton className="h-4 w-64" /><Skeleton className="h-4 w-56" /></div>) };
