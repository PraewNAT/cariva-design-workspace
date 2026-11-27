import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Badge } from "./badge";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

const colors = ["primary", "error", "success", "warning", "info", "default"] as const;
const meta = {
  title: "Core/Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  decorators: [(Story) => <div className="max-w-3xl p-6"><Story /></div>],
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: "Badge เดิมเพิ่ม variant=dot (8px) และ standard (สูง/กว้างขั้นต่ำ20px, ข้อความ12/16px) พร้อม color ทั้ง6ตาม Figma4518:82967. สีแกนใหม่มีผลเฉพาะ dot/standard; คง default/secondary/destructive/outline/ghost/link เดิม. ข้อความและตัวนับใช้ children ไม่ตัด99+หรือซ่อน0ให้อัตโนมัติ. glowพักไว้. คู่สี contrast ที่ยังไม่ผ่านรายงานใน docs/components/BADGE-FIGMA.md และ BADGE-AUDIT.md." },
      source: { code: '<Badge variant="standard" color="success">1</Badge>\n<Badge variant="dot" color="error" role="img" aria-label="มีการแจ้งเตือนผิดพลาด" />', language: "tsx" },
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <div className="flex flex-wrap gap-3"><Badge>ใหม่</Badge><Badge variant="secondary">กำลังดำเนินการ</Badge><Badge variant="outline">รอยืนยัน</Badge><Badge variant="destructive">ข้อผิดพลาด</Badge></div>,
  parameters: { docs: { source: { code: '<Badge>ใหม่</Badge>\n<Badge variant="secondary">กำลังดำเนินการ</Badge>\n<Badge variant="outline">รอยืนยัน</Badge>\n<Badge variant="destructive">ข้อผิดพลาด</Badge>', language: "tsx" } } },
};

export const FigmaVariants: Story = {
  render: () => <div className="flex flex-col gap-6">{colors.map(color => <div key={color} className="grid grid-cols-[5rem_2rem_3rem] items-center gap-4"><span className="text-sm">{color}</span><Badge variant="dot" color={color} role="img" aria-label={`${color} notification`} /><Badge variant="standard" color={color}>1</Badge></div>)}</div>,
  play: async ({ canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const badges = canvasElement.querySelectorAll<HTMLElement>('[data-slot="badge"]');
    await expect(badges).toHaveLength(12);
    for (const badge of badges) {
      const isDot = badge.dataset.variant === "dot";
      const rect = badge.getBoundingClientRect();
      await expect(rect.height).toBe(isDot ? 8 : 20);
      await expect(rect.width).toBe(isDot ? 8 : 20);
      await expect(getComputedStyle(badge).borderTopWidth).toBe("0px");
      if (isDot) await expect(badge).toHaveTextContent("");
      else {
        await expect(getComputedStyle(badge).fontSize).toBe("12px");
        await expect(getComputedStyle(badge).lineHeight).toBe("16px");
      }
    }
  },
};

export const CountContent: Story = {
  render: () => <div className="flex flex-wrap items-center gap-4">{[0, 1, 12, "99+", 9999].map(value => <div key={value} className="flex items-center gap-2"><span className="text-sm">จำนวน {value}</span><Badge variant="standard" color="success">{value}</Badge></div>)}</div>,
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll<HTMLElement>('[data-slot="badge"]');
    let lastWidth = 0;
    for (const badge of badges) {
      await expect(badge.getBoundingClientRect().height).toBe(20);
      await expect(badge.getBoundingClientRect().width).toBeGreaterThanOrEqual(20);
      await expect(badge.scrollWidth).toBeLessThanOrEqual(badge.clientWidth);
      lastWidth = badge.getBoundingClientRect().width;
    }
    await expect(lastWidth).toBeGreaterThan(20);
  },
};

export const LegacyVariants: Story = {
  render: () => <div className="flex flex-wrap gap-4">{(["default", "secondary", "destructive", "outline", "ghost", "link"] as const).map(variant => <Badge key={variant} variant={variant}>{variant}</Badge>)}</div>,
  parameters: { docs: { source: { code: '<Badge variant="default">default</Badge>\n<Badge variant="secondary">secondary</Badge>\n<Badge variant="destructive">destructive</Badge>\n<Badge variant="outline">outline</Badge>\n<Badge variant="ghost">ghost</Badge>\n<Badge variant="link">link</Badge>', language: "tsx" } } },
};

