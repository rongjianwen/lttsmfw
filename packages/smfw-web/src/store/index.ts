import _ from 'lodash';
import { configureStore } from '@reduxjs/toolkit';

function createStore(rootReducer: any, middleware: any[] = []) {
    return configureStore({
        reducer: rootReducer,
        middleware,
        devTools: process.env.NODE_ENV === 'development'
    });
}

export default createStore;
