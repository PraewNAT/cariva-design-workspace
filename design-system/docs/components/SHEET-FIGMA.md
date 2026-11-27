# Bottom Sheet · Figma → Code

> Figma documentation follow-up, 26 November 2026: [updated documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4716-45214). Earlier statements about Figma docs being pending describe the code-only audit pass. Documentation is now updated; runtime audit gaps remain unchanged. See FIGMA-DOCUMENTATION.md.


Status Draft, 26 November 2026 · Core · branch `praew` · not published

Design source: [Bottom Sheet](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4481-19038), Header `4485:31705`, Content `4485:31742`.

## Scope confirmed by the user

Uses the existing `SheetContent side="bottom"`; no new Drawer is created; top/right/left and Sidebar are not changed. Default/Search header, icon, decorative color, scroll area and footer are confirmed; uses the existing Core Input/Field and Button. The option data in the stories is a fixture for checking the UI, not a business rule.

| Part | Spec and API |
|---|---|
| Content | `side="bottom"`, full width, 24px top corners, height follows content and does not exceed the viewport minus 24px; Base UI Dialog handles modal/focus/Escape |
| Header | `variant="default"` or `"search"`, `showTopColor=true`, `icon=undefined` uses the Figma icon, `icon=null` hides the icon, a ReactNode can replace the icon; these options apply to bottom only |
| Default | Height 72px with a one-line title, padding top 24/sides 24/bottom 16, icon 32px |
| Search | Height 152px with a one-line title and a Field/Input lg 48px with 12/16 helper; icon 24px, gap 12px; Input is passed as children, not a search prop |
| Title | UI font per theme (`--font-ui`), 20/28px, weight 600; long text wraps and can make the Header taller |
| Close | 32×32px button at top/right 24px, Figma icon 16px; `showCloseButton=false` hides the existing button |
| Body | Adds `SheetBody` for flex/overflow-y auto, min-height 0, padding 16/24; content does not push the footer out of the area |
| Footer | top border, padding top 24/sides 16/bottom max(24px,safe-area-inset-bottom); stories use Button lg 48px |

Header Default/Search use the existing SVG exports in `src/lib/app/components/ui/assets/sheet/`, keeping the original size and viewBox. At 375px width the Input expands to the actual available space, leaving 327px.

The old Figma documentation shows Header 76/136px but the actual node is 72/152px; this work cites the actual node as the user confirmed. The documentation in Figma was not edited or synced because the direction of this work is Figma → Code.

## Examples from the actual stories

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
    <SheetBody>{/* Real content for each Product */}</SheetBody>
    <SheetFooter><SheetClose render={<Button size="lg" />}>ยืนยัน</SheetClose></SheetFooter>
  </SheetContent>
</Sheet>
```

Input is an HTML search input via Base UI; it uses the browser's/device's real keyboard, with no simulated GBoard and no fixed-height keyboard area. Viewport height adjustment uses `dvh`; opening the software keyboard and visual viewport behavior on iOS/Android must be checked on real devices and are not considered passed from desktop emulation.

Stories: Default (existing right), BottomDefault, BottomSearch (filter/not found/confirm), MobileThai (24 options and a long title), PlainHeader, OtherSides, MobileSidebarRegression. Final results and open items are in `SHEET-AUDIT.md`.

Checked in Chromium at 320/375/1280px: Header 72/152px with a short title, input 48px, close 32px/icon 16px, gradient fills the Header and minimum text 12px. Tab/Space/Escape, focus trap/restore, body scroll and footer on a 480px-high viewport pass; the real software keyboard has not been checked. The 9 Storybook stories ran and passed, with accessibility contrast issues left open as the user acknowledged; this is not considered full AA conformance.
