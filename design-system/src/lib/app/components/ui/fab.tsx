import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

/**
 * Figma `fab` (docs/components/FAB-FIGMA.md): a round floating action button.
 * size sm = 40 (icon 20), default = 56 (icon 24), lg = 64 (icon 28); color primary | secondary
 * (Figma neutral). Shadow: `shadow/2xl` at rest, `shadow/xl` on hover, `shadow/md` pressed,
 * none when disabled (from the --cds-shadow-* tokens). Built on the same Base UI Button
 * primitive as Button, with its own sizes.
 */
const fabVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full transition-[background-color,box-shadow] outline-none select-none focus-visible:ring-2 focus-visible:ring-[var(--cds-border-system)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-[var(--cds-on-surface-action-disabled)] disabled:text-[var(--cds-content-disabled)] disabled:shadow-none",
  {
    variants: {
      size: {
        sm: "size-10 [&_svg:not([class*='size-'])]:size-5",
        default: "size-14 [&_svg:not([class*='size-'])]:size-6",
        lg: "size-16 [&_svg:not([class*='size-'])]:size-7",
      },
      color: {
        primary:
          "bg-[var(--cds-brand-primary-on-surface-default)] text-[var(--cds-brand-primary-content-on-fill)] shadow-[var(--cds-shadow-2xl)] hover:bg-[var(--cds-brand-primary-on-surface-hover)] hover:shadow-[var(--cds-shadow-xl)] active:bg-[var(--cds-brand-primary-on-surface-pressed)] active:shadow-[var(--cds-shadow-md)]",
        secondary:
          "bg-[var(--cds-on-surface-default)] text-[var(--cds-neutral-content-default)] ring-1 ring-[var(--cds-border-default)] ring-inset shadow-[var(--cds-shadow-2xl)] hover:bg-[var(--cds-on-surface-action-hover)] hover:ring-[var(--cds-border-strong)] hover:shadow-[var(--cds-shadow-xl)] active:bg-[var(--cds-on-surface-action-pressed)] active:ring-[var(--cds-border-strong)] active:shadow-[var(--cds-shadow-md)] disabled:ring-[var(--cds-border-disabled)]",
      },
    },
    defaultVariants: { size: "default", color: "primary" },
  }
);

function Fab({
  className,
  size = "default",
  color = "primary",
  ...props
}: Omit<ButtonPrimitive.Props, "color"> & VariantProps<typeof fabVariants>) {
  return (
    <ButtonPrimitive
      data-slot="fab"
      data-size={size}
      data-color={color}
      className={cn(fabVariants({ size, color }), className)}
      {...props}
    />
  );
}

export { Fab, fabVariants };
