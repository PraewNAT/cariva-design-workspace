"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import * as React from "react";

import { Button } from "@/lib/app/components/ui/button";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-[var(--cds-overlay-backdrop)] duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-[min(calc(100%-2rem),320px)] max-h-[calc(100dvh-2rem)] overflow-y-auto -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg bg-[var(--cds-on-surface-default)] p-4 text-sm text-[var(--cds-content-primary)] shadow-[var(--cds-shadow-2xl)] ring-1 ring-inset ring-[var(--cds-border-default)] duration-100 outline-none md:w-[400px] has-[>[data-slot=dialog-header]]:gap-0 has-[>[data-slot=dialog-header]]:p-0 has-[>[data-slot=dialog-header]]:*:data-[slot=dialog-footer]:bg-[var(--cds-on-surface-subtle)] has-[>[data-slot=dialog-header]]:*:data-[slot=dialog-footer]:p-4 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                color="secondary"
                className="absolute top-4 right-4"
                size="icon-sm"
              />
            }
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
            <span className="sr-only">ปิด</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

/**
 * Figma `dialog` header: `align` start = icon beside the text, center = icon above, text centred.
 * The surrounding DialogContent switches to the Figma section layout (no padding, header /
 * body / footer bands) when its first child is a DialogHeader.
 */
function DialogHeader({
  className,
  align = "start",
  icon,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "center";
  icon?: React.ReactNode;
}) {
  const center = align === "center";
  return (
    <div
      data-slot="dialog-header"
      data-align={align}
      className={cn(
        "flex gap-2 px-4 pt-6 pb-4",
        center ? "flex-col items-center text-center" : "flex-row items-start",
        className
      )}
      {...props}
    >
      {icon ? (
        <span
          data-slot="dialog-icon"
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-md p-1 text-[var(--cds-content-secondary)]",
            center ? "size-11 [&>svg]:size-9" : "size-7 [&>svg]:size-5"
          )}
        >
          {icon}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-col">{children}</div>
    </div>
  );
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("flex flex-col gap-4 p-4", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 *:w-full md:flex-row md:justify-end md:*:w-auto",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-xl leading-7 font-semibold text-[var(--cds-content-primary)]",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm leading-5 text-[var(--cds-content-secondary)] *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
