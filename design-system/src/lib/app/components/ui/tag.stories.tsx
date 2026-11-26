import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { CheckRounded } from "../app/icons";
import { Tag, TagColor, tagColors } from "./tag";

const meta = {
  title: "Core/Components/Tag",
  tags: ["autodocs"],
  component: Tag,
  parameters: {
    docs: {
      description: {
        component:
          "Tag ตาม Figma `tag` และ `tag-color`: ป้ายสถานะ หมวดหมู่ หรือคุณสมบัติ ไม่ใช่ overlay (ใช้ Badge) และกดไม่ได้ (ใช้ Chip)",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;

const colors = ["default", "secondary", "error", "success", "warning"] as const;
const sizes = ["sm", "default", "lg"] as const;
const rgb = (e: Element) => getComputedStyle(e).backgroundColor;

/** Figma `tag` variant=filled, content=label, every color and size. */
export const Filled: Story = {
  render: () => (
    <div className="flex flex-col gap-4" data-testid="filled">
      {sizes.map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-3">
          {colors.map((color) => (
            <Tag key={color} size={size} color={color}>
              Label
            </Tag>
          ))}
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tags = canvasElement.querySelectorAll('[data-slot="tag"]');
    expect([
      (tags[0] as HTMLElement).offsetHeight,
      (tags[5] as HTMLElement).offsetHeight,
      (tags[10] as HTMLElement).offsetHeight,
    ]).toEqual([20, 24, 36]);
    expect(getComputedStyle(tags[0]).paddingLeft).toBe("8px");
    expect(getComputedStyle(tags[10]).paddingLeft).toBe("12px");
    expect(rgb(tags[5])).toBe("rgb(23, 137, 250)");
    expect(rgb(tags[6])).toBe("rgb(241, 245, 249)");
    expect(rgb(tags[7])).toBe("rgb(220, 38, 38)");
    expect(rgb(tags[8])).toBe("rgb(4, 120, 87)");
    expect(rgb(tags[9])).toBe("rgb(217, 119, 6)");
    expect([
      getComputedStyle(tags[5]).fontSize,
      getComputedStyle(tags[5]).lineHeight,
    ]).toEqual(["12px", "16px"]);
    expect([
      getComputedStyle(tags[10]).fontSize,
      getComputedStyle(tags[10]).lineHeight,
    ]).toEqual(["14px", "20px"]);
  },
};

/** Figma `tag` variant=outlined (default color only): transparent with a 1px `border/default` ring. */
export const Outlined: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {sizes.map((size) => (
        <Tag key={size} variant="outlined" size={size}>
          Label
        </Tag>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const t = canvasElement.querySelector('[data-slot="tag"]') as HTMLElement;
    expect(rgb(t)).toBe("rgba(0, 0, 0, 0)");
    expect(getComputedStyle(t).boxShadow).toContain("226, 232, 240");
    expect(getComputedStyle(t).color).toBe("rgb(15, 23, 42)");
  },
};

/** Figma `tag` content=count: round counters 20 / 24 / 32. */
export const Count: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          {colors.map((color) => (
            <Tag key={color} size={size} color={color} content="count">
              8
            </Tag>
          ))}
          <Tag variant="outlined" size={size} content="count">
            8
          </Tag>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tags = canvasElement.querySelectorAll('[data-slot="tag"]');
    expect([
      (tags[0] as HTMLElement).offsetWidth,
      (tags[6] as HTMLElement).offsetWidth,
      (tags[12] as HTMLElement).offsetWidth,
    ]).toEqual([20, 24, 32]);
    expect(getComputedStyle(tags[0]).borderRadius).toMatch(/9999|3.35544e\+07/);
  },
};

/** Figma `startIconVisible` / `endIconVisible`: 12px icons before and after the label. */
export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Tag startIcon={<CheckRounded />}>Label</Tag>
      <Tag endIcon={<CheckRounded />}>Label</Tag>
      <Tag
        startIcon={<CheckRounded />}
        endIcon={<CheckRounded />}
        color="success"
      >
        Label
      </Tag>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector(
      '[data-slot="tag"] svg'
    ) as SVGElement;
    expect(svg.getBoundingClientRect().width).toBe(12);
    expect(getComputedStyle(svg.parentElement!).columnGap).toBe("4px");
  },
};

/** Figma `tag-color`: eight accent families, height 20, `A02` fill and `A05` text. */
export const ColorTags: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(Object.keys(tagColors) as (keyof typeof tagColors)[]).map((c) => (
        <TagColor key={c} color={c} startIcon={<CheckRounded />}>
          Label
        </TagColor>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tags = canvasElement.querySelectorAll('[data-slot="tag-color"]');
    expect(tags.length).toBe(8);
    expect((tags[0] as HTMLElement).offsetHeight).toBe(20);
    expect(rgb(tags[0])).toBe("rgb(216, 240, 255)");
    expect(rgb(tags[1])).toBe("rgb(224, 242, 254)");
    expect(getComputedStyle(tags[1]).color).toBe("rgb(3, 105, 161)");
  },
};
