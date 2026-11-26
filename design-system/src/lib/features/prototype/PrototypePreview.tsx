import { CoreCatalog } from "../board/presentation/CoreCatalog";
import { CatalogAppointment } from "../board/presentation/components/CatalogAppointment";
import { CatalogForm } from "../board/presentation/components/CatalogForm";
import { TooltipProvider } from "@/lib/app/components/ui/tooltip";

// Existing DS examples, not approved Product screens. One renderer for Vite and Storybook.
export const prototypeCases = [
  { id: "catalog", title: "Component catalog", component: CoreCatalog },
  { id: "appointment", title: "วันที่และเวลา", component: CatalogAppointment },
  { id: "form", title: "Form controls", component: CatalogForm },
] as const;
export function PrototypePreview({ caseId = "catalog" }: { caseId?: string }) {
  const entry = prototypeCases.find(item => item.id === caseId);
  if (!entry) return <main className="p-6 text-sm">ไม่พบเคสนี้ <a href="?case=catalog">กลับไปหน้า catalog</a></main>;
  const Screen = entry.component;
  const Container = entry.id === "catalog" ? "div" : "main";
  return <TooltipProvider><Container aria-label={entry.title} className="min-h-screen bg-background p-4 text-foreground"><Screen /></Container></TooltipProvider>;
}
