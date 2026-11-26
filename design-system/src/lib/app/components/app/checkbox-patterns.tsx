import { Checkbox } from "@/lib/app/components/ui/checkbox";
import { cn } from "cn";
import * as React from "react";

/**
 * Figma `checkbox-field`, `checkbox-group`, `checkbox-card` (docs/components/CHECKBOX-FIGMA.md).
 * Compositions of Checkbox + label + description. Hover shadow on the card is not built
 * (no shadow tokens yet).
 */
type CheckboxFieldProps = Omit<
  React.ComponentProps<typeof Checkbox>,
  "children"
> & {
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Figma `labelPlacement`: `end` = label after the box, `start` = label before it. */
  labelPlacement?: "end" | "start";
};

function useParts({
  label,
  description,
  error,
  disabled,
  id,
}: Pick<
  CheckboxFieldProps,
  "label" | "description" | "error" | "disabled" | "id"
>) {
  const uid = React.useId();
  const cid = id ?? uid;
  const labelColor = disabled
    ? "text-[var(--cds-content-disabled)]"
    : error
    ? "text-[var(--cds-status-error-content-default)]"
    : "text-[var(--cds-content-primary)]";
  const descColor = disabled
    ? "text-[var(--cds-content-disabled)]"
    : "text-[var(--cds-content-secondary)]";
  const content = (
    <div className="flex min-w-0 flex-col gap-1">
      <label
        htmlFor={cid}
        className={cn("text-sm leading-5 font-medium", labelColor)}
      >
        {label}
      </label>
      {description ? (
        <p className={cn("text-sm leading-5", descColor)}>{description}</p>
      ) : null}
    </div>
  );
  return { cid, content };
}

function CheckboxField({
  label,
  description,
  labelPlacement = "end",
  className,
  ...props
}: CheckboxFieldProps) {
  const { cid, content } = useParts({
    label,
    description,
    error: props.error,
    disabled: props.disabled,
    id: props.id,
  });
  return (
    <div
      data-slot="checkbox-field"
      data-label-placement={labelPlacement}
      className={cn(
        "flex items-start gap-3",
        labelPlacement === "start" && "flex-row-reverse justify-end",
        className
      )}
    >
      <div className="flex h-5 items-center">
        <Checkbox {...props} id={cid} />
      </div>
      {content}
    </div>
  );
}

/** Figma `checkbox-group`: label + description, then the checkboxes (children) 12px apart. */
function CheckboxGroup({
  label,
  description,
  error,
  disabled,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const labelColor = disabled
    ? "text-[var(--cds-content-disabled)]"
    : error
    ? "text-[var(--cds-status-error-content-default)]"
    : "text-[var(--cds-content-primary)]";
  return (
    <div
      data-slot="checkbox-group"
      role="group"
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    >
      {label || description ? (
        <div className="flex flex-col gap-1">
          {label ? (
            <div className={cn("text-sm leading-5 font-medium", labelColor)}>
              {label}
            </div>
          ) : null}
          {description ? (
            <div
              className={cn(
                "text-sm leading-5",
                disabled
                  ? "text-[var(--cds-content-disabled)]"
                  : "text-[var(--cds-content-secondary)]"
              )}
            >
              {description}
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-col gap-3 pt-3">{children}</div>
    </div>
  );
}

/** Figma `checkbox-card`: the whole card is the click target; checked tints the card. */
function CheckboxCard({
  label,
  description,
  className,
  ...props
}: Omit<CheckboxFieldProps, "labelPlacement">) {
  const { cid, content } = useParts({
    label,
    description,
    error: props.error,
    disabled: props.disabled,
    id: props.id,
  });
  return (
    <label
      htmlFor={cid}
      data-slot="checkbox-card"
      data-error={props.error ? "" : undefined}
      data-disabled={props.disabled ? "" : undefined}
      className={cn(
        "flex w-[409px] items-start gap-3 rounded-[var(--container-radius)] bg-[var(--cds-on-surface-default)] p-4 ring-1 ring-inset ring-[var(--cds-border-default)] transition-colors",
        "has-data-checked:bg-[var(--cds-brand-primary-on-surface-subtle)] has-data-checked:ring-[var(--cds-brand-primary-border-default)] hover:shadow-[var(--cds-shadow-sm)] has-data-checked:hover:shadow-[var(--cds-glow-primary)]",
        "data-[error]:ring-[var(--cds-status-error-border-strong)] data-[error]:has-data-checked:bg-[var(--cds-status-error-on-surface-subtle)] data-[error]:has-data-checked:ring-[var(--cds-status-error-border-strong)] data-[error]:has-data-checked:hover:shadow-[var(--cds-glow-error)]",
        "data-[disabled]:bg-[var(--cds-on-surface-default)] data-[disabled]:ring-[var(--cds-border-disabled)] data-[disabled]:has-data-checked:bg-[var(--cds-on-surface-default)] data-[disabled]:has-data-checked:ring-[var(--cds-border-disabled)] data-[disabled]:hover:shadow-none data-[disabled]:has-data-checked:hover:shadow-none",
        className
      )}
    >
      <div className="flex h-5 items-center">
        <Checkbox {...props} id={cid} />
      </div>
      {content}
    </label>
  );
}

export { CheckboxCard, CheckboxField, CheckboxGroup };
export type { CheckboxFieldProps };
