"use client";
import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { cn } from 'cn';
import { useId, type ReactNode } from 'react';

type RadioGroupProps = RadioGroupPrimitive.Props & { error?: boolean; label?: ReactNode; description?: ReactNode };
function RadioGroup({ className, error, label, description, children, disabled, ...props }: RadioGroupProps) {
  const id = useId();
  return <RadioGroupPrimitive data-slot="radio-group" data-error={error || undefined} aria-invalid={error || undefined} disabled={disabled} aria-disabled={disabled || undefined} aria-labelledby={label ? `${id}-label` : undefined} aria-describedby={description ? `${id}-description` : undefined} className={cn('group/radio grid w-full gap-3 font-sans', className)} {...props}>
    {(label || description) && <div className="grid gap-2">
      {label && <span id={`${id}-label`} className={cn('text-sm leading-5 font-medium text-[var(--cds-content-primary)]', error && 'text-[var(--cds-status-error-content-default)]', disabled && 'text-[var(--cds-content-disabled)]')}>{label}</span>}
      {description && <p id={`${id}-description`} className={cn('text-sm leading-5 text-[var(--cds-content-secondary)]', disabled && 'text-[var(--cds-content-disabled)]')}>{description}</p>}
    </div>}
    {children}
  </RadioGroupPrimitive>;
}
type RadioGroupItemProps = RadioPrimitive.Root.Props & { error?: boolean };
function RadioGroupItem({ className, error, ...props }: RadioGroupItemProps) {
  return <RadioPrimitive.Root data-slot="radio-group-item" aria-invalid={error || undefined} data-error={error || undefined} className={cn(
    'group/radio-item peer relative inline-flex size-4 shrink-0 items-center justify-center rounded-full border-0 bg-[var(--cds-on-surface-default)] ring-1 ring-inset ring-[var(--cds-border-default)] outline-none',
    'data-checked:ring-[var(--cds-brand-primary-on-surface-default)] focus-visible:ring-2 focus-visible:ring-[var(--cds-border-system)]',
    'aria-invalid:ring-[var(--cds-border-error)] data-[error]:ring-[var(--cds-border-error)] group-data-[error]/radio:ring-[var(--cds-border-error)]',
    'data-disabled:bg-[var(--cds-on-surface-action-disabled)]! data-disabled:ring-[var(--cds-border-disabled)]! data-disabled:cursor-not-allowed',
    className,
  )} {...props}>
    <RadioPrimitive.Indicator data-slot="radio-group-indicator" className="flex items-center justify-center">
      <span className="size-[10px] rounded-full bg-[var(--cds-brand-primary-on-surface-default)] group-aria-invalid/radio-item:bg-[var(--cds-status-error-content-default)] group-data-[error]/radio:bg-[var(--cds-status-error-content-default)] group-data-disabled/radio-item:bg-[var(--cds-content-disabled)]!" />
    </RadioPrimitive.Indicator>
  </RadioPrimitive.Root>;
}
type RadioFieldProps = Omit<RadioGroupItemProps, 'children'> & { label: ReactNode; description?: ReactNode; labelPlacement?: 'start' | 'end'; variant?: 'default' | 'outlined' | 'groupItem' };
function RadioField({ label, description, labelPlacement = 'end', variant = 'default', error, disabled, id, className, ...props }: RadioFieldProps) {
  const uid=useId();const cid=id??uid;
  return <label htmlFor={cid} data-slot="radio-field" data-variant={variant} aria-disabled={disabled || undefined} className={cn('flex min-w-0 items-start gap-3 font-sans', labelPlacement==='start'&&'flex-row-reverse',variant==='outlined'&&'rounded-[6px] p-4 ring-1 ring-inset ring-[var(--cds-border-default)]',disabled&&'text-[var(--cds-content-disabled)]',className)}>
    <span className="flex h-5 shrink-0 items-center"><RadioGroupItem {...props} id={cid} error={error} disabled={disabled} aria-labelledby={props["aria-label"] ? undefined : props["aria-labelledby"] ?? `${cid}-label`} aria-describedby={description&&variant!=='groupItem'?`${cid}-description`:undefined} /></span>
    <span className="grid min-w-0 flex-1 gap-2"><span id={`${cid}-label`} className={cn('text-sm leading-5 font-medium text-[var(--cds-content-primary)]', 'group-data-[error]/radio:text-[var(--cds-status-error-content-default)] group-data-disabled/radio:text-[var(--cds-content-disabled)]!',error&&'text-[var(--cds-status-error-content-default)]',disabled&&'text-[var(--cds-content-disabled)]')}>{label}</span>{description&&variant!=='groupItem'&&<span id={`${cid}-description`} className={cn('text-sm leading-5 text-[var(--cds-content-secondary)] group-data-disabled/radio:text-[var(--cds-content-disabled)]',disabled&&'text-[var(--cds-content-disabled)]')}>{description}</span>}</span>
  </label>;
}
export { RadioGroup, RadioGroupItem, RadioField };
export type { RadioGroupProps, RadioGroupItemProps, RadioFieldProps };
