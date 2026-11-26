import { Button } from "@/lib/app/components/ui/button";
import { DatePicker, TimePicker } from "./date-time-pickers";
import { format } from "date-fns";
import { Stepper as StepperBase } from "@/lib/app/components/ui/stepper";
import { useState } from "react";

export { FileUpload, FileUploadItem } from "./file-upload";
export function DateTimePicker() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string | null>("09:00");
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <DatePicker
        label="วันและเวลานัดหมาย"
        ariaLabel="เลือกวันที่"
        value={date}
        onValueChange={setDate}
      />
      <TimePicker label="เวลา" value={time} onValueChange={setTime} />
      <p role="status">
        {date
          ? `${format(date, "dd/MM/yyyy")}${time ? ` ${time}` : ""}`
          : "ยังไม่ได้เลือกวันที่"}
      </p>
    </div>
  );
}
export { Rating } from "./rating";
export function Stepper() {
  const [step, setStep] = useState(0);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [loading, setLoading] = useState(false);
  return (
    <div className="grid gap-4">
      <StepperBase
        aria-label="ขั้นตอนการทำงาน"
        value={step}
        orientation={orientation}
        loading={loading}
        steps={[
          { title: "ข้อมูล", description: "กรอกข้อมูลผู้ป่วย" },
          { title: "ตรวจสอบ", description: "ตรวจสอบความถูกต้อง" },
          { title: "เสร็จสิ้น", description: "ยืนยันและส่ง" },
        ]}
      />
      <div className="flex flex-wrap gap-2">
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
        <Button
          variant="outline"
          aria-pressed={orientation === "vertical"}
          onClick={() =>
            setOrientation(
              orientation === "vertical" ? "horizontal" : "vertical"
            )
          }
        >
          แนวตั้ง
        </Button>
        <Button
          variant="outline"
          aria-pressed={loading}
          onClick={() => setLoading(!loading)}
        >
          กำลังโหลด
        </Button>
      </div>
    </div>
  );
}
