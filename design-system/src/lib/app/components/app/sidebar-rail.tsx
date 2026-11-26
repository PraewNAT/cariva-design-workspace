import { cn } from "cn";
import * as React from "react";

/**
 * Figma `sidebar-rail` and `sidebar-rail-item` (docs/components/SIDEBAR-FIGMA.md): a 64px icon-only
 * navigation strip. Named `SidebarIconRail*` because `SidebarRail` already means the resize handle
 * of the shadcn Sidebar.
 */
function SidebarIconRail({
  className,
  logo,
  secondary,
  profile,
  children,
  ...props
}: React.ComponentProps<"nav"> & {
  logo?: React.ReactNode;
  secondary?: React.ReactNode;
  profile?: React.ReactNode;
}) {
  return (
    <nav
      data-slot="sidebar-icon-rail"
      className={cn(
        "flex w-16 flex-col bg-[var(--cds-on-surface-default)]",
        className
      )}
      {...props}
    >
      {logo ? (
        <div className="flex h-16 items-center justify-center p-4">{logo}</div>
      ) : null}
      <div className="flex flex-1 flex-col gap-2">{children}</div>
      {secondary ? (
        <div className="flex flex-col gap-2">{secondary}</div>
      ) : null}
      {profile ? (
        <div className="flex h-16 items-center justify-center py-4">
          {profile}
        </div>
      ) : null}
    </nav>
  );
}

function SidebarIconRailItem({
  className,
  icon,
  label,
  badge = false,
  isActive = false,
  disabled = false,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  icon: React.ReactNode;
  label?: React.ReactNode;
  badge?: boolean;
  isActive?: boolean;
}) {
  return (
    <button
      type="button"
      data-slot="sidebar-icon-rail-item"
      data-active={isActive || undefined}
      disabled={disabled}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group/rail-item flex w-16 flex-col items-center gap-1 py-1 text-[10px] leading-4 font-medium text-[var(--cds-content-secondary)] outline-hidden disabled:pointer-events-none disabled:text-[var(--cds-content-disabled)] data-active:text-[var(--cds-brand-primary-content-default)]",
        className
      )}
      {...props}
    >
      <span className="relative flex size-8 items-center justify-center rounded-sm bg-[var(--cds-bg-subtle)] p-1 group-hover/rail-item:bg-[var(--cds-on-surface-action-hover)] group-focus-visible/rail-item:ring-2 group-focus-visible/rail-item:ring-[var(--cds-border-system)] group-disabled/rail-item:bg-[var(--cds-bg-subtle)] group-data-active/rail-item:bg-[var(--cds-on-surface-action-selected-strong)] group-data-active/rail-item:text-[var(--cds-brand-primary-content-default)] [&_svg]:size-5">
        {icon}
        {badge ? (
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-[var(--cds-status-error-on-surface-default)]"
          />
        ) : null}
      </span>
      {label ? <span>{label}</span> : null}
    </button>
  );
}

export { SidebarIconRail, SidebarIconRailItem };
