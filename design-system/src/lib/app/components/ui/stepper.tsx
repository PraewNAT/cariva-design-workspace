import { cn } from "cn";
import * as React from "react";

/**
 * Figma `stepper`, `step`, `step-indicator` (docs/components/STEPPER-FIGMA.md).
 * Indicator 24px: inactive / active / complete (check) / loading (spinner) / disabled.
 * Horizontal: steps are 120 wide with an 80 gap, the 2px connector runs between indicators (4px
 * clear each side). Vertical: rows 88 high, connector 56 long below the indicator.
 */
type StepState = "inactive" | "active" | "complete" | "loading" | "disabled";

const indicatorClass: Record<StepState, string> = {
  inactive:
    "bg-[var(--cds-on-surface-action-selected)] text-[var(--cds-content-primary)]",
  active:
    "bg-[var(--cds-brand-primary-on-surface-default)] text-[var(--cds-brand-primary-content-on-fill)]",
  complete:
    "bg-[var(--cds-status-success-on-surface-default)] text-[var(--cds-brand-primary-content-on-fill)]",
  loading:
    "bg-[var(--cds-brand-primary-on-surface-default)] text-[var(--cds-brand-primary-content-on-fill)]",
  disabled:
    "bg-[var(--cds-on-surface-action-selected)] text-[var(--cds-content-disabled)]",
};

// Copied from the Figma icons `Stepper / Check icon` and `Stepper / Loading icon` (16px)
function StepCheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3333"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path transform="translate(3.3333 4)" d="M0 4L2.6667 6.6667L9.3333 0" />
    </svg>
  );
}

function StepLoadingIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3333"
      strokeLinecap="round"
      aria-hidden="true"
      className={cn("animate-spin motion-reduce:animate-none", className)}
      {...props}
    >
      <path
        transform="translate(2 2)"
        d="M6 0C7.1867 0 8.3467 0.3519 9.3334 1.0112C10.3201 1.6705 11.0892 2.6075 11.5433 3.7039C11.9974 4.8003 12.1162 6.0067 11.8847 7.1705C11.6532 8.3344 11.0818 9.4035 10.2426 10.2426C9.4035 11.0818 8.3344 11.6532 7.1705 11.8847C6.0067 12.1162 4.8003 11.9974 3.7039 11.5433C2.6075 11.0892 1.6705 10.3201 1.0112 9.3334C0.3519 8.3467 0 7.1867 0 6"
      />
    </svg>
  );
}

function StepIndicator({
  state = "inactive",
  number,
  className,
  ...props
}: React.ComponentProps<"span"> & { state?: StepState; number?: number }) {
  return (
    <span
      data-slot="step-indicator"
      data-state={state}
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-sm leading-5",
        indicatorClass[state],
        className
      )}
      {...props}
    >
      {state === "complete" ? (
        <StepCheckIcon />
      ) : state === "loading" ? (
        <StepLoadingIcon />
      ) : (
        number
      )}
    </span>
  );
}

type StepProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  state?: StepState;
  number?: number;
  orientation?: "horizontal" | "vertical";
  /** Figma `showLabel`: false shows only the indicator. */
  showLabel?: boolean;
  className?: string;
};

function Step({
  title,
  description,
  state = "inactive",
  number,
  orientation = "horizontal",
  showLabel = true,
  className,
}: StepProps) {
  return (
    <div
      data-slot="step"
      data-state={state}
      className={cn(
        "flex gap-2",
        orientation === "horizontal"
          ? "flex-col items-center text-center"
          : "flex-row items-start",
        className
      )}
    >
      <StepIndicator state={state} number={number} />
      {showLabel && (title || description) ? (
        <div className="flex flex-col">
          {title ? (
            <span
              className={cn(
                "text-sm leading-5",
                state === "disabled"
                  ? "text-[var(--cds-content-disabled)]"
                  : "text-[var(--cds-content-primary)]"
              )}
            >
              {title}
            </span>
          ) : null}
          {description ? (
            <span
              className={cn(
                "text-sm leading-5",
                state === "disabled"
                  ? "text-[var(--cds-content-disabled)]"
                  : "text-[var(--cds-content-secondary)]"
              )}
            >
              {description}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

type StepperStep = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};

function Stepper({
  steps,
  value = 0,
  orientation = "horizontal",
  labels = true,
  loading = false,
  className,
  ...props
}: Omit<React.ComponentProps<"ol">, "children"> & {
  steps: StepperStep[];
  /** Zero-based index of the current step. Earlier steps are complete. */
  value?: number;
  orientation?: "horizontal" | "vertical";
  labels?: boolean;
  /** The current step shows a spinner instead of its number. */
  loading?: boolean;
}) {
  const horizontal = orientation === "horizontal";
  return (
    <ol
      data-slot="stepper"
      data-orientation={orientation}
      className={cn(
        "flex",
        horizontal ? "flex-row gap-20" : "flex-col",
        className
      )}
      {...props}
    >
      {steps.map((step, i) => {
        const state: StepState = step.disabled
          ? "disabled"
          : i < value
          ? "complete"
          : i === value
          ? loading
            ? "loading"
            : "active"
          : "inactive";
        const last = i === steps.length - 1;
        return (
          <li
            key={i}
            aria-current={i === value ? "step" : undefined}
            data-state={state}
            className={cn(
              "relative",
              horizontal
                ? "flex w-30 justify-center"
                : cn("w-full", !last && "h-22")
            )}
          >
            <Step
              title={step.title}
              description={step.description}
              state={state}
              number={i + 1}
              orientation={orientation}
              showLabel={labels}
            />
            {!last ? (
              <span
                aria-hidden="true"
                data-slot="step-connector"
                className={cn(
                  "absolute",
                  horizontal
                    ? "top-[11px] left-[76px] h-0.5 w-[168px]"
                    : "top-7 left-[11px] h-14 w-0.5",
                  i < value
                    ? "bg-[var(--cds-status-success-on-surface-default)]"
                    : "bg-[var(--cds-border-default)]"
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export { Step, StepCheckIcon, StepIndicator, StepLoadingIcon, Stepper };
