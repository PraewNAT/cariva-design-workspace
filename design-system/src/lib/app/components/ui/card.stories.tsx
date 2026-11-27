import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ArrowForwardRounded } from "../app/icons";
import { expect, waitFor, within } from "storybook/test";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import { CardHorizontal, CardMetric, CardProfile, CardSmallHorizontal, CardVertical } from "../app/content-card";
import imagePlaceholder from "../app/assets/card/image-placeholder.png";
import profileAvatar from "../app/assets/card/profile-avatar.png";
import actionArrow from "../app/assets/card/action-arrow.svg";

const image = <img src={imagePlaceholder} alt="" />;
const common = { image, tag: "Label", title: "Header", description: "Description" };
function Action({ icon = false, arrow = false }: { icon?: boolean; arrow?: boolean }) {
  const [done, setDone] = useState(false);
  return <Button size={icon ? "icon-sm" : "sm"} color={icon ? "secondary" : "primary"} variant={icon ? "ghost" : "default"} aria-label={icon ? "ดูรายละเอียด" : undefined} onClick={() => setDone(true)}>
    {!icon && (done ? "เลือกแล้ว" : "Label")}
    {icon && done ? <span className="sr-only">เลือกแล้ว</span> : null}
    {icon ? <ArrowForwardRounded /> : arrow ? <img src={actionArrow} alt="" width={16} height={16} /> : null}
  </Button>;
}
function ProfileAvatar() {
  return <Avatar size="lg"><AvatarImage src={profileAvatar} alt="" /><AvatarFallback>NP</AvatarFallback></Avatar>;
}
const profile = { avatar: <ProfileAvatar />, name: "Name", identifier: "Identifier", details: [{ label: "Label", value: "Value" }, { label: "Label", value: "Value" }] };
const meta = {
  title: "Core/Components/Card", tags: ["autodocs"], component: Card,
  decorators: [(Story) => <div className="p-4"><Story /></div>],
  parameters: { controls: { disable: true }, docs: { description: { component: "Core Card: base composition, vertical, horizontal, small horizontal, profile and metric. All examples and states live here. See CARD-FIGMA.md and CARD-AUDIT.md for the API and known contrast gaps." } } },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj;
export const Default: Story = {
  render: () => <Card><CardHeader><CardTitle>สรุปการตรวจ</CardTitle><CardDescription>ข้อมูลตัวอย่างในรอบนี้</CardDescription></CardHeader><CardContent>มีรายการรอทบทวน 3 รายการ</CardContent></Card>,
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
};

export const Vertical: Story = {
  render: () => <CardVertical {...common} actions={<Action />} />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const card = canvasElement.querySelector('[data-slot="card-vertical"]')!;
    await expect(Math.round(card.getBoundingClientRect().width)).toBe(330);
    await expect(getComputedStyle(card).borderTopLeftRadius).toBe("16px");
    await expect(getComputedStyle(card.querySelector('[data-slot="badge"]')!).paddingLeft).toBe("8px");
    await userEvent.click(canvas.getByRole("button", { name: "Label" }));
    await expect(canvas.getByRole("button", { name: "เลือกแล้ว" })).toBeVisible();
  },
};
export const VerticalTwoActions: Story = {
  render: () => <CardVertical {...common} actions={<><Button size="sm" variant="outline">ยกเลิก</Button><Action /></>} />,
  play: async ({ canvasElement }) => {
    const actions = canvasElement.querySelector('[data-slot="card-actions"]')!;
    const buttons = actions.querySelectorAll("button");
    await expect(buttons).toHaveLength(2);
    await expect(buttons[0].getBoundingClientRect().y).toBe(buttons[1].getBoundingClientRect().y);
    await expect(getComputedStyle(actions).gap).toBe("16px");
  },
};
export const Horizontal: Story = {
  render: () => <div className="flex flex-wrap items-start gap-4">{(["right", "left", "absolute"] as const).map(position => <CardHorizontal key={position} {...common} imagePosition={position} topMessage="Update 12 มี.ค.67 15:28 น." actions={<Action arrow />} />)}</div>,
  play: async ({ canvasElement }) => {
    const cards = canvasElement.querySelectorAll('[data-slot="card-horizontal"]');
    await expect(cards).toHaveLength(3);
    for (const card of cards) {
      await expect(Math.round(card.getBoundingClientRect().width)).toBe(420);
      await expect(Math.round(card.getBoundingClientRect().height)).toBe(190);
      const image = card.querySelector('[data-slot="card-image"]')!;
      if (card.getAttribute("data-image-position") === "absolute") {
        await expect(getComputedStyle(image).position).toBe("absolute");
        await expect(Math.round(image.getBoundingClientRect().right)).toBe(Math.round(card.getBoundingClientRect().right));
      }
    }
  },
};
export const SmallHorizontal: Story = {
  render: () => <CardSmallHorizontal {...common} actions={<Action icon />} />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const card=canvasElement.querySelector('[data-slot="card-small-horizontal"]')!;
    await expect([card.getBoundingClientRect().width, card.getBoundingClientRect().height]).toEqual([344,104]);
    await expect(getComputedStyle(card).borderTopLeftRadius).toBe("12px");
    await userEvent.click(canvas.getByRole("button", { name: "ดูรายละเอียด" }));
    await expect(canvas.getByText("เลือกแล้ว")).toBeInTheDocument();
  },
};
export const Profile: Story = {
  render: () => <div className="flex flex-wrap items-start gap-4">{(["subtle", "white", "outlined"] as const).map(style => <CardProfile key={style} {...profile} style={style} />)}<div data-testid="narrow-profile" className="w-60 max-w-full"><CardProfile {...profile} /></div></div>,
  play: async ({ canvasElement }) => {
    for (const card of canvasElement.querySelectorAll('[data-slot="card-profile"]')) {
      await expect([card.getBoundingClientRect().width,card.getBoundingClientRect().height]).toEqual([card.closest('[data-testid="narrow-profile"]') ? 240 : 320,116]);
      if (card.getAttribute("data-style") === "subtle") await expect(getComputedStyle(card).backgroundColor).toBe("rgb(241, 245, 249)");
      await expect(getComputedStyle(card).borderTopLeftRadius).toBe("12px");
    }
  },
};
export const Metric: Story = {
  render: () => <div className="flex gap-4"><CardMetric label="Label" unit="Unit" value="Value" /><CardMetric label="Label" unit="Unit" value="Value" status="abnormal" /></div>,
  play: async ({ canvasElement }) => {
    for(const card of canvasElement.querySelectorAll('[data-slot="card-metric"]')) {
      await expect([card.getBoundingClientRect().width,card.getBoundingClientRect().height]).toEqual([90,56]);
      const unit = card.querySelector("div > span:last-child")!;
      await expect(getComputedStyle(unit).color).toBe("rgb(51, 65, 85)");
      if (card.getAttribute("data-status") === "normal") await expect(getComputedStyle(card).backgroundColor).toBe("rgb(241, 245, 249)");
    }
  },
};
export const OptionalContent: Story = {
  render: () => <div className="flex flex-wrap items-start gap-4"><CardVertical title="ไม่มีรูป แท็ก หรือปุ่ม" /><CardHorizontal title="ไม่มีรูป" topMessage="อัปเดตล่าสุด" /><CardSmallHorizontal title="ไม่มีช่องซ้ายหรือขวา" /><CardProfile name="ชื่อ" /><CardMetric label="HR" value={0} /></div>,
};
const long = "รายละเอียดการนัดหมายและข้อมูลสำหรับการตรวจสุขภาพประจำปีของผู้รับบริการ";
export const LongThai: Story = {
  globals: { viewport: { value: "mobile390", isRotated: false } },
  render: () => <div className="flex flex-col items-start gap-4"><CardVertical image={image} title={long} description={long} tag="ใหม่" actions={<><Button size="sm" variant="outline">ยกเลิก</Button><Action /></>} />{(["left", "right", "absolute"] as const).map(imagePosition=><CardHorizontal key={imagePosition} image={image} imagePosition={imagePosition} title={long} description={long} topMessage="อัปเดต 12 มีนาคม 2567 เวลา 15:28 น." actions={<Action arrow />} />)}<CardSmallHorizontal image={image} title={long} description={long} actions={<Action icon />} /></div>,
};
function SurfaceCards() {
  return <div className="flex min-w-0 max-w-full flex-col items-start gap-4">
    <CardVertical {...common} actions={<Action />} />
    <CardHorizontal {...common} imagePosition="right" topMessage="Update 12 มี.ค.67 15:28 น." actions={<Action arrow />} />
    <CardSmallHorizontal {...common} actions={<Action icon />} />
    <CardProfile {...profile} />
    <CardMetric label="HR" unit="bpm" value="120" status="abnormal" />
  </div>;
}
export const PageAndDialog: Story = {
  render: () => <div className="flex flex-col items-start gap-4"><SurfaceCards /><Dialog><DialogTrigger render={<Button variant="outline" />}>เปิด Dialog</DialogTrigger><DialogContent><DialogTitle>Card ใน Dialog</DialogTitle><SurfaceCards /><DialogClose render={<Button variant="outline" />}>ปิด Dialog</DialogClose></DialogContent></Dialog></div>,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "เปิด Dialog" }));
    const body=within(canvasElement.ownerDocument.body);
    await waitFor(async ()=>expect(await body.findByRole("dialog")).toBeVisible());
    await userEvent.keyboard("{Escape}");
    await waitFor(()=>expect(body.queryByRole("dialog")).not.toBeInTheDocument());
    await expect(canvas.getByRole("button",{name:"เปิด Dialog"})).toHaveFocus();
  },
};
