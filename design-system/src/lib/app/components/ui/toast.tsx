import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn } from "cn";
import * as React from "react";

import { Button } from "@/lib/app/components/ui/button";
import {
  ToastCheckCircleOutlineIcon,
  ToastCheckCircleRoundedIcon,
  ToastCloseIcon,
  ToastErrorOutlineIcon,
  ToastErrorRoundedIcon,
  ToastInfoOutlineIcon,
  ToastInfoRoundedIcon,
  ToastReportProblemOutlinedIcon,
  ToastWarningRoundedIcon,
} from "@/lib/app/components/app/toast-icons";

/**
 * Figma `toast` (docs/components/TOAST-FIGMA.md): severity error / warning / info / success /
 * notification x variant filled / outlined / standard. Pass the severity as `type` and the variant
 * in `data`: `toast.add({ type: "success", data: { variant: "filled" }, title, description })`.
 * Without them a toast is `notification` / `standard`.
 */
type ToastSeverity = "error" | "warning" | "info" | "success" | "notification";
type ToastVariant = "filled" | "outlined" | "standard";

const SEVERITIES: ToastSeverity[] = [
  "error",
  "warning",
  "info",
  "success",
  "notification",
];

function toSeverity(type: string | undefined): ToastSeverity {
  return SEVERITIES.includes(type as ToastSeverity)
    ? (type as ToastSeverity)
    : "notification";
}

function toVariant(data: unknown): ToastVariant {
  const v = (data as { variant?: string } | undefined)?.variant;
  return v === "filled" || v === "outlined" ? v : "standard";
}

