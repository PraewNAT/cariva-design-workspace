import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import type * as React from "react";
import { ChevronDownRounded } from "@/lib/app/components/app/icons";
import { cn } from "cn";

/**
 * Figma ↔ code (docs/components/ACCORDION-FIGMA.md): one AccordionItem is one
 * card (Figma `accordion-item`); the Accordion is a column of cards 16px apart.
 * The optional `icon` on AccordionTrigger is the 40px tile in front of the title.
 */
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group/accordion-item rounded-md border border-[var(--cds-border-default)] bg-[var(--cds-on-surface-elevated)] p-4",
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  icon,
  ...props
}: AccordionPrimitive.Trigger.Props & { icon?: React.ReactNode }) {
  return (
    <AccordionPrimitive.Header render={<h2 />} className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center gap-4 rounded-md border-0 p-0 text-left text-base leading-6 font-semibold text-[var(--cds-content-primary)] transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-[var(--cds-content-secondary)]",
          className
        )}
        {...props}
      >
        {icon ? (
          <span
            data-slot="accordion-icon"
            className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[var(--cds-on-surface-subtle)] text-[var(--cds-content-secondary)] [&_svg:not([class*='size-'])]:size-5"
          >
            {icon}
          </span>
        ) : null}
        <span className="min-w-0 flex-1">{children}</span>
        <ChevronDownRounded
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 transition-transform group-aria-expanded/accordion-trigger:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm leading-5 text-[var(--cds-content-secondary)] data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          // 16px below the title row; indented 56px (40px tile + 16px gap) when the item has an icon
          "h-(--accordion-panel-height) pt-4 group-has-[[data-slot=accordion-icon]]/accordion-item:pl-14 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
