import { createSlice } from '@reduxjs/toolkit';

const fullYear = new Date().getFullYear();

export interface CopyrightState {
    text: string;
}

const initialState: CopyrightState = {
    text: `All Rights Reserved By RJFW @${fullYear}`
};

const slice = createSlice({
    name: 'copyright',
    initialState,
    reducers: {}
});

export default slice;
