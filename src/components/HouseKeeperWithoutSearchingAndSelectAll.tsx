import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { ChangeEvent, useState } from 'react';
import { useHouseKeepers, useHouseKeepersDispatch } from '../contexts/HouseKeepersContext';
import maids from '../data/maids.json';
import './styles.css';

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '11rem',
    height: '20rem'
  };
  
export const HouseKeepers = () => {
    const maidsList = maids;
    const houseKeepers = useHouseKeepers();
    const dispatch = useHouseKeepersDispatch();
    const [selectAll, setSelectAll] = useState(Boolean);
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


    return (
        <Box className="tmpClass" >
            <Box sx={{ position: 'sticky', top: '0' }}>
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
                                checked={!!houseKeepers.find(item => maid.id === item.id)}
                                defaultChecked={false}
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
    );
}

