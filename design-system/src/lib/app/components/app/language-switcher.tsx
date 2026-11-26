import { LanguageRounded } from "@/lib/app/components/app/icons";
import { cn } from "cn";
import * as React from "react";
import {
  SegmentedControl,
  ToggleGroupItem,
} from "@/lib/app/components/ui/toggle-group";

/**
 * Figma `language-switcher`: a segmented control with a globe icon and the languages TH / EN.
 * Always has one language selected.
 */
type Language = "TH" | "EN";

function LanguageSwitcher({
  value,
  defaultValue = "TH",
  onValueChange,
  disabled,
  className,
}: {
  value?: Language;
  defaultValue?: Language;
  onValueChange?: (value: Language) => void;
  disabled?: boolean;
  className?: string;
}) {
  const [inner, setInner] = React.useState<Language>(defaultValue);
  const current = value ?? inner;
  return (
    <SegmentedControl
      aria-label="Language"
      value={[current]}
      disabled={disabled}
      onValueChange={(next) => {
        const lang = next[0] as Language | undefined;
        if (!lang) return; // keep one selected
        setInner(lang);
        onValueChange?.(lang);
      }}
      className={cn("h-10", className)}
    >
      <LanguageRounded className="text-[var(--cds-content-secondary)]" />
      <ToggleGroupItem value="TH" disabled={disabled}>
        TH
      </ToggleGroupItem>
      <ToggleGroupItem value="EN" disabled={disabled}>
        EN
      </ToggleGroupItem>
    </SegmentedControl>
  );
}

export { LanguageSwitcher };
