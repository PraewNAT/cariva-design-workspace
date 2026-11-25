import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
const meta = {
  title: "Core/Components/Accordion", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Accordion defaultValue={[\"details\"]}><AccordionItem value=\"details\"><AccordionTrigger>รายละเอียด</AccordionTrigger><AccordionContent>ข้อมูลเพิ่มเติมของรายการ</AccordionContent></AccordionItem></Accordion>", language: "tsx" } } },
  component: Accordion
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Accordion defaultValue={["details"]}><AccordionItem value="details"><AccordionTrigger>รายละเอียด</AccordionTrigger><AccordionContent>ข้อมูลเพิ่มเติมของรายการ</AccordionContent></AccordionItem></Accordion>) };

Default.play = async ({ canvas, userEvent }) => { const trigger = canvas.getByRole("button", { name: "รายละเอียด" }); await expect(trigger).toHaveAttribute("aria-expanded", "true"); await userEvent.click(trigger); await expect(trigger).toHaveAttribute("aria-expanded", "false"); };
