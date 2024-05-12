const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    flights: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Flight"
        },
    ],
    hotels: [{
        type: mongoose.Types.ObjectId,
        ref: "Hotel"
    }],
    experience: [{
        type: mongoose.Types.ObjectId,
        ref: "Experience"
    }]
})

module.exports = mongoose.model('Collection', collectionSchema)
