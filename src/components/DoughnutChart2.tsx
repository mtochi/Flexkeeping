    // import "./styles.css";
import React from "react";
import { PieChart, Pie, Sector, Cell, Legend, Tooltip } from "recharts";
import { useDates } from "../contexts/DateContext";
import { useHouseKeepers } from "../contexts/HouseKeepersContext";
import { getTotalNumberOfCredits, getTotalNumberOfCreditsRecharts } from "../services/cleanups.service";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8095"];

export const DoughnutChart2 = () => {
    const houseKeepers = useHouseKeepers();
    const dates = useDates();

    const maidCreditsList = getTotalNumberOfCreditsRecharts(houseKeepers, dates);
  return (
    <div>
    <h2 style={{ textAlign: "center" }}>Doughnut Chart</h2>

    <PieChart width={500} height={400}>

    <Legend wrapperStyle={{ lineHeight: "40px" }} />

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
    </div>
  );
}
