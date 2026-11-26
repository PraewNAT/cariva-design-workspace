import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import type { ReactNode } from 'react';
import { Badge } from './badge';
import './tabs.css';

function Tabs({className,orientation='horizontal',...props}:TabsPrimitive.Root.Props){
  return <TabsPrimitive.Root orientation={orientation} data-slot="tabs" className={cn('group/tabs flex min-w-0 gap-3 font-sans data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row',className)} {...props}/>;
}
const tabsListVariants=cva('cds-tabs-list relative inline-flex w-max items-center justify-start',{
  variants:{variant:{default:'',pills:'',line:'',standard:'',folder:''},tabVariant:{default:'',line:''},size:{default:'',sm:''}},
  defaultVariants:{variant:'default',tabVariant:'default',size:'default'},
});
type TabsListProps=TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants> & {stretch?:boolean;color?:'primary'|'secondary'};
function TabsList({className,variant='default',tabVariant='default',size='default',stretch=false,color='primary',style,children,...props}:TabsListProps){
  const recipe=variant==='default'?'pills':variant==='line'?'standard':variant;
  return <div data-slot="tabs-scroll" data-variant={recipe} className="min-w-0 max-w-full" style={{width:stretch?'100%':'fit-content'}}>
    <TabsPrimitive.List data-slot="tabs-list" data-variant={recipe} data-tab-variant={tabVariant} data-size={size} data-color={color} data-stretch={stretch||undefined} className={cn(tabsListVariants({variant,tabVariant,size}),className)} style={{...(stretch?{width:'100%'}:{}),...style}} {...props}>{children}{recipe!=='folder'&&<TabsPrimitive.Indicator aria-hidden data-slot="tabs-indicator" className="cds-tabs-indicator"/>}</TabsPrimitive.List>
  </div>;
}
type TabsTriggerProps=TabsPrimitive.Tab.Props & {icon?:ReactNode;badge?:ReactNode;notification?:boolean};
function TabsTrigger({className,children,icon,badge,notification,...props}:TabsTriggerProps){
  return <TabsPrimitive.Tab data-slot="tabs-trigger" className={cn('cds-tab relative inline-flex shrink-0 items-center justify-center gap-2 border-0 font-sans text-sm leading-5 font-medium outline-none',className)} {...props}>
    {icon&&<span aria-hidden data-slot="tabs-icon" className="inline-flex shrink-0">{icon}</span>}
    {children!=null&&<span data-slot="tabs-label" data-rich={typeof children!=='string'&&typeof children!=='number'||undefined} className="min-w-0 truncate">{children}</span>}
    {notification&&<span aria-hidden data-slot="tabs-notification" className="absolute right-2 top-2"><Badge variant="dot" color="error" className="size-[6px]"/></span>}
    {badge!=null&&<span data-slot="tabs-badge" className="inline-flex shrink-0"><Badge variant="standard" color="default" className="px-2">{badge}</Badge></span>}
  </TabsPrimitive.Tab>;
}
function TabsContent({className,...props}:TabsPrimitive.Panel.Props){return <TabsPrimitive.Panel data-slot="tabs-content" className={cn('min-w-0 flex-1 text-sm leading-5 outline-none',className)} {...props}/>;}
export {Tabs,TabsContent,TabsList,tabsListVariants,TabsTrigger};
export type {TabsListProps,TabsTriggerProps};
