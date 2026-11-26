# Radio Group — Draft 26/11/2026

[Figma source](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3815-5557) · [Figma docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4537-147363). Docs follow Document Template with18 linked instances (6 base,8 standard,4 groups). Main Figma API/radius unchanged.

Implementation: `ui/radio-group.tsx`. All examples live under `Core/Components/Radio Group`.

`RadioGroup` retains Base UI value/defaultValue/onValueChange, name, disabled and other root props. Adds label/description/error. It generates aria-labelledby/describedby IDs; caller ARIA props can override when composing existing fields. Label/description14/20px, header gap8px and options gap12px. Error applies semantics and error colors; disabled wins over error visually.

`RadioGroupItem`: Base UI radio root, circle16px and selected dot10px. Uses surface/default with border/default; selected uses primary fill on the **dot**, preserving a white circle. Focus-visible uses2px inset border/system. Disabled uses action-disabled/border-disabled/content-disabled and real Base UI data-disabled/aria-disabled behavior, not opacity. Existing consumers do not need a new prop.

`RadioField`: same item plus required label, optional description, labelPlacement end/start and variant default/outlined/groupItem. Default flexible width; groupItem omits description. Outlined has16px padding/radius6. Content gap8px; no legacy1px top padding because the workspace spacing scale does not permit it. Visual field default height follows actual content (~48px for two20px lines plus8px gap), rather than forcing source49px. Figma only contains8 standard combinations; additional code combinations are compositions, not claimed Figma variants.

One selection per group. Base UI owns radio keyboard behavior, form integration and disabled skipping; native ArrowUp was verified. Label/description associations use unique IDs. Long Thai wraps inside flexible content. Consumers checked: catalog form, Sheet bottom search, Rating grouping and page/Dialog. Border/default has low non-text contrast on white; this Figma-origin limitation remains documented rather than changing a shared token. See combined audit.

## เปลี่ยนชื่อชุดใน Figma (26 พ.ย. 2026, ผู้ใช้ยืนยันตามเสนอ)

| ชื่อใหม่ | ชื่อเดิม | prop ที่เปลี่ยน | instance |
|---|---|---|---|
| `radio-group` | `crv-radio-group` | `color` primary / error → `error` false / true | 4 → 4 |
| `radio-field` | `crv-radio-standard` | `type` → `variant`; `color` → `error` false / true | 8 → 8 |
| `radio-group-item` | `crv-radio-base` | — | 70 → 70 |
