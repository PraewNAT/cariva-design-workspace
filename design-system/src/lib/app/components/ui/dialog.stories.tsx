import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "./button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
const meta = {
  title: "Core/Components/Dialog",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-xl p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity.",
      },
      source: {
        code: '<Dialog><DialogTrigger render={<Button />}>เปิด Dialog</DialogTrigger><DialogContent><DialogHeader><DialogTitle>ยืนยันการเปลี่ยนแปลง?</DialogTitle><DialogDescription>คุณสามารถกลับมาแก้ไขภายหลังได้</DialogDescription></DialogHeader><DialogFooter><DialogClose render={<Button variant="outline" />}>ยกเลิก</DialogClose><DialogClose render={<Button />}>ยืนยัน</DialogClose></DialogFooter></DialogContent></Dialog>',
        language: "tsx",
      },
    },
  },
  component: Dialog,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>เปิด Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ยืนยันการเปลี่ยนแปลง?</DialogTitle>
          <DialogDescription>คุณสามารถกลับมาแก้ไขภายหลังได้</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            ยกเลิก
          </DialogClose>
          <DialogClose render={<Button />}>ยืนยัน</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

Default.play = async ({ canvas, userEvent, canvasElement }) => {
  const trigger = canvas.getByRole("button", { name: "เปิด Dialog" });
  trigger.focus();
  await userEvent.keyboard("{Enter}");
  const body = within(canvasElement.ownerDocument.body);
  const dialog = await body.findByRole("dialog");
  await userEvent.click(within(dialog).getByRole("button", { name: "ยกเลิก" }));
  await waitFor(() =>
    expect(body.queryByRole("dialog")).not.toBeInTheDocument()
  );
  await waitFor(() => expect(trigger).toHaveFocus());
};

/** Figma `dialog` (เดิม crv-modal) + `overlay`: header / body / footer bands, backdrop black 40%. */
export const FigmaDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>เปิด</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="8" />
            </svg>
          }
        >
          <DialogTitle>หัวข้อ</DialogTitle>
          <DialogDescription>คำอธิบาย</DialogDescription>
        </DialogHeader>
        <DialogBody>เนื้อหา</DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>
            ปิด
          </DialogClose>
          <Button size="sm">ยืนยัน</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "เปิด" }));
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog");
    await waitFor(() => expect(dialog).toBeVisible());
    const cs = getComputedStyle(dialog);
    await expect([
      cs.borderTopLeftRadius,
      cs.paddingTop,
      cs.backgroundColor,
    ]).toEqual(["16px", "0px", "rgb(255, 255, 255)"]);
    await expect(cs.boxShadow).toContain("30, 58, 138");
    const header = dialog.querySelector(
      '[data-slot="dialog-header"]'
    ) as HTMLElement;
    const h = getComputedStyle(header);
    await expect([h.paddingTop, h.paddingLeft, h.paddingBottom]).toEqual([
      "24px",
      "16px",
      "16px",
    ]);
    const title = within(dialog).getByText("หัวข้อ");
    await expect([
      getComputedStyle(title).fontSize,
      getComputedStyle(title).lineHeight,
      getComputedStyle(title).fontWeight,
    ]).toEqual(["20px", "28px", "600"]);
    await expect(
      Math.round(
        (dialog.querySelector('[data-slot="dialog-icon"]') as HTMLElement)
          .offsetWidth
      )
    ).toBe(28);
    const footer = dialog.querySelector(
      '[data-slot="dialog-footer"]'
    ) as HTMLElement;
    await expect([
      getComputedStyle(footer).backgroundColor,
      getComputedStyle(footer).paddingTop,
    ]).toEqual(["rgb(248, 250, 252)", "16px"]);
    const overlay = canvasElement.ownerDocument.querySelector(
      '[data-slot="dialog-overlay"]'
    ) as HTMLElement;
    await expect(getComputedStyle(overlay).backgroundColor).toBe(
      "rgba(0, 0, 0, 0.4)"
    );
    await userEvent.keyboard("{Escape}");
  },
};

function FigmaDialogCase({
  align,
  icon,
  label,
}: {
  align: "start" | "center";
  icon: boolean;
  label: string;
}) {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>{label}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader
          align={align}
          icon={
            icon ? (
              <svg viewBox="0 0 20 20" fill="currentColor">
                <circle cx="10" cy="10" r="8" />
              </svg>
            ) : undefined
          }
        >
          <DialogTitle>หัวข้อ</DialogTitle>
          <DialogDescription>คำอธิบาย</DialogDescription>
        </DialogHeader>
        <DialogBody>เนื้อหา</DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>
            ปิด
          </DialogClose>
          <Button size="sm">ยืนยัน</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** Figma `dialog` align=center: icon (44) above, title and description centred. */
export const FigmaDialogCenter: Story = {
  render: () => <FigmaDialogCase align="center" icon label="เปิดแบบกลาง" />,
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "เปิดแบบกลาง" }));
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog");
    await waitFor(() => expect(dialog).toBeVisible());
    const icon = dialog.querySelector(
      '[data-slot="dialog-icon"]'
    ) as HTMLElement;
    await expect(Math.round(icon.offsetWidth)).toBe(44);
    const header = dialog.querySelector(
      '[data-slot="dialog-header"]'
    ) as HTMLElement;
    await expect(header.getAttribute("data-align")).toBe("center");
    await expect(getComputedStyle(header).textAlign).toBe("center");
  },
};

/** Figma `dialog` without an icon (start align). */
export const FigmaDialogNoIcon: Story = {
  render: () => (
    <FigmaDialogCase align="start" icon={false} label="เปิดไม่มีไอคอน" />
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "เปิดไม่มีไอคอน" })
    );
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog");
    await waitFor(() => expect(dialog).toBeVisible());
    await expect(dialog.querySelector('[data-slot="dialog-icon"]')).toBeNull();
    await expect(
      dialog.querySelector('[data-slot="dialog-footer"]')
    ).not.toBeNull();
  },
};
