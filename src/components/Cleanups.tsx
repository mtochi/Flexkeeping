import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
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
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={3} columnSpacing={0} sx={{ marginTop: 3 }}>
        <Grid item md={6} xs={12}>
          <DatePicker
            minDate={dayjs('2023-04-01')}
            maxDate={dayjs('2023-04-07')}
            onChange={(e) => {
              dispatch({
                type: 'SET_START_DATE',
                date: e,
              });
            }} />
        </Grid>
        <Grid item md={6} xs={12}>

          <DatePicker
            minDate={dayjs('2023-04-01')}
            maxDate={dayjs('2023-04-07')}
            onChange={(e) => {
              dispatch({
                type: 'SET_END_DATE',
                date: e,
              });
            }} />
        </Grid>

        {
          isMobile ? (


            <Grid container rowSpacing={3} columnSpacing={0}>
               <Grid item xs={12} md={2}>
          <Box sx={{ height: '250px', overflowY: 'scroll' }}>
            <HouseKeepers />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
                <Box sx={{ height: '200px', overflowY: 'scroll' }}>
                  <Spaces />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <DoughnutChart />
              </Grid>
              <Grid item xs={12} md={4}>
                <BarChart />
              </Grid>
             
            </Grid>
          ) : (
            <Grid container rowSpacing={3} columnSpacing={0}>
                      <Grid item xs={12} md={2}>
          <Box sx={{ height: '250px', overflowY: 'scroll' }}>
            <HouseKeepers />
          </Box>
        </Grid>
            
            <Grid item xs={12} md={4}>
              <DoughnutChart />
            </Grid>
            <Grid item xs={12} md={4}>
              <BarChart />
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ height: '200px', overflowY: 'scroll' }}>
                <Spaces />
              </Box>
            </Grid>
            </Grid>)
        }
      </Grid>
    </Box>
  );
}

