import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
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
const meta = {title:"Core/Components/Chart",component:ChartContainer,args:{ config, children:null },tags:["autodocs"],parameters:{controls:{disable:true},docs:{description:{component:"Official shadcn Chart + Recharts v3. ใช้ ChartContainer/Tooltip/Legend เป็นฐาน; กำหนดความสูงของกราฟและใช้สี semantic ผ่าน config. Source แสดงการประกอบกราฟแต่ละแบบ ไม่มีการผูกกับภาพ Figma อัตโนมัติ."}}},decorators:[(Story)=><div className="w-full max-w-2xl min-w-0 p-4"><Story/></div>]} satisfies Meta<typeof ChartContainer>;
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
