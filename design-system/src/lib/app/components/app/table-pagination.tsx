import {
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
} from "@/lib/app/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/app/components/ui/select";
import { cn } from "cn";

/** Page numbers to show, matching the Figma cases First / Middle / Last. */
function pageWindow(page: number, count: number): (number | "…")[] {
  if (count <= 5) return Array.from({ length: count }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, "…", count];
  if (page >= count - 2) return [1, "…", count - 2, count - 1, count];
  return [1, "…", page - 1, page, page + 1, "…", count];
}

/**
 * Figma `pagination` (Case First / Middle / Last / Empty): rows per page, summary and the
 * page navigation in one row. `total` 0 = Empty (everything disabled, no page numbers).
 */
function TablePagination({
  page,
  pageSize,
  total,
  pageSizes = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
  rowsLabel = "Rows per page",
  summary = (from: number, to: number, of: number) =>
    `Showing ${from} to ${to} of ${of} products`,
  className,
}: {
  page: number;
  pageSize: number;
  total: number;
  pageSizes?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  rowsLabel?: string;
  summary?: (from: number, to: number, total: number) => string;
  className?: string;
}) {
  const count = Math.max(1, Math.ceil(total / pageSize));
  const empty = total === 0;
  const from = empty ? 0 : (page - 1) * pageSize + 1;
  const to = empty ? 0 : Math.min(page * pageSize, total);
  const go = (n: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange?.(n);
  };
  return (
    <div
      data-slot="table-pagination"
      className={cn("flex w-full items-center gap-4", className)}
    >
      <PaginationRows label={rowsLabel}>
        <Select
          items={pageSizes.map((n) => ({ value: String(n), label: String(n) }))}
          value={String(pageSize)}
          onValueChange={(v) => v && onPageSizeChange?.(Number(v))}
        >
          <SelectTrigger aria-label={rowsLabel} className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizes.map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PaginationRows>
      <PaginationSummary className="flex-1">
        {summary(from, to, total)}
      </PaginationSummary>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst
              href="#"
              disabled={empty || page <= 1}
              onClick={go(1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              disabled={empty || page <= 1}
              onClick={go(page - 1)}
            />
          </PaginationItem>
          {!empty &&
            pageWindow(page, count).map((p, i) => (
              <PaginationItem key={`${p}-${i}`}>
                {p === "…" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={p === page}
                    onClick={go(p)}
                  >
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              disabled={empty || page >= count}
              onClick={go(page + 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              href="#"
              disabled={empty || page >= count}
              onClick={go(count)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export { TablePagination, pageWindow };
