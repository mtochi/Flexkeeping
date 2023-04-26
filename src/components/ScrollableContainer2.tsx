import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ChangeEvent, useState } from 'react';
import { HouseKeepers } from './HouseKeepers';
import { Spaces } from './Spaces';
import { flexbox } from '@mui/system';

export const ScrollableContainer2 = () => {
  const [searchTerm, setSearchTerm] = useState("");


  return (
    <Paper sx={{ height: 'calc(100vh - 64px)', overflow: 'auto', width: '300px', display: 'flex', flexDirection:'column' }}>
      <Box sx={{ position: 'sticky', top: 0, bgcolor: 'background.paper', p: 2 }}>
        <TextField id="search" label="Search" variant="outlined" value={searchTerm} fullWidth />
      </Box>
      <Box sx={{ p: 2, height: '100%' }}>
          <Spaces/>
      </Box>
    </Paper>
  );
};