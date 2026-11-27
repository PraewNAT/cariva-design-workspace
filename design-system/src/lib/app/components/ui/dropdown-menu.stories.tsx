import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
const meta = {
  title: "Core/Components/Dropdown Menu",
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
        code: '<DropdownMenu><DropdownMenuTrigger render={<Button variant="outline" />}>ตัวเลือกรายการ</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuGroup><DropdownMenuItem>บันทึกร่าง</DropdownMenuItem><DropdownMenuItem disabled>ส่งรายงาน</DropdownMenuItem></DropdownMenuGroup></DropdownMenuContent></DropdownMenu>',
        language: "tsx",
      },
    },
  },
  component: DropdownMenu,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        ตัวเลือกรายการ
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>บันทึกร่าง</DropdownMenuItem>
          <DropdownMenuItem disabled>ส่งรายงาน</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

Default.play = async ({ canvas, userEvent, canvasElement }) => {
  const trigger = canvas.getByRole("button", { name: "ตัวเลือกรายการ" });
  await userEvent.click(trigger);
  const body = within(canvasElement.ownerDocument.body);
  await waitFor(async () =>
    expect(
      await body.findByRole("menuitem", { name: "บันทึกร่าง" })
    ).toBeVisible()
  );
  await expect(
    body.getByRole("menuitem", { name: "ส่งรายงาน" })
  ).toHaveAttribute("aria-disabled", "true");
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(body.queryByRole("menu")).not.toBeInTheDocument());
};

/** Figma `dropdown-menu-content` / `dropdown-menu-item`: surface radius 12 + shadow/lg, item 40px (padding 8/16, radius 4); the surface only pads top and bottom. */
export const FigmaMenu: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        เมนู
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuItem>ตัวเลือกหนึ่ง</DropdownMenuItem>
        <DropdownMenuItem disabled>ตัวเลือกสอง</DropdownMenuItem>
        <DropdownMenuCheckboxItem checked>เลือกแล้ว</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>ยังไม่เลือก</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const menu = await body.findByRole("menu");
    const m = getComputedStyle(menu);
    await expect(m.borderTopLeftRadius).toBe("12px");
    await expect([m.paddingTop, m.paddingLeft]).toEqual(["8px", "0px"]);
    await expect(m.backgroundColor).toBe("rgb(255, 255, 255)");
    await expect(m.boxShadow).toContain("30, 58, 138");
    const item = body.getByRole("menuitem", { name: "ตัวเลือกหนึ่ง" });
    const ic = getComputedStyle(item);
    await expect([
      item.offsetHeight,
      ic.paddingLeft,
      ic.paddingTop,
      ic.borderTopLeftRadius,
      ic.fontSize,
      ic.lineHeight,
      ic.fontWeight,
    ]).toEqual([40, "16px", "8px", "4px", "14px", "20px", "500"]);
    await expect(ic.color).toBe("rgb(15, 23, 42)");
    const dis = getComputedStyle(
      body.getByRole("menuitem", { name: "ตัวเลือกสอง" })
    );
    await expect(dis.color).toBe("rgb(148, 163, 184)");
    await expect(dis.opacity).toBe("1");
    const checked = body.getByRole("menuitemcheckbox", { name: "เลือกแล้ว" });
    await expect(getComputedStyle(checked).backgroundColor).toBe(
      "rgb(238, 249, 255)"
    );
    const box = checked.querySelector(
      '[data-slot="dropdown-menu-checkbox-item-indicator"]'
    ) as HTMLElement;
    await expect(box.offsetWidth).toBe(16);
    await expect(getComputedStyle(box).backgroundColor).toBe(
      "rgb(23, 137, 250)"
    );
  },
};

/** Figma `dropdown-menu-content` scrollable=true: 8 items, height capped at 256, list scrolls. */
export const FigmaMenuScrollable: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        เมนูยาว
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-64 w-52">
        {Array.from({ length: 8 }, (_, i) => (
          <DropdownMenuItem key={i}>ตัวเลือก {i + 1}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const menu = await body.findByRole("menu");
    await waitFor(() => expect(menu.offsetHeight).toBe(256));
    await expect(menu.scrollHeight).toBeGreaterThan(menu.clientHeight);
    await expect(getComputedStyle(menu).overflowY).toBe("auto");
  },
};
