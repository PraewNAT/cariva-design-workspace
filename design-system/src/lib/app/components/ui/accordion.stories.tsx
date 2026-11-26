import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HelpOutlineRounded,
  LockOutlined,
  SettingsRounded,
} from "../app/icons";
import { expect } from "storybook/test";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
const meta = {
  title: "Core/Components/Accordion",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-xl p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "ตัวอย่างจาก Core จริง แสดง subcomponents ที่ต้องประกอบร่วมกัน; ดู source สำหรับวิธีใช้. ไม่ใช่การรับรองทุก variant/state หรือ Figma parity.",
      },
      source: {
        code: '<Accordion defaultValue={["details"]}><AccordionItem value="details"><AccordionTrigger>รายละเอียด</AccordionTrigger><AccordionContent>ข้อมูลเพิ่มเติมของรายการ</AccordionContent></AccordionItem></Accordion>',
        language: "tsx",
      },
    },
  },
  component: Accordion,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Accordion defaultValue={["details"]}>
      <AccordionItem value="details">
        <AccordionTrigger>รายละเอียด</AccordionTrigger>
        <AccordionContent>ข้อมูลเพิ่มเติมของรายการ</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

Default.play = async ({ canvas, userEvent }) => {
  const trigger = canvas.getByRole("button", { name: "รายละเอียด" });
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await userEvent.click(trigger);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
};

const items = [
  {
    value: "account",
    title: "Account Settings",
    icon: SettingsRounded,
    text: "Manage your account preferences, security settings, and personal information.",
  },
  {
    value: "privacy",
    title: "Privacy & Security",
    icon: LockOutlined,
    text: "Manage your account preference",
  },
  {
    value: "help",
    title: "Help & Support",
    icon: HelpOutlineRounded,
    text: "Manage your account preference",
  },
] as const;

/** Mirrors the Figma example: one card per item, 16px apart, icon tile in front of the title. */
export const WithIcons: Story = {
  render: () => (
    <Accordion defaultValue={["account"]}>
      {items.map((it) => (
        <AccordionItem key={it.value} value={it.value}>
          <AccordionTrigger icon={<it.icon />}>{it.title}</AccordionTrigger>
          <AccordionContent>{it.text}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
  play: async ({ canvas }) => {
    // Figma crv-accordion-standard: card padding 16, border 1, radius 12, title 16/24 SemiBold,
    // 40px icon tile, 20px chevron, content 14/20 secondary text indented 56px, cards 16px apart
    const card = canvas
      .getByRole("button", { name: "Account Settings" })
      .closest("[data-slot=accordion-item]") as HTMLElement;
    const cs = getComputedStyle(card);
    await expect([
      cs.paddingTop,
      cs.paddingLeft,
      cs.borderTopWidth,
      cs.borderTopLeftRadius,
    ]).toEqual(["16px", "16px", "1px", "12px"]);
    const title = getComputedStyle(
      canvas.getByRole("button", { name: "Account Settings" })
    );
    await expect([title.fontSize, title.lineHeight, title.fontWeight]).toEqual([
      "16px",
      "24px",
      "600",
    ]);
    await expect(
      card.querySelector("[data-slot=accordion-icon]")!.getBoundingClientRect()
        .width
    ).toBe(40);
    // the closed/open chevrons swap with `hidden`, so take the visible one
    const chevron = Math.max(
      ...Array.from(
        card.querySelectorAll("[data-slot=accordion-trigger-icon]")
      ).map((el) => el.getBoundingClientRect().width)
    );
    await expect(chevron).toBe(20);
    const content = getComputedStyle(
      card.querySelector("[data-slot=accordion-content] > div")!
    );
    await expect([
      content.paddingLeft,
      content.paddingTop,
      content.fontSize,
      content.lineHeight,
    ]).toEqual(["56px", "16px", "14px", "20px"]);
    const next = canvas
      .getByRole("button", { name: "Privacy & Security" })
      .closest("[data-slot=accordion-item]") as HTMLElement;
    await expect(
      Math.round(
        next.getBoundingClientRect().top - card.getBoundingClientRect().bottom
      )
    ).toBe(16);
  },
};
