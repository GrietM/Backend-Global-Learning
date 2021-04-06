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
      const newUserName = (body.firstName + "."+ body.lastName)
     
      const userObject = 
        { ...body,
          userName: newUserName,
          password: encryptedPsw
        }
       
    const user = new User (userObject)
    await user.save()
    return res.status(201).json(user)
    }
    catch (err) {
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
    throw err
    }
  }
  
  const getUserByID = async(req, res) => {
    try {
      const { params } = req
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

  const putUserById = async(req,res) => {
    try {
        const {params,body} = req
        saltingNumber = 10
        const encryptedPsw = await bcrypt.hash(req.body.password, saltingNumber)
        const response = await User.updateOne({
          _id: params.userId
        },{
          $set: {
            ...body,
            userName: (body.firstName + "."+ body.lastName),       
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
      await User.findByIdAndDelete(params.userId)
      return res.status(202).json({message:'User succesfully deleted'})
    }catch (err) {
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }}
 
   const postUserLogin = async (req,res) => {
      try {
        const {body} = req
        const foundUser = await User.findOne ({ "userName" : req.body.userName});
        if (foundUser !== null){
          const isPswdCorrect = await bcrypt.compare(body.password, foundUser.password)
          if (isPswdCorrect){
              const generateToken = (foundUser) => {
                return jwt.sign({...foundUser},'123456marcela')}
            return res.status(202).json({message:'Login OK', token: generateToken(foundUser)})
          }
          else{
            return res.status(202).json({message:"Invalid Credentials"})
          }
        }
        else{
          return res.status(202).json({message: 'Invalid user'})
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