import { createSlice } from '@reduxjs/toolkit';

export interface OutlinerState {
    open: boolean;
}

const initialState: OutlinerState = {
    open: true
};

const slice = createSlice({
    name: 'outliner',
    initialState,
    reducers: {
        toggle: (state) => {
            state.open = !state.open;
        }
    }
});

export default slice;
