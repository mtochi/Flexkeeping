export type Item = { id: string; name: string } | { id: number; title: string };

export type TotalTimePerSpaceData = {
    title: number|string;
    stayOver: number;
    empty: number;
    departure: number;
  };

  export type CreditCountPerHouseKeeperData ={
    name: string;
    credits: number;
}