const mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    notifAllow: {
        type: Boolean,
        required: true
    },

    name: {
        type: String,
        default: ""
    },

    surname: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('User', UserSchema)