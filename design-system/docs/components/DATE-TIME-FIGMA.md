# Date / Time — Figma → Code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7228-128). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


Draft · 26 พฤศจิกายน 2026 · Core · working tree branch `praew`; ไม่ commit/publish

แหล่งออกแบบ: [Date/Time](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4294-5594). ทิศทาง Figma → Code; ไม่เขียนกลับ Figma.

| Figma | Code / Storybook |
|---|---|
| Date Picker 7204:61101 | `DatePicker` ใน `app/date-time-pickers.tsx`; Core/Components/Date Picker |
| crv-calendar 7204:61134 | `Calendar` เดิม ใน `ui/calendar.tsx`; Core/Components/Calendar |
| crv-calendar-day 7204:61116 | `CalendarDayButton` เดิม; ไม่สร้าง date engine ใหม่ |
| crv-time-picker 7204:61359 | `TimePicker`; Core/Components/Time Picker |
| time-popup 7204:61352 (เดิม crv-time-popup), time-column 7204:61334, time-option 7204:61376, time-actions 7204:61348 (เดิม crv-time-actions) | ภายใน TimePicker; Button/Popover/Field และ shared Input recipe เดิม |
| ตัวอย่างนัดหมายเดิม | `DateTimePicker` ใน `patterns.tsx`; Core/Components/Date Time Picker |

## พฤติกรรมที่ผู้ใช้ยืนยัน

DatePicker single เลือกวันแล้วปิด; range เก็บช่วงวันที่จาก React DayPicker และปิดเมื่อช่วงสมบูรณ์; birth เป็น single ที่ไม่อนุญาตเลือกอนาคต ไม่กำหนดอายุขั้นต่ำ/สูงสุด. ทุกวันที่แสดงบน trigger และตัวอย่างนัดหมายใช้ `DD/MM/YYYY` (ปีของ Date จริง) ไม่เปลี่ยนเป็น พ.ศ. อัตโนมัติ. ไม่ใช้วันที่ในช่องและปฏิทินคนละค่าตาม specimen Figma ที่ไม่สอดคล้องกัน.

TimePicker ใช้24ชั่วโมง ชั่วโมง00–23 นาทีย่อย00/15/30/45. การเลือกชั่วโมง/นาทีแก้ค่าร่าง; OK ยืนยันแล้วปิด, Escape/คลิกด้านนอกปิดโดยไม่เปลี่ยนค่าที่บันทึก, Clear ส่งnullและปิด. Now อ่านนาฬิกาของ browser ณ เวลากด ปัดลงช่วง15นาที เช่น09:37→09:30 และยังต้องกดOK. ไม่มี realtime interval, timezone conversion, API หรือ business rules ใน Core.

DateTimePicker เดิมประกอบจากสอง component นี้แทน native time input. ค่าเริ่มต้นเวลา09:00ยังคงเดิม; แสดงสถานะวันและเวลาจากค่าจริงที่ยืนยัน.

## API จริง

DatePicker รับ `mode` single (default)/range/birth, `value`/`defaultValue`, `onValueChange`, `defaultMonth`, `minDate`, `maxDate`, `disabledDates`. Single/birth ใช้ Date|undefined; range ใช้ DateRange|undefined และ callback ชนิดเดียวกัน. Birth ใช้วันที่ปัจจุบันเป็นขอบเขตสูงสุด และยอมให้ maxDate ที่เข้มกว่า. กฎ min/max ต้องส่งจาก Product ไม่อนุมานจากบริบทนัดหมาย.

TimePicker รับ `value`/`defaultValue` string|null, `onValueChange`, `placeholder`, `disabledHours: number[]`, `disabledMinutes: number[]`, `getNow?:()=>Date` (defaultนาฬิกาbrowser; storiesฉีด clock คงที่เพื่อทดสอบ). รูปแบบค่าที่รองรับ `HH:mm` โดยนาทีเป็น00/15/30/45; external value ที่ผิดรูปแบบมี aria-invalid และเปิดด้วยค่าร่างว่าง ไม่แก้ข้อมูลของผู้เรียกเงียบๆ. Disabled hours/minutes ข้ามไม่ได้ด้วย keyboard; OK/Now disabled เมื่อค่าที่จะใช้ไม่อนุญาต.

ทั้งสองรับ `id`, `label`, `ariaLabel`, `description`, `error`, `disabled`, `className`. label/description/error ใช้ Field เดิม. Trigger เป็น button ที่ใช้ shared Input visual recipe ไม่ใช่ช่องพิมพ์วัน/เวลา; ไม่มี free-text parsing. เมื่อส่ง `value` ถือเป็น controlled รวมถึง value=undefined/null; otherwiseใช้stateภายในจากdefaultValue. Component ไม่เขียน value ของผู้เรียกเองนอก onValueChange.

