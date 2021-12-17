import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as defaultSlices from '../../slices';
import * as appSlices from '../slices';
import createStore from '../../store';
import createReducer from '../../reducer';

const mode = process.env.mode ? process.env.mode : 'development';
const middlewares = mode === 'development' ? [thunk, logger] : [thunk];

const store = createStore(createReducer({ ...defaultSlices, ...appSlices }), middlewares);

export default store;
