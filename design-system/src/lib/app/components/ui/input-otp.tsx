"use client";

import { MinusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "cn";
import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";

/**
 * Figma `input-otp` / `input-otp-slot` (docs/components/INPUT-OTP-FIGMA.md): separate 40×40 slots,
 * radius 12, 12px apart, 1px inset ring `border/default`; the active slot gets a 2px
 * `border/system` ring; `error` (aria-invalid) gives a 2px `border/error` ring; disabled
 * uses `border/disabled` and `content/disabled` (no opacity).
 */
function InputOTP({
  className,
  containerClassName,
  error,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
  /** Figma `error`; sets aria-invalid on the input. */
  error?: boolean;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      aria-invalid={error || props["aria-invalid"] || undefined}
      containerClassName={cn("group/otp flex items-center", containerClassName)}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-10 items-center justify-center rounded-md bg-[var(--cds-on-surface-default)] text-base leading-6 text-[var(--cds-content-primary)] ring-1 ring-inset ring-[var(--cds-border-default)] transition-colors outline-none data-[active=true]:z-10 data-[active=true]:ring-2 data-[active=true]:ring-[var(--cds-border-system)] group-has-[[aria-invalid=true]]/otp:ring-2 group-has-[[aria-invalid=true]]/otp:ring-[var(--cds-border-error)] group-has-disabled/otp:text-[var(--cds-content-disabled)] group-has-disabled/otp:ring-1 group-has-disabled/otp:ring-[var(--cds-border-disabled)]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-caret-blink bg-[var(--cds-brand-primary-content-default)] duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
