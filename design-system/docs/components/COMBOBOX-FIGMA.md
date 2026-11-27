# Combobox · Figma → code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4537-146774). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


26 November 2026 · Core · branch `praew` · React / shadcn Base UI

Visual source: [Autocomplete page](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4453-12569), [combobox set](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4454-12745). Read the context/screenshots of the actual set and checked bindings additionally, read-only. Did not edit or publish Figma.

## Mapping and implemented contract

| Figma | Code | Usage |
|---|---|---|
| `combobox` (`4454:12745`, 18 variants) | `src/lib/app/components/ui/combobox.tsx` | Uses the existing implementation on Base UI |
| `size=default / lg` | `ComboboxInput size="default" / "lg"` | Pass the same size to the Input wrapper so its label matches |
| `label`, `labelVisible` | Input label (`FieldLabel`) | With/without children, and links `htmlFor` to the input `id` |
| `helperText`, `errorMessage` | optional Input helper/error (`FieldDescription`, `FieldError`) | Binds `aria-describedby` to the text actually shown |
| `error` | `aria-invalid` on `ComboboxInput`, `data-invalid` on Field | Validation is the caller's responsibility; no business rule is invented |
| `filled`, `value` | `defaultValue` or controlled `value` on `Combobox` | No filled prop added |
| `state=hover / focused` | browser hover/focus and the Base UI open state | No state prop added to force the visual |
| `disabled` | Root/Input `disabled`, Field `data-disabled="true"` | Uses the disabled token colour, does not reduce the label opacity |
| up/down arrow | existing `ComboboxTrigger` + local SVG assets | Up when the popup is open, down when closed; disabled uses the disabled-colour asset |
| items | `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxEmpty` | Uses the existing Base UI filtering/selection |

The root `Combobox` remains a Base UI Root alias. `ComboboxInput` adds a named size, kept separate from the native HTML `size`. Keeps `showTrigger`, `showClear`, children and the existing input props; no label/error/value wrapper is added that duplicates the Input composition. The existing multiselect/chips and input-inside-popup patterns were not redesigned in this work.

## Recipe

| Item | default | lg |
|---|---|---|
| Field height | 40px | 48px |
| Input typography | 16/24px Regular | 16/24px Regular |
| Label | 12/16px Medium | 14/20px Medium |
| Helper/error | 12/16px | 12/16px |
| Icon box | 20×20px | 24×24px |
| Input left inset / icon right inset | 16px | 16px |
| Gap between the text area and the arrow | 8px | 8px |

`ComboboxInput` composes `ComboboxPrimitive.InputGroup` through `render={<InputGroup size={size} />}` so the anchor is the whole field; popup width is not compensated with extra numbers. The native input uses the existing `InputGroupInput`. `--font-ui`, size 16/line-height 24 are set on the container so it does not inherit the differing 22.4px line-height from the page and 20px from the Dialog.

Field colour, radius and border use the existing InputGroup recipe: normal `border/default` 1px, hover `border/strong` 1px, focus `border/system` 2px, error `border/error` 2px, disabled `on-surface/action/disabled` + `content/disabled`. Radius follows the Product's `--input-radius`. An inset ring is used so focus/error add no geometry. The 12px minimum text size is kept.

**Actual binding checked:** node `4454:12708` binds its fill to `VariableID:3730:5202` named `color/status/error/content/default`, colour `#DC2626`. The name success in the generated context is a tool discrepancy, not a reason to change the variable or Figma. The code uses the existing FieldError and semantic error token.

## Additional scope the user confirmed

- Popup `sideOffset` 6→4px; item gap 10→8px; group heading padding 14/10→16/8px. Chips, which are outside the visual target, were not changed.
- The shared Input label (`FieldLabel`): disabled changed from opacity 50% to `content/disabled` and opacity 100%; checked both an explicit `Field data-disabled="true"` and a disabled input within a Field. This also affects the labels of Input/Field consumers, so Field/InputGroup/Input regression was checked.
- Combobox container typography is set on the component after the audit found a difference between page/portal; the shared InputGroup is not changed further.

## Local assets

The SVGs at `src/lib/app/components/ui/assets/combobox/` come straight from Figma: down/up for default/lg and disabled down for default/lg. No temporary URLs at runtime and the SVG paths were not edited. The default glyph exports have native bounds of about 9.3125×5.4875px, centred in the 20px icon box; the lg and disabled exports have a 24/20px canvas as in the original. The native glyph is not scaled to fill the wrapper. Layout uses grid centering and the Base UI state data attributes.

## Usage

```tsx
<Field size="lg">
  <FieldLabel htmlFor="group">ค้นหากลุ่ม</FieldLabel>
  <Combobox items={["ตับ", "ไต", "เลือด"]}>
    <ComboboxInput id="group" size="lg" />
    <ComboboxContent>
      <ComboboxEmpty>ไม่พบรายการ</ComboboxEmpty>
      <ComboboxList aria-label="กลุ่มการตรวจ">
        {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</Field>
```

When used inside a Dialog, explicitly scope the Product of the controls in the portal according to the existing Product structure. The story examples use backOffice for both the main page and the Dialog content. It is not assumed that the portal receives CSS variables automatically from a DOM parent outside the portal.

## Stories and checks

Keeps the Default ID and adds Sizes, States, NoResults, Keyboard, PageAndDialog, MobileThai. States shows empty/filled/error-empty/error-filled/disabled in both sizes; hover/focus use the real browser, with no fake state props. Checked filtering, selection, no results, ArrowDown/Enter/Escape, the popup in a Dialog, focus restoration and long Thai content at 320px.

Pressing End in a Base UI input moves the caret, so it is not used to assume the last option is selected. The Keyboard story uses ArrowDown to change the highlighted option and Enter to select. CSS hover is measured through the real browser pointer because a synthetic hover does not create the CSS pseudo-state. Tests wait for the popup animation before checking visibility.

Real consumer: `CatalogForm.tsx` → `CoreCatalog`. Uses the existing imports, no per-page control recipes. The shared FieldLabel has Input/Field consumers that must be checked as well.

The Figma on-canvas doc `4537:146774` still has the old names/sizes (`crv-autocomplete`, small/medium) per the metadata read; the Figma doc fix is pending because this round was Figma→Code. No rename, library publish or Code Connect. The final check report and gaps are separate in `COMBOBOX-AUDIT.md`; pixel-perfect or every-Product-passes is not claimed without evidence.
