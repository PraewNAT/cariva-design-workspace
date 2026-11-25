import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
const meta = {
  title: "Core/Components/Card", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Card><CardHeader><CardTitle>สรุปการตรวจ</CardTitle><CardDescription>ข้อมูลตัวอย่างในรอบนี้</CardDescription></CardHeader><CardContent>มีรายการรอทบทวน 3 รายการ</CardContent></Card>", language: "tsx" } } },
  component: Card
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Card><CardHeader><CardTitle>สรุปการตรวจ</CardTitle><CardDescription>ข้อมูลตัวอย่างในรอบนี้</CardDescription></CardHeader><CardContent>มีรายการรอทบทวน 3 รายการ</CardContent></Card>) };
