import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { slices as defaultSlices, createStore, createReducer } from '@smfw/web';

const mode = process.env.mode ? process.env.mode : 'development';
const middlewares = mode === 'development' ? [thunk, logger] : [thunk];

const store = createStore(createReducer({ ...defaultSlices }), middlewares);

export default store;
