
import maids from '../data/maids.json';
import cleanups from '../data/cleanups.json';
import spaces from '../data/spaces.json';
import { Dayjs } from 'dayjs';


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
    return maidCreditsList
}


export const getTotalTimePerSpace = (spaces: any[], dates: Dates) => {

  const cleanupsListTotal : CleanupsListForSpace = cleanups;
    const spacesList = spaces;

    const spacesIds: (number | undefined)[] = [];

    spaces.forEach((space) => {
        spacesIds.push(space.id);
    });

    const spacesTimeTotal : {[key: string]: {[key:string]: number}} = {};
    const startDate = dates.startDate;
    const endDate = dates.endDate;

    for (const [day, cleanings] of Object.entries(cleanupsListTotal)) {
      if(parseInt(day) >= startDate.date() && parseInt(day) <= endDate.date()){
        for (const [type, actual_cleanings] of Object.entries(cleanupsListTotal[day])){
            actual_cleanings.forEach(cleanup => {
                const spaceId = cleanup.id_space;
                if(spacesIds.includes(spaceId) ){
                    spacesTimeTotal[spaceId] = (spacesTimeTotal[spaceId] || {});
                    spacesTimeTotal[spaceId][type] = (spacesTimeTotal[spaceId][type] || 0) + cleanup.cleaning_time;
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
        totalTime,
    }));
    console.log("spacesTimeTotalList")
    console.log(spacesTimeTotalList);

    console.log("spacesTimeTotal")
    console.log(spacesTimeTotal);

    const chartData = {
        labels: spacesTimeTotalList.map(space => space.title),
        datasets: [{
            data: spacesTimeTotalList.map(space => space.totalTime),
        }]
    };
    console.log("chartData");
    
    console.log(chartData);

    const chartData2 = {
        labels: spacesTimeTotalList.map(space => space.title),
        datasets: [
          { 
            data: spacesTimeTotalList.map(space => space.totalTime.stayOver),
            label: "Stay Over",
            borderColor: "#3cba9f",
            backgroundColor: "#71d1bd",
            borderWidth:2
          }, 
          { 
            data: spacesTimeTotalList.map(space => space.totalTime.departure),
            label: "Departure",
            borderColor: "#ffa500",
            backgroundColor:"#ffc04d",
            borderWidth:2
          }, 
          { 
            data: spacesTimeTotalList.map(space => space.totalTime.empty),
            label: "Empty",
            borderColor: "#c45850",
            backgroundColor:"#d78f89",
            borderWidth:2
          }
        ]
      };
      return chartData2;

}