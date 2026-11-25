import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
const meta = {
  title: "Core/Components/Tooltip", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Tooltip><TooltipTrigger render={<Button variant=\"outline\" />}>ข้อมูลช่วยเหลือ</TooltipTrigger><TooltipContent>แสดงรายละเอียดเพิ่มเติม</TooltipContent></Tooltip>", language: "tsx" } } },
  component: Tooltip
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Tooltip><TooltipTrigger render={<Button variant="outline" />}>ข้อมูลช่วยเหลือ</TooltipTrigger><TooltipContent>แสดงรายละเอียดเพิ่มเติม</TooltipContent></Tooltip>) };
