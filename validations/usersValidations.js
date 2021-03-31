const Joi = require ('joi')

const usersValidation = Joi.object({
  firstName: Joi.string().min(1).alphanum().required(), //no admite caracteres especiales--> alphanum es lo mismo que regex(/[a-zA-Z0-9$/)
  lastName: Joi.string().min(1).alphanum().required(), //con min(1) chequeo que no este vacio el campo
  userName: Joi.string(),//.required(), ---> no deberia ser required, porq lo creo con logica adentro del contrlador. siempre voy a pisar lo que ingrese el usuario, lo mas logico seria q ni se lo pida
  password: Joi.string().alphanum().min(3).max(10).required(), //uppercase covierte todo a MAYUS, no chequea q sean mayusculas.
  email: Joi.string().email().required(), //email me pide que tenga un @ y formato de email
  address: Joi.string().regex(/[a-zA-Z0-9-\s]$/).required(), //alphanum no admite el espacio! lo agrego a la regex como (/s)
  //phone: Joi.number().required() // si yo en el userModel le puse que phone sea Type:string, ahora puedo validar q sea number? es inconsistente?!
  phone: Joi.string().regex(/^\d{3}-\d{3}-\d{7}$/).required() //pide q sean dígitos (\d{x}) con el siguiente formato ***-***-******* --> 549-381-5042716
  //no pude contemplar el signo + porque es un caracter especial q no se admite en las exp reg ..?
})

// este schema que esta creado asi tan "exigente" es solo para validar el body cuando creo el usuario (postUser)--> el q hicimos en clase
// para los que son byID crear otro que chequee el params (longitud, required, tipo)
// para el login?
// para filtrar en los GET hay que validar los query que vienen de los querystrings (a estos no pedirle rquiered! si viene vacio ma trae TODOS)

module.exports = usersValidation //, usersValidation2} cuando tenga mas schemas los agrego asi al objeto a exportar