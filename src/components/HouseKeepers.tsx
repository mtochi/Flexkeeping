

import { Box } from '@mui/material';
import { CheckboxList } from './CheckboxList';
import { getAllMaids } from '../services/data.service';
import { useEffect, useState } from 'react';
import { useHouseKeepers, useHouseKeepersDispatch } from '../contexts/HouseKeepersContext';

type Item = { id: string; name: string } | { id: number; title: string };
export const HouseKeepers = () => {

    //HOUSEKEEPERS
    const [maidsList, setMaidsList] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useHouseKeepersDispatch();
    const houseKeepers = useHouseKeepers();

    const dispatchForSettingItem = (item: Item) => {
        if ('name' in item) {
            dispatch({
                type: 'SET_HOUSEKEEPERS',
                id: item.id,
                name: item.name
            });
        }
    }
    const dispatchForRemovingAllItems = () => {
        dispatch({
            type: 'REMOVE_ALL_HOUSEKEEPERS',
        })
    }

    const dispatchForRemovingItem = (item: Item) => {
        dispatch({
            type: 'REMOVE_HOUSEKEEPERS',
            id: item.id
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
            const data = await getAllMaids();
            setMaidsList(data);
            setIsLoading(false);
            } catch (error) {
            console.error('Error fetching maids:', error);
            }}
            fetchData();
      }, []);
      if (isLoading) {
        return <p>Loading...</p>;
        }
  return (
    <Box>
        <CheckboxList 
        listOfItems={maidsList} 
        isLoading={isLoading}
        dispatchForSettingItem={dispatchForSettingItem} 
        dispatchForRemovingAllItems={dispatchForRemovingAllItems} 
        dispatchForRemovingItem = {dispatchForRemovingItem}
        stateItems={houseKeepers}/>
    </Box>
  );
}

