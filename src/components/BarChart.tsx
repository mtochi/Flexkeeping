import { Bar } from "react-chartjs-2";
import { useSpaces } from '../contexts/SpacesContext';
import { useDates } from '../contexts/DateContext';
import { getTotalTimePerSpace } from '../services/cleanups.service';


export const BarChart = () => {
    
    const spacesListSelected = useSpaces();
    const dates = useDates();
    const chartData = getTotalTimePerSpace(spacesListSelected, dates);

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <div className="chartWrapper" style={{width:"100%", overflowX: "scroll"}}>
            
            <Bar
                data={chartData}
                options={
                    {
                    aspectRatio: 0.90,
                    plugins: {
                        title: {
                            display: true,
                            text: "Total Time per Space Statuses"
                        }
                    },
                    scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true
                    }
                    },
                    
                }}
            />
            </div>
        </div>
    );
};

