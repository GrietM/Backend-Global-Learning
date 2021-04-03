const express = require('express')
const validator = require ('express-joi-validation').createValidator()
const booksController = require('../controllers/booksController.js')
const booksValidation = require ('../validations/booksValidations')

const routes = (Book) => {
  const bookRouter = express.Router()
  const controller = booksController(Book)

  bookRouter.route('/books')
    .get(validator.query(booksValidation.booksValidationQuery),controller.getBooks)

    .post(validator.body(booksValidation.booksValidationBody),controller.postBook) // ver en google como los ejemplos usan el await cuando arman las validaciones

  bookRouter.route('/books/:bookId')
    .get(validator.params(booksValidation.booksValidationParams),controller.getBookByID)

    .put(validator.params(booksValidation.booksValidationParams),validator.body(booksValidation.booksValidationPut),controller.putBookById)

    .delete(validator.params(booksValidation.booksValidationParams),controller.deleteBookById)
  return bookRouter
}

module.exports = routes