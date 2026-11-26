# Date/Time audit — รอคำตัดสินใจ

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7228-128). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


26 พฤศจิกายน 2026 · Core · branch `praew` · checkpoint `output/date-time/baseline/` · ไม่ commit/publish

**Reuse & Duplicate Check — Core Date/Time**
ผลรวม: ใช้ Calendar/Popover/Field/Button และ Input recipe เดิม เพิ่ม reusable DatePicker/TimePicker โดยไม่สร้าง date engine ซ้ำ
ขอบเขต: source, docs-list/docs-show, Calendar consumers ทั้งตัวอย่างนัดหมายและ catalog; ไม่เพิ่ม dependency

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | Calendar คง React DayPicker engine; DatePicker composition จาก Popover+Calendar ตามshadcn; TimePickerใช้Button/Fieldเดิม | date-time-pickers.tsx, calendar.tsx | ไม่ติดตั้ง package เพิ่ม |
| — | ผ่าน | DateTimePickerเดิมประกอบจากสองcomponentใหม่; Coreไม่มี API/routing/age rules | patterns.tsx, DATE-TIME-FIGMA.md | ตรวจconsumersรอบสุดท้าย |

สรุป: ผ่าน2, ต้องแก้0, ตรวจไม่ได้0ในreuse scope
ต่อไป: รอคำตัดสินใจจาก component audit

**Component Audit — Core Date/Time**
ผลรวม: ฟังก์ชันหลักทำแล้ว; interactionผ่าน19/20 แต่ยังมี defect/ข้อค้างที่รออนุญาตก่อนแก้
ขอบเขต: Chromium page/Dialog, mobile320px, native keyboard, Figma context, controlled/uncontrolled, Calendar/appointment/catalog; ยังไม่รับรองhandoffหรือAAทั้งหมด

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| สูง | ต้องแก้ | CalendarDayButtonสร้างrefแต่ไม่ส่งให้Button; native keyboardเริ่มที่ปุ่มnavigationแทนวันที่ | baseline/calendar.tsx; native-audit.json calendarActiveElement | รออนุญาตผูกref |
| กลาง | ต้องแก้ | accessible name ของ triggerไม่รวมvalue/placeholder; วัน1แสดง1แต่nameเป็น01/09/2024 | Storybook label-content-name-mismatch | รออนุญาตเพิ่มvisible textในชื่อ |
| กลาง | ต้องแก้ | Time Default testตรวจfocusก่อนpopupถอดDOM; closing storiesบางตัวมีfocus-guard transient | tests19/20; nativefocusAfterClose=true | รออนุญาตให้testsรอปิดDOMจริง |
| กลาง | ต้องแก้ | Popover rounded-2xlคำนวณ32pxแทนFigma16; ชั่วโมง08อยู่ท้ายviewport; dividerทำคอลัมน์ไม่เท่ากันเล็กน้อย | time-popup.png, native-audit.json | รออนุญาตแก้เฉพาะDate/Time |
| กลาง | ต้องแก้ | สีprimary selectedและวันนอกเดือนกดได้ยังcontrastต่ำ; error/shared controlsมีข้อค้างเดิม | Storybook color-contrast | รอคำตัดสินใจคงสี/บันทึก |
| — | ตรวจไม่ได้ | EveryProduct/font mode และpixel parityสมบูรณ์ | source/renderเฉพาะscopeนี้ | ไม่อ้างผ่านทั้งหมด |
| — | ผ่าน | Single/Range/Birth constraints, draft/OK/Now09:37→09:30/Clear/Escape, disabledoptions, formatDD/MM/YYYY | stories19pass; native23:15; source | ไม่สร้างbusiness rulesเพิ่ม |
| — | ผ่าน | Trigger40px text16/24 icon20, UI text≥12; native320pxไม่ล้น; build/migration/tokens/Storybookbuild/coverage40/40ผ่าน | output/date-time logs/native-audit.json | ตรวจรอบสุดท้ายหลังแก้ |

สรุป: ผ่าน2, ต้องแก้5กลุ่ม, ตรวจไม่ได้1กลุ่ม; ยังไม่ปิดงาน
ต่อไป: รับคำยืนยันเฉพาะข้อที่แจ้ง แล้วแก้และรันfocused regressionก่อนhandoff

## ขอบเขต parity

Figma specimenวันที่ในช่องกับเดือนปฏิทินบางจุดไม่ตรงกัน โค้ดใช้Dateจริงเดียวกันตามที่ผู้ใช้ยืนยัน. Inset-ring popup recipeมีขนาดนอกน้อยกว่าphysical border specimen2px (Time293เทียบ295, Date324เทียบ326) โดยคงspacing/เนื้อหาและไม่เพิ่มpaddingกลางscaleเพื่อบังคับheight. ยังไม่ถือว่าpixel parityสมบูรณ์. SVGต้นฉบับไม่แก้paths/viewBox; ลูกศรroot24ใช้wrapper scaleให้เห็น16pxตามFigma.

มีCalendar3stories, DatePicker6, TimePicker8 และDateTimePicker1; ทุกตัวอย่างอยู่Core/Componentsของตัวเอง. ไม่แก้FigmaหรือpublishCodeConnect. Unit testsในStorybookและnativekeyboardเป็นการตรวจbrowser ไม่ใช่การรับรองทุกassistive technology.
