import { createSlice } from '@reduxjs/toolkit';

export interface LogoState {
    text: string;
}

const initialState: LogoState = {
    text: 'SMCMS'
};

const slice = createSlice({
    name: 'logo',
    initialState,
    reducers: {}
});

export default slice;
