import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";
const meta = {
  title: "Core/Components/Input Otp", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<InputOTP maxLength={6} aria-label=\"รหัส OTP\"><InputOTPGroup>{[0, 1, 2, 3, 4, 5].map(index => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup></InputOTP>", language: "tsx" } } },
  component: InputOTP
} satisfies Meta;
export default meta;
// This composition supplies the OTP children directly; there are no story Controls.
type Story = StoryObj<Record<string, never>>;
export const Default: Story = { render: () => (<InputOTP maxLength={6} aria-label="รหัส OTP"><InputOTPGroup>{[0, 1, 2, 3, 4, 5].map(index => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup></InputOTP>) };

Default.play = async ({ canvas, userEvent }) => { await userEvent.type(canvas.getByRole("textbox", { name: "รหัส OTP" }), "123456"); await expect(canvas.getByRole("textbox", { name: "รหัส OTP" })).toHaveValue("123456"); };
