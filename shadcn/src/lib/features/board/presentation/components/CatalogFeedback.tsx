import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/lib/app/components/ui/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/lib/app/components/ui/avatar";
import { Badge } from "@/lib/app/components/ui/badge";
import { Button } from "@/lib/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/app/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/lib/app/components/ui/empty";
import { Progress } from "@/lib/app/components/ui/progress";
import { ScrollArea } from "@/lib/app/components/ui/scroll-area";
import { Separator } from "@/lib/app/components/ui/separator";
import { Skeleton } from "@/lib/app/components/ui/skeleton";
import { Toaster, toast } from "@/lib/app/components/ui/toast";
export function CatalogFeedback() {
  return (<Card>
    <CardHeader>
      <CardTitle>Data & Feedback</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-5">
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>กน</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>พท</AvatarFallback>
        </Avatar>
      </AvatarGroup>
      <div className="flex gap-2">
        <Badge>ใหม่</Badge>
        <Badge variant="secondary">กำลังดำเนินการ</Badge>
        <Badge variant="outline">รอยืนยัน</Badge>
      </div>
      <Separator />
      <Alert>
        <AlertTitle>ข้อมูลจำลอง</AlertTitle>
        <AlertDescription>ไม่มีการเชื่อมต่อระบบผู้ป่วย</AlertDescription>
      </Alert>
      <Empty>
        <EmptyHeader>
          <EmptyTitle>ยังไม่มีรายการ</EmptyTitle>
          <EmptyDescription>รายการใหม่จะแสดงที่นี่</EmptyDescription>
        </EmptyHeader>
      </Empty>
      <Skeleton className="h-6 w-40" />
      <Progress value={60} aria-label="กำลังเตรียมข้อมูล" />
      <ScrollArea className="h-32 rounded-lg border p-4">
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>รายการที่ {i + 1}</p>
        ))}
      </ScrollArea>
      <Toaster>
        <Button
          onClick={() =>
            toast.add({
              title: "บันทึกแล้ว",
              description: "ตัวอย่างข้อความแจ้งเตือน",
            })
          }
        >
          แสดง Toast
        </Button>
      </Toaster>
    </CardContent>
  </Card>);
}
