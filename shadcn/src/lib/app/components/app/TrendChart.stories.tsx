import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { TrendChart } from "./TrendChart";
const meta={title:"Core/Composed/Trend Chart",component:TrendChart,tags:["autodocs"],args:{data:[{label:"Jan",value:20,comparison:10},{label:"Feb",value:30,comparison:22},{label:"Mar",value:25,comparison:18}],label:"แนวโน้มข้อมูลตัวอย่าง",comparison:true},decorators:[(Story)=><div className="h-64 w-full max-w-xl p-4"><Story/></div>]} satisfies Meta<typeof TrendChart>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Comparison: Story={play:async({canvasElement})=>{await waitFor(()=>expect(canvasElement.querySelectorAll(".recharts-line")).toHaveLength(1));}};
export const MissingData: Story={args:{data:[{label:"Jan",value:20},{label:"Feb",value:null},{label:"Mar",value:25}],comparison:false},play:async({canvasElement})=>{await waitFor(()=>expect(canvasElement.querySelector(".recharts-surface")).toBeVisible());await expect(canvasElement.querySelector(".recharts-line")).toBeNull();}};
