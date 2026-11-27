import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import {
  GridViewRounded,
  SettingsRounded,
  ChevronDownRounded,
  DescriptionOutlined,
} from "../app/icons";
import { AppSidebar } from "../app/app-sidebar";
import { SidebarIconRail, SidebarIconRailItem } from "../app/sidebar-rail";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "./sidebar";
const meta = {
  title: "Core/Components/Sidebar",
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
        code: '<SidebarProvider className="min-h-96"><Sidebar collapsible="none"><SidebarContent><SidebarGroup><SidebarGroupLabel>พื้นที่ทำงาน</SidebarGroupLabel><SidebarMenu><SidebarMenuItem><SidebarMenuButton isActive>สรุปเคส</SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton>รายการตรวจ</SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroup></SidebarContent></Sidebar></SidebarProvider>',
        language: "tsx",
      },
    },
  },
  component: Sidebar,
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <SidebarProvider className="min-h-96">
      <Sidebar collapsible="none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>พื้นที่ทำงาน</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>สรุปเคส</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>รายการตรวจ</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};

export const FigmaSidebar: Story = {
  render: () => (
    <div className="flex gap-6">
      <SidebarProvider className="min-h-96 w-auto">
        <Sidebar collapsible="none" data-testid="sb">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Section 1</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <GridViewRounded />
                    <span>Menu item</span>
                    <ChevronDownRounded className="ml-auto" />
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton isActive render={<a href="#a" />}>
                        <span>Menu item</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton render={<a href="#b" />}>
                        <span>Menu item</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <DescriptionOutlined />
                    <span>Menu item</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
      <SidebarIconRail data-testid="rail" className="h-96">
        <SidebarIconRailItem
          icon={<GridViewRounded />}
          label="Menu"
          isActive
          badge
        />
        <SidebarIconRailItem icon={<SettingsRounded />} label="Menu" />
        <SidebarIconRailItem icon={<SettingsRounded />} label="Menu" disabled />
      </SidebarIconRail>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const sb = canvasElement.querySelector(
      '[data-slot="sidebar"]'
    ) as HTMLElement;
    expect(sb.offsetWidth).toBe(240);
    expect(getComputedStyle(sb).backgroundColor).toBe("rgb(255, 255, 255)");
    const btns = canvasElement.querySelectorAll(
      '[data-slot="sidebar-menu-button"]'
    );
    const b0 = btns[0] as HTMLElement;
    expect(b0.offsetHeight).toBe(40);
    expect(getComputedStyle(b0).borderRadius).toBe("12px");
    expect(getComputedStyle(b0).columnGap).toBe("12px");
    expect(getComputedStyle(b0).paddingLeft).toBe("12px");
    const sub = canvasElement.querySelectorAll(
      '[data-slot="sidebar-menu-sub-button"]'
    );
    expect((sub[0] as HTMLElement).offsetHeight).toBe(40);
    expect(getComputedStyle(sub[0]).borderRadius).toBe("8px");
    const item = canvasElement.querySelector(
      '[data-slot="sidebar-icon-rail-item"]'
    ) as HTMLElement;
    expect(item.offsetWidth).toBe(64);
    expect(item.offsetHeight).toBe(60);
    const box = item.firstElementChild as HTMLElement;
    expect(box.offsetWidth).toBe(32);
    expect(getComputedStyle(box).borderRadius).toBe("8px");
  },
};

export const Assembled: Story = {
  render: () => (
    <SidebarProvider className="min-h-[832px] w-auto">
      <AppSidebar
        logo={<span className="text-lg font-semibold">Cariva</span>}
        sections={[
          {
            label: "Header 1",
            items: [
              {
                label: "Menu item",
                icon: <GridViewRounded />,
                active: true,
                children: [
                  { label: "Menu item", active: true },
                  { label: "Menu item" },
                  { label: "Menu item" },
                ],
              },
              {
                label: "Reports",
                icon: <DescriptionOutlined />,
                children: [{ label: "Monthly" }],
              },
            ],
          },
          {
            label: "Header 2",
            items: [
              { label: "Settings", icon: <SettingsRounded /> },
              {
                label: "Archive",
                icon: <DescriptionOutlined />,
                disabled: true,
              },
            ],
          },
        ]}
      />
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const sb = canvasElement.querySelector(
      '[data-slot="sidebar"]'
    ) as HTMLElement;
    expect(sb.offsetWidth).toBe(240);
    expect(getComputedStyle(sb).paddingTop).toBe("24px");
    const btns = canvasElement.querySelectorAll(
      '[data-slot="sidebar-menu-button"]'
    );
    expect(btns.length).toBe(4);
    expect((btns[0] as HTMLElement).offsetWidth).toBe(224);
    expect((btns[0] as HTMLElement).offsetHeight).toBe(40);
    expect(btns[0].getAttribute("aria-expanded")).toBe("true");
    expect(
      canvasElement.querySelectorAll('[data-slot="sidebar-menu-sub-button"]')
        .length
    ).toBe(3);
    (btns[1] as HTMLElement).click();
    await new Promise((r) => setTimeout(r, 100));
    expect(
      canvasElement.querySelectorAll('[data-slot="sidebar-menu-sub-button"]')
        .length
    ).toBe(4);
    expect((btns[3] as HTMLButtonElement).disabled).toBe(true);
  },
};
