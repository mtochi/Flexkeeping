import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDatesDispatch } from '../contexts/DateContext';
import { useDates } from '../contexts/DateContext';
import { BarChartComponent } from './BarChart';
import { DoughnutChart } from './DoughnutChart';
import { HouseKeepers } from './HouseKeepers';
import { Spaces } from './Spaces';


export const Cleanups = () => {
  const dispatch = useDatesDispatch();
  const dates = useDates();
  const isMobile = useMediaQuery('(max-width:420px)');

  return (
    //These rules can be deleted
    <Box className="mainContainer" sx={{ paddingTop: '3rem', width: '100%', height: isMobile ? '100%':'100vh'}}>  

      <Grid container rowSpacing={4} columnSpacing={3} sx={{ alignItems: 'flex-start' }}>

        
        <Grid item md={6} xs={12}>
        
        <Box
  display="flex"
  justifyContent="right"
>


          <DatePicker
          label="Date From" 
            minDate={dayjs('2023-04-01')}
            maxDate={dayjs('2023-04-07')}
            onChange={(e) => {
              dispatch({
                type: 'SET_START_DATE',
                date: e,
              });
            }} />
            </Box>
        </Grid>

        <Grid item md={6} xs={12}>
        <Box
  display="flex"
  justifyContent="left"
>
          <DatePicker
          label="Date To" 
            minDate={dayjs('2023-04-01')}
            maxDate={dayjs('2023-04-07')}
            onChange={(e) => {
              dispatch({
                type: 'SET_END_DATE',
                date: e,
              });
            }} />
            </Box>
        </Grid>
            </Grid>
        {
          isMobile ? (


            <Grid container rowSpacing={3} columnSpacing={0}>
               <Grid item xs={12} md={2}>
          <Box sx={{ height: '200px', overflowY: 'scroll'}}>
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
              <BarChartComponent/>
              </Grid>
             
            </Grid>
          ) : (

            <Grid container rowSpacing={3} columnSpacing={3} sx={{paddingTop: '3rem'}}>
                      <Grid item xs={12} md={2}>
          <Box sx={{ height: '500px', overflowY: 'scroll' }}>
            <HouseKeepers />
          </Box>
        </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{height: '500px',}}>
              <DoughnutChart />
              </Box>
              
            </Grid>
            <Grid item xs={12} md={4}>
            <Box sx={{height: '500px',}}>
            <BarChartComponent/>
            </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ height: '500px', overflowY: 'scroll' }}>
                <Spaces />
              </Box>
            </Grid>
            </Grid>)
        }
    </Box>
  );
}

