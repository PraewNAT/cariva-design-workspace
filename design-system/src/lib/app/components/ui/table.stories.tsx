import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { useState } from "react";
import { TablePagination } from "../app/table-pagination";
import { Avatar, AvatarFallback } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Progress } from "./progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableScrollShadow,
  TableTextCell,
} from "./table";

const meta = {
  title: "Core/Components/Table",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Table ตาม Figma `table-head`, `table-cell`, `table-text-cell`, `table-scroll-shadow` ตั้ง `size` ที่ Table ครั้งเดียว (ห้ามผสมขนาด) เซลล์ไม่มีเส้นขอบ ใช้ `striped` สลับสีแถว",
      },
    },
  },
  component: Table,
} satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  ["Acme Corp", "acme.com", "In progress", "8 users"],
  ["Globex", "globex.io", "Completed", "24 users"],
  ["Soylent", "soylent.co", "Pending", "3 users"],
  ["Initech", "initech.com", "Completed", "12 users"],
];

function Sample(props: React.ComponentProps<typeof Table>) {
  return (
    <Table {...props}>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Users</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(([name, domain, status, users], i) => (
          <TableRow key={name}>
            <TableCell>
              <TableTextCell description={i === 0 ? domain : undefined}>
                {name}
              </TableTextCell>
            </TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{users}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const rgb = (e: Element) => getComputedStyle(e).backgroundColor;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>รหัส</TableHead>
          <TableHead>สถานะ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>CV-001</TableCell>
          <TableCell>ตรวจแล้ว</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/** Figma size default: head padding 16, cell min height 54. */
export const SizeDefault: Story = {
  render: () => <Sample />,
  play: async ({ canvasElement }) => {
    const head = canvasElement.querySelector("th") as HTMLElement;
    expect(rgb(head)).toBe("rgb(248, 250, 252)");
    expect(getComputedStyle(head).fontWeight).toBe("500");
    expect(getComputedStyle(head).paddingLeft).toBe("16px");
    expect(head.offsetHeight).toBe(54);
    const cell = canvasElement
      .querySelectorAll("tbody tr")[1]
      .querySelector("td") as HTMLElement;
    expect(cell.offsetHeight).toBe(54);
    expect(getComputedStyle(cell).paddingTop).toBe("16px");
    expect(rgb(cell)).toBe("rgb(255, 255, 255)");
    expect(getComputedStyle(cell).borderBottomWidth).toBe("0px");
  },
};

/** Figma size sm: head padding 7/16 (34 high), cell 4/16 (36 high). */
export const SizeSm: Story = {
  render: () => <Sample size="sm" />,
  play: async ({ canvasElement }) => {
    const head = canvasElement.querySelector("th") as HTMLElement;
    expect(head.offsetHeight).toBe(34);
    expect(getComputedStyle(head).paddingTop).toBe("7px");
    const cell = canvasElement
      .querySelectorAll("tbody tr")[1]
      .querySelector("td") as HTMLElement;
    expect(cell.offsetHeight).toBe(36);
    expect(getComputedStyle(cell).paddingTop).toBe("4px");
  },
};

/** Figma `alternate=true`: even rows use `on-surface/subtle`. */
export const Striped: Story = {
  render: () => <Sample striped />,
  play: async ({ canvasElement }) => {
    const bodyRows = canvasElement.querySelectorAll("tbody tr");
    expect(rgb(bodyRows[0].querySelector("td")!)).toBe("rgb(255, 255, 255)");
    expect(rgb(bodyRows[1].querySelector("td")!)).toBe("rgb(248, 250, 252)");
    expect(rgb(bodyRows[2].querySelector("td")!)).toBe("rgb(255, 255, 255)");
  },
};

/** Figma `table-text-cell`: main text 14/20 and description 12/16 `content/secondary`. */
export const TextCellWithDescription: Story = {
  render: () => <Sample />,
  play: async ({ canvasElement }) => {
    const cellEl = canvasElement.querySelector(
      '[data-slot="table-text-cell"]'
    )!;
    const [main, desc] = Array.from(
      cellEl.querySelectorAll("span")
    ) as HTMLElement[];
    expect([
      getComputedStyle(main).fontSize,
      getComputedStyle(main).lineHeight,
    ]).toEqual(["14px", "20px"]);
    expect([
      getComputedStyle(desc).fontSize,
      getComputedStyle(desc).lineHeight,
      getComputedStyle(desc).color,
    ]).toEqual(["12px", "16px", "rgb(51, 65, 85)"]);
  },
};

/** Figma `table-head` leftSortVisible / rightSortVisible: arrow on either side, or none. */
export const SortIcons: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead sort="right">Right</TableHead>
          <TableHead sort="left">Left</TableHead>
          <TableHead>None</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>a</TableCell>
          <TableCell>b</TableCell>
          <TableCell>c</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const heads = canvasElement.querySelectorAll("th");
    const icon = heads[0].querySelector(
      '[data-slot="table-sort-icon"]'
    ) as HTMLElement;
    expect([icon.offsetWidth, icon.offsetHeight]).toEqual([22, 22]);
    expect(heads[0].querySelector("div")!.lastElementChild).toBe(icon);
    expect(
      heads[1]
        .querySelector("div")!
        .firstElementChild!.getAttribute("data-slot")
    ).toBe("table-sort-icon");
    expect(heads[2].querySelector('[data-slot="table-sort-icon"]')).toBeNull();
  },
};

/** Figma `compact`: fixed square column for a checkbox (54×54, sm 36×36). */
export const CompactCheckboxColumn: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["default", "sm"] as const).map((size) => (
        <Table key={size} size={size} data-testid={size}>
          <TableHeader>
            <TableRow>
              <TableHead compact>
                <Checkbox aria-label={`all-${size}`} />
              </TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell compact>
                <Checkbox aria-label={`one-${size}`} />
              </TableCell>
              <TableCell>Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const d = canvasElement.querySelector(
      '[data-testid="default"] th'
    ) as HTMLElement;
    const s = canvasElement.querySelector(
      '[data-testid="sm"] th'
    ) as HTMLElement;
    expect([d.offsetWidth, d.offsetHeight]).toEqual([54, 54]);
    expect([s.offsetWidth, s.offsetHeight]).toEqual([36, 36]);
  },
};

/** Figma `state=disabled`: transparent cell, text `content/disabled`. */
export const DisabledRow: Story = {
  render: () => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Active row</TableCell>
        </TableRow>
        <TableRow disabled>
          <TableCell>
            <TableTextCell description="Not available">
              Disabled row
            </TableTextCell>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const cell = canvasElement.querySelectorAll("td")[1] as HTMLElement;
    expect(getComputedStyle(cell).color).toBe("rgb(148, 163, 184)");
    expect(rgb(cell)).toBe("rgba(0, 0, 0, 0)");
  },
};

