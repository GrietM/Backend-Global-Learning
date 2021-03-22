const express = require('express')
const validator = require ('express-joi-validation').createValidator()
const booksController = require('../controllers/booksController.js')
const booksValidation = require ('../validations/booksValidations')

const routes = (Book) => {
  const bookRouter = express.Router()
  const controller = booksController(Book)

  bookRouter.route('/books')
    .get(controller.getBooks)
    .post(validator.body(booksValidation), controller.postBook)

  bookRouter.route('/books/:bookId')
    .get(controller.getBookByID)

    .put(controller.putBookById)

    .delete(controller.deleteBookById)

  return bookRouter
}

module.exports = routes