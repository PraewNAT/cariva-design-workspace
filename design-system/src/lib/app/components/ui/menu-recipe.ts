/**
 * Figma `dropdown-menu-content` + `dropdown-menu-item` (docs/components/MENU-FIGMA.md).
 * Shared by DropdownMenu, Select and Combobox popups so every list that drops down from a
 * trigger looks the same. Surface: white, radius 12, vertical padding 8 only (items run edge to edge), 1px inset `border/default`, `shadow/lg`.
 * Item: 40px (padding 8/16, gap 12, radius 4), label 14/20 Medium; hover / focus
 * `on-surface/action/hover`; selected `on-surface/action/selected`; disabled uses
 * `content/disabled` (no opacity).
 */
export const menuSurfaceClass =
  "rounded-md bg-[var(--cds-on-surface-default)] text-[var(--cds-content-primary)] shadow-[var(--cds-shadow-lg)] ring-1 ring-inset ring-[var(--cds-border-default)]";

export const menuPopupClass = `${menuSurfaceClass} py-2`;

export const menuItemClass =
  "group/menu-item relative flex min-h-10 w-full cursor-default items-center gap-3 rounded-[4px] px-4 py-2 text-sm leading-5 font-medium text-[var(--cds-content-primary)] outline-hidden select-none focus:bg-[var(--cds-on-surface-action-hover)] data-highlighted:bg-[var(--cds-on-surface-action-hover)] data-selected:bg-[var(--cds-on-surface-action-selected)] data-checked:bg-[var(--cds-on-surface-action-selected)] data-disabled:pointer-events-none data-disabled:text-[var(--cds-content-disabled)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 [&_svg]:text-[var(--cds-content-secondary)] data-disabled:[&_svg]:text-[var(--cds-content-disabled)]";
