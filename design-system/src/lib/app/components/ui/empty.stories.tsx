import type { Meta, StoryObj } from "@storybook/react-vite";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "./empty";
const meta = {
  title: "Core/Components/Empty", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Empty><EmptyHeader><EmptyTitle>ยังไม่มีรายการ</EmptyTitle><EmptyDescription>รายการใหม่จะแสดงที่นี่</EmptyDescription></EmptyHeader></Empty>", language: "tsx" } } },
  component: Empty
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Empty><EmptyHeader><EmptyTitle>ยังไม่มีรายการ</EmptyTitle><EmptyDescription>รายการใหม่จะแสดงที่นี่</EmptyDescription></EmptyHeader></Empty>) };
