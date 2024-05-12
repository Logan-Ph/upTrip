import axios from "./axios";

const options = {
	withCredentials: true
};

export async function fetchTripAutoComplete(keyword) {
	return axios
		.post(`/oauth/v0/autocomplete`, { keyword }, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export async function fetchQuickSearchHotels({ keyword, pageIndex }) {
	return axios
		.post(`/quick-search/hotels`, { keyword, pageIndex }, options)
		.then(res => res.data.hotels)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function fetchQuickSearchAttractions({ keyword, pageIndex }) {
	return axios
		.post(`/quick-search/attractions`, { keyword, pageIndex }, options)
		.then(res => res.data.attractions)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function fetchSpecificHotel(payload) {
	return axios
		.post(`/advanced-search-specific/hotels`, payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function fetchHotelAdvancedSearch(payload) {
	return axios
		.post(`/advanced-search/hotels`, payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function fetchHotelPriceComparison(payload) {
	return axios
		.post(`/price-comparison/hotels`, payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function fetchFlightAdvancedSearch(payload) {
	return axios
		.post("advanced-search/flights", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}
export function fetchTripComFlight(payload) {
	return axios
		.post("search-tripcom-flights", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}
export function fetchMyTripFlight(payload) {
	return axios
		.post("search-my-trip-flights", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}
export function fetchBayDepFlight(payload) {
	return axios
		.post("search-bay-dep-flights", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function fetchFlightAutocomplete(keyword) {
	const payload = {
		input: keyword
	};
	return axios
		.post("flight-search-autocomplete", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function fetchAttractionsAutocomplete(keyword) {
	return axios
		.post("/attractions/autocomplete", { keyword }, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function fetchToursAutocomplete(keyword) {
	return axios
		.post("/tours/autocomplete", { keyword }, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function fetchAttractions(payload) {
	return axios
		.post("/attractions", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function fetchTours(payload) {
	return axios
		.post(
			"/tours",
			{ cityId: payload.id, pageIndex: payload.pageIndex },
			options
		)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function getAppConfig() {
	return axios
		.get("/get-app-config", options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function getNearByHotels(payload) {
	return axios
		.post("/near-by-hotels", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function getHotelInfo(payload) {
	return axios
		.post("/hotel-info", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function getHotelAlbums(payload) {
	return axios
		.post("/hotel-albums", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function getHotelComments(payload) {
	return axios
		.post("/hotel-comments", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function fetchFavorites() {
    return axios
        .get("/fetch-favorites", options)
        .then((res) => res.data)
        .catch((er) => {
            return Promise.reject(new Error(er.response.data.message));
        });
}
