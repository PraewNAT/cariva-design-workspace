import type { ComponentProps, ReactNode } from "react";
import { Card } from "@/lib/app/components/ui/card";
import { cn } from "cn";
import blueIcon from "./assets/workflow-card/blue.svg";
import emeraldIcon from "./assets/workflow-card/emerald.svg";
import cyanIcon from "./assets/workflow-card/cyan.svg";
import pinkIcon from "./assets/workflow-card/pink.svg";
import purpleIcon from "./assets/workflow-card/purple.svg";
import "../theme/mira.css";
import "./workflow-card.css";

const defaultIcons = { blue: blueIcon, emerald: emeraldIcon, cyan: cyanIcon, pink: pinkIcon, purple: purpleIcon };
export const workflowCardColors = ["blue", "emerald", "cyan", "pink", "purple"] as const;
export type WorkflowCardColor = typeof workflowCardColors[number];
export type WorkflowCardProps = Omit<ComponentProps<"div">, "title" | "color"> & {
  title: ReactNode;
  subtitle?: ReactNode;
  color?: WorkflowCardColor;
  icon?: ReactNode;
  showBadge?: boolean;
  badgeLabel?: string;
};
/** Presentational Mira workflow tile. Navigation/availability belongs to its caller. */
export function WorkflowCard({ title, subtitle, color = "blue", icon, showBadge = true, badgeLabel = "Soon", className, ...props }: WorkflowCardProps) {
  return <Card data-mira-theme data-slot="mira-workflow-card" data-color={color} className={cn("mira-workflow-card", className)} {...props}>
    <div className="mira-workflow-card-header"><div className="mira-workflow-card-icon" aria-hidden>{icon ?? <img src={defaultIcons[color]} alt="" width="24" height="24" />}</div>{showBadge && <span className="mira-workflow-card-badge">{badgeLabel}</span>}</div>
    <div className="mira-workflow-card-text"><div className="mira-workflow-card-title">{title}</div>{subtitle != null && <div className="mira-workflow-card-subtitle">{subtitle}</div>}</div>
  </Card>;
}
