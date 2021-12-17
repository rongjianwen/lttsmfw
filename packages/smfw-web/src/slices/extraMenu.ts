import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import updateMenu from '../utils/updateMenu';

const defaultMenu = {
    id: 'root',
    icon: 'settings',
    label: '',
    open: false,
    children: []
};

export interface ExtraMenuState {
    menu: any;
}

const initialState: ExtraMenuState = {
    menu: defaultMenu
};

const slice = createSlice({
    name: 'extraMenu',
    initialState,
    reducers: {
        updateMenu: (state, action: PayloadAction<any>) => {
            const { id, menu } = action.payload;
            updateMenu(state, 'menu', id, menu);
        }
    }
});

export default slice;
