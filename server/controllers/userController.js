require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cheerio = require("cheerio");
const User = require("../models/user");
const Favorites = require("../models/favorites");
const Itinerary = require("../models/itinerary");
const { stringSimilarity } = require("string-similarity-js");
const {
    generateToken,
    generateRefreshToken,
    sendEmailVerification,
    propertyFacilitiesAndServices,
    roomFacilitiesAndServices,
    bedOptions,
    formatMinutesToHoursAndMinutes
} = require("../utils/helper");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");
const {
    tripQuickSearchURL,
    quickSearchHotelTripOptions,
    quickSearchAttractionsTripOptions,
    tripAutoCompletePayload,
    tripAutoCompleteHeaders,
    tripAutoCompleteURL,
    tripAdvancedSearchHeaders,
    tripGetHotelListURLPayload,
    tripGetHotelListIdURL,
    autocompleteQueryParamAgoda,
    agodaAutocompleteURL,
    bookingAutocompleteURL,
    autocompletePayloadBooking,
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
    airportOptions,
    tripAdvancedSearchSpecificHotelURL,
    advancedSearchSpecificHotelQueryParam,
    bookingSecondaryAutocompleteURL,
    secondaryAutocompletePayloadBooking,
    tripComGetTourAttractionsAutocompletePayload,
    tripComGetTourAttractionsAutocompleteURL,
    tripComGetTourAttractionsURL,
    tripGetTourAttractionsPayload,
    agodaTourAttractionsAutocompleteURL,
    agodaTourAttractionsAutocompletePayload,
    agodaTourAttractionsAdvancedSearchPayload,
    agodaTourAttractionsAdvancedSearchURL,
    agodaTourAttractionsAdvancedSearchHeaders,
    agodaTourAttractionsAdvancedSearchParams,
} = require("../utils/requestOptions");
const { errorMonitor } = require("nodemailer/lib/xoauth2");

exports.homePage = (req, res) => {
    res.send("This is homepage");
};

exports.getLogin = (req, res) => {
    res.send("This is login page");
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("Invalid credentials");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return res.status(400).send("Invalid credentials");

    const refreshToken = generateRefreshToken(user);

    const userToken = generateToken(user);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 30 * 60 * 1000,
        secure: true,
    }); // 30 minutes

    return res.status(200).json({
        success: true,
        roles: [2001],
        email,
        _id: user._id,
        accessToken: userToken,
    });
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) return res.status(401).send("You are not logged in");

    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).send("Token is not valid");

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).send("User not found");

        const accessToken = generateToken(user);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            accessToken: accessToken,
            roles: [2001],
        });
    });
};

exports.googleLogin = async (req, res) => {
    const { email, given_name, family_name, email_verified, sub, picture } =
        req.body;
    const user = await User.findOne({ email });
    if (!user) {
        const newUser = new User({
            name: `${given_name} ${family_name}`,
            email,
            googleId: sub,
            verified: email_verified,
            img: picture,
        });
        await newUser.save();
        const userToken = generateToken(newUser);
        const refreshToken = generateRefreshToken(newUser);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            maxAge: 30 * 60 * 1000,
            secure: true,
        }); // 30 minutes
        return res.status(200).json({
            success: true,
            roles: [2001],
            email: newUser.email,
            _id: newUser._id,
            accessToken: userToken,
        });
    } else if (!user.googleId) {
        return res.status(400).send("Email is already registered");
    } else {
        const userToken = generateToken(user);
        const refreshToken = generateRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            maxAge: 30 * 60 * 1000,
            secure: true,
        }); // 30 minutes
        return res.status(200).json({
            success: true,
            roles: [2001],
            email: user.email,
            _id: user._id,
            accessToken: userToken,
        });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    }); // remove the cookies
    req.session.destroy();
    res.status(200).send("Logged out");
};

exports.signup = async (req, res) => {
    try {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const email = req.body.email;

        if (!emailRegex.test(email)) {
            throw new Error("Invalid email address");
        }

        if (await User.findOne({ email: email })) {
            throw new Error("Email already exists.");
        }

        const userData = {
            email: email,
            password: req.body.password,
            name: `${req.body.firstName} ${req.body.lastName}`,
        };

        sendEmailVerification(userData, "10m", res);
        return res
            .status(200)
            .json(
                "Thank you for registering! A verification email has been sent to your email address. Please check your inbox and follow the instructions to verify your account. If you don't see the email, please check your spam folder."
            );
    } catch (error) {
        return res.status(500).send(error.message || "Error Occured");
    }
};

