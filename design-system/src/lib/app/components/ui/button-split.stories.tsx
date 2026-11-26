import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { ArrowBackRounded } from "@/lib/app/components/app/icons";
import { DropdownMenuItem } from "./dropdown-menu";
import { ButtonSplit } from "./button-split";

const menu = (
  <>
    <DropdownMenuItem>Save as draft</DropdownMenuItem>
    <DropdownMenuItem>Save and close</DropdownMenuItem>
  </>
);
const sizes = ["lg", "default", "sm"] as const;
const colors = ["primary", "destructive"] as const;

const meta = {
  title: "Core/Components/Button Split",
  component: ButtonSplit,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Figma `button-split`: main action plus a menu trigger in one pill (color primary | destructive, size sm | default | lg, disabled). Hover and pressed fill the whole pill. The trigger opens a DropdownMenu with caller-supplied items. See BUTTON-SPLIT-FIGMA.md.",
      },
    },
  },
  args: { children: "Label", menu, startIcon: <ArrowBackRounded /> },
} satisfies Meta<typeof ButtonSplit>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "More options" }));
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(
        body.getByRole("menuitem", { name: "Save as draft" })
      ).toBeVisible()
    );
    await userEvent.keyboard("{Escape}");
  },
};

export const ColorsAndSizes: Story = {
  render: (args) => (
    <div className="grid gap-6">
      {colors.map((color) => (
        <div key={color} className="flex flex-wrap items-center gap-6">
          {sizes.map((size) => (
            <ButtonSplit key={size} {...args} color={color} size={size} />
          ))}
          <ButtonSplit {...args} color={color} disabled />
        </div>
      ))}
    </div>
  ),
};

export const Action: Story = {
  args: { onAction: undefined },
  render: function Render(args) {
    let clicks = 0;
    return (
      <ButtonSplit
        {...args}
        onAction={() => {
          clicks += 1;
          document.body.dataset.splitClicks = String(clicks);
        }}
      />
    );
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Label" }));
    await expect(document.body.dataset.splitClicks).toBe("1");
  },
};

export const FigmaSpecs: Story = {
  render: (args) => (
    <div className="grid gap-6">
      {colors.map((color) =>
        sizes.map((size) => (
          <ButtonSplit key={color + size} {...args} color={color} size={size} />
        ))
      )}
      <ButtonSplit {...args} disabled />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const groups = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('[data-slot="button-split"]')
    );
    await expect(groups).toHaveLength(7);
    const heights = { lg: 48, default: 40, sm: 32 } as const;
    const fills = {
      primary: "rgb(23, 137, 250)",
      destructive: "rgb(220, 38, 38)",
    } as const;
    const dividers = {
      primary: "rgb(45, 164, 255)",
      destructive: "rgb(239, 68, 68)",
    } as const;
    for (const group of groups.slice(0, 6)) {
      const size = group.dataset.size as keyof typeof heights;
      const color = group.dataset.color as keyof typeof fills;
      await expect(group.offsetHeight).toBe(heights[size]);
      await expect(getComputedStyle(group).backgroundColor).toBe(fills[color]);
      await expect(getComputedStyle(group).borderRadius).toMatch(
        /9999px|3\.35544e\+07px/
      );
      const trigger = group.querySelector<HTMLElement>(
        '[data-slot="button-split-trigger"]'
      )!;
      await expect(trigger.offsetWidth).toBe(heights[size]);
      await expect(trigger.offsetHeight).toBe(heights[size]);
      await expect(getComputedStyle(trigger, "::before").backgroundColor).toBe(
        dividers[color]
      );
      await expect(getComputedStyle(trigger, "::before").width).toBe("1px");
      const action = group.querySelector<HTMLElement>(
        '[data-slot="button-split-action"]'
      )!;
      const cs = getComputedStyle(action);
      const pad = {
        lg: ["12px", "24px"],
        default: ["8px", "16px"],
        sm: ["8px", "12px"],
      }[size];
      await expect([cs.paddingTop, cs.paddingLeft]).toEqual(pad);
      await expect([cs.fontSize, cs.lineHeight, cs.fontWeight]).toEqual(
        size === "sm" ? ["12px", "16px", "500"] : ["16px", "24px", "500"]
      );
      await expect(getComputedStyle(action).color).toBe("rgb(255, 255, 255)");
    }
    const [lg] = groups;
    await expect(lg.offsetWidth).toBeGreaterThan(150);
    const icon = lg.querySelector<SVGElement>(
      '[data-slot="button-split-action"] svg'
    )!;
    await expect(icon.getBoundingClientRect().width).toBe(24);
    const smIcon = groups[2].querySelector<SVGElement>(
      '[data-slot="button-split-action"] svg'
    )!;
    await expect(smIcon.getBoundingClientRect().width).toBe(16);
    const disabled = groups[6];
    await expect(getComputedStyle(disabled).backgroundColor).toBe(
      "rgb(241, 245, 249)"
    );
    await expect(
      getComputedStyle(
        disabled.querySelector('[data-slot="button-split-action"]')!
      ).color
    ).toBe("rgb(148, 163, 184)");
    await expect(
      getComputedStyle(
        disabled.querySelector<HTMLElement>(
          '[data-slot="button-split-trigger"]'
        )!,
        "::before"
      ).backgroundColor
    ).toBe("rgb(241, 245, 249)");
  },
};
