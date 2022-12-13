require('dotenv').config

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://host.docker.internal:27018/geonews',{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',(error) => console.log(error))
db.once('open',() => console.log('connected to database'))

app.use(express.json())
app.use(cors())
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });*/

const newsRouter = require('./routes/newsRouter')
app.use('/news',newsRouter)

app.listen(3000,()=> console.log('Server started'))