import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "./combobox";
const meta = {
  title: "Core/Components/Combobox", tags: ["autodocs"], decorators: [(Story) => <div className="max-w-xl p-6"><Story /></div>], parameters: { controls: { disable: true }, docs: { description: { component: "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity." }, source: { code: "<Combobox items={[\"ตับ\", \"ไต\", \"เลือด\"]}><ComboboxInput aria-label=\"ค้นหากลุ่ม\" /><ComboboxContent><ComboboxEmpty>ไม่พบรายการ</ComboboxEmpty><ComboboxList aria-label=\"กลุ่มการตรวจ\">{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox>", language: "tsx" } } },
  component: Combobox
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => (<Combobox items={["ตับ", "ไต", "เลือด"]}><ComboboxInput aria-label="ค้นหากลุ่ม" /><ComboboxContent><ComboboxEmpty>ไม่พบรายการ</ComboboxEmpty><ComboboxList aria-label="กลุ่มการตรวจ">{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox>) };

Default.play = async ({ canvas, userEvent, canvasElement }) => { const input = canvas.getByRole("combobox"); await userEvent.type(input, "ไต"); const body = within(canvasElement.ownerDocument.body); await userEvent.click(await body.findByRole("option", { name: "ไต" })); await expect(input).toHaveValue("ไต"); await waitFor(() => expect(body.queryByRole("listbox")).not.toBeInTheDocument()); };
