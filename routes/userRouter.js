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

  userRouter.route('/user/:userId')
    .get(controller.getUserByID)

    .put(controller.putUserById)

    .delete(controller.deleteUserById)

  userRouter.route('/user/login')
    .post(controller.postUserLogin)

  return userRouter
}

module.exports = routes