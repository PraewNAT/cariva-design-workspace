import {VisualizationChart,visualizationVariants,type VisualizationVariant} from '../app/visualization-chart';
import {visualizationFixture,visualizationTitles} from '../app/visualization-chart.fixtures';
import {Dialog,DialogContent,DialogTitle,DialogDescription,DialogTrigger} from './dialog';
import {Button} from './button';
import { TrendChart } from "../app/TrendChart";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, RadialBar, RadialBarChart, XAxis } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
const config = { desktop: { label: "Desktop", color: "var(--chart-1)" }, mobile: { label: "Mobile", color: "var(--chart-2)" } } satisfies ChartConfig;
const data = [186,305,237,173,209,214].map((desktop,i)=>({month:["Jan","Feb","Mar","Apr","May","Jun"][i],desktop,mobile:[80,200,120,190,130,140][i]}));
const slices = [{name:"desktop",value:65,fill:"var(--color-desktop)"},{name:"mobile",value:35,fill:"var(--color-mobile)"}];
type Kind = "Bar" | "Area" | "Line" | "Pie" | "Radar" | "Radial";
function Example({ kind }: { kind: Kind }) {
 const tooltip = <ChartTooltip content={<ChartTooltipContent />} />;
 const legend = <ChartLegend content={<ChartLegendContent />} />;
 const grid = <CartesianGrid vertical={false} />;
 const axis = <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{fontSize:12}} minTickGap={12} />;
 let plot;
 switch(kind) {
 case "Bar": plot=<BarChart accessibilityLayer data={data}>{grid}{axis}{tooltip}{legend}<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} isAnimationActive={false}/><Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} isAnimationActive={false}/></BarChart>; break;
 case "Area": plot=<AreaChart accessibilityLayer data={data}>{grid}{axis}{tooltip}{legend}<Area dataKey="desktop" type="monotone" stroke="var(--color-desktop)" fill="var(--color-desktop)" fillOpacity={0.15} isAnimationActive={false}/><Area dataKey="mobile" type="monotone" stroke="var(--color-mobile)" fill="var(--color-mobile)" fillOpacity={0.15} isAnimationActive={false}/></AreaChart>; break;
 case "Line": plot=<LineChart accessibilityLayer data={data}>{grid}{axis}{tooltip}{legend}<Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" isAnimationActive={false}/><Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeDasharray="5 5" isAnimationActive={false}/></LineChart>; break;
 case "Pie": plot=<PieChart accessibilityLayer>{tooltip}{legend}<Pie data={slices} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="80%" isAnimationActive={false}/></PieChart>; break;
 case "Radar": plot=<RadarChart accessibilityLayer data={data} outerRadius="70%"><PolarGrid/><PolarAngleAxis dataKey="month" tick={{fontSize:12}}/>{tooltip}{legend}<Radar dataKey="desktop" stroke="var(--color-desktop)" fill="var(--color-desktop)" fillOpacity={0.15} isAnimationActive={false}/></RadarChart>; break;
 case "Radial": plot=<RadialBarChart accessibilityLayer data={slices} innerRadius="35%" outerRadius="90%" startAngle={90} endAngle={-270}>{tooltip}{legend}<RadialBar dataKey="value" background isAnimationActive={false}/></RadialBarChart>; break;
 }
 return <Card className="w-full min-w-0"><CardHeader><CardTitle>{kind} chart</CardTitle><CardDescription>ข้อมูลตัวอย่าง ใช้สีและฟอนต์จาก Cariva DS</CardDescription></CardHeader><CardContent><ChartContainer config={config} className="h-64 w-full aspect-auto" role="img" aria-label={`${kind} chart ข้อมูลตัวอย่าง Desktop และ Mobile`}>{plot}</ChartContainer></CardContent></Card>;
}
const meta = {title:"Core/Components/Chart",component:ChartContainer,args:{ config, children:null },tags:["autodocs"],parameters:{controls:{disable:true},docs:{description:{component:"25 Figma Visualization recipes plus existing Chart/Recharts examples. Core composition VisualizationChart receives data and semantic series; responsive card, patterns/gradients and accessible data table. Code Connect publication pending: Figma components are not published. Official shadcn Chart + Recharts v3. ใช้ ChartContainer/Tooltip/Legend เป็นฐาน; กำหนดความสูงของกราฟและใช้สี semantic ผ่าน config. Source แสดงการประกอบกราฟแต่ละแบบ ไม่มีการผูกกับภาพ Figma อัตโนมัติ."}}},decorators:[(Story,context)=><div className={`w-full ${context.parameters.visualizationWide?'max-w-none':'max-w-2xl'} min-w-0 p-4`}><Story/></div>]} satisfies Meta<typeof ChartContainer>;
export default meta;
type Story = StoryObj<typeof meta>;
const verify: Story["play"] = async ({canvasElement})=>{await waitFor(()=>expect(canvasElement.querySelector(".recharts-surface")).toBeVisible());};
export const BarExample: Story = {render:()=> <Example kind="Bar"/>,play:verify};
export const AreaExample: Story = {render:()=> <Example kind="Area"/>,play:verify};
export const LineExample: Story = {render:()=> <Example kind="Line"/>,play:verify};
export const PieExample: Story = {render:()=> <Example kind="Pie"/>,play:verify};
export const RadarExample: Story = {render:()=> <Example kind="Radar"/>,play:verify};
export const RadialExample: Story = {render:()=> <Example kind="Radial"/>,play:verify};
export const Compact: Story = {render:()=> <div className="w-80 max-w-full"><Example kind="Bar"/></div>,play:async({canvasElement})=>{await waitFor(()=>expect(canvasElement.querySelector(".recharts-surface")).toBeVisible());const chart=canvasElement.querySelector<HTMLElement>('[data-slot="chart"]')!;await expect(chart.scrollWidth).toBeLessThanOrEqual(chart.clientWidth);}};

