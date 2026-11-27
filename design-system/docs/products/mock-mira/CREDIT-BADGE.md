# Mira Credit Badge - Draft 2026-11-26

Ownership confirmed by user: Mira Product DS. Source, stories and coin asset live together in `src/lib/products/mock-mira/components/`; Core Progress/Skeleton are dependencies. Public export CreditBadge and all props/behavior remain unchanged. [Figma docs](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt?node-id=7296-35) use the existing template, with the same25 linked specimens moved out of Core Progress docs.

Missing sets `7089:1151` (16 compact variants) and `7094:365` (9 remaining/used variants) are now mapped to `src/lib/products/mock-mira/components/credit-badge.tsx` and included in Products/Mock Mira/Components/Credit Badge with separate Mira docs. `CreditBadge` composes shared Progress and Skeleton; it adds no billing or API behavior.

Props: variant compact/remaining/used; size default/sm (only compact differs); status default/low/depleted/loading; value, progress (0–100 clamped), progressVisible/valueVisible/showIcon; emptyDisplay text/value for depleted remaining; optional label/className. Product supplies status, thresholds and percentage; the component does not infer business rules. Numbers are formatted en-US with up to2 decimals, non-finite/negative amounts display0. Used displays progress percentage. Source depleted2/depleted 2 are aliases for zero display; duplicated used depleted variants do not imply separate runtime behavior.

Compact matches160×32 /132×24px; track64/48px, height4, capsule radius, source padding8/12/8/8 or4/8/4/4 and gap12/8. Content reserves64px. Hover uses on-surface/action/hover. Remaining/used height32px normally, width follows readable content. Label typography is12/16px instead of source10px, so detailed widths can grow. Value labels can wrap when space is constrained.

Original coin icon from `7089:1154` is saved locally at assets/credit/coin.png and rendered16px. Loading uses Skeleton pulse and aria-busy; the progress has unknown value with hidden fill, keeping the source static gray track. Reduced-motion disables pulse. The badges are informational groups, not buttons; no click/navigation behavior is invented.

Accessibility decisions within authorized scope: low-value text uses warning/content/strong (5.02:1 against white; source default3.19:1). Primary/warning tracks use existing subtle tokens instead of source muted tracks; primary fill against source muted was2.97:1. No shared token changed. Main Figma props/geometry/fonts remain source data; only visible10px labels in the new docs instances were raised to12px, with linked instances retained. Document these visual differences rather than claiming exact pixel parity.

Mira Credit Badge has six stories: compact states, remaining/used, optional parts, loading→loaded, page/Dialog and long Thai/mobile. See CREDIT-BADGE-AUDIT.md.
