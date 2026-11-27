import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen, LayoutDashboard } from "lucide-react";
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/lib/app/components/ui/sidebar";
import { Button } from "@/lib/app/components/ui/button";
import catalog from "../prototypes.json";
import "./prototype-shell.css";

type PrototypeEntry = { id: string; product: string; title: string; url: string };
export function PrototypeShell({ currentId, children, prototypes = catalog.prototypes }: { currentId: string; children: ReactNode; prototypes?: PrototypeEntry[] }) {
  const [hidden, setHidden] = useState(false);
  const [collapsed, setCollapsed] = useState(() => window.matchMedia("(max-width: 760px)").matches);
  const [closedGroups, setClosedGroups] = useState<string[]>([]);
  const content = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const groups = [...new Set(prototypes.map(item => item.product))];
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.code === "Backslash") {
        event.preventDefault();
        previousFocus.current = document.activeElement as HTMLElement;
        setHidden(value => !value);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (hidden) content.current?.focus();
    else if (previousFocus.current) toggle.current?.focus();
  }, [hidden]);
  return <SidebarProvider className="prototype-shell">
    {!hidden && <Sidebar collapsible="none" className={`prototype-shell-sidebar ${collapsed ? "prototype-shell-rail" : ""}`} role="complementary" aria-label="เลือก prototype">
      <SidebarHeader className="prototype-shell-header">
        {!collapsed && <strong>Cariva Design<br /><span>Workspace</span></strong>}
        <Button ref={toggle} variant="ghost" color="secondary" size="icon-sm" aria-label={collapsed ? "ขยายแถบเลือกงาน" : "ย่อแถบเลือกงาน"} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</Button>
      </SidebarHeader>
      <SidebarContent>
        <nav aria-label="Prototype projects">{groups.map(group => <section key={group} className="prototype-shell-group">
          {!collapsed && <button className="prototype-shell-group-toggle" aria-expanded={!closedGroups.includes(group)} onClick={() => setClosedGroups(value => value.includes(group) ? value.filter(item => item !== group) : [...value, group])}>{closedGroups.includes(group) ? <ChevronRight size={16} /> : <ChevronDown size={16} />}{group}</button>}
          {(collapsed || !closedGroups.includes(group)) && <SidebarMenu>{prototypes.filter(item => item.product === group).map(item => <SidebarMenuItem key={item.id}><SidebarMenuButton isActive={item.id === currentId} render={<a href={item.url} aria-current={item.id === currentId ? "page" : undefined} aria-label={item.title} title={item.title} />}><LayoutDashboard aria-hidden />{!collapsed && <span>{item.title}</span>}</SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu>}
        </section>)}</nav>
      </SidebarContent>
      {!collapsed && <SidebarFooter className="prototype-shell-footer">⌘ / Ctrl + \ · ซ่อนหรือแสดงแถบเลือกงาน</SidebarFooter>}
    </Sidebar>}
    <div ref={content} tabIndex={-1} className="prototype-shell-content">{children}</div>
  </SidebarProvider>;
}
