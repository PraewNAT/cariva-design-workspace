import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { CoreCatalog } from "./CoreCatalog";
const meta = {
  title: "Core/Shadcn catalog",
  component: CoreCatalog,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CoreCatalog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const AllComponents: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile390", isRotated: false } },
  play: async ({ canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const doc = canvasElement.ownerDocument;
    await expect(doc.documentElement.scrollWidth).toBeLessThanOrEqual(
      doc.documentElement.clientWidth,
    );
    for (const e of canvasElement.querySelectorAll<HTMLElement>("*")) {
      if (
        !e.children.length &&
        e.textContent?.trim() &&
        e.getBoundingClientRect().width
      )
        await expect(
          parseFloat(getComputedStyle(e).fontSize),
        ).toBeGreaterThanOrEqual(12);
    }
  },
};
export const PageAndDialog: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const page = canvas.getByRole("button", { name: "ลอง Confirm dialog" });
    page.focus();
    await userEvent.keyboard("{Enter}");
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog");
    const confirm = within(dialog).getByRole("button", { name: "ยืนยัน" });
    for (const prop of [
      "height",
      "borderRadius",
      "fontFamily",
      "fontSize",
      "lineHeight",
      "paddingLeft",
    ] as const)
      await expect(getComputedStyle(page)[prop]).toBe(
        getComputedStyle(confirm)[prop],
      );
    await waitFor(() =>
      expect({
        height: confirm.getBoundingClientRect().height,
        font: getComputedStyle(confirm).fontSize,
        line: getComputedStyle(confirm).lineHeight,
        padding: getComputedStyle(confirm).padding,
      }).toEqual({
        height: 40,
        font: "16px",
        line: "24px",
        padding: "8px 16px",
      }),
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(body.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await expect(page).toHaveFocus();
  },
};
export const FormKeyboard: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    const select = canvas.getByRole("combobox", { name: "กลุ่มตัวอย่าง" });
    select.focus();
    await userEvent.keyboard("{ArrowDown}");
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(body.getByRole("option", { name: "ไต" })).toBeVisible(),
    );
    await waitFor(() =>
      expect(body.getByRole("option", { name: "ทั้งหมด" })).toHaveFocus(),
    );
    await userEvent.keyboard("{End}");
    await waitFor(() =>
      expect(body.getByRole("option", { name: "ไต" })).toHaveFocus(),
    );
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(select).toHaveTextContent("ไต"));
    await userEvent.type(
      canvas.getByRole("textbox", { name: "ชื่อผู้ใช้" }),
      "ชื่อภาษาไทยยาวสำหรับทดสอบ",
    );
    await expect(canvas.getByRole("textbox", { name: "ชื่อผู้ใช้" })).toHaveValue(
      "ชื่อภาษาไทยยาวสำหรับทดสอบ",
    );
  },
};
export const NavigationAndOverlays: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole("tab", { name: "ประวัติ" }));
    await expect(
      canvas.getByRole("tabpanel", { name: "ประวัติ" }),
    ).toHaveTextContent("ประวัติตัวอย่าง");
    await userEvent.click(
      canvas.getByRole("button", { name: /ข้อมูลเพิ่มเติมภาษาไทย/ }),
    );
    await expect(
      canvas.getByText("ความสูงตามเนื้อหา ไม่กำหนด height ตายตัว"),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "เปิด Drawer" }));
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByRole("dialog")).toHaveTextContent(
      "รายละเอียด",
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(body.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};
