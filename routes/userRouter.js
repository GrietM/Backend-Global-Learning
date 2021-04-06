const express = require('express')
const validator = require ('express-joi-validation').createValidator()
const usersController = require('../controllers/usersController.js')
const usersValidation = require ('../validations/usersValidations')


const routes = (User) => {
  const userRouter = express.Router()
  const controller = usersController(User)

  userRouter.route('/user')
    .get(validator.query(usersValidation.usersValidationQuery),controller.getUsers)
    .post(validator.body(usersValidation.usersValidationBody), controller.postUser)

  userRouter.route('/user/:userId')
    .get(validator.params(usersValidation.usersValidationParams),controller.getUserByID)
    .put(validator.params(usersValidation.usersValidationParams), validator.body(usersValidation.usersValidationPut),controller.putUserById)
    .delete(validator.params(usersValidation.usersValidationParams),controller.deleteUserById)

  userRouter.route('/user/login')
    .post(validator.body(usersValidation.usersValidationLogin),controller.postUserLogin)

  return userRouter
}

module.exports = routes