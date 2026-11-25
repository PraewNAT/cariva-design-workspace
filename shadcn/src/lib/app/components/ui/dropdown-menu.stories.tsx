import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
const meta = {
  title: "Core/Components/Dropdown Menu", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<DropdownMenu><DropdownMenuTrigger render={<Button variant=\"outline\" />}>ตัวเลือกรายการ</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuGroup><DropdownMenuItem>บันทึกร่าง</DropdownMenuItem><DropdownMenuItem disabled>ส่งรายงาน</DropdownMenuItem></DropdownMenuGroup></DropdownMenuContent></DropdownMenu>", language: "tsx" } } },
  component: DropdownMenu
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<DropdownMenu><DropdownMenuTrigger render={<Button variant="outline" />}>ตัวเลือกรายการ</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuGroup><DropdownMenuItem>บันทึกร่าง</DropdownMenuItem><DropdownMenuItem disabled>ส่งรายงาน</DropdownMenuItem></DropdownMenuGroup></DropdownMenuContent></DropdownMenu>) };

Default.play = async ({ canvas, userEvent, canvasElement }) => { const trigger = canvas.getByRole("button", { name: "ตัวเลือกรายการ" }); await userEvent.click(trigger); const body = within(canvasElement.ownerDocument.body); await waitFor(async () => expect(await body.findByRole("menuitem", { name: "บันทึกร่าง" })).toBeVisible()); await expect(body.getByRole("menuitem", { name: "ส่งรายงาน" })).toHaveAttribute("aria-disabled", "true"); await userEvent.keyboard("{Escape}"); await waitFor(() => expect(body.queryByRole("menu")).not.toBeInTheDocument()); };
