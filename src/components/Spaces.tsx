import { Checkbox } from '@mui/material';
import { useSpaces, useSpacesDispatch } from '../contexts/SpacesContext';
import spaces from '../data/spaces.json';

export const Spaces = () => {
    const spacesList = spaces;
    const cleanups = useSpaces();
    const dispatch = useSpacesDispatch();
    console.log(cleanups)
    return (
        <div>
            <h1>Spaces</h1>

            {spacesList.map(space => (
                <div key={space.id}>
                    <input type="checkbox" value={space.id} onChange={(e) => {
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

