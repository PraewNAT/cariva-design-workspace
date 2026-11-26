import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";
import {
  AddRounded,
  ArrowBackRounded,
  ArrowForwardRounded,
  DownloadRounded,
} from "../app/icons";
import { Button } from "./button";
import { Spinner } from "./spinner";
const meta = {
  title: "Core/Components/Button",
  id: "core-button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "บันทึก" },
  parameters: {
    docs: {
      description: {
        component:
          "shadcn Base UI Button / Core recipe เดียวกันบนหน้าและ Dialog ขนาด default คือ medium 16/24 + padding 8/16 = 40px ไม่กำหนด height ใช้ existing size/variant API; loading ใช้ disabled + Spinner",
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { onClick: fn() },
  play: async ({ canvas, userEvent, args }) => {
    const b = canvas.getByRole("button");
    b.focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          "default",
          "outline",
          "secondary",
          "ghost",
          "destructive",
          "link",
          "decorative",
        ] as const
      ).map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};
export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Figma: variant (contained → default, outlined → outline, text → ghost) × color (primary, error → destructive, neutral → secondary) และ elevated (ดู story Elevated) Figma ไม่มี contained + neutral จึงใช้ลุค secondary ของ shadcn",
      },
    },
  },
  render: () => (
    <div className="grid gap-4">
      {(["default", "outline", "ghost"] as const).map((v) => (
        <div key={v} className="flex flex-wrap items-center gap-4">
          {(["primary", "destructive", "secondary"] as const).map((c) => (
            <Button key={c} variant={v} color={c}>
              {v} / {c}
            </Button>
          ))}
          <Button variant={v} disabled>
            {v} / disabled
          </Button>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    const bg = (name: string) =>
      getComputedStyle(canvas.getByRole("button", { name })).backgroundColor;
    await expect(bg("default / primary")).toBe("rgb(23, 137, 250)");
    await expect(bg("default / destructive")).not.toBe(bg("default / primary"));
    await expect(bg("default / disabled")).not.toBe(bg("default / primary"));
    await expect(
      canvas.getByRole("button", { name: "outline / primary" })
    ).toHaveAttribute("data-color", "primary");
    await expect(
      getComputedStyle(
        canvas.getByRole("button", { name: "default / disabled" })
      ).opacity
    ).toBe("1");
  },
};
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button>Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon-sm" aria-label="ดาวน์โหลดขนาดเล็ก">
        <DownloadRounded />
      </Button>
      <Button size="icon" aria-label="ดาวน์โหลดขนาดกลาง">
        <DownloadRounded />
      </Button>
      <Button size="icon-lg" aria-label="ดาวน์โหลดขนาดใหญ่">
        <DownloadRounded />
      </Button>
    </div>
  ),
  play: async ({ canvas }) => {
    for (const [name, height] of [
      ["Small", 32],
      ["Medium", 40],
      ["Large", 48],
      ["ดาวน์โหลดขนาดเล็ก", 32],
      ["ดาวน์โหลดขนาดกลาง", 40],
      ["ดาวน์โหลดขนาดใหญ่", 48],
    ] as const)
      await waitFor(() =>
        expect(
          canvas.getByRole("button", { name }).getBoundingClientRect().height
        ).toBe(height)
      );
    // Figma small is 12/16 with padding 8/12; large has padding 12/24
    const small = getComputedStyle(
      canvas.getByRole("button", { name: "Small" })
    );
    await expect([
      small.fontSize,
      small.lineHeight,
      small.paddingTop,
      small.paddingLeft,
    ]).toEqual(["12px", "16px", "8px", "12px"]);
    const large = getComputedStyle(
      canvas.getByRole("button", { name: "Large" })
    );
    await expect([large.paddingTop, large.paddingLeft]).toEqual([
      "12px",
      "24px",
    ]);
  },
};
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <DownloadRounded />
        ดาวน์โหลดบันทึก
      </>
    ),
  },
  play: async ({ canvas }) => {
    const b = canvas.getByRole("button");
    await expect(getComputedStyle(b.querySelector("svg")!).color).toBe(
      getComputedStyle(b).color
    );
  },
};
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button")).toBeDisabled();
  },
};
export const Loading: Story = {
  args: {
    disabled: true,
    "aria-busy": true,
    children: (
      <>
        <Spinner />
        กำลังบันทึก
      </>
    ),
  },
};
export const LongThai: Story = {
  args: { children: "บันทึกรายละเอียดผลการตรวจสุขภาพสำหรับผู้รับบริการ" },
  globals: { viewport: { value: "mobile390", isRotated: false } },
  render: (args) => (
    <div className="max-w-full">
      <Button {...args} className="max-w-full whitespace-normal break-words" />
    </div>
  ),
};
export const BackOffice: Story = {
  decorators: [
    (Story) => (
      <div data-product="backOffice">
        <Story />
      </div>
    ),
  ],
};

