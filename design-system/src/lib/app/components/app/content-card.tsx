import { Badge } from "@/lib/app/components/ui/badge";
import { WarningRounded } from "@/lib/app/components/app/icons";
import { Card } from "@/lib/app/components/ui/card";
import { cn } from "cn";
import * as React from "react";

/**
 * Figma `card-vertical`, `card-horizontal`, `card-small-horizontal`
 * (docs/components/CARD-FIGMA.md). Compositions of Card + Badge (tag) + Button sm.
 * `image`, `tag` and `actions` are caller-provided slots; profile and metric remain presentational.
 */
type ContentCardProps = Omit<React.ComponentProps<"div">, "title"> & {
  image?: React.ReactNode;
  tag?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
};

const titleCls =
  "text-xl leading-7 font-semibold text-[var(--cds-content-primary)]";
const descCls = "text-sm leading-5 text-[var(--cds-content-secondary)]";

function Tag({ children }: { children: React.ReactNode }) {
  return children ? (
    <Badge variant="standard" color="success" className="w-fit px-2">
      {children}
    </Badge>
  ) : null;
}

/** Figma `card-vertical`: one or two actions share a row with a 16px gap. */
function CardVertical({ image, tag, title, description, actions, className, ...props }: ContentCardProps) {
  return <Card data-slot="card-vertical" className={cn("w-[330px] max-w-full p-4 font-[family-name:var(--font-ui)]", className)} {...props}>
    {image != null && <div data-slot="card-image" className="aspect-[3/2] w-full overflow-hidden [&>img]:size-full [&>img]:object-cover">{image}</div>}
    <div className="flex min-w-0 flex-col gap-2">
      <Tag>{tag}</Tag>
      <div className="min-w-0 break-words"><div className={titleCls}>{title}</div>{description != null && <div className={descCls}>{description}</div>}</div>
    </div>
    {actions != null && <div data-slot="card-actions" className="flex gap-4 [&>*]:min-w-0 [&>*]:flex-1">{actions}</div>}
  </Card>;
}

/** Figma `card-horizontal`: side image, or an absolute image behind the content. */
function CardHorizontal({ image, imagePosition = "left", tag, topMessage, title, description, actions, className, ...props }:
  ContentCardProps & { imagePosition?: "left" | "right" | "absolute"; topMessage?: React.ReactNode }) {
  const absolute = imagePosition === "absolute";
  const imageBox = image != null ? <div data-slot="card-image" className={cn(
    "shrink-0 overflow-hidden [&>img]:size-full [&>img]:object-cover",
    absolute ? "absolute inset-y-0 right-0 w-[min(43.5714%,183px)]" : "w-[min(42.381%,178px)] self-stretch"
  )}>{image}</div> : null;
  return <Card data-slot="card-horizontal" data-image-position={imagePosition} className={cn(
    "relative isolate min-h-[190px] w-[420px] max-w-full flex-row gap-0 py-0 font-[family-name:var(--font-ui)]", className
  )} {...props}>
    {imagePosition === "left" && imageBox}
    <div className="relative z-10 flex min-w-0 flex-1 flex-col items-start gap-4 p-4">
      {(tag != null || topMessage != null) && <div data-slot="card-top" className={cn("flex w-full min-w-0 flex-col items-start gap-2 break-words", absolute && image != null && "pr-[min(43.5714%,183px)]")}>
        <Tag>{tag}</Tag>
        {topMessage != null && <div data-slot="card-top-message" className="w-full text-xs leading-4 text-[var(--cds-content-secondary)]">{topMessage}</div>}
      </div>}
      <div className={cn("w-full min-w-0 break-words", absolute && image != null && "pr-[min(43.5714%,183px)]")}>
        <div className={titleCls}>{title}</div>
        {description != null && <div className={cn(descCls, "mt-0.5")}>{description}</div>}
      </div>
      {actions != null && <div data-slot="card-actions" className={cn("mt-auto flex gap-4", absolute && "w-full [&>*]:min-w-0 [&>*]:flex-1")}>{actions}</div>}
    </div>
    {imagePosition !== "left" && imageBox}
  </Card>;
}

