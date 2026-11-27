import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/app/components/ui/accordion";
import { Button } from "@/lib/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/app/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/app/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/lib/app/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/app/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/app/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/app/components/ui/tooltip";
import { useState } from "react";
export function CatalogNavigation() {
  const [page, setPage] = useState(1);
  return (<Card>
    <CardHeader>
      <CardTitle>Overlay & Navigation</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-5">
      <div className="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger render={<Button />}>
            ลอง Confirm dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ยืนยันการเปลี่ยนแปลง?</DialogTitle>
              <DialogDescription>
                ต้องการบันทึกการเปลี่ยนแปลงนี้หรือไม่
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                ยกเลิก
              </DialogClose>
              <DialogClose render={<Button />}>ยืนยัน</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            เปิด Drawer
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>รายละเอียด</SheetTitle>
              <SheetDescription>
                Drawer ด้านข้างจาก shadcn Sheet
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            เปิด Bottom sheet
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>ตัวเลือกเพิ่มเติม</SheetTitle>
              <SheetDescription>
                Bottom sheet จาก Core เดียวกัน
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" />}>
            คำอธิบาย
          </TooltipTrigger>
          <TooltipContent>ข้อมูลเพิ่มเติม</TooltipContent>
        </Tooltip>
      </div>
      <Tabs defaultValue="one">
        <TabsList aria-label="ตัวอย่างแท็บ">
          <TabsTrigger value="one">ข้อมูล</TabsTrigger>
          <TabsTrigger value="two">ประวัติ</TabsTrigger>
        </TabsList>
        <TabsContent value="one">รายละเอียดปัจจุบัน</TabsContent>
        <TabsContent value="two">ประวัติตัวอย่าง</TabsContent>
      </Tabs>
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>
            ข้อมูลเพิ่มเติมภาษาไทยที่ยาวและต้องขึ้นบรรทัดได้บนมือถือ
          </AccordionTrigger>
          <AccordionContent>
            ความสูงตามเนื้อหา ไม่กำหนด height ตายตัว
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#catalog"
              aria-disabled={page === 1}
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.max(1, page - 1));
              }}
            />
          </PaginationItem>
          {[1, 2, 3].map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href="#catalog"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#catalog"
              aria-disabled={page === 3}
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.min(3, page + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </CardContent>
  </Card>);
}
