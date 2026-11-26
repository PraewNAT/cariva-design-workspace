import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
const meta = {
  title: "Core/Components/Popover", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Popover><PopoverTrigger render={<Button variant=\"outline\" />}>เปิด Popover</PopoverTrigger><PopoverContent aria-label=\"ข้อมูลเพิ่มเติม\"><h2 className=\"text-base font-medium\">ข้อมูลเพิ่มเติม</h2><p>รายละเอียดของรายการนี้</p></PopoverContent></Popover>", language: "tsx" } } },
  component: Popover
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Popover><PopoverTrigger render={<Button variant="outline" />}>เปิด Popover</PopoverTrigger><PopoverContent aria-label="ข้อมูลเพิ่มเติม"><h2 className="text-base font-medium">ข้อมูลเพิ่มเติม</h2><p>รายละเอียดของรายการนี้</p></PopoverContent></Popover>) };

Default.play = async ({ canvas, userEvent, canvasElement }) => { await userEvent.click(canvas.getByRole("button", { name: "เปิด Popover" })); const body = within(canvasElement.ownerDocument.body); await waitFor(async () => expect(await body.findByRole("dialog")).toBeVisible()); await userEvent.keyboard("{Escape}"); await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument()); };
