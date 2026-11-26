import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

/**
 * Figma ↔ code (docs/components/FIGMA-NAMING.md):
 * `variant` default | outline | ghost | elevated take their colours from `color`
 * (primary | destructive | secondary); `size` sm | default | lg. The other
 * variants (secondary, destructive, link, decorative)
 * are shadcn's own and ignore `color`.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--button-radius,12px)] border-0 bg-clip-padding text-base leading-6 font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6 [&_[data-slot=spinner]]:size-6",
  {
    variants: {
      variant: {
        // Figma `button-decorative`: solid gradient-from base with a radial gradient on top
        // (--decorative-gradient), hover glow 0 0 4px primary at 36%, pressed opacity 85%.
        decorative:
          "bg-[var(--cds-brand-decorative-gradient-from)] bg-[image:var(--decorative-gradient)] text-[var(--cds-brand-primary-content-on-fill)] hover:shadow-[var(--cds-glow-primary)] active:opacity-85 disabled:bg-[var(--cds-on-surface-action-disabled)] disabled:bg-none disabled:text-[var(--cds-content-disabled)]",
        // Figma "contained". Fill and label colours come from `color`.
        default:
          "disabled:bg-[var(--cds-on-surface-action-disabled)] disabled:text-[var(--cds-content-disabled)]",
        // Figma "outlined": 1px inset stroke, no fill; stroke colour comes from `color`.
        outline:
          "bg-transparent ring-1 ring-inset aria-expanded:bg-muted aria-expanded:text-foreground disabled:bg-[var(--cds-on-surface-action-disabled)] disabled:text-[var(--cds-content-disabled)] disabled:ring-0",
        // Figma "elevated": white surface with shadow/sm (hover shadow/xl, pressed shadow/md).
        // Label colour comes from `color` (primary | secondary).
        elevated:
          "bg-[var(--cds-on-surface-default)] shadow-[var(--cds-shadow-sm)] hover:shadow-[var(--cds-shadow-xl)] active:bg-[var(--cds-on-surface-action-pressed)] active:shadow-[var(--cds-shadow-md)] disabled:bg-[var(--cds-on-surface-action-disabled)] disabled:text-[var(--cds-content-disabled)] disabled:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground disabled:opacity-50",
        // Figma "text": label only, surface appears on hover/press.
        ghost:
          "bg-transparent aria-expanded:bg-muted aria-expanded:text-foreground disabled:text-[var(--cds-content-disabled)]",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40 disabled:opacity-50",
        // Figma `button-link`: link colour tokens, always underlined, no horizontal padding, radius 12.
        link: "rounded-[12px] text-[var(--cds-content-link-default)] underline hover:text-[var(--cds-content-link-hover)] active:text-[var(--cds-content-link-pressed)] disabled:text-[var(--cds-content-disabled)]",
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
        sm: "gap-1 px-3 py-2 text-xs leading-4 [&_svg:not([class*='size-'])]:size-4 [&_[data-slot=spinner]]:size-4",
        // Figma large: gap 12, padding 12/24 = 48px tall
        lg: "gap-3 px-6 py-3",
        icon: "p-2",
        "icon-xs": "p-1 [&_svg:not([class*='size-'])]:size-4",
        // Figma button-icon small: 16px icon + padding 8 = 32px
        "icon-sm": "p-2 [&_svg:not([class*='size-'])]:size-4",
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
      // contained + neutral: defined by Figma `button-icon` (neutral on-surface fills).
      {
        variant: "default",
        color: "secondary",
        class:
          "bg-[var(--cds-neutral-on-surface-default)] text-[var(--cds-neutral-content-default)] hover:bg-[var(--cds-neutral-on-surface-hover)] active:bg-[var(--cds-neutral-on-surface-pressed)]",
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
      // elevated (variant=elevated)
      {
        variant: "elevated",
        color: "primary",
        class:
          "text-[var(--cds-brand-primary-content-default)] active:text-[var(--cds-brand-primary-content-strong)]",
      },
      {
        variant: "elevated",
        color: "secondary",
        class: "text-[var(--cds-neutral-content-default)]",
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
      // link: no horizontal padding at any size (Figma padding 8/0, 8/0, 12/0)
      { variant: "link", size: ["default", "sm", "lg"], class: "px-0" },
      // Figma button-icon ghost disabled keeps the disabled surface (text buttons do not)
      {
        variant: "ghost",
        size: ["icon", "icon-sm", "icon-lg"],
        class: "disabled:bg-[var(--cds-on-surface-action-disabled)]",
      },
      // Figma button-loading: while busy, outline keeps its default border and ghost stays
      // transparent; only contained shows the disabled surface.
      {
        variant: "outline",
        class:
          "disabled:aria-busy:bg-transparent disabled:aria-busy:ring-1 disabled:aria-busy:ring-[var(--cds-border-default)]",
      },
      { variant: "ghost", class: "disabled:aria-busy:bg-transparent" },
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
