"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";

import { toggleVariants } from "@/lib/app/components/ui/toggle";

/**
 * Figma `toggle-group` (`crv-toggle-group-new`): items 8px apart, horizontal or vertical, appearance
 * default or outline. `variant="segmented"` is the Figma segmented look (as in `language-switcher`):
 * the items sit on a `on-surface/subtle` pill rail with 4px padding and gap. `variant="joined"` is Figma
 * `toggle-button-group` (`crv-toggle-group`): cells share one 1px `border/default` inset frame (radius 8, drawn inside so the group is exactly as tall as its cells) and
 * are divided by 1px lines; `size` xs | sm | default | lg (Figma xSmall | small | medium | large).
 */
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    orientation: "horizontal" | "vertical";
  }
>({ variant: "default", size: "default", orientation: "horizontal" });

function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    orientation?: "horizontal" | "vertical";
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex w-fit",
        orientation === "vertical" ? "flex-col" : "flex-row",
        variant === "segmented"
          ? "items-center gap-1 rounded-full bg-[var(--cds-on-surface-subtle)] p-1"
          : variant === "joined"
          ? "overflow-hidden rounded-sm ring-1 ring-inset ring-[var(--cds-border-default)]"
          : "gap-2",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

function ToggleGroupItem({
  className,
  children,
  ...props
}: TogglePrimitive.Props) {
  const { variant, size, orientation } = React.useContext(ToggleGroupContext);
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={variant}
      className={cn(
        toggleVariants({
          variant,
          size: variant === "joined" ? size : undefined,
        }),
        variant === "joined" &&
          (orientation === "vertical"
            ? "not-first:border-t not-first:border-[var(--cds-border-default)]"
            : "not-first:border-l not-first:border-[var(--cds-border-default)]"),
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}

/** Figma segmented look: `ToggleGroup variant="segmented"` that always keeps one item selected. */
function SegmentedControl(
  props: Omit<React.ComponentProps<typeof ToggleGroup>, "variant">
) {
  return <ToggleGroup variant="segmented" {...props} />;
}

export { SegmentedControl, ToggleGroup, ToggleGroupItem };
