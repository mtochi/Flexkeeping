import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDatesDispatch } from '../contexts/DateContext';
import { ScrollableListContainer } from './Containers/ScrollableListContainer';
import { HouseKeepers } from './HouseKeepers/HouseKeepers';
import { Spaces } from './Spaces/Spaces';
import { SpacesBarChart } from './charts/SpacesBarChart';
import { HouseKepeersDoughtnutChart } from './charts/HouseKeepersDoughnutChart';

export const Cleanups = () => {
  const dispatch = useDatesDispatch();
  const isMobile = useMediaQuery('(max-width:420px)');
  const isTablet = useMediaQuery('(max-width:820px)');
  return (
    <Box className="mainContainer" sx={{ paddingTop: '3rem', width: '100%', height: isMobile ? '100%' : '100vh' }}>

      <Grid container rowSpacing={4} columnSpacing={3} sx={{ alignItems: 'flex-start' }}>


        <Grid item md={6} xs={12}>

          <Box
            display="flex"
            justifyContent={isMobile || isTablet ? 'center' : "right"}
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
            justifyContent={isMobile || isTablet ? 'center' : "left"}
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
              <Box sx={{ height: '200px', overflowY: 'scroll' }}>
                <ScrollableListContainer>
                  <HouseKeepers />
                </ScrollableListContainer>

              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ height: '200px', overflowY: 'scroll' }}>
                <ScrollableListContainer>
                  <Spaces />
                </ScrollableListContainer>

              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <HouseKepeersDoughtnutChart />
            </Grid>
            <Grid item xs={12} md={4}>
              <SpacesBarChart />
            </Grid>

          </Grid>
        ) : (

          <Grid container rowSpacing={3} columnSpacing={3} sx={{ paddingTop: '3rem' }}>
            <Grid item xs={12} md={2}>
              <Box sx={{ height: '500px', overflowY: 'scroll' }}>
                <ScrollableListContainer>
                  <HouseKeepers />
                </ScrollableListContainer>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ height: '500px', }}>
                <HouseKepeersDoughtnutChart />
              </Box>

            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: '500px', }}>
                <SpacesBarChart />
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ height: '500px', overflowY: 'scroll' }}>
                <ScrollableListContainer>
                  <Spaces />
                </ScrollableListContainer>
              </Box>
            </Grid>
          </Grid>)
      }
    </Box>
  );
}

