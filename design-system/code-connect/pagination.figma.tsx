import figma from "@figma/code-connect";
import { TablePagination } from "../src/lib/app/components/app/table-pagination";
import { PaginationFirst, PaginationLast, PaginationLink, PaginationNext, PaginationPrevious } from "../src/lib/app/components/ui/pagination";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  TablePagination,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7223-100794",
  {
    props: {
      page: figma.enum("Case", { "First": 1, "Middle": 5, "Last": 10, "Empty": 1 }),
      total: figma.enum("Case", { "First": 100, "Middle": 100, "Last": 100, "Empty": 0 }),
    },
    example: ({ page, total }) => (
      <TablePagination page={page} pageSize={10} total={total} />
    ),
  },
);

figma.connect(
  PaginationLink,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7223-100855",
  {
    props: {
      page: figma.string("page"),
      isActive: figma.enum("state", { "selected": true }),
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ page, isActive, disabled }) => (
      <PaginationLink isActive={isActive} disabled={disabled}>{page}</PaginationLink>
    ),
  },
);

figma.connect(
  PaginationFirst,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7223-100871",
  {
    variant: {"type":"first"},
    props: {
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ disabled }) => (
      <PaginationFirst disabled={disabled} />
    ),
  },
);

figma.connect(
  PaginationPrevious,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7223-100871",
  {
    variant: {"type":"previous"},
    props: {
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ disabled }) => (
      <PaginationPrevious disabled={disabled} />
    ),
  },
);

figma.connect(
  PaginationNext,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7223-100871",
  {
    variant: {"type":"next"},
    props: {
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ disabled }) => (
      <PaginationNext disabled={disabled} />
    ),
  },
);

figma.connect(
  PaginationLast,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7223-100871",
  {
    variant: {"type":"last"},
    props: {
      disabled: figma.enum("state", { "disabled": true }),
    },
    example: ({ disabled }) => (
      <PaginationLast disabled={disabled} />
    ),
  },
);
