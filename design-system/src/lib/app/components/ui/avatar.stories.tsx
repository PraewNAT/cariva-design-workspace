import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import portrait from "./assets/avatar/portrait.png";
import personLg from "./assets/avatar/person-lg.svg";
import personDefault from "./assets/avatar/person-default.svg";
import personSm from "./assets/avatar/person-sm.svg";
import personXs from "./assets/avatar/person-xs.svg";
import personDefaultBadge from "./assets/avatar/person-default-badge.svg";
import personSmBadge from "./assets/avatar/person-sm-badge.svg";
import personXsBadge from "./assets/avatar/person-xs-badge.svg";

const sizes = ["lg", "default", "sm", "xs"] as const;
const dimensions = { lg: 40, default: 32, sm: 24, xs: 20 };
const iconSizes = { lg: 24, default: 20, sm: 16, xs: 12 };
const icons = { lg: personLg, default: personDefault, sm: personSm, xs: personXs };
const badgeIcons = { lg: personLg, default: personDefaultBadge, sm: personSmBadge, xs: personXsBadge };
type Size = typeof sizes[number];
type Content = "text" | "icon" | "image";

// Story fixtures compose the real Core primitives, not a second Avatar implementation.
function Sample({ size = "default", content = "text", badge = false }: { size?: Size; content?: Content; badge?: boolean }) {
  return (
    <Avatar size={size} role="img" aria-label={`โอภาส ${content} ${size}${badge ? " ออนไลน์" : ""}`} data-content={content}>
      {content === "image" && <AvatarImage src={portrait} alt="" />}
      <AvatarFallback>
        {content === "icon" ? <img src={badge ? badgeIcons[size] : icons[size]} alt="" width={iconSizes[size]} height={iconSizes[size]} /> : "OP"}
      </AvatarFallback>
      {badge && <AvatarBadge aria-hidden="true" />}
    </Avatar>
  );
}

