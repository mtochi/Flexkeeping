import { Paper } from "@mui/material";
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

type BarChartProps = {
  data: {}[],
  title: string
  xAxisValueDataKey: string
  barDataKeysList: string[]
}

const listOfFillings = ["#82ca23", "#8884d8", "#82ca9d"]

export const VerticalBarChart: React.FC<BarChartProps> = ({data, title, xAxisValueDataKey, barDataKeysList}) => {
  return (
    <Paper className="tmpClass barChartClass" sx={{ height: 500, overflow: 'auto'}}>
    <BarChart
      width={400}
      height={450}
      data={data}
      margin={{
        top: 60,
        bottom: 5
      }}
    >

    <text x={210} y={30} fill="black" textAnchor="middle" dominantBaseline="central">
            <tspan fontSize="20">{title}</tspan>
        </text>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisValueDataKey} />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="bottom" wrapperStyle={{ lineHeight: "40px" }} height={50} align="center" />
      <ReferenceLine y={0} stroke="#000" />
      <Brush dataKey={xAxisValueDataKey} height={30} stroke="#8884d8" />
      {barDataKeysList.map((item, index) => (
        <Bar key={index} dataKey={item} stackId="a" fill={listOfFillings[index]} />
      ))
      }
    </BarChart>
</Paper>  );
}
