
import cleanups from '../data/cleanups.json';
import spacesF from '../data/spaces.json';
import maids from '../data/maids.json';
import { Dayjs } from 'dayjs';
import { getAllMaids } from './data.service';


interface CleanupsListForSpace {
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
};
interface Dates {
  startDate: Dayjs;
  endDate: Dayjs;
}

type Maid = { id: string; name: string };


export const getTotalNumberOfCredits = (houseKeepers: any[], dates: Dates) => {
  const cleanupsListTotal : CleanupsListForSpace = cleanups;
  //let maidsList = await getAllMaids();
  // let maidsList: any[];
  // getAllMaids().then((data) => {
  //   maidsList=data


  // });
  

  const maidsList = maids;
  const houseKeeperIds: (number | undefined)[] = [];

  houseKeepers.forEach((houseKeeper) => {
      houseKeeperIds.push(houseKeeper.id);
  });
  const maidCreditsTotal : {[key: number]: number} = {};  
  const startDate = dates.startDate;
  const endDate = dates.endDate;

  for (const [day] of Object.entries(cleanupsListTotal)) {
    if(parseInt(day) >= startDate.date() && parseInt(day) <= endDate.date()){
      const cleaningsByType = cleanupsListTotal[day];
      const allCleanups = Object.values(cleaningsByType).flat();
      allCleanups.forEach(cleanup => {
        const maidId = cleanup.id_maid;
        if (houseKeeperIds.includes(maidId)) {
          maidCreditsTotal[maidId] = (maidCreditsTotal[maidId] || 0) + cleanup.cleaning_credits;
        }
      });
    }
  }

  const maidsCreditsList = Object.entries(maidCreditsTotal).map(([id, credits]) => {
    return{
      name: maidsList.find((maid) => maid.id.toString() === id)?.name || '',
      credits: credits
    }
  });

  return maidsCreditsList;
}

export const getTotalTimePerSpace = (spaces: any[], dates: Dates) => {
  const cleanupsListTotal : CleanupsListForSpace = cleanups;
    const spacesList = spacesF;
    const spacesIds: (number | undefined)[] = [];
    spaces.forEach((space) => {
        spacesIds.push(space.id);
    });

    const spacesTimeTotal : {[key: string]: {[key:string]: number}} = {};
    const startDate = dates.startDate;
    const endDate = dates.endDate;

    for (const [day] of Object.entries(cleanupsListTotal)) {
      if(parseInt(day) >= startDate.date() && parseInt(day) <= endDate.date()){
        for (const [type, actual_cleanings] of Object.entries(cleanupsListTotal[day])){
            actual_cleanings.forEach(cleanup => {
                const spaceId = cleanup.id_space;
                if(spacesIds.includes(spaceId) ){
                    spacesTimeTotal[spaceId] = (spacesTimeTotal[spaceId] || {});
                    spacesTimeTotal[spaceId][type] = (spacesTimeTotal[spaceId][type] || 0) + (cleanup.cleaning_time*60);
                }
                
            });
            
        }
      }
    }
    console.log("spacesIds: ", spacesIds)
    console.log("spacesTimeTotal ", spacesTimeTotal)

    interface TotalTime {
      stayOver: number;
      empty: number;
      departure: number;
    }
    
    const spacesTimeTotalList2 = Object.entries(spacesTimeTotal).map(([id, totalTime]) => {
      return {
        title: spacesList.find(space => space.id.toString() === id)?.title || '',
        stayOver: totalTime.stayOver ? totalTime.stayOver: 0,
        empty: totalTime.empty ? totalTime.empty : 0,
        departure: totalTime.departure? totalTime.departure: 0,
      }
    });
    return spacesTimeTotalList2;


}
