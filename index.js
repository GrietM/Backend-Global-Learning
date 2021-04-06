const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require ('body-parser')
const jwt= require("express-jwt")

const Book = require ("./models/bookModel")
const User= require("./models/userModel")

const app = express()

app.all('/api/*', jwt({secret: '123456marcela', algorithms: ['HS256']}).unless({ path: ['/api/user/login'] }))

const connectDb = async() => {
  try{
    await mongoose.connect('mongodb://localhost/bookAPI') 
  }catch(error) { 
  throw error
  }
}

connectDb() 

const bookRouter = require('./routes/bookRouter.js')(Book)
const userRouter = require('./routes/userRouter.js')(User)
const port = 8081

app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json())

app.use('/api',bookRouter)
app.use('/api',userRouter)

app.listen(port, () => {
  console.log(`server started on port ${port}`) 
})

