import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/app/components/ui/card";
import { Checkbox } from "@/lib/app/components/ui/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/lib/app/components/ui/combobox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/lib/app/components/ui/field";
import { Input } from "@/lib/app/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/lib/app/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/lib/app/components/ui/input-otp";
import { Label } from "@/lib/app/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/lib/app/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/app/components/ui/select";
import { Slider } from "@/lib/app/components/ui/slider";
import { Switch } from "@/lib/app/components/ui/switch";
import { Textarea } from "@/lib/app/components/ui/textarea";
export function CatalogForm() {
  return (<Card>
    <CardHeader>
      <CardTitle>Form</CardTitle>
    </CardHeader>
    <CardContent>
      <FieldGroup className="grid gap-6 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="demo-name">ชื่อผู้ใช้</FieldLabel>
          <Input id="demo-name" placeholder="กรอกชื่อ" />
          <FieldDescription>รองรับข้อความภาษาไทย</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="demo-error">รหัสตัวอย่าง</FieldLabel>
          <Input
            id="demo-error"
            aria-invalid
            aria-describedby="error-message"
          />
          <FieldError id="error-message">กรุณากรอกรหัส</FieldError>
        </Field>
        <Field>
          <FieldLabel>กลุ่มการตรวจ</FieldLabel>
          <Select
            items={["ทั้งหมด", "ตับ", "ไต"].map((value) => ({
              value,
              label: value,
            }))}
            defaultValue="ทั้งหมด"
          >
            <SelectTrigger aria-label="กลุ่มตัวอย่าง" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {["ทั้งหมด", "ตับ", "ไต"].map((v) => (
                  <SelectItem value={v} key={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="search-group">ค้นหากลุ่ม</FieldLabel>
          <Combobox items={["ตับ", "ไต", "เลือด"]}>
            <ComboboxInput id="search-group" />
            <ComboboxContent>
              <ComboboxEmpty>ไม่พบรายการ</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
        <Field>
          <FieldLabel htmlFor="memo">รายละเอียด</FieldLabel>
          <Textarea id="memo" rows={3} />
        </Field>
        <Field>
          <FieldLabel htmlFor="search">Input group</FieldLabel>
          <InputGroup>
            <InputGroupAddon>ค้นหา</InputGroupAddon>
            <InputGroupInput id="search" />
          </InputGroup>
        </Field>
        <Label>
          <Checkbox defaultChecked />
          ยอมรับเงื่อนไข
        </Label>
        <Label>
          <Switch defaultChecked />
          แจ้งเตือน
        </Label>
        <RadioGroup defaultValue="email" aria-label="ช่องทาง">
          <Label>
            <RadioGroupItem value="email" />
            อีเมล
          </Label>
          <Label>
            <RadioGroupItem value="sms" />
            SMS
          </Label>
        </RadioGroup>
        <Field>
          <FieldLabel>ระดับ</FieldLabel>
          <Slider defaultValue={[50]} aria-label="ระดับ" />
        </Field>
        <Field>
          <FieldLabel htmlFor="otp">รหัส OTP</FieldLabel>
          <InputOTP id="otp" maxLength={6}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot index={i} key={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Field>
        <Input aria-label="ช่องกรอกปิดใช้งาน" disabled value="ปิดใช้งาน" />
      </FieldGroup>
    </CardContent>
  </Card>);
}
