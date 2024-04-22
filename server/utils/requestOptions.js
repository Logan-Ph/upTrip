// pageIndex: 1, -> page number
// pageSize: 18, -> number of items per page
// keyword: "hanoi", -> search keyword
// tab: "restaurant",
// tab: "hotel",

const { convertDateFormat, getDecodedCurrentTimeAgoda, getCurrentTimeUTC, convertToUTCFormat } = require("./helper");

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
const tripGetHotelListIdURL =
    "https://us.trip.com/htls/getHotelList?testab=c43e9152ad1dbc90a6626ee61ab662f358d3ca60314d08609b203d424337fe67&x-traceID=1711297830645.f17ebYxB7ZgE-1713436649400-1067662363";

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

// query param for autocomplete at Agoda
const autocompleteQueryParamAgoda = (keyWord) => {
    return {
        searchText: keyWord,
        origin: "US",
        logtime: getDecodedCurrentTimeAgoda(),
        logTypeId: 1,
        isHotelLandSearch: true,
    };
};

// URL for autocomplete at Agoda
const agodaAutocompleteURL = "https://www.agoda.com/api/cronos/search/GetUnifiedSuggestResult/3/24/24/0/vi-vn/"

// URL for autocomplete at Booking.com
const bookingAutocompleteURL = "https://accommodations.booking.com/autocomplete.json"

const autocompletePayloadBooking = (keyword) => {
    return {
        "query": keyword,
        "language": "en-gb",
        "size": 5
      }
}

// advanced search for search specific hotels at Booking.com 
const bookingAdvancedSearchHotelURL = "https://www.booking.com/searchresults.en-gb.html"

const bookingAdvancedSearchHotelQueryParam = (keyword, checkin, checkout, group_adults, no_rooms, group_children, age) => {
    // ss: "KK Sapa Hotel, Sa Pa, Lao Cai, Vietnam",
    // lang: "en-gb",
    // src: "searchresults",
    // dest_type: "hotel",
    // ac_langcode: "en",
    // checkin: "2024-04-16",
    // checkout: "2024-04-18",
    // group_adults: 2, // num of adults
    // no_rooms: 2, // num of room
    // group_children: 2, // num of children
    // age : 0, // age of children
    // age : 3, // age of children

    const params = {
        ss: keyword, // Search keyword for the hotel
        lang: "en-gb", // Language code
        src: "searchresults", // Source of the search
        dest_type: "hotel", // Destination type (hotel)
        ac_langcode: "en", // Autocomplete language code
        checkin: checkin, // Check-in date (YYYY-MM-DD)
        checkout: checkout, // Check-out date (YYYY-MM-DD)
        group_adults: group_adults, // Number of adults in the group
        no_rooms: no_rooms, // Number of rooms required
        group_children: group_children, // Number of children in the group
    };

    if (group_children > 0) {
        age.forEach((childAge) => {
            params.age = childAge; // Age of each child in the group
        });
    }

    return params;
};

// advanced sarch for specific hotels at Agoda.com
const agodaAdvancedSearchHotelURL = "https://www.agoda.com/graphql/search"

