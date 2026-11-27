import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Rating } from "./patterns";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
const meta = { title: "Core/Components/Rating", component: Rating, tags: ["autodocs"], parameters: { docs: { description: { component: "Five-star rating with full/half values, three sizes, pointer preview and keyboard radio selection. Controlled/uncontrolled, disabled and readOnly; original Figma star assets. Product defines score meaning." } } }, decorators: [(Story) => <div className="max-w-lg p-6"><Story /></div>] } satisfies Meta<typeof Rating>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Score: Story = {
  render: () => <Rating />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "5 ดาว" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("5 จาก 5");
  },
};

export const MultipleRatings: Story = {
  render: () => <div className="grid gap-8"><Rating /><Rating /></div>,
  play: async ({ canvas, userEvent }) => {
    const groups = canvas.getAllByRole("radiogroup", { name: "ให้คะแนนประสบการณ์" });
    await expect(groups).toHaveLength(2);
    await expect(groups[0].getAttribute("aria-labelledby")).not.toBe(groups[1].getAttribute("aria-labelledby"));
    await userEvent.click(within(groups[0]).getByRole("radio", { name: "5 ดาว" }));
    await expect(within(groups[0]).getByRole("radio", { name: "5 ดาว" })).toBeChecked();
    await expect(within(groups[1]).getByRole("radio", { name: "3 ดาว" })).toBeChecked();
    await userEvent.click(within(groups[1]).getByRole("radio", { name: "1 ดาว" }));
    await expect(within(groups[0]).getByRole("radio", { name: "5 ดาว" })).toBeChecked();
  },
};

export const SizesAndValues: Story = { render: () => <div className="grid gap-6">{(['sm','default','lg'] as const).map(size => <Rating key={size} size={size} defaultValue={2.5} precision={0.5} label={`ขนาด ${size}`} />)}</div> };
export const DisabledAndReadOnly: Story = { render: () => <div className="grid gap-6"><Rating disabled defaultValue={2.5} label="คะแนนที่ปิดใช้งาน"/><Rating readOnly value={4.5} label="คะแนนรีวิวเฉลี่ย"/></div>, play: async ({ canvas }) => { await expect(canvas.getByRole('img',{name:'คะแนนรีวิวเฉลี่ย: 4.5 จาก 5 ดาว'})).toBeVisible(); for(const radio of canvas.getAllByRole('radio')) await expect(radio).toHaveAttribute('aria-disabled', 'true'); } };
export const HalfAndKeyboard: Story = { render: () => <Rating precision={0.5} defaultValue={2.5}/>, play: async ({ canvas, userEvent }) => { await userEvent.click(canvas.getByRole('radio',{name:'4.5 ดาว'})); await expect(canvas.getByRole('status')).toHaveTextContent('4.5 จาก 5'); canvas.getByRole('radio',{name:'4.5 ดาว'}).focus(); await userEvent.keyboard('{ArrowLeft}'); await expect(canvas.getByRole('radio',{name:'4 ดาว'})).toBeChecked(); } };
export const MobileThai: Story = { globals: {viewport:{value:"mobile320",isRotated:false}},  render: () => <div className="w-[272px] max-w-full"><Rating label="ให้คะแนนความพึงพอใจต่อบริการของเจ้าหน้าที่โรงพยาบาล"/></div> };

export const Controlled: Story = { render: function Controlled() { const [value,setValue]=useState(2); return <Rating value={value} onValueChange={setValue}/>; }, play: async ({ canvas,userEvent }) => { await userEvent.click(canvas.getByRole('radio',{name:'4 ดาว'})); await expect(canvas.getByRole('status')).toHaveTextContent('4 จาก 5'); } };
export const PageAndDialog: Story = { render: () => <div className="grid gap-6"><Rating/><Dialog><DialogTrigger render={<Button variant="outline" color="secondary"/>}>เปิด Rating ใน Dialog</DialogTrigger><DialogContent><DialogTitle>คะแนนบริการ</DialogTitle><DialogDescription>ตัวอย่างการประเมิน ไม่มีการส่งข้อมูล</DialogDescription><Rating/></DialogContent></Dialog></div>, play: async ({ canvas,userEvent,canvasElement }) => { await userEvent.click(canvas.getByRole('button')); const dialog=within(canvasElement.ownerDocument.body).getByRole('dialog'); await userEvent.click(within(dialog).getByRole('radio',{name:'5 ดาว'})); await expect(within(dialog).getByRole('status')).toHaveTextContent('5 จาก 5'); await userEvent.keyboard('{Escape}'); } };

SizesAndValues.play = async ({canvasElement}) => {
  const mask = canvasElement.querySelector('[data-slot="rating"] [style*="mask-image"]');
  await expect(mask).not.toBeNull();
  await expect(getComputedStyle(mask!).maskImage).not.toBe('none');
};
