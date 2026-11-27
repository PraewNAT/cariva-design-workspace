import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";

/**
 * Figma `textarea` (docs/components/INPUT-FIELD-FIGMA.md): size default = radius 8,
 * padding 8/16, min height 96; lg = radius 12, padding 12/16, min height 120.
 * Same border states as Input (inset ring, 2px on focus and error).
 */
const textareaVariants = cva(
  "flex field-sizing-content w-full resize-none border-0 bg-[var(--cds-on-surface-default)] px-4 text-base leading-6 text-[var(--cds-content-primary)] ring-1 ring-inset ring-[var(--cds-border-default)] transition-colors outline-none placeholder:text-placeholder hover:ring-[var(--cds-border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--cds-border-system)] aria-invalid:ring-2 aria-invalid:ring-[var(--cds-border-error)] disabled:cursor-not-allowed disabled:bg-[var(--cds-on-surface-action-disabled)] disabled:text-[var(--cds-content-disabled)] disabled:ring-1 disabled:ring-[var(--cds-border-disabled)] disabled:placeholder:text-[var(--cds-content-disabled)]",
  {
    variants: {
      size: {
        default: "min-h-24 rounded-sm py-2",
        lg: "min-h-30 rounded-md py-3",
      },
    },
    defaultVariants: { size: "default" },
  }
);

function Textarea({
  className,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"textarea">, "size"> &
  VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      data-size={size}
      className={cn(textareaVariants({ size }), className)}
      {...props}
    />
  );
}

export { Textarea, textareaVariants };
