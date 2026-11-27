import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "./button";
import { Field, FieldDescription } from "./field";
import { Input } from "./input";
import { Label } from "./label";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "./sidebar";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";

const meta = {
  title: "Core/Components/Sheet", tags: ["autodocs"],
  decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>],
  parameters: { controls: { disable: true }, docs: { description: { component: 'Sheet เดิม พร้อม Bottom Sheet ตาม Figma: Header default/search, icon และ showTopColor เฉพาะ side="bottom"; body เลื่อนแยก footer ได้ ใช้ input และคีย์บอร์ดของอุปกรณ์จริง ดู docs/components/SHEET-FIGMA.md สำหรับขอบเขตและข้อจำกัด' } } },
  component: Sheet,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Sheet><SheetTrigger render={<Button variant="outline" />}>เปิด Sheet</SheetTrigger><SheetContent><SheetHeader><SheetTitle>รายละเอียดรายการ</SheetTitle><SheetDescription>ข้อมูลตัวอย่าง</SheetDescription></SheetHeader></SheetContent></Sheet>) };
Default.play = async ({ canvas, userEvent, canvasElement }) => {
  await userEvent.click(canvas.getByRole("button", { name: "เปิด Sheet" }));
  const body = within(canvasElement.ownerDocument.body);
  await waitFor(async () => expect(await body.findByRole("dialog")).toBeVisible());
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
  await expect(canvas.getByRole("button", { name: "เปิด Sheet" })).toHaveFocus();
};

function BottomExample({ search = false, long = false, plain = false }: { search?: boolean; long?: boolean; plain?: boolean }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [value, setValue] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState("");
  const options = long ? Array.from({ length: 24 }, (_, i) => `รายการ ${i + 1} รายละเอียดสำหรับการทดสอบข้อความภาษาไทยที่ยาวบนหน้าจอมือถือ`) : ["ตัวเลือกหนึ่ง", "ตัวเลือกสอง", "ตัวเลือกสาม"];
  const filtered = options.filter(option => option.includes(query));
  return <>
    <p role="status">{confirmed ? `ยืนยัน: ${confirmed}` : "ยังไม่ได้ยืนยัน"}</p>
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>เปิด Bottom Sheet</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader variant={search ? "search" : "default"} showTopColor={!plain} icon={plain ? null : undefined}>
          <SheetTitle>{long ? "เลือกข้อมูลสำหรับการนัดหมายและตรวจสอบรายละเอียดทั้งหมด" : "Title"}</SheetTitle>
          {search && <Field size="lg">
            <Input size="lg" type="search" aria-label="ค้นหารายการ" aria-describedby={`${id}-help`} placeholder="ค้นหารายการ" value={query} onChange={e => setQuery(e.target.value)} />
            <FieldDescription id={`${id}-help`}>พิมพ์เพื่อค้นหาตัวเลือก</FieldDescription>
          </Field>}
        </SheetHeader>
        <SheetBody className="max-h-80">
          <RadioGroup aria-label="ตัวเลือก" value={value} onValueChange={setValue}>
            {filtered.map(option => <Label key={option}><RadioGroupItem value={option} />{option}</Label>)}
          </RadioGroup>
          {filtered.length === 0 && <p role="status">ไม่พบรายการ</p>}
        </SheetBody>
        <SheetFooter><SheetClose disabled={!value} onClick={() => value && setConfirmed(value)} render={<Button size="lg" />}>ยืนยัน</SheetClose></SheetFooter>
      </SheetContent>
    </Sheet>
  </>;
}
export const BottomDefault: Story = { render: () => <BottomExample /> };
BottomDefault.play = async ({ canvas, canvasElement, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "เปิด Bottom Sheet" }));
  const dialog = within(await within(canvasElement.ownerDocument.body).findByRole("dialog"));
  await expect(dialog.getByRole("button", { name: "ยืนยัน" })).toBeDisabled();
  await userEvent.click(dialog.getByRole("radio", { name: "ตัวเลือกสอง" }));
  await expect(dialog.getByRole("radio", { name: "ตัวเลือกสอง" })).toBeChecked();
  await userEvent.click(dialog.getByRole("button", { name: "ยืนยัน" }));
  await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("ยืนยัน: ตัวเลือกสอง"));
};
export const BottomSearch: Story = { render: () => <BottomExample search /> };
BottomSearch.play = async ({ canvas, canvasElement, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "เปิด Bottom Sheet" }));
  const body = within(canvasElement.ownerDocument.body);
  const dialog = within(await body.findByRole("dialog"));
  await userEvent.click(dialog.getByRole("searchbox"));
  await userEvent.type(dialog.getByRole("searchbox"), "ไม่ตรง");
  await expect(dialog.getByRole("status")).toHaveTextContent("ไม่พบรายการ");
  await userEvent.clear(dialog.getByRole("searchbox"));
  await userEvent.type(dialog.getByRole("searchbox"), "สอง");
  await expect(dialog.getAllByRole("radio")).toHaveLength(1);
  await userEvent.click(dialog.getByRole("radio", { name: "ตัวเลือกสอง" }));
  await userEvent.click(dialog.getByRole("button", { name: "ยืนยัน" }));
  await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
  await expect(canvas.getByRole("status")).toHaveTextContent("ยืนยัน: ตัวเลือกสอง");
};
export const MobileThai: Story = { render: () => <BottomExample search long />, globals: { viewport: { value: "mobile1", isRotated: false } } };
export const PlainHeader: Story = { render: () => <BottomExample plain /> };
export const OtherSides: Story = {
  render: () => <div className="flex flex-wrap gap-4">{(["top", "right", "left"] as const).map(side => <Sheet key={side}><SheetTrigger render={<Button variant="outline" />}>{side}</SheetTrigger><SheetContent side={side}><SheetHeader><SheetTitle>{side}</SheetTitle><SheetDescription>รูปแบบด้านเดิม</SheetDescription></SheetHeader><SheetFooter><SheetClose render={<Button />}>ปิด</SheetClose></SheetFooter></SheetContent></Sheet>)}</div>,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body);
    for (const side of ["top", "right", "left"]) {
      await userEvent.click(canvas.getByRole("button", { name: side }));
      const dialog = await body.findByRole("dialog");
      await expect(dialog).toHaveAttribute("data-side", side);
      await userEvent.click(within(dialog).getByRole("button", { name: /^ปิด$/ }));
      await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
    }
  },
};

