import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatesProvider } from './contexts/DateContext';
import { HouseKeepersProvider } from './contexts/HouseKeepersContext';
import { SpacesProvider } from './contexts/SpacesContext';
import { Cleanups } from './components/Cleanups';
import './App.css';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <HouseKeepersProvider>
          <SpacesProvider>
            <DatesProvider>
              <Cleanups />
            </DatesProvider>
          </SpacesProvider>
        </HouseKeepersProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
