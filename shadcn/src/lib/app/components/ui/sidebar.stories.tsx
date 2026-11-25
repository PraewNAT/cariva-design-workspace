import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "./sidebar";
const meta = {
  title: "Core/Components/Sidebar", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<SidebarProvider className=\"min-h-96\"><Sidebar collapsible=\"none\"><SidebarContent><SidebarGroup><SidebarGroupLabel>พื้นที่ทำงาน</SidebarGroupLabel><SidebarMenu><SidebarMenuItem><SidebarMenuButton isActive>สรุปเคส</SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton>รายการตรวจ</SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroup></SidebarContent></Sidebar></SidebarProvider>", language: "tsx" } } },
  component: Sidebar
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<SidebarProvider className="min-h-96"><Sidebar collapsible="none"><SidebarContent><SidebarGroup><SidebarGroupLabel>พื้นที่ทำงาน</SidebarGroupLabel><SidebarMenu><SidebarMenuItem><SidebarMenuButton isActive>สรุปเคส</SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton>รายการตรวจ</SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroup></SidebarContent></Sidebar></SidebarProvider>) };
