import { setCountries } from "./countrySlice";
import { countryService } from "../services/http";

export const getAllCountries = () => async (dispatch: any) => {
    try {
        const response = await countryService.getCountries()
        dispatch(setCountries({countries: response?.data}))

    } catch (error: any) {
        return {status: error.response.status, message: error.code}
    }
}