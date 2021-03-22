const express = require('express')
const usersController = require('../controllers/usersController.js')


const routes = (User) => {
  const userRouter = express.Router()
  const controller = usersController(User)

  userRouter.route('/user')
    .get(controller.getUsers)
    .post(controller.postUser)

  userRouter.route('/user/:userId')
    .get(controller.getUserByID)

    .put(controller.putUserById)

    .delete(controller.deleteUserById)

  userRouter.route('/user/login')
    .post(controller.postUserLogin)

  return userRouter
}

module.exports = routes