/** Class names for each severity x variant, written out in full so Tailwind can see them. */
const toastThemes: Record<ToastVariant, Record<ToastSeverity, ToastTheme>> = {
  filled: {
    error: {
      root: "bg-[var(--cds-status-error-on-surface-default)]",
      icon: "text-[var(--cds-status-error-content-on-fill)]",
      title: "text-[var(--cds-status-error-content-on-fill)]",
      desc: "text-[var(--cds-status-error-content-on-fill)]",
      action:
        "text-[var(--cds-content-inverse)] hover:text-[var(--cds-content-inverse)]",
      close:
        "text-[var(--cds-content-inverse)] hover:text-[var(--cds-content-inverse)]",
    },
    warning: {
      root: "bg-[var(--cds-status-warning-on-surface-default)]",
      icon: "text-[var(--cds-status-warning-content-on-fill)]",
      title: "text-[var(--cds-status-warning-content-on-fill)]",
      desc: "text-[var(--cds-status-warning-content-on-fill)]",
      action:
        "text-[var(--cds-content-inverse)] hover:text-[var(--cds-content-inverse)]",
      close:
        "text-[var(--cds-content-inverse)] hover:text-[var(--cds-content-inverse)]",
    },
    info: {
      root: "bg-[var(--cds-status-info-on-surface-default)]",
      icon: "text-[var(--cds-status-info-content-on-fill)]",
      title: "text-[var(--cds-status-info-content-on-fill)]",
      desc: "text-[var(--cds-status-info-content-on-fill)]",
      action:
        "text-[var(--cds-content-inverse)] hover:text-[var(--cds-content-inverse)]",
      close:
        "text-[var(--cds-content-inverse)] hover:text-[var(--cds-content-inverse)]",
    },
    success: {
      root: "bg-[var(--cds-status-success-on-surface-default)]",
      icon: "text-[var(--cds-status-success-content-on-fill)]",
      title: "text-[var(--cds-status-success-content-on-fill)]",
      desc: "text-[var(--cds-status-success-content-on-fill)]",
      action:
        "text-[var(--cds-content-inverse)] hover:text-[var(--cds-content-inverse)]",
      close:
        "text-[var(--cds-content-inverse)] hover:text-[var(--cds-content-inverse)]",
    },
    notification: {
      root: "bg-[var(--cds-on-surface-default)] shadow-[var(--cds-shadow-md)]",
      icon: "text-[var(--cds-brand-primary-on-surface-default)]",
      title: "text-[var(--cds-content-primary)]",
      desc: "text-[var(--cds-content-secondary)]",
      action: "text-[var(--cds-neutral-content-default)]",
      close: "text-[var(--cds-brand-primary-on-surface-default)]",
    },
  },
  outlined: {
    error: {
      root: "bg-[var(--cds-on-surface-default)] ring-1 ring-inset ring-[var(--cds-status-error-border-strong)]",
      icon: "text-[var(--cds-status-error-content-default)]",
      title: "text-[var(--cds-content-primary)]",
      desc: "text-[var(--cds-content-secondary)]",
      action: "text-[var(--cds-neutral-content-default)]",
      close: "text-[var(--cds-content-secondary)]",
    },
    warning: {
      root: "bg-[var(--cds-on-surface-default)] ring-1 ring-inset ring-[var(--cds-status-warning-border-strong)]",
      icon: "text-[var(--cds-status-warning-content-default)]",
      title: "text-[var(--cds-content-primary)]",
      desc: "text-[var(--cds-content-secondary)]",
      action: "text-[var(--cds-neutral-content-default)]",
      close: "text-[var(--cds-content-secondary)]",
    },
    info: {
      root: "bg-[var(--cds-on-surface-default)] ring-1 ring-inset ring-[var(--cds-status-info-border-strong)]",
      icon: "text-[var(--cds-status-info-content-default)]",
      title: "text-[var(--cds-content-primary)]",
      desc: "text-[var(--cds-content-secondary)]",
      action: "text-[var(--cds-neutral-content-default)]",
      close: "text-[var(--cds-content-secondary)]",
    },
    success: {
      root: "bg-[var(--cds-on-surface-default)] ring-1 ring-inset ring-[var(--cds-status-success-border-strong)]",
      icon: "text-[var(--cds-status-success-content-default)]",
      title: "text-[var(--cds-content-primary)]",
      desc: "text-[var(--cds-content-secondary)]",
      action: "text-[var(--cds-neutral-content-default)]",
      close: "text-[var(--cds-content-secondary)]",
    },
    notification: {
      root: "bg-[var(--cds-on-surface-default)] ring-1 ring-inset ring-[var(--cds-neutral-border-strong)]",
      icon: "text-[var(--cds-brand-primary-on-surface-default)]",
      title: "text-[var(--cds-content-primary)]",
      desc: "text-[var(--cds-content-secondary)]",
      action: "text-[var(--cds-neutral-content-default)]",
      close: "text-[var(--cds-brand-primary-on-surface-default)]",
    },
  },
  standard: {
    error: {
      root: "bg-[var(--cds-status-error-on-surface-subtle)] ring-1 ring-inset ring-[var(--cds-status-error-border-default)] shadow-[var(--cds-shadow-status-error)]",
      icon: "text-[var(--cds-status-error-content-default)]",
      title: "text-[var(--cds-content-primary)]",
      desc: "text-[var(--cds-content-secondary)]",
      action: "text-[var(--cds-neutral-content-default)]",
      close: "text-[var(--cds-content-secondary)]",
    },
    warning: {
      root: "bg-[var(--cds-status-warning-on-surface-subtle)] ring-1 ring-inset ring-[var(--cds-status-warning-border-default)] shadow-[var(--cds-shadow-status-warning)]",
      icon: "text-[var(--cds-status-warning-content-default)]",
      title: "text-[var(--cds-content-primary)]",
      desc: "text-[var(--cds-content-secondary)]",
      action: "text-[var(--cds-neutral-content-default)]",
      close: "text-[var(--cds-content-secondary)]",
    },
    info: {
      root: "bg-[var(--cds-status-info-on-surface-subtle)] ring-1 ring-inset ring-[var(--cds-status-info-border-default)] shadow-[var(--cds-shadow-status-info)]",
      icon: "text-[var(--cds-status-info-content-default)]",
      title: "text-[var(--cds-content-primary)]",
      desc: "text-[var(--cds-content-secondary)]",
      action: "text-[var(--cds-neutral-content-default)]",
      close: "text-[var(--cds-content-secondary)]",
    },
    success: {
      root: "bg-[var(--cds-status-success-on-surface-subtle)] ring-1 ring-inset ring-[var(--cds-status-success-border-default)] shadow-[var(--cds-shadow-status-success)]",
      icon: "text-[var(--cds-status-success-content-default)]",
      title: "text-[var(--cds-content-primary)]",
      desc: "text-[var(--cds-content-secondary)]",
      action: "text-[var(--cds-neutral-content-default)]",
      close: "text-[var(--cds-content-secondary)]",
    },
    notification: {
      root: "bg-[var(--cds-neutral-on-surface-subtle)] ring-1 ring-inset ring-[var(--cds-neutral-border-default)] shadow-[var(--cds-shadow-status-notification)]",
      icon: "text-[var(--cds-brand-primary-on-surface-default)]",
      title: "text-[var(--cds-content-primary)]",
      desc: "text-[var(--cds-content-secondary)]",
      action: "text-[var(--cds-neutral-content-default)]",
      close: "text-[var(--cds-brand-primary-on-surface-default)]",
    },
  },
};

function toastTheme(severity: ToastSeverity, variant: ToastVariant) {
  return toastThemes[variant][severity];
}

type ToastTheme = Record<
  "root" | "icon" | "title" | "desc" | "action" | "close",
  string
>;

const ToastThemeContext = React.createContext<ReturnType<
  typeof toastTheme
> | null>(null);

const toast = ToastPrimitive.createToastManager();

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />;
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-80 outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-80",
        className
      )}
      {...props}
    />
  );
}

function Toast({ className, ...props }: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(
        "group/toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-md will-change-transform outline-none select-none focus-visible:ring-2 focus-visible:ring-[var(--cds-border-system)]",
        "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
        "h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "data-limited:opacity-0 data-starting-style:[transform:translateY(150%)]",
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
        "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        className
      )}
      {...props}
    />
  );
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex h-full items-start overflow-hidden px-4 py-1 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100",
        className
      )}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  const theme = React.useContext(ToastThemeContext);
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-base leading-6 font-medium", theme?.title, className)}
      {...props}
    />
  );
}

