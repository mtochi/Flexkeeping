import { createContext, useReducer, useContext, useEffect } from 'react';
import { getAllMaids } from '../services/data.service';

export const HouseKeepersContext = createContext<any[]>([]);
export const HouseKeepersDispatchContext = createContext<React.Dispatch<any>>(() => { });

export function HouseKeepersProvider({ children }: { children: React.ReactNode }) {


  let initialHouseKeepers: any[] = [

  ];
  const [houseKeepers, dispatch] = useReducer(houseKeepersReducer, initialHouseKeepers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllMaids();
        result.forEach((item: any) => {
          dispatch({
            type: 'SET_HOUSEKEEPERS',
            id: item.id,
            name: item.name
          });
        });
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }

    };
    fetchData()
  }, []);
  return (
    <HouseKeepersContext.Provider value={houseKeepers}>
      <HouseKeepersDispatchContext.Provider value={dispatch}>
        {children}
      </HouseKeepersDispatchContext.Provider>
    </HouseKeepersContext.Provider>
  )
}

export function useHouseKeepers() {
  return useContext(HouseKeepersContext);
}

export function useHouseKeepersDispatch() {
  return useContext(HouseKeepersDispatchContext);
}

function houseKeepersReducer(houseKeepers: any, action: { type: string; id: any; name: any; }) {
  switch (action.type) {
    case 'SET_HOUSEKEEPERS': {
      const existingIndex = houseKeepers.findIndex((h: { id: any; }) => h.id === action.id);

      if (existingIndex !== -1) {
        // Maid exists in the array => don't add it
        return houseKeepers;
      } else {
        // Maid doesn't exist in the array => add it
        return [...houseKeepers, { id: action.id, name: action.name }];
      }
    }
    case 'REMOVE_HOUSEKEEPERS': {
      const indexToRemove = houseKeepers.findIndex((h: { id: any; }) => h.id === action.id);
      if (indexToRemove !== -1) {
        // Maid exists in the array, remove it
        const newCleanups = [...houseKeepers];
        newCleanups.splice(indexToRemove, 1);
        return newCleanups;
      } else {
        // Maid doesn't exist in the array => do nothing
        return houseKeepers;
      }
    }
    case 'REMOVE_ALL_HOUSEKEEPERS': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

