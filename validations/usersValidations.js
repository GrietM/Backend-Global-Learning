const Joi = require ('joi')

const usersValidationBody = Joi.object({
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

// armo otro para los get. a ninguno le pongo required porq lo voy a hacer sobre el query y eso puede venir vacio o el usuario puede usuar cuantos filtros quiera
// de ahi en mas, el resto de los valores pido lo mismo que para el POST, para que el query siempre pida algo que ya se q era valido cuando se creo el usuario 
//y no acepte filtros sin sentido

const usersValidationQuery = Joi.object({
  firstName: Joi.string().min(1).alphanum(),
  lastName: Joi.string().min(1).alphanum(),
  userName: Joi.string().min(3),//Le agrego peticiones. Aunque crea a partir de name y lastname no es alphanum porq agregamos el . y min(3)
  password: Joi.string().alphanum().min(3).max(10),
  email: Joi.string().email(),
  address: Joi.string().regex(/[a-zA-Z0-9-\s]$/),
  phone: Joi.string().regex(/^\d{3}-\d{3}-\d{7}$/)
}
)

const usersValidationParams = Joi.object({
  userId:Joi.string().length(24)//el params lo uso para los caso que estoy filtrando (GET) o actualizando (PUT) "BY ID" por lo tanto es requerido!
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

//el schema del usersValidationPut termina siendo el del query pero lo tengo que usar con la propiedad body en el userRouter y queda como todo cruzado... ver de definir mejor los nombres ...

module.exports = {usersValidationBody, usersValidationQuery ,usersValidationParams, usersValidationPut,usersValidationLogin}