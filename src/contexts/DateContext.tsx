import { createContext, useReducer, useContext } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface Dates {
    startDate: Dayjs;
    endDate: Dayjs;
  }

export const DateContext = createContext<Dates>({} as Dates);
export const DateDispatchContext = createContext<React.Dispatch<any>>(() => {});

export function DatesProvider({ children }: { children: React.ReactNode }) {
    const [dates, dispatch] = useReducer(datesReducer, initialDates);
    return(
        <DateContext.Provider value={dates}>
            <DateDispatchContext.Provider value={dispatch}>
                {children}
            </DateDispatchContext.Provider>
        </DateContext.Provider>
    )
}

export function useDates() {
    return useContext(DateContext);
  }
  
export function useDatesDispatch() {
    return useContext(DateDispatchContext);
}

function datesReducer(dates: Dates, action: { type: string, date: Dayjs; }) {
    switch(action.type){
        case "SET_START_DATE":
            return {
                ...dates,
                startDate: action.date
            }
        case "SET_END_DATE":
            return{
                ...dates,
                endDate: action.date
            }
        default:
            throw Error('Unknown action: ' + action.type);
    }

}
const initialDates: Dates = {
    startDate: dayjs('2023-04-01'),
    endDate: dayjs('2023-04-07')
};