import { useEffect, useState } from "react";
import { useDates } from "../contexts/DateContext";
import { useHouseKeepers } from "../contexts/HouseKeepersContext";
import { getTotalNumberOfCredits } from "../services/cleanups.service";
import { DoughnutChart } from "./charts/DoughnutChart";
import { CreditCountPerHouseKeeperData } from "../types";

export const HouseKepeersDoughtnutChart = () => {
    const houseKeepers = useHouseKeepers();
    const dates = useDates();
    const [data, setData] = useState<CreditCountPerHouseKeeperData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {

        try {
            const result = await getTotalNumberOfCredits(houseKeepers, dates);
            console.log("result", result)
            setData(result);


        } catch (error) {
            console.error("Failed to fetch data: ", error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        fetchData()
    }, [houseKeepers, dates])

    // useEffect(() => {

    //     fetchData()
    // }, [])
    console.log("HouseKeepersChart data");
    console.log(data)
    console.log(isLoading)

    // if (isLoading) {
    //     return <div>Loading</div>;
    // }
    // if (data === null) {
    //     return <div>Loading</div>;
    //   }
    return (
        <DoughnutChart
            data={data}
            title="Credit Count Per Housekeeper"
            mainDataKey="credits"
            isLoading={isLoading}
        />
    );
}
