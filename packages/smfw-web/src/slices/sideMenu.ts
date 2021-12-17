import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import updateMenu from '../utils/updateMenu';

const defaultMenu = {
    id: 'root',
    label: 'root',
    open: false,
    children: []
};

export interface SideMenuState {
    menu: any;
}

const initialState: SideMenuState = {
    menu: defaultMenu
};

const slice = createSlice({
    name: 'sideMenu',
    initialState,
    reducers: {
        updateMenu: (state, action: PayloadAction<any>) => {
            const { id, menu } = action.payload;
            updateMenu(state, 'menu', id, menu);
        }
    }
});

export default slice;
