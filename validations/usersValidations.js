const Joi = require ('joi')

const usersValidationBody = Joi.object({
  firstName: Joi.string().min(1).alphanum().required(),
  lastName: Joi.string().min(1).alphanum().required(),
  userName: Joi.string(),
  password: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string().email().required(), 
  address: Joi.string().regex(/[a-zA-Z0-9-\s]$/).required(),
  phone: Joi.string().regex(/^\d{3}-\d{3}-\d{7}$/).required()
})

const usersValidationQuery = Joi.object({
  firstName: Joi.string().min(1).alphanum(),
  lastName: Joi.string().min(1).alphanum(),
  userName: Joi.string().min(3),
  email: Joi.string().email(),
  address: Joi.string().regex(/[a-zA-Z0-9-\s]$/),
  phone: Joi.string().regex(/^\d{3}-\d{3}-\d{7}$/)
}
)

const usersValidationParams = Joi.object({
  userId:Joi.string().length(24).required()
}
)

const usersValidationPut = Joi.object({
  firstName: Joi.string().min(1).alphanum(),
  lastName: Joi.string().min(1).alphanum(),
  userName: Joi.string().min(3),
  password: Joi.string().alphanum().min(3).max(10),
  email: Joi.string().email(),
  address: Joi.string().regex(/[a-zA-Z0-9-\s]$/),
  phone: Joi.string().regex(/^\d{3}-\d{3}-\d{7}$/)
}
)

const usersValidationLogin = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required()}
)

module.exports = {usersValidationBody, usersValidationQuery ,usersValidationParams, usersValidationPut,usersValidationLogin}