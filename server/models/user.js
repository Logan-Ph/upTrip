const moongose = require('mongoose')

const userSchema = new moongose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    googleId: String,
    verified: Boolean,
    refreshToken: String
})

module.exports = moongose.model('User', userSchema)