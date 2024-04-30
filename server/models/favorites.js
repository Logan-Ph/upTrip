const mongoose = require( 'mongoose' );

const favortitesSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    flights: [{
        flightNo: [
            String
        ],
        from: String,
        to: String,
        departure: Date,
        arrival: Date,
        agency: String,
    }],
    hotels: [{
        String
    }],
    attractions: [{
        name: String
    }]
})

module.exports = mongoose.model('Favorites', favortitesSchema)