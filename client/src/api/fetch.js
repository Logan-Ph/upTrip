import axios from "./axios";

const options = {
    withCredentials: true,
};

export async function fetchTripAutoComplete(keyword) {
    return axios
        .post(`/oauth/v0/autocomplete`, { keyword }, options)
        .then((res) => res.data)
        .catch((er) => {
            return Promise.reject(new Error(er.response.data.message));
        });
}

export async function fetchQuickSearchHotels(keyword) {
    return axios
        .get(`/quick-search/hotels/${keyword}`, options)
        .then((res) => res.data.hotels)
        .catch((er) => {
            return Promise.reject(new Error(er.response.data.message));
        });
}

export function fetchQuickSearchAttractions(keyword) {
    return axios
        .get(`/quick-search/attractions/${keyword}`, options)
        .then((res) => res.data.attractions)
        .catch((er) => {
            return Promise.reject(new Error(er.response.data.message));
        });
}

export function fetchHotelAdvancedSearch(payload) {
    return axios
        .post(`/advanced-search/hotels`, payload, options)
        .then((res) => res.data)
        .catch((er) => {
            return Promise.reject(new Error(er.response.data.message));
        });
}

export function fetchHotelPriceComparison(payload) {
    return axios
        .post(`/price-comparison/hotels`, payload , options)
        .then((res) => res.data)
        .catch((er) => {
            return Promise.reject(new Error(er.response.data.message));
        });
}
