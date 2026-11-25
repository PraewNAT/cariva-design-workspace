import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
const meta = {
  title: "Core/Components/Toggle Group", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<ToggleGroup defaultValue={[\"list\"]} aria-label=\"รูปแบบแสดงผล\"><ToggleGroupItem value=\"list\">รายการ</ToggleGroupItem><ToggleGroupItem value=\"grid\">ตาราง</ToggleGroupItem></ToggleGroup>", language: "tsx" } } },
  component: ToggleGroup
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<ToggleGroup defaultValue={["list"]} aria-label="รูปแบบแสดงผล"><ToggleGroupItem value="list">รายการ</ToggleGroupItem><ToggleGroupItem value="grid">ตาราง</ToggleGroupItem></ToggleGroup>) };
