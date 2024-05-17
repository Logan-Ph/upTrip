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
			return Promise.reject(er);
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

export function fetchCollections() {
	return axios
		.get("/fetch-collection", options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data));
		});
}

export function addHotelToCollection(payload) {
	return axios
		.post("/add-to-collection/hotel", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data));
		});
}

export function addExperienceToCollection(payload) {
	return axios
		.post("/add-to-collection/experience", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data));
		});
}

export function fetchFavoriteItems(payload) {
	return axios
		.get(`/favorite-items`, { params: payload }, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data));
		});
}

export function addFlightToCollection(payload, collectionId) {
	return axios
		.post("/add-to-collection/flight", { payload, collectionId }, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data));
		});
}

export function addNewCollection(name, description) {
	if (!name) {
		return Promise.reject("Name is required");
	}
	return axios.post("/add-new-collection", { name, description }, options);
}

export function addNewItinerary(payload) {
	return axios.post("/add-new-itinerary", payload, options);
}

export function fetchItinerary() {
	return axios.get("/fetch-itinerary", options);
}

export function deleteItinerary(payload) {
	return axios.post("/delete-itinerary", payload, options);
}

export function fetchDetailItinerary(payload) {
	return axios.post("/fetch-detail-itinerary", payload, options)
		.then(res => res.data)
		.catch(er => {
			return Promise.reject(new Error(er.response.data.message));
		});
}

export function editItinerary(payload) {
	return axios.post("/edit-itinerary", payload, options)
}

export function addFlightItinerary(payload) {
	return axios.post("/add-to-itinerary/flight", payload, options)
}
export function deleteFlightItinerary(payload) {
	return axios.post("/delete-from-itinerary/flight", payload, options)
}
export function addHotelItinerary(payload) {
	return axios.post("/add-to-itinerary/hotel", payload, options)
}

export function deleteHotelFromItinerary(payload) {
	return axios.post("/delete-from-itinerary/hotel", payload, options)
}

export function addExperienceItinerary(payload) {
	return axios.post("/add-to-itinerary/experience", payload, options)
}

export function deleteExperienceFromItinerary(payload) {
	return axios.post("/delete-from-itinerary/experience", payload, options)
}

export function deleteHotelFromCollection(payload) {
	return axios.post("/delete-from-collection/hotel", payload, options)
}

export function deleteExperienceFromCollection(payload) {
	return axios.post("/delete-from-collection/experience", payload, options)
}