/** Figma `elevated`: white surface, shadow/sm → hover shadow/xl → pressed shadow/md; no shadow when disabled. */
export const Elevated: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="elevated" aria-label="หลัก">
        หลัก
      </Button>
      <Button variant="elevated" color="secondary" aria-label="รอง">
        รอง
      </Button>
      <Button variant="elevated" disabled aria-label="ปิด">
        ปิด
      </Button>
    </div>
  ),
  play: async ({ canvas }) => {
    const primary = canvas.getByLabelText("หลัก");
    const cs = getComputedStyle(primary);
    await expect(cs.backgroundColor).toBe("rgb(255, 255, 255)");
    await expect(cs.color).toBe("rgb(23, 137, 250)");
    await expect(cs.boxShadow).toContain("30, 58, 138");
    await expect(getComputedStyle(canvas.getByLabelText("รอง")).color).toBe(
      "rgb(15, 23, 42)"
    );
    const dis = getComputedStyle(canvas.getByLabelText("ปิด"));
    await expect(dis.backgroundColor).toBe("rgb(241, 245, 249)");
    await expect(dis.boxShadow).not.toContain("30, 58, 138");
  },
};

// ---- Figma button-icon / button-loading / button-link / button-decorative ----------------------
const tok = (name: string) => {
  const probe = document.createElement("span");
  probe.style.color = `var(--cds-${name})`;
  document.body.append(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
};
const iconSizes = { "icon-lg": 48, icon: 40, "icon-sm": 32 } as const;
const colorsAll = ["primary", "destructive", "secondary"] as const;
const variantsAll = ["default", "outline", "ghost"] as const;

/** Figma `button-icon`: 3 variants × 3 colors × 3 sizes (code sizes icon-lg | icon | icon-sm = Figma lg | default | sm). */
export const IconButtons: Story = {
  render: () => (
    <div className="grid gap-4">
      {variantsAll.map((variant) =>
        colorsAll.map((color) => (
          <div key={variant + color} className="flex items-center gap-4">
            {(Object.keys(iconSizes) as (keyof typeof iconSizes)[]).map(
              (size) => (
                <Button
                  key={size}
                  variant={variant}
                  color={color}
                  size={size}
                  aria-label={`${variant}-${color}-${size}`}
                  data-case={`${variant}|${color}|${size}`}
                >
                  <AddRounded />
                </Button>
              )
            )}
            <Button
              variant={variant}
              color={color}
              size="icon"
              disabled
              aria-label={`${variant}-${color}-disabled`}
              data-case={`${variant}|${color}|disabled`}
            >
              <AddRounded />
            </Button>
          </div>
        ))
      )}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const q = (c: string) =>
      canvasElement.querySelector<HTMLElement>(`[data-case="${c}"]`)!;
    const fill = {
      primary: [
        "brand-primary-on-surface-default",
        "brand-primary-content-on-fill",
      ],
      destructive: [
        "status-error-on-surface-default",
        "status-error-content-on-fill",
      ],
      secondary: ["neutral-on-surface-default", "neutral-content-default"],
    } as const;
    const text = {
      primary: "brand-primary-content-default",
      destructive: "status-error-content-default",
      secondary: "neutral-content-default",
    } as const;
    const ring = {
      primary: "brand-primary-border-strong",
      destructive: "border-error",
      secondary: "neutral-border-default",
    } as const;
    for (const color of colorsAll) {
      const d = getComputedStyle(q(`default|${color}|icon`));
      await expect(d.backgroundColor).toBe(tok(fill[color][0]));
      await expect(d.color).toBe(tok(fill[color][1]));
      const o = getComputedStyle(q(`outline|${color}|icon`));
      await expect(o.backgroundColor).toBe("rgba(0, 0, 0, 0)");
      await expect(o.color).toBe(tok(text[color]));
      await expect(o.boxShadow).toContain(tok(ring[color]));
      const g = getComputedStyle(q(`ghost|${color}|icon`));
      await expect(g.backgroundColor).toBe("rgba(0, 0, 0, 0)");
      await expect(g.color).toBe(tok(text[color]));
      for (const variant of variantsAll) {
        const dis = getComputedStyle(q(`${variant}|${color}|disabled`));
        await expect(dis.backgroundColor).toBe(
          tok("on-surface-action-disabled")
        );
        await expect(dis.color).toBe(tok("content-disabled"));
      }
    }
    for (const [size, px] of Object.entries(iconSizes)) {
      const b = q(`default|primary|${size}`);
      await expect([b.offsetWidth, b.offsetHeight]).toEqual([px, px]);
      const svg = b.querySelector("svg")!;
      await expect(svg.getBoundingClientRect().width).toBe(
        size === "icon-sm" ? 16 : 24
      );
      await expect(getComputedStyle(b).paddingTop).toBe(
        size === "icon-lg" ? "12px" : "8px"
      );
    }
    await expect(
      getComputedStyle(q("outline|primary|icon")).boxShadow
    ).toContain("0px 0px 0px 1px");
  },
};

const sizeSpec = {
  sm: { h: 32, pad: ["8px", "12px"], gap: "4px", fs: "12px", icon: 16 },
  default: { h: 40, pad: ["8px", "16px"], gap: "8px", fs: "16px", icon: 24 },
  lg: { h: 48, pad: ["12px", "24px"], gap: "12px", fs: "16px", icon: 24 },
} as const;

/** Figma `button-loading`: 3 variants × 3 sizes, always busy: disabled colours, outline keeps its border, ghost has no fill. */
export const LoadingButtons: Story = {
  render: () => (
    <div className="grid gap-4">
      {variantsAll.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          {(["sm", "default", "lg"] as const).map((size) => (
            <Button
              key={size}
              variant={variant}
              size={size}
              disabled
              aria-busy
              data-case={`${variant}|${size}`}
            >
              <Spinner />
              Label
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const q = (c: string) =>
      canvasElement.querySelector<HTMLElement>(`[data-case="${c}"]`)!;
    for (const variant of variantsAll) {
      for (const size of ["sm", "default", "lg"] as const) {
        const b = q(`${variant}|${size}`);
        const cs = getComputedStyle(b);
        const spec = sizeSpec[size];
        await expect(b.offsetHeight).toBe(spec.h);
        await expect([cs.paddingTop, cs.paddingLeft]).toEqual([...spec.pad]);
        await expect(cs.columnGap).toBe(spec.gap);
        await expect([cs.fontSize, cs.fontWeight]).toEqual([spec.fs, "500"]);
        await expect(cs.color).toBe(tok("content-disabled"));
        await expect(
          b.querySelector("svg")!.getBoundingClientRect().width
        ).toBe(spec.icon);
        await expect(cs.borderRadius).toMatch(/9999px|3\.35544e\+07px|12px/);
      }
    }
    await expect(getComputedStyle(q("default|default")).backgroundColor).toBe(
      tok("on-surface-action-disabled")
    );
    const outline = getComputedStyle(q("outline|default"));
    await expect(outline.backgroundColor).toBe("rgba(0, 0, 0, 0)");
    await expect(outline.boxShadow).toContain(tok("border-default"));
    await expect(getComputedStyle(q("ghost|default")).backgroundColor).toBe(
      "rgba(0, 0, 0, 0)"
    );
    await expect(
      Math.abs(q("default|default").offsetWidth - 104)
    ).toBeLessThanOrEqual(2);
  },
};

/** Figma `button-link`: link colours, underlined label, no horizontal padding, radius 12, leading + trailing icon. */
export const LinkButtons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Button
          key={size}
          variant="link"
          size={size}
          data-case={`link|${size}`}
        >
          <ArrowBackRounded />
          Label
          <ArrowForwardRounded />
        </Button>
      ))}
      <Button variant="link" disabled data-case="link|disabled">
        <ArrowBackRounded />
        Label
        <ArrowForwardRounded />
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const q = (c: string) =>
      canvasElement.querySelector<HTMLElement>(`[data-case="${c}"]`)!;
    const heights = { sm: 32, default: 40, lg: 48 } as const;
    for (const size of ["sm", "default", "lg"] as const) {
      const b = q(`link|${size}`);
      const cs = getComputedStyle(b);
      await expect(b.offsetHeight).toBe(heights[size]);
      await expect([cs.paddingLeft, cs.paddingRight]).toEqual(["0px", "0px"]);
      await expect(cs.paddingTop).toBe(size === "lg" ? "12px" : "8px");
      await expect(cs.columnGap).toBe(sizeSpec[size].gap);
      await expect(cs.color).toBe(tok("content-link-default"));
      await expect(cs.textDecorationLine).toBe("underline");
      await expect(cs.borderRadius).toBe("12px");
      await expect([cs.fontSize, cs.fontWeight]).toEqual([
        sizeSpec[size].fs,
        "500",
      ]);
      await expect(b.querySelector("svg")!.getBoundingClientRect().width).toBe(
        sizeSpec[size].icon
      );
    }
    await expect(
      Math.abs(q("link|default").offsetWidth - 104)
    ).toBeLessThanOrEqual(2);
    await expect(getComputedStyle(q("link|disabled")).color).toBe(
      tok("content-disabled")
    );
  },
};

