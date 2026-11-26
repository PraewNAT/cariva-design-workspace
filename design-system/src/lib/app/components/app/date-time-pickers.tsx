import { useEffect, useId, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { format, startOfDay } from "date-fns";
import type { DateRange, Matcher } from "react-day-picker";
import { cn } from "cn";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { inputVariants } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import calendarIcon from "./assets/date-time/calendar.svg";
import birthIcon from "./assets/date-time/calendar-birth.svg";
import clockIcon from "./assets/date-time/clock.svg";

type PickerFieldProps = {
  id?: string;
  label?: string;
  ariaLabel?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};
function PickerField({ label, description, error, disabled, className, id, children }: PickerFieldProps & { children: ReactNode }) {
  return <Field data-disabled={disabled || undefined} data-invalid={!!error || undefined} className={cn("w-[320px] max-w-full font-[family-name:var(--font-ui)]", className)}>
    {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
    {children}
    {error ? <FieldError id={`${id}-description`}>{error}</FieldError> : description ? <FieldDescription id={`${id}-description`}>{description}</FieldDescription> : null}
  </Field>;
}
/** A button using the shared Input recipe, for a read-only picker trigger. */
function PickerTrigger({ className, ...props }: ComponentProps<typeof Button>) {
  return <Button variant="ghost" color="secondary" data-picker-trigger="true" className={cn(inputVariants(), "w-full justify-start gap-2 font-normal disabled:bg-[var(--cds-on-surface-action-disabled)] disabled:ring-[var(--cds-border-disabled)] aria-expanded:bg-[var(--cds-on-surface-default)] aria-expanded:text-[var(--cds-content-primary)] aria-expanded:ring-2 aria-expanded:ring-[var(--cds-border-system)]", className)} {...props} />;
}
function displayDate(date: Date | undefined) { return date ? format(date, "dd/MM/yyyy") : ""; }
function currentTime() { return new Date(); }

type DatePickerProps = PickerFieldProps & {
  placeholder?: string;
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Matcher | Matcher[];
} & ({ mode?: "single" | "birth"; value?: Date; defaultValue?: Date; onValueChange?: (value: Date | undefined) => void } |
     { mode: "range"; value?: DateRange; defaultValue?: DateRange; onValueChange?: (value: DateRange | undefined) => void });
function DatePicker(props: DatePickerProps) {
  const generatedId = useId(), id = props.id ?? generatedId;
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<Date | DateRange | undefined>(props.defaultValue);
  const value = "value" in props ? props.value : internal;
  const birth = props.mode === "birth", range = props.mode === "range";
  const singleValue = value instanceof Date ? value : undefined;
  const rangeValue = value && !(value instanceof Date) ? value : undefined;
  const text = range ? `${displayDate(rangeValue?.from)}${rangeValue?.from ? " - " : ""}${displayDate(rangeValue?.to)}` : displayDate(singleValue);
  const maxDate = birth ? (props.maxDate && props.maxDate < new Date() ? props.maxDate : startOfDay(new Date())) : props.maxDate;
  const disabled: Matcher[] = [...(Array.isArray(props.disabledDates) ? props.disabledDates : props.disabledDates ? [props.disabledDates] : []), ...(props.minDate ? [{before: props.minDate}] : []), ...(maxDate ? [{after: maxDate}] : [])];
  const shared = { defaultMonth: props.defaultMonth ?? singleValue ?? rangeValue?.from, disabled, startMonth: props.minDate, endMonth: maxDate, labels: { labelDayButton: (date: Date) => format(date,"dd/MM/yyyy") } };
  return <PickerField {...props} id={id}><Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger render={<PickerTrigger id={id} disabled={props.disabled} aria-label={props.ariaLabel ?? props.label ?? "เลือกวันที่"} aria-invalid={!!props.error || undefined} aria-describedby={props.description || props.error ? `${id}-description` : undefined} />}>
      {!birth && <img src={calendarIcon} alt="" width={20} height={20} />}
      <span className={cn("min-w-0 flex-1 text-left", props.disabled ? "text-[var(--cds-content-disabled)]" : !text && "text-[var(--cds-content-placeholder)]")}>{text || props.placeholder || "Pick a date"}</span>
      {birth && <img src={birthIcon} alt="" width={20} height={20} />}
    </PopoverTrigger>
    <PopoverContent aria-label={range ? "เลือกช่วงวันที่" : birth ? "เลือกวันเกิด" : "เลือกวันที่"} align="start" sideOffset={8} className="w-[320px] max-w-[calc(100vw-24px)] gap-0 p-0 shadow-none ring-1 ring-[var(--cds-border-default)]">
      {props.mode === "range" ? <Calendar {...shared} autoFocus mode="range" selected={rangeValue} onSelect={next => {
        if (!("value" in props)) setInternal(next); props.onValueChange?.(next);
        if (next?.to && rangeValue?.from) setOpen(false);
      }} /> : <Calendar {...shared} autoFocus mode="single" selected={singleValue} onSelect={next => {
        if (!("value" in props)) setInternal(next); props.onValueChange?.(next); setOpen(false);
      }} />}
    </PopoverContent>
  </Popover></PickerField>;
}

function parseTime(value: string | null | undefined) {
  if (!value || !/^(?:[01]\d|2[0-3]):(?:00|15|30|45)$/.test(value)) return null;
  const [hour, minute] = value.split(":").map(Number); return {hour, minute};
}
function timeString(hour: number, minute: number) { return `${String(hour).padStart(2,"0")}:${String(minute).padStart(2,"0")}`; }
/** Actual device clock, rounded down to the agreed quarter hour. */
function roundedTime(date: Date) { return {hour: date.getHours(), minute: Math.floor(date.getMinutes()/15)*15}; }

type TimePickerProps = PickerFieldProps & {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  disabledHours?: number[];
  disabledMinutes?: number[];
  getNow?: () => Date;
};
function TimeColumn({ label, values, selected, onSelect, disabled }: { label: string; values: number[]; selected: number | null; onSelect: (value: number) => void; disabled: number[] }) {
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => { list.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({block:"nearest"}); }, [selected]);
  const active = selected !== null && !disabled.includes(selected) ? selected : values.find(v=>!disabled.includes(v));
  return <div className="flex min-w-0 flex-1 flex-col gap-2 p-2">
    <div className="text-center text-sm leading-5 text-[var(--cds-content-primary)]">{label}</div>
    <div ref={list} role="listbox" aria-label={label} className="flex max-h-48 flex-col gap-2 overflow-y-auto overscroll-contain" onKeyDown={event => {
      if (!["ArrowDown","ArrowUp","Home","End"].includes(event.key)) return;
      event.preventDefault();
      const options = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')];
      const at = options.indexOf(event.target as HTMLButtonElement);
      const next = event.key === "Home" ? 0 : event.key === "End" ? options.length-1 : Math.max(0,Math.min(options.length-1,at+(event.key === "ArrowDown" ? 1 : -1)));
      options[next]?.focus(); options[next]?.click();
    }}>
      {values.map(value=><Button key={value} role="option" aria-selected={selected===value} tabIndex={active===value?0:-1} disabled={disabled.includes(value)} size="sm" variant={selected===value?"default":"ghost"} color={selected===value?"primary":"secondary"} className="w-full shrink-0" onClick={()=>onSelect(value)}>{String(value).padStart(2,"0")}</Button>)}
    </div>
  </div>;
}
function TimePicker(props: TimePickerProps) {
  const generatedId=useId(),id=props.id??generatedId;
  const [internal,setInternal]=useState<string|null>(props.defaultValue??null);
  const value="value" in props?props.value:internal;
  const [open,setOpen]=useState(false),[draft,setDraft]=useState<{hour:number|null;minute:number|null}>({hour:null,minute:null});
  const getNow=props.getNow??currentTime;
  const allowed=(hour:number,minute:number)=>!props.disabledHours?.includes(hour)&&!props.disabledMinutes?.includes(minute);
  const now=roundedTime(getNow());
  const invalid=!!props.error||!!value&&!parseTime(value);
  const ready=draft.hour!==null&&draft.minute!==null&&allowed(draft.hour,draft.minute);
  function commit(next:string|null) { if(!("value" in props))setInternal(next);props.onValueChange?.(next);setOpen(false); }
  return <PickerField {...props} id={id}><Popover open={open} onOpenChange={next=>{if(next){const parsed=parseTime(value);setDraft(parsed??{hour:null,minute:null});}setOpen(next);}}>
    <PopoverTrigger render={<PickerTrigger id={id} disabled={props.disabled} aria-label={props.ariaLabel??props.label??"เลือกเวลา"} aria-invalid={invalid||undefined} aria-describedby={props.description||props.error?`${id}-description`:undefined} />}>
      <span className={cn("min-w-0 flex-1 text-left",props.disabled?"text-[var(--cds-content-disabled)]":!value&&"text-[var(--cds-content-placeholder)]")}>{value||props.placeholder||"Select time"}</span><img src={clockIcon} alt="" width={20} height={20} />
    </PopoverTrigger>
    <PopoverContent aria-label="เลือกเวลา" align="start" sideOffset={8} className="w-48 max-w-[calc(100vw-24px)] gap-0 overflow-hidden p-0 font-[family-name:var(--font-ui)] shadow-none ring-1 ring-[var(--cds-border-default)]">
      <div className="flex divide-x divide-border">
        <TimeColumn label="Hour" values={Array.from({length:24},(_,i)=>i)} selected={draft.hour} disabled={props.disabledHours??[]} onSelect={hour=>setDraft(d=>({...d,hour}))} />
        <TimeColumn label="Minute" values={[0,15,30,45]} selected={draft.minute} disabled={props.disabledMinutes??[]} onSelect={minute=>setDraft(d=>({...d,minute}))} />
      </div>
      <div className="flex items-start justify-between gap-2 border-t border-border p-3">
        <Button size="sm" variant="ghost" color="secondary" disabled={!allowed(now.hour,now.minute)} onClick={()=>{const next=roundedTime(getNow());if(allowed(next.hour,next.minute))setDraft(next);}}>Now</Button>
        <Button size="sm" variant="ghost" color="secondary" onClick={()=>commit(null)}>Clear</Button>
        <Button size="sm" disabled={!ready} onClick={()=>{if(ready)commit(timeString(draft.hour!,draft.minute!));}}>OK</Button>
      </div>
    </PopoverContent>
  </Popover></PickerField>;
}
export { DatePicker, TimePicker };
export type { DatePickerProps, TimePickerProps };
