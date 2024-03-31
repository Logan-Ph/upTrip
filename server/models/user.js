const moongose = require('mongoose')

const userSchema = new moongose.Schema({
    name: String,
    email: String,
    password: String,
    googleId: String,
    verified: Boolean,
    img: String,
})

module.exports = moongose.model('User', userSchema)