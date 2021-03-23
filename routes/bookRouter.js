const express = require('express')
const validator = require ('express-joi-validation').createValidator()
const booksController = require('../controllers/booksController.js')
const booksValidation = require ('../validations/booksValidations')

const routes = (Book) => {
  const bookRouter = express.Router()
  const controller = booksController(Book)

  bookRouter.route('/books')
    .get(controller.getBooks) 
    //.get(validator.params(booksValidationGet),controller.getBooks) --> quise sumar el "booksValidationGet" pero nos e bien como hacer el exports o el require...
    .post(validator.body(booksValidation), controller.postBook) // ver en google como los ejemplos usan el await cuando arman las validaciones

  bookRouter.route('/books/:bookId')
    .get(controller.getBookByID)

    .put(controller.putBookById)

    .delete(controller.deleteBookById)

  return bookRouter
}

module.exports = routes