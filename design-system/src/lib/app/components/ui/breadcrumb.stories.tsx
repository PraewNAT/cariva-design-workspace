import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ChevronDownRounded } from "../app/icons";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
const meta = {
  title: "Core/Components/Breadcrumb",
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
        code: '<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#home">หน้าหลัก</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>รายการตรวจ</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>',
        language: "tsx",
      },
    },
  },
  component: Breadcrumb,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#home">หน้าหลัก</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>รายการตรวจ</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

const rgb = (c: string) =>
  "#" +
  (c.match(/\d+/g) ?? [])
    .slice(0, 3)
    .map((x) => Number(x).toString(16).padStart(2, "0"))
    .join("");

/** Figma `breadcrumb`: link, ellipsis, dropdown crumb and the current page in one row. */
export const FullRow: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#home">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#docs">
            Docs
            <ChevronDownRounded className="size-4 text-[var(--cds-content-secondary)]" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "Home" });
    const ls = getComputedStyle(link);
    await expect([
      rgb(ls.color),
      ls.fontSize,
      ls.lineHeight,
      ls.fontWeight,
    ]).toEqual(["#1789fa", "14px", "20px", "500"]);
    const page = getComputedStyle(canvas.getByText("Components"));
    await expect([rgb(page.color), page.fontWeight]).toEqual([
      "#334155",
      "500",
    ]);
    const list = canvas.getByRole("list");
    await expect(getComputedStyle(list).columnGap).toBe("12px");
    const sep = list.querySelector("[data-slot=breadcrumb-separator] svg")!;
    await expect([
      sep.getBoundingClientRect().width,
      rgb(getComputedStyle(sep).color),
    ]).toEqual([16, "#334155"]);
    await expect(
      list
        .querySelector("[data-slot=breadcrumb-ellipsis]")!
        .getBoundingClientRect().width
    ).toBe(32);
  },
};
