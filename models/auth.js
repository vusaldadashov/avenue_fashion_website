const mongoose = require('mongoose')

const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    favorites: {
        type: Array,
        default: []
    },
    postalCode: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    }
})
module.exports = mongoose.model('Users', userSchema)