const agodaAdvancedSearchHotelPayload = (objectId, checkin, checkout, los, rooms, adults, children, childAges, cityId) => {
    return {
        operationName: "citySearch",
        variables: {
            CitySearchRequest: {
                cityId: cityId,
                searchRequest: {
                    searchCriteria: {
                        isAllowBookOnRequest: true,
                        bookingDate: getCurrentTimeUTC(), // Current date and time in UTC 2024-04-14T09:12:21.581Z
                        checkInDate: convertToUTCFormat(checkin), // Check-in date and time in UTC 2024-04-14T17:00:00.000Z
                        localCheckInDate: checkin, // Local check-in date (YYYY-MM-DD) 2024-04-15
                        los: los, // length of Stay
                        rooms: rooms, // number of rooms
                        adults: adults, // number of adults
                        children: children, // number of children
                        childAges: childAges, // array of children ages
                        ratePlans: [],
                        featureFlagRequest: {
                            fetchNamesForTealium: true,
                            fiveStarDealOfTheDay: true,
                            isAllowBookOnRequest: false,
                            showUnAvailable: true,
                            showRemainingProperties: true,
                            isMultiHotelSearch: false,
                            enableAgencySupplyForPackages: true,
                            flags: [
                                {
                                    feature: "FamilyChildFriendlyPopularFilter",
                                    enable: true,
                                },
                                {
                                    feature:
                                        "FamilyChildFriendlyPropertyTypeFilter",
                                    enable: true,
                                },
                                {
                                    feature: "FamilyMode",
                                    enable: false,
                                },
                            ],
                            enablePageToken: false,
                            enableDealsOfTheDayFilter: false,
                            isEnableSupplierFinancialInfo: false,
                            ignoreRequestedNumberOfRoomsForNha: false,
                            isFlexibleMultiRoomSearch: false,
                        },
                        isUserLoggedIn: false,
                        currency: "VND",
                        travellerType: "Couple",
                        isAPSPeek: false,
                        enableOpaqueChannel: false,
                        isEnabledPartnerChannelSelection: null,
                        sorting: {
                            sortField: "Ranking",
                            sortOrder: "Desc",
                            sortParams: null,
                        },
                        requiredBasis: "PRPN",
                        requiredPrice: "Exclusive",
                        suggestionLimit: 0,
                        synchronous: false,
                        supplierPullMetadataRequest: null,
                        isRoomSuggestionRequested: false,
                        isAPORequest: false,
                        hasAPOFilter: false,
                    },
                    searchContext: {
                        memberId: 0,
                        locale: "vi-vn",
                        cid: 1758161,
                        origin: "VN",
                        platform: 1,
                        deviceTypeId: 1,
                        experiments: {
                            forceByVariant: null,
                            forceByExperiment: [
                                {
                                    id: "UMRAH-B2B",
                                    variant: "B",
                                },
                                {
                                    id: "UMRAH-B2C-REGIONAL",
                                    variant: "B",
                                },
                                {
                                    id: "UMRAH-B2C",
                                    variant: "Z",
                                },
                                {
                                    id: "JGCW-204",
                                    variant: "B",
                                },
                            ],
                        },
                        isRetry: false,
                        showCMS: false,
                        storeFrontId: 3,
                        pageTypeId: 103,
                        whiteLabelKey: null,
                        ipAddress: "42.116.204.112",
                        endpointSearchType: "CitySearch",
                        trackSteps: null,
                    },
                    matrix: null,
                    matrixGroup: [
                        {
                            matrixGroup: "NumberOfBedrooms",
                            size: 100,
                        },
                        {
                            matrixGroup: "LandmarkIds",
                            size: 10,
                        },
                        {
                            matrixGroup: "GroupedBedTypes",
                            size: 100,
                        },
                        {
                            matrixGroup: "RoomBenefits",
                            size: 100,
                        },
                        {
                            matrixGroup: "AtmosphereIds",
                            size: 100,
                        },
                        {
                            matrixGroup: "PopularForFamily",
                            size: 5,
                        },
                        {
                            matrixGroup: "RoomAmenities",
                            size: 100,
                        },
                        {
                            matrixGroup: "AffordableCategory",
                            size: 100,
                        },
                        {
                            matrixGroup: "HotelFacilities",
                            size: 100,
                        },
                        {
                            matrixGroup: "BeachAccessTypeIds",
                            size: 100,
                        },
                        {
                            matrixGroup: "StarRating",
                            size: 20,
                        },
                        {
                            matrixGroup: "KidsStayForFree",
                            size: 5,
                        },
                        {
                            matrixGroup: "AllGuestReviewBreakdown",
                            size: 100,
                        },
                        {
                            matrixGroup: "MetroSubwayStationLandmarkIds",
                            size: 20,
                        },
                        {
                            matrixGroup: "CityCenterDistance",
                            size: 100,
                        },
                        {
                            matrixGroup: "ProductType",
                            size: 100,
                        },
                        {
                            matrixGroup: "TripPurpose",
                            size: 5,
                        },
                        {
                            matrixGroup: "BusStationLandmarkIds",
                            size: 20,
                        },
                        {
                            matrixGroup: "IsSustainableTravel",
                            size: 2,
                        },
                        {
                            matrixGroup: "ReviewLocationScore",
                            size: 3,
                        },
                        {
                            matrixGroup: "LandmarkSubTypeCategoryIds",
                            size: 20,
                        },
                        {
                            matrixGroup: "ReviewScore",
                            size: 100,
                        },
                        {
                            matrixGroup: "AccommodationType",
                            size: 100,
                        },
                        {
                            matrixGroup: "PaymentOptions",
                            size: 100,
                        },
                        {
                            matrixGroup: "TrainStationLandmarkIds",
                            size: 20,
                        },
                        {
                            matrixGroup: "HotelAreaId",
                            size: 100,
                        },
                        {
                            matrixGroup: "HotelChainId",
                            size: 10,
                        },
                        {
                            matrixGroup: "RecommendedByDestinationCity",
                            size: 10,
                        },
                        {
                            matrixGroup: "Deals",
                            size: 100,
                        },
                    ],
                    filterRequest: {
                        idsFilters: [],
                        rangeFilters: [],
                        textFilters: [],
                    },
                    page: {
                        pageSize: 1,
                        pageNumber: 1,
                        pageToken: "",
                    },
                    apoRequest: {
                        apoPageSize: 10,
                    },
                    searchDetailRequest: {
                        priceHistogramBins: 50,
                    },
                    isTrimmedResponseRequested: false,
                    featuredAgodaHomesRequest: null,
                    featuredLuxuryHotelsRequest: null,
                    extraAgodaHomesRequest: null,
                    extraHotels: {
                        extraHotelIds: [objectId], // objectId of hotel lấy ở autocomplete (ObjectId) ------------ THIS IS AN IDENTIFIER TO TRACK THE DISTINCT HOTEL ------------
                        enableFiltersForExtraHotels: false,
                    },
                    packaging: null,
                    rankingRequest: {
                        isNhaKeywordSearch: false,
                    },
                    rocketmilesRequestV2: null,
                    featuredPulsePropertiesRequest: {
                        numberOfPulseProperties: 15,
                    },
                },
            },
            ContentSummaryRequest: {
                context: {
                    memberId: 0,
                    userOrigin: "VN",
                    locale: "vi-vn",
                    forceExperimentsByIdNew: [
                        {
                            key: "UMRAH-B2B",
                            value: "B",
                        },
                        {
                            key: "UMRAH-B2C-REGIONAL",
                            value: "B",
                        },
                        {
                            key: "UMRAH-B2C",
                            value: "Z",
                        },
                        {
                            key: "JGCW-204",
                            value: "B",
                        },
                    ],
                    apo: false,
                    searchCriteria: {
                        cityId: cityId,
                    },
                    platform: {
                        id: 1,
                    },
                    storeFrontId: 3,
                    cid: "1758161",
                    occupancy: {
                        numberOfAdults: adults,
                        numberOfChildren: children,
                        travelerType: 2,
                        checkIn: convertToUTCFormat(checkin),
                    },
                    deviceTypeId: 1,
                    whiteLabelKey: "",
                    correlationId: "",
                },
                summary: {
                    highlightedFeaturesOrderPriority: null,
                    includeHotelCharacter: true,
                },
                reviews: {
                    commentary: null,
                    demographics: {
                        providerIds: null,
                        filter: {
                            defaultProviderOnly: true,
                        },
                    },
                    summaries: {
                        providerIds: null,
                        apo: true,
                        limit: 1,
                        travellerType: 2,
                    },
                    cumulative: {
                        providerIds: null,
                    },
                    filters: null,
                },
                images: {
                    page: null,
                    maxWidth: 0,
                    maxHeight: 0,
                    imageSizes: null,
                    indexOffset: null,
                },
                rooms: {
                    images: null,
                    featureLimit: 0,
                    filterCriteria: null,
                    includeMissing: false,
                    includeSoldOut: false,
                    includeDmcRoomId: false,
                    soldOutRoomCriteria: null,
                    showRoomSize: true,
                    showRoomFacilities: true,
                    showRoomName: false,
                },
                nonHotelAccommodation: true,
                engagement: true,
                highlights: {
                    maxNumberOfItems: 0,
                    images: {
                        imageSizes: [
                            {
                                key: "full",
                                size: {
                                    width: 0,
                                    height: 0,
                                },
                            },
                        ],
                    },
                },
                personalizedInformation: true,
                localInformation: {
                    images: null,
                },
                features: null,
                rateCategories: true,
                contentRateCategories: {
                    escapeRateCategories: {},
                },
                synopsis: true,
            },
            PricingSummaryRequest: {
                cheapestOnly: true,
                context: {
                    isAllowBookOnRequest: true,
                    abTests: [
                        {
                            testId: 9021,
                            abUser: "B",
                        },
                        {
                            testId: 9023,
                            abUser: "B",
                        },
                        {
                            testId: 9024,
                            abUser: "B",
                        },
                        {
                            testId: 9025,
                            abUser: "B",
                        },
                        {
                            testId: 9027,
                            abUser: "B",
                        },
                        {
                            testId: 9029,
                            abUser: "B",
                        },
                    ],
                    clientInfo: {
                        cid: 1758161,
                        languageId: 24,
                        languageUse: 1,
                        origin: "VN",
                        platform: 1,
                        searchId: "6595d41e-d28d-4e57-a753-88f5fed8c08b",
                        storefront: 3,
                        userId: "5cc7440c-b516-49ca-a22c-f25035b646ee",
                        ipAddress: "42.116.204.112",
                    },
                    experiment: [
                        {
                            name: "UMRAH-B2B",
                            variant: "B",
                        },
                        {
                            name: "UMRAH-B2C-REGIONAL",
                            variant: "B",
                        },
                        {
                            name: "UMRAH-B2C",
                            variant: "Z",
                        },
                        {
                            name: "JGCW-204",
                            variant: "B",
                        },
                    ],
                    sessionInfo: {
                        isLogin: false,
                        memberId: 0,
                        sessionId: 1,
                    },
                    packaging: null,
                },
                isSSR: true,
                pricing: {
                    bookingDate: getCurrentTimeUTC(), // current date
                    checkIn: convertToUTCFormat(checkin), // check in date
                    checkout: convertToUTCFormat(checkout), // check out date
                    localCheckInDate: checkin, // local check in date
                    localCheckoutDate: checkout, // local check out date
                    currency: "VND", // currency
                    details: {
                        cheapestPriceOnly: false,
                        itemBreakdown: false,
                        priceBreakdown: false,
                    },
                    featureFlag: [
                        "ClientDiscount",
                        "PriceHistory",
                        "VipPlatinum",
                        "RatePlanPromosCumulative",
                        "PromosCumulative",
                        "CouponSellEx",
                        "MixAndSave",
                        "APSPeek",
                        "StackChannelDiscount",
                        "AutoApplyPromos",
                        "EnableAgencySupplyForPackages",
                        "EnableCashback",
                        "CreditCardPromotionPeek",
                        "EnableCofundedCashback",
                        "DispatchGoLocalForInternational",
                        "EnableGoToTravelCampaign",
                        "EnablePriceTrend",
                    ],
                    features: {
                        crossOutRate: false,
                        isAPSPeek: false,
                        isAllOcc: false,
                        isApsEnabled: false,
                        isIncludeUsdAndLocalCurrency: false,
                        isMSE: true,
                        isRPM2Included: true,
                        maxSuggestions: 0,
                        isEnableSupplierFinancialInfo: false,
                        isLoggingAuctionData: false,
                        newRateModel: false,
                        overrideOccupancy: false,
                        filterCheapestRoomEscapesPackage: false,
                        priusId: 0,
                        synchronous: false,
                        enableRichContentOffer: true,
                        showCouponAmountInUserCurrency: false,
                        disableEscapesPackage: false,
                        enablePushDayUseRates: false,
                        enableDayUseCor: false,
                    },
                    filters: {
                        cheapestRoomFilters: [],
                        filterAPO: false,
                        ratePlans: [1],
                        secretDealOnly: false,
                        suppliers: [],
                        nosOfBedrooms: [],
                    },
                    includedPriceInfo: false,
                    occupancy: {
                        adults: 2,
                        children: 0,
                        childAges: [],
                        rooms: 1,
                        childrenTypes: [],
                    },
                    supplierPullMetadata: {
                        requiredPrecheckAccuracyLevel: 0,
                    },
                    mseHotelIds: [],
                    ppLandingHotelIds: [],
                    searchedHotelIds: [],
                    paymentId: -1,
                    externalLoyaltyRequest: null,
                },
                suggestedPrice: "Exclusive",
            },
        },
        query: "query citySearch($CitySearchRequest: CitySearchRequest!, $ContentSummaryRequest: ContentSummaryRequest!, $PricingSummaryRequest: PricingRequestParameters, $PriceStreamMetaLabRequest: PriceStreamMetaLabRequest) {\n  citySearch(CitySearchRequest: $CitySearchRequest) {\n    featuredPulseProperties(ContentSummaryRequest: $ContentSummaryRequest, PricingSummaryRequest: $PricingSummaryRequest) {\n      propertyId\n      propertyResultType\n      pricing {\n        pulseCampaignMetadata {\n          promotionTypeId\n          webCampaignId\n          campaignTypeId\n          campaignBadgeText\n          campaignBadgeDescText\n          dealExpiryTime\n          showPulseMerchandise\n        }\n        isAvailable\n        isReady\n        offers {\n          roomOffers {\n            room {\n              pricing {\n                currency\n                price {\n                  perNight {\n                    exclusive {\n                      crossedOutPrice\n                      display\n                    }\n                    inclusive {\n                      crossedOutPrice\n                      display\n                    }\n                  }\n                  perRoomPerNight {\n                    exclusive {\n                      crossedOutPrice\n                      display\n                    }\n                    inclusive {\n                      crossedOutPrice\n                      display\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      content {\n        reviews {\n          contentReview {\n            isDefault\n            providerId\n            cumulative {\n              reviewCount\n              score\n            }\n          }\n          cumulative {\n            reviewCount\n            score\n          }\n        }\n        images {\n          hotelImages {\n            urls {\n              value\n            }\n          }\n        }\n        informationSummary {\n          hasHostExperience\n          displayName\n          rating\n          propertyLinks {\n            propertyPage\n          }\n          address {\n            country {\n              id\n            }\n            area {\n              name\n            }\n            city {\n              name\n            }\n          }\n          nhaSummary {\n            hostType\n          }\n        }\n      }\n    }\n    searchResult {\n      sortMatrix {\n        result {\n          fieldId\n          sorting {\n            sortField\n            sortOrder\n            sortParams {\n              id\n            }\n          }\n          display {\n            name\n          }\n          childMatrix {\n            fieldId\n            sorting {\n              sortField\n              sortOrder\n              sortParams {\n                id\n              }\n            }\n            display {\n              name\n            }\n            childMatrix {\n              fieldId\n              sorting {\n                sortField\n                sortOrder\n                sortParams {\n                  id\n                }\n              }\n              display {\n                name\n              }\n            }\n          }\n        }\n      }\n      searchInfo {\n        flexibleSearch {\n          currentDate {\n            checkIn\n            price\n          }\n          alternativeDates {\n            checkIn\n            price\n          }\n        }\n        hasSecretDeal\n        isComplete\n        totalFilteredHotels\n        hasEscapesPackage\n        searchStatus {\n          searchCriteria {\n            checkIn\n          }\n          searchStatus\n        }\n        objectInfo {\n          objectName\n          cityName\n          cityEnglishName\n          countryId\n          countryEnglishName\n          mapLatitude\n          mapLongitude\n          mapZoomLevel\n          wlPreferredCityName\n          wlPreferredCountryName\n          cityId\n          cityCenterPolygon {\n            geoPoints {\n              lon\n              lat\n            }\n            touristAreaCenterPoint {\n              lon\n              lat\n            }\n          }\n        }\n      }\n      urgencyDetail {\n        urgencyScore\n      }\n      histogram {\n        bins {\n          numOfElements\n          upperBound {\n            perNightPerRoom\n            perPax\n          }\n        }\n      }\n      nhaProbability\n    }\n    properties(ContentSummaryRequest: $ContentSummaryRequest, PricingSummaryRequest: $PricingSummaryRequest, PriceStreamMetaLabRequest: $PriceStreamMetaLabRequest) {\n      propertyId\n      sponsoredDetail {\n        sponsoredType\n        trackingData\n        isShowSponsoredFlag\n      }\n      propertyResultType\n      content {\n        informationSummary {\n          hotelCharacter {\n            hotelTag {\n              name\n              symbol\n            }\n            hotelView {\n              name\n              symbol\n            }\n          }\n          propertyLinks {\n            propertyPage\n          }\n          atmospheres {\n            id\n            name\n          }\n          isSustainableTravel\n          localeName\n          defaultName\n          displayName\n          accommodationType\n          awardYear\n          hasHostExperience\n          nhaSummary {\n            hostPropertyCount\n          }\n          address {\n            countryCode\n            country {\n              id\n              name\n            }\n            city {\n              id\n              name\n            }\n            area {\n              id\n              name\n            }\n          }\n          propertyType\n          rating\n          agodaGuaranteeProgram\n          remarks {\n            renovationInfo {\n              renovationType\n              year\n            }\n          }\n          spokenLanguages {\n            id\n          }\n          geoInfo {\n            latitude\n            longitude\n          }\n        }\n        propertyEngagement {\n          lastBooking\n          peopleLooking\n        }\n        nonHotelAccommodation {\n          masterRooms {\n            noOfBathrooms\n            noOfBedrooms\n            noOfBeds\n            roomSizeSqm\n            highlightedFacilities\n          }\n          hostLevel {\n            id\n            name\n          }\n          supportedLongStay\n        }\n        facilities {\n          id\n        }\n        images {\n          hotelImages {\n            id\n            caption\n            providerId\n            urls {\n              key\n              value\n            }\n          }\n        }\n        reviews {\n          contentReview {\n            isDefault\n            providerId\n            demographics {\n              groups {\n                id\n                grades {\n                  id\n                  score\n                }\n              }\n            }\n            summaries {\n              recommendationScores {\n                recommendationScore\n              }\n              snippets {\n                countryId\n                countryCode\n                countryName\n                date\n                demographicId\n                demographicName\n                reviewer\n                reviewRating\n                snippet\n              }\n            }\n            cumulative {\n              reviewCount\n              score\n            }\n          }\n          cumulative {\n            reviewCount\n            score\n          }\n          cumulativeForHost {\n            hostAvgHotelReviewRating\n            hostHotelReviewTotalCount\n          }\n        }\n        familyFeatures {\n          hasChildrenFreePolicy\n          isFamilyRoom\n          hasMoreThanOneBedroom\n          isInterConnectingRoom\n          isInfantCottageAvailable\n          hasKidsPool\n          hasKidsClub\n        }\n        personalizedInformation {\n          childrenFreePolicy {\n            fromAge\n            toAge\n          }\n        }\n        localInformation {\n          landmarks {\n            transportation {\n              landmarkName\n              distanceInM\n            }\n            topLandmark {\n              landmarkName\n              distanceInM\n            }\n            beach {\n              landmarkName\n              distanceInM\n            }\n          }\n          hasAirportTransfer\n        }\n        highlight {\n          cityCenter {\n            distanceFromCityCenter\n          }\n          favoriteFeatures {\n            features {\n              id\n              title\n              category\n            }\n          }\n          hasNearbyPublicTransportation\n        }\n        rateCategories {\n          escapeRateCategories {\n            rateCategoryId\n            localizedRateCategoryName\n          }\n        }\n      }\n      soldOut {\n        soldOutPrice {\n          averagePrice\n        }\n      }\n      pricing {\n        pulseCampaignMetadata {\n          promotionTypeId\n          webCampaignId\n          campaignTypeId\n          campaignBadgeText\n          campaignBadgeDescText\n          dealExpiryTime\n          showPulseMerchandise\n        }\n        isAvailable\n        isReady\n        benefits\n        cheapestRoomOffer {\n          agodaCash {\n            showBadge\n            giftcardGuid\n            dayToEarn\n            earnId\n            percentage\n            expiryDay\n          }\n          cashback {\n            cashbackGuid\n            showPostCashbackPrice\n            cashbackVersion\n            percentage\n            earnId\n            dayToEarn\n            expiryDay\n            cashbackType\n            appliedCampaignName\n          }\n        }\n        isEasyCancel\n        isInsiderDeal\n        isMultiHotelEligible\n        suggestPriceType {\n          suggestPrice\n        }\n        roomBundle {\n          bundleId\n          bundleType\n          saveAmount {\n            perNight {\n              ...Fragg6a7eich9a0fe6a11hb6\n            }\n          }\n        }\n        pointmax {\n          channelId\n          point\n        }\n        priceChange {\n          changePercentage\n          searchDate\n        }\n        payment {\n          cancellation {\n            cancellationType\n            freeCancellationDate\n          }\n          payLater {\n            isEligible\n          }\n          payAtHotel {\n            isEligible\n          }\n          noCreditCard {\n            isEligible\n          }\n          taxReceipt {\n            isEligible\n          }\n        }\n        cheapestStayPackageRatePlans {\n          stayPackageType\n          ratePlanId\n        }\n        pricingMessages {\n          location\n          ids\n        }\n        suppliersSummaries {\n          id\n          supplierHotelId\n        }\n        supplierInfo {\n          id\n          name\n          isAgodaBand\n        }\n        childPolicy {\n          freeChildren\n        }\n        offers {\n          roomOffers {\n            room {\n              extraPriceInfo {\n                displayPriceWithSurchargesPRPN\n                corDisplayPriceWithSurchargesPRPN\n              }\n              availableRooms\n              isPromoEligible\n              promotions {\n                typeId\n                promotionDiscount {\n                  value\n                }\n                isRatePlanAsPromotion\n                cmsTypeId\n                description\n              }\n              bookingDuration {\n                unit\n                value\n              }\n              supplierId\n              corSummary {\n                hasCor\n                corType\n                isOriginal\n                hasOwnCOR\n                isBlacklistedCor\n              }\n              localVoucher {\n                currencyCode\n                amount\n              }\n              pricing {\n                currency\n                price {\n                  perNight {\n                    exclusive {\n                      display\n                      cashbackPrice\n                      displayAfterCashback\n                      originalPrice\n                    }\n                    inclusive {\n                      display\n                      cashbackPrice\n                      displayAfterCashback\n                      originalPrice\n                    }\n                  }\n                  perBook {\n                    exclusive {\n                      display\n                      cashbackPrice\n                      displayAfterCashback\n                      rebatePrice\n                      originalPrice\n                      autoAppliedPromoDiscount\n                    }\n                    inclusive {\n                      display\n                      cashbackPrice\n                      displayAfterCashback\n                      rebatePrice\n                      originalPrice\n                      autoAppliedPromoDiscount\n                    }\n                  }\n                  perRoomPerNight {\n                    exclusive {\n                      display\n                      crossedOutPrice\n                      cashbackPrice\n                      displayAfterCashback\n                      rebatePrice\n                      pseudoCouponPrice\n                      originalPrice\n                      loyaltyOfferSummary {\n                        basePrice {\n                          exclusive\n                          allInclusive\n                        }\n                        status\n                        offers {\n                          identifier\n                          status\n                          burn {\n                            points\n                            payableAmount\n                          }\n                          earn {\n                            points\n                          }\n                          offerType\n                          isSelected\n                        }\n                      }\n                    }\n                    inclusive {\n                      display\n                      crossedOutPrice\n                      cashbackPrice\n                      displayAfterCashback\n                      rebatePrice\n                      pseudoCouponPrice\n                      originalPrice\n                      loyaltyOfferSummary {\n                        basePrice {\n                          exclusive\n                          allInclusive\n                        }\n                        status\n                        offers {\n                          identifier\n                          status\n                          burn {\n                            points\n                            payableAmount\n                          }\n                          earn {\n                            points\n                          }\n                          offerType\n                          isSelected\n                        }\n                      }\n                    }\n                  }\n                  totalDiscount\n                  priceAfterAppliedAgodaCash {\n                    perBook {\n                      ...Fragi4aa9i4gg32fid93h54c\n                    }\n                    perRoomPerNight {\n                      ...Fragi4aa9i4gg32fid93h54c\n                    }\n                  }\n                }\n                apsPeek {\n                  perRoomPerNight {\n                    ...Fragg6a7eich9a0fe6a11hb6\n                  }\n                }\n                promotionPricePeek {\n                  display {\n                    perBook {\n                      ...Fragg6a7eich9a0fe6a11hb6\n                    }\n                    perRoomPerNight {\n                      ...Fragg6a7eich9a0fe6a11hb6\n                    }\n                    perNight {\n                      ...Fragg6a7eich9a0fe6a11hb6\n                    }\n                  }\n                  discountType\n                  promotionCodeType\n                  promotionCode\n                  promoAppliedOnFinalPrice\n                  childPromotions {\n                    campaignId\n                  }\n                  campaignName\n                }\n                channelDiscountSummary {\n                  channelDiscountBreakdown {\n                    display\n                    discountPercent\n                    channelId\n                  }\n                }\n                packagePriceAndSaving {\n                  perPax {\n                    allInclusive {\n                      specialPriceAndSaving {\n                        baseChannel\n                        targetChannel\n                        targetPrice\n                        saving {\n                          amount\n                        }\n                      }\n                    }\n                  }\n                }\n                promotionsCumulative {\n                  promotionCumulativeType\n                  amountPercentage\n                  minNightsStay\n                }\n              }\n              uid\n              payment {\n                cancellation {\n                  cancellationType\n                }\n              }\n              discount {\n                deals\n                channelDiscount\n              }\n              saveUpTo {\n                perRoomPerNight\n              }\n              benefits {\n                id\n                targetType\n              }\n              channel {\n                id\n              }\n              mseRoomSummaries {\n                supplierId\n                subSupplierId\n                pricingSummaries {\n                  currency\n                  channelDiscountSummary {\n                    channelDiscountBreakdown {\n                      channelId\n                      discountPercent\n                      display\n                    }\n                  }\n                  price {\n                    perRoomPerNight {\n                      exclusive {\n                        display\n                      }\n                      inclusive {\n                        display\n                      }\n                    }\n                  }\n                }\n              }\n              cashback {\n                cashbackGuid\n                showPostCashbackPrice\n                cashbackVersion\n                percentage\n                earnId\n                dayToEarn\n                expiryDay\n                cashbackType\n                appliedCampaignName\n              }\n              agodaCash {\n                showBadge\n                giftcardGuid\n                dayToEarn\n                expiryDay\n                percentage\n              }\n              corInfo {\n                corBreakdown {\n                  taxExPN {\n                    ...Frag9h4g565g9e7i23fb9gai\n                  }\n                  taxInPN {\n                    ...Frag9h4g565g9e7i23fb9gai\n                  }\n                  taxExPRPN {\n                    ...Frag9h4g565g9e7i23fb9gai\n                  }\n                  taxInPRPN {\n                    ...Frag9h4g565g9e7i23fb9gai\n                  }\n                }\n                corInfo {\n                  corType\n                }\n              }\n              loyaltyDisplay {\n                items\n              }\n              capacity {\n                extraBedsAvailable\n              }\n              pricingMessages {\n                formatted {\n                  location\n                  texts {\n                    index\n                    text\n                  }\n                }\n              }\n              campaign {\n                selected {\n                  campaignId\n                  promotionId\n                  messages {\n                    campaignName\n                    title\n                    titleWithDiscount\n                    description\n                    linkOutText\n                    url\n                  }\n                }\n              }\n              isPackageEligible\n              stayPackageType\n            }\n          }\n        }\n      }\n      metaLab {\n        attributes {\n          attributeId\n          dataType\n          value\n          version\n        }\n      }\n      enrichment {\n        topSellingPoint {\n          tspType\n          value\n        }\n        pricingBadges {\n          badges\n        }\n        uniqueSellingPoint {\n          rank\n          segment\n          uspType\n          uspPropertyType\n        }\n        bookingHistory {\n          bookingCount {\n            count\n            timeFrame\n          }\n        }\n        showReviewSnippet\n        isPopular\n        roomInformation {\n          cheapestRoomSizeSqm\n          facilities {\n            id\n            propertyFacilityName\n            symbol\n          }\n        }\n      }\n    }\n    searchEnrichment {\n      suppliersInformation {\n        supplierId\n        supplierName\n        isAgodaBand\n      }\n    }\n    aggregation {\n      matrixGroupResults {\n        matrixGroup\n        matrixItemResults {\n          id\n          name\n          count\n          filterKey\n          filterRequestType\n          extraDataResults {\n            text\n            matrixExtraDataType\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment Fragi4aa9i4gg32fid93h54c on DisplayPrice {\n  exclusive\n  allInclusive\n}\n\nfragment Fragg6a7eich9a0fe6a11hb6 on DFDisplayPrice {\n  exclusive\n  allInclusive\n}\n\nfragment Frag9h4g565g9e7i23fb9gai on DFCorBreakdownItem {\n  price\n  id\n}\n",
    };
}
// payload to get flights from agoda
const agodaGetFlightPayload = (data) => {
    const date = `${data.year}-${data.month}-${data.day}`
    const passengers = [
        {
            "number": data.adult,
            "passengerType": 1,
        }
    ]
    if (data.child > 0) {
        passengers.push(
            {
                "number": data.child,
                "passengerType": 2
            }
        )
    }
    if (data.infant > 0) {
        passengers.push(
            {
                "number": data.infant,
                "passengerType": 3
            }
        )
    }
    return {
        "flightsRequestId": "02bed71b-cbdc-43bd-ac49-003d1e3edf7b",
        "passengers": passengers,
        "trips": [
            {
                "id": 1,
                "priority": 1,
                "pagination": {
                    "number": 1,
                    "size": 500
                },
                "slices": [
                    {
                        "origin": [
                            {
                                "type": 1,
                                "code": data.from
                            }
                        ],
                        "destination": [
                            {
                                "type": 1,
                                "code": data.to
                            }
                        ],
                        "id": 1,
                        "departureDate": date,
                        "filter": {
                            "arrivalTime": null,
                            "departureTime": null
                        }
                    }
                ],
                "filter": {
                    "cabinType": data.seatClass.charAt(0) + data.seatClass.slice(1).toLowerCase(),
                },
                "sort": {
                    "field": "best",
                },
            }
        ],
        "supportedFeatures": [
            "CrossOutPrice",
            "Agency",
            "SupportChildrenInfants",
            "HackerFare",
            "Streaming",
            "IncompletePassportRequired",
            "VirtualInterlining",
            "QuickSort"
        ],
        "context": {
            "userSettings": {
                "currencyCode": "VND",
                "language": "en-us"
            },
            "clientInfo": {
                "clientVersion": "1.0",
                "userId": "079be7ee-c418-4795-845f-7ccac2636c16",
                "applicationName": "DesktopWeb"
            }
        }
    }
}

