import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "./button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
const meta = {
  title: "Core/Components/Dialog", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Dialog><DialogTrigger render={<Button />}>เปิด Dialog</DialogTrigger><DialogContent><DialogHeader><DialogTitle>ยืนยันการเปลี่ยนแปลง?</DialogTitle><DialogDescription>คุณสามารถกลับมาแก้ไขภายหลังได้</DialogDescription></DialogHeader><DialogFooter><DialogClose render={<Button variant=\"outline\" />}>ยกเลิก</DialogClose><DialogClose render={<Button />}>ยืนยัน</DialogClose></DialogFooter></DialogContent></Dialog>", language: "tsx" } } },
  component: Dialog
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Dialog><DialogTrigger render={<Button />}>เปิด Dialog</DialogTrigger><DialogContent><DialogHeader><DialogTitle>ยืนยันการเปลี่ยนแปลง?</DialogTitle><DialogDescription>คุณสามารถกลับมาแก้ไขภายหลังได้</DialogDescription></DialogHeader><DialogFooter><DialogClose render={<Button variant="outline" />}>ยกเลิก</DialogClose><DialogClose render={<Button />}>ยืนยัน</DialogClose></DialogFooter></DialogContent></Dialog>) };

Default.play = async ({ canvas, userEvent, canvasElement }) => { const trigger = canvas.getByRole("button", { name: "เปิด Dialog" }); trigger.focus(); await userEvent.keyboard("{Enter}"); const body = within(canvasElement.ownerDocument.body); const dialog = await body.findByRole("dialog"); await userEvent.click(within(dialog).getByRole("button", { name: "ยกเลิก" })); await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument()); await waitFor(() => expect(trigger).toHaveFocus()); };
