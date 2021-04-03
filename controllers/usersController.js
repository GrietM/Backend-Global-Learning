const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const usersController = (User) => {
 
  const getUsers = async (req,res) => {
    try {
      const {query} = req
      const response = await User.find(query)
      
      if (response.length == 0){
      return res.status(404).json({message:'No matches found'})}
      else{
      return res.json(response) 
      }
    } 
    catch(err){
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }
  }
  
  const postUser = async (req,res) => {
    const saltingNumber = 10
    const encryptedPsw = await bcrypt.hash(req.body.password, saltingNumber) 
    
    try {
      const {body} = req
// porq no me lo toma si yo uso directamente las 
//propiedades de adentro de req sin declarar la constante body y guardar esa info ahi?

      const newUserName = () =>{
        //Separo las palabras ingresadas en el nombre y apellido y las guardo en un arreglo
        let splitFirstName = body.firstName.split(" ")
        let splitLastName = body.lastName.split(" ")

        // armo el return extrayendo el primer elemento de cada arreglo y uniendolos con un .
        if(body.lastName && body.firstName){ //pregunto SI EXISTEN
           return (splitFirstName[0] + "."+ splitLastName[0])
        }
        else{
          return body.firstName ? splitFirstName[0] : splitLastName[0]
        }
        }

     const userObject = 
        { ...body,
          //firstName: body.firstName, 
          //lastName: body.lastName,
          userName: newUserName(),
          password: encryptedPsw
          //email: body.email,
          //address: body.address,
          //phone: body.phone
        }
       
    const user = new User (userObject)
    //console.log("el usuario queda como: " , user)

    await user.save()
    return res.status(201).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
    throw err
    }
  }
  

  const getUserByID = async(req, res) => {
    try {
      const { params } = req
      console.log(params)
      const response = await User.findById(params.userId)
      if(response == null){
        return res.json({message: "No matches found"})
      }
      else{
        return res.json(response)
      }
 
    }
    catch (err) {
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }
  }

  const putUserById = async(req,res) => { //este controlador se puede mejorar con ...body y armando las funciones newUserName y encryptedPsw
    //deberia volver a poner el encriptador! Sino los usuarios actualizados, si le cargo todos los campos quedan con la contraseña desencriptada!
    // al agregar el encriptado se hace obligatorio ingresar algo en el campo de la contraseña cada vez que quiero actualizar un usuario porque sino se 
    // rompe la funcion encryptedPsw porq necesita que se le pasen si o si los parametros data y salting
    //quise poner un IF que se fije si existe la propiedad password en el body del PUT y sino ni entre a encriptar pero no me toma la condicion...
    // en todo caso tendria que agregar a las validaciones del put que el password sea required en el body 
    try {
        const {params,body} = req
        saltingNumber = 10
        console.log(body.password)

        // if (body.password){} no me esta tomando este if, quise preguntar si existe la propiedad en el body que viene del req...
        //console.log(body.password)  
        const encryptedPsw = await bcrypt.hash(req.body.password, saltingNumber)
        const response = await User.updateOne({
          _id: params.userId
        }, {
          $set: {
            ...body,
            userName: (() => {if (body.firstName & body.lastName){
              //Separo las palabras ingresadas en el nombre y apellido y las guardo en un arreglo
              let splitFirstName = body.firstName.split(" ")
              let splitLastName = body.lastName.split(" ")
                             
              // armo el return extrayendo el primer elemento de cada arreglo y uniendolos con un .
              if(body.lastName && body.firstName){ //pregunto SI EXISTEN
               return (splitFirstName[0] + "."+ splitLastName[0])
              }
              else{
              return body.firstName ? splitFirstName[0] : splitLastName[0]
              }}
              else{
                return body.userName
              }

              })(),
            password: encryptedPsw,
          }
        })
    return res.status(202).json(response)
  }
  catch (err){
    console.log(err)
    res.status(500).json({message:"Internal Server Error"})
    throw err
  }
  }

  const deleteUserById = async(req,res)=>{
      try{
      const {params} = req
      console.log(params)
      await User.findByIdAndDelete(params.userId)
      return res.status(202).json({message:'El usuario fue eliminado con éxito'})
    }catch (err) {
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }}
 
    /// EMPIEZO A ARMAR EL NUEVO ENDPOINT PARA LOGIN --> se puede mejorar con funciones adentro!
    
   const postUserLogin = async (req,res) => {
      try {
        const {body} = req
        const foundUser = await User.findOne ({ "userName" : req.body.userName});

        //console.log("body",body)
        //console.log("foundUser:" + foundUser) 

        if (foundUser !== null){
        const isPswdCorrect = await bcrypt.compare(body.password, foundUser.password)
//        console.log(isPswdCorrect)
        if (isPswdCorrect){
            const generateToken = (foundUser) => {
              return jwt.sign({...foundUser},'123456marcela')
            }
          
            return res.status(202).json({message:'Login OK', token: generateToken(foundUser)})

           }
           else {
            return res.status(202).json({message:"Invalid Credentials"})
           }

            
            
          }
         else {
          return res.status(202).json({message: 'Invalid user'}) // credenciales invalidas no funciona... 
         }
         }
      catch (err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
        throw err
      }

          
          }

    return {getUsers, postUser, getUserByID,putUserById, deleteUserById, postUserLogin}
}

module.exports = usersController