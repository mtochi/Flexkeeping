import { Box } from '@mui/material';
import { CheckboxList } from './CleanupsCheckboxList';
import { getAllMaids } from '../services/data.service';
import { useEffect, useState } from 'react';
import { useHouseKeepers, useHouseKeepersDispatch } from '../contexts/HouseKeepersContext';
import { Item } from '../types';

export const HouseKeepers = () => {

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
            } catch (error) {
                console.error('Error fetching maids:', error);
            }finally {
                setIsLoading(false);
              }
        }
        fetchData();
    }, []);
    return (
        <Box>
            <CheckboxList
                listOfItems={maidsList}
                isLoading={isLoading}
                dispatchForSettingItem={dispatchForSettingItem}
                dispatchForRemovingAllItems={dispatchForRemovingAllItems}
                dispatchForRemovingItem={dispatchForRemovingItem}
                stateItems={houseKeepers} />
        </Box>
    );
}

