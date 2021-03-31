const express = require('express')
const validator = require ('express-joi-validation').createValidator()
const usersController = require('../controllers/usersController.js')
const usersValidation = require ('../validations/usersValidations')


const routes = (User) => {
  const userRouter = express.Router()
  const controller = usersController(User)

  userRouter.route('/user')
    .get(controller.getUsers)
    .post(validator.body(usersValidation), controller.postUser)
    //.post(validator.body(usersValidation), controller.postUser) //si accedo a validator veo que tengo validator.(body/params/headers/query/response/fields)
    //ver que correponde validar en cada endpoint/metodo HTTP
    //cuando arme mas schemas, para acceder voy a tener que usar usersValidation.Schemax para indicar cual de los schemas usar en cada caso.

  userRouter.route('/user/:userId') //: antes del endpoint significa que voy por Id? --> params
    .get(controller.getUserByID)

    .put(controller.putUserById)

    .delete(controller.deleteUserById)

  userRouter.route('/user/login') //ruta exclusiva para el login... podria ir directamente '/login, sin entrara al endpoint de user
    .post(controller.postUserLogin)

  return userRouter
}

module.exports = routes