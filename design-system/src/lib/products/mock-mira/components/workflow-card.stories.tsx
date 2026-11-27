import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { WorkflowCard, workflowCardColors } from "./workflow-card";
const meta = {
  title: "Products/Mock Mira/Components/Workflow Card",
  component: WorkflowCard,
  tags: ["autodocs"],
  args: { title: "Title", subtitle: "Description", color: "blue", showBadge: true },
  parameters: { docs: { description: { component: "Mira Product DS tile using Mira Semantic colors and gradient/card styles. Badge and timeline typography stay at least 12px; Aktiv Grotesk Thai uses a local fallback when unavailable. Presentational only; caller owns navigation and availability." } } },
} satisfies Meta<typeof WorkflowCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Blue: Story = {};
export const Emerald: Story = { args: { color: "emerald" } };
export const Cyan: Story = { args: { color: "cyan" } };
export const Pink: Story = { args: { color: "pink" } };
export const Purple: Story = { args: { color: "purple" } };
export const AllColors: Story = { render: args => <div className="flex flex-wrap gap-6">{workflowCardColors.map(color => <WorkflowCard {...args} key={color} color={color} />)}</div> };
export const WithoutBadge: Story = { args: { showBadge: false } };
export const LongThai: Story = { args: { title: "ระบบบันทึกข้อมูลการตรวจรักษาสำหรับผู้ป่วยนอก", subtitle: "รายละเอียดภาษาไทยที่ยาวและต้องอ่านได้ครบเมื่อพื้นที่จำกัด", badgeLabel: "เร็ว ๆ นี้" }, play: async ({ canvasElement }) => {
  await expect(canvasElement.ownerDocument.documentElement.scrollWidth).toBeLessThanOrEqual(canvasElement.ownerDocument.documentElement.clientWidth);
} };
