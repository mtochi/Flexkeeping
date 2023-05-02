

import { Box } from '@mui/material';
import { CheckboxList } from './CheckboxList';
import { getAllSpaces } from '../services/data.service';
import { useEffect, useState } from 'react';
import { useSpacesDispatch, useSpaces } from '../contexts/SpacesContext';
import {Item} from '../types';


export const Spaces = () => {
    const [spacesList, setSpacesList] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useSpacesDispatch();
    const spaces = useSpaces();

    const dispatchForSettingItem = (item: Item) => {
        if ('title' in item) {
            dispatch({
                type: 'SET_SPACES',
                id: item.id,
                title: item.title
            });
        }
    }
    const dispatchForRemovingAllItems = () => {
        dispatch({
            type: 'REMOVE_ALL_SPACES',
        })
    }

    const dispatchForRemovingItem = (item: Item) => {
        dispatch({
            type: 'REMOVE_SPACES',
            id: item.id
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
            const data = await getAllSpaces();
            setSpacesList(data);
            setIsLoading(false);
            } catch (error) {
            console.error('Error fetching spaces:', error);
            }}
            fetchData();
      }, []);
      if (isLoading) {
        return <p>Loading...</p>;
        }
  return (
    <Box>
        <CheckboxList 
        listOfItems={spacesList} 
        isLoading={isLoading}
        dispatchForSettingItem={dispatchForSettingItem} 
        dispatchForRemovingAllItems={dispatchForRemovingAllItems} 
        dispatchForRemovingItem = {dispatchForRemovingItem}
        stateItems={spaces}/>
    </Box>
  );
}