/** Figma `button-decorative`: solid navy base + radial gradient, hover glow, pressed 85%, disabled surface. */
export const DecorativeButtons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Button
          key={size}
          variant="decorative"
          size={size}
          data-case={`deco|${size}`}
        >
          <ArrowBackRounded />
          Label
          <ArrowForwardRounded />
        </Button>
      ))}
      <Button variant="decorative" disabled data-case="deco|disabled">
        <ArrowBackRounded />
        Label
        <ArrowForwardRounded />
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const q = (c: string) =>
      canvasElement.querySelector<HTMLElement>(`[data-case="${c}"]`)!;
    const heights = { sm: 32, default: 40, lg: 48 } as const;
    for (const size of ["sm", "default", "lg"] as const) {
      const b = q(`deco|${size}`);
      const cs = getComputedStyle(b);
      await expect(b.offsetHeight).toBe(heights[size]);
      await expect([cs.paddingTop, cs.paddingLeft]).toEqual([
        ...sizeSpec[size].pad,
      ]);
      await expect(cs.columnGap).toBe(sizeSpec[size].gap);
      await expect(cs.backgroundColor).toBe("rgb(25, 36, 80)");
      await expect(cs.backgroundImage).toContain("radial-gradient");
      await expect(cs.backgroundImage).toContain("rgb(23, 137, 250) 75%");
      await expect(cs.backgroundImage).toContain("rgb(85, 235, 255)");
      await expect(cs.color).toBe("rgb(255, 255, 255)");
      await expect(cs.borderRadius).toMatch(/9999px|3\.35544e\+07px|12px/);
    }
    await expect(
      Math.abs(q("deco|default").offsetWidth - 136)
    ).toBeLessThanOrEqual(2);
    const dis = getComputedStyle(q("deco|disabled"));
    await expect(dis.backgroundColor).toBe(tok("on-surface-action-disabled"));
    await expect(dis.backgroundImage).toBe("none");
    await expect(dis.color).toBe(tok("content-disabled"));
  },
};
