import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertDescription, AlertTitle } from "./alert";
const meta = {
  title: "Core/Components/Alert", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Alert><AlertTitle>ข้อมูลตัวอย่าง</AlertTitle><AlertDescription>โปรดตรวจสอบรายละเอียดก่อนดำเนินการ</AlertDescription></Alert>", language: "tsx" } } },
  component: Alert
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Alert><AlertTitle>ข้อมูลตัวอย่าง</AlertTitle><AlertDescription>โปรดตรวจสอบรายละเอียดก่อนดำเนินการ</AlertDescription></Alert>) };
