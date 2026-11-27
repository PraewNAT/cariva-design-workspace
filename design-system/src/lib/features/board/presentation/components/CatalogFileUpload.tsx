import {
  FileUpload
} from "@/lib/app/components/app/patterns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/app/components/ui/card";
export function CatalogFileUpload() {
  return (<Card>
    <CardHeader>
      <CardTitle>ไฟล์</CardTitle>
    </CardHeader>
    <CardContent>
      <FileUpload />
    </CardContent>
  </Card>);
}
