import { useId, useState, type CSSProperties } from 'react';
import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup } from '../ui/radio-group';
import { cn } from 'cn';
import starFull from './assets/rating/star-full.svg';
import starEmpty from './assets/rating/star-empty.svg';
export type RatingProps = { value?: number; defaultValue?: number; onValueChange?: (value: number) => void; precision?: 1 | 0.5; size?: 'sm' | 'default' | 'lg'; disabled?: boolean; readOnly?: boolean; label?: string; className?: string };
function clamp(value: number) { return Number.isFinite(value) ? Math.max(0, Math.min(5, value)) : 0; }
/** Figma five-star rating. Product owns the meaning of the score. */
export function Rating({ value, defaultValue = 3, onValueChange, precision = 1, size = 'default', disabled = false, readOnly = false, label = 'ให้คะแนนประสบการณ์', className }: RatingProps) {
  const [local, setLocal] = useState(clamp(defaultValue)); const [hovered, setHovered] = useState<number | null>(null); const uid = useId();
  const selected = clamp(value ?? local); const shown = hovered ?? selected;
  const pixels = { sm: 18, default: 24, lg: 30 }[size];
  const color = disabled ? 'var(--cds-content-disabled)' : 'var(--cds-accent-amber-A04)';
  const stars = <span aria-hidden className="pointer-events-none flex">{Array.from({length:5},(_,index)=>{
    const fill = Math.max(0,Math.min(1,shown-index));
    return <span key={index} className="relative inline-block shrink-0" style={{width:pixels,height:pixels}}><span className={cn('absolute left-1/2 top-1/2',hovered !== null && Math.ceil(hovered)===index+1 && {sm:'motion-safe:scale-[1.2778]',default:'motion-safe:scale-[1.2083]',lg:'motion-safe:scale-[1.2]'}[size])} style={{width:pixels,height:pixels,marginLeft:-pixels/2,marginTop:-pixels/2}}>
      <span className="absolute left-0 top-0 block size-6 origin-top-left" style={{transform:`scale(${pixels/24})`}}>
        <span className="absolute left-0.5 top-[3px] block h-[19px] w-5" style={{backgroundColor:disabled?color:'var(--cds-border-default)',maskImage:`url("${starEmpty}")`,maskSize:'100% 100%'}} />
        <span className="absolute inset-y-0 left-0 overflow-hidden" style={{width:`${fill*100}%`}}><span className="absolute left-0.5 top-[3px] block h-[19px] w-5" style={{backgroundColor:color,maskImage:`url("${starFull}")`,maskSize:'100% 100%'}} /></span>
      </span>
    </span></span>;
  })}</span>;
  return <div data-slot="rating" data-size={size} data-disabled={disabled || undefined} className={cn('grid justify-items-start gap-2 font-sans text-sm leading-5 text-[var(--cds-content-primary)]', className)}>
    <span id={`${uid}-label`} className="font-medium">{label}</span>
    {readOnly ? <span role="img" aria-label={`${label}: ${selected} จาก 5 ดาว`}>{stars}</span> : <RadioGroup aria-labelledby={`${uid}-label`} aria-describedby={`${uid}-status`} value={selected || null} disabled={disabled} onValueChange={next=>{const rating=clamp(Number(next));if(value===undefined)setLocal(rating);onValueChange?.(rating);}} className="relative !flex !w-auto !gap-0" onPointerLeave={()=>setHovered(null)}>
      {stars}
      <span className="absolute inset-0 flex">{Array.from({length:5/precision},(_,index)=>{const score=(index+1)*precision;return <RadioPrimitive.Root key={score} value={score} {...(disabled ? { tabIndex: -1 } : {})} aria-label={`${score} ดาว`} disabled={disabled} className="relative h-full min-w-0 flex-1 border-0 bg-transparent p-0 outline-none focus-visible:z-10 focus-visible:rounded-[2px] focus-visible:ring-2 focus-visible:ring-[var(--cds-border-system)]" style={{width:pixels*precision} as CSSProperties} onPointerEnter={()=>{if(!disabled)setHovered(score);}} onFocus={()=>setHovered(null)} />;})}</span>
    </RadioGroup>}
    <span id={`${uid}-status`} role="status" className="text-xs leading-4 text-[var(--cds-content-secondary)]">{selected} จาก 5</span>
  </div>;
}