export const KeyboardTooltip: Story = { render:()=> <Example kind="Bar"/>, play:async({canvasElement,userEvent})=>{
  await waitFor(()=>expect(canvasElement.querySelector(".recharts-surface")).toBeVisible());
  const svg=canvasElement.querySelector<SVGSVGElement>(".recharts-surface")!;
  svg.focus();
  await userEvent.keyboard("{ArrowRight}");
  await waitFor(()=>expect(canvasElement.querySelector(".recharts-tooltip-wrapper")).toHaveTextContent("Desktop"));
}};

const trendDefaults = { data: [{label:"Jan",value:20,comparison:10},{label:"Feb",value:30,comparison:22},{label:"Mar",value:25,comparison:18}], label:"แนวโน้มข้อมูลตัวอย่าง", comparison:true };
type TrendStory = StoryObj<typeof TrendChart>;
export const TrendComparison: TrendStory = {
  args: trendDefaults,
  render: (args) => <div className="h-64 w-full max-w-xl p-4"><TrendChart {...args} /></div>,
  play: async ({canvasElement}) => {await waitFor(()=>expect(canvasElement.querySelectorAll(".recharts-line")).toHaveLength(1));},
};
export const TrendMissingData: TrendStory = {
  args: {...trendDefaults, data:[{label:"Jan",value:20},{label:"Feb",value:null},{label:"Mar",value:25}], comparison:false},
  render: (args) => <div className="h-64 w-full max-w-xl p-4"><TrendChart {...args} /></div>,
  play: async ({canvasElement}) => {await waitFor(()=>expect(canvasElement.querySelector(".recharts-surface")).toBeVisible());await expect(canvasElement.querySelector(".recharts-line")).toBeNull();},
};

function VisualizationExample({variant}:{variant:VisualizationVariant}){const index=visualizationVariants.indexOf(variant);return <div className="w-[560px] max-w-full"><VisualizationChart variant={variant} title={visualizationTitles[index]} data={visualizationFixture(variant)} statLabel={variant==='donut-stats'?'+12.5%':undefined}/></div>;}
function visualizationStory(index:number):Story{return {render:()=> <VisualizationExample variant={visualizationVariants[index]}/>,play:async({canvasElement})=>{await waitFor(()=>expect(canvasElement.querySelector('.cds-visualization .recharts-surface')).toBeVisible());await expect(canvasElement.querySelector('table')).toHaveTextContent(visualizationTitles[index]);}};}
export const BasicBar:Story=visualizationStory(0);
export const MultiSeriesBar:Story=visualizationStory(1);
export const StripedBar:Story=visualizationStory(2);
export const DottedBar:Story=visualizationStory(3);
export const StripedSolidBar:Story=visualizationStory(4);
export const Gradient3DBar:Story=visualizationStory(5);
export const GradientBar:Story=visualizationStory(6);
export const IsometricBar:Story=visualizationStory(7);
export const DottedSolidBar:Story=visualizationStory(8);
export const DuotoneBar:Story=visualizationStory(9);
export const MonochromeBar:Story=visualizationStory(10);
export const HorizontalBar:Story=visualizationStory(11);
export const StripedGradientArea:Story=visualizationStory(12);
export const StackedDashedArea:Story=visualizationStory(13);
export const DottedStepArea:Story=visualizationStory(14);
export const AreaMarkers:Story=visualizationStory(15);
export const ForecastLine:Story=visualizationStory(16);
export const CrosshatchStackedArea:Story=visualizationStory(17);
export const DonutTotal:Story=visualizationStory(18);
export const DonutStats:Story=visualizationStory(19);
export const PatternPie:Story=visualizationStory(20);
export const ActiveDonut:Story={...visualizationStory(21),play:async({canvas,canvasElement})=>{await waitFor(()=>expect(canvas.getByRole('button',{name:'B: 280'})).toBeVisible());canvas.getByRole('button',{name:'B: 280'}).focus();await waitFor(()=>expect(canvasElement.querySelector('.cds-visualization-center')).toHaveTextContent('280'));}};
export const GradientRadar:Story=visualizationStory(22);
export const FilledRadar:Story=visualizationStory(23);
export const ScoreRadial:Story=visualizationStory(24);

