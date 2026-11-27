"use client";

import { cn } from "cn";
import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker";

import nextIcon from "./assets/calendar/next.svg";
import previousIcon from "./assets/calendar/previous.svg";
import { Button, buttonVariants } from "@/lib/app/components/ui/button";
import {
  ArrowDownIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-background p-3 font-[family-name:var(--font-ui)] text-sm leading-5 [--cell-radius:9999px] [--cell-size:32px] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-[320px] max-w-full", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-2", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant, color: "secondary" }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-100 aria-disabled:text-[var(--cds-content-disabled)]",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant, color: "secondary" }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-100 aria-disabled:text-[var(--cds-content-disabled)]",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-2 text-sm font-normal",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-(--cell-radius)",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-normal select-none",
          captionLayout === "label"
            ? "text-sm"
            : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex h-5 flex-1 items-center justify-center text-sm leading-5 font-normal text-[var(--cds-content-secondary)] select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-xs leading-4 text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative flex h-10 min-w-0 flex-1 items-center justify-center p-0 text-center select-none",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
            : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
          defaultClassNames.day
        ),
        range_start: cn(
          "relative isolate before:absolute before:inset-y-1 before:right-0 before:w-1/2 before:bg-[var(--cds-brand-primary-on-surface-subtle)]",
          defaultClassNames.range_start
        ),
        range_middle: cn("before:absolute before:inset-x-0 before:inset-y-1 before:bg-[var(--cds-brand-primary-on-surface-subtle)] first:before:rounded-l-full last:before:rounded-r-full", defaultClassNames.range_middle),
        range_end: cn(
          "relative isolate before:absolute before:inset-y-1 before:left-0 before:w-1/2 before:bg-[var(--cds-brand-primary-on-surface-subtle)]",
          defaultClassNames.range_end
        ),
        today: cn(
          "font-semibold",
          defaultClassNames.today
        ),
        outside: cn(
          "text-[var(--cds-content-disabled)]",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-[var(--cds-content-disabled)] opacity-100",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left" || orientation === "right") {
            return <span aria-hidden="true" className="inline-flex scale-[0.6666667]"><img alt="" src={orientation === "left" ? previousIcon : nextIcon} /></span>;
          }

          return (
            <HugeiconsIcon
              icon={ArrowDownIcon}
              strokeWidth={2}
              className={cn("size-4", className)}
              {...props}
            />
          );
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full p-0 text-xs leading-4 font-medium text-inherit group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-[var(--cds-border-system)] data-[range-end=true]:bg-[var(--cds-brand-primary-on-surface-default)] data-[range-end=true]:text-[var(--cds-brand-primary-content-on-fill)] data-[range-start=true]:bg-[var(--cds-brand-primary-on-surface-default)] data-[range-start=true]:text-[var(--cds-brand-primary-content-on-fill)] data-[selected-single=true]:bg-[var(--cds-brand-primary-on-surface-default)] data-[selected-single=true]:text-[var(--cds-brand-primary-content-on-fill)] disabled:text-[var(--cds-content-disabled)] disabled:opacity-100",

        defaultClassNames.day_button,
        className
      )}
      {...props}
      color="secondary"
    />
  );
}

export { Calendar, CalendarDayButton };
