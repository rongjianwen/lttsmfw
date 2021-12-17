import { createSlice } from '@reduxjs/toolkit';

export interface SidebarState {
    open: boolean;
}

const initialState: SidebarState = {
    open: true
};

const slice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggle: (state) => {
            state.open = !state.open;
        }
    }
});

export default slice;