/** Figma `card-small-horizontal`: 80px image and optional 40px action slot. */
function CardSmallHorizontal({ image, tag, title, description, actions, className, ...props }: ContentCardProps) {
  return <Card data-slot="card-small-horizontal" size="sm" className={cn(
    "min-h-[104px] w-[344px] max-w-full flex-row items-center gap-4 px-4 py-3 font-[family-name:var(--font-ui)]", className
  )} {...props}>
    {image != null && <div data-slot="card-image" className="size-20 shrink-0 overflow-hidden rounded-[8px] [&>img]:size-full [&>img]:object-cover">{image}</div>}
    <div className="flex min-w-0 flex-1 flex-col gap-2 break-words">
      <Tag>{tag}</Tag>
      <div><div className={titleCls}>{title}</div>{description != null && <div className={descCls}>{description}</div>}</div>
    </div>
    {actions != null && <div data-slot="card-actions" className="flex size-10 shrink-0 items-center justify-center rounded-[8px]">{actions}</div>}
  </Card>;
}

/** Figma `card-profile` — `style` subtle / white / outlined. 320 wide, padding 12, radius 12. */
function CardProfile({
  avatar,
  name,
  identifier,
  details,
  style = "subtle",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "style"> & {
  avatar?: React.ReactNode;
  name: React.ReactNode;
  identifier?: React.ReactNode;
  details?: { label: React.ReactNode; value: React.ReactNode }[];
  style?: "subtle" | "white" | "outlined";
}) {
  return (
    <div
      data-slot="card-profile"
      data-style={style}
      className={cn(
        "flex w-[320px] max-w-full flex-col gap-3 rounded-md p-3",
        style === "subtle"
          ? "bg-[var(--cds-bg-subtle)]"
          : "bg-[var(--cds-on-surface-default)]",
        style === "outlined" &&
          "ring-1 ring-inset ring-[var(--cds-border-default)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {avatar}
        <div className="min-w-0 flex-1">
          <div className="truncate text-base leading-6 font-semibold text-[var(--cds-content-primary)]">
            {name}
          </div>
          {identifier ? (
            <div className="truncate text-xs leading-4 text-[var(--cds-content-secondary)]">
              {identifier}
            </div>
          ) : null}
        </div>
      </div>
      {details?.length ? (
        <div className="flex gap-1">
          {details.map((d, i) => (
            <div key={i} className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="text-xs leading-4 font-medium text-[var(--cds-content-secondary)]">
                {d.label}
              </div>
              <div className="text-sm leading-5 font-medium text-[var(--cds-content-primary)]">
                {d.value}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Figma `card-metric` — `status` normal / abnormal (error fill, warning icon, error value). 90×56. */
function CardMetric({
  label,
  unit,
  value,
  status = "normal",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  label: React.ReactNode;
  unit?: React.ReactNode;
  value: React.ReactNode;
  status?: "normal" | "abnormal";
}) {
  const abnormal = status === "abnormal";
  return (
    <div
      data-slot="card-metric"
      data-status={status}
      className={cn(
        "flex h-14 w-[90px] flex-col gap-1 rounded-md p-2",
        abnormal
          ? "bg-[var(--cds-status-error-on-surface-subtle)]"
          : "bg-[var(--cds-bg-subtle)]",
        className
      )}
      {...props}
    >
      <div className="flex justify-between gap-1 text-xs leading-4 font-medium">
        <span className="text-[var(--cds-content-secondary)]">{label}</span>
        {unit ? (
          <span className="text-[var(--cds-content-secondary)]">{unit}</span>
        ) : null}
      </div>
      <div className="flex items-center gap-1 text-sm leading-5 font-medium">
        {abnormal ? (
          <WarningRounded className="text-[var(--cds-status-error-content-default)]" />
        ) : null}
        <span
          className={
            abnormal
              ? "text-[var(--cds-status-error-content-default)]"
              : "text-[var(--cds-content-primary)]"
          }
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export {
  CardHorizontal,
  CardMetric,
  CardProfile,
  CardSmallHorizontal,
  CardVertical,
};
export type { ContentCardProps };
