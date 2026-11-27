import { DownloadRounded } from "@/lib/app/components/app/icons";
import { Button } from "@/lib/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/app/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/app/components/ui/dropdown-menu";
import { toast } from "@/lib/app/components/ui/toast";
import { Toggle } from "@/lib/app/components/ui/toggle";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/lib/app/components/ui/toggle-group";
import { useState } from "react";
export function CatalogButtons() {
  const [recording, setRecording] = useState(false);
  const [chip, setChip] = useState(true);
  return (<Card id="catalog">
    <CardHeader>
      <CardTitle>Button</CardTitle>
      <CardDescription>
        เล็ก 32 / กลาง 40 / ใหญ่ 48px ใช้ padding และ line-height
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="flex flex-wrap gap-3">
        {(
          [
            "default",
            "outline",
            "secondary",
            "ghost",
            "destructive",
            "link",
          ] as const
        ).map((v) => (
          <Button key={v} variant={v}>
            {v === "default" && <DownloadRounded />}
            {v}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">เล็ก</Button>
        <Button>กลาง</Button>
        <Button size="lg">ใหญ่</Button>
        <Button disabled>ปิดใช้งาน</Button>
        <Button loading>
          กำลังบันทึก
        </Button>
        <Button size="icon" aria-label="ดาวน์โหลด">
          <DownloadRounded />
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="decorative">ผู้ช่วย AI</Button>
        <Button
          aria-pressed={recording}
          onClick={() => setRecording(!recording)}
        >
          {recording ? "หยุดบันทึกตัวอย่าง" : "เริ่มบันทึกตัวอย่าง"}
        </Button>
        <Button size="icon-lg" aria-label="เพิ่มรายการ">
          +
        </Button>
        {chip && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setChip(false)}
          >
            ลบตัวกรองที่เลือก
          </Button>
        )}
        <Toggle aria-label="ปักหมุด">ปักหมุด</Toggle>
        <ToggleGroup defaultValue={["list"]}>
          <ToggleGroupItem value="list">รายการ</ToggleGroupItem>
          <ToggleGroupItem value="grid">ตาราง</ToggleGroupItem>
        </ToggleGroup>
        <DropdownMenu>
          <div className="inline-flex gap-1">
            <Button>บันทึก</Button>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              ตัวเลือกบันทึก
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => toast.add({ title: "บันทึกร่างแล้ว" })}
              >
                บันทึกร่าง
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardContent>
  </Card>);
}
