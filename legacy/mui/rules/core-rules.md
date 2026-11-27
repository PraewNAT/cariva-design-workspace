# Cariva Core Rules

## Naming Convention

Figma component names use kebab-case. Code components use PascalCase.

```text
cv-button-icon        -> CvButtonIcon
cv-input-horizontal   -> CvInputHorizontal
cv-ai-bubble-user     -> CvAiBubbleUser
```

## Screen/Page Frame Naming Convention

Screen frames (top-level product screens/flows, not components) use `{Flow}/{Screen Name}` in Title Case. The `/` groups related screens in the Figma layer outline automatically.

```text
Auth/Login
Auth/Forgot Password
Dashboard/Overview
```

For a specific state variant of a screen, append ` - {State}` in Title Case:

```text
Auth/Login - Error
Auth/Login - Loading
```

This convention applies only to screen/page frames. Component naming stays `crv-{component-name}` kebab-case per the rule below — do not mix the two.

## MUI Wrapper Rules

Components that wrap MUI:

```text
cv-button-*    -> wrap MuiButton
cv-input-*     -> wrap MuiTextField
cv-select-*    -> wrap MuiSelect
cv-combobox-*  -> wrap MuiAutocomplete + MuiTextField
cv-checkbox-*  -> wrap MuiCheckbox
cv-toggle-*    -> wrap MuiSwitch or MuiToggleButton, depending on product behavior
cv-tabs-*      -> wrap MuiTabs + MuiTab
cv-badge-*     -> wrap MuiBadge for count/overlay badges; standalone pill badges may use a Cariva wrapper or MuiChip-like styling
cv-chip-*      -> wrap MuiChip
```

Components that do not wrap MUI:

```text
cv-ai-bubble-*      -> custom
cv-ai-streaming-*   -> custom
cv-ai-suggest-*     -> custom
```

## Code Structure Conventions (from the dev codebase)

Cariva DS stays on MUI + emotion `sx`. From the dev team's shadcn/Tailwind codebase it takes only the conventions that make components easier to read and to target. Public props do not change.

**1. `data-slot` and look attributes on the root.** Each component's root element carries `data-slot="<name>"` (kebab-case, no `crv-` prefix: `CrvButtonIcon` → `button-icon`), plus one `data-*` per look prop (`data-variant`, `data-color`, `data-size`, `data-type`, `data-state`, …). It carries the resolved value, so a legacy alias shows its new name. Inner parts that a consumer or a test needs to reach may get their own `data-slot`. This lets Tailwind apps target DS elements (`[data-slot=button][data-size=small]`) and gives the drift check stable selectors instead of `.Mui*` classes.
   - Put the attributes on the element the user sees. MUI `Tooltip` spreads its own props onto the trigger, so `CrvTooltip` puts them on the bubble through `slotProps.tooltip`.

**2. One variant table per component.** Each component with look props exports `crv<Name>Variants` with `defaultVariants`, the `cva` map of the dev codebase. Defaults for those props come from `defaultVariants`, never from a second literal. A component may add one key per look prop holding its styles or metrics (see `crvButtonVariants.size` / `.variant`) — do this when you next touch its styles, not as a separate rewrite.

**3. `crv<Name>Sx(look)` when the look is reusable.** When a component's styles are a pure function of its look props and an app could want them on another element, export them as a function returning an `sx` array, like `buttonVariants()` in the dev codebase. The component spreads `crv<Name>Sx(...)` and then the caller's `sx`. Today only `CrvButton` has one (`crvButtonSx`).

**Not adopted:** kebab-case file names, dropping `forwardRef` (the DS is on React 18), feature-folder layering (that belongs to apps, not the DS), and arbitrary px or hex values.

Reference: `code/core/components/CrvButton/CrvButton.tsx` (all three). Every component in `code/core/components` follows 1 and 2.

## Prop Mapping Rules

Figma props are an AI-readable contract. They do not need to be identical to MUI props, but every prop must have a clear implementation rule.

If a Figma prop maps to an existing MUI prop, use MUI directly:

- Figma `variant=contained | outlined | text` -> MUI Button `variant`
- Figma `color=primary | error` -> MUI Button `color`
- Figma `size=small | medium | large` -> MUI Button `size`
- Figma `startIcon`, `endIcon`, `children`, `loading`, `loadingIndicator` -> matching MUI Button APIs when available

If a Figma prop is Cariva-only but maps to an MUI concept, keep the Figma prop and translate it in code. Prefer MUI prop names when the meaning is the same.

If a Figma component requires behavior that MUI Button does not provide by itself, create a wrapper/composed component instead of forcing the prop onto MUI Button:

- `cv-button-with-badge` -> compose MUI Badge around MUI Button
- Button props pass through to Button
- Badge props apply to Badge

Do not generate unsupported MUI props. For example, do not output `<Button intent="destructive" />` when the Figma component exposes `color=error`; output `<Button color="error" />`.

## Documentation Sync Rule

Every time a Cariva DS rule, token, component guidance, or usage doc changes:

- Update plugin `.md` and the matching Figma doc.
- Do not update only one side unless the user explicitly says it is draft or local-only.
- After editing, check that Figma docs and plugin docs use the same token names, prop names, behavior, and AI rules.
