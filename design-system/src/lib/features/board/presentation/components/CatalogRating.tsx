import {
  Rating
} from "@/lib/app/components/app/patterns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/app/components/ui/card";
export function CatalogRating() {
  return (<Card>
    <CardHeader>
      <CardTitle>Rating</CardTitle>
    </CardHeader>
    <CardContent>
      <Rating />
    </CardContent>
  </Card>);
}
