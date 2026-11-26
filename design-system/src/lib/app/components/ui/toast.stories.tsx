import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Button } from "./button";
import { toast, ToastCard, Toaster } from "./toast";
const meta = {
  title: "Core/Components/Toast",
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
        code: '<Toaster><Button onClick={() => toast.add({ title: "บันทึกแล้ว", description: "ข้อความตัวอย่าง" })}>แสดง Toast</Button></Toaster>',
        language: "tsx",
      },
    },
  },
  component: Toaster,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Toaster>
      <Button
        onClick={() =>
          toast.add({ title: "บันทึกแล้ว", description: "ข้อความตัวอย่าง" })
        }
      >
        แสดง Toast
      </Button>
    </Toaster>
  ),
};

Default.play = async ({ canvas, userEvent, canvasElement }) => {
  await userEvent.click(canvas.getByRole("button", { name: "แสดง Toast" }));
  await expect(
    await within(canvasElement.ownerDocument.body).findByText("บันทึกแล้ว")
  ).toBeVisible();
};

const severities = [
  "error",
  "warning",
  "info",
  "success",
  "notification",
] as const;
const variants = ["filled", "outlined", "standard"] as const;
const rgb = (e: Element) => getComputedStyle(e).backgroundColor;

/** Figma `toast`: all 15 severity x variant combinations with title, description, action and close. */
export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-6">
      {variants.map((variant) => (
        <div
          key={variant}
          className="flex flex-wrap gap-4"
          data-variant-row={variant}
        >
          {severities.map((severity) => (
            <ToastCard
              key={severity}
              severity={severity}
              variant={variant}
              title="Title"
              description="Description"
              actionLabel="Label"
            />
          ))}
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const cards = canvasElement.querySelectorAll('[data-slot="toast-card"]');
    expect(cards.length).toBe(15);
    const c = (i: number) => cards[i] as HTMLElement;
    // filled error
    expect([c(0).offsetWidth, c(0).offsetHeight]).toEqual([320, 72]);
    expect(getComputedStyle(c(0)).borderRadius).toBe("12px");
    expect(rgb(c(0))).toBe("rgb(220, 38, 38)");
    expect(rgb(c(3))).toBe("rgb(4, 120, 87)");
    expect(
      getComputedStyle(c(0).querySelector('[data-slot="toast-title"]')!).color
    ).toBe("rgb(255, 255, 255)");
    const title = c(0).querySelector(
      '[data-slot="toast-title"]'
    ) as HTMLElement;
    expect([
      getComputedStyle(title).fontSize,
      getComputedStyle(title).lineHeight,
      getComputedStyle(title).fontWeight,
    ]).toEqual(["16px", "24px", "500"]);
    const desc = c(0).querySelector(
      '[data-slot="toast-description"]'
    ) as HTMLElement;
    expect([
      getComputedStyle(desc).fontSize,
      getComputedStyle(desc).lineHeight,
    ]).toEqual(["14px", "20px"]);
    // outlined: white fill and 1px severity ring
    expect(rgb(c(5))).toBe("rgb(255, 255, 255)");
    expect(getComputedStyle(c(5)).boxShadow).toContain("239, 68, 68");
    expect(getComputedStyle(c(9)).boxShadow).toContain("148, 163, 184");
    // standard: subtle fill + status shadow
    expect(rgb(c(10))).toBe("rgb(254, 242, 242)");
    expect(getComputedStyle(c(10)).boxShadow).toContain("220, 38, 38");
    expect(rgb(c(14))).toBe("rgb(248, 250, 252)");
    // filled notification is white with the md shadow
    expect(rgb(c(4))).toBe("rgb(255, 255, 255)");
    expect(getComputedStyle(c(4)).boxShadow).toContain("30, 58, 138");
    // action and close buttons on filled use the inverse (white) colour
    expect(
      getComputedStyle(c(0).querySelector('[data-slot="toast-action"]')!).color
    ).toBe("rgb(255, 255, 255)");
    expect(
      getComputedStyle(c(0).querySelector('[data-slot="toast-close"]')!).color
    ).toBe("rgb(255, 255, 255)");
  },
};

/** Figma `showTitle`, `showDescription`, `showAction`, `showClose` switched off one by one. */
export const OptionalParts: Story = {
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-4">
      <ToastCard severity="info" title="Title only" showClose={false} />
      <ToastCard severity="success" description="Description only" />
      <ToastCard
        severity="warning"
        title="Title"
        description="No action or close"
        showClose={false}
      />
      <ToastCard
        severity="error"
        title="Everything"
        description="Description"
        actionLabel="Retry"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const cards = canvasElement.querySelectorAll('[data-slot="toast-card"]');
    expect(
      cards[0].querySelector('[data-slot="toast-description"]')
    ).toBeNull();
    expect(cards[0].querySelector('[data-slot="toast-close"]')).toBeNull();
    expect(cards[1].querySelector('[data-slot="toast-title"]')).toBeNull();
    expect(cards[2].querySelector('[data-slot="toast-action"]')).toBeNull();
    expect(cards[3].querySelector('[data-slot="toast-action"]')).not.toBeNull();
  },
};

/** Live toasts through the toast manager: severity in `type`, variant in `data`, optional action. */
export const LiveSeverityAndVariant: Story = {
  render: () => (
    <Toaster>
      <Button
        onClick={() =>
          toast.add({
            type: "success",
            data: { variant: "filled" },
            title: "Saved",
            description: "Your changes are in",
            actionProps: { children: "Undo" },
            timeout: 0,
          })
        }
      >
        Show toast
      </Button>
    </Toaster>
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }));
    const body = within(canvasElement.ownerDocument.body);
    const title = await body.findByText("Saved");
    const root = title.closest('[data-slot="toast"]') as HTMLElement;
    expect(root.getAttribute("data-severity")).toBe("success");
    expect(root.getAttribute("data-variant")).toBe("filled");
    expect(getComputedStyle(root).backgroundColor).toBe("rgb(4, 120, 87)");
    expect(await body.findByRole("button", { name: "Undo" })).toBeVisible();
  },
};
