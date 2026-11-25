import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "./button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
const meta = {
  title: "Core/Components/Sheet", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Sheet><SheetTrigger render={<Button variant=\"outline\" />}>เปิด Sheet</SheetTrigger><SheetContent><SheetHeader><SheetTitle>รายละเอียดรายการ</SheetTitle><SheetDescription>ข้อมูลตัวอย่าง</SheetDescription></SheetHeader></SheetContent></Sheet>", language: "tsx" } } },
  component: Sheet
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Sheet><SheetTrigger render={<Button variant="outline" />}>เปิด Sheet</SheetTrigger><SheetContent><SheetHeader><SheetTitle>รายละเอียดรายการ</SheetTitle><SheetDescription>ข้อมูลตัวอย่าง</SheetDescription></SheetHeader></SheetContent></Sheet>) };

Default.play = async ({ canvas, userEvent, canvasElement }) => { await userEvent.click(canvas.getByRole("button", { name: "เปิด Sheet" })); const body = within(canvasElement.ownerDocument.body); await waitFor(async () => expect(await body.findByRole("dialog")).toBeVisible()); await userEvent.keyboard("{Escape}"); await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument()); };
