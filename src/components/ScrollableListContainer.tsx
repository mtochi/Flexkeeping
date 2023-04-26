import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useSpaces, useSpacesDispatch } from '../contexts/SpacesContext';
import spaces from '../data/spaces.json';
import { Spaces } from './Spaces';

type ScrollableListContainerProps = {
  children?: React.ReactNode;
}
export const ScrollableListContainer: React.FC<ScrollableListContainerProps> = ({children}) => {

  return (
    <Paper sx={{ height: 500, overflow: 'auto'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        {/* <Box sx={{ position: 'sticky', top: 0, bgcolor: 'background.paper', p: 2 }}>
          <TextField id="search" label="Search" variant="outlined" value={""} fullWidth />
        </Box> */}

        {/* <Box sx={{ p: 2, height: '100%' }}> */}
        {children}
        {/* </Box> */}
      </Box>
    </Paper>


  );
};
