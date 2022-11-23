const { json } = require('express')
const mongoose=require('mongoose')

const news = new mongoose.Schema({
    title:{
        type : String 
    },
    location:{
        type : String
    },
    url:{
        type : String
    },
    content:{
        type : String
    },
    date: {
        type : String
    },
    media : {
        type : [String]
    },
    coordinates : {
        lat:{type : String},
        lon:{type : String}
    }
})

module.exports = mongoose.model('news',news)