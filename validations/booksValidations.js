const Joi = require ('joi')

const booksValidation = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  read: Joi.boolean().required()
})

module.exports = booksValidation