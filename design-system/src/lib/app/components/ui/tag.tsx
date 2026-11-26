import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";

/**
 * Figma `tag` and `tag-color` (docs/components/TAG-FIGMA.md): a pill label for a status,
 * category or attribute. Not an overlay (use Badge for counters on other elements) and not
 * interactive (use Chip).
 * `tag`: variant filled / outlined, semantic color, size sm 20 / default 24 / lg 36,
 * content label or count (a round count: 20 / 24 / 32).
 * `tag-color`: accent families on `accent/{color}/A02` with `A05` text, height 20.
 */
const tagVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap select-none [&_svg]:shrink-0",
  {
    variants: {
      variant: { filled: "", outlined: "" },
      color: {
        default: "",
        secondary: "",
        error: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "text-xs leading-4 [&_svg]:size-3",
        default: "text-xs leading-4 [&_svg]:size-3",
        lg: "text-sm leading-5 [&_svg]:size-4",
      },
      content: { label: "gap-1", count: "px-1 py-0.5" },
    },
    compoundVariants: [
      { content: "label", size: "sm", class: "h-5 px-2" },
      { content: "label", size: "default", class: "h-6 px-2" },
      { content: "label", size: "lg", class: "h-9 px-3" },
      { content: "count", size: "sm", class: "size-5" },
      { content: "count", size: "default", class: "size-6" },
      { content: "count", size: "lg", class: "size-8" },
      {
        variant: "filled",
        color: "default",
        class:
          "bg-[var(--cds-brand-primary-on-surface-default)] text-[var(--cds-brand-primary-content-on-fill)]",
      },
      {
        variant: "filled",
        color: "secondary",
        class:
          "bg-[var(--cds-on-surface-sunken)] text-[var(--cds-content-primary)]",
      },
      {
        variant: "filled",
        color: "error",
        class:
          "bg-[var(--cds-status-error-on-surface-default)] text-[var(--cds-status-error-content-on-fill)]",
      },
      {
        variant: "filled",
        color: "success",
        class:
          "bg-[var(--cds-status-success-on-surface-default)] text-[var(--cds-status-success-content-on-fill)]",
      },
      {
        variant: "filled",
        color: "warning",
        class:
          "bg-[var(--cds-status-warning-on-surface-default)] text-[var(--cds-status-warning-content-on-fill)]",
      },
      {
        variant: "outlined",
        class:
          "text-[var(--cds-content-primary)] ring-1 ring-inset ring-[var(--cds-border-default)]",
      },
    ],
    defaultVariants: {
      variant: "filled",
      color: "default",
      size: "default",
      content: "label",
    },
  }
);

type TagProps = Omit<React.ComponentProps<"span">, "color"> &
  VariantProps<typeof tagVariants> & {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };

function Tag({
  className,
  variant,
  color,
  size,
  content,
  startIcon,
  endIcon,
  children,
  ...props
}: TagProps) {
  return (
    <span
      data-slot="tag"
      data-variant={variant ?? "filled"}
      data-color={color ?? "default"}
      className={cn(tagVariants({ variant, color, size, content }), className)}
      {...props}
    >
      {content === "count" ? null : startIcon}
      {children}
      {content === "count" ? null : endIcon}
    </span>
  );
}

const tagColors = {
  primary:
    "bg-[var(--cds-brand-primary-on-surface-muted)] text-[var(--cds-brand-primary-content-strong)]",
  sky: "bg-[var(--cds-accent-sky-A02)] text-[var(--cds-accent-sky-A05)]",
  cyan: "bg-[var(--cds-accent-cyan-A02)] text-[var(--cds-accent-cyan-A05)]",
  pink: "bg-[var(--cds-accent-pink-A02)] text-[var(--cds-accent-pink-A05)]",
  purple:
    "bg-[var(--cds-accent-purple-A02)] text-[var(--cds-accent-purple-A05)]",
  emerald:
    "bg-[var(--cds-accent-emerald-A02)] text-[var(--cds-accent-emerald-A05)]",
  amber: "bg-[var(--cds-accent-amber-A02)] text-[var(--cds-accent-amber-A05)]",
  orange:
    "bg-[var(--cds-accent-orange-A02)] text-[var(--cds-accent-orange-A05)]",
} as const;

type TagColorProps = React.ComponentProps<"span"> & {
  color?: keyof typeof tagColors;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

/** Figma `tag-color`: a category tag whose color carries no meaning (use `Tag` for status). */
function TagColor({
  className,
  color = "primary",
  startIcon,
  endIcon,
  children,
  ...props
}: Omit<TagColorProps, "color"> & { color?: keyof typeof tagColors }) {
  return (
    <span
      data-slot="tag-color"
      data-color={color}
      className={cn(
        "inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full px-2 py-0.5 text-xs leading-4 font-medium whitespace-nowrap select-none [&_svg]:size-3 [&_svg]:shrink-0",
        tagColors[color],
        className
      )}
      {...props}
    >
      {startIcon}
      {children}
      {endIcon}
    </span>
  );
}

export { Tag, TagColor, tagColors, tagVariants };
