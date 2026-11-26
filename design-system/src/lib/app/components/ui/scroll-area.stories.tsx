import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ScrollArea } from "./scroll-area";
const meta = {
  title: "Core/Components/Scroll Area",
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
        code: '<ScrollArea className="h-48 rounded-lg border p-4" aria-label="รายการทั้งหมด">{Array.from({ length: 20 }, (_, i) => <p key={i}>รายการที่ {i + 1}</p>)}</ScrollArea>',
        language: "tsx",
      },
    },
  },
  component: ScrollArea,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <ScrollArea
      className="h-48 rounded-lg border p-4"
      aria-label="รายการทั้งหมด"
    >
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i}>รายการที่ {i + 1}</p>
      ))}
    </ScrollArea>
  ),
};

const rows = Array.from({ length: 20 }, (_, i) => (
  <p key={i}>รายการที่ {i + 1}</p>
));

/** Figma `scrollbar`: vertical and horizontal, with and without track. 15px track, 4px padding, 7px thumb. */
export const Scrollbars: Story = {
  render: () => (
    <div className="grid gap-8">
      {([false, true] as const).map((track) => (
        <div key={String(track)} className="flex gap-8">
          <ScrollArea
            orientation="vertical"
            track={track}
            className="h-48 w-48 rounded-lg border"
            aria-label={`vertical ${track}`}
            data-case={`vertical|${track}`}
          >
            <div className="p-4">{rows}</div>
          </ScrollArea>
          <ScrollArea
            orientation="horizontal"
            track={track}
            className="h-24 w-48 rounded-lg border"
            aria-label={`horizontal ${track}`}
            data-case={`horizontal|${track}`}
          >
            <div className="w-[600px] p-4 whitespace-nowrap">
              แถวยาวที่ต้องเลื่อนไปทางขวาเพื่ออ่านให้ครบ
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tok = (name: string) => {
      const probe = document.createElement("span");
      probe.style.color = `var(--cds-${name})`;
      document.body.append(probe);
      const color = getComputedStyle(probe).color;
      probe.remove();
      return color;
    };
    const bar = (c: string) =>
      canvasElement.querySelector<HTMLElement>(
        `[data-case="${c}"] [data-slot="scroll-area-scrollbar"]`
      )!;
    for (const track of [false, true]) {
      const v = bar(`vertical|${track}`);
      const vs = getComputedStyle(v);
      await expect(v.offsetWidth).toBe(15);
      await expect(vs.padding).toBe("4px");
      await expect(vs.backgroundColor).toBe(
        track ? tok("on-surface-sunken") : "rgba(0, 0, 0, 0)"
      );
      const thumb = v.querySelector<HTMLElement>(
        '[data-slot="scroll-area-thumb"]'
      )!;
      await expect(thumb.offsetWidth).toBe(7);
      await expect(getComputedStyle(thumb).backgroundColor).toBe(
        tok("content-placeholder")
      );
      await expect(getComputedStyle(thumb).borderTopLeftRadius).toMatch(
        /9999px|3\.35544e\+07px/
      );
      const h = bar(`horizontal|${track}`);
      await expect(h.offsetHeight).toBe(15);
      await expect(getComputedStyle(h).backgroundColor).toBe(
        track ? tok("on-surface-sunken") : "rgba(0, 0, 0, 0)"
      );
      await expect(
        h.querySelector<HTMLElement>('[data-slot="scroll-area-thumb"]')!
          .offsetHeight
      ).toBe(7);
    }
  },
};