```tsx
const [date, setDate] = useState<Date>();
const [time, setTime] = useState<string | null>(null);
<DatePicker label="วันที่" value={date} onValueChange={setDate} />
<DatePicker mode="birth" label="วันเกิด" />
<TimePicker label="เวลา" value={time} onValueChange={setTime} />
```

## Visual recipes

Trigger กว้างอ้างอิง320px/max-width100%, สูง40px, text16/24 Regular, icon20px, Input radiusตามtheme, padding8/16. Labels12/16, error/helper12/16 และ active UI textไม่ต่ำกว่า12px.

Calendar ใช้ React DayPicker ที่ติดตั้ง10.0.2; คง mode/selection engine/components overrides เดิม. ปรับ content grid296pxบน outer320px (padding12), header/nav32px, ลูกศรเห็น16pxโดยscalewrapperของasset24pxเดิม, weekday14/20, แถววัน40px gap8, daybutton32px text12/16 Medium. Range ใช้พื้นbrand subtle เชื่อมช่วงและปลายวงกลมprimary; outside/disabledใช้content/disabledไม่ลดopacityทั้งก้อน. เดือน6สัปดาห์สูงเพิ่มตามจำนวนแถว ไม่ล็อกความสูง5แถว. Calendar rootบีบตามพื้นที่ได้บนมือถือ.

Time popup กว้าง192px; Hour/Minute listbox แยกกัน มี viewportชั่วโมง5แถว เลื่อนถึง00–23ได้; options32px/gap8, label14/20, options12/16 Medium, footerใช้Button sm. ใช้Popover Portalและshared control recipes. Popupอ้างFigmaมีphysical border; recipeปัจจุบันใช้inset ringจึงมีความสูงรวม293pxแทนspecimen295px โดยไม่เพิ่มpaddingนอกspacing scaleเพื่อบังคับความสูง. Date popup324pxสำหรับเดือน5แถว เทียบFigma326pxด้วยเหตุเดียวกัน; ยังไม่ถือว่าpixel parityผ่านทั้งหมด.

SVGจากFigmaอยู่ใน `ui/assets/calendar/` และ `app/assets/date-time/`; เก็บSVGต้นฉบับ/viewBox/ขนาดroot ไม่ใช้temporaryURLในruntime. รูปBirthและdefaultใช้assetคนละไฟล์ตามnode; clock20px. ไม่เพิ่มแพ็กเกจหรือรันshadcn add.

## ข้อค้างระหว่าง audit

รอคำยืนยันก่อนแก้เพิ่มเติม: calendar ref/keyboard, accessible name รวมvisible label, testsรอปิดpopup, popup radius16px, ชั่วโมงที่เลือกอยู่กลางviewportและคอลัมน์กว้างเท่ากัน. รอคำตัดสินใจเรื่องการคงcontrastตามFigma. ผลละเอียดอยู่ใน DATE-TIME-AUDIT.md เมื่อ audit รอบสุดท้ายเสร็จ.

อ้างอิงการประกอบจาก [shadcn Date Picker](https://ui.shadcn.com/docs/components/base/date-picker) (Calendar + Popover) โดยใช้ source ใน repo จริง ไม่คัดลอก stack อื่นหรืออัปเกรด dependencies.

## เปลี่ยนชื่อชุดใน Figma (26 พ.ย. 2026, ผู้ใช้ยืนยันตามเสนอ)

| ชื่อใหม่ | ชื่อเดิม | prop ที่เปลี่ยน | instance |
|---|---|---|---|
| `date-picker` | `Date Picker` | `State` → `state`: default / `focussed` → `open` / `Date Range` → `range` / `Birth` → `birth` | 4 → 4 |
| `calendar` | `crv-calendar` | `Selection` → `mode`: single / range / birth | 8 → 8 |
| `calendar-day` | `crv-calendar-day` | `State` → `state` ตัวพิมพ์เล็ก (`range-start`, `range-end`) | 385 → 385 |
| `time-picker` | `crv-time-picker` | — | 6 → 6 |
| `time-column` | `crv-time-column` | — | 10 → 10 |
| `time-option` | `crv-time-option` | — | 0 → 0 |

ค่า `mode` ในโค้ด: `DatePicker` `single` / `range` / `birth`; `Calendar` `single` / `range`
