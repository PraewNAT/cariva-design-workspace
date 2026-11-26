import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "cn";

/**
 * Figma `scrollbar` (docs/components/SCROLLBAR-FIGMA.md): a 15px track with 4px padding and a 7px
 * rounded thumb. `orientation` vertical | horizontal (Figma names for the two shapes were
 * Horizontal / Vertical swapped; fixed 2026-11-26), `track` shows the track fill. `end` in Figma is
 * only the thumb position (scrolled to the end), not a prop.
 */
function ScrollArea({
  className,
  children,
  orientation = "vertical",
  track = false,
  ...props
}: ScrollAreaPrimitive.Root.Props & {
  /** Which scrollbars to render. */
  orientation?: "vertical" | "horizontal" | "both";
  /** Fill the scrollbar track (Figma `track`). */
  track?: boolean;
}) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {orientation !== "horizontal" && <ScrollBar track={track} />}
      {orientation !== "vertical" && (
        <ScrollBar orientation="horizontal" track={track} />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  track = false,
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props & { track?: boolean }) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none p-1 transition-colors select-none data-horizontal:h-[15px] data-horizontal:flex-col data-vertical:h-full data-vertical:w-[15px]",
        track && "bg-[var(--cds-on-surface-sunken)]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-[var(--cds-content-placeholder)]"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