// url to get flight from agoda
const agodaGetFlightURL = 'https://www.agoda.com/api/gw/flight/searchunbundled'

// payload to get flight from trip.com

const tripComGetFlightPayload = (data) => {
    const date = `${data.year}-${data.month}-${data.day}`
    let cabinClass;
    if (data.seatClass == "ECONOMY") { cabinClass = 'YSGroup' }
    else if (data.seatClass == "PREMIUM") { cabinClass = 'Premium' }
    else if (data.seatClass == "BUSINESS") { cabinClass = 'Business' }
    else if (data.seatClass == "FIRST") { cabinClass = 'First' }
    return {
        "operationName": "flightListSearch",
        "variables": {
            "request": {
                "criteriaToken": "tripType:OW|criteriaToken:NEWTOKEN|KLUv_QBYnQsAFpdYQTBr4wbACotIGOjgYMCSsLgNBq15M_7kQhL_JeKiJb5fvEk3qYEWREK06Myvs_t_PPRbTDE0juKuSMAsdxwej00CTQBEAEcAu9rA3MsdU8qY961tzIBJ60bHx5HQM4iU8cez0dNscsbqpHSBxnXYFVCRGDQgAFAhJyQgChmR0aQa4BAVkIAmoEhEh2hCCfHBA4iPiAbas2PGRL47na5JJq0UKYnht7MPF8N7YNJqpbQJMwhunHkn8t3pPpHTwe4z4Qs7xaT1pbTZzx4580rEfbN5BoHApBXkAT_-Z1CVvTBae309Bncfw77mrctSnrGzsKhM6-tHi8PzVIZdq0cHb2WmCDbTWeAwGfKCxwZVQBI0NckD2oBBrblzMYCUtacDF8vlYrpUIHLDhUWBpTJRIDKDlB8J8KYx_abxwTpPmAOzsKjLgzW2eHO0fe711djrx7_f_36Fv0_h7-v_6i37mddUBAARhIRudV3iHIhXYQI=|cabinClass:YSGROUP|adult:1|child:0|infant:0|subChannel:17|channel:EnglishSite|currency:VND|extensionFlag:16|ExtensionOptions:|list:true|idc:SHARB|detailSearch:false|issuer:CT|SeparateJourneyType:null|searchScene:flight-list|airlineCodes:|nearbyCities:|listTime:202404140304|agencyModelAgg:false|SessionId:a35779ad-fd6a-434e-9014-7ba4af7c2925|dCity_1:SGN|date_1:2024-05-31|aCity_1:HAN",
                "searchCriteria": {
                    "cabinClass": cabinClass,
                    "searchSegmentList": [
                        {
                            "departDate": date,
                            "departCity": data.from,
                            "arriveCity": data.to,
                            "departAirport": "",
                            "arriveAirport": ""
                        }
                    ],
                    "passengerCount": {
                        "adult": data.adult,
                        "child": data.child,
                        "infant": data.infant
                    },
                    "tripType": 1
                },
            }
        },
        "extensions": {
            "persistedQuery": {
                "version": 1,
                "sha256Hash": "f780a5131343144e62058f856dedea297f40123bcf6220d59cc6127667d87055"
            }
        },
    }
}

