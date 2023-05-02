import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import { Item } from "../types";


type CheckboxListProps = {
    listOfItems: Item[];
    dispatchForSettingItem: (item: Item) => void;
    dispatchForRemovingItem: (item: Item) => void;
    dispatchForRemovingAllItems: () => void;
    isLoading: boolean;
    stateItems: Item[];
  }

export const CheckboxList: React.FC<CheckboxListProps> = ({listOfItems, dispatchForSettingItem, dispatchForRemovingAllItems, dispatchForRemovingItem, stateItems, isLoading}) => {
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectAll(true);
            listOfItems.map((item: any) => {
                dispatchForSettingItem(item);
            })
        } else {
            setSelectAll(false)
            dispatchForRemovingAllItems();
        }
    }

    const filteredItems = listOfItems.filter(item => {
        if ('name' in item) {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
 
        }else{ //title in item
            return item.title.toString().includes(searchTerm.toLowerCase());
        }
    });

    useEffect(() => {
        setSelectAll(true);
    }, [])

    useEffect(() => {
        if (selectAll) {
          listOfItems.forEach((item) => {
            dispatchForSettingItem(item);
          });
        }
      }, [selectAll]);
      if (isLoading) {
        return <p>Loading...</p>;
        }
    return(
<Box>
        <Box sx={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '100' }}>
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

        {filteredItems.map(item => (
                <Box key={item.id} sx={{alignItems: 'flex-start' }}>
                    <FormControlLabel
                        value={item.id}
                        sx={{}}
                        control={
                            <Checkbox
                                value={item.id}
                                checked={selectAll || !!stateItems.find(temp => temp.id === item.id)}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    if (isChecked) {
                                        dispatchForSettingItem(item)
                                    }
                            
                                    else {
                                        setSelectAll(false);
                                        dispatchForRemovingItem(item)
                                    }
                                }}
                            />

                        }
                        label={'name' in item? item.name: item.title}
                        labelPlacement="end"
                    />
                </Box>
            ))}
</Box>
    )
}