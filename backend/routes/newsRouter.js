const express=require('express')
const router = express.Router()
const News = require('../models/news_model')

//get all news coordinates
router.get('/', async (req,res) => {
    try {
        const news = await News.find()
        res.json(news)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})
// Creating one
router.post('/', async (req, res) => {
    const news = new News({
      name: req.body.name
    })
    try {
      const newSubscriber = await news.save()
      res.status(201).json(newSubscriber)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
//get all news at the coordinate lat and lon
router.get('/:lat/:lon', (req,res) => {
    res.send('getting all news as the coordinates lat:'+req.params.lat+' and lon:'+req.params.lon)
})

module.exports = router