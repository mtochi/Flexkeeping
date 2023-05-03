

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSpacesDispatch, useSpaces } from '../../contexts/SpacesContext';
import { getAllSpaces } from '../../services/data.service';
import { Item } from '../../types';
import { CleanupsCheckboxList } from '../Containers/CleanupsCheckboxList';



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
            } catch (error) {
                console.error('Error fetching spaces:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);
    return (
        <Box>
            <CleanupsCheckboxList
                listOfItems={spacesList}
                isLoading={isLoading}
                dispatchForSettingItem={dispatchForSettingItem}
                dispatchForRemovingAllItems={dispatchForRemovingAllItems}
                dispatchForRemovingItem={dispatchForRemovingItem}
                stateItems={spaces} />
        </Box>
    );
}

