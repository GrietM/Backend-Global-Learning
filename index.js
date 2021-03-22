const express = require('express')
const mongoose = require('mongoose')
const Book = require ("./models/bookModel")
const bodyParser = require ('body-parser')
const User= require("./models/userModel")


const app = express()

const connectDb = async() => {
  try{
    await mongoose.connect('mongodb://localhost/bookAPI')
  }catch(error) {
  throw error
  }
}
connectDb() //aca estoy corriendo la funcion declarada arriba

const bookRouter = require('./routes/bookRouter.js')(Book)
const userRouter = require('./routes/userRouter.js')(User)
const port = 8081

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api',bookRouter)
app.use('/api',userRouter)

app.listen(port, () => {
  console.log(`server started on port ${port}`) //eslint-disable-line
})

