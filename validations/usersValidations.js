const Joi = require ('joi')

const usersValidation = Joi.object({
  firstName: Joi.string().min(3).max(8).required(),
  lastName: Joi.string().min(1).max(8).required(),
  userName: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(), //email me pide que tenga un @
  address: Joi.string().required(),
  phone: Joi.number().required() // si yo en el userModel le puse que phone sea Type:string, ahora puedo validar q sea number? es inconsistente?!
})

module.exports = usersValidation