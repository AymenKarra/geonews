const { query } = require('express')
const express=require('express')
const router = express.Router()
const News = require('../models/news_model')
const mongoose = require('mongoose')

//get all news coordinates
router.get('/', async (req,res) => {
    try {
        //const news = await News.find({},'coordenates')
        //JSON.stringify
        const news = await mongoose.model('news').find().distinct('coordenates')
        console.log(news.length)
        res.json(news)
      } catch (err) {
        res.status(500).json({ message: err.message })
        
      }
})

//get all news at the coordinate lat and lon
router.get('/:lat/:lon', async (req,res) => {
    try {
      const news = await News.find({
        coordenates:{
          lat: req.params.lat ,
          lon: req.params.lon
        }
      })
      res.json(news)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

module.exports = router