// url to get flight from trip.com
const tripComGetFlightURL = 'https://us.trip.com/flights/graphql/intlCTFlightListSearch'

// payload to get flight from myTrip

const myTripGetFlightPayload = (data) => {
    const childAges = []
    const date = `${data.year}-${data.month}-${data.day}`
    if (data.child > 0) {
        for (let i = 0; i < data.child; i++) {
            childAges.push(7)
        }
    }
    if (data.infant > 0) {
        for (let i = 0; i < data.infant; i++) {
            childAges.push(1)
        }
    }
    return {
        "operationName": "SearchOnResultPage",
        "variables": {
            "adults": data.adult,
            "cabinClass": data.seatClass,
            "childAges": childAges,
            "direct": false,
            "filters": [],
            "routes": [
                {
                    "origin": data.from,
                    "destination": data.to,
                    "departureDate": date,
                }
            ],
            "sortTypeCode": "CHEAP_TRIP"
        },
        "query": "query SearchOnResultPage($routes: [Route!]!, $cabinClass: CabinClass, $direct: Boolean, $carrierCodes: [String], $adults: Int!, $childAges: [Int], $offset: Int, $sortTypeCode: String, $filters: [Filter!], $validWithVoucher: Boolean) {\n  search(routes: $routes, cabinClass: $cabinClass, direct: $direct, carrierCodes: $carrierCodes, adults: $adults, childAges: $childAges, offset: $offset, sortTypeCode: $sortTypeCode, filters: $filters, validWithVoucher: $validWithVoucher) {\n    availableFilters {\n      code\n      group\n      label\n      ... on RangeFilter {\n        __typename\n        code\n        group\n        label\n        max\n        min\n        type\n      }\n      ... on SelectionFilter {\n        __typename\n        code\n        group\n        label\n        isMultiChoice\n        options {\n          label\n          value\n          __typename\n        }\n        type\n      }\n      __typename\n    }\n    availableSortTypes {\n      code\n      name\n      __typename\n    }\n    carrierCodes\n    carrierNames\n    flights {\n      ...Flights\n      __typename\n    }\n    flightsCount\n    filteredFlightsCount\n    quickSortPrices {\n      carrierPromo {\n        value\n        currency {\n          code\n          __typename\n        }\n        __typename\n      }\n      cheapTrip {\n        value\n        currency {\n          code\n          __typename\n        }\n        __typename\n      }\n      shortTrip {\n        value\n        currency {\n          code\n          __typename\n        }\n        __typename\n      }\n      recommendation {\n        value\n        currency {\n          code\n          __typename\n        }\n        __typename\n      }\n      bestValue {\n        value\n        currency {\n          code\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    resultSetMetaData {\n      priceRange {\n        min\n        max\n        __typename\n      }\n      travelTimeRange {\n        min\n        max\n        __typename\n      }\n      marketingCarriers {\n        code\n        name\n        __typename\n      }\n      __typename\n    }\n    routes {\n      origin {\n        code\n        name\n        cityCode\n        cityName\n        countryCode\n        countryName\n        continentCode\n        continentName\n        __typename\n      }\n      destination {\n        code\n        name\n        cityCode\n        cityName\n        countryCode\n        countryName\n        continentCode\n        continentName\n        __typename\n      }\n      departureAt\n      departureDate\n      departureTimeOfDay\n      __typename\n    }\n    searchPath\n    sponsoredTrips {\n      ...Flights\n      __typename\n    }\n    travelers {\n      ageType\n      __typename\n    }\n    type\n    tripCampaigns {\n      campaignImageUrlDesktop\n      campaignImageUrlMobile\n      selectionKey\n      __typename\n    }\n    validWithVoucher\n    __typename\n  }\n}\n\nfragment Flights on Trip {\n  id\n  tripId\n  isVI\n  includedCabinBaggage {\n    includedPersonalItem\n    size3d {\n      height\n      length\n      width\n      __typename\n    }\n    ...IncludedCabinBaggage\n    __typename\n  }\n  includedCheckedBaggage {\n    ...IncludedCheckedBaggage\n    __typename\n  }\n  bounds {\n    boundId: id\n    includedCabinBaggage {\n      ...IncludedCabinBaggage\n      __typename\n    }\n    includedCheckedBaggage {\n      ...IncludedCheckedBaggage\n      __typename\n    }\n    segments {\n      ... on TripSegment {\n        __typename\n        segmentId: id\n        aircraftType\n        arrivedAt\n        brandedFareInformation {\n          name\n          __typename\n        }\n        includedCabinBaggage {\n          ...IncludedCabinBaggage\n          __typename\n        }\n        includedCheckedBaggage {\n          ...IncludedCheckedBaggage\n          __typename\n        }\n        brandedFareInformation {\n          name\n          __typename\n        }\n        cabinClassName\n        departuredAt\n        destination {\n          code\n          name\n          cityCode\n          cityName\n          airportCode\n          airportName\n          __typename\n        }\n        duration\n        equipmentCode\n        flightNumber\n        marketingCarrier {\n          code\n          name\n          __typename\n        }\n        numberOfTechnicalStops\n        operatingCarrier {\n          code\n          name\n          __typename\n        }\n        operatingInformation\n        origin {\n          code\n          name\n          cityCode\n          cityName\n          airportCode\n          airportName\n          __typename\n        }\n        segmentDetails {\n          paxType\n          numberOfSeatsLeft\n          __typename\n        }\n      }\n      ... on EventSegment {\n        __typename\n        segmentId: id\n        types\n        duration\n      }\n      __typename\n    }\n    __typename\n  }\n  brandedFares {\n    name\n    __typename\n  }\n  availableExtraProducts {\n    ...AvailableExtraProducts\n    __typename\n  }\n  includedExtraProducts {\n    id\n    texts {\n      name\n      productSummaryAlternativeName\n      readMoreText\n      receiptText\n      salesAbstract\n      __typename\n    }\n    __typename\n  }\n  selectionKey\n  type\n  tripCharacteristics\n  tripTravelers: travelers {\n    id\n    ageType\n    __typename\n  }\n  paymentMethodPrices {\n    ...PaymentMethodPrices\n    __typename\n  }\n  travelerPrices {\n    ...TravelerPrices\n    __typename\n  }\n  travelerPricesWithoutPaymentDiscounts {\n    price {\n      markup {\n        value\n        __typename\n      }\n      price {\n        value\n        currency {\n          code\n          __typename\n        }\n        __typename\n      }\n      vat {\n        value\n        __typename\n      }\n      __typename\n    }\n    taxesAndFees {\n      category\n      taxes {\n        code\n        title\n        amount {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    travelerId\n    __typename\n  }\n  tripTags\n  systems\n  voucherAmount {\n    value\n    __typename\n  }\n  shareableUrl\n  __typename\n}\n\nfragment IncludedCabinBaggage on IncludedCabinBaggage {\n  pieces\n  weight\n  weightUnit\n  __typename\n}\n\nfragment IncludedCheckedBaggage on IncludedCheckedBaggage {\n  pieces\n  weight\n  weightUnit\n  __typename\n}\n\nfragment AvailableExtraProducts on ExtraProduct {\n  configuration {\n    productPreSelection\n    __typename\n  }\n  productId: id\n  name\n  selectedWithTrip\n  sellSpecification {\n    ... on SellSpecificationTravelerNew {\n      sellPriceTravelers {\n        price {\n          price {\n            value\n            __typename\n          }\n          markup {\n            value\n            __typename\n          }\n          vat {\n            value\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SellSpecificationNoneNew {\n      price {\n        price {\n          value\n          currency {\n            code\n            exponent\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SellSpecificationBaggageNew {\n      sellPriceBaggage {\n        maxWeight\n        numberOfUnits\n        weightUnit\n        price {\n          price {\n            value\n            currency {\n              code\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentMethodPrices on PaymentMethodPrice {\n  name\n  price {\n    value\n    __typename\n  }\n  type\n  __typename\n}\n\nfragment TravelerPrices on TravelerPrice {\n  id\n  price {\n    markup {\n      value\n      __typename\n    }\n    price {\n      value\n      currency {\n        code\n        __typename\n      }\n      __typename\n    }\n    vat {\n      value\n      __typename\n    }\n    __typename\n  }\n  taxesAndFees {\n    category\n    taxes {\n      code\n      title\n      amount {\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  travelerId\n  __typename\n}\n"
    }
}

