import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/app/components/ui/breadcrumb";
import { CatalogAppointment } from "./components/CatalogAppointment";
import { CatalogButtons } from "./components/CatalogButtons";
import { CatalogFeedback } from "./components/CatalogFeedback";
import { CatalogFileUpload } from "./components/CatalogFileUpload";
import { CatalogForm } from "./components/CatalogForm";
import { CatalogNavigation } from "./components/CatalogNavigation";
import { CatalogRating } from "./components/CatalogRating";
import { CatalogStepper } from "./components/CatalogStepper";

export function CoreCatalog() {
  return (
    <main className="mx-auto grid max-w-6xl gap-8 p-6">
      <header>
        <h1 className="text-3xl font-semibold">Cariva Core / shadcn</h1>
        <p className="text-muted-foreground">
          Shared components สร้างด้วย Base UI ใช้สีและฟอนต์จาก Figma
        </p>
      </header>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#catalog">Core</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Component catalog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <CatalogButtons />
      <CatalogForm />
      <div className="grid gap-6 md:grid-cols-2">
        <CatalogAppointment />
        <CatalogFileUpload />
        <CatalogRating />
        <CatalogStepper />
      </div>
      <CatalogFeedback />
      <CatalogNavigation />
    </main>
  );
}
