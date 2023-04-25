import Box from '@mui/material/Box';
import { ChangeEvent, useState } from 'react';
import { useHouseKeepers, useHouseKeepersDispatch } from '../contexts/HouseKeepersContext';
import maids from '../data/maids.json';

export const HouseKeepers = () => {
    const maidsList = maids;
    const houseKeepers = useHouseKeepers();
    const dispatch = useHouseKeepersDispatch();
    const [selectAll, setSellectAll] = useState(Boolean);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) =>{
        const isChecked = event.target.checked;
        console.log("Select all ", isChecked);
        if(isChecked){
            setSellectAll(true);
            maidsList.map(maid => {
                dispatch({
                    type: 'SET_HOUSEKEEPERS',
                    id: maid.id,
                    name: maid.name
                });
            })
        }else{
            setSellectAll(false)
            maidsList.map(maid => {
                dispatch({
                    type: 'REMOVE_ALL_HOUSEKEEPERS',
                })
            })
        }
    }

    const filteredHouseKeepers = maidsList.filter(maid => {
        console.log(searchTerm)
        console.log(maid.name.includes(searchTerm))
        return maid.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    return (
        <div>
            <Box sx={{position: 'sticky', top: '0', backgroundColor: 'white'}}>
                <h2 style={{ textAlign: "center" }}>Housekeepers</h2>
                <input type="checkbox" value={"Select all housekeepers"} checked={selectAll} onChange={(e) => handleSelectAll(e)}/>
                <label>Select all</label><br></br>
                <input type="text" placeholder="Search spaces" value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} />
    
            </Box>
            
            {filteredHouseKeepers.map(maid => (
                <div key={maid.id}>
                    <input type="checkbox" value={maid.id} checked={houseKeepers.find(item=>maid.id ===item.id)} onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                            dispatch({
                                type: 'SET_HOUSEKEEPERS',
                                id: maid.id,
                                name: maid.name
                            });
                        }
                        else {
                            setSellectAll(false);
                            dispatch({
                                type: 'REMOVE_HOUSEKEEPERS',
                                id: maid.id
                            })
                        }
                    }} />
                    <label>{maid.name}</label>
                </div>
            ))}

        </div>
    );
}

