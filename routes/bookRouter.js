const express = require('express')
const Joi = require ('joi')
const validator = require ('express-joi-validation').createValidator()
const booksController = require('../controllers/booksController.js')

const bodySchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  read: Joi.boolean().required()
})
const routes = (Book) => {
  const bookRouter = express.Router()
  const controller = booksController(Book)

  bookRouter.route('/books')
    .get(controller.getBooks)
    .post(validator.body(bodySchema), controller.postBook)

  bookRouter.route('/books/:bookId')
    .get(controller.getBookByID)

    .put(controller.putBookById)

    .delete(controller.deleteBookById)

  return bookRouter
}

module.exports = routes