const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNo: [
        {
            type: String,
            required: true
        }
    ],
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    carrier: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true,
    },
    day:  {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    seatClass: {
        type: String,
        required: true
    },
    imgSrc:  {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    // agodaPrice: {
    //     type: Number,
    // },
    // tripPrice: {
    //     type: Number
    // },
    // myTrip: {
    //     type: Number
    // },
    // bayDep: {
    //     type: Number
    // },
    adult: {
        type: Number,
    },
    child: {
        type: Number
    },
    infant: {
        type: Number
    }
})

module.exports = mongoose.model('Flight', flightSchema)
