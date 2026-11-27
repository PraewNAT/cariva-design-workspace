import {
  DateTimePicker
} from "@/lib/app/components/app/patterns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/app/components/ui/card";
export function CatalogAppointment() {
  return (<Card>
    <CardHeader>
      <CardTitle>วันที่และเวลา</CardTitle>
    </CardHeader>
    <CardContent>
      <DateTimePicker />
    </CardContent>
  </Card>);
}
