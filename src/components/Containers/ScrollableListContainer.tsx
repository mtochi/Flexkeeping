import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

type ScrollableListContainerProps = {
  children?: React.ReactNode;
}
export const ScrollableListContainer: React.FC<ScrollableListContainerProps> = ({ children }) => {

  return (
    <Paper sx={{ height: 500, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        {children}
      </Box>
    </Paper>


  );
};
