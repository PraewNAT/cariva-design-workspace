import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

/**
 * Figma ↔ code (docs/components/FIGMA-NAMING.md):
 * `variant` default | outline | ghost take their colours from `color`
 * (primary | destructive | secondary); `size` sm | default | lg. The other
 * variants (secondary, destructive, link, decorative, elevated is not built yet)
 * are shadcn's own and ignore `color`.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--button-radius,12px)] border-0 bg-clip-padding text-base leading-6 font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
  {
    variants: {
      variant: {
        decorative:
          "bg-[image:var(--decorative-gradient)] text-primary-foreground hover:opacity-90 disabled:opacity-50",
        // Figma "contained". Fill and label colours come from `color`.
        default:
          "disabled:bg-[var(--cds-on-surface-action-disabled)] disabled:text-[var(--cds-content-disabled)]",
        // Figma "outlined": 1px inset stroke, no fill; stroke colour comes from `color`.
        outline:
          "bg-transparent ring-1 ring-inset aria-expanded:bg-muted aria-expanded:text-foreground disabled:bg-[var(--cds-on-surface-action-disabled)] disabled:text-[var(--cds-content-disabled)] disabled:ring-0",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground disabled:opacity-50",
        // Figma "text": label only, surface appears on hover/press.
        ghost:
          "bg-transparent aria-expanded:bg-muted aria-expanded:text-foreground disabled:text-[var(--cds-content-disabled)]",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40 disabled:opacity-50",
        link: "text-primary underline-offset-4 hover:underline disabled:opacity-50",
      },
      // Figma "color". Only used together with default | outline | ghost.
      color: {
        primary: "",
        destructive: "",
        secondary: "",
      },
      size: {
        default: "gap-2 px-4 py-2",
        xs: "gap-1 px-2 py-1 text-xs leading-4 [&_svg:not([class*='size-'])]:size-4",
        // Figma small: 12/16 label, 16px icon, gap 4, padding 8/12 = 32px tall
        sm: "gap-1 px-3 py-2 text-xs leading-4 [&_svg:not([class*='size-'])]:size-4",
        // Figma large: gap 12, padding 12/24 = 48px tall
        lg: "gap-3 px-6 py-3",
        icon: "p-2",
        "icon-xs": "p-1 [&_svg:not([class*='size-'])]:size-4",
        "icon-sm": "p-1",
        "icon-lg": "p-3",
      },
    },
    compoundVariants: [
      // contained (variant=default)
      {
        variant: "default",
        color: "primary",
        class:
          "bg-[var(--cds-brand-primary-on-surface-default)] text-[var(--cds-brand-primary-content-on-fill)] hover:bg-[var(--cds-brand-primary-on-surface-hover)] active:bg-[var(--cds-brand-primary-on-surface-pressed)]",
      },
      {
        variant: "default",
        color: "destructive",
        class:
          "bg-[var(--cds-status-error-on-surface-default)] text-[var(--cds-status-error-content-on-fill)] hover:bg-[var(--cds-status-error-on-surface-hover)] active:bg-[var(--cds-status-error-on-surface-pressed)]",
      },
      // Figma has no contained + neutral; this is shadcn's own secondary look.
      {
        variant: "default",
        color: "secondary",
        class:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
      },
      // outlined (variant=outline)
      {
        variant: "outline",
        color: "primary",
        class:
          "text-[var(--cds-brand-primary-content-default)] ring-[var(--cds-brand-primary-border-strong)] hover:bg-[var(--cds-brand-primary-on-surface-subtle)] active:bg-[var(--cds-brand-primary-on-surface-muted)]",
      },
      {
        variant: "outline",
        color: "destructive",
        class:
          "text-[var(--cds-status-error-content-default)] ring-[var(--cds-border-error)] hover:bg-[var(--cds-status-error-on-surface-subtle)] hover:text-[var(--cds-status-error-content-strong)] active:bg-[var(--cds-status-error-on-surface-muted)] active:text-[var(--cds-status-error-content-strong)]",
      },
      {
        variant: "outline",
        color: "secondary",
        class:
          "text-[var(--cds-neutral-content-default)] ring-[var(--cds-neutral-border-default)] hover:bg-[var(--cds-neutral-on-surface-subtle)] active:bg-[var(--cds-neutral-on-surface-muted)]",
      },
      // text (variant=ghost)
      {
        variant: "ghost",
        color: "primary",
        class:
          "text-[var(--cds-brand-primary-content-default)] hover:bg-[var(--cds-brand-primary-on-surface-subtle)] active:bg-[var(--cds-brand-primary-on-surface-muted)] active:text-[var(--cds-brand-primary-content-strong)]",
      },
      {
        variant: "ghost",
        color: "destructive",
        class:
          "text-[var(--cds-status-error-content-default)] hover:bg-[var(--cds-status-error-on-surface-subtle)] hover:text-[var(--cds-status-error-content-strong)] active:bg-[var(--cds-status-error-on-surface-muted)] active:text-[var(--cds-status-error-content-strong)]",
      },
      {
        variant: "ghost",
        color: "secondary",
        class:
          "text-[var(--cds-neutral-content-default)] hover:bg-[var(--cds-neutral-on-surface-subtle)] active:bg-[var(--cds-neutral-on-surface-muted)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  color = "primary",
  size = "default",
  ...props
}: Omit<ButtonPrimitive.Props, "color"> & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-ui="button"
      data-size={size}
      data-variant={variant}
      data-color={color}
      className={cn(buttonVariants({ variant, color, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
