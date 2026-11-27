import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { format } from "date-fns";
import { expect } from "storybook/test";
import type { DateRange } from "react-day-picker";
import { Calendar } from "./calendar";
const month=new Date(2024,8,1),labels={labelDayButton:(d:Date)=>format(d,"dd/MM/yyyy")};
const meta={title:"Core/Components/Calendar",tags:["autodocs"],component:Calendar,decorators:[(Story)=><div className="max-w-xl p-4"><Story/></div>],parameters:{controls:{disable:true},docs:{description:{component:"Calendar เดิมบน React DayPicker ปรับตาม Figma: grid40px, ปุ่มวัน32px/12px, Single/Range/disabled ใช้กับ Date Picker. ดู DATE-TIME-FIGMA.md"}}}} satisfies Meta<typeof Calendar>;
export default meta;
type Story=StoryObj;
function SingleExample(){const [value,setValue]=useState<Date|undefined>(new Date(2024,8,10));return <Calendar mode="single" defaultMonth={month} selected={value} onSelect={setValue} labels={labels}/>;}
export const Default:Story={render:()=> <SingleExample/>,play:async({canvas,userEvent})=>{await userEvent.click(canvas.getByRole("button",{name:"12/09/2024"}));await expect(canvas.getByRole("button",{name:"12/09/2024"})).toHaveAttribute("data-selected-single","true");}};
function RangeExample(){const [value,setValue]=useState<DateRange|undefined>({from:new Date(2024,8,10),to:new Date(2024,8,30)});return <Calendar mode="range" defaultMonth={month} selected={value} onSelect={setValue} labels={labels}/>;}
export const Range:Story={render:()=> <RangeExample/>};
export const DisabledDays:Story={render:()=> <Calendar mode="single" defaultMonth={month} selected={new Date(2024,8,10)} disabled={{after:new Date(2024,8,17)}} labels={labels}/>,play:async({canvas})=>{await expect(canvas.getByRole("button",{name:"18/09/2024"})).toBeDisabled();}};
