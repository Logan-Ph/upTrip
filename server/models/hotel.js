const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    city: { 
        type: Number, 
        required: true 
    },
    cityName: { 
        type: String, 
        required: true },
    provinceId: { 
        type: Number, 
        required: true 
    },
    countryId: { 
        type: Number, 
        required: true 
    },
    districtId: { 
        type: Number, 
        required: true 
    },
    checkin: { 
        type: String, 
    },
    checkout: { 
        type: String, 
    },
    hotelName: { 
        type: String, 
        required: true 
    },
    lat: { 
        type: String, 
        required: true 
    },
    lon: { 
        type: String, 
        required: true 
    },
    searchValue: { 
        type: String,
        required: true
    },
    searchCoordinate: { 
        type: String,
        required: true
    },
    adult: {
        type: Number, 
    },
    ages: { 
        type: String 
    },
    domestic: { 
        type: Boolean, 
    },
    children: { 
        type: Number 
    },
    crn: { 
        type: Number, 
        required: true 
    },
    tripPrice: { 
        type: Number, 
    },
    agodaPrice: { 
        type: Number, 
    },
    bookingPrice: { 
        type: Number, 
    },
    address: { 
        type: String
    },
    rating: { 
        type: Number 
    },
    imgSrc: { 
        type: String 
    }
});


module.exports = mongoose.model('Hotel', hotelSchema);
