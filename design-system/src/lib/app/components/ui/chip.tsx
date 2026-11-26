import { CancelFilled } from "@/lib/app/components/app/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";

/**
 * Figma `chip` (docs/components/CHIP-FIGMA.md): a pill-shaped action chip.
 * size default = 32px (text 14/20), sm = 24px (text 12/16); variant filled / outlined /
 * surface; color default / primary. `thumbnail` (e.g. an Avatar) shows before the label and
 * `onDelete` adds the cancel button. Hover and pressed are CSS; pressed adds `shadow/sm`.
 */
const chipVariants = cva(
  "group/chip inline-flex w-fit items-center rounded-full p-1 text-[var(--cds-content-primary)] transition-colors select-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--cds-border-system)] active:shadow-[var(--cds-shadow-sm)] data-[disabled]:shadow-none data-[disabled]:cursor-not-allowed data-[disabled]:text-[var(--cds-content-disabled)]",
  {
    variants: {
      size: { default: "h-8", sm: "h-6" },
      variant: { filled: "", outlined: "ring-1 ring-inset", surface: "" },
      color: { default: "", primary: "" },
    },
    compoundVariants: [
      {
        variant: "filled",
        color: "default",
        class:
          "bg-[var(--cds-on-surface-subtle)] hover:bg-[var(--cds-on-surface-action-hover)] active:bg-[var(--cds-on-surface-action-pressed)]",
      },
      {
        variant: "filled",
        color: "primary",
        class:
          "bg-[var(--cds-brand-primary-on-surface-default)] text-[var(--cds-brand-primary-content-on-fill)] hover:bg-[var(--cds-brand-primary-on-surface-hover)] active:bg-[var(--cds-brand-primary-on-surface-pressed)]",
      },
      {
        variant: "outlined",
        color: "default",
        class:
          "ring-[var(--cds-border-default)] hover:bg-[var(--cds-on-surface-action-hover)] active:bg-[var(--cds-on-surface-action-pressed)]",
      },
      {
        variant: "outlined",
        color: "primary",
        class:
          "text-[var(--cds-brand-primary-content-default)] ring-[var(--cds-brand-primary-border-default)] hover:bg-[var(--cds-brand-primary-on-surface-subtle)] active:bg-[var(--cds-brand-primary-on-surface-subtle)]",
      },
      {
        variant: "surface",
        color: "default",
        class:
          "bg-[var(--cds-on-surface-default)] hover:bg-[var(--cds-on-surface-action-hover)] active:bg-[var(--cds-on-surface-action-pressed)]",
      },
      {
        variant: "surface",
        color: "primary",
        class:
          "bg-[var(--cds-on-surface-default)] text-[var(--cds-brand-primary-content-default)] hover:bg-[var(--cds-brand-primary-on-surface-subtle)] active:bg-[var(--cds-brand-primary-on-surface-subtle)]",
      },
    ],
    defaultVariants: { size: "default", variant: "filled", color: "default" },
  }
);

type ChipProps = Omit<React.ComponentProps<"span">, "color" | "children"> &
  VariantProps<typeof chipVariants> & {
    children: React.ReactNode;
    thumbnail?: React.ReactNode;
    /** Adds the delete (cancel) button. */
    onDelete?: () => void;
    deleteLabel?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };

function Chip({
  className,
  size = "default",
  variant = "filled",
  color = "default",
  thumbnail,
  onDelete,
  deleteLabel = "ลบ",
  disabled,
  onClick,
  children,
  ...props
}: ChipProps) {
  const sm = size === "sm";
  const iconColor =
    variant === "filled" && color === "primary"
      ? "text-[var(--cds-content-on-brand)]"
      : color === "primary"
      ? "text-[var(--cds-brand-primary-content-default)]"
      : "text-[var(--cds-content-secondary)]";
  return (
    <span
      data-slot="chip"
      data-size={size}
      data-variant={variant}
      data-color={color}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        chipVariants({ size, variant, color }),
        disabled &&
          (variant === "outlined"
            ? "ring-[var(--cds-border-default)] hover:bg-transparent active:bg-transparent"
            : "bg-[var(--cds-on-surface-action-disabled)] hover:bg-[var(--cds-on-surface-action-disabled)] active:bg-[var(--cds-on-surface-action-disabled)]"),
        className
      )}
      {...props}
    >
      {thumbnail ? (
        <span
          data-slot="chip-thumbnail"
          className={cn(
            "flex shrink-0 items-center justify-center [&>*]:size-full",
            sm ? "size-5" : "size-6"
          )}
        >
          {thumbnail}
        </span>
      ) : null}
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "flex items-center rounded-full px-1 font-medium outline-none disabled:cursor-not-allowed",
          sm ? "h-4 text-xs leading-4" : "h-6 text-sm leading-5"
        )}
      >
        {children}
      </button>
      {onDelete ? (
        <button
          type="button"
          data-slot="chip-delete"
          aria-label={deleteLabel}
          disabled={disabled}
          onClick={onDelete}
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full outline-none disabled:cursor-not-allowed",
            disabled ? "text-[var(--cds-content-disabled)]" : iconColor,
            sm ? "size-4" : "size-6"
          )}
        >
          <CancelFilled className={sm ? "size-3.5" : "size-5"} />
        </button>
      ) : null}
    </span>
  );
}

export { Chip, chipVariants };
