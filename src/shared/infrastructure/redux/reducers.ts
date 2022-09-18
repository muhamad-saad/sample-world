import { combineReducers } from 'redux'

import countrySlice from 'modules/country/redux/countrySlice';

const reducers = combineReducers({
    country: countrySlice,
})

export default reducers;

export type RootState = ReturnType<typeof reducers>;