# Combobox · Figma → code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4537-146774). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


26 พฤศจิกายน 2026 · Core · branch `praew` · React / shadcn Base UI

Visual source: [Autocomplete page](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4453-12569), [combobox set](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4454-12745). อ่าน context/screenshot ของชุดจริงและตรวจ binding เพิ่มแบบ read-only. ไม่ได้แก้หรือ publish Figma.

## Mapping และ contract ที่ implement

| Figma | Code | วิธีใช้ |
|---|---|---|
| `combobox` (`4454:12745`, 18 variants) | `src/lib/app/components/ui/combobox.tsx` | ใช้ implementation เดิมบน Base UI |
| `size=default / lg` | `ComboboxInput size="default" / "lg"` | ส่งขนาดเดียวกันให้ `Field` เพื่อให้ label ตรงกัน |
| `label`, `labelVisible` | `FieldLabel` | ใส่/ไม่ใส่ children และเชื่อม `htmlFor` กับ input `id` |
| `helperText`, `errorMessage` | `FieldDescription`, `FieldError` | ผูก `aria-describedby` กับข้อความที่แสดงจริง |
| `error` | `aria-invalid` ที่ `ComboboxInput`, `data-invalid` ที่ Field | การ validate เป็นหน้าที่ผู้เรียก ไม่แต่ง business rule |
| `filled`, `value` | `defaultValue` หรือ controlled `value` ที่ `Combobox` | ไม่เพิ่ม prop filled |
| `state=hover / focused` | browser hover/focus และ Base UI open state | ไม่เพิ่ม prop state เพื่อบังคับภาพ |
| `disabled` | Root/Input `disabled`, Field `data-disabled="true"` | ใช้สี disabled token ไม่ลด opacity ของ label |
| ลูกศรขึ้น/ลง | `ComboboxTrigger` เดิม + local SVG assets | ขึ้นเมื่อ popup เปิด ลงเมื่อปิด; disabled ใช้ asset สี disabled |
| รายการ | `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxEmpty` | ใช้ filtering/selection ของ Base UI เดิม |

Root `Combobox` ยังคงเป็น Base UI Root alias. `ComboboxInput` เพิ่ม named size โดยแยกจาก native HTML `size`. คง `showTrigger`, `showClear`, children และ input props ที่มีอยู่; ไม่เพิ่ม label/error/value wrapper ซ้ำกับ Field. รูปแบบ multiselect/chips และ input-inside-popup เดิมไม่ได้ redesign ในงานนี้.

## Recipe

| รายการ | default | lg |
|---|---|---|
| ความสูงช่อง | 40px | 48px |
| Input typography | 16/24px Regular | 16/24px Regular |
| Label | 12/16px Medium | 14/20px Medium |
| Helper/error | 12/16px | 12/16px |
| Icon box | 20×20px | 24×24px |
| Input left inset / icon right inset | 16px | 16px |
| Gap ระหว่าง text area และลูกศร | 8px | 8px |

`ComboboxInput` ประกอบ `ComboboxPrimitive.InputGroup` ผ่าน `render={<InputGroup size={size} />}` ให้ anchor เป็นทั้งช่อง ไม่ชดเชยความกว้าง popup ด้วยตัวเลขเพิ่ม. Native input ใช้ `InputGroupInput` เดิม. ใช้ `--font-ui`, ขนาด16/line-height24 ที่ container เพื่อไม่รับ line-height22.4px จากหน้าและ20pxจาก Dialog ต่างกัน.

สี, radius และขอบของช่องใช้ InputGroup recipe เดิม: normal `border/default`1px, hover `border/strong`1px, focus `border/system`2px, error `border/error`2px, disabled `on-surface/action/disabled` + `content/disabled`. Radius ตาม `--input-radius` ของ Product. ใช้ inset ring จึงไม่เพิ่ม geometry เมื่อ focus/error. คงข้อความขั้นต่ำ12px.

**ตรวจ binding จริงแล้ว:** node `4454:12708` ผูก fill กับ `VariableID:3730:5202` ชื่อ `color/status/error/content/default` สี `#DC2626`. ชื่อ success ใน generated context เป็นความคลาดเคลื่อนของเครื่องมือ ไม่ใช่เหตุผลให้แก้ตัวแปรหรือ Figma. โค้ดใช้ FieldError และ semantic error token เดิม.

