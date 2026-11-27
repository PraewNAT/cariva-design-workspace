import { cn } from "cn";
import { DataUsageRounded } from "@/lib/app/components/app/icons";

/**
 * Loading indicator. The glyph is the Figma `data-usage` icon (used by `button-loading`), so a
 * Spinner inside a Button matches the design; default size 16px, Buttons size it to 24 / 16.
 */
function Spinner({
  className,
  ...props
}: Omit<React.ComponentProps<"svg">, "strokeWidth">) {
  return (
    <DataUsageRounded
      aria-hidden={false}
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
