"use client";

import { ArrowDownwardFilled } from "@/lib/app/components/app/icons";
import { cn } from "cn";
import * as React from "react";

/**
 * Figma `table-head`, `table-cell`, `table-text-cell`, `table-scroll-shadow`
 * (docs/components/TABLE-FIGMA.md). `size` is set once on `Table` and shared by head and cells
 * (Figma: never mix sizes). Head: `on-surface/subtle`, 14/20 Medium, padding 16 (sm 7/16).
 * Cell: padding 16, min height 54 (sm 4/16, 36), hover `on-surface/action/hover`, zebra
 * `on-surface/subtle` with `striped`. The Figma cells have no borders. Only what Figma has is
 * built: no caption, no tfoot (the footer is `TablePagination`) and no sort state or handler.
 */
function Table({
  className,
  size = "default",
  striped = false,
  ...props
}: Omit<React.ComponentProps<"table">, "size"> & {
  size?: "default" | "sm";
  striped?: boolean;
}) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        data-size={size}
        data-striped={striped || undefined}
        className={cn("group/table w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn(className)} {...props} />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />;
}

function TableRow({
  className,
  disabled,
  ...props
}: React.ComponentProps<"tr"> & { disabled?: boolean }) {
  return (
    <tr
      data-slot="table-row"
      data-disabled={disabled || undefined}
      className={cn("group/row", className)}
      {...props}
    />
  );
}

function TableHead({
  className,
  children,
  compact = false,
  sort,
  ...props
}: React.ComponentProps<"th"> & {
  /** Figma `compact`: fixed square for a checkbox or icon only column. */
  compact?: boolean;
  /** Figma `leftSortVisible` / `rightSortVisible`: which side shows the sort arrow. */
  sort?: "left" | "right";
}) {
  const arrow = sort ? (
    <span
      data-slot="table-sort-icon"
      className="flex size-[22px] shrink-0 items-center justify-center text-[var(--cds-content-secondary)]"
    >
      <ArrowDownwardFilled />
    </span>
  ) : null;
  return (
    <th
      data-slot="table-head"
      data-compact={compact || undefined}
      className={cn(
        "bg-[var(--cds-on-surface-subtle)] text-left align-middle text-sm leading-5 font-medium whitespace-nowrap text-[var(--cds-content-primary)] group-data-[size=default]/table:px-4 group-data-[size=default]/table:py-4 group-data-[size=sm]/table:px-4 group-data-[size=sm]/table:py-[7px]",
        compact &&
          "group-data-[size=default]/table:size-[54px] group-data-[size=default]/table:px-4 group-data-[size=default]/table:py-4 group-data-[size=sm]/table:size-9 group-data-[size=sm]/table:px-2 group-data-[size=sm]/table:py-2",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center group-data-[size=default]/table:h-[22px] group-data-[size=sm]/table:h-5",
          !compact && "gap-2"
        )}
      >
        {sort === "left" ? arrow : null}
        {children}
        {sort === "right" ? arrow : null}
      </div>
    </th>
  );
}

function TableCell({
  className,
  compact = false,
  ...props
}: React.ComponentProps<"td"> & {
  /** Matches a compact head: narrow column for a checkbox or icon (sm side padding 8). */
  compact?: boolean;
}) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "bg-[var(--cds-on-surface-default)] align-middle text-sm leading-5 whitespace-nowrap text-[var(--cds-content-primary)] group-data-[size=default]/table:min-h-[54px] group-data-[size=default]/table:p-4 group-data-[size=sm]/table:min-h-9 group-data-[size=sm]/table:px-4 group-data-[size=sm]/table:py-1",
        "group-data-[size=default]/table:h-[54px] group-data-[size=sm]/table:h-9",
        "group-data-[striped=true]/table:group-even/row:bg-[var(--cds-on-surface-subtle)]",
        compact && "group-data-[size=sm]/table:px-2",
        "group-hover/row:bg-[var(--cds-on-surface-action-hover)]!",
        "group-data-disabled/row:bg-transparent! group-data-disabled/row:text-[var(--cds-content-disabled)]",
        className
      )}
      {...props}
    />
  );
}

/** Figma `table-text-cell`: main text 14/20 and an optional description 12/16. */
function TableTextCell({
  className,
  description,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  description?: React.ReactNode;
}) {
  return (
    <div
      data-slot="table-text-cell"
      className={cn("flex flex-col", className)}
      {...props}
    >
      <span className="text-sm leading-5">{children}</span>
      {description ? (
        <span className="text-xs leading-4 text-[var(--cds-content-secondary)] group-data-disabled/row:text-[var(--cds-content-disabled)]">
          {description}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Figma `table-scroll-shadow`: 16px edge shadow for a pinned column while the table scrolls
 * sideways. Place it inside a relatively positioned wrapper next to the pinned column.
 */
function TableScrollShadow({
  className,
  side,
  ...props
}: React.ComponentProps<"div"> & { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      data-slot="table-scroll-shadow"
      data-side={side}
      className={cn(
        "pointer-events-none absolute inset-y-0 w-4",
        side === "left"
          ? "left-0 bg-gradient-to-r from-black/[0.08] via-black/[0.04] to-transparent"
          : "right-0 bg-gradient-to-l from-black/[0.08] via-black/[0.04] to-transparent",
        className
      )}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableScrollShadow,
  TableTextCell,
};
