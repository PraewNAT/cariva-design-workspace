import figma from "@figma/code-connect";
import { Sidebar, SidebarMenuButton } from "../src/lib/app/components/ui/sidebar";
import { SidebarIconRailItem } from "../src/lib/app/components/app/sidebar-rail";
import { HomeIcon } from "lucide-react";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  SidebarMenuButton,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4735-102038",
  {
    props: {
      isActive: figma.enum("active", { true: true, false: false }),
    },
    example: ({ isActive }) => (
      <SidebarMenuButton isActive={isActive}>Menu</SidebarMenuButton>
    ),
  },
);

figma.connect(
  SidebarIconRailItem,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=5472-34937",
  {
    props: {
      disabled: figma.enum("state", { "disabled": true }),
      isActive: figma.enum("state", { "selected": true }),
      badge: figma.boolean("badge"),
    },
    example: ({ disabled, isActive, badge }) => (
      <SidebarIconRailItem icon={<HomeIcon />} label="Home" badge={badge} disabled={disabled} isActive={isActive} />
    ),
  },
);

figma.connect(
  Sidebar,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64877",
  {
    example: () => (
      <Sidebar />
    ),
  },
);
