import axios from "./axios";

const options = {
    withCredentials: true
}

export async function fetchQuickSearchHotels(keyword){
    return axios.get(`/quick-search/hotels/${keyword}`,options)
    .then(res => res.data.hotels)
    .catch(er => {throw new Error(er.response.data.message)})
}

export function fetchQuickSearchAttractions(keyword){
    return axios.get(`/quick-search/attractions/${keyword}`,options)
    .then(res => res.data.attractions)
    .catch(er => er)
}