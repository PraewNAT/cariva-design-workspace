import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";
const meta = {
  title: "Core/Components/Radio Group", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<RadioGroup defaultValue=\"email\" aria-label=\"ช่องทาง\"><Label><RadioGroupItem value=\"email\" />อีเมล</Label><Label><RadioGroupItem value=\"sms\" />SMS</Label></RadioGroup>", language: "tsx" } } },
  component: RadioGroup
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<RadioGroup defaultValue="email" aria-label="ช่องทาง"><Label><RadioGroupItem value="email" />อีเมล</Label><Label><RadioGroupItem value="sms" />SMS</Label></RadioGroup>) };

Default.play = async ({ canvas, userEvent }) => { await userEvent.click(canvas.getByRole("radio", { name: "SMS" })); await expect(canvas.getByRole("radio", { name: "SMS" })).toBeChecked(); await expect(canvas.getByRole("radio", { name: "อีเมล" })).not.toBeChecked(); };
