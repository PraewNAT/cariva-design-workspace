import { cn } from "cn";
import * as React from "react";

import {
  ChevronLeftRounded,
  ChevronRight20Rounded,
  FirstPageRounded,
  LastPageRounded,
} from "@/lib/app/components/app/icons";

/**
 * Figma `pagination` family (docs/components/PAGINATION-FIGMA.md): 32px round buttons,
 * 8px apart; selected page = filled primary; hover / pressed = `on-surface/action/selected`;
 * disabled = `content/disabled`.
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

const paginationButtonClass =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm leading-5 font-normal text-[var(--cds-content-primary)] transition-colors outline-none hover:bg-[var(--cds-on-surface-action-selected)] active:bg-[var(--cds-on-surface-action-selected)] focus-visible:ring-2 focus-visible:ring-[var(--cds-border-system)] aria-[current=page]:bg-[var(--cds-brand-primary-on-surface-default)] aria-[current=page]:text-[var(--cds-brand-primary-content-on-fill)] aria-[current=page]:hover:bg-[var(--cds-brand-primary-on-surface-hover)] aria-disabled:pointer-events-none aria-disabled:text-[var(--cds-content-disabled)] aria-disabled:hover:bg-transparent [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0";

type PaginationLinkProps = {
  /** Figma `state=selected` (the current page). */
  isActive?: boolean;
  disabled?: boolean;
} & React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  disabled,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled || undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(paginationButtonClass, className)}
      {...props}
    />
  );
}

/** Figma `pagination-control` type=first. */
function PaginationFirst({ className, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to first page"
      className={className}
      {...props}
    >
      <FirstPageRounded />
    </PaginationLink>
  );
}

/** Figma `pagination-control` type=previous. */
function PaginationPrevious({ className, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={className}
      {...props}
    >
      <ChevronLeftRounded />
    </PaginationLink>
  );
}

/** Figma `pagination-control` type=next. */
function PaginationNext({ className, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={className}
      {...props}
    >
      <ChevronRight20Rounded />
    </PaginationLink>
  );
}

/** Figma `pagination-control` type=last. */
function PaginationLast({ className, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to last page"
      className={className}
      {...props}
    >
      <LastPageRounded />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center text-sm leading-5 text-[var(--cds-content-primary)]",
        className
      )}
      {...props}
    >
      …<span className="sr-only">More pages</span>
    </span>
  );
}

/** Figma `pagination-summary`: "Showing 11 to 20 of 100 products". */
function PaginationSummary({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="pagination-summary"
      className={cn(
        "text-sm leading-5 text-[var(--cds-content-secondary)]",
        className
      )}
      {...props}
    />
  );
}

/** Figma `pagination-rows`: label + a Select (default size, 40px) for rows per page. */
function PaginationRows({
  label = "Rows per page",
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  label?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      data-slot="pagination-rows"
      className={cn(
        "flex items-center gap-3 text-sm leading-5 text-[var(--cds-content-primary)]",
        className
      )}
      {...props}
    >
      <span>{label}</span>
      {children}
    </div>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationRows,
  PaginationSummary,
};
