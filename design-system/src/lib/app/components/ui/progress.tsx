import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { cn } from 'cn';
import type { CSSProperties } from 'react';
import './progress.css';

type ProgressColor = 'primary' | 'error' | 'success' | 'warning';
type ProgressProps = Omit<ProgressPrimitive.Root.Props, 'color' | 'value'> & {
  value?: number | null; variant?: 'determinate' | 'indeterminate' | 'buffer'; color?: ProgressColor;
  /** Amount buffered, in the same range as value. Never rendered below the loaded value. */
  bufferValue?: number;
};
type ProgressStyle = CSSProperties & { '--progress-fill': string; '--progress-track': string; '--progress-buffer': string };
function colorStyle(family: string): ProgressStyle { return { '--progress-fill': `var(--cds-${family}-on-surface-default)`, '--progress-track': `var(--cds-${family}-on-surface-subtle)`, '--progress-buffer': `var(--cds-${family}-on-surface-muted)` }; }
const progressColors: Record<ProgressColor, ProgressStyle> = { primary: colorStyle('brand-primary'), error: colorStyle('status-error'), success: colorStyle('status-success'), warning: colorStyle('status-warning') };
function bounded(value: number | undefined | null, min: number, max: number) {
  return Number.isFinite(value) ? Math.max(min, Math.min(max, value!)) : min;
}
function Progress({ className, children, value, variant = value == null ? 'indeterminate' : 'determinate', color = 'primary', bufferValue, min = 0, max = 100, style, ...props }: ProgressProps) {
  const upper = max > min ? max : min + 100;
  const loaded = bounded(value, min, upper);
  const buffered = Math.max(loaded, bounded(bufferValue, min, upper));
  return <ProgressPrimitive.Root {...props} min={min} max={upper} value={variant === 'indeterminate' ? null : loaded} data-slot="progress" data-variant={variant} data-color={color} className={cn('cds-progress flex w-full flex-wrap gap-3', className)} style={{ ...progressColors[color], ...style }}>
    {children}
    <ProgressTrack>
      {variant === 'buffer' && <span aria-hidden data-slot="progress-buffer" className="absolute inset-y-0 left-0 bg-[var(--progress-buffer)]" style={{ width: `${(buffered - min) / (upper - min) * 100}%` }} />}
      <ProgressIndicator />
    </ProgressTrack>
  </ProgressPrimitive.Root>;
}
function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return <ProgressPrimitive.Track data-slot="progress-track" className={cn('relative flex h-1 w-full items-center overflow-hidden rounded-full bg-[var(--progress-track,var(--cds-brand-primary-on-surface-subtle))]', className)} {...props} />;
}
function ProgressIndicator({ className, ...props }: ProgressPrimitive.Indicator.Props) {
  return <ProgressPrimitive.Indicator data-slot="progress-indicator" className={cn('relative h-full bg-[var(--progress-fill,var(--cds-brand-primary-on-surface-default))] transition-[width] duration-200 ease-out motion-reduce:transition-none', className)} {...props} />;
}
function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return <ProgressPrimitive.Label className={cn('text-sm leading-5 font-medium', className)} data-slot="progress-label" {...props} />;
}
function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return <ProgressPrimitive.Value className={cn('ml-auto text-sm leading-5 text-muted-foreground tabular-nums', className)} data-slot="progress-value" {...props} />;
}
type CircularProgressProps = Omit<ProgressProps, 'variant' | 'bufferValue'> & { variant?: 'determinate' | 'indeterminate'; size?: 'sm' | 'default' | 'lg' };
function CircularProgress({ value, variant = value == null ? 'indeterminate' : 'determinate', color = 'primary', size = 'default', min = 0, max = 100, className, style, children, ...props }: CircularProgressProps) {
  const upper = max > min ? max : min + 100;
  const loaded = bounded(value, min, upper);
  const percent = variant === 'indeterminate' ? 25 : (loaded - min) / (upper - min) * 100;
  return <ProgressPrimitive.Root {...props} min={min} max={upper} value={variant === 'indeterminate' ? null : loaded} data-slot="circular-progress" data-variant={variant} data-size={size} data-color={color} className={cn('inline-flex shrink-0 items-center gap-3', className)} style={{ ...progressColors[color], ...style }}>
    <svg aria-hidden viewBox="0 0 100 100" className={cn('shrink-0', { sm: 'size-6', default: 'size-10', lg: 'size-14' }[size], variant === 'indeterminate' && 'motion-safe:animate-spin')}>
      <circle cx="50" cy="50" r="43.75" fill="none" stroke="var(--progress-track)" strokeWidth="12.5" />
      <circle data-slot="circular-progress-fill" cx="50" cy="50" r="43.75" pathLength="100" fill="none" stroke="var(--progress-fill)" strokeWidth="12.5" strokeDasharray={`${percent} 100`} transform="rotate(-90 50 50)" className="transition-[stroke-dasharray] duration-200 ease-out motion-reduce:transition-none" />
    </svg>{children}
  </ProgressPrimitive.Root>;
}
export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue, CircularProgress };
export type { ProgressProps, ProgressColor, CircularProgressProps };
