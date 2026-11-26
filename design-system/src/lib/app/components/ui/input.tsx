import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";

/**
 * Figma `input` (docs/components/INPUT-FIELD-FIGMA.md): size default = 40px
 * (padding 8/16), lg = 48px (padding 12/16). The 1px border is an inset ring so
 * focus and error can grow to 2px without moving the layout.
 */
const inputVariants = cva(
  "w-full min-w-0 rounded-[var(--input-radius)] border-0 bg-[var(--cds-on-surface-default)] px-4 text-base leading-6 text-[var(--cds-content-primary)] ring-1 ring-inset ring-[var(--cds-border-default)] transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-placeholder hover:ring-[var(--cds-border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--cds-border-system)] aria-invalid:ring-2 aria-invalid:ring-[var(--cds-border-error)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--cds-on-surface-action-disabled)] disabled:text-[var(--cds-content-disabled)] disabled:ring-1 disabled:ring-[var(--cds-border-disabled)] disabled:placeholder:text-[var(--cds-content-disabled)]",
  {
    variants: {
      size: {
        default: "py-2",
        lg: "py-3",
      },
    },
    defaultVariants: { size: "default" },
  }
);

function Input({
  className,
  type,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
