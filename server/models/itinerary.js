const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    destination: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    tripLength: {
        type: Number,
    },
    imgSrc: { type: String },
    hotels: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Hotel'
        }
    ],
    flights: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Flight'
        }
    ], 
    schedules: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Schedule'
        }
    ] 
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