const meta = {
  title: "Core/Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { size: "default" },
  argTypes: { size: { control: "select", options: sizes } },
  decorators: [(Story) => <div className="p-6"><Story /></div>],
  parameters: {
    a11y: { test: "error" },
    docs: { description: { component: "Avatar ใช้ Base UI เดิม: lg=40, default=32, sm=24, xs=20px ตาม Figma 4315:10055. Initials ใช้ 14/20px ใน lg และ 12/16px ในขนาดอื่น ตามข้อยกเว้นขั้นต่ำ 12px ที่ยืนยันแล้ว. ประกอบ AvatarImage + AvatarFallback และ AvatarBadge สำหรับออนไลน์; รายละเอียด mapping และข้อจำกัดอยู่ใน docs/components/AVATAR-FIGMA.md. AvatarGroup เป็น composition เดิม ไม่รับ prop max และไม่ได้รับรอง group geometry ตรง Figma ทุก variant." } },
  },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

// Preserve the original story ID and group example.
export const Default: Story = {
  render: ({ size }) => <AvatarGroup aria-label="ทีมตัวอย่าง"><Avatar size={size} role="img" aria-label="กานดา"><AvatarFallback>กน</AvatarFallback></Avatar><Avatar size={size} role="img" aria-label="พัทรา"><AvatarFallback>พท</AvatarFallback></Avatar></AvatarGroup>,
  parameters: { docs: { source: { code: '<AvatarGroup aria-label="ทีมตัวอย่าง">\n  <Avatar role="img" aria-label="กานดา"><AvatarFallback>กน</AvatarFallback></Avatar>\n  <Avatar role="img" aria-label="พัทรา"><AvatarFallback>พท</AvatarFallback></Avatar>\n</AvatarGroup>', language: "tsx" } } },
};

export const FigmaVariants: Story = {
  parameters: { controls: { disable: true }, docs: { description: { story: "24 combinations: text/icon/image × 4 sizes × badge on/off. ภาพและไอคอนเป็นไฟล์ต้นฉบับจาก Figma ที่เก็บใน assets/avatar. ขนาด sm/xs ใช้ initials 12px แทน 10px." }, source: { code: '<Avatar size="lg" role="img" aria-label="โอภาส ออนไลน์">\n  <AvatarImage src={portrait} alt="" />\n  <AvatarFallback>OP</AvatarFallback>\n  <AvatarBadge aria-hidden="true" />\n</Avatar>', language: "tsx" } } },
  render: () => <div className="flex flex-wrap gap-8">{(["text", "icon", "image"] as const).map(content => <section key={content} className="flex flex-col gap-6" aria-label={content}><h2 className="text-base font-medium">{content}</h2>{sizes.map(size => <div key={size} className="grid grid-cols-[4rem_3rem_3rem] items-center gap-4"><span className="text-sm">{size}</span><Sample size={size} content={content} /><Sample size={size} content={content} badge /></div>)}</section>)}</div>,
  play: async ({ canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const avatars = canvasElement.querySelectorAll<HTMLElement>('[data-slot="avatar"]');
    await expect(avatars).toHaveLength(24);
    for (const avatar of avatars) {
      const size = avatar.dataset.size as Size;
      await expect(avatar.getBoundingClientRect().width).toBe(dimensions[size]);
      await expect(avatar.getBoundingClientRect().height).toBe(dimensions[size]);
      if (avatar.dataset.content === "image") {
        await waitFor(() => expect(avatar.querySelector<HTMLImageElement>('[data-slot="avatar-image"]')?.naturalWidth).toBeGreaterThan(0));
      } else {
        const fallback = avatar.querySelector<HTMLElement>('[data-slot="avatar-fallback"]')!;
        await expect(parseFloat(getComputedStyle(fallback).fontSize)).toBeGreaterThanOrEqual(12);
        if (avatar.dataset.content === "icon") {
          const icon = fallback.querySelector('img')!;
          await waitFor(() => expect(icon.naturalWidth).toBeGreaterThan(0));
          await expect(icon.getBoundingClientRect().width).toBe(iconSizes[size]);
          await expect(icon.getBoundingClientRect().height).toBe(iconSizes[size]);
        }
      }
      const badge = avatar.querySelector<HTMLElement>('[data-slot="avatar-badge"]');
      if (badge) {
        await expect(badge.getBoundingClientRect().width).toBe(12);
        await expect(badge.getBoundingClientRect().height).toBe(12);
        await expect(getComputedStyle(badge).borderTopWidth).toBe("2px");
        await expect(getComputedStyle(badge).backgroundColor).toBe("rgb(4, 120, 87)");
      }
    }
  },
};

export const ImageFallback: Story = {
  parameters: { controls: { disable: true }, docs: { description: { story: "ภาพโหลดไม่ได้หรือไม่มี src แสดง initials แทน โดยคงขนาดและ badge เดิม. ข้อมูลเป็น fixture ไม่มี API." }, source: { code: '<Avatar size="xs" role="img" aria-label="กานดา ออนไลน์">\n  <AvatarImage src="data:image/png;base64,broken" alt="" />\n  <AvatarFallback>กน</AvatarFallback>\n  <AvatarBadge aria-hidden="true" />\n</Avatar>', language: "tsx" } } },
  render: () => <div className="flex flex-wrap gap-8">{sizes.map(size => <div key={size} className="flex items-center gap-4"><Avatar size={size} role="img" aria-label={`กานดา ${size} ออนไลน์`}><AvatarImage src="data:image/png;base64,broken" alt="" /><AvatarFallback>กน</AvatarFallback><AvatarBadge aria-hidden="true" /></Avatar><Avatar size={size} role="img" aria-label={`พัทรา ${size}`}><AvatarFallback>พท</AvatarFallback></Avatar></div>)}</div>,
  play: async ({ canvasElement }) => {
    for (const fallback of canvasElement.querySelectorAll<HTMLElement>('[data-slot="avatar-fallback"]')) {
      await expect(fallback).toBeVisible();
      await expect(parseFloat(getComputedStyle(fallback).fontSize)).toBeGreaterThanOrEqual(12);
    }
    await expect(canvasElement.querySelectorAll('[data-slot="avatar-image"]')).toHaveLength(0);
  },
};

export const GroupSizes: Story = {
  parameters: { controls: { disable: true }, docs: { description: { story: "ตรวจ AvatarGroup/AvatarGroupCount เดิมเมื่อใช้ขนาดทั้งสี่ ผู้เรียกเป็นผู้เลือกจำนวนและคำนวณตัวเลขเอง ไม่มี max prop. คง overlap 8px เดิม จึงยังต่างจาก Figma group บางขนาด." }, source: { code: '<AvatarGroup aria-label="ทีมรักษา">\n  <Avatar size="xs" role="img" aria-label="กานดา"><AvatarFallback>กน</AvatarFallback></Avatar>\n  <Avatar size="xs" role="img" aria-label="พัทรา"><AvatarFallback>พท</AvatarFallback></Avatar>\n  <AvatarGroupCount aria-label="สมาชิกเพิ่มเติม 3 คน">+3</AvatarGroupCount>\n</AvatarGroup>', language: "tsx" } } },
  render: () => <div className="flex flex-col gap-6">{sizes.map(size => <div key={size} className="flex items-center gap-8"><span className="w-16 text-sm">{size}</span><AvatarGroup aria-label={`ทีม ${size}`}><Avatar size={size} role="img" aria-label="กานดา"><AvatarFallback>กน</AvatarFallback></Avatar><Avatar size={size} role="img" aria-label="พัทรา"><AvatarFallback>พท</AvatarFallback></Avatar><AvatarGroupCount aria-label="สมาชิกเพิ่มเติม 3 คน">+3</AvatarGroupCount></AvatarGroup></div>)}</div>,
  play: async ({ canvasElement }) => {
    for (const group of canvasElement.querySelectorAll('[data-slot="avatar-group"]')) {
      const avatar = group.querySelector<HTMLElement>('[data-slot="avatar"]')!;
      const count = group.querySelector<HTMLElement>('[data-slot="avatar-group-count"]')!;
      await expect(count.getBoundingClientRect().width).toBe(avatar.getBoundingClientRect().width);
      await expect(parseFloat(getComputedStyle(count).fontSize)).toBeGreaterThanOrEqual(12);
    }
  },
};

function ContextExample() {
  return <div className="flex flex-col gap-6"><div className="flex items-center gap-4"><Sample badge /><p className="min-w-0 break-words text-sm">แพทย์หญิงกานดา ผู้ประสานงานและดูแลข้อมูลผู้รับบริการ</p></div><Dialog><DialogTrigger render={<Button variant="outline" color="secondary" />}>ดูผู้รับผิดชอบ</DialogTrigger><DialogContent><DialogHeader><DialogTitle>ผู้รับผิดชอบ</DialogTitle><DialogDescription>ตัวอย่างข้อมูลจำลองสำหรับตรวจ Avatar ใน Dialog</DialogDescription></DialogHeader><div className="flex items-center gap-4"><Sample badge /><p className="min-w-0 break-words text-sm">แพทย์หญิงกานดา ผู้ประสานงานและดูแลข้อมูลผู้รับบริการ</p></div><DialogClose render={<Button variant="outline" color="secondary" />}>กลับ</DialogClose></DialogContent></Dialog></div>;
}

export const PageAndDialog: Story = {
  parameters: { controls: { disable: true }, docs: { source: { code: '<Dialog>\n  <DialogTrigger render={<Button variant="outline" color="secondary" />}>ดูผู้รับผิดชอบ</DialogTrigger>\n  <DialogContent>\n    <DialogHeader><DialogTitle>ผู้รับผิดชอบ</DialogTitle><DialogDescription>ข้อมูลจำลอง</DialogDescription></DialogHeader>\n    <Avatar role="img" aria-label="โอภาส ออนไลน์"><AvatarFallback>OP</AvatarFallback><AvatarBadge aria-hidden="true" /></Avatar>\n    <DialogClose render={<Button variant="outline" color="secondary" />}>กลับ</DialogClose>\n  </DialogContent>\n</Dialog>', language: "tsx" } } },
  render: () => <ContextExample />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "ดูผู้รับผิดชอบ" });
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog");
    const pageAvatar = canvasElement.querySelector<HTMLElement>('[data-slot="avatar"]')!;
    const portalAvatar = dialog.querySelector<HTMLElement>('[data-slot="avatar"]')!;
    for (const slot of ["avatar", "avatar-fallback", "avatar-badge"]) {
      const pagePart = slot === "avatar" ? pageAvatar : pageAvatar.querySelector<HTMLElement>(`[data-slot="${slot}"]`)!;
      const portalPart = slot === "avatar" ? portalAvatar : portalAvatar.querySelector<HTMLElement>(`[data-slot="${slot}"]`)!;
      for (const property of ["width", "height", "borderRadius", "fontFamily", "fontSize", "fontWeight", "lineHeight", "backgroundColor", "color"] as const) {
        await expect(getComputedStyle(portalPart)[property]).toBe(getComputedStyle(pagePart)[property]);
      }
    }
    await waitFor(() => expect(within(dialog).getByRole("button", { name: "กลับ" })).toBeVisible());
    await waitFor(() => expect(within(dialog).getByRole("button", { name: /^ปิด$/ })).toBeVisible());
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
  },
};

export const MobileThai: Story = {
  ...PageAndDialog,
  globals: { viewport: { value: "mobile320", isRotated: false } },
  decorators: [(Story) => <div data-product="backOffice"><Story /></div>],
  play: async context => {
    await PageAndDialog.play!(context);
    const doc = context.canvasElement.ownerDocument;
    await expect(doc.documentElement.scrollWidth).toBeLessThanOrEqual(doc.documentElement.clientWidth);
    for (const element of context.canvasElement.querySelectorAll<HTMLElement>("*")) {
      if (element.textContent?.trim() && !element.children.length && element.getBoundingClientRect().width) {
        await expect(parseFloat(getComputedStyle(element).fontSize)).toBeGreaterThanOrEqual(12);
      }
    }
  },
};
