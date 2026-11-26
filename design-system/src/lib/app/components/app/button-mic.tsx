import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";
import {
  ChevronDownRounded,
  MicNoneRounded,
} from "@/lib/app/components/app/icons";

/**
 * Figma `button-mic` (docs/components/BUTTON-MIC-FIGMA.md): a 200×32 microphone picker. `variant`
 * wave (5 level bars) | dot (status dot), `status` active (green) | inactive (red, Figma
 * "deactive"). Hover / pressed fill follow the action surface tokens. The caller supplies the
 * device name (`label`) and the status; no device or audio logic lives here.
 */
type ButtonMicProps = Omit<ComponentProps<"button">, "children"> & {
  variant?: "wave" | "dot";
  status?: "active" | "inactive";
  label: ReactNode;
};

const ACTIVE_HEIGHTS = ["h-2", "h-3", "h-4", "h-3", "h-2"] as const;

function ButtonMic({
  variant = "wave",
  status = "active",
  label,
  className,
  type = "button",
  ...props
}: ButtonMicProps) {
  const active = status === "active";
  const tone = active
    ? "bg-[var(--cds-status-active-on-surface-default)]"
    : "bg-[var(--cds-status-error-on-surface-default)]";
  return (
    <button
      type={type}
      data-slot="button-mic"
      data-variant={variant}
      data-status={status}
      className={cn(
        "inline-flex h-8 w-50 max-w-full items-center gap-1 rounded-md p-2 text-left font-sans text-xs leading-4 font-medium text-[var(--cds-content-secondary)] transition-colors outline-none hover:bg-[var(--cds-on-surface-action-hover)] focus-visible:ring-[3px] focus-visible:ring-ring/50 active:bg-[var(--cds-on-surface-action-pressed)] disabled:pointer-events-none disabled:text-[var(--cds-content-disabled)]",
        className
      )}
      {...props}
    >
      {variant === "wave" ? (
        <span
          aria-hidden
          data-slot="button-mic-wave"
          className="flex h-4 w-7 shrink-0 items-center justify-center gap-0.5"
        >
          {ACTIVE_HEIGHTS.map((height, index) => (
            <span
              key={index}
              className={cn("w-1 rounded-full", active ? height : "h-2", tone)}
            />
          ))}
        </span>
      ) : (
        <span
          aria-hidden
          data-slot="button-mic-dot"
          className="flex size-4 shrink-0 items-center justify-center"
        >
          <span className={cn("size-2 rounded-full", tone)} />
        </span>
      )}
      <MicNoneRounded className="size-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <ChevronDownRounded className="size-4 shrink-0" />
    </button>
  );
}

export { ButtonMic };
export type { ButtonMicProps };
