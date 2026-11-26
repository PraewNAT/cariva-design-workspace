"use client";
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { cn } from 'cn';
import {createContext,useContext,useId,useState} from 'react';
import './tooltip.css';
function TooltipProvider({delay=0,...props}:TooltipPrimitive.Provider.Props){return <TooltipPrimitive.Provider delay={delay} {...props}/>;}
const TooltipContext=createContext<{id:string;open:boolean}|null>(null);
function Tooltip({open,defaultOpen=false,onOpenChange,...props}:TooltipPrimitive.Root.Props){const id=useId();const[localOpen,setLocalOpen]=useState(defaultOpen);return <TooltipContext.Provider value={{id,open:open??localOpen}}><TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={(next,details)=>{onOpenChange?.(next,details);if(!details.isCanceled)setLocalOpen(next);}} {...props}/></TooltipContext.Provider>;}
function TooltipTrigger(props:TooltipPrimitive.Trigger.Props){const context=useContext(TooltipContext);return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} aria-describedby={[props['aria-describedby'],context?.open?context.id:null].filter(Boolean).join(' ')||undefined}/>;}
type TooltipContentProps=TooltipPrimitive.Popup.Props & Pick<TooltipPrimitive.Positioner.Props,'align'|'alignOffset'|'side'|'sideOffset'> & {showArrow?:boolean};
function TooltipContent({className,side='top',sideOffset=8,align='center',alignOffset=0,showArrow=true,children,...props}:TooltipContentProps){const context=useContext(TooltipContext);return <TooltipPrimitive.Portal><TooltipPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} className="isolate z-50 max-w-[calc(100vw-32px)]"><TooltipPrimitive.Popup id={context?.id} role="tooltip" data-slot="tooltip-content" className={cn('cds-tooltip relative w-fit max-w-xs rounded-sm px-2 py-1 font-sans text-xs leading-4 font-medium',className)} {...props}>{children}{showArrow&&<TooltipPrimitive.Arrow className="cds-tooltip-arrow"/>}</TooltipPrimitive.Popup></TooltipPrimitive.Positioner></TooltipPrimitive.Portal>;}
export {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger};
export type {TooltipContentProps};
