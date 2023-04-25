import Box from '@mui/material/Box';
import { ChangeEvent, useState } from 'react';
import { useSpaces, useSpacesDispatch } from '../contexts/SpacesContext';
import spaces from '../data/spaces.json';

export const Spaces = () => {
    const spacesList = spaces;
    const cleanups = useSpaces();
    const dispatch = useSpacesDispatch();
    const [selectAll, setSellectAll] = useState(Boolean);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSpaces = spacesList.filter(space => {
        return space.title.toString().includes(searchTerm.toLowerCase());
      });
    console.log(cleanups)

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) =>{
        const isChecked = event.target.checked;
        console.log("Select all ", isChecked);
        if(isChecked){
            setSellectAll(true);
            spacesList.map(space => {
                dispatch({
                    type: 'SET_SPACES',
                    id: space.id,
                    title: space.title
                });
            })
        }else{
            setSellectAll(false)
            spacesList.map(space => {
                dispatch({
                    type: 'REMOVE_ALL_SPACES',
                })
            })
        }
    }
    return (
        <div>
            <Box sx={{position: 'sticky', top: 0, backgroundColor: 'white'}}>
            <h2 style={{ textAlign: "center" }}>Spaces</h2>
            <input type="checkbox" value={"Select all"} checked={selectAll} onChange={(e) => handleSelectAll(e)}/>
            <label>Select all</label><br></br>
            <input type="text" placeholder="Search spaces" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            </Box>
            

            {filteredSpaces.map(space => (
                <div key={space.id}>
                    <input type="checkbox" value={space.id} checked={cleanups.find(item=>space.id ===item.id)} onChange={(e) => {
                        console.log("HEREEEEEEEEEEEEEEEE");
                        console.log(e.target.value);
                        console.log("CLEANUPS")
                        const isChecked = e.target.checked;
                        if (isChecked) {
                            dispatch({
                                type: 'SET_SPACES',
                                id: space.id,
                                title: space.title
                            });
                        }
                        else {
                            setSellectAll(false);
                            dispatch({
                                type: 'REMOVE_SPACES',
                                id: space.id
                            })
                        }
                    }} />
                    <label>{space.title}</label>
                </div>
            ))}

        </div>
    );
}

