import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

/**
 * Figma `toggle-group-item` (docs/components/TOGGLE-GROUP-FIGMA.md): a pill, 32 high, padding 4/12,
 * min width 64, label 14/20 Regular. `variant` = Figma `appearance`:
 * - default: hover / pressed / selected fill `on-surface/action/selected`
 * - outline: the same plus a 1px `border/default` ring
 * - segmented: only inside a segmented control; selected = white (`on-surface/elevated`) chip on
 *   the rail, no hover or pressed feedback
 * - joined: Figma `toggle-button` (docs/components/TOGGLE-GROUP-FIGMA.md): square-cornered cells inside a
 *   bordered group; `size` xs | sm | default | lg = Figma xSmall | small | medium | large (24 / 32 / 36 / 48)
 *   Medium weight; selected fills with the primary surface (hover / pressed darken)
 * Disabled uses `content/disabled` and keeps the selected fill.
 */
const toggleVariants = cva(
  "group/toggle inline-flex h-8 min-w-16 items-center justify-center gap-2 rounded-full px-3 py-1 text-sm leading-5 font-normal whitespace-nowrap text-[var(--cds-content-primary)] transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-[var(--cds-border-system)] data-disabled:pointer-events-none data-disabled:text-[var(--cds-content-disabled)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "hover:bg-[var(--cds-on-surface-action-selected)] active:bg-[var(--cds-on-surface-action-selected)] data-pressed:bg-[var(--cds-on-surface-action-selected)]",
        outline:
          "ring-1 ring-inset ring-[var(--cds-border-default)] hover:bg-[var(--cds-on-surface-action-selected)] active:bg-[var(--cds-on-surface-action-selected)] data-pressed:bg-[var(--cds-on-surface-action-selected)] focus-visible:ring-2 focus-visible:ring-[var(--cds-border-system)]",
        segmented: "data-pressed:bg-[var(--cds-on-surface-elevated)]",
        joined:
          "min-w-0 rounded-none py-0 font-medium text-[var(--cds-content-secondary)] hover:bg-[var(--cds-on-surface-action-hover)] hover:text-[var(--cds-content-primary)] active:bg-[var(--cds-on-surface-action-pressed)] active:text-[var(--cds-content-primary)] data-pressed:bg-[var(--cds-brand-primary-on-surface-default)] data-pressed:text-[var(--cds-brand-primary-content-on-fill)] data-pressed:hover:bg-[var(--cds-brand-primary-on-surface-hover)] data-pressed:hover:text-[var(--cds-brand-primary-content-on-fill)] data-pressed:active:bg-[var(--cds-brand-primary-on-surface-pressed)] data-pressed:active:text-[var(--cds-brand-primary-content-on-fill)] data-disabled:bg-transparent data-disabled:hover:bg-transparent data-disabled:data-pressed:bg-[var(--cds-on-surface-action-disabled)] data-disabled:data-pressed:hover:bg-[var(--cds-on-surface-action-disabled)] data-disabled:data-pressed:text-[var(--cds-content-disabled)] focus-visible:ring-inset",
      },
      // Only used with variant="joined".
      size: {
        xs: "",
        sm: "",
        default: "",
        lg: "",
      },
    },
    compoundVariants: [
      {
        variant: "joined",
        size: "xs",
        class:
          "h-6 gap-1 px-2 text-xs leading-4 [&_svg:not([class*='size-'])]:size-4",
      },
      {
        variant: "joined",
        size: "sm",
        class:
          "h-8 gap-1 px-3 text-xs leading-4 [&_svg:not([class*='size-'])]:size-4",
      },
      {
        variant: "joined",
        size: "default",
        class:
          "h-9 gap-2 px-4 text-sm leading-5 [&_svg:not([class*='size-'])]:size-5",
      },
      {
        variant: "joined",
        size: "lg",
        class:
          "h-12 gap-3 px-6 text-base leading-6 [&_svg:not([class*='size-'])]:size-6",
      },
    ],
    defaultVariants: { variant: "default" },
  }
);

function Toggle({
  className,
  variant = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      data-variant={variant}
      className={cn(toggleVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
