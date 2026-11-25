import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback, AvatarGroup } from "./avatar";
const meta = {
  title: "Core/Components/Avatar", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<AvatarGroup><Avatar><AvatarFallback>กน</AvatarFallback></Avatar><Avatar><AvatarFallback>พท</AvatarFallback></Avatar></AvatarGroup>", language: "tsx" } } },
  component: Avatar
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<AvatarGroup><Avatar><AvatarFallback>กน</AvatarFallback></Avatar><Avatar><AvatarFallback>พท</AvatarFallback></Avatar></AvatarGroup>) };
