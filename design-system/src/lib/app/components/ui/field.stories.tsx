import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./field";
import { Input } from "./input";
const meta = {
  title: "Core/Components/Input/Field",
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
        code: '<FieldGroup><Field><FieldLabel htmlFor="field-name">ชื่อ</FieldLabel><Input id="field-name" placeholder="กรอกชื่อ" /><FieldDescription>ใช้ชื่อตามเอกสาร</FieldDescription></Field><Field data-invalid><FieldLabel htmlFor="field-invalid">รหัส</FieldLabel><Input id="field-invalid" aria-invalid aria-describedby="field-error" /><FieldError id="field-error">กรุณากรอกรหัส</FieldError></Field></FieldGroup>',
        language: "tsx",
      },
    },
  },
  component: Field,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="field-name">ชื่อ</FieldLabel>
        <Input id="field-name" placeholder="กรอกชื่อ" />
        <FieldDescription>ใช้ชื่อตามเอกสาร</FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="field-invalid">รหัส</FieldLabel>
        <Input id="field-invalid" aria-invalid aria-describedby="field-error" />
        <FieldError id="field-error">กรุณากรอกรหัส</FieldError>
      </Field>
    </FieldGroup>
  ),
};

const hexOf = (c: string) =>
  "#" +
  (c.match(/\d+/g) ?? [])
    .slice(0, 3)
    .map((x) => Number(x).toString(16).padStart(2, "0"))
    .join("");
const ringColour = (el: Element) =>
  hexOf(
    (getComputedStyle(el).boxShadow.match(/rgba?\([^)]+\)/g) ?? [])
      .filter((c) => !/, 0\)$/.test(c))
      .pop() ?? ""
  );

/** Figma `input`: 40px (default) and 48px (lg) controls, label 12/16 and 14/20, helper 12/16, gap 4. */
export const Sizes: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="size-default" secondary="optional">
          Label
        </FieldLabel>
        <Input id="size-default" placeholder="Placeholder" />
        <FieldDescription>Help text</FieldDescription>
      </Field>
      <Field size="lg">
        <FieldLabel htmlFor="size-lg">Label</FieldLabel>
        <Input id="size-lg" size="lg" placeholder="Placeholder" />
        <FieldDescription>Help text</FieldDescription>
      </Field>
    </FieldGroup>
  ),
  play: async ({ canvas, canvasElement }) => {
    const small = canvasElement.querySelector("#size-default") as HTMLElement;
    const large = canvasElement.querySelector("#size-lg") as HTMLElement;
    await expect([
      small.getBoundingClientRect().height,
      large.getBoundingClientRect().height,
    ]).toEqual([40, 48]);
    const s = getComputedStyle(small);
    await expect([
      s.paddingTop,
      s.paddingLeft,
      s.fontSize,
      s.lineHeight,
    ]).toEqual(["8px", "16px", "16px", "24px"]);
    const l = getComputedStyle(large);
    await expect([l.paddingTop, l.paddingLeft]).toEqual(["12px", "16px"]);
    // ring is the 1px border: default, then 2px on focus
    await expect(ringColour(small)).toBe("#e2e8f0");
    const labelSm = getComputedStyle(canvas.getAllByText("Label")[0]);
    const labelLg = getComputedStyle(canvas.getAllByText("Label")[1]);
    await expect([
      labelSm.fontSize,
      labelSm.lineHeight,
      labelSm.fontWeight,
    ]).toEqual(["12px", "16px", "500"]);
    await expect([labelLg.fontSize, labelLg.lineHeight]).toEqual([
      "14px",
      "20px",
    ]);
    const help = getComputedStyle(canvas.getAllByText("Help text")[0]);
    await expect([help.fontSize, help.lineHeight, hexOf(help.color)]).toEqual([
      "12px",
      "16px",
      "#334155",
    ]);
    await expect(canvas.getByText("optional")).toBeVisible();
  },
};

/** Figma input states: hover border/strong, focus 2px border/system, error 2px border/error, disabled colours. */
export const States: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <Input aria-label="normal" placeholder="normal" />
      </Field>
      <Field>
        <Input aria-label="invalid" placeholder="invalid" aria-invalid />
      </Field>
      <Field data-disabled="true">
        <FieldLabel htmlFor="field-disabled-state">Label ปิดใช้งาน</FieldLabel>
        <Input
          id="field-disabled-state"
          aria-label="disabled"
          placeholder="disabled"
          disabled
        />
      </Field>
    </FieldGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const normal = canvas.getByLabelText("normal");
    await expect(ringColour(normal)).toBe("#e2e8f0");
    await userEvent.click(normal);
    await expect(ringColour(normal)).toBe("#2563eb");
    const invalid = getComputedStyle(canvas.getByLabelText("invalid"));
    await expect(
      hexOf(
        (invalid.boxShadow.match(/rgba?\([^)]+\)/g) ?? [])
          .filter((c) => !/, 0\)$/.test(c))
          .pop() ?? ""
      )
    ).toBe("#dc2626");
    const dis = getComputedStyle(canvas.getByLabelText("disabled"));
    await expect([
      hexOf(dis.backgroundColor),
      hexOf(dis.color),
      dis.opacity,
    ]).toEqual(["#f1f5f9", "#94a3b8", "1"]);
    const disabledLabel = getComputedStyle(canvas.getByText("Label ปิดใช้งาน"));
    await expect([hexOf(disabledLabel.color), disabledLabel.opacity]).toEqual([
      "#94a3b8",
      "1",
    ]);
  },
};

/** Figma `input-horizontal`: label box 80 wide on the left, control and helper on the right, gap 16. */
export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <div className="w-[416px]">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-6">
      <Field orientation="labelStart" data-testid="h-default">
        <FieldLabel htmlFor="h1" secondary="2nd label">
          Label
        </FieldLabel>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Input id="h1" placeholder="Placeholder" />
          <FieldDescription>Help text</FieldDescription>
        </div>
      </Field>
      <Field orientation="labelStart" size="lg" data-testid="h-lg">
        <FieldLabel htmlFor="h2">Label</FieldLabel>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Input id="h2" size="lg" aria-invalid placeholder="Placeholder" />
          <FieldError>Error message</FieldError>
        </div>
      </Field>
      <Field orientation="labelStart" data-testid="h-disabled" data-disabled>
        <FieldLabel htmlFor="h3">Label</FieldLabel>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Input id="h3" disabled placeholder="Placeholder" />
        </div>
      </Field>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const label = canvasElement.querySelector(
      '[data-testid="h-default"] [data-slot="field-label"]'
    ) as HTMLElement;
    await expect(label.offsetWidth).toBe(80);
    const field = canvasElement.querySelector(
      '[data-testid="h-default"]'
    ) as HTMLElement;
    await expect(getComputedStyle(field).columnGap).toBe("16px");
    const input = canvasElement.querySelector("#h1") as HTMLElement;
    await expect(input.offsetWidth).toBe(320);
    await expect(input.offsetHeight).toBe(40);
    const lg = canvasElement.querySelector("#h2") as HTMLElement;
    await expect(lg.offsetHeight).toBe(48);
  },
};
