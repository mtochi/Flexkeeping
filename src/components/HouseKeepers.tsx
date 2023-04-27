import { Checkbox, FormControlLabel, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { ChangeEvent, useEffect, useState } from 'react';
import { useHouseKeepers, useHouseKeepersDispatch } from '../contexts/HouseKeepersContext';
import { getAllMaids } from '../services/data.service';
import './styles.css';

export const HouseKeepers = () => {
    const [maidsList, setMaidsList] = useState<{id: number, name: string}[]>([]);
let maids = getAllMaids().then((data) => {return data;});
  console.log(maids)
    const houseKeepers = useHouseKeepers();
    const dispatch = useHouseKeepersDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        console.log("Select all ", isChecked);
        if (isChecked) {
            setSelectAll(true);
            maidsList.map(maid => {
                dispatch({
                    type: 'SET_HOUSEKEEPERS',
                    id: maid.id,
                    name: maid.name
                });
            })
        } else {
            setSelectAll(false)
            dispatch({
                type: 'REMOVE_ALL_HOUSEKEEPERS',
            })
        }
    }

    const filteredHouseKeepers = maidsList.filter(maid => {
        console.log(searchTerm)
        console.log(maid.name.includes(searchTerm))
        return maid.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    useEffect(() => {
        setSelectAll(true);
        getAllMaids().then((data) => {
          setMaidsList(data);
        });
      }, []);

      useEffect(() => {
        if (selectAll) {
          maidsList.forEach((maid) => {
            dispatch({
              type: 'SET_HOUSEKEEPERS',
              id: maid.id,
              name: maid.name
            });
          });
        } else {
          dispatch({ type: 'REMOVE_HOUSEKEEPERS' });
        }
      }, [selectAll]);

    return (
    //     <Paper sx={{ height: 300, overflow: 'auto', width: 300 }}>
    //   <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>

    //     {/* <Box sx={{ p: 2, height: '100%' }}> */}
    //     {/* </Box> */}
      
    
    <Box>
            <Box sx={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '100' }}>
                <TextField id="standard-basic" label="Search housekeepers" variant="standard" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <FormControlLabel
                        value={"Select all"}
                        control={
                        <Checkbox 
                        value={"Select all"} 
                        checked={selectAll} 
                        onChange={(e) => handleSelectAll(e)} 
                        />
                    }
                    label={"Select all"}
                        labelPlacement="end"
                        />
                        
            </Box>

            {filteredHouseKeepers.map(maid => (
                <Box key={maid.id} sx={{alignItems: 'flex-start' }}>
                    {/* style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}> */}

                    <FormControlLabel
                        value={maid.id}
                        sx={{}}
                        control={
                            <Checkbox
                                value={maid.id}
                                checked={selectAll || !!houseKeepers.find(item => maid.id === item.id)}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    if (isChecked) {
                                        dispatch({
                                            type: 'SET_HOUSEKEEPERS',
                                            id: maid.id,
                                            name: maid.name
                                        });
                                    }
                                    else {
                                        setSelectAll(false);
                                        dispatch({
                                            type: 'REMOVE_HOUSEKEEPERS',
                                            id: maid.id
                                        })
                                    }
                                }}
                            />

                        }
                        label={maid.name}
                        labelPlacement="end"
                    />
                </Box>
            ))}

</Box>
        // </Box>
        // </Paper>
    );
}