exports.verifyEmail = async (req, res) => {
    jwt.verify(
        req.params.token,
        process.env.VERIFY_EMAIL,
        async (err, userData) => {
            if (err) return res.status(500).json("Invalid Link");

            if (await User.findOne({ email: userData.email })) {
                return res.status(500).json("Email already exists.");
            }

            const newUser = new User({
                email: userData.email,
                password: await bcrypt.hash(userData.password, 10),
                name: userData.name,
                verified: true,
            });
            await newUser.save();

            return res.status(200).json("Email verified successfully");
        }
    );
};

exports.quickSearchHotels = async (req, res) => {
    try {
        const { keyword, pageIndex } = req.body;
        const options = quickSearchHotelTripOptions(
            keyword,
            pageIndex || 1,
            10
        );
        const response = await axios.post(tripQuickSearchURL, options);
        const data = response.data.data[0]["itemList"];
        const pageTotal = response.data.total;
        const isLastPage = response.data.isLastPage;
        return res.status(200).json({
            hotels: data,
            pageTotal: pageTotal,
            isLastPage: isLastPage,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.quickSearchAttractions = async (req, res) => {
    try {
        const { keyword, pageIndex } = req.body;
        const options = quickSearchAttractionsTripOptions(
            keyword,
            pageIndex || 1,
            10
        );
        const response = await axios.post(tripQuickSearchURL, options);
        const data = response.data.data[0]["itemList"];
        const pageTotal = response.data.total;
        const isLastPage = response.data.isLastPage;
        return res.status(200).json({
            attractions: data,
            pageTotal: pageTotal,
            isLastPage: isLastPage,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.getAppConfig = async (req, res) => {
    return res.status(200).json({
        propertyFacilitiesAndServices: propertyFacilitiesAndServices(),
        roomFacilitiesAndServices: roomFacilitiesAndServices(),
        bedOptions: bedOptions(),
    });
};

exports.autocomplete = async (req, res) => {
    try {
        const { keyword } = req.body; // get keyword at body
        const options = tripAutoCompletePayload(keyword); // get the payload options
        const headers = tripAutoCompleteHeaders(); // get the headers
        const response = await axios.post(tripAutoCompleteURL, options, {
            headers: headers,
        }); // send the request
        return res.status(200).json(response.data); // return the response
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.advancedSearchHotels = async (req, res) => {
    try {
        const headers = tripAdvancedSearchHeaders();
        let {
            preHotelIds,
            city,
            cityName,
            provinceId,
            countryId,
            districtId,
            checkin,
            checkout,
            cityType,
            latitude,
            longitude,
            searchCoordinate,
            crn, // number of rooms
            adult,
            children, // children=3&ages=0,15,4 -> decoded version
            domestic,
            listFilters,
        } = req.body;

        const queryParam = {
            // city: 286,
            city: Number(city),
            // cityName: "Hanoi",
            cityName: cityName,
            // provinceId: 0,
            provinceId: Number(provinceId),
            // countryId: 111,
            countryId: Number(countryId),
            // districtId: 0,
            districtId: Number(districtId),
            // checkin: "20240518",
            checkin: String(checkin),
            // checkout: "20240520",
            checkout: String(checkout),
            barCurr: "USD",
            // cityType: "OVERSEA",
            cityType: String(cityType),
            // latitude: "21.030735",
            latitude: String(latitude),
            // longitude: "105.852398",
            longitude: String(longitude),
            // searchCoordinate:
            //     "BAIDU_-1_-1_0|GAODE_-1_-1_0|GOOGLE_-1_-1_0|NORMAL_21.030735_105.852398_0",
            searchCoordinate: String(searchCoordinate),

            // crn: 1, // number of rooms
            crn: Number(crn),

            // adult: 1,
            adult: Number(adult),

            // children: 0, // children=3&ages=0,15,4 -> decoded version
            children: Number(children),
            searchBoxArg: "t",
            travelPurpose: 0,
            ctm_ref: "ix_sb_dl",
            domestic: domestic,
            listFilters: listFilters,
            locale: "en_US",
            curr: "USD",
        };

        const href = `https://us.trip.com/hotels/list?city=${queryParam.city}&cityName=${queryParam.cityName}&provinceId=${queryParam.provinceId}&countryId=${queryParam.countryId}&districtId=${queryParam.districtId}&checkin=${queryParam.checkin}&checkout=${queryParam.checkout}&barCurr=${queryParam.barCurr}&crn=${queryParam.crn}&adult=${queryParam.adult}&children=${queryParam.children}&searchBoxArg=${queryParam.searchBoxArg}&travelPurpose=${queryParam.travelPurpose}&ctm_ref=${queryParam.ctm_ref}&domestic=${queryParam.domestic}&listFilters=${queryParam.listFilters}&locale=${queryParam.locale}&curr=${queryParam.curr}`;
        if (preHotelIds) preHotelIds = preHotelIds.map(Number);

        const payload = tripGetHotelListURLPayload(
            preHotelIds ? preHotelIds : [],
            queryParam.checkin,
            queryParam.checkout,
            queryParam.countryId,
            queryParam.provinceId,
            queryParam.city,
            queryParam.districtId || 0,
            queryParam.cityType === "OVERSEA" ? true : false,
            queryParam.crn || 1,
            queryParam.latitude,
            queryParam.longitude,
            queryParam.listFilters,
            href
        );

        const response = await axios.post(tripGetHotelListIdURL, payload, {
            headers: headers,
        });

        const hotelName = response.data.hotelList.map(
            (hotel) => hotel.hotelBasicInfo.hotelName
        );
        preHotelIds = response.data.hotelList.map(
            (hotel) => hotel.hotelBasicInfo.hotelId
        );

        return res.status(200).json({
            hotelList: response.data.hotelList,
            hotelName,
            preHotelIds,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.agodaAutocomplete = async (req, res) => {
    try {
        const { keyword } = req.body;
        const headers = {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
        };

        const response = await axios.get(agodaAutocompleteURL, {
            params: autocompleteQueryParamAgoda(keyword),
            headers: headers,
        });

        const matchHotel = response.data.ViewModelList[1] || null;

        return res.status(200).json({ matchHotel });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.bookingAutoComplete = async (req, res) => {
    try {
        const { keyword } = req.body;

        const headers = {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
        };

        const response = await axios.post(
            bookingAutocompleteURL,
            autocompletePayloadBooking(keyword),
            {
                headers: headers,
            }
        );

        const matchHotel = response.data.results[0];

        return res.status(200).json({ matchHotel });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.agodaTourAutocomplete = async (req, res) => {
    try {
        const { keyword } = req.body;
        const headers = {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
        }
        const response = await axios.get(agodaTourAttractionsAutocompleteURL, { params: agodaTourAttractionsAutocompletePayload(keyword), headers: headers });
        return res.status(200).json(response.data.suggestionList[0] || null);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.priceComparisonHotels = async (req, res) => {
    try {
        const {
            hotelNames,
            cityName,
            checkin,
            checkout,
            crn,
            adult,
            children,
            childAges,
            resultType,
        } = req.body;

        const keyword = (hotelNames, cityName, resultType) => {
            switch (resultType) {
                case "CT":
                case "LM":
                case "H":
                default:
                    return hotelNames;
            }
        };

        const agodaPromises = hotelNames.map((hotelName) =>
            axios.post("http://localhost:4000/agoda/autocomplete", {
                keyword: keyword(hotelName, cityName, resultType),
            })
        );

        const bookingPromises = hotelNames.map((hotelName) =>
            axios.post("http://localhost:4000/booking/autocomplete", {
                keyword: keyword(hotelName, cityName, resultType),
            })
        );

        // Wait for all promises from both agoda and booking to resolve
        const agodaResults = await Promise.all(agodaPromises);
        const bookingResults = await Promise.all(bookingPromises);

        const handleSecondaryBooking = async (hotelName, index) => {
            if (!bookingResults[index].data.matchHotel) {
                try {
                    const secondaryResponse = await axios.post(
                        bookingSecondaryAutocompleteURL,
                        secondaryAutocompletePayloadBooking(hotelName)
                    );
                    return secondaryResponse.data.data.searchPlaces.results[0];
                } catch (error) {
                    console.error(
                        "Error fetching secondary booking data:",
                        error
                    );
                    return null;
                }
            } else {
                return bookingResults[index].data;
            }
        };

        // Map over bookingResults to handle missing matchHotel
        const bookingHotels = await Promise.all(
            bookingResults.map((response, index) => {
                return handleSecondaryBooking(hotelNames[index], index);
            })
        );

        // Combine the results into a single response
        let combinedResults = hotelNames.map((hotelName, index) => ({
            hotelName,
            agoda: agodaResults[index].data,
            booking: bookingHotels[index],
        }));

        // Send POST requests to "/advanced-search/hotels/agoda" for each hotel
        const agodaAdvancedSearchPromises = combinedResults.map((hotel) => {
            const payload = {
                objectId: hotel?.agoda?.matchHotel?.ObjectId,
                checkin: checkin.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
                checkout: checkout.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
                rooms: crn,
                adults: adult,
                children: children,
                childAges: childAges,
                cityId: hotel?.agoda?.matchHotel?.CityId,
            };

            return axios
                .post(
                    "http://localhost:4000/advanced-search/hotels/agoda",
                    payload
                )
                .then(
                    (response) =>
                        response.data.pricing.offers[0].roomOffers[0].room
                            .pricing
                ) // Extract only the data needed
                .catch((err) => {
                    return null; // Return null or appropriate fallback if the request fails
                });
        });

        // Send POST requests to "/advanced-search/hotels/booking" for each hotel
        const bookingAdvancedSearchPromises = combinedResults.map((hotel) => {
            const payload = {
                keyword:
                    hotel.booking?.matchHotel?.value || hotel.booking?.label,
                checkin: checkin.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
                checkout: checkout.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
                group_adults: adult,
                no_rooms: crn,
                group_children: children,
                age: childAges,
            };

            return axios
                .post(
                    "http://localhost:4000/advanced-search/hotels/booking",
                    payload
                )
                .then((response) => response.data)
                .catch((err) => {
                    return null;
                });
        });

        // Wait for all advanced search promises to resolve
        const agodaAdvancedSearchResults = await Promise.all(
            agodaAdvancedSearchPromises
        );
        const bookingAdvancedSearchResults = await Promise.all(
            bookingAdvancedSearchPromises
        );

        // Filter out any null responses due to errors
        combinedResults = combinedResults
            .map((hotel, index) => ({
                ...hotel,
                agodaPrice: agodaAdvancedSearchResults[index],
                bookingPrice: bookingAdvancedSearchResults[index],
            }))
            .filter((hotel) => hotel.advancedSearch !== null);

        return res.status(200).json(combinedResults);
    } catch (error) {
        console.log("Error in priceComparisonHotels:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error });
    }
};

exports.advancedSearchSpecificHotelTrip = async (req, res) => {
    try {
        const {
            city,
            cityName,
            provinceId,
            countryId,
            districtId,
            checkin, // type: yyyymmdd
            checkout, // type: yyyymmdd
            hotelName,
            lat,
            lon,
            searchValue,
            searchCoordinate,
            adult,
            ages,
            domestic,
            children,
            crn,
        } = req.body;

        const queryParam = advancedSearchSpecificHotelQueryParam(
            Number(city), // 1777: Number
            cityName, // "Nha Trang": String
            Number(provinceId), // 11120: Number
            Number(countryId), // 111: Number
            Number(districtId), // 0: Number
            String(checkin), // "2024/05/24": String
            String(checkout), // "2024/05/25": String
            lat,
            lon,
            String(hotelName),
            String(searchValue),
            String(searchCoordinate),
            Number(adult),
            Number(children),
            String(ages), // "4,9,0"
            Boolean(domestic),
            Number(crn)
        );

        const headers = {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Upgrade-Insecure-Requests": 1,
        };

        const response = await axios.get(tripAdvancedSearchSpecificHotelURL, {
            headers: headers,
            params: queryParam,
        });

        const html = response.data;
        const $ = cheerio.load(html);
        const targetDiv = $(".with-decorator-wrap-v8");
        const img = targetDiv.find("img").attr("src");
        const describe = targetDiv.find(".describe").text();
        const reviewCounts = targetDiv.find(".count").text();
        const reviewScore = targetDiv.find(".score").text();
        const name = targetDiv.find(".list-card-title").text();
        const starNum = targetDiv.find(".list-card-title > div > i").length;
        const saleOff = targetDiv.find(".favour").text();
        const transportInfo = targetDiv
            .find(".list-card-transport-v8 .transport span:not(.split-dot.trans-icon)")
            .map((i, el) => {
                return $(el).text().trim(); // Trim to remove any extra whitespace
            })
            .filter((i, el) => {
                return el !== "";
            })
            .get();
        const priceExplain = targetDiv.find(".price-explain");
        const price = priceExplain?.contents()?.filter(function () {
            // Filter out the <br/> elements
            return this.type === 'text';
        }).map(function () {
            // Map over each text node and trim it
            return $(this).text().trim();
        })?.get()?.join(' ');
        const priceMatch = price?.match(/VND ([\d,]+)/);
        const nightsMatch = price?.match(/× (\d+) nights/);
        const realPrice = parseInt(priceMatch?.[1]?.replace(/,/g, ''), 10) / parseInt(nightsMatch?.[1], 10)

        const matchHotel = {
            img,
            name,
            saleOff,
            price: realPrice,
            starNum,
            describe,
            reviewCounts,
            reviewScore,
            transportInfo,
        };
        res.status(200).json({ matchHotel });
    } catch (er) {
        console.log(er)
        return res.status(500).json(error);
    }
};

exports.advancedSearchHotelAgoda = async (req, res) => {
    try {
        const {
            objectId,
            checkin,
            checkout,
            rooms,
            adults,
            children,
            childAges,
            cityId,
        } = req.body;

        if (objectId === "10901788") {
            console.log(req.body);
        }

        const payload = agodaAdvancedSearchHotelPayload(
            Number(objectId),
            checkin,
            checkout,
            Number(rooms),
            Number(adults),
            Number(children),
            childAges || [],
            Number(cityId)
        );

        const headers = {
            "Ag-Language-Locale": "vi-vn",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
        };

        const response = await axios.post(
            agodaAdvancedSearchHotelURL,
            payload,
            { headers: headers }
        );

        return res
            .status(200)
            .json(response.data?.data?.citySearch?.properties[0]);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.advancedSearchHotelBooking = async (req, res) => {
    try {
        const {
            keyword,
            checkin,
            checkout,
            group_adults,
            no_rooms,
            group_children,
            age,
        } = req.body;

        const params = bookingAdvancedSearchHotelQueryParam(
            keyword,
            checkin,
            checkout,
            Number(group_adults),
            Number(no_rooms),
            Number(group_children),
            age
        );

        const headers = {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Upgrade-Insecure-Requests": 1,
        };

        const response = await axios.get(bookingAdvancedSearchHotelURL, {
            headers: headers,
            params: params,
        });

        const html = response.data;
        const $ = cheerio.load(html);
        // Find the script tag with the specific data-capla-namespace attribute
        const scriptTag = $('script[data-capla-store-data="apollo"]');
        // Extract the content of the script tag
        const scriptContent = JSON.parse(scriptTag.html());
        const searchQueriesArray = Object?.values(
            scriptContent["ROOT_QUERY"]["searchQueries"]
        );
        const hotel = searchQueriesArray[1]["results"][0]; // select the name by ".displayName.text"
        return res.status(200).json({ price: hotel.blocks });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.agodaTourAdvancedSearch = async (req, res) => {
    try {
        const { cityId, pageIndex } = req.body
        const queryString = `?operation=search&cityId=${cityId}&pageNumber=${pageIndex}`
        const payload = agodaTourAttractionsAdvancedSearchPayload({ queryString, cityId: Number(cityId), pageIndex: Number(pageIndex) })
        const response = await axios.post(agodaTourAttractionsAdvancedSearchURL, payload, {
            headers: agodaTourAttractionsAdvancedSearchHeaders(),
            params: agodaTourAttractionsAdvancedSearchParams({ cityId: cityId, pageNumber: pageIndex })
        })
        return res.status(200).json(response?.data?.data?.search?.result?.activities)
    } catch (er) {
        console.log(er)
        return res.status(500).json(er)
    }
}

exports.advancedSearchFlights = async (req, res) => {
    try {
        const url = agodaGetFlightURL;
        let items = {
            flights: [],
            priceMax: 0,
            priceStep: 0
        };
        const payload = agodaGetFlightPayload(req.body)
        const response = await axios.post(url, payload, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            }
        });
        for (const item of response.data.trips[0].bundles) {
            const flightNo = []
            const airline = []
            let arrival
            for (const flight of item.outboundSlice.segments) {
                flightNo.push(flight.carrierContent.carrierCode + flight.flightNumber)
                airline.push(flight.carrierContent.carrierName)
                arrival = flight.arrivalDateTime
            }
            items.flights.push({
                flightNo: flightNo,
                departureTime: item.outboundSlice.segments[0].departDateTime,
                arrivalTime: arrival,
                airline: airline,
                duration: formatMinutesToHoursAndMinutes(item.outboundSlice.duration),
                agodaPrice: item.bundlePrice[0].price.vnd.display.averagePerPax.allInclusive,
            })
        }
        items.priceMax = response.data.trips[0].filters.price.to;
        items.priceStep = response.data.trips[0].filters.price.step
        return res.status(200).json(items)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.attractionsAutocomplete = async (req, res) => {
    try {
        const { keyword } = req.body
        const payload = tripComGetTourAttractionsAutocompletePayload(keyword)
        const response = await axios.post(tripComGetTourAttractionsAutocompleteURL, payload, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            }
        })
        return res.status(200).json(response?.data?.cityItems || [])
    } catch (er) {
        console.log(er)
        return res.status(500).json(er)
    }
}

exports.tourAttractions = async (req, res) => {
    try {
        const { districtId, pageIndex } = req.body
        const payload = tripGetTourAttractionsPayload(districtId, pageIndex)
        const response = await axios.post(tripComGetTourAttractionsURL, payload, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            }
        })
        return res.status(200).json(response?.data?.attractionList || [])
    } catch (er) {
        console.log(er)
        return res.status(500).json(er)
    }
}

exports.getTripComFlight = async (req, res) => {
    try {
        const items = []
        let url = tripComGetFlightURL;
        let payload = tripComGetFlightPayload(req.body)
        const response = await axios.post(url, payload, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            }
        })
        for (const item of response.data.data.flightListSearch.flightProductList) {
            const flightNo = []
            const airline = []
            for (const flight of item.segmentList[0].flightList) {
                flightNo.push(flight.flightNo)
                airline.push(flight.airline.code)
            }
            items.push({
                flightNo: flightNo,
                airline: airline,
                price: item.price.averagePrice
            })
        }
        return res.status(200).json(items)
    } catch (er) {
        return res.status(500).json(er)
    }
}

exports.getMyTripFlight = async (req, res) => {
    try {
        const items = []
        let totalFlight;
        let response = await axios.post(myTripGetFlightURL, myTripGetFlightPayload(req.body), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            }
        })
        totalFlight = response.data.data.search.flightsCount
        for (const item of response.data.data.search.flights) {
            const flightNo = []
            const airline = []
            let arrival;
            for (const flight of item.bounds[0].segments) {
                if (flight.__typename == 'TripSegment') {
                    flightNo.push(flight.flightNumber)
                    airline.push(flight.marketingCarrier.code)
                    arrival = flight.arrivedAt
                }
            }
            items.push({
                flightNo: flightNo,
                price: item.travelerPrices[0].price.price.value / 100 * 25000,
            })
        }
        while (items.length < totalFlight) {
            response = await axios.post(myTripGetMoreFlightURL, myTripGetMoreFlightPayload(req.body, items.length), {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                }
            })
            for (const item of response.data.data.search.flights) {
                const flightNo = []
                const airline = []
                let arrival;
                for (const flight of item.bounds[0].segments) {
                    if (flight.__typename == 'TripSegment') {
                        flightNo.push(flight.flightNumber)
                        airline.push(flight.marketingCarrier.code)
                        arrival = flight.arrivedAt
                    }
                }
                items.push({
                    flightNo: flightNo,
                    price: item.travelerPrices[0].price.price.value / 100 * 25000,
                })
            }
        }
        return res.status(200).json(items)
    } catch (er) {
        console.log(er)
        return res.status(500).json(er)
    }
}

exports.getBayDepFlight = async (req, res) => {
    try {
        const items = []
        const sendRequest = async (url, payload) => {
            try {
                const response = await axios.post(url, payload, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                    }
                });
                return response;
            } catch (error) {
                throw new Error(`Error sending request: ${error.message}`);
            }
        };
        const requests = bayDepGetFlightPayload(req.body).map(payload => {
            return sendRequest(bayDepGetFlightURL, payload);
        });
        const response = await Promise.all(requests)
        for (const res of response) {
            if (!res.data.ListFareOption) {
                throw new Error('Invalid response: ListFareOption not found');
            }
            for (const item of res.data.ListFareOption) {
                const flightNo = []
                const airline = []
                airline.push(item.Carrier)
                for (const flight of (item.ListFareData[0].ListFlight[0].FlightNumber).split(',')) {
                    flightNo.push(flight)
                }
                items.push({
                    flightNo: flightNo,
                    price: item.PriceAdt
                })
            }
        }
        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.flightSearchAutocomplete = async (req, res) => {
    try {
        const result = []
        for (const opt of airportOptions) {
            if (stringSimilarity(req.body.input, opt.cityName) > 0 || stringSimilarity(req.body.input, opt.airportCode) > 0) {
                opt.similarity = Math.max(stringSimilarity(req.body.input, opt.cityName), stringSimilarity(req.body.input, opt.airportCode))
                result.push(opt)
            }
        }
        result.sort((a, b) => b.similarity - a.similarity);
        return res.status(200).json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.addNewCollection = async (req, res) => {

}

exports.addToFavorites = async (req, res) => {
    try {
        let favorites = await Favorites.findOne({ userID: req.body.userID });

        if (!favorites) {
            favorites = new Favorites({
                userID: req.body.userID,
                flights: [],
                hotels: [],
                attractions: [],
            });
        }

        switch (req.body.itemType) {
            case "hotel":
                favorites.hotels.push(req.body.hotelName);
                break;
            case "flight":
                favorites.flights.push({
                    flightNo: req.body.flightNo,
                    departure: req.body.departure,
                    arrival: req.body.arrival,
                    from: req.body.from,
                    to: req.body.to,
                    agency: req.body.agency,
                });
                break;
            case "attraction":
                favorites.attractions.push(req.body.attractionName);
                break;
        }
        await favorites.save();
        return res.status(200).json("Added to Favorites")
    } catch (err) {
        return res.status(500).json("Error. Try again later")
    }
}

exports.deleteHotel = async (req, res) => {
    try {
        const favorites = await Favorites.findOne({ userID: req.params.id });
        if (!favorites || favorites.hotels.length == 0) throw new Error("Favorites is empty");
        favorites.hotels = favorites.hotels.filter(hotel => hotel !== req.params.hotelName);
        await favorites.save()
        return res.status(200).json("Deleted successfully")
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.message || "Error. Try again later")
    }
}

exports.deleteFlight = async (req, res) => {
    try {
        const favorites = await Favorites.findOne({ userID: req.params.id });
        if (!favorites || favorites.flights.length == 0) throw new Error("Favorites is empty");
        favorites.flights = favorites.flights.filter(flight => flight.flightNo !== req.params.flightNo);
        await favorites.save()
        return res.status(200).json("Deleted successfully")
    } catch (err) {
        return res.status(500).json(err.message || "Error. Try again later")
    }
}

exports.deleteAttraction = async (req, res) => {
    try {
        const favorites = await Favorites.findOne({ userID: req.params.id });
        if (!favorites || favorites.attractions.length == 0) throw new Error("Favorites is empty");
        favorites.attractions = favorites.attractions.filter(attraction => attraction !== req.params.attractionName);
        await favorites.save()
        return res.status(200).json("Deleted successfully")
    } catch (err) {
        return res.status(500).json(err.message || "Error. Try again later")
    }
}

exports.addToItinerary = async (req, res) => {
    try {
        let list = await Itinerary.findOne({ userID: req.body.userID });

        if (!list) {
            list = new Favorites({
                userID: req.body.userID,
                flights: [],
                hotels: [],
                attractions: [],
            });
        }

        switch (req.body.itemType) {
            case "hotel":
                favorites.hotels.push(req.body.hotelName);
                break;
            case "flight":
                favorites.flights.push({
                    flightNo: req.body.flightNo,
                    departure: req.body.departure,
                    arrival: req.body.arrival,
                    from: req.body.from,
                    to: req.body.to,
                    agency: req.body.agency,
                });
                break;
            case "attraction":
                favorites.attractions.push(req.body.attractionName);
                break;
        }
        await favorites.save();
        return res.status(200).json("Added to Favorites")
    } catch (err) {
        return res.status(500).json("Error. Try again later")
    }
}