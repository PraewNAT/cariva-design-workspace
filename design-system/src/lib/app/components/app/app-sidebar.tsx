import { cn } from "cn";
import * as React from "react";
import { ChevronDownRounded } from "@/lib/app/components/app/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/lib/app/components/ui/sidebar";

/**
 * Figma `sidebar` assembled (docs/components/SIDEBAR-FIGMA.md): logo on top, then sections
 * (a small header + a list of `sidebar-menu-item`). An item with `children` is `expandable`
 * and opens its sub items; the open item shows a chevron pointing up.
 */
export type AppSidebarSubItem = {
  label: string;
  href?: string;
  active?: boolean;
};

export type AppSidebarItem = {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  children?: AppSidebarSubItem[];
  defaultOpen?: boolean;
};

export type AppSidebarSection = {
  label?: string;
  items: AppSidebarItem[];
};

function ExpandableItem({ item }: { item: AppSidebarItem }) {
  const [open, setOpen] = React.useState(
    item.defaultOpen ?? Boolean(item.active)
  );
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={item.active}
        disabled={item.disabled}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.icon}
        <span>{item.label}</span>
        <ChevronDownRounded
          className={cn("ml-auto transition-transform", open && "rotate-180")}
        />
      </SidebarMenuButton>
      {open ? (
        <SidebarMenuSub>
          {item.children?.map((child) => (
            <SidebarMenuSubItem key={child.label}>
              <SidebarMenuSubButton
                isActive={child.active}
                render={<a href={child.href ?? "#"} />}
              >
                <span>{child.label}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
}

function AppSidebar({
  logo,
  sections,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Sidebar>, "children"> & {
  logo?: React.ReactNode;
  sections: AppSidebarSection[];
}) {
  return (
    <Sidebar collapsible="none" className={cn("py-6", className)} {...props}>
      {logo ? (
        <SidebarHeader className="px-4 py-2">{logo}</SidebarHeader>
      ) : null}
      <SidebarContent className="gap-3 px-2 pt-4">
        {sections.map((section, i) => (
          <SidebarGroup key={section.label ?? i} className="gap-3 p-0">
            {section.label ? (
              <SidebarGroupLabel className="h-auto px-0 text-xs leading-[18px] font-medium text-[var(--cds-content-secondary)]">
                {section.label}
              </SidebarGroupLabel>
            ) : null}
            <SidebarMenu>
              {section.items.map((item) =>
                item.children ? (
                  <ExpandableItem key={item.label} item={item} />
                ) : (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={item.active}
                      disabled={item.disabled}
                      render={item.href ? <a href={item.href} /> : undefined}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

export { AppSidebar };
