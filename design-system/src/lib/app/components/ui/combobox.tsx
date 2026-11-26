"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "cn";
import { menuItemClass, menuSurfaceClass } from "./menu-recipe";
import * as React from "react";

import { Button } from "@/lib/app/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/lib/app/components/ui/input-group";
import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import chevronDownDefault from "./assets/combobox/down-default.svg";
import chevronUpDefault from "./assets/combobox/up-default.svg";
import chevronDownLg from "./assets/combobox/down-lg.svg";
import chevronUpLg from "./assets/combobox/up-lg.svg";
import chevronDownDefaultDisabled from "./assets/combobox/down-default-disabled.svg";
import chevronDownLgDisabled from "./assets/combobox/down-lg-disabled.svg";

const Combobox = ComboboxPrimitive.Root;

// Native SVG dimensions are preserved; the small glyph exports sit in a 20px icon box.
function ComboboxChevron() {
  return (
    <span
      data-slot="combobox-chevron"
      aria-hidden="true"
      className="pointer-events-none grid size-5 shrink-0 place-items-center group-data-[size=lg]/input-group:size-6"
    >
      <img
        src={chevronDownDefault}
        alt=""
        className="col-start-1 row-start-1 group-data-popup-open/combobox-trigger:hidden group-data-disabled/combobox-trigger:hidden group-data-[size=lg]/input-group:hidden"
      />
      <img
        src={chevronUpDefault}
        alt=""
        className="col-start-1 row-start-1 hidden group-data-popup-open/combobox-trigger:block group-data-disabled/combobox-trigger:!hidden group-data-[size=lg]/input-group:!hidden"
      />
      <img
        src={chevronDownDefaultDisabled}
        alt=""
        className="col-start-1 row-start-1 hidden group-data-disabled/combobox-trigger:block group-data-[size=lg]/input-group:!hidden"
      />
      <span className="col-start-1 row-start-1 hidden group-data-[size=lg]/input-group:grid">
        <img
          src={chevronDownLg}
          alt=""
          className="col-start-1 row-start-1 group-data-popup-open/combobox-trigger:hidden group-data-disabled/combobox-trigger:hidden"
        />
        <img
          src={chevronUpLg}
          alt=""
          className="col-start-1 row-start-1 hidden group-data-popup-open/combobox-trigger:block group-data-disabled/combobox-trigger:!hidden"
        />
        <img
          src={chevronDownLgDisabled}
          alt=""
          className="col-start-1 row-start-1 hidden group-data-disabled/combobox-trigger:block"
        />
      </span>
    </span>
  );
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "group/combobox-trigger inline-flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxChevron />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={
        <InputGroupButton variant="ghost" color="secondary" size="icon-xs" />
      }
      className={cn(className)}
      {...props}
    >
      <HugeiconsIcon
        icon={Cancel01Icon}
        strokeWidth={2}
        className="pointer-events-none"
      />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  size = "default",
  ...props
}: Omit<ComboboxPrimitive.Input.Props, "size"> & {
  size?: "default" | "lg";
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <ComboboxPrimitive.InputGroup
      render={<InputGroup size={size} />}
      data-ui="combobox-input"
      className={cn(
        "font-[family-name:var(--font-ui)] text-base leading-6 has-[>[data-align=inline-end]]:[&>input]:pr-2",
        className
      )}
    >
      <ComboboxPrimitive.Input
        disabled={disabled}
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon
        align="inline-end"
        className="py-0 pr-4 has-[>button]:mr-0"
      >
        {showTrigger && (
          <InputGroupButton
            aria-label="เปิดรายการ"
            size="icon-xs"
            variant="ghost"
            color="secondary"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="size-5 group-data-[size=lg]/input-group:size-6 group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </ComboboxPrimitive.InputGroup>
  );
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            menuSurfaceClass,
            "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) overflow-hidden duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:min-h-10 *:data-[slot=input-group]:border-none *:data-[slot=input-group]:bg-card *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-2 overflow-y-auto overscroll-contain py-2 data-empty:p-0",
        className
      )}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(menuItemClass, "pr-10", className)}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-4 flex size-5 items-center justify-center [&_svg]:!text-[var(--cds-brand-primary-content-default)]" />
        }
      >
        <HugeiconsIcon
          icon={Tick02Icon}
          strokeWidth={2}
          className="pointer-events-none"
        />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-4 py-2 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border/50", className)}
      {...props}
    />
  );
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-9 flex-wrap items-center gap-1.5 rounded-4xl border border-input bg-card bg-clip-padding px-2.5 py-1.5 text-sm transition-colors focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-[3px] has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1.5 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-4xl bg-muted-foreground/10 px-2 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" color="secondary" size="icon-xs" />}
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <HugeiconsIcon
            icon={Cancel01Icon}
            strokeWidth={2}
            className="pointer-events-none"
          />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...props}
    />
  );
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
