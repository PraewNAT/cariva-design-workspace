import { Switch } from "@/lib/app/components/ui/switch";
import { cn } from "cn";
import * as React from "react";

/**
 * Figma `switch-field` (docs/components/SWITCH-FIGMA.md): Switch + label 14/20 Medium + description
 * 12/16, gap 16. `error` only recolors the label (`status/error/content/default`).
 */
type SwitchFieldProps = Omit<
  React.ComponentProps<typeof Switch>,
  "children"
> & {
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Figma `labelPlacement`: `end` = label after the switch, `start` = label before it. */
  labelPlacement?: "end" | "start";
  error?: boolean;
};

function SwitchField({
  label,
  description,
  labelPlacement = "end",
  error = false,
  disabled,
  id,
  className,
  ...props
}: SwitchFieldProps) {
  const uid = React.useId();
  const sid = id ?? uid;
  return (
    <div
      data-slot="switch-field"
      data-label-placement={labelPlacement}
      className={cn(
        "flex items-start gap-4",
        labelPlacement === "start" && "flex-row-reverse justify-end",
        className
      )}
    >
      <Switch
        id={sid}
        disabled={disabled}
        aria-invalid={error || undefined}
        {...props}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <label
          htmlFor={sid}
          className={cn(
            "text-sm leading-5 font-medium",
            disabled
              ? "text-[var(--cds-content-disabled)]"
              : error
              ? "text-[var(--cds-status-error-content-default)]"
              : "text-[var(--cds-content-primary)]"
          )}
        >
          {label}
        </label>
        {description ? (
          <p
            className={cn(
              "text-xs leading-4",
              disabled
                ? "text-[var(--cds-content-disabled)]"
                : "text-[var(--cds-content-secondary)]"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export { SwitchField };
