import { BaseAPI } from "shared/infrastructure/services/baseAPI";

export namespace countryService {
    export const getCountries = () => BaseAPI.get(`/all`);
}