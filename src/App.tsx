import './App.css';
import { Cleanups } from './components/Cleanups';
import { HouseKeepersProvider} from './contexts/HouseKeepersContext';
import { SpacesProvider } from './contexts/SpacesContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatesProvider } from './contexts/DateContext';
import { ScrollableListContainer } from './components/ScrollableListContainer';
import { getAllMaids } from './services/data.service';
import { CheckboxList } from './components/CheckboxList';

function App() {
  return (
    <div className="App">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HouseKeepersProvider>
        <SpacesProvider>
        <DatesProvider>
          <Cleanups/>
         
          </DatesProvider>
        </SpacesProvider>
      </HouseKeepersProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
