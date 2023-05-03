import { Dayjs } from "dayjs";

export type Item = Maid | Space;

export type TotalTimePerSpaceData = {
  title: number | string;
  stayOver: number;
  empty: number;
  departure: number;
};

export type CreditCountPerHouseKeeperData = {
  name: string;
  credits: number;
};

export type Space = {
  id: number;
  title: number;
};

export type Maid = {
  id: string;
  name: string;
};

export type Dates =  {
  startDate: Dayjs;
  endDate: Dayjs;
}

export type CleanupsListForSpace = {
  [key: string]: {
    departure: {
      id_space: number;
      id_maid: number;
      cleaning_credits: number;
      cleaning_time: number;
    }[];
    empty: {
      id_space: number;
      id_maid: number;
      cleaning_credits: number;
      cleaning_time: number;
    }[];
    stayOver: {
      id_space: number;
      id_maid: number;
      cleaning_credits: number;
      cleaning_time: number;
    }[];
  };
}