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

// autocomplete for Agoda.com
router.post('/oauth/v1/autocomplete', userController.agodaAutocomplete);

// autocomplete for Booking.com
router.post('/oauth/v2/autocomplete', userController.bookingAutoComplete);

// advanced search for hotels
router.post('/advanced-search/hotels', userController.advancedSearchHotels)

// price comparison for hotels
router.post('/price-comparison/hotels', userController.priceComparisonHotels)

// advanced search for hotels to do price comparison
router.get('/advanced-search/hotels/agoda', userController.advancedSearchHotelAgoda)
router.get('/advanced-search/hotels/booking', userController.advancedSearchHotelBooking)

// quick search for hotels
router.get('/quick-search/hotels/:keyword', userController.quickSearchHotels)

// quick search for attractions
router.get('/quick-search/attractions/:keyword', userController.quickSearchAttractions)

// user login success - get new token
router.get('/refresh', userController.refreshToken)

// user logout
router.get('/logout', userController.logout)

// user register
router.post('/signup', userController.signup)

router.get('/user/:token/verify-email', userController.verifyEmail) 


module.exports = router;
