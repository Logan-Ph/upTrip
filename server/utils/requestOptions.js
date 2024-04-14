// pageIndex: 1, -> page number
// pageSize: 18, -> number of items per page
// keyword: "hanoi", -> search keyword
// tab: "restaurant",
// tab: "hotel",

const { convertDateFormat } = require("./helper");

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

// URL for autocomplete at Trip.com
const tripAutoCompleteURL =
    "https://us.trip.com/htls/getKeyWordSearch?htl_customtraceid=MjljMTczYzMtOWE0Zi00MGJmLTgzN2MtZWUyNGZhNmI4MDQ4&testab=e4a15fad2cc97aef8333564031336773458af8e09d8538ba2f7ab85722a6ffe3&x-traceID=1711297830645.f17ebYxB7ZgE-1712995119776-1260730084";

const tripAutoCompleteHeaders = () => {
    return {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
    };
};


// payload for autocomplete at Trip.com
const tripAutoCompletePayload = (keyword) => {
    return {
        code: 0,
        codeType: "",
        keyWord: keyword,
        searchType: "D", // D: city, P: province
        scenicCode: 0, // 0: city, 1: province
        cityCodeOfUser: 0, // 0: city, 1: province
        searchConditions: [
            {
                type: "D_PROVINCE",
                value: "T",
            },
            {
                type: "SupportNormalSearch",
                value: "T",
            },
        ],
        head: {
            platform: "PC",
            clientId: tripClientID,
            bu: "ibu",
            group: "TRIP",
            region: "US",
            locale: "en-US",
            timeZone: "7",
            currency: "VND",
            p: "57540566710",
            pageID: "10320668150",
            deviceID: "PC",
            clientVersion: "0",
            extension: [
                {
                    name: "cityId",
                    value: "",
                },
                {
                    name: "checkIn",
                    value: "",
                },
                {
                    name: "checkOut",
                    value: "",
                },
            ],
            href: "https://us.trip.com/hotels/?locale=en-US&curr=VND",
        },
    };
};

// URL for quick search at Trip.com
const tripQuickSearchURL =
    "https://www.trip.com/restapi/soa2/20400/getResultForTripOnline";

// URL to get initial hotels id from Trip.com
const tripGetHotelListIdURL = "https://us.trip.com/htls/getHotelList?testab=4b674b5e76ac70616e6ceb94ceb7c3b189242c0c8dda74b46bb1d675a60fe98b&x-traceID=1711297830645.f17ebYxB7ZgE-1713071509369-1574194174";
    
const tripClientID = "1711297830645.f17ebYxB7ZgE";

const tripAdvancedSearchHeaders = () => {
    return {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
    };
};

// payload to get hotel list from Trip.com
const tripGetHotelListURLPayload = (
    preHotelIds,
    checkIn, // yyyymmdd
    checkOut, // yyyymmdd
    countryID,
    provinceID,
    cityID,
    districtID,
    oversea,
    roomQuantity,
    lat,
    lng,
    href
) => {
    return {
        guideLogin: "T",
        search: {
            preHotelCount: preHotelIds.length,
            preHotelIds: preHotelIds,
            checkIn: checkIn, // yyyymmdd
            checkOut: checkOut, // yyyymmdd
            sourceFromTag: "",
            filters: [
                {
                    filterId: "17|1",
                    value: "1",
                    type: "17",
                    subType: "2",
                    sceneType: "17",
                },
                {
                    filterId: "80|0|1",
                    value: "0",
                    type: "80",
                    subType: "2",
                    sceneType: "80",
                },
                {
                    filterId: "29|1",
                    value: "1|2",
                    type: "29",
                },
            ],
            location: {
                geo: {
                    countryID: countryID,
                    provinceID: provinceID,
                    cityID: cityID,
                    districtID: districtID,
                    oversea: oversea,
                },
                coordinates: [],
            },
            pageIndex: Math.max(Math.floor(preHotelIds.length / 2), 1),
            pageSize: 10,
            needTagMerge: "T",
            roomQuantity: roomQuantity,
            orderFieldSelectedByUser: false,
            hotelId: 0,
            hotelIds: [],
            lat: lat,
            lng: lng,
            tripWalkDriveSwitch: "T",
            resultType: "",
            nearbyHotHotel: {},
            recommendTimes: 0,
            crossPromotionId: "",
            travellingForWork: false,
        },
        batchRefresh: {
            batchId: "",
            batchSeqNo: 0,
        },
        queryTag: "NORMAL",
        mapType: "GOOGLE",
        extends: {
            crossPriceConsistencyLog: "",
            NewTaxDescForAmountshowtype0: "B",
            TaxDescForAmountshowtype2: "",
            MealTagDependOnMealType: "T",
            MultiMainHotelPics: "",
            enableDynamicRefresh: "F",
            isFirstDynamicRefresh: "T",
            ExposeBedInfos: false,
        },
        head: {
            platform: "PC",
            clientId: tripClientID,
            bu: "ibu",
            group: "TRIP",
            aid: "",
            sid: "",
            ouid: "",
            caid: "",
            csid: "",
            couid: "",
            region: "US",
            locale: "en-US",
            timeZone: "7",
            currency: "VND",
            deviceID: "PC",
            clientVersion: "0",
            extension: [
                {
                    name: "cityId",
                    value: cityID,
                },
                {
                    name: "checkIn",
                    value: convertDateFormat(checkIn), // 2024/05/10 - yyyy/mm/dd
                },
                {
                    name: "checkOut",
                    value: convertDateFormat(checkOut), // 2024/05/18 - yyyy/mm/dd
                },
            ],
            tripSub1: "",
            ticket: "",
            href: href,
            deviceConfig: "M",
        },
    };
};

module.exports = {
    quickSearchHotelTripOptions,
    tripQuickSearchURL,
    quickSearchAttractionsTripOptions,
    tripAutoCompletePayload,
    tripAutoCompleteURL,
    tripAutoCompleteHeaders,
    tripGetHotelListIdURL,
    tripGetHotelListURLPayload,
    tripAdvancedSearchHeaders
};
