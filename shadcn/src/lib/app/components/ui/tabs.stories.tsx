import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
const meta = {
  title: "Core/Components/Tabs", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Tabs defaultValue=\"overview\"><TabsList aria-label=\"มุมมอง\"><TabsTrigger value=\"overview\">ภาพรวม</TabsTrigger><TabsTrigger value=\"details\">รายละเอียด</TabsTrigger></TabsList><TabsContent value=\"overview\">ข้อมูลสรุป</TabsContent><TabsContent value=\"details\">รายละเอียดผลตรวจ</TabsContent></Tabs>", language: "tsx" } } },
  component: Tabs
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Tabs defaultValue="overview"><TabsList aria-label="มุมมอง"><TabsTrigger value="overview">ภาพรวม</TabsTrigger><TabsTrigger value="details">รายละเอียด</TabsTrigger></TabsList><TabsContent value="overview">ข้อมูลสรุป</TabsContent><TabsContent value="details">รายละเอียดผลตรวจ</TabsContent></Tabs>) };

Default.play = async ({ canvas, userEvent }) => { await userEvent.click(canvas.getByRole("tab", { name: "รายละเอียด" })); await expect(canvas.getByText("รายละเอียดผลตรวจ")).toBeVisible(); };
