const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    itinerary: [
        {
            title: String,
            flights: [
                {
                    flightNo: [
                        String
                    ],
                    from: String,
                    to: String,
                    departure: Date,
                    arrival: Date,
                    agency: String,
                },
            ],
            hotels: [{
                type: String
            }],
            attractions: [{
                type: String
            }]
        }
    ]
})

module.exports = mongoose.model('Itinerary', itinerarySchema);


