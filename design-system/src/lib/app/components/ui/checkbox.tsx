import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckRounded, RemoveRounded } from "@/lib/app/components/app/icons";
import { cn } from "cn";

/**
 * Figma `checkbox` (docs/components/CHECKBOX-FIGMA.md): 16px box, radius 4, 1px inset ring
 * `border/default`; checked / indeterminate fill brand primary (pressed while focused);
 * keyboard focus on an empty box = ring `border/system`; `error` (Figma `error`) maps to
 * aria-invalid; disabled uses its own colours, not opacity.
 */
function Checkbox({
  className,
  error,
  ...props
}: CheckboxPrimitive.Root.Props & { error?: boolean }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      aria-invalid={error || props["aria-invalid"] || undefined}
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] bg-transparent text-[var(--cds-content-inverse)] ring-1 ring-inset ring-[var(--cds-border-default)] transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2",
        "focus-visible:ring-[var(--cds-border-system)]",
        "data-checked:bg-[var(--cds-brand-primary-on-surface-default)] data-checked:ring-transparent data-checked:focus-visible:bg-[var(--cds-brand-primary-on-surface-pressed)]",
        "data-indeterminate:bg-[var(--cds-brand-primary-on-surface-default)] data-indeterminate:ring-transparent data-indeterminate:focus-visible:bg-[var(--cds-brand-primary-on-surface-pressed)]",
        "aria-invalid:ring-[var(--cds-status-error-border-strong)] aria-invalid:focus-visible:ring-[var(--cds-border-error)] aria-invalid:data-checked:bg-[var(--cds-status-error-on-surface-default)] aria-invalid:data-checked:focus-visible:bg-[var(--cds-status-error-on-surface-pressed)] aria-invalid:data-indeterminate:bg-[var(--cds-status-error-on-surface-default)] aria-invalid:data-indeterminate:focus-visible:bg-[var(--cds-status-error-on-surface-pressed)]",
        "data-disabled:cursor-not-allowed data-disabled:bg-[var(--cds-on-surface-action-disabled)] data-disabled:text-[var(--cds-content-disabled)] data-disabled:ring-[var(--cds-border-disabled)] data-disabled:data-checked:bg-[var(--cds-on-surface-action-disabled)] data-disabled:data-indeterminate:bg-[var(--cds-on-surface-action-disabled)]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="group/indicator grid place-content-center text-current transition-none"
      >
        <CheckRounded className="group-data-indeterminate/indicator:hidden" />
        <RemoveRounded className="hidden group-data-indeterminate/indicator:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
