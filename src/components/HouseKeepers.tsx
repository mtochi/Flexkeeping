import { ChangeEvent, useState } from 'react';
import { useHouseKeepersDispatch } from '../contexts/HouseKeepersContext';
import maids from '../data/maids.json';

export const HouseKeepers = () => {
    const maidsList = maids;
    const dispatch = useHouseKeepersDispatch();
    const [selectAll, setSellectAll] = useState(Boolean);
    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) =>{
        const isChecked = event.target.checked;
        console.log("Select all ", isChecked);
        if(isChecked){
            setSellectAll(true)
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
                    type: 'REMOVE_HOUSEKEEPERS',
                    id: maid.id
                })
            })
        }
    }

    return (
        <div>
            <h1>Housekeepers</h1>
            <input type="checkbox" value={"Select all housekeepers"} onChange={(e) => handleSelectAll(e)}/>
            <label>Select all housekeepers</label>
            {maidsList.map(maid => (
                <div key={maid.id}>
                    <input type="checkbox" value={maid.id} checked={selectAll} onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                            dispatch({
                                type: 'SET_HOUSEKEEPERS',
                                id: maid.id,
                                name: maid.name
                            });
                        }
                        else {
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

