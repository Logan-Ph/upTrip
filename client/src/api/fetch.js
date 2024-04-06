import axios from "./axios";

export async function fetchQuickSearchHotels(keyword){
    return axios.get(`/quick-search/hotels/${keyword}`)
    .then(res => res.data.hotels)
    .catch(er => {throw new Error(er.response.data.message)})
}

export function fetchQuickSearchAttractions(keyword){
    return axios.get(`/quick-search/attractions/${keyword}`)
    .then(res => res.data.attractions)
    .catch(er => er)
}