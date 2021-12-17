import _ from 'lodash';

function createReducer(slice: any) {
    const reducer: any = {};
    _.forEach(slice, (v: any, i: any) => {
        reducer[i] = v.reducer;
    });
    return reducer;
}

export default createReducer;
