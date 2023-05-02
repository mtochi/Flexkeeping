
import { useEffect, useState } from "react";
import { useDates } from "../contexts/DateContext";
import { useSpaces } from "../contexts/SpacesContext";
import { getTotalTimePerSpace } from "../services/cleanups.service";
import { VerticalBarChart } from "./charts/VerticalBarChart";
import { TotalTimePerSpaceData } from "../types";


export const SpacesBarChart = () => {
  const cleanups = useSpaces();
  const dates = useDates();
  const [data, setData] = useState<TotalTimePerSpaceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTotalTimePerSpace(cleanups, dates);
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }finally {
        setIsLoading(false);
      }
    };
    fetchData()
  }, [cleanups, dates])


  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <VerticalBarChart
      data={data}
      title="Total Time per Space Statuses"
      xAxisValueDataKey="title"
      barDataKeysList={["stayOver", "empty", "departure"]}
    />
  )
}
