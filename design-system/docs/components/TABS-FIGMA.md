# Tabs — Figma to code (Draft, 2026-11-26)

Source: [Tabs page](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=3875-4437). Updated mapped [Figma documentation](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=4838-64978) in place using Document Template `4537:130394` / Blocks `4537:130684`. All 27 specimens remain linked instances; template block containers alone are detached. Main component property APIs and variant geometry are unchanged (five sets plus standalone Folder).

| Family / source | Code recipe | Geometry |
|---|---|---|
| Standard base `4724:141435` (8), group `6086:59` (2) | `variant="standard"`, `size="default" / "sm"` | 48/32px; icon 24/16px; label 14/20 or 12/16px; indicator 2px |
| Pills base `3875:4448` (8), group `3875:4462` (4) | `variant="pills"` (or default), `tabVariant="default" / "line"`, `stretch` | item 36/48px, group 44/64px; padding 4/8px |
| Folder base `4725:18223` (4), standalone `4725:21088` (1) | `variant="folder"`, optional trigger `badge` | 56px; padding 16/24px; original 30×45.5 curve asset; shadow/2xl |

Exports remain Tabs, TabsList, TabsTrigger, TabsContent and tabsListVariants. Tabs forwards Base UI root orientation and controlled/uncontrolled props. TabsList adds variant, tabVariant, size, stretch and color (`primary` / `secondary` selected text for Standard). Legacy `variant="line"` aliases Standard; it differs from Pills `tabVariant="line"`. TabsTrigger adds icon, badge and notification. Notifications use the existing error Badge dot (6px); counts reuse Badge standard with local 8px horizontal padding. Omit icon/children/badge to hide them; icon-only triggers require an accessible name.

```tsx
<Tabs defaultValue="summary">
  <TabsList variant="standard" color="secondary" aria-label="ข้อมูลผู้ป่วย">
    <TabsTrigger value="summary">ภาพรวม</TabsTrigger>
    <TabsTrigger value="history" notification>ประวัติ</TabsTrigger>
  </TabsList>
  <TabsContent value="summary">ข้อมูลสรุป</TabsContent>
  <TabsContent value="history">ประวัติผลตรวจ</TabsContent>
</Tabs>
```

Base UI defaults to manual activation: arrows move focus, Enter/Space activates. `activateOnFocus` on TabsList enables automatic activation. Disabled tabs can receive arrow focus but cannot activate. Horizontal and vertical layouts, controlled state, icon-only names, notification, counts, Thai truncation, local scrolling and Dialog usage are covered in the ten stories under Core/Components/Tabs.

Typography observed in all three Figma families: IBM Plex Sans Thai Medium; browser uses IBM Plex Sans Thai with 14/20px or Standard small 12/16px. Original vector paths are used as CSS masks with their original 24px icon-box offsets. No screenshot of a component is used for UI. Fixed 36px centered Pills items avoid source 6px vertical padding. Full-width content truncates within equal-width items; intrinsic-width groups scroll inside their wrapper. Source fixed group widths are specimens, not hardcoded limits in production.

Known differences: Figma has no disabled/vertical runtime behavior; those follow Base UI and existing tokens. Standard base selected text is neutral while composed source instances use primary; code exposes both colors explicitly. Primary #1789FA against white is about 3.5:1, below normal-text AA, retained and recorded as pending. Folder uses the original curve with a 1px seam overlap and existing shadow token; this is not a claim of pixel-perfect shadow silhouette parity.

Verification: 10 Tabs + 5 catalog interaction stories passed; accessibility reports remain (see TABS-AUDIT.md). Build, token drift and story-file coverage checks passed. Evidence: `output/tabs/`.

### Selection animation - 2026-11-26

Standard underline and Pills background use Base UI Indicator with interruptible 350ms transform/size transitions, cubic-bezier(.4,0,.2,1). Folder color/shadow transition for 320ms. Panel selection stays immediate. Keyboard focus-visible and prefers-reduced-motion disable transitions. The existing Figma template Callout documents this code motion decision; specimens remain static linked instances. No new dependency or public prop.

## เปลี่ยนชื่อชุดใน Figma (26 พ.ย. 2026, ผู้ใช้ยืนยันตามเสนอ)

| ชื่อใหม่ | ชื่อเดิม | prop ที่เปลี่ยน | instance |
|---|---|---|---|
| `tabs-standard` (`TabsList variant="standard"`) | `crv-tabs-standard` | `size` large / small → `default` / `sm` | 4 → 4 |
| `tabs-standard-trigger` | `crv-tabs-standard-base` | `size` เหมือนกัน | 22 → 22 |
| `tabs-pills` (`TabsList variant="pills"`) | `crv-tabs-pills` | `variant` fullWidth / standard → `stretch` true / false | 8 → 8 |
| `tabs-pills-trigger` | `crv-tabs-base` | — | 76 → 76 |
| `tabs-folder-trigger` | `crv-tabs-folder-base` | `selected` yes / no → true / false | 19 → 19 |
| `tabs-folder` (ชิ้นเดี่ยว) | `crv-tabs-folder` | — | 4 → 4 |

ตัวแท็บเดี่ยวลงท้าย `-trigger` (= `TabsTrigger`) ตัวกลุ่มใช้ชื่อเดียว (= `TabsList`)
