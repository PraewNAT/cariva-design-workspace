import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
const meta = {
  title: "Core/Components/Field", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<FieldGroup><Field><FieldLabel htmlFor=\"field-name\">ชื่อ</FieldLabel><Input id=\"field-name\" placeholder=\"กรอกชื่อ\" /><FieldDescription>ใช้ชื่อตามเอกสาร</FieldDescription></Field><Field data-invalid><FieldLabel htmlFor=\"field-invalid\">รหัส</FieldLabel><Input id=\"field-invalid\" aria-invalid aria-describedby=\"field-error\" /><FieldError id=\"field-error\">กรุณากรอกรหัส</FieldError></Field></FieldGroup>", language: "tsx" } } },
  component: Field
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<FieldGroup><Field><FieldLabel htmlFor="field-name">ชื่อ</FieldLabel><Input id="field-name" placeholder="กรอกชื่อ" /><FieldDescription>ใช้ชื่อตามเอกสาร</FieldDescription></Field><Field data-invalid><FieldLabel htmlFor="field-invalid">รหัส</FieldLabel><Input id="field-invalid" aria-invalid aria-describedby="field-error" /><FieldError id="field-error">กรุณากรอกรหัส</FieldError></Field></FieldGroup>) };
