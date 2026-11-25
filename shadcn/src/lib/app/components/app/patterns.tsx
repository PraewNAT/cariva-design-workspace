import { Badge } from "@/lib/app/components/ui/badge";
import { Button } from "@/lib/app/components/ui/button";
import { Calendar } from "@/lib/app/components/ui/calendar";
import { Input } from "@/lib/app/components/ui/input";
import { Label } from "@/lib/app/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/app/components/ui/popover";
import { Progress } from "@/lib/app/components/ui/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/lib/app/components/ui/radio-group";
import { useId, useState } from "react";

/** Local-file selection only. Transport/security validation belongs to the Product. */
export function FileUpload() {
  const id = useId();
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>เลือกไฟล์เอกสาร</Label>
      <Input
        id={id}
        type="file"
        accept=".pdf,.csv"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {file
          ? `${file.name} (${Math.ceil(file.size / 1024)} KB) พร้อมเลือก ยังไม่ได้อัปโหลด`
          : "รองรับ PDF และ CSV ตัวอย่างนี้ยังไม่ส่งไฟล์ไปเซิร์ฟเวอร์"}
      </p>
      <Button
        variant="outline"
        disabled={!file}
        onClick={() => {
          setFile(null);
          const input = document.getElementById(id) as HTMLInputElement;
          input.value = "";
        }}
      >
        ล้างไฟล์
      </Button>
    </div>
  );
}
export function DateTimePicker() {
  const id = useId();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("09:00");
  return (
    <div className="grid gap-3">
      <Label>วันและเวลานัดหมาย</Label>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          {date ? date.toLocaleDateString("th-TH") : "เลือกวันที่"}
        </PopoverTrigger>
        <PopoverContent aria-label="เลือกวันนัดหมาย" className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
      <Label htmlFor={id}>เวลา</Label>
      <Input
        id={id}
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <p role="status">
        {date ? `${date.toLocaleDateString("th-TH")} ${time}` : "ยังไม่ได้เลือกวันที่"}
      </p>
    </div>
  );
}
export function Rating() {
  const labelId = useId();
  const [value, setValue] = useState("3");
  return (
    <div className="grid gap-3">
      <Label id={labelId}>ให้คะแนนประสบการณ์</Label>
      <RadioGroup
        aria-labelledby={labelId}
        value={value}
        onValueChange={(v) => setValue(String(v))}
        className="flex flex-wrap gap-4"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <Label key={n} className="flex gap-2">
            <RadioGroupItem value={String(n)} />
            {n} ดาว
          </Label>
        ))}
      </RadioGroup>
      <p role="status">เลือก {value} จาก 5 ดาว</p>
    </div>
  );
}
export function Stepper() {
  const [step, setStep] = useState(0);
  return (
    <div className="grid gap-4">
      <ol aria-label="ขั้นตอนการทำงาน" className="flex flex-wrap gap-4">
        {["ข้อมูล", "ตรวจสอบ", "เสร็จสิ้น"].map((text, i) => (
          <li key={text} aria-current={step === i ? "step" : undefined}>
            <Badge variant={step === i ? "default" : "secondary"}>
              {i + 1} {text}
            </Badge>
          </li>
        ))}
      </ol>
      <Progress value={((step + 1) / 3) * 100} aria-label="ความคืบหน้า" />
      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={!step}
          onClick={() => setStep(step - 1)}
        >
          ย้อนกลับ
        </Button>
        <Button disabled={step === 2} onClick={() => setStep(step + 1)}>
          ถัดไป
        </Button>
      </div>
    </div>
  );
}
