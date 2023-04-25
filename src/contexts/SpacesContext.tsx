import { createContext, useReducer, useContext } from 'react';
export const SpacesContext = createContext<any[]>([]);
export const SpacesDispatchContext = createContext<React.Dispatch<any>>(() => {});

export function SpacesProvider({ children }: { children: React.ReactNode }) {
    const [spaces, dispatch] = useReducer(spacesReducer, initialSpaces);
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
        console.log("cleanups: ", spaces);
        const existingIndex = spaces.findIndex((h: { id: any; }) => h.id === action.id);
        if (existingIndex !== -1) {
          return spaces;
        } else {
          return [...spaces, { id: action.id, title: action.title }];
        }
      }
      case 'REMOVE_SPACES': {
        const indexToRemove = spaces.findIndex((h: { id: any; }) => h.id === action.id);
      if (indexToRemove !== -1) {
        // Housekeeper exists in the array, remove it
        const newCleanups = [...spaces];
        newCleanups.splice(indexToRemove, 1);
        return newCleanups;
      } else {
        // Housekeeper doesn't exist in the array, do nothing
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