import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "cn";

/**
 * Figma `switch` (docs/components/SWITCH-FIGMA.md): size default = track 44×24 with a 20px thumb,
 * sm = 36×20 with a 16px thumb (padding 2). Track: off `border/default`, on
 * `brand/primary/on-surface/default`; keyboard focus turns the off track `border/system`;
 * disabled off `on-surface/action/disabled`, on `brand/primary/on-surface/muted` (no opacity).
 * Figma's `error` only recolors the label, so it is `aria-invalid` and handled by `SwitchField`.
 */
function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border-0 p-0.5 transition-colors outline-none data-[size=default]:h-6 data-[size=default]:w-11 data-[size=sm]:h-5 data-[size=sm]:w-9 data-checked:bg-[var(--cds-brand-primary-on-surface-default)] data-unchecked:bg-[var(--cds-border-default)] focus-visible:data-unchecked:bg-[var(--cds-border-system)] data-disabled:cursor-not-allowed data-disabled:data-unchecked:bg-[var(--cds-on-surface-action-disabled)] data-disabled:data-checked:bg-[var(--cds-brand-primary-on-surface-muted)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-[var(--cds-on-surface-default)] shadow-[var(--cds-shadow-sm)] transition-transform group-data-[size=default]/switch:size-5 group-data-[size=sm]/switch:size-4 group-data-[size=default]/switch:data-checked:translate-x-5 group-data-[size=sm]/switch:data-checked:translate-x-4 data-unchecked:translate-x-0"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
