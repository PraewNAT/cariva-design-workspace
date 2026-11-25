import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb";
const meta = {
  title: "Core/Components/Breadcrumb", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href=\"#home\">หน้าหลัก</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>รายการตรวจ</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>", language: "tsx" } } },
  component: Breadcrumb
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#home">หน้าหลัก</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>รายการตรวจ</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>) };