## Scope เพิ่มที่ผู้ใช้ยืนยัน

- Popup `sideOffset` 6→4px; item gap10→8px; group heading padding14/10→16/8px. ไม่แก้ chips ที่อยู่นอก visual target.
- `FieldLabel` กลาง: disabled เปลี่ยนจาก opacity50% เป็น `content/disabled` และ opacity100%; ตรวจทั้ง explicit `Field data-disabled="true"` และ input ที่ disabled ใน Field. กระทบ label ของ Input/Field consumers ด้วย จึงตรวจ regression ของ Field/InputGroup/Input.
- Container typography ของ Combobox ถูกกำหนดที่ component หลัง audit พบความต่างของหน้า/portal; ไม่เปลี่ยน InputGroup กลางเพิ่ม.

## Local assets

SVGs ที่ `src/lib/app/components/ui/assets/combobox/` มาจาก Figma โดยตรง: down/up ของ default/lg และ disabled down ของ default/lg. ไม่ใส่ URL ชั่วคราวใน runtime และไม่แก้ SVG paths. Exports ของ glyph default มี native bounds ประมาณ9.3125×5.4875px วางกลาง icon box20px; lg และ disabled exports มี canvas24/20pxตามต้นฉบับ. ไม่ขยาย native glyph ให้เต็ม wrapper. Layout ใช้ grid centering และสถานะ data attributes ของ Base UI.

## Usage

```tsx
<Field size="lg">
  <FieldLabel htmlFor="group">ค้นหากลุ่ม</FieldLabel>
  <Combobox items={["ตับ", "ไต", "เลือด"]}>
    <ComboboxInput id="group" size="lg" aria-describedby="group-help" />
    <ComboboxContent>
      <ComboboxEmpty>ไม่พบรายการ</ComboboxEmpty>
      <ComboboxList aria-label="กลุ่มการตรวจ">
        {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
  <FieldDescription id="group-help">พิมพ์เพื่อค้นหาและเลือกจากรายการ</FieldDescription>
</Field>
```

เมื่อใช้ภายใน Dialog ให้ scope Product ของ controls ใน portal อย่างชัดเจนตามโครงสร้าง Product ที่มีอยู่. ตัวอย่างใน story ใช้ backOffice ทั้งหน้าหลักและเนื้อหา Dialog. ไม่ถือว่า portal รับ CSS variables จาก DOM parent ที่อยู่นอก portal อัตโนมัติ.

## Stories และการตรวจ

คง Default ID และเพิ่ม Sizes, States, NoResults, Keyboard, PageAndDialog, MobileThai. States แสดง empty/filled/error-empty/error-filled/disabled ทั้งสองขนาด; hover/focus ใช้ browser จริง ไม่สร้าง fake state props. ตรวจ filtering, การเลือก, ไม่พบรายการ, ArrowDown/Enter/Escape, popup ใน Dialog, focus restoration และเนื้อหาไทยยาวที่320px.

การกด End ใน input ของ Base UI ใช้เลื่อน caret จึงไม่ใช้เป็นสมมติฐานว่าเลือก option สุดท้าย. Keyboard story ใช้ ArrowDown เพื่อเปลี่ยน highlighted option และ Enter เลือก. CSS hover วัดผ่าน pointer ของ browser จริง เพราะ synthetic hover ไม่สร้าง CSS pseudostate. Tests รอ popup animation ก่อนตรวจ visibility.

Consumer จริง: `CatalogForm.tsx` → `CoreCatalog`. ใช้ imports เดิม ไม่ทำ per-page control recipes. Shared FieldLabel มี consumer ของ Input/Field ที่ต้องตรวจด้วย.

Figma on-canvas doc `4537:146774` ยังมีชื่อ/sizeเก่า (`crv-autocomplete`, small/medium) ตาม metadata ที่อ่าน; pending การแก้เอกสาร Figma เพราะรอบนี้เป็น Figma→Code. ไม่มีการ rename, publish library หรือ Code Connect. รายงานผลตรวจสุดท้ายและ gap แยกใน `COMBOBOX-AUDIT.md`; ไม่อ้าง pixel-perfect หรือทุก Product ผ่านเมื่อยังไม่มีหลักฐาน.
