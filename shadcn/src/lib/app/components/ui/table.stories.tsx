import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table";
const meta = {
  title: "Core/Components/Table", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Table><TableCaption>รายการตรวจตัวอย่าง</TableCaption><TableHeader><TableRow><TableHead>รหัส</TableHead><TableHead>ชื่อ</TableHead><TableHead>สถานะ</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>LAB-001</TableCell><TableCell>ธนภัทร วัฒนกุล</TableCell><TableCell>รอทบทวน</TableCell></TableRow></TableBody></Table>", language: "tsx" } } },
  component: Table
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Table><TableCaption>รายการตรวจตัวอย่าง</TableCaption><TableHeader><TableRow><TableHead>รหัส</TableHead><TableHead>ชื่อ</TableHead><TableHead>สถานะ</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>LAB-001</TableCell><TableCell>ธนภัทร วัฒนกุล</TableCell><TableCell>รอทบทวน</TableCell></TableRow></TableBody></Table>) };
