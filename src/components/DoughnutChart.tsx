import { Doughnut } from "react-chartjs-2";
import { useDates } from "../contexts/DateContext";
import { useHouseKeepers } from '../contexts/HouseKeepersContext';
import { getTotalNumberOfCredits } from "../services/cleanups.service";

export const DoughnutChart = () => {
    const houseKeepers = useHouseKeepers();
    const dates = useDates();

    const maidCreditsList = getTotalNumberOfCredits(houseKeepers, dates);
    const chartData = {
        labels: maidCreditsList.map(maid => maid.name),
        datasets: [{
          data: maidCreditsList.map(maid => maid.credits),
        }]
      };

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Doughnut Chart</h2>
            <Doughnut
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Credit Count Per Housekeeper"
                        },
                        colors: {
                            forceOverride: true
                        }
                    }
                    
                }}
            />
        </div>
    );
};

