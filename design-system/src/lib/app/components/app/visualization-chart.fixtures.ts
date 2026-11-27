import type {VisualizationDatum,VisualizationVariant} from './visualization-chart';
export const visualizationTitles=['Basic bar','Multi-series bar','Striped bar','Dotted bar','Striped + solid bar','3D gradient bar','Gradient bar','Isometric bar','Dotted + solid bar','Duotone bar','Monochrome bar','Horizontal bar','Striped gradient area','Stacked dashed area','Dotted step area','Area + markers','Forecast line','Crosshatch stacked area','Donut total','Donut stats','Pattern pie','Active donut','Gradient radar','Filled radar','Score radial'];
const bars=[85,130,110,180,145,200].map((a,i)=>({label:['Jan','Feb','Mar','Apr','May','Jun'][i],a,b:[55,100,80,150,115,170][i]}));
const area=[40,80,60,140,115,175,155].map((a,i)=>({label:['Start','Jan','Feb','Mar','Apr','May','Jun'][i],a,b:[20,50,35,85,70,115,105][i]}));
const slices=[400,280,200,120].map((value,i)=>({label:['A','B','C','D'][i],value}));
const radar=[80,65,90,70,50,88].map((a,i)=>({label:['A','B','C','D','E','F'][i],a}));
const radial=[86,72,60].map((value,i)=>({label:['Performance','Access','Quality'][i],value}));
/** Mock values reconstructed from source geometry; never imported into production components. */
export function visualizationFixture(variant:VisualizationVariant):VisualizationDatum[]{return (variant.includes('donut')||variant==='pattern-pie'?slices:variant.includes('radar')?radar:variant==='score-radial'?radial:variant.includes('area')||variant==='forecast-line'?area:bars).map(r=>({...r,...(variant==='stacked-dashed-area'||variant==='crosshatch-stacked-area'?{a:('a'in r?Number(r.a):0)-('b'in r?Number(r.b):0)}:{})}));}
