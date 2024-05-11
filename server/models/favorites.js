const mongoose = require('mongoose');

const favortitesSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    collections: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Collection"
        }
    ]
})

module.exports = mongoose.model('Favorites', favortitesSchema)