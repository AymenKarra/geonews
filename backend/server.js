require('dotenv').config

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27018/geonews',{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',(error) => console.log(error))
db.once('open',() => console.log('connected to database'))

app.use(express.json())

const newsRouter = require('./routes/newsRouter')
app.use('/news',newsRouter)

app.listen(3000,()=> console.log('Server started'))