export const VisualizationMobileOverview:Story={parameters:{visualizationWide:true},render:()=> <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),320px))] items-start gap-6">{visualizationVariants.map((variant,i)=><VisualizationChart key={variant} variant={variant} title={visualizationTitles[i]} data={visualizationFixture(variant)} statLabel={variant==='donut-stats'?'+12.5%':undefined}/>)}</div>,play:async({canvasElement})=>{await waitFor(()=>expect(canvasElement.querySelectorAll('.cds-visualization .recharts-surface')).toHaveLength(25));for(const chart of canvasElement.querySelectorAll<HTMLElement>('.cds-visualization'))await expect(chart.scrollWidth).toBeLessThanOrEqual(chart.clientWidth);}};
export const VisualizationResize:Story={parameters:{visualizationWide:true},render:()=> <div className="grid gap-6">{[320,400,720].flatMap(width=>(['multi-series-bar','donut-total','gradient-radar']as const).map(variant=><div key={width+variant} style={{width,maxWidth:'100%'}}><VisualizationChart variant={variant} title={`${width}px ${variant}`} data={visualizationFixture(variant)}/></div>))}</div>,play:async({canvasElement})=>{await waitFor(()=>expect(canvasElement.querySelectorAll('.cds-visualization .recharts-surface')).toHaveLength(9));await expect(Array.from(canvasElement.querySelectorAll('.cds-visualization')).map(n=>Math.round(n.getBoundingClientRect().width))).toEqual([320,320,320,400,400,400,720,720,720]);}};
export const VisualizationDataCases:Story={render:()=> <div className="grid gap-6"><VisualizationChart title="No data" data={[]}/><VisualizationChart variant="area-markers" title="Missing and non-finite values" data={[{label:'Jan',a:100},{label:'Feb',a:null},{label:'Mar',a:Number.NaN},{label:'Apr',a:0},{label:'May',a:-10},{label:'Jun',a:150}]}/><VisualizationChart variant="basic-bar" title="ชื่อกราฟและชื่อข้อมูลภาษาไทยที่ยาวเพื่อทดสอบการแสดงผลบนหน้าจอแคบ" data={[{label:'จำนวนผู้ป่วยประจำเดือนมกราคม',a:10},{label:'จำนวนผู้ป่วยประจำเดือนกุมภาพันธ์',a:20}]}/></div>,play:async({canvasElement})=>{await waitFor(()=>expect(canvasElement.querySelectorAll('.cds-visualization')).toHaveLength(3));await expect(canvasElement.querySelector('.cds-visualization')).toHaveTextContent('No data');await expect(canvasElement.querySelector('path[d*="NaN"]')).toBeNull();await expect(canvasElement.querySelectorAll('table')).toHaveLength(3);}};
export const VisualizationKeyboard:Story={render:()=> <VisualizationExample variant="basic-bar"/>,play:async({canvasElement,userEvent})=>{await waitFor(()=>expect(canvasElement.querySelector('.recharts-surface')).toBeVisible());(canvasElement.querySelector('.recharts-surface') as SVGSVGElement).focus();await userEvent.keyboard('{ArrowRight}');await waitFor(()=>expect(canvasElement.querySelector('.recharts-tooltip-wrapper')).toHaveTextContent('Series A'));}};
export const VisualizationPageAndDialog:Story={render:()=> <div className="grid gap-6"><VisualizationExample variant="striped-solid-bar"/><Dialog><DialogTrigger render={<Button variant="outline" color="secondary"/>}>Open chart Dialog</DialogTrigger><DialogContent className="max-w-3xl"><DialogTitle>Visualization</DialogTitle><DialogDescription>Same Core chart recipe in a portal</DialogDescription><VisualizationExample variant="striped-solid-bar"/></DialogContent></Dialog></div>,play:async({canvas,userEvent,canvasElement})=>{await userEvent.click(canvas.getByRole('button'));const dialog=within(canvasElement.ownerDocument.body).getByRole('dialog');await waitFor(()=>expect(dialog.querySelector('.recharts-surface')).toBeVisible());await userEvent.keyboard('{Escape}');}};