/** Exercises the actual mobile consumer, which uses SheetContent side="left". */
export const MobileSidebarRegression: Story = {
  globals: { viewport: { value: "mobile390", isRotated: false } },
  render: () => <SidebarProvider className="min-h-96"><Sidebar><SidebarContent><Button>เมนูทดสอบ</Button></SidebarContent></Sidebar><SidebarTrigger /></SidebarProvider>,
};

/** Figma `sheet` (Drawer page): right / left / top — padding 16, gap 16, title 14/20 Medium. */
export const Sides: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>เปิดด้านขวา</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>แก้ไขโปรไฟล์</SheetTitle>
          <SheetDescription>แก้ไขข้อมูลแล้วกดบันทึก</SheetDescription>
        </SheetHeader>
        <SheetBody>เนื้อหา</SheetBody>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" size="sm" />}>ยกเลิก</SheetClose>
          <Button size="sm">บันทึก</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "เปิดด้านขวา" }));
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog");
    await waitFor(() => expect(dialog).toBeVisible());
    const cs = getComputedStyle(dialog);
    await expect(cs.paddingTop).toBe("16px");
    await expect(cs.rowGap).toBe("16px");
    await expect(cs.backgroundColor).toBe("rgb(255, 255, 255)");
    const title = within(dialog).getByText("แก้ไขโปรไฟล์");
    await expect([getComputedStyle(title).fontSize, getComputedStyle(title).lineHeight, getComputedStyle(title).fontWeight]).toEqual(["14px", "20px", "500"]);
    const close = dialog.querySelector(':scope > [data-slot="sheet-close"]') as HTMLElement;
    const r = close.getBoundingClientRect();
    await expect([Math.round(r.width), Math.round(r.height)]).toEqual([32, 32]);
    await userEvent.keyboard("{Escape}");
  },
};
