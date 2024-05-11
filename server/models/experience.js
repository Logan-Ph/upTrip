const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    startTime: { 
        type: String, 
    },
    endTime: { 
        type: String, 
    },
    price: { 
        type: Number, 
    }
});


module.exports = mongoose.model('Experience', experienceSchema);;
