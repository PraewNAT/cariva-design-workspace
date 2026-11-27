import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";
const meta = {
  title: "Core/Components/Input/Input Otp",
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
        code: '<InputOTP maxLength={6} aria-label="รหัส OTP"><InputOTPGroup>{[0, 1, 2, 3, 4, 5].map(index => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup></InputOTP>',
        language: "tsx",
      },
    },
  },
  component: InputOTP,
} satisfies Meta;
export default meta;
// This composition supplies the OTP children directly; there are no story Controls.
type Story = StoryObj<Record<string, never>>;
export const Default: Story = {
  render: () => (
    <InputOTP maxLength={6} aria-label="รหัส OTP">
      <InputOTPGroup>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
};

Default.play = async ({ canvas, userEvent }) => {
  await userEvent.type(
    canvas.getByRole("textbox", { name: "รหัส OTP" }),
    "123456"
  );
  await expect(canvas.getByRole("textbox", { name: "รหัส OTP" })).toHaveValue(
    "123456"
  );
};

const slots = (
  <InputOTPGroup>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <InputOTPSlot key={i} index={i} />
    ))}
  </InputOTPGroup>
);

/** Figma `input-otp`: separate 40×40 slots 12px apart; active, error and disabled states. */
export const FigmaStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Field>
        <FieldLabel>รหัส OTP</FieldLabel>
        <InputOTP maxLength={6} aria-label="ปกติ">
          {slots}
        </InputOTP>
        <FieldDescription>กรอกรหัสที่ส่งไปยังโทรศัพท์</FieldDescription>
      </Field>
      <Field>
        <InputOTP maxLength={6} aria-label="ผิดพลาด" error>
          {slots}
        </InputOTP>
        <FieldError>รหัสต้องมี 6 หลัก</FieldError>
      </Field>
      <InputOTP
        maxLength={6}
        aria-label="ปิดใช้งาน"
        disabled
        value="123"
        onChange={() => {}}
      >
        {slots}
      </InputOTP>
    </div>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const slotEls = (label: string) =>
      canvas
        .getByLabelText(label)
        .closest("[data-input-otp-container]")!
        .querySelectorAll(
          '[data-slot="input-otp-slot"]'
        ) as NodeListOf<HTMLElement>;
    const a = slotEls("ปกติ");
    const r0 = a[0].getBoundingClientRect(),
      r1 = a[1].getBoundingClientRect();
    await expect([Math.round(r0.width), Math.round(r0.height)]).toEqual([
      40, 40,
    ]);
    await expect(Math.round(r1.left - r0.right)).toBe(12);
    await expect(getComputedStyle(a[0]).borderTopLeftRadius).toBe("12px");
    await expect(getComputedStyle(a[0]).boxShadow).toContain("226, 232, 240");
    await expect(getComputedStyle(slotEls("ผิดพลาด")[0]).boxShadow).toContain(
      "220, 38, 38"
    );
    const d = slotEls("ปิดใช้งาน")[0];
    await expect(getComputedStyle(d).color).toBe("rgb(148, 163, 184)");
    await expect(getComputedStyle(d).backgroundColor).toBe(
      "rgb(255, 255, 255)"
    );
    await userEvent.click(canvas.getByLabelText("ปกติ"));
    await userEvent.keyboard("12");
    await expect(
      canvasElement.querySelector('[data-active="true"]')
    ).not.toBeNull();
    await expect(
      getComputedStyle(canvasElement.querySelector('[data-active="true"]')!)
        .boxShadow
    ).toContain("37, 99, 235");
  },
};