function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  const theme = React.useContext(ToastThemeContext);
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-sm leading-5 font-medium", theme?.desc, className)}
      {...props}
    />
  );
}

function ToastAction({
  className,
  render = <Button variant="ghost" color="secondary" size="sm" />,
  ...props
}: ToastPrimitive.Action.Props) {
  const theme = React.useContext(ToastThemeContext);
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cn("shrink-0", theme?.action, className)}
      {...props}
    />
  );
}

function ToastClose({
  className,
  children,
  render = <Button variant="ghost" color="secondary" size="icon" />,
  ...props
}: ToastPrimitive.Close.Props) {
  const theme = React.useContext(ToastThemeContext);
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={cn("relative shrink-0", theme?.close, className)}
      {...props}
    >
      {children ?? <ToastCloseIcon />}
    </ToastPrimitive.Close>
  );
}

/** Figma icon per severity: Outline set for filled / outlined, Rounded set for standard. */
function ToastIcon({
  severity,
  variant,
}: {
  severity: ToastSeverity;
  variant: ToastVariant;
}) {
  const rounded = variant === "standard";
  const Icon = {
    error: rounded ? ToastErrorRoundedIcon : ToastErrorOutlineIcon,
    warning: rounded ? ToastWarningRoundedIcon : ToastReportProblemOutlinedIcon,
    info: rounded ? ToastInfoRoundedIcon : ToastInfoOutlineIcon,
    success: rounded
      ? ToastCheckCircleRoundedIcon
      : ToastCheckCircleOutlineIcon,
    notification: rounded ? ToastInfoRoundedIcon : ToastInfoOutlineIcon,
  }[severity];
  const theme = React.useContext(ToastThemeContext);
  return (
    <span
      data-slot="toast-icon"
      className={cn("flex shrink-0 py-2 pr-3", theme?.icon)}
    >
      <Icon />
    </span>
  );
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((toastItem) => {
    const severity = toSeverity(toastItem.type);
    const variant = toVariant(toastItem.data);
    const theme = toastTheme(severity, variant);
    return (
      <ToastThemeContext.Provider key={toastItem.id} value={theme}>
        <Toast
          toast={toastItem}
          data-severity={severity}
          data-variant={variant}
          className={theme.root}
        >
          <ToastContent>
            <ToastIcon severity={severity} variant={variant} />
            <div className="flex min-w-0 flex-1 flex-col gap-1 py-2">
              <ToastTitle />
              <ToastDescription />
            </div>
            {toastItem.actionProps ? (
              <div className="shrink-0 pt-1 pl-4">
                <ToastAction />
              </div>
            ) : null}
            <div className="shrink-0 pt-1 pl-4">
              <ToastClose />
            </div>
          </ToastContent>
        </Toast>
      </ToastThemeContext.Provider>
    );
  });
}

/**
 * Static toast surface for documentation and previews: the same layout and classes as a live
 * toast, without the toast manager (no stacking, swipe or timers).
 */
function ToastCard({
  severity = "notification",
  variant = "standard",
  title,
  description,
  actionLabel,
  showClose = true,
  className,
}: {
  severity?: ToastSeverity;
  variant?: ToastVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actionLabel?: React.ReactNode;
  showClose?: boolean;
  className?: string;
}) {
  const theme = toastTheme(severity, variant);
  return (
    <ToastThemeContext.Provider value={theme}>
      <div
        data-slot="toast-card"
        data-severity={severity}
        data-variant={variant}
        role="status"
        className={cn(
          "flex w-80 items-start rounded-md px-4 py-1",
          theme.root,
          className
        )}
      >
        <ToastIcon severity={severity} variant={variant} />
        <div className="flex min-w-0 flex-1 flex-col gap-1 py-2">
          {title ? (
            <p
              data-slot="toast-title"
              className={cn("text-base leading-6 font-medium", theme.title)}
            >
              {title}
            </p>
          ) : null}
          {description ? (
            <p
              data-slot="toast-description"
              className={cn("text-sm leading-5 font-medium", theme.desc)}
            >
              {description}
            </p>
          ) : null}
        </div>
        {actionLabel ? (
          <div className="shrink-0 pt-1 pl-4">
            <Button
              variant="ghost"
              color="secondary"
              size="sm"
              data-slot="toast-action"
              className={theme.action}
            >
              {actionLabel}
            </Button>
          </div>
        ) : null}
        {showClose ? (
          <div className="shrink-0 pt-1 pl-4">
            <Button
              variant="ghost"
              color="secondary"
              size="icon"
              aria-label="Close toast"
              data-slot="toast-close"
              className={theme.close}
            >
              <ToastCloseIcon />
            </Button>
          </div>
        ) : null}
      </div>
    </ToastThemeContext.Provider>
  );
}

function Toaster({
  children,
  toastManager = toast,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

export {
  createToastManager,
  Toast,
  toast,
  ToastAction,
  ToastCard,
  ToastClose,
  ToastContent,
  ToastDescription,
  Toaster,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToastManager,
};
