import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      color: {
        primary: "", error: "", success: "", warning: "", info: "", default: "",
      },
      glow: { true: "", false: "" },
      variant: {
        dot: "size-2 border-0 p-0 font-[family-name:var(--font-ui)] leading-4 transition-colors",
        standard: "h-5 min-w-5 border-0 px-1 py-0.5 font-[family-name:var(--font-ui)] leading-4 transition-colors",
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border bg-card text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    compoundVariants: [
      { variant: ["dot", "standard"], color: "primary", class: "bg-[var(--cds-brand-primary-on-surface-default)] text-[var(--cds-brand-primary-content-on-fill)]" },
      { variant: ["dot", "standard"], color: "error", class: "bg-[var(--cds-status-error-on-surface-default)] text-[var(--cds-status-error-content-on-fill)]" },
      { variant: ["dot", "standard"], color: "success", class: "bg-[var(--cds-status-success-on-surface-default)] text-[var(--cds-status-success-content-on-fill)]" },
      { variant: ["dot", "standard"], color: "warning", class: "bg-[var(--cds-status-warning-on-surface-default)] text-[var(--cds-status-warning-content-on-fill)]" },
      { variant: ["dot", "standard"], color: "info", class: "bg-[var(--cds-status-info-on-surface-default)] text-[var(--cds-status-info-content-on-fill)]" },
      { variant: ["dot", "standard"], color: "default", class: "bg-[var(--cds-on-surface-sunken)] text-[var(--cds-content-primary)]" },
      { variant: "dot", glow: true, color: "primary", class: "shadow-[0_0_4px_color-mix(in_srgb,var(--cds-brand-primary-on-surface-default)_36%,transparent)]" },
      { variant: "dot", glow: true, color: "error", class: "shadow-[0_0_4px_color-mix(in_srgb,var(--cds-status-error-on-surface-default)_36%,transparent)]" },
      { variant: "dot", glow: true, color: "success", class: "shadow-[0_0_4px_color-mix(in_srgb,var(--cds-status-success-on-surface-default)_36%,transparent)]" },
      { variant: "dot", glow: true, color: "warning", class: "shadow-[0_0_4px_color-mix(in_srgb,var(--cds-status-warning-on-surface-default)_36%,transparent)]" },
      { variant: "dot", glow: true, color: "info", class: "shadow-[0_0_4px_color-mix(in_srgb,var(--cds-status-info-on-surface-default)_36%,transparent)]" },
      { variant: "dot", glow: true, color: "default", class: "shadow-[0_0_4px_color-mix(in_srgb,var(--cds-on-surface-sunken)_36%,transparent)]" },
    ],
    defaultVariants: {
      variant: "default",
      color: "primary",
    },
  },
);

function Badge({
  className,
  variant = "default",
  color = "primary",
  glow = false,
  children,
  render,
  ...props
}: Omit<useRender.ComponentProps<"span">, "color"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, color, glow: variant === "dot" ? glow : false }), className),
        children: variant === "dot" ? undefined : children,
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
      color: variant === "dot" || variant === "standard" ? color : undefined,
    },
  });
}

export { Badge, badgeVariants };
