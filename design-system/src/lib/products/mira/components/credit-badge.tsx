import type { CSSProperties } from 'react';
import { cn } from 'cn';
import { Progress } from '../../../app/components/ui/progress';
import { Skeleton } from '../../../app/components/ui/skeleton';
import coin from './assets/credit/coin.png';
export type CreditBadgeProps = {
  variant?: 'compact' | 'remaining' | 'used';
  size?: 'sm' | 'default';
  /** Supplied by the Product; this component does not decide a low-credit threshold. */
  status?: 'default' | 'low' | 'depleted' | 'loading';
  value?: number; progress?: number;
  progressVisible?: boolean; valueVisible?: boolean; showIcon?: boolean;
  emptyDisplay?: 'text' | 'value'; label?: string; className?: string;
};
function percent(value: number) { return Number.isFinite(value) ? Math.max(0, Math.min(100,value)) : 0; }
/** Presentational credit indicator composed from shared Progress/Skeleton. No billing logic. */
export function CreditBadge({variant='compact',size='default',status='default',value=0,progress=0,progressVisible=true,valueVisible=true,showIcon=variant!=='used',emptyDisplay='text',label,className}:CreditBadgeProps) {
  const compact=variant==='compact';const small=compact&&size==='sm';const loading=status==='loading';
  const depleted=status==='depleted';const low=status==='low';
  const amount=new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(Number.isFinite(value)?Math.max(0,value):0);
  const fill=percent(progress);const used=variant==='used';
  const caption=label??(used?'เครดิตที่ใช้ไป':'คงเหลือ');
  const display=used?`${fill}%`:depleted&&!compact&&emptyDisplay==='text'?'เครดิตหมด':amount;
  const color=depleted?'error':low?'warning':'primary';
  const track=loading?'var(--cds-neutral-on-surface-default)':`var(--cds-${color==='primary'?'brand-primary':`status-${color}`}-on-surface-${depleted?'muted':'subtle'})`;
  const summary=loading?'กำลังโหลดเครดิต':`${caption} ${compact?amount:display}`;
  const icon=showIcon&&<img src={coin} alt="" className="size-4 shrink-0"/>;
  const metric=valueVisible&&(loading?<Skeleton aria-hidden className="h-2 w-11 shrink-0 rounded-full bg-[var(--cds-neutral-on-surface-default)] motion-reduce:animate-none"/>:<span data-slot="credit-value" className={cn('min-w-0 break-all tabular-nums',compact&&'min-w-11',low&&'text-[var(--cds-status-warning-content-strong)]',depleted&&'text-[var(--cds-status-error-content-default)]')}>{display}</span>);
  return <span role="group" aria-label={summary} aria-busy={loading||undefined} data-slot="credit-badge" data-variant={variant} data-size={small?'sm':'default'} data-status={status}
    className={cn('inline-flex w-max max-w-full flex-wrap items-center rounded-full bg-[var(--cds-bg-white)] font-sans text-xs leading-4 text-[var(--cds-content-secondary)] ring-1 ring-inset ring-[var(--cds-neutral-border-default)]',compact?'gap-3 py-2 pr-3 pl-2':'gap-2 px-3 py-2',small&&'gap-2 py-1 pr-2 pl-1',depleted&&!used&&'ring-[var(--cds-status-error-border-default)]',compact&&'hover:bg-[var(--cds-on-surface-action-hover)]',className)}>
    <span className={cn('inline-flex min-w-0 items-center gap-1',compact&&'min-w-16')}>
      {!compact&&!(depleted&&!used&&emptyDisplay==='text')&&<span data-slot="credit-label" className="min-w-0 break-words">{caption}</span>}
      {!used&&icon}
      {!used&&metric}
    </span>
    {progressVisible&&<Progress value={loading?null:fill} variant={loading?'indeterminate':'determinate'} color={color} aria-label={used?'สัดส่วนเครดิตที่ใช้ไป':'สัดส่วนเครดิตคงเหลือ'} style={{'--progress-track':track} as CSSProperties} className={cn('shrink-0 gap-0',small?'w-12':'w-16',loading&&'motion-safe:animate-pulse [&_[data-slot=progress-indicator]]:hidden')}/>}
    {used&&icon}{used&&metric}
  </span>;
}
