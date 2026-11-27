import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect } from "storybook/test";
import { TablePagination } from "../app/table-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
const meta = {
  title: "Core/Components/Pagination",
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
        code: '<Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#previous" /></PaginationItem><PaginationItem><PaginationLink href="#page1" isActive>1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#page2">2</PaginationLink></PaginationItem><PaginationItem><PaginationNext href="#next" /></PaginationItem></PaginationContent></Pagination>',
        language: "tsx",
      },
    },
  },
  component: Pagination,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#previous" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page1" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page2">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#next" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

function Controlled({ initial, total }: { initial: number; total: number }) {
  const [page, setPage] = useState(initial);
  const [size, setSize] = useState(10);
  return (
    <TablePagination
      page={page}
      pageSize={size}
      total={total}
      onPageChange={setPage}
      onPageSizeChange={setSize}
    />
  );
}

/** Figma `pagination`: Case First / Middle / Last / Empty — 32px round buttons 8px apart. */
export const FigmaTablePagination: Story = {
  decorators: [
    (Story) => (
      <div className="w-[1200px] p-6">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-6">
      <Controlled initial={1} total={100} />
      <Controlled initial={2} total={100} />
      <Controlled initial={10} total={100} />
      <Controlled initial={1} total={0} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll(
      '[data-slot="table-pagination"]'
    );
    const first = rows[0];
    const links = first.querySelectorAll(
      '[data-slot="pagination-link"]'
    ) as NodeListOf<HTMLElement>;
    const r = links[0].getBoundingClientRect();
    await expect([Math.round(r.width), Math.round(r.height)]).toEqual([32, 32]);
    await expect(getComputedStyle(links[3]).backgroundColor).not.toBe(
      "rgb(23, 137, 250)"
    );
    await expect(
      getComputedStyle(first.querySelector('[aria-current="page"]')!)
        .backgroundColor
    ).toBe("rgb(23, 137, 250)");
    await expect(
      getComputedStyle(first.querySelector('[aria-current="page"]')!).color
    ).toBe("rgb(255, 255, 255)");
    await expect(links[0].getAttribute("aria-label")).toBe("Go to first page");
    await expect(getComputedStyle(links[0]).color).toBe("rgb(148, 163, 184)");
    const nav = first.querySelector(
      '[data-slot="pagination-content"]'
    ) as HTMLElement;
    await expect(getComputedStyle(nav).columnGap).toBe("8px");
    await expect(
      first.querySelector('[data-slot="pagination-summary"]')!.textContent
    ).toBe("Showing 1 to 10 of 100 products");
    await expect(
      rows[2].querySelector('[data-slot="pagination-summary"]')!.textContent
    ).toBe("Showing 91 to 100 of 100 products");
    await expect(rows[3].querySelectorAll('[aria-current="page"]').length).toBe(
      0
    );
    await expect(
      rows[3].querySelector('[data-slot="pagination-summary"]')!.textContent
    ).toBe("Showing 0 to 0 of 0 products");
    const trigger = first.querySelector(
      '[data-slot="select-trigger"]'
    ) as HTMLElement;
    await expect(Math.round(trigger.getBoundingClientRect().height)).toBe(40);
  },
};
