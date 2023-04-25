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
import { getTotalTimePerSpaceRecharts } from "../services/cleanups.service";


export const TmpCharts = () => {
    const cleanups = useSpaces();
    const dates = useDates();

    const data = getTotalTimePerSpaceRecharts(cleanups, dates);
  return (<div>


    <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
    <BarChart
      width={400}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="title" />
      <YAxis />
      <Tooltip />
      <Legend wrapperStyle={{ lineHeight: "40px" }} />
      <ReferenceLine y={0} stroke="#000" />
      <Brush dataKey="title" height={30} stroke="#8884d8" />
      <Bar dataKey="stayOver" stackId="a" fill="#8884d8" />
      <Bar dataKey="departure" stackId="a" fill="#82ca9d" />
      <Bar dataKey="empty" stackId="a" fill="#82ca23" />
    </BarChart>
    </div>
  );
}
