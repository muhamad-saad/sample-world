import { createSlice } from '@reduxjs/toolkit';
import initialCountryState from './states';
import type { CountryState } from "./states"
import { RootState } from 'shared/infrastructure/redux/reducers';

export const countrySlice = createSlice({
    name: 'country',
    initialState: initialCountryState,
    reducers: {
        setCountries:(state: CountryState, action: any) => {
            state.countries = action.payload.countries;
        },
        setCountry:(state: CountryState, action: any) => {
            state.country = action.payload.country;
        },
        setMode:(state: CountryState, action: any) => {
            state.mode = action.payload.mode;
        },
        resetCountryState: (state: CountryState) => {
            state.country = null
            state.countries = []
            state.mode = 'light'
        },
    },
});


export const getCountries = (state: RootState) => state.country.countries;
export const getCountry = (state: RootState) => state.country.country;
export const getMode = (state: RootState) => state.country.mode;

export const { setMode, setCountries, setCountry, resetCountryState } = countrySlice.actions;

export default countrySlice.reducer;