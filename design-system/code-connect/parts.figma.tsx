import figma from "@figma/code-connect";
import { CardSmallHorizontal } from "../src/lib/app/components/app/content-card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../src/lib/app/components/ui/breadcrumb";
import { PaginationRows, PaginationSummary } from "../src/lib/app/components/ui/pagination";
import { TablePagination } from "../src/lib/app/components/app/table-pagination";
import { SheetClose } from "../src/lib/app/components/ui/sheet";
import { SidebarIconRail } from "../src/lib/app/components/app/sidebar-rail";
import { StepCheckIcon, StepLoadingIcon } from "../src/lib/app/components/ui/stepper";
import { Tabs, TabsList, TabsTrigger } from "../src/lib/app/components/ui/tabs";
import { TableTextCell } from "../src/lib/app/components/ui/table";
import { TimePicker } from "../src/lib/app/components/app/date-time-pickers";
import { DialogOverlay } from "../src/lib/app/components/ui/dialog";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  CardSmallHorizontal,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4570-20655",
  {
    example: () => (
      <CardSmallHorizontal title="Header" description="Description" />
    ),
  },
);

figma.connect(
  Breadcrumb,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-5038",
  {
    example: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Page</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  },
);

figma.connect(
  PaginationRows,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7223-100920",
  {
    example: () => (
      <PaginationRows>10</PaginationRows>
    ),
  },
);

figma.connect(
  PaginationSummary,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7223-100923",
  {
    props: {
      label: figma.string("label"),
    },
    example: ({ label }) => (
      <PaginationSummary>{label}</PaginationSummary>
    ),
  },
);

figma.connect(
  TablePagination,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4829-33634",
  {
    example: () => (
      <TablePagination page={1} pageSize={10} total={100} />
    ),
  },
);

figma.connect(
  SheetClose,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-63716",
  {
    example: () => (
      <SheetClose />
    ),
  },
);

figma.connect(
  SidebarIconRail,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=5472-34956",
  {
    example: () => (
      <SidebarIconRail />
    ),
  },
);

figma.connect(
  StepLoadingIcon,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64134",
  {
    example: () => (
      <StepLoadingIcon />
    ),
  },
);

figma.connect(
  StepCheckIcon,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64271",
  {
    example: () => (
      <StepCheckIcon />
    ),
  },
);

figma.connect(
  TabsList,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4725-21088",
  {
    example: () => (
      <Tabs defaultValue="a">
        <TabsList variant="folder">
          <TabsTrigger value="a">Tab</TabsTrigger>
          <TabsTrigger value="b">Tab</TabsTrigger>
        </TabsList>
      </Tabs>
    ),
  },
);

figma.connect(
  TableTextCell,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4705-20105",
  {
    props: {
      description: figma.boolean("descriptionVisible", { true: "Description", false: undefined }),
    },
    example: ({ description }) => (
      <TableTextCell description={description}>Title</TableTextCell>
    ),
  },
);

figma.connect(
  TimePicker,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-61348",
  {
    example: () => (
      <TimePicker />
    ),
  },
);

figma.connect(
  TimePicker,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-61352",
  {
    example: () => (
      <TimePicker />
    ),
  },
);

figma.connect(
  DialogOverlay,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4722-90600",
  {
    example: () => (
      <DialogOverlay />
    ),
  },
);

figma.connect(
  DialogOverlay,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4722-90601",
  {
    example: () => (
      <DialogOverlay />
    ),
  },
);
