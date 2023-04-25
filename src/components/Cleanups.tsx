import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useDatesDispatch } from '../contexts/DateContext';
import { useDates } from '../contexts/DateContext';
import { BarChart } from './BarChart';
import { DoughnutChart } from './DoughnutChart';
import { HouseKeepers } from './HouseKeepers';
import { Spaces } from './Spaces';

export const Cleanups = () => {
  const dispatch = useDatesDispatch();
  const dates = useDates();
  console.log(dates)

  return (
    <div>
        <DatePicker 
        minDate={dayjs('2023-04-01')} 
        maxDate={dayjs('2023-04-07')}
        onChange={(e) => {dispatch({
          type: 'SET_START_DATE',
          date: e,
      });}}/>

<DatePicker 
minDate={dayjs('2023-04-01')} 
maxDate={dayjs('2023-04-07')}
        onChange={(e) => {dispatch({
          type: 'SET_END_DATE',
          date: e,
      });}}/>
        <HouseKeepers/>
        <Spaces/>
        <DoughnutChart/>
        <BarChart/>
    </div>
        
  );
}

