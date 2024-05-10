const mongoose = require('mongoose');

const favortitesSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    collections: [
        {
            name: {
                type: String,
            },
            description: {
                type: String,
            },
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

module.exports = mongoose.model('Favorites', favortitesSchema)