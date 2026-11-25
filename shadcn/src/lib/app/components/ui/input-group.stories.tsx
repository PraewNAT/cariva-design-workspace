import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
const meta = {
  title: "Core/Components/Input Group", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<InputGroup><InputGroupAddon>ค้นหา</InputGroupAddon><InputGroupInput aria-label=\"ค้นหารายการ\" placeholder=\"ชื่อหรือเลขรายการ\" /></InputGroup>", language: "tsx" } } },
  component: InputGroup
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<InputGroup><InputGroupAddon>ค้นหา</InputGroupAddon><InputGroupInput aria-label="ค้นหารายการ" placeholder="ชื่อหรือเลขรายการ" /></InputGroup>) };
