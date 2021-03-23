const Joi = require ('joi')

const usersValidation = Joi.object({
  firstName: Joi.string().min(1).max(8).alphanum().required(), //no admite caracteres especiales--> alphanum es lo mismo que regex(/[a-zA-Z0-9$/)
  lastName: Joi.string().min(1).alphanum().required(), //con min(1) chequeo que no este vacio el campo
  userName: Joi.string().required(),
  password: Joi.string().alphanum().min(3).max(10).required(), //uppercase covierte todo a MAYUS, no chequea q sean mayusculas.
  email: Joi.string().email().required(), //email me pide que tenga un @ y formato de email
  address: Joi.string().regex(/[a-zA-Z0-9-\s]$/).required(), //alphanum no admite el espacio! lo agrego a la regex como (/s)
  //phone: Joi.number().required() // si yo en el userModel le puse que phone sea Type:string, ahora puedo validar q sea number? es inconsistente?!
  phone: Joi.string().regex(/^\d{3}-\d{3}-\d{7}$/).required() //pide q sean dígitos (\d{x}) con el siguiente formato ***-***-******* --> 549-381-5042716
  //no pude contemplar el signo + porque es un caracter especial q no se admite en las exp reg ..?
})

module.exports = usersValidation