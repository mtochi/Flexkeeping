import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSpaces, useSpacesDispatch } from '../contexts/SpacesContext';
import { getAllSpaces } from '../services/data.service';

export const Spaces = () => {
    const [spacesList, setSpacesList] = useState<{id: number, title: string}[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const cleanups = useSpaces();
    const dispatch = useSpacesDispatch();
    const filteredSpaces = spacesList.filter(space => {
        return space.title.toString().includes(searchTerm.toLowerCase());
    });
    
    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        console.log("Select all ", isChecked);
        if (isChecked) {
            setSelectAll(true);
            spacesList.map(space => {
                dispatch({
                    type: 'SET_SPACES',
                    id: space.id,
                    title: space.title
                });
            })
        } else {
            setSelectAll(false)
                dispatch({
                    type: 'REMOVE_ALL_SPACES',
                })
        }
    }

    useEffect(() => {
        setSelectAll(true);
        getAllSpaces().then((data) => {
          setSpacesList(data);
        });
      }, []);

      useEffect(() => {
        if (selectAll) {
            spacesList.map(space => {
                dispatch({
                    type: 'SET_SPACES',
                    id: space.id,
                    title: space.title
                });
            })
        } else {
          dispatch({ type: 'REMOVE_SPACES' });
        }
      }, [selectAll]);
      
    return (
        <Box>
            <Box sx={{ position: 'sticky' , top: '0', backgroundColor: 'white', zIndex: '100'}}>
                <TextField id="standard-basic" label="Search spaces" variant="standard" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

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


            {filteredSpaces.map(space => (
                <Box key={space.id} sx={{ }}>

                    <FormControlLabel
                        value={space.id}
                        sx={{}}
                        control={
                            <Checkbox
                                value={space.id}
                                checked={selectAll || !!cleanups.find(item => space.id === item.id)}
                                defaultChecked={false}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    if (isChecked) {
                                        dispatch({
                                            type: 'SET_SPACES',
                                            id: space.id,
                                            title: space.title
                                        });
                                    }
                                    else {
                                        setSelectAll(false);
                                        dispatch({
                                            type: 'REMOVE_SPACES',
                                            id: space.id
                                        })
                                    }
                                }}
                            />

                        }
                        label={space.title}
                        labelPlacement="end"
                    />
                </Box>
            ))}

        </Box>
    );
}

