import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import updateMenu from '../utils/updateMenu';

const defaultMenu = {
    id: 'root',
    icon: 'more_horiz',
    label: '',
    open: false,
    children: []
};

export interface NavMenuState {
    menu: any;
    mobileMenu: any;
}

const initialState: NavMenuState = {
    menu: defaultMenu,
    mobileMenu: _.cloneDeep(defaultMenu)
};

const slice = createSlice({
    name: 'navMenu',
    initialState,
    reducers: {
        updateMenu: (state, action: PayloadAction<any>) => {
            const { id, menu } = action.payload;
            updateMenu(state, 'menu', id, menu);
        },
        updateMobileMenu: (state, action: PayloadAction<any>) => {
            const { id, menu } = action.payload;
            updateMenu(state, 'mobileMenu', id, menu);
        }
    }
});

export default slice;
