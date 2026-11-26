import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "cn";
import { ChevronDownRounded } from "@/lib/app/components/app/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/lib/app/components/ui/dropdown-menu";

/**
 * Figma `button-split` (docs/components/BUTTON-SPLIT-FIGMA.md): a pill made of a main action and a
 * menu trigger separated by a 1px divider. `color` primary | destructive (Figma error),
 * `size` sm | default | lg (Figma small | medium | large), disabled (Figma state=disabled).
 * Hover / pressed fill the whole pill. The menu content comes from the caller.
 */
const splitVariants = cva(
  "group/split relative inline-flex w-fit items-center rounded-full font-sans font-medium text-[var(--split-fg)] transition-colors",
  {
    variants: {
      color: {
        primary:
          "bg-[var(--cds-brand-primary-on-surface-default)] text-[var(--cds-brand-primary-content-on-fill)] [--split-divider:var(--cds-brand-primary-border-strong)] hover:bg-[var(--cds-brand-primary-on-surface-hover)] active:bg-[var(--cds-brand-primary-on-surface-pressed)]",
        destructive:
          "bg-[var(--cds-status-error-on-surface-default)] text-[var(--cds-status-error-content-on-fill)] [--split-divider:var(--cds-status-error-border-strong)] hover:bg-[var(--cds-status-error-on-surface-hover)] active:bg-[var(--cds-status-error-on-surface-pressed)]",
      },
      size: {
        sm: "h-8 text-xs leading-4",
        default: "h-10 text-base leading-6",
        lg: "h-12 text-base leading-6",
      },
      disabled: {
        true: "pointer-events-none bg-[var(--cds-on-surface-action-disabled)] text-[var(--cds-content-disabled)] [--split-divider:var(--cds-border-disabled)] hover:bg-[var(--cds-on-surface-action-disabled)]",
        false: "",
      },
    },
    defaultVariants: { color: "primary", size: "default", disabled: false },
  }
);

const actionSize = {
  sm: "gap-1 px-3 py-2 [&_svg]:size-4",
  default: "gap-2 px-4 py-2 [&_svg]:size-6",
  lg: "gap-3 px-6 py-3 [&_svg]:size-6",
} as const;
const triggerSize = {
  sm: "size-8 p-2 [&_svg]:size-4",
  default: "size-10 p-2 [&_svg]:size-6",
  lg: "size-12 p-3 [&_svg]:size-6",
} as const;

type ButtonSplitProps = Omit<VariantProps<typeof splitVariants>, "disabled"> & {
  children: ReactNode;
  /** Icon before the label (Figma `startIcon`). */
  startIcon?: ReactNode;
  /** Icon in the menu trigger (Figma `endIcon`); defaults to a chevron. */
  endIcon?: ReactNode;
  /** Menu items rendered in the dropdown, e.g. `DropdownMenuItem`s. */
  menu: ReactNode;
  disabled?: boolean;
  onAction?: () => void;
  /** Accessible name of the menu trigger. */
  menuLabel?: string;
  className?: string;
};

function ButtonSplit({
  color = "primary",
  size = "default",
  disabled = false,
  children,
  startIcon,
  endIcon,
  menu,
  onAction,
  menuLabel = "More options",
  className,
}: ButtonSplitProps) {
  const s = size ?? "default";
  const part =
    "inline-flex items-center justify-center outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50";
  return (
    <div
      role="group"
      data-slot="button-split"
      data-color={color}
      data-size={s}
      aria-disabled={disabled || undefined}
      className={cn(splitVariants({ color, size, disabled }), className)}
    >
      <ButtonPrimitive
        data-slot="button-split-action"
        disabled={disabled}
        onClick={onAction}
        className={cn(part, "rounded-l-full", actionSize[s])}
      >
        {startIcon}
        <span>{children}</span>
      </ButtonPrimitive>
      <DropdownMenu>
        <DropdownMenuTrigger
          data-slot="button-split-trigger"
          disabled={disabled}
          aria-label={menuLabel}
          className={cn(
            part,
            "relative rounded-r-full before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-[var(--split-divider)]",
            triggerSize[s]
          )}
        >
          {endIcon ?? <ChevronDownRounded />}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">{menu}</DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { ButtonSplit, splitVariants };
export type { ButtonSplitProps };
