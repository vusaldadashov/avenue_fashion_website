const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    rating: {
        type:Number
    },
    code: {
        type: String,
        requried: true
    },
    tags:{
        type: Array,
        default: undefined
    },
    description :{
        type:String,
        required: true
    },
    qualities : {
        type:Array,
        deafult:undefined
    },
    images: {
        type:Array,
        default: undefined
    },
    review: {
        type:Number,
    },
    price: {
        currentPrice: {type: String},
        lastPrice: {type: String}
    },
    gender: {
        type: String
    }
})

module.exports = mongoose.model('Products', productSchema)