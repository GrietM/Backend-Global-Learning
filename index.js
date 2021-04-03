const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require ('body-parser')
const jwt= require("express-jwt")

const Book = require ("./models/bookModel")
const User= require("./models/userModel")


//agregar nodemon y el npm start aca o donde corresponda para poder hacer el start automatico con cada cambio

//es como que no alcanza solo con requerir express. Ademas lo guardo en la cons app con argumneto vacio y a paritr de esa constante
// lo voy a estar consumiendo en el resto del doc

const app = express() // cada vez q use app significa q estoy "consumiendo funciones" de express? --> middleware 
// The app object is instantiated on creation of the Express server. It has a middleware stack that can be customized 

//app.all('/api/*', jwt({secret: '123456marcela', algorithms: ['HS256']}).unless({ path: ['/api/user/login'] }))

const connectDb = async() => {
  try{
    await mongoose.connect('mongodb://localhost/bookAPI') 
// Desde acá podría cambiarle el nombre a la base de datos. el connect se conecta a la base de datos mencionada y si no exsite la crea con el nombre q le estoy pasando
  }catch(error) { // ver como hacer un mejor manejo de estos errores
  throw error
  }
}

connectDb() //aca estoy corriendo la funcion declarada arriba --> me conecto a la base de datos

const bookRouter = require('./routes/bookRouter.js')(Book) //que significa el argumento q le estoy pasando? Book es el modelo... ver como estoy usando ese Book en bookRouter
const userRouter = require('./routes/userRouter.js')(User) // idem anteiror
const port = 8081

app.use(bodyParser.urlencoded({extended: true})) //parse = analizar gramaticalmente. En este caso "interpreta la url"
app.use(bodyParser.json()) //En este caso "interpreta los json"

app.use('/api',bookRouter)  // los comandos app son para cosas que tienen que correr en toda la aplicacion o algo asi? Returns middleware that only parses urlencoded/json/text/raw
app.use('/api',userRouter)  // El término middleware se refiere a un sistema de software que ofrece servicios y funciones comunes para las aplicaciones.
// En general, el middleware se encarga de las tareas de gestión de datos, servicios de aplicaciones, mensajería, autenticación y gestión de API.

app.listen(port, () => {
  console.log(`server started on port ${port}`) 
})