const myTripGetMoreFlightPayload = (data, itemsLength) => {
    const childAges = []
    const date = `${data.year}-${data.month}-${data.day}`
    if (data.child > 0) {
        for (let i = 0; i < data.child; i++) {
            childAges.push(7)
        }
    }
    if (data.infant > 0) {
        for (let i = 0; i < data.infant; i++) {
            childAges.push(1)
        }
    }
    return {
        "operationName": "SearchMoreOnResultPage",
        "variables": {
            "adults": data.adult,
            "cabinClass": data.seatClass,
            "childAges": childAges,
            "direct": false,
            "filters": [],
            "routes": [
                {
                    "origin": data.from,
                    "destination": data.to,
                    "departureDate": date
                }
            ],
            "sortTypeCode": "CHEAP_TRIP",
            "offset": itemsLength
        },
        "query": "query SearchMoreOnResultPage($routes: [Route!]!, $cabinClass: CabinClass, $direct: Boolean, $carrierCodes: [String], $adults: Int!, $childAges: [Int], $offset: Int, $sortTypeCode: String, $filters: [Filter!], $validWithVoucher: Boolean) {\n  search(routes: $routes, cabinClass: $cabinClass, direct: $direct, carrierCodes: $carrierCodes, adults: $adults, childAges: $childAges, offset: $offset, sortTypeCode: $sortTypeCode, filters: $filters, validWithVoucher: $validWithVoucher) {\n    flights {\n      ...Flights\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment Flights on Trip {\n  id\n  tripId\n  isVI\n  includedCabinBaggage {\n    includedPersonalItem\n    size3d {\n      height\n      length\n      width\n      __typename\n    }\n    ...IncludedCabinBaggage\n    __typename\n  }\n  includedCheckedBaggage {\n    ...IncludedCheckedBaggage\n    __typename\n  }\n  bounds {\n    boundId: id\n    includedCabinBaggage {\n      ...IncludedCabinBaggage\n      __typename\n    }\n    includedCheckedBaggage {\n      ...IncludedCheckedBaggage\n      __typename\n    }\n    segments {\n      ... on TripSegment {\n        __typename\n        segmentId: id\n        aircraftType\n        arrivedAt\n        brandedFareInformation {\n          name\n          __typename\n        }\n        includedCabinBaggage {\n          ...IncludedCabinBaggage\n          __typename\n        }\n        includedCheckedBaggage {\n          ...IncludedCheckedBaggage\n          __typename\n        }\n        brandedFareInformation {\n          name\n          __typename\n        }\n        cabinClassName\n        departuredAt\n        destination {\n          code\n          name\n          cityCode\n          cityName\n          airportCode\n          airportName\n          __typename\n        }\n        duration\n        equipmentCode\n        flightNumber\n        marketingCarrier {\n          code\n          name\n          __typename\n        }\n        numberOfTechnicalStops\n        operatingCarrier {\n          code\n          name\n          __typename\n        }\n        operatingInformation\n        origin {\n          code\n          name\n          cityCode\n          cityName\n          airportCode\n          airportName\n          __typename\n        }\n        segmentDetails {\n          paxType\n          numberOfSeatsLeft\n          __typename\n        }\n      }\n      ... on EventSegment {\n        __typename\n        segmentId: id\n        types\n        duration\n      }\n      __typename\n    }\n    __typename\n  }\n  brandedFares {\n    name\n    __typename\n  }\n  availableExtraProducts {\n    ...AvailableExtraProducts\n    __typename\n  }\n  includedExtraProducts {\n    id\n    texts {\n      name\n      productSummaryAlternativeName\n      readMoreText\n      receiptText\n      salesAbstract\n      __typename\n    }\n    __typename\n  }\n  selectionKey\n  type\n  tripCharacteristics\n  tripTravelers: travelers {\n    id\n    ageType\n    __typename\n  }\n  paymentMethodPrices {\n    ...PaymentMethodPrices\n    __typename\n  }\n  travelerPrices {\n    ...TravelerPrices\n    __typename\n  }\n  travelerPricesWithoutPaymentDiscounts {\n    price {\n      markup {\n        value\n        __typename\n      }\n      price {\n        value\n        currency {\n          code\n          __typename\n        }\n        __typename\n      }\n      vat {\n        value\n        __typename\n      }\n      __typename\n    }\n    taxesAndFees {\n      category\n      taxes {\n        code\n        title\n        amount {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    travelerId\n    __typename\n  }\n  tripTags\n  systems\n  voucherAmount {\n    value\n    __typename\n  }\n  shareableUrl\n  __typename\n}\n\nfragment IncludedCabinBaggage on IncludedCabinBaggage {\n  pieces\n  weight\n  weightUnit\n  __typename\n}\n\nfragment IncludedCheckedBaggage on IncludedCheckedBaggage {\n  pieces\n  weight\n  weightUnit\n  __typename\n}\n\nfragment AvailableExtraProducts on ExtraProduct {\n  configuration {\n    productPreSelection\n    __typename\n  }\n  productId: id\n  name\n  selectedWithTrip\n  sellSpecification {\n    ... on SellSpecificationTravelerNew {\n      sellPriceTravelers {\n        price {\n          price {\n            value\n            __typename\n          }\n          markup {\n            value\n            __typename\n          }\n          vat {\n            value\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SellSpecificationNoneNew {\n      price {\n        price {\n          value\n          currency {\n            code\n            exponent\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SellSpecificationBaggageNew {\n      sellPriceBaggage {\n        maxWeight\n        numberOfUnits\n        weightUnit\n        price {\n          price {\n            value\n            currency {\n              code\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentMethodPrices on PaymentMethodPrice {\n  name\n  price {\n    value\n    __typename\n  }\n  type\n  __typename\n}\n\nfragment TravelerPrices on TravelerPrice {\n  id\n  price {\n    markup {\n      value\n      __typename\n    }\n    price {\n      value\n      currency {\n        code\n        __typename\n      }\n      __typename\n    }\n    vat {\n      value\n      __typename\n    }\n    __typename\n  }\n  taxesAndFees {\n    category\n    taxes {\n      code\n      title\n      amount {\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  travelerId\n  __typename\n}\n"
    }
}

