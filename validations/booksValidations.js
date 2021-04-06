const Joi = require ('joi')

const booksValidationBody = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  read: Joi.boolean().required()
})

const booksValidationQuery = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  genre: Joi.string(),
  read: Joi.boolean()
})

const booksValidationParams = Joi.object({
  bookId: Joi.string().length(24).required()
})

const booksValidationPut = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  genre: Joi.string(),
  read: Joi.boolean()
})

module.exports = {booksValidationBody, booksValidationQuery, booksValidationParams, booksValidationPut}