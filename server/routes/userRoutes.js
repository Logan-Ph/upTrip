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

// autocomplete attractions from Trip.com
router.post('/attractions/autocomplete', userController.attractionsAutocomplete);

// autocomplete for Agoda.com
router.post('/agoda/autocomplete', userController.agodaAutocomplete);
router.post('/tours/autocomplete', userController.agodaTourAutocomplete);

router.post('/tours', userController.agodaTourAdvancedSearch);

// autocomplete for Booking.com
router.post('/booking/autocomplete', userController.bookingAutoComplete);

// advanced search for hotels
router.post('/advanced-search/hotels', userController.advancedSearchHotels)

// price comparison for hotels
router.post('/price-comparison/hotels', userController.priceComparisonHotels)

// advances search for specific hotels in Trip.com
router.post('/advanced-search-specific/hotels', userController.advancedSearchSpecificHotelTrip)

// advanced search for attractions in Trip.com
router.post('/attractions', userController.tourAttractions)

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

// add new favorite collection
router.post('/add-new-collection', userController.addNewCollection);

// fetch favorites
router.get('/fetch-favrotites', userController.fetchFavorites);

// add to favorites
router.post('/add-to-favorites', userController.addToFavorites)

// remove from favorites
router.delete('/delete-from-favorites/hotel/:id/:hotelName', userController.deleteHotel)
router.delete('/delete-from-favorites/flight/:id/:flightNo', userController.deleteFlight)
router.delete('/delete-from-favorites/attraction/:id/:attractionName', userController.deleteAttraction)




module.exports = router;
