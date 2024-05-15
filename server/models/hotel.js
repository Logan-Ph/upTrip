const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    city: { 
        type: Number, 
    },
    cityName: { 
        type: String, 
    },
    provinceId: { 
        type: Number, 
    },
    countryId: { 
        type: Number, 
    },
    districtId: { 
        type: Number, 
    },
    checkin: { 
        type: String, 
    },
    checkout: { 
        type: String, 
    },
    hotelName: { 
        type: String, 
    },
    lat: { 
        type: String, 
    },
    lon: { 
        type: String, 
    },
    searchValue: { 
        type: String,
    },
    searchCoordinate: { 
        type: String,
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
    },
    hotelId: { 
        type: Number, 
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
