const Joi = require ('joi')

const booksValidation = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  read: Joi.boolean().required()
})

/*const booksValidationGet = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  read: Joi.boolean().required()
})*/


//ojo , crear un schema para cada tipo de validaciones?
//esto es get/getbyId/post/put/delete... van a validar cosas diferentes en body, params o query...
//ver comentarios en usersValidations.js

module.exports = {booksValidation}//,booksValidationGet}