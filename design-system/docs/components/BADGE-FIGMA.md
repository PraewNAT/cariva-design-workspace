# Badge · Figma → code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-57628). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


26 พฤศจิกายน 2026 · Core · branch `praew`

Source: [Badge page](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4518-82928), [crv-badge set](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4518-82967). อ่าน context/screenshot และ fill bindings ของทั้ง6สีแบบ read-only. ไม่มี static image/SVG assets ใน component นี้.

## Mapping และ API

| Figma | Code | สถานะ |
|---|---|---|
| `badge` (เดิม `crv-badge`) / `4518:82967` | `src/lib/app/components/ui/badge.tsx` → Badge | ขยายตัวเดิม; เปลี่ยนชื่อชุดใน Figma 26 พ.ย. 2026 |
| `variant=dot` | `variant="dot"` | 8×8px ไม่มีข้อความ |
| `variant=standard` | `variant="standard"` | สูง20px กว้างขั้นต่ำ20px ขยายตามเนื้อหา |
| `color` | `primary / error / success / warning / info / default` | ใช้เฉพาะ dot/standard; defaultสีเป็นprimary |
| `badgeContent` | children | ไม่เพิ่ม propซ้ำ, ไม่ซ่อน0หรือตัด99+อัตโนมัติ |
| `glow` (เดิม `Glow`) | `glow` (เฉพาะ `variant="dot"`) | ทำแล้ว 26 พ.ย. 2026: เงา `0 0 4px` สีเดียวกับจุดที่ 36% (วัดใน story `Glow`) |

Variants เดิม `default`, `secondary`, `destructive`, `outline`, `ghost`, `link` คง recipeเดิม. การไม่ส่ง variant ยังได้ป้ายข้อความdefaultเดิม ไม่ได้เปลี่ยนเป็นdotเหมือน defaultของFigma. สีแกนใหม่ไม่เปลี่ยนสี legacy variants. คง `render`, forwarded props/events/ref และ Base UI useRender/mergeProps. ชื่อ `color=default` หมายถึงพื้นsunkenในdot/standard ส่วน `variant=default` หมายถึงป้ายข้อความเดิม.

`dot` ไม่ render children เพื่อไม่ให้ข้อความอยู่ในวง8px. ผู้เรียกต้องมีคำอธิบายที่เข้าถึงได้ เช่น role img + aria-label หรือ aria-hidden หากมีข้อความสถานะข้างๆ. อย่าสื่อความหมายด้วยสีอย่างเดียว. ไม่เพิ่ม focus/tabindex ให้ Badgeที่เป็นข้อมูล; ใช้ `render={<a ... />}` เมื่อต้องการลิงก์และให้ accessible nameตามบริบท.

## Visual specification

- dot: 8×8px, ไม่มีขอบ/padding/ข้อความ.
- standard: h20px, min-width20px, horizontal padding4px, vertical padding2px, font12px/line16px Medium500 ตามProduct UI (`--font-ui`).
- จุดและตัวนับใช้พื้นผิวโค้งวงกลม/pill ไม่มีglow เว้นแต่ใส่ `glow` บน dot. Geometryไม่ขึ้นกับ inherited line-heightบนหน้า/portal.
- Countหลายหลักขยายความกว้าง คงความสูง20px. ผู้เรียกกำหนดจำนวนและการแสดง99+เอง; Badgeไม่เพิ่ม notification/business logic.

| Color | Background semantic token | Text semantic token |
|---|---|---|
| primary | brand/primary/on-surface/default | brand/primary/content/on-fill |
| error | status/error/on-surface/default | status/error/content/on-fill |
| success | status/success/on-surface/default | status/success/content/on-fill |
| warning | status/warning/on-surface/default | status/warning/content/on-fill |
| info | status/info/on-surface/default | status/info/content/on-fill |
| default | on-surface/sunken | content/primary |

ตรวจbindingจริงของstandardทั้ง6สีแล้ว: generated contextที่แสดงคำว่าsuccessกับทุกสถานะเป็นชื่อผิดของเครื่องมือ. Figmaจริงผูก status/error, success, warning, infoตามบทบาทถูกต้อง จึงใช้semantic tokensเดิม ไม่แก้variablesหรือgenerated theme. ไม่ claimว่าคู่สีผ่านAAจากการมีtoken; primary/warning/infoใช้on-fillขาวตามFigmaและรายงานcontrastแยกโดยไม่override.

## Examples

```tsx
<Badge variant="standard" color="success">12</Badge>
<Badge variant="standard" color="default">99+</Badge>
<Badge variant="dot" color="error" role="img" aria-label="มีรายการแจ้งเตือนผิดพลาด" />
<Badge variant="dot" color="success" aria-hidden="true" />
<Badge variant="standard" color="success" render={<a href="/notifications" />}>3</Badge>
```

ลิงก์เป็นตัวอย่างcomposition ไม่ใช่routeที่สร้างในrepo. Storyลิงก์ใช้local anchorจำลองและตรวจkeyboard focus.

## Consumers และ coverage

Consumerเดิม: `CatalogFeedback.tsx` → `CoreCatalog`, และ `Stepper` ใน `app/patterns.tsx`. คงlegacyrecipesให้consumerเหล่านี้; ไม่ promotebadgeใหม่ไปแทนโดยอัตโนมัติ. `AvatarBadge` ใช้recipeแยกพร้อมขอบรอบdotตามงานAvatar ไม่ได้แก้หรือเปลี่ยนAPIในงานนี้.

Stories6รายการ: Default (IDเดิม), FigmaVariants (12combinations), CountContent (0/1/12/99+/9999), LegacyVariants, PageAndDialog และ MobileThai. ตรวจdot/count geometry, ขั้นต่ำ12px, countขยายไม่clip, page/portal consistency, keyboard/focus และภาษาไทยยาวที่320px.

Figma docsปลายทาง `4716:57628` ยังไม่ได้อัปเดตกลับ เพราะงานนี้อนุญาตFigma→Code. Mappingนี้เป็นหลักฐานอ้างอิง ไม่ใช่Code Connectที่publishแล้ว. ผลตรวจและข้อจำกัดอยู่ใน [BADGE-AUDIT.md](BADGE-AUDIT.md).

## เปลี่ยนชื่อชุดใน Figma (26 พ.ย. 2026, ผู้ใช้ยืนยันตามเสนอ)

`crv-badge` → `badge` (282 → 282 instance), prop `Glow` → `glow` ค่า variant (`variant`, `color`) ตรงโค้ดอยู่แล้ว ชื่อเดิมสำรองใน plugin data
