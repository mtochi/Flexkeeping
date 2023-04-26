import './App.css';
import { Cleanups } from './components/Cleanups';
import { HouseKeepersProvider} from './contexts/HouseKeepersContext';
import { SpacesProvider } from './contexts/SpacesContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatesProvider } from './contexts/DateContext';
import { ScrollableListContainer } from './components/ScrollableListContainer';
import { getAllMaids } from './services/data.service';

function App() {
  console.log("getAllMaids");
  let maids = getAllMaids().then((data) => console.log(data));
  console.log(maids)
  return (
    <div className="App">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HouseKeepersProvider>
        <SpacesProvider>
        <DatesProvider>
          <Cleanups/>
          <ScrollableListContainer/>
          </DatesProvider>
        </SpacesProvider>
      </HouseKeepersProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
