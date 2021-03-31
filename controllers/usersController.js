const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const usersController = (User) => {
  const getUsers = async (req,res) => {
    try {
      const {query} = req
      const response = await User.find(query)
      //console.log(response)
      return res.json(response) 
    } 
    catch(err){
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
        {
          firstName: body.firstName, 
          lastName: body.lastName,
          userName: newUserName(),
          password: encryptedPsw,
          email: body.email,
          address: body.address,
          phone: body.phone
        }
     
      // aca quedaria mas prolijo si al userObject lo creo usando ...body (spread)  --> solo toco lo que voy a cambiar!
      
    const user = new User (userObject)
    console.log("el usuario queda como: " , user)

    await user.save()
    return res.status(201).json(user)
    } catch (err) {
    throw console.log('el error es:' + err)
    }
  }
  

  const getUserByID = async(req, res) => {
    try {
      const { params } = req
      const response = await User.findById(params.userId)

      return res.json(response)
    }
    catch (err) {
      throw err
    }
  }

  const putUserById = async(req,res) => {
    try {
        const {params,body} = req
        const response = await User.updateOne({
          _id: params.userId
        }, {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            userName: (() => {
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
              })(),
            password: body.password,
            email:body.email,
            address:body.address,
            phone:body.phone
          }
        })
    return res.status(202).json(response)
  }
  catch (err){
    throw console.log('el error es:' + err)
  }
  }

  const deleteUserById = async(req,res)=>{
      try{
      const {params} = req
      console.log(params)
      await User.findByIdAndDelete(params.userId)
      return res.status(202).json({message:'El libro fue eliminado con éxito'})
    }catch (err) {
      throw console.log('el error es: ' + err) //probar si esto esta funcionando! 
    }}
 
    /// EMPIEZO A ARMAR EL NUEVO ENDPOINT PARA LOGIN
    
   const postUserLogin = async (req,res) => {
      try {
        const {body} = req
        const foundUser = await User.findOne ({ "userName" : req.body.userName});

        console.log("body",body)
        console.log("foundUser:" + foundUser) 


        const isPswdCorrect = await bcrypt.compare(body.password, foundUser.password)
        
        
        console.log(isPswdCorrect)

        // foundUser returns null if user is not there in collection with provided condition . If user found returns user document.
        // if (foundUser !== null){
//          if( foundUser && foundUser.password == req.body.password){ // tengo que reemplazar una parte de este if con el COMPARE de bcrypt!
            
            if (isPswdCorrect){
//para generar el token
            const tokenUser = {
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              userName: foundUser.userName
            }
           

            const token = jwt.sign(tokenUser, '123456marcela' , {expiresIn: 30});

            return res.status(202).json({message:'OK', token: token})  
            
          }
         else /*if(!foundUser)*/{
          return res.status(202).json({message: !foundUser ? 'Invalid user' : 'Credenciales inválidas'})
         }
         /*
          else{
            return res.status(202).json({message:'Credenciales Invalidas'})
         } */
        
        /*if (foundUser.userName === null){
          return res.status(202).json({message:'Invalid user'})
        }*/
/*
        else {
          return res.status(202).json({message:'Invalid user'})
        }*/
          }
      catch (err){
        throw err
      }

          
          }

    return {getUsers, postUser, getUserByID,putUserById, deleteUserById, postUserLogin}
}

module.exports = usersController