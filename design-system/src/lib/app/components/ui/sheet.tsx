import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import * as React from "react";

import headerLeft from "./assets/sheet/header-left.svg";
import headerRight from "./assets/sheet/header-right.svg";
import searchLeft from "./assets/sheet/search-left.svg";
import searchRight from "./assets/sheet/search-right.svg";
import defaultIcon from "./assets/sheet/icon-default.svg";
import searchIcon from "./assets/sheet/icon-search.svg";
import closeIcon from "./assets/sheet/close.svg";

const SheetSideContext = React.createContext<"top" | "right" | "bottom" | "left">("right");

import { Button } from "@/lib/app/components/ui/button";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-[var(--cds-overlay-backdrop)] transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col bg-popover bg-clip-padding text-sm data-[side=left]:gap-4 data-[side=left]:border-[var(--cds-border-default)] data-[side=left]:bg-[var(--cds-on-surface-elevated)] data-[side=left]:p-4 data-[side=right]:gap-4 data-[side=right]:border-[var(--cds-border-default)] data-[side=right]:bg-[var(--cds-on-surface-elevated)] data-[side=right]:p-4 data-[side=top]:gap-4 data-[side=top]:border-[var(--cds-border-default)] data-[side=top]:bg-[var(--cds-on-surface-elevated)] data-[side=top]:p-4 text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:max-h-[calc(100dvh-24px)] data-[side=bottom]:overflow-hidden data-[side=bottom]:rounded-t-[24px] data-[side=bottom]:font-[family-name:var(--font-ui)] data-[side=bottom]:text-base data-[side=bottom]:leading-6 data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-[400px] data-[side=right]:sm:max-w-[400px]",
          className
        )}
        {...props}
      >
        <SheetSideContext.Provider value={side}>
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                color="secondary"
                className={cn("absolute top-4 right-4 size-8 p-1.5", side === "bottom" && "top-6 right-6 p-2")}
                size="icon-sm"
              />
            }
          >
            {side === "bottom" ? <img src={closeIcon} alt="" width={16} height={16} /> : <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-5" />}
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
        </SheetSideContext.Provider>
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

/** Bottom-only visual options; other sides preserve their existing recipe. */
function SheetHeader({ className, children, variant = "default", icon, showTopColor = true, ...props }:
  React.ComponentProps<"div"> & { variant?: "default" | "search"; icon?: React.ReactNode; showTopColor?: boolean }) {
  const bottom = React.useContext(SheetSideContext) === "bottom";
  const search = variant === "search";
  if (!bottom) return <div data-slot="sheet-header" className={cn("flex flex-col gap-2 pr-12", className)} {...props}>{children}</div>;
  return (
    <div data-slot="sheet-header" data-variant={variant} className={cn(
      "relative isolate grid shrink-0 gap-x-2 gap-y-3 overflow-hidden px-6 pt-6 pb-4 [&>*]:relative [&>*]:z-10 [&>*]:col-span-full [&>[data-slot=sheet-title]]:col-span-1 [&>[data-slot=sheet-title]]:row-start-1 [&>[data-slot=sheet-title]]:self-center",
      icon === null ? "grid-cols-[minmax(0,1fr)_32px] [&>[data-slot=sheet-title]]:col-start-1" : search ? "grid-cols-[24px_minmax(0,1fr)_32px] [&>[data-slot=sheet-title]]:col-start-2" : "grid-cols-[32px_minmax(0,1fr)_32px] [&>[data-slot=sheet-title]]:col-start-2",
      "min-h-[72px]", className
    )} {...props}>
      {showTopColor && <div aria-hidden="true" style={{ gridColumn: "auto", gridRow: "auto" }} className="pointer-events-none !absolute inset-0 !z-0 overflow-hidden">
        <img alt="" src={search ? searchLeft : headerLeft} className={cn("absolute left-[-302px] max-w-none", search ? "top-[-118.47px]" : "top-[-72px]")} />
        <img alt="" src={search ? searchRight : headerRight} className={cn("absolute max-w-none", search ? "right-[-300px] top-[-118.47px]" : "right-[-302px] top-[-71.05px]")} />
      </div>}
      {icon !== null && <span data-slot="sheet-icon" aria-hidden="true" className={cn("!col-span-1 col-start-1 row-start-1 flex h-8 items-center justify-center", search ? "w-6 [&>svg]:size-6" : "w-8 [&>svg]:size-8")}>{icon ?? <img alt="" src={search ? searchIcon : defaultIcon} width={search ? 24 : 32} height={search ? 24 : 32} />}</span>}
      {children}
    </div>
  );
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  const bottom = React.useContext(SheetSideContext) === "bottom";
  return <div data-slot="sheet-body" className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain", bottom && "px-6 py-4", className)} {...props} />;
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  const bottom = React.useContext(SheetSideContext) === "bottom";
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-row justify-end gap-2", bottom && "shrink-0 flex-col border-t border-border bg-popover p-6 px-4 pb-[max(24px,env(safe-area-inset-bottom))]", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  const bottom = React.useContext(SheetSideContext) === "bottom";
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        !bottom && "font-sans text-sm leading-5 text-[var(--cds-content-primary)]",
        bottom && "min-w-0 break-words font-[family-name:var(--font-ui)] text-xl leading-7 font-semibold",
        className
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  const bottom = React.useContext(SheetSideContext) === "bottom";
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", !bottom && "leading-5 text-[var(--cds-content-secondary)]", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
