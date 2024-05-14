const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    name: { 
        type: String, 
    },
    rating: { 
        type: Number 
    },
    description: { 
        type: String, 
    },
    startTime: { 
        type: String, 
    },
    endTime: { 
        type: String, 
    },
    price: { 
        type: Number, 
    },
    imgSrc: { 
        type: String, 
    },
});


module.exports = mongoose.model('Experience', experienceSchema);;
