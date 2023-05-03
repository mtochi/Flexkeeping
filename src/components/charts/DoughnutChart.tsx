import { Paper } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8095"];
type DoughnutChartProps = {
  data: {}[],
  title: string
  mainDataKey: string
  isLoading: boolean;

}
export const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, title, mainDataKey, isLoading }) => {
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <Paper className="tmpClass" sx={{ height: 500, overflow: 'auto' }}>

      <PieChart width={400} height={450}>

        <Legend wrapperStyle={{ lineHeight: "40px" }} verticalAlign="bottom" />
        <text x={180} y={30} fill="black" textAnchor="middle" dominantBaseline="central">
          <tspan fontSize="20">{title}</tspan>
        </text>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={70}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
          dataKey={mainDataKey}
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

    </Paper>
  );
}