/** Figma `table-scroll-shadow`: pinned column edge shadow, left and right. */
export const PinnedColumnShadow: Story = {
  render: () => (
    <div className="relative w-96 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pinned</TableHead>
            <TableHead>Wide column that scrolls</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Acme</TableCell>
            <TableCell>Web-based app for sales and more</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TableScrollShadow side="left" className="left-24" />
      <TableScrollShadow side="right" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const shadows = canvasElement.querySelectorAll(
      '[data-slot="table-scroll-shadow"]'
    );
    expect(shadows.length).toBe(2);
    expect((shadows[0] as HTMLElement).offsetWidth).toBe(16);
    expect(getComputedStyle(shadows[0]).backgroundImage).toContain("gradient");
  },
};

const companies = [
  ["Acme Corp", "acme.com", "AC", "In progress", 80],
  ["Globex", "globex.io", "GL", "Completed", 45],
  ["Soylent", "soylent.co", "SO", "Pending", 20],
  ["Initech", "initech.com", "IN", "Completed", 100],
] as const;

function Composed() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  return (
    <div className="w-[960px]">
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHead compact>
              <Checkbox aria-label="เลือกทั้งหมด" />
            </TableHead>
            <TableHead sort="right">Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Licence use</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map(([name, domain, initials, status, use]) => (
            <TableRow key={name}>
              <TableCell compact>
                <Checkbox aria-label={`เลือก ${name}`} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <TableTextCell description={domain}>{name}</TableTextCell>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{status}</Badge>
              </TableCell>
              <TableCell>
                <Progress
                  value={use}
                  aria-label={`${name} licence use`}
                  className="w-40"
                />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        pageSize={pageSize}
        total={100}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}

/** Figma doc example: checkbox, avatar + text cell, tag, progress and button inside cells, with the table pagination as footer. */
export const ComposedTable: Story = {
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
  render: () => <Composed />,
  play: async ({ canvasElement }) => {
    expect(canvasElement.querySelectorAll("tbody tr").length).toBe(4);
    expect(canvasElement.querySelector('[data-slot="avatar"]')).not.toBeNull();
    expect(canvasElement.querySelector('[role="progressbar"]')).not.toBeNull();
    expect(
      canvasElement.querySelector("th")!.getAttribute("data-compact")
    ).toBe("true");
  },
};
