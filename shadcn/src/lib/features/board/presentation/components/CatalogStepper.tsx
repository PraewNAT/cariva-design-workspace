import {
  Stepper
} from "@/lib/app/components/app/patterns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/app/components/ui/card";
export function CatalogStepper() {
  return (<Card>
    <CardHeader>
      <CardTitle>Stepper</CardTitle>
    </CardHeader>
    <CardContent>
      <Stepper />
    </CardContent>
  </Card>);
}
