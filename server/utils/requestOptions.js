// pageIndex: 1, -> page number
// pageSize: 18, -> number of items per page
// keyword: "hanoi", -> search keyword
// tab: "restaurant",
// tab: "hotel",
// tab: "mixlist", -> tour and attractions
const quickSearchTripOptions = {
    lang: "en",
    locale: "en-US",
    currency: "VND",
    head: {
        cver: "3.0",
        syscode: "999",
        locale: "en-US",
        extension: [
            {
                name: "locale",
                value: "en-US",
            },
            {
                name: "platform",
                value: "Online",
            },
            {
                name: "currency",
                value: "VND",
            },
        ],
    },
};

// quick search for hotels at Trip.com
const quickSearchHotelTripOptions = (keyword, pageIndex, pageSize) => ({
    ...quickSearchTripOptions,
    keyword: keyword,
    tab: "hotel",
    pageIndex: pageIndex,
    pageSize: pageSize,
});

const quickSearchAttractionsTripOptions = (keyword, pageIndex, pageSize) => ({
    ...quickSearchTripOptions,
    keyword: keyword,
    tab: "mixlist",
    pageIndex: pageIndex,
    pageSize: pageSize,
});


// URL for quick search at Trip.com
const tripQuickSearchURL = "https://www.trip.com/restapi/soa2/20400/getResultForTripOnline"

module.exports = {quickSearchHotelTripOptions, tripQuickSearchURL, quickSearchAttractionsTripOptions};
