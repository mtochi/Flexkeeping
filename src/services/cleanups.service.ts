
import cleanups from '../data/cleanups.json';
import spaces from '../data/spaces.json';
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


export const getTotalNumberOfCredits = (houseKeepers: any[], dates: Dates) => {
  const cleanupsListTotal : CleanupsListForSpace = cleanups;

  // let maidsList: any[];
  // getAllMaids().then((data) => {
  //   maidsList=data
  // });
  

  const maidsList = maids;

  console.log("Hello from here");
  console.log(houseKeepers);
  const houseKeeperIds: (number | undefined)[] = [];

  houseKeepers.forEach((houseKeeper) => {
      houseKeeperIds.push(houseKeeper.id);
  });
  const maidCreditsTotal : {[key: number]: number} = {};
  console.log("houseKeeperIds", houseKeeperIds)
  
  const startDate = dates.startDate;
  const endDate = dates.endDate;

  for (const [day, cleanings] of Object.entries(cleanupsListTotal)) {
    if(parseInt(day) >= startDate.date() && parseInt(day) <= endDate.date()){
      console.log("startDate.date(): ", startDate.date())
      console.log("endDate.date(): ", endDate.date())
      for( const [type, actual_cleanings] of Object.entries(cleanupsListTotal[day])){
          actual_cleanings.forEach(cleanup => {
              const maidId = cleanup.id_maid;
              if(houseKeeperIds.includes(maidId)){
                  maidCreditsTotal[maidId] = (maidCreditsTotal[maidId] || 0) + cleanup.cleaning_credits;
              }
          });
          
      }
    }
  }
  console.log("maidCreditsTotal ", maidCreditsTotal);

  const maidCreditsList = Object.entries(maidCreditsTotal)
  .map(([id, credits]) => ({
    id,
    name: maidsList.find(maid => maid.id.toString() === id)?.name || '',
    credits,
  }));

  const maidsCreditsList2 = Object.entries(maidCreditsTotal).map(([id, credits]) => {
    return{
      name: maidsList.find(maid => maid.id.toString() === id)?.name || '',
      credits: credits
    }
    

  });
  return maidsCreditsList2;
}

export const getTotalTimePerSpace = (spaces: any[], dates: Dates) => {
  const cleanupsListTotal : CleanupsListForSpace = cleanups;
    const spacesList = spaces;

    const spacesIds: (number | undefined)[] = [];

    spaces.forEach((space) => {
        spacesIds.push(space.id);
    });

    const spacesTimeTotal : {[key: string]: {[key:string]: number}} = {};
    const spacesTimeTotal2 : [{title: string, departure: number, stayOver: number, empty: number}] = [{title: "", departure: 0, stayOver: 0, empty: 0}];
    const startDate = dates.startDate;
    const endDate = dates.endDate;

    for (const [day, cleanings] of Object.entries(cleanupsListTotal)) {
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
    console.log("spacesTimeTotal ", spacesTimeTotal);
    
    const spacesTimeTotalList = Object.entries(spacesTimeTotal).map(([id, totalTime]) => ({
        id,
        title: spacesList.find(space => space.id.toString() === id)?.title || '',
        totalTime
    }));
    console.log("spacesTimeTotalList")
    console.log(spacesTimeTotalList);

    console.log("spacesTimeTotal")
    console.log(spacesTimeTotal);

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

    console.log("spacesTimeTotalList2")
    console.log(spacesTimeTotalList2)
    return spacesTimeTotalList2;


}
