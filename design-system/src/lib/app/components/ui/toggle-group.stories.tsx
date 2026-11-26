import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { AddRounded } from "../app/icons";
import { LanguageSwitcher } from "../app/language-switcher";
import { SegmentedControl, ToggleGroup, ToggleGroupItem } from "./toggle-group";
const meta = {
  title: "Core/Components/Toggle Group",
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
        code: '<ToggleGroup defaultValue={["list"]} aria-label="รูปแบบแสดงผล"><ToggleGroupItem value="list">รายการ</ToggleGroupItem><ToggleGroupItem value="grid">ตาราง</ToggleGroupItem></ToggleGroup>',
        language: "tsx",
      },
    },
  },
  component: ToggleGroup,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <ToggleGroup defaultValue={["list"]} aria-label="รูปแบบแสดงผล">
      <ToggleGroupItem value="list">รายการ</ToggleGroupItem>
      <ToggleGroupItem value="grid">ตาราง</ToggleGroupItem>
    </ToggleGroup>
  ),
};

const rgb = (e: Element) => getComputedStyle(e).backgroundColor;
const labels = ["One", "Two", "Three"];

/** Figma `toggle-group` appearance default and outline, horizontal and vertical: items 8px apart. */
export const AppearanceAndOrientation: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["default", "outline"] as const).map((variant) => (
        <div
          key={variant}
          className="flex items-start gap-8"
          data-testid={variant}
        >
          <ToggleGroup
            variant={variant}
            defaultValue={["Two"]}
            aria-label={`${variant} horizontal`}
          >
            {labels.map((l) => (
              <ToggleGroupItem key={l} value={l}>
                {l}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <ToggleGroup
            variant={variant}
            orientation="vertical"
            defaultValue={["Two"]}
            aria-label={`${variant} vertical`}
          >
            {labels.map((l) => (
              <ToggleGroupItem key={l} value={l}>
                {l}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const row = canvasElement.querySelector('[data-testid="default"]')!;
    const [h, v] = Array.from(
      row.querySelectorAll('[data-slot="toggle-group"]')
    ) as HTMLElement[];
    expect(getComputedStyle(h).columnGap).toBe("8px");
    expect(h.offsetHeight).toBe(32);
    expect(getComputedStyle(v).flexDirection).toBe("column");
    expect(v.offsetWidth).toBe(64);
    expect(v.offsetHeight).toBe(32 * 3 + 8 * 2);
    const items = h.querySelectorAll('[data-slot="toggle-group-item"]');
    expect(rgb(items[1])).toBe("rgb(238, 249, 255)");
    expect(rgb(items[0])).toBe("rgba(0, 0, 0, 0)");
    const outline = canvasElement.querySelector(
      '[data-testid="outline"] [data-slot="toggle-group-item"]'
    )!;
    expect(getComputedStyle(outline).boxShadow).toContain("226, 232, 240");
  },
};

/** Selecting an item in a group changes the selection (single choice). */
export const Selection: Story = {
  render: () => (
    <ToggleGroup defaultValue={["One"]} aria-label="choice">
      {labels.map((l) => (
        <ToggleGroupItem key={l} value={l}>
          {l}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const one = canvas.getByRole("button", { name: "One" });
    const two = canvas.getByRole("button", { name: "Two" });
    expect(one.getAttribute("aria-pressed")).toBe("true");
    await userEvent.click(two);
    expect(two.getAttribute("aria-pressed")).toBe("true");
    expect(one.getAttribute("aria-pressed")).toBe("false");
  },
};

/** Figma segmented look: items on a `on-surface/subtle` pill rail, the selected one is a white chip. */
export const Segmented: Story = {
  render: () => (
    <SegmentedControl defaultValue={["Two"]} aria-label="segmented">
      {labels.map((l) => (
        <ToggleGroupItem key={l} value={l}>
          {l}
        </ToggleGroupItem>
      ))}
    </SegmentedControl>
  ),
  play: async ({ canvasElement }) => {
    const rail = canvasElement.querySelector(
      '[data-slot="toggle-group"]'
    ) as HTMLElement;
    expect(rgb(rail)).toBe("rgb(248, 250, 252)");
    expect(getComputedStyle(rail).paddingLeft).toBe("4px");
    expect(getComputedStyle(rail).columnGap).toBe("4px");
    expect(rail.offsetHeight).toBe(40);
    const items = rail.querySelectorAll('[data-slot="toggle-group-item"]');
    expect(rgb(items[1])).toBe("rgb(255, 255, 255)");
    expect(rgb(items[0])).toBe("rgba(0, 0, 0, 0)");
  },
};

/** Figma `language-switcher`: globe icon and TH / EN, 160 x 40, with the disabled state. */
export const LanguageSwitchers: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <LanguageSwitcher />
      <LanguageSwitcher defaultValue="EN" />
      <LanguageSwitcher disabled />
    </div>
  ),
  play: async ({ canvasElement, canvas, userEvent }) => {
    const rails = canvasElement.querySelectorAll('[data-slot="toggle-group"]');
    expect([
      (rails[0] as HTMLElement).offsetWidth,
      (rails[0] as HTMLElement).offsetHeight,
    ]).toEqual([160, 40]);
    const th = rails[0].querySelectorAll('[data-slot="toggle-group-item"]')[0];
    const en = rails[0].querySelectorAll('[data-slot="toggle-group-item"]')[1];
    expect(th.getAttribute("aria-pressed")).toBe("true");
    await userEvent.click(en);
    expect(en.getAttribute("aria-pressed")).toBe("true");
    // clicking the selected one again keeps it selected
    await userEvent.click(en);
    expect(en.getAttribute("aria-pressed")).toBe("true");
    const dis = rails[2].querySelector(
      '[data-slot="toggle-group-item"]'
    ) as HTMLButtonElement;
    expect(getComputedStyle(dis).color).toBe("rgb(148, 163, 184)");
    void canvas;
  },
};

// ---- Figma toggle-button / toggle-button-group (variant="joined") --------------------------------
const tok = (name: string) => {
  const probe = document.createElement("span");
  probe.style.color = `var(--cds-${name})`;
  document.body.append(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
};
const joinedSizes = ["xs", "sm", "default", "lg"] as const;
const joinedLabels = ["One", "Two", "Three", "Four", "Five"];

/** Figma `toggle-button-group`: 4 sizes × horizontal / vertical, first cell selected. */
export const JoinedSizesAndOrientation: Story = {
  render: () => (
    <div className="grid gap-8">
      {joinedSizes.map((size) => (
        <div key={size} className="flex items-start gap-12">
          {(["horizontal", "vertical"] as const).map((orientation) => (
            <ToggleGroup
              key={orientation}
              variant="joined"
              size={size}
              orientation={orientation}
              defaultValue={["One"]}
              aria-label={`${size} ${orientation}`}
              data-case={`${size}|${orientation}`}
            >
              {joinedLabels.map((label) => (
                <ToggleGroupItem key={label} value={label}>
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          ))}
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const q = (c: string) =>
      canvasElement.querySelector<HTMLElement>(`[data-case="${c}"]`)!;
    const spec = {
      xs: { h: 24, w: 206, vw: 48, px: "8px", fs: "12px", lh: "16px" },
      sm: { h: 32, w: 246, vw: 56, px: "12px", fs: "12px", lh: "16px" },
      default: { h: 36, w: 307, vw: 70, px: "16px", fs: "14px", lh: "20px" },
      lg: { h: 48, w: 409, vw: 91, px: "24px", fs: "16px", lh: "24px" },
    } as const;
    for (const size of joinedSizes) {
      const g = q(`${size}|horizontal`);
      const gs = getComputedStyle(g);
      await expect(g.offsetHeight).toBe(spec[size].h);
      await expect(Math.abs(g.offsetWidth - spec[size].w)).toBeLessThanOrEqual(
        3
      );
      await expect(gs.boxShadow).toContain(tok("border-default"));
      await expect(gs.boxShadow).toContain("0px 0px 0px 1px inset");
      await expect(gs.borderTopLeftRadius).toBe("8px");
      await expect(["normal", "0px"]).toContain(gs.columnGap);
      const items = Array.from(
        g.querySelectorAll<HTMLElement>('[data-slot="toggle-group-item"]')
      );
      await expect(items).toHaveLength(5);
      const cs0 = getComputedStyle(items[0]);
      await expect([
        cs0.paddingLeft,
        cs0.fontSize,
        cs0.lineHeight,
        cs0.fontWeight,
      ]).toEqual([spec[size].px, spec[size].fs, spec[size].lh, "500"]);
      await expect(cs0.backgroundColor).toBe(
        tok("brand-primary-on-surface-default")
      );
      await expect(cs0.color).toBe(tok("brand-primary-content-on-fill"));
      await expect(cs0.borderLeftWidth).toBe("0px");
      const cs1 = getComputedStyle(items[1]);
      await expect([cs1.borderLeftWidth, cs1.borderLeftColor]).toEqual([
        "1px",
        tok("border-default"),
      ]);
      await expect(cs1.color).toBe(tok("content-secondary"));
      await expect(cs1.backgroundColor).toBe("rgba(0, 0, 0, 0)");
      const v = q(`${size}|vertical`);
      await expect(v.offsetHeight).toBe(spec[size].h * 5);
      await expect(Math.abs(v.offsetWidth - spec[size].vw)).toBeLessThanOrEqual(
        3
      );
      const vItems = Array.from(
        v.querySelectorAll<HTMLElement>('[data-slot="toggle-group-item"]')
      );
      await expect([
        getComputedStyle(vItems[1]).borderTopWidth,
        getComputedStyle(vItems[1]).borderLeftWidth,
      ]).toEqual(["1px", "0px"]);
      await expect(vItems[1].offsetWidth).toBe(v.clientWidth);
    }
  },
};

/** Disabled cells (unselected and selected) and an icon cell. */
export const JoinedStatesAndIcon: Story = {
  render: () => (
    <div className="grid gap-6">
      <ToggleGroup
        variant="joined"
        defaultValue={["b"]}
        aria-label="states"
        data-case="states"
      >
        <ToggleGroupItem value="a" disabled>
          Off
        </ToggleGroupItem>
        <ToggleGroupItem value="b" disabled>
          On
        </ToggleGroupItem>
        <ToggleGroupItem value="c">Ready</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        variant="joined"
        size="lg"
        defaultValue={["x"]}
        aria-label="icons"
        data-case="icons"
      >
        <ToggleGroupItem value="x">
          <AddRounded />
          Add
        </ToggleGroupItem>
        <ToggleGroupItem value="y">
          <AddRounded />
          More
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const q = (c: string) =>
      canvasElement.querySelector<HTMLElement>(`[data-case="${c}"]`)!;
    const [off, on, ready] = Array.from(
      q("states").querySelectorAll<HTMLElement>(
        '[data-slot="toggle-group-item"]'
      )
    );
    await expect(getComputedStyle(off).color).toBe(tok("content-disabled"));
    await expect(getComputedStyle(off).backgroundColor).toBe(
      "rgba(0, 0, 0, 0)"
    );
    await expect(getComputedStyle(on).color).toBe(tok("content-disabled"));
    await expect(getComputedStyle(on).backgroundColor).toBe(
      tok("on-surface-action-disabled")
    );
    await expect(getComputedStyle(ready).color).toBe(tok("content-secondary"));
    const icon = q("icons").querySelector("svg")!;
    await expect(icon.getBoundingClientRect().width).toBe(24);
  },
};
