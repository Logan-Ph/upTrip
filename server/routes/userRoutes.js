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

// hotel detail page
router.post("/hotel-info", userController.hotelInfo)
router.post("/near-by-hotels", userController.nearByHotels)
router.post("/hotel-albums", userController.hotelAlbums)
router.post("/hotel-comments", userController.hotelComments)

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

// fetch collection
router.get('/fetch-collection', userController.fetchCollections);

router.get('/favorite-items', userController.favoriteItems)

// remove colletion
// edit collection

router.post("/add-to-collection/hotel", userController.addToCollectionHotel)
router.post("/delete-from-collection/hotel", userController.deleteFromCollectionHotel)

router.post("/add-to-collection/experience", userController.addToCollectionExperience)
router.post("/delete-from-collection/experience", userController.deleteFromCollectionExperience)

router.post("/add-to-collection/flight", userController.addToCollectionFlight)

router.post("/add-new-itinerary", userController.addNewItinerary)

router.get("/fetch-itinerary", userController.fetchItinerary)
router.post("/fetch-detail-itinerary", userController.fetchDetailItinerary)

router.post("/delete-itinerary", userController.deleteItinerary)

router.post("/edit-itinerary", userController.editItinerary)

router.post("/add-to-itinerary/flight", userController.addFlightItinerary)
router.post("/delete-from-itinerary/flight", userController.deleteFlightItinerary)

router.post("/add-to-itinerary/hotel", userController.addHotelItinerary)
router.post("/add-to-itinerary/experience", userController.addExperienceItinerary)
router.post("/delete-from-itinerary/hotel", userController.deleteHotelFromItinerary)
router.post("/delete-from-itinerary/experience", userController.deleteExperienceFromItinerary)

// remove-from-favorites/hotel
// remove-from-favorites/flight
// remove-from-favorites/experience


// add-to-itinerary/hotel
// add-to-itinerary/flight
// add-to-itinerary/experience

// remove-from-itinerary/hotel
// remove-from-itinerary/flight
// remove-from-itinerary/experience

module.exports = router;