function ContextExample() {
  return <div className="flex flex-col gap-6"><div className="flex items-center gap-2"><span className="text-sm">รายการที่ยังไม่ได้อ่าน</span><Badge variant="standard" color="success">12</Badge></div><Dialog><DialogTrigger render={<Button variant="outline" color="secondary" />}>เปิดรายละเอียด Badge</DialogTrigger><DialogContent><DialogHeader><DialogTitle>รายการที่ยังไม่ได้อ่าน</DialogTitle><DialogDescription>ข้อมูลจำลองสำหรับตรวจ Badge ใน Dialog</DialogDescription></DialogHeader><Badge variant="standard" color="success">12</Badge></DialogContent></Dialog><Badge variant="standard" color="success" render={<a href="#badge-destination" />}>3</Badge><p id="badge-destination" className="text-sm">การแจ้งเตือนจำลอง</p></div>;
}

export const PageAndDialog: Story = {
  render: () => <ContextExample />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const pageBadge = canvasElement.querySelector<HTMLElement>('[data-slot="badge"]')!;
    const trigger = canvas.getByRole("button", { name: "เปิดรายละเอียด Badge" });
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog");
    const badge = dialog.querySelector<HTMLElement>('[data-slot="badge"]')!;
    await waitFor(() => expect(badge).toBeVisible());
    for (const property of ["height", "width", "paddingLeft", "fontFamily", "fontSize", "fontWeight", "lineHeight", "borderRadius", "backgroundColor", "color"] as const) {
      await expect(getComputedStyle(badge)[property]).toBe(getComputedStyle(pageBadge)[property]);
    }
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
    const link = canvas.getByRole("link", { name: "3" });
    link.focus();
    await expect(link).toHaveFocus();
    await expect(link).toHaveAttribute("href", "#badge-destination");
  },
};

export const MobileThai: Story = {
  globals: { viewport: { value: "mobile320", isRotated: false } },
  render: () => <div className="flex items-start gap-2"><p className="min-w-0 break-words text-sm">รายการแจ้งเตือนที่ยังไม่ได้อ่านสำหรับผู้ประสานงานและผู้ดูแลข้อมูลผู้รับบริการ</p><Badge variant="standard" color="success">9999</Badge></div>,
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    await doc.fonts.ready;
    await expect(doc.documentElement.scrollWidth).toBeLessThanOrEqual(doc.documentElement.clientWidth);
    for (const element of canvasElement.querySelectorAll<HTMLElement>('p, [data-slot="badge"]')) await expect(parseFloat(getComputedStyle(element).fontSize)).toBeGreaterThanOrEqual(12);
  },
};

/** Figma `badge` prop `glow` (dot only): drop shadow 0 0 4px in the dot colour at 36% opacity. */
export const Glow: Story = {
  render: () => <div className="flex flex-col gap-6 p-4">{colors.map(color => <div key={color} className="grid grid-cols-[5rem_2rem_2rem] items-center gap-4"><span className="text-sm">{color}</span><Badge variant="dot" color={color} role="img" aria-label={`${color} plain dot`} /><Badge variant="dot" glow color={color} role="img" aria-label={`${color} glowing dot`} /></div>)}</div>,
  play: async ({ canvasElement }) => {
    const plain = canvasElement.querySelectorAll<HTMLElement>('[aria-label$="plain dot"]');
    const glowing = canvasElement.querySelectorAll<HTMLElement>('[aria-label$="glowing dot"]');
    await expect(plain).toHaveLength(6);
    await expect(glowing).toHaveLength(6);
    for (const dot of plain) await expect(getComputedStyle(dot).boxShadow).toBe("none");
    for (const dot of glowing) {
      const shadow = getComputedStyle(dot).boxShadow;
      await expect(shadow).toContain("0px 0px 4px 0px");
      await expect(shadow).toContain("/ 0.36)");
    }
    await expect(getComputedStyle(glowing[1]).boxShadow).toContain("color(srgb 0.862745 0.14902 0.14902 / 0.36) 0px 0px 4px 0px");
    await expect(getComputedStyle(glowing[0]).boxShadow).toContain("color(srgb 0.0901961 0.537255 0.980392 / 0.36) 0px 0px 4px 0px");
  },
};
