import { createContext, useReducer, useContext, useEffect } from 'react';
import { getAllSpaces } from '../services/data.service';
export const SpacesContext = createContext<any[]>([]);
export const SpacesDispatchContext = createContext<React.Dispatch<any>>(() => {});

export function SpacesProvider({ children }: { children: React.ReactNode }) {
    const [spaces, dispatch] = useReducer(spacesReducer, initialSpaces);
    useEffect(() => {
      const fetchData = async () => {
        try {
            const result = await getAllSpaces();
            result.forEach((item: any) => {
              dispatch({
                type: 'SET_SPACES',
                id: item.id,
                title: item.title
            });
          });
        } catch (error) {
            console.error("Failed to fetch data: ", error);
        }
        
    };
    fetchData()
    }, []);
    return(
        <SpacesContext.Provider value={spaces}>
            <SpacesDispatchContext.Provider value={dispatch}>
                {children}
            </SpacesDispatchContext.Provider>
        </SpacesContext.Provider>
    )
}

export function useSpaces() {
  return useContext(SpacesContext);
}

export function useSpacesDispatch() {
  return useContext(SpacesDispatchContext);
}

function spacesReducer(spaces: any, action: { type: string; id: any; title: any; }) {
    switch (action.type) {
      case 'SET_SPACES': {
        const existingIndex = spaces.findIndex((h: { id: any; }) => h.id === action.id);
        if (existingIndex !== -1) {
          // Space exists in the array => don't add it
          return spaces;
        } else {
          // Space doesn't exist in the array => add it
          return [...spaces, { id: action.id, title: action.title }];
        }
      }
      case 'REMOVE_SPACES': {
        const indexToRemove = spaces.findIndex((h: { id: any; }) => h.id === action.id);
      if (indexToRemove !== -1) {
        // Space exists in the array => remove it
        const newCleanups = [...spaces];
        newCleanups.splice(indexToRemove, 1);
        return newCleanups;
      } else {
        // Space doesn't exist in the array => do nothing
        return spaces;
      }
      }
      case 'REMOVE_ALL_SPACES': {
        return [];
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }

const initialSpaces: any[] = [
];