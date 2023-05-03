import { getAllCleanups, getAllMaids, getAllSpaces } from "./data.service";
import {
  CreditCountPerHouseKeeperData,
  Dates,
  Maid,
  TotalTimePerSpaceData,
  CleanupsListForSpace,
} from "../types";



export const getTotalNumberOfCredits = async (
  houseKeepers: any[],
  dates: Dates
): Promise<CreditCountPerHouseKeeperData[]> => {
  const cleanupsListTotal: CleanupsListForSpace = await getAllCleanups();
  let maidsList = await getAllMaids();

  const houseKeeperIds = houseKeepers.map((houseKeeper) => houseKeeper.id);

  const maidCreditsTotal: { [key: number]: number } = {};
  const { startDate, endDate } = dates;

  for (const [day] of Object.entries(cleanupsListTotal)) {
    if (parseInt(day) >= startDate.date() && parseInt(day) <= endDate.date()) {
      const cleaningsByType = cleanupsListTotal[day];
      const allCleanups = Object.values(cleaningsByType).flat();
      allCleanups.forEach((cleanup) => {
        const maidId = cleanup.id_maid;
        if (houseKeeperIds.includes(maidId)) {
          maidCreditsTotal[maidId] =
            (maidCreditsTotal[maidId] || 0) + cleanup.cleaning_credits;
        }
      });
    }
  }

  const maidsCreditsList: CreditCountPerHouseKeeperData[] = Object.entries(
    maidCreditsTotal
  ).map(([id, credits]) => {
    return {
      name:
        maidsList.find((maid: Maid) => maid.id.toString() === id)?.name || "",
      credits: credits,
    };
  });

  return maidsCreditsList;
};

export const getTotalTimePerSpace = async (
  spaces: any[],
  dates: Dates
): Promise<TotalTimePerSpaceData[]> => {
  const cleanupsListTotal: CleanupsListForSpace = await getAllCleanups();
  const spacesList = await getAllSpaces();
  const spaceIds = spaces.map((space) => space.id);
  const spacesTimeTotal: { [key: string]: { [key: string]: number } } = {};
  const { startDate, endDate } = dates;

  Object.entries(cleanupsListTotal).forEach(([day, cleaningsByType]) => {
    if (parseInt(day) >= startDate.date() && parseInt(day) <= endDate.date()) {
      Object.entries(cleaningsByType).forEach(([type, actual_cleanings]) => {
        actual_cleanings.forEach((cleanup) => {
          const spaceId = cleanup.id_space;
          if (spaceIds.includes(spaceId)) {
            spacesTimeTotal[spaceId] = spacesTimeTotal[spaceId] || {};
            spacesTimeTotal[spaceId][type] =
              (spacesTimeTotal[spaceId][type] || 0) +
              cleanup.cleaning_time * 60;
          }
        });
      });
    }
  });
  const spacesTimeTotalList = Object.entries(spacesTimeTotal).map(
    ([id, totalTime]) => {
      return {
        title:
          spacesList.find((space) => space.id.toString() === id)?.title || "",
        stayOver: totalTime.hasOwnProperty("stayOver") ? totalTime.stayOver : 0,
        empty: totalTime.empty ? totalTime.empty : 0,
        departure: totalTime.departure ? totalTime.departure : 0,
      };
    }
  );
  return spacesTimeTotalList;
};
