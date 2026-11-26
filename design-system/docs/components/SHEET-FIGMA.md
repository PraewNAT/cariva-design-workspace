# Bottom Sheet · Figma → Code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-45214). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


สถานะ Draft, 26 พฤศจิกายน 2026 · Core · branch `praew` · ไม่ได้ publish

แหล่งออกแบบ: [Bottom Sheet](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4481-19038), Header `4485:31705`, Content `4485:31742`.

## ขอบเขตที่ผู้ใช้ยืนยัน

ใช้ `SheetContent side="bottom"` เดิม ไม่สร้าง Drawer ใหม่ ไม่เปลี่ยน top/right/left หรือ Sidebar. Default/Search header, icon, สีตกแต่ง, พื้นที่เลื่อนและ footer ยืนยัน ใช้ Input/Field และ Button Core เดิม. ข้อมูลตัวเลือกใน stories เป็น fixture สำหรับตรวจ UI ไม่ใช่ business rule.

| ส่วน | สเปกและ API |
|---|---|
| Content | `side="bottom"`, เต็มความกว้าง, มุมบน 24px, สูงตามเนื้อหาและไม่เกิน viewport ลบ 24px; Base UI Dialog ดูแล modal/focus/Escape |
| Header | `variant="default"` หรือ `"search"`, `showTopColor=true`, `icon=undefined` ใช้ icon Figma, `icon=null` ซ่อน icon, ReactNode แทน icon ได้; options เหล่านี้มีผลเฉพาะ bottom |
| Default | ความสูง 72px เมื่อ title หนึ่งบรรทัด, padding บน 24/ข้าง 24/ล่าง 16, icon 32px |
| Search | ความสูง 152px เมื่อ title หนึ่งบรรทัดและมี Field/Input lg 48px พร้อม helper 12/16; icon 24px, gap 12px; Input เป็น children ไม่ใช่ search prop |
| Title | UI font ตาม theme (`--font-ui`), 20/28px, weight 600; ข้อความยาวตัดบรรทัดและทำให้ Header สูงขึ้นได้ |
| Close | ปุ่ม 32×32px ด้านบน/ขวา 24px, icon Figma 16px; `showCloseButton=false` ซ่อนปุ่มเดิม |
| Body | เพิ่ม `SheetBody` สำหรับ flex/overflow-y auto, min-height 0, padding 16/24; เนื้อหาไม่ดัน footer ออกนอกพื้นที่ |
| Footer | border บน, padding บน 24/ข้าง 16/ล่าง max(24px,safe-area-inset-bottom); stories ใช้ Button lg 48px |

Header Default/Search ใช้ SVG export เดิมใน `src/lib/app/components/ui/assets/sheet/` โดยเก็บขนาดและ viewBox เดิม. ที่ความกว้าง 375px Input ขยายตามพื้นที่จริงเหลือ 327px.

Figma documentation เก่าแสดง Header 76/136px แต่ node จริงเป็น 72/152px; งานนี้อ้าง node จริงตามที่ผู้ใช้ยืนยัน. ไม่ได้แก้หรือ sync เอกสารใน Figma เพราะทิศทางงานเป็น Figma → Code.

## ตัวอย่างจาก stories จริง

```tsx
<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>เปิด Bottom Sheet</SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader variant="search">
      <SheetTitle>Title</SheetTitle>
      <Field size="lg">
        <Input size="lg" type="search" aria-label="ค้นหารายการ" aria-describedby="sheet-help" />
        <FieldDescription id="sheet-help">พิมพ์เพื่อค้นหาตัวเลือก</FieldDescription>
      </Field>
    </SheetHeader>
    <SheetBody>{/* เนื้อหาจริงของแต่ละ Product */}</SheetBody>
    <SheetFooter><SheetClose render={<Button size="lg" />}>ยืนยัน</SheetClose></SheetFooter>
  </SheetContent>
</Sheet>
```

Input เป็น HTML search input ผ่าน Base UI; ใช้คีย์บอร์ดจริงของ browser/อุปกรณ์ ไม่มี GBoard จำลองหรือพื้นที่ keyboard แบบ fix height. การปรับความสูง viewport ใช้ `dvh`; การเปิด software keyboard และพฤติกรรม visual viewport บน iOS/Android ต้องตรวจบนอุปกรณ์จริง ยังไม่ถือว่าผ่านจาก desktop emulation.

Stories: Default (right เดิม), BottomDefault, BottomSearch (กรอง/ไม่พบ/ยืนยัน), MobileThai (24 ตัวเลือกและ title ยาว), PlainHeader, OtherSides, MobileSidebarRegression. ผลรอบสุดท้ายและข้อค้างอยู่ใน `SHEET-AUDIT.md`.

ตรวจใน Chromium ที่ 320/375/1280px แล้ว: Header สั้น 72/152px, input 48px, close 32px/icon 16px, gradient เต็ม Header และข้อความต่ำสุด 12px. Tab/Space/Escape, focus trap/restore, scroll body และ footer บน viewport สูง 480px ผ่าน; software keyboard จริงยังไม่ตรวจ. Storybook 9 stories ผ่านการรัน โดย accessibility มี contrast ค้างตามที่ผู้ใช้รับทราบ ไม่ถือว่าผ่าน AA ทั้งหมด.
