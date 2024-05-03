require("dotenv").config;
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// user homepage
router.get("/", userController.homePage);

// user login
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.post('/google/auth/login', userController.googleLogin);

// autocomplete for Trip.com
router.post('/oauth/v0/autocomplete', userController.autocomplete);

// autocomplete tour & attractions from Trip.com
router.post('/tour-attractions/autocomplete', userController.tourAttractionsAutocomplete);

// autocomplete for Agoda.com
router.post('/agoda/autocomplete', userController.agodaAutocomplete);
router.post('/agoda/autocomplete/tour-attractions', userController.agodaTourAttractionsAutocomplete);

router.post('/agoda/tour-attractions', userController.agodaTourAttractionsAdvancedSearch);

// autocomplete for Booking.com
router.post('/booking/autocomplete', userController.bookingAutoComplete);

// advanced search for hotels
router.post('/advanced-search/hotels', userController.advancedSearchHotels)

// price comparison for hotels
router.post('/price-comparison/hotels', userController.priceComparisonHotels)

// advances search for specific hotels in Trip.com
router.post('/advanced-search-specific/hotels', userController.advancedSearchSpecificHotelTrip)

// advanced search for attractions in Trip.com
router.post('/tour-attractions', userController.tourAttractions)

// get app configuration for filter options in Trip.com
router.get('/get-app-config', userController.getAppConfig)

// advanced search for hotels to do price comparison
router.post('/advanced-search/hotels/agoda', userController.advancedSearchHotelAgoda)
router.post('/advanced-search/hotels/booking', userController.advancedSearchHotelBooking)

// quick search for hotels
router.post('/quick-search/hotels', userController.quickSearchHotels)

// quick search for attractions
router.post('/quick-search/attractions', userController.quickSearchAttractions)

// flight search
router.post('/advanced-search/flights', userController.advancedSearchFlights)

// flight search price 
router.post('/search-tripcom-flights', userController.getTripComFlight)
router.post('/search-my-trip-flights', userController.getMyTripFlight)
router.post('/search-bay-dep-flights', userController.getBayDepFlight)

// flight from/to autocomplete
router.post('/flight-search-autocomplete', userController.flightSearchAutocomplete)

// user login success - get new token
router.get('/refresh', userController.refreshToken)

// user logout
router.get('/logout', userController.logout)

// user register
router.post('/signup', userController.signup)

router.get('/user/:token/verify-email', userController.verifyEmail) 


module.exports = router;
