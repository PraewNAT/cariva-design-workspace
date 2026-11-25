import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";
const meta = {
  title: "Core/Components/Pagination", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Pagination><PaginationContent><PaginationItem><PaginationPrevious href=\"#previous\" /></PaginationItem><PaginationItem><PaginationLink href=\"#page1\" isActive>1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href=\"#page2\">2</PaginationLink></PaginationItem><PaginationItem><PaginationNext href=\"#next\" /></PaginationItem></PaginationContent></Pagination>", language: "tsx" } } },
  component: Pagination
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#previous" /></PaginationItem><PaginationItem><PaginationLink href="#page1" isActive>1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#page2">2</PaginationLink></PaginationItem><PaginationItem><PaginationNext href="#next" /></PaginationItem></PaginationContent></Pagination>) };
