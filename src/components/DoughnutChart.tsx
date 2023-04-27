import { Paper } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { useDates } from "../contexts/DateContext";
import { useHouseKeepers } from "../contexts/HouseKeepersContext";
import { getTotalNumberOfCredits } from "../services/cleanups.service";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8095"];

export const DoughnutChart = () => {
    const houseKeepers = useHouseKeepers();
    const dates = useDates();

    const maidCreditsList = getTotalNumberOfCredits(houseKeepers, dates);

    // useEffect(() => {
    //   getTotalNumberOfCredits(houseKeepers, dates)().then((data) => {
    //     setMaidsList(data);
    //   });
    // }, []);
  return (
    <Paper className="tmpClass" sx={{ height: 500, overflow: 'auto'}}>

    <PieChart width={400} height={450}>

    <Legend wrapperStyle={{ lineHeight: "40px" }} verticalAlign="bottom" />
    <text x={180} y={30} fill="black" textAnchor="middle" dominantBaseline="central">
            <tspan fontSize="20">Credit Count Per Housekeeper</tspan>
        </text>
      <Pie
        data={maidCreditsList}
        cx={200}
        cy={200}
        innerRadius={70}
        outerRadius={120}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="credits"
        label
      >
        {maidCreditsList.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    
    </Paper>
  );
}
