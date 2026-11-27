import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "cn";
import * as React from "react";

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg" | "xs";
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full font-sans text-xs leading-4 font-medium select-none data-[size=lg]:size-10 data-[size=sm]:size-6 data-[size=xs]:size-5",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center overflow-hidden rounded-full bg-[var(--cds-on-surface-sunken)] text-xs leading-4 font-medium whitespace-nowrap text-[var(--cds-content-primary)] group-data-[size=lg]/avatar:text-sm group-data-[size=lg]/avatar:leading-5 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-[var(--cds-content-secondary)] group-data-[size=lg]/avatar:[&>svg]:size-6 group-data-[size=sm]/avatar:[&>svg]:size-4 group-data-[size=xs]/avatar:[&>svg]:size-3",
        className,
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute -right-0.5 -bottom-0.5 z-10 inline-flex size-3 items-center justify-center rounded-full border-2 border-[var(--cds-on-surface-default)] bg-[var(--cds-status-success-on-surface-default)] text-[var(--cds-status-success-content-on-fill)] select-none [&>svg]:size-2",
        "group-data-[size=sm]/avatar:right-0 group-data-[size=sm]/avatar:bottom-0 group-data-[size=sm]/avatar:translate-x-1/2 group-data-[size=sm]/avatar:translate-y-1/2",
        "group-data-[size=xs]/avatar:right-0 group-data-[size=xs]/avatar:bottom-0 group-data-[size=xs]/avatar:translate-x-1/2 group-data-[size=xs]/avatar:translate-y-1/2",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex items-center [&>[data-slot=avatar]+[data-slot=avatar]]:-ml-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-[var(--cds-on-surface-default)]",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative -ml-2 flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--cds-on-surface-action-selected)] text-xs leading-4 font-medium text-[var(--cds-content-secondary)] ring-2 ring-[var(--cds-on-surface-default)] group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=lg]/avatar-group:text-sm group-has-data-[size=lg]/avatar-group:leading-5 group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=xs]/avatar-group:size-5 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 group-has-data-[size=xs]/avatar-group:[&>svg]:size-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Avatar, AvatarBadge, AvatarFallback,
  AvatarGroup,
  AvatarGroupCount, AvatarImage
};
