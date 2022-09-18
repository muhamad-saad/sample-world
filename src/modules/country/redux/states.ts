
export type CountryState = {
    countries: [],
    country: null | any,
    mode: string,
}

const initialCountryState: CountryState = {
    countries: [],
    country: null,
    mode: 'light'
}

export default initialCountryState