// url to get flight from myTrip
const myTripGetFlightURL = 'https://us.mytrip.com/graphql/SearchOnResultPage'
const myTripGetMoreFlightURL = 'https://us.mytrip.com/graphql/SearchMoreOnResultPage'

// payload to get flight from baydep 
const bayDepGetFlightPayload = (data) => {
    const airlineList = ["VN", "VJ", "QH", "VU"]
    const payload = []
    for (const airlineCode of airlineList) {
        payload.push(`requestType=Search&legArr=${data.to}${data.from}${data.day}${data.month}${data.year}&adt=${data.adult}&chd=${data.child}&inf=${data.infant}&airline=${airlineCode}&searchType=standard&currency=VND&lang=en-US&nearbyAirport=yes&fareclass=${data.seatClass.toLowerCase()}`)
    }
    return payload;
}

// url to get fligh from baydep
const bayDepGetFlightURL = 'https://baydep.vn/Handler/FlightHandler.ashx/ProcessRequest'

const airportOptions = [
    {
        cityName: "Can Tho",
        airportCode: "VCA"
    },
    {
        cityName: "Da Nang",
        airportCode: "DAD"
    },
    {
        cityName: "Haiphong",
        airportCode: "HPH"
    }, 
    {
        cityName: "Hanoi",
        airportCode: "HAN"
    },
    {
        cityName: "Ho Chi Minh City",
        airportCode: "SGN"
    },
    {
        cityName: "Hue",
        airportCode: "HUI"
    },
    {
        cityName: "Nha Trang",
        airportCode: "CXR"
    },
    {
        cityName: "Phu Quoc",
        airportCode: "PQC"
    },
    {
        cityName: "Ha Long",
        airportCode: "VDO"
    },
    {
        cityName: "Vinh",
        airportCode: "VII"
    },
    {
        cityName: "Buon Ma Thuot",
        airportCode: "BMV"
    },
    {
        cityName: "Ca Mau",
        airportCode: "CAH"
    },
    {
        cityName: "Con Dao",
        airportCode: "VCS"
    },
    {
        cityName: "Quang Ngai",
        airportCode: "VCL"
    },
    {
        cityName: "Da Lat",
        airportCode: "DLI"
    },
    {
        cityName: "Dien Bien Phu",
        airportCode: "DIN"
    },
    {
        cityName: "Dong Hoi",
        airportCode: "VDH"
    },
    {
        cityName: "Pleiku",
        airportCode: "PXU"
    },
    {
        cityName: "Quy Nhon",
        airportCode: "UIH"
    },
    {
        cityName: "Vung Tau",
        airportCode: "VTG"
    },
    {
        cityName: "Rach Gia",
        airportCode: "VKG"
    },
    {
        cityName: "Tuy Hoa",
        airportCode: "TBB"
    },
    {
        cityName: "Thanh Hoa",
        airportCode: "THD"
    },
]

module.exports = {
    quickSearchHotelTripOptions,
    tripQuickSearchURL,
    quickSearchAttractionsTripOptions,
    tripAutoCompletePayload,
    tripAutoCompleteURL,
    tripAutoCompleteHeaders,
    tripGetHotelListIdURL,
    tripGetHotelListURLPayload,
    tripAdvancedSearchHeaders,
    autocompleteQueryParamAgoda,
    autocompletePayloadBooking,
    agodaAutocompleteURL,
    bookingAutocompleteURL,
    bookingAdvancedSearchHotelQueryParam,
    bookingAdvancedSearchHotelURL,
    agodaAdvancedSearchHotelURL,
    agodaAdvancedSearchHotelPayload,
    agodaGetFlightPayload,
    agodaGetFlightURL,
    tripComGetFlightPayload,
    tripComGetFlightURL,
    myTripGetFlightPayload,
    myTripGetFlightURL,
    myTripGetMoreFlightPayload,
    myTripGetMoreFlightURL,
    bayDepGetFlightPayload,
    bayDepGetFlightURL,
    airportOptions
};
