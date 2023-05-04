import { useMemo, useState } from "react";
import { useDates } from "../../contexts/DateContext";
import { useHouseKeepers } from "../../contexts/HouseKeepersContext";
import { getTotalNumberOfCredits } from "../../services/cleanups.service";
import { CreditCountPerHouseKeeperData } from "../../types";
import { DoughnutChart } from "./DoughnutChart";


export const HouseKepeersDoughtnutChart = () => {
    const houseKeepers = useHouseKeepers();
    const dates = useDates();
    const [data, setData] = useState<CreditCountPerHouseKeeperData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {

        try {
            const result = await getTotalNumberOfCredits(houseKeepers, dates);
            setData(result);


        } catch (error) {
            console.error("Failed to fetch data: ", error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useMemo(() => {
        fetchData()
    }, [houseKeepers, dates])

    return (
        <DoughnutChart
            data={data}
            title="Credit Count Per Housekeeper"
            mainDataKey="credits"
            isLoading={isLoading}
        />
    );
}
