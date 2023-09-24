import React from 'react';
import MultiSelect from 'react-native-multiple-select';
import { ListItem } from '../../ts/interfaces/items-interfaces';

interface Props {
    items: ListItem[],
    selectedItems: string[],
    setSelectedItems: Function
}

const SelectBox = ({ items, selectedItems, setSelectedItems }: Props) => {

    return (
        <MultiSelect
            hideSubmitButton={true}
            uniqueKey="id"
            displayKey="name"
            items={items}
            onSelectedItemsChange={(items: string[]) => setSelectedItems([...items])}
            selectedItems={selectedItems}
            selectText="Selecione suas feiras"
            searchInputPlaceholderText="Busque os itens"
            tagRemoveIconColor="#5e35b1"
            tagBorderColor="#5e35b1"
            textColor='#424242'
            tagTextColor="#5e35b1"
            selectedItemTextColor="#5e35b1"
            selectedItemIconColor="#5e35b1"
            itemTextColor="#5e35b1"
            styleListContainer={{ height: 128 }}
            searchInputStyle={{ color: '#5e35b1', height: 50 }}
            submitButtonColor="#5e35b1"
            styleIndicator={{ height: 32, borderColor: '#5e35b1' }}
        />
    );
};

export default SelectBox;