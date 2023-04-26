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
import { useDates } from "../contexts/DateContext";
import { useSpaces } from "../contexts/SpacesContext";
import { getTotalTimePerSpace } from "../services/cleanups.service";


export const BarChartComponent = () => {
    const cleanups = useSpaces();
    const dates = useDates();

    const data = getTotalTimePerSpace(cleanups, dates);
  return (<div className="tmpClass barChartClass">


    <BarChart
      // <text>Total Time per Space Statuses</text>
      width={400}
      height={450}
      data={data}
      margin={{
        // top: 5,
        // right: 30,
        // left: 20,
        // bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="title" />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} height={50} align="center" />
      <ReferenceLine y={0} stroke="#000" />
      <Brush dataKey="title" height={30} stroke="#8884d8" />
      <Bar dataKey="stayOver" stackId="a" fill="#8884d8" />
      <Bar dataKey="departure" stackId="a" fill="#82ca9d" />
      <Bar dataKey="empty" stackId="a" fill="#82ca23" />
    </BarChart>
    </div>
  );
}
