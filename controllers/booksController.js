const booksController = (Book) => {
  const getBooks = async (req,res) => {
    try {
      const {query} = req
      const response = await Book.find(query)
      if (response.length == 0){
        return res.status(202).json({message: 'No matches found'})} 
      else {
        return res.json(response) 
      }
     
    } 
    catch(err){
    throw err
    }
  }
  
  const postBook = async (req,res) => {
    try {
      const book = new Book (req.body)
      console.log ('Body:', req.body) 
      await book.save()
      return res.status(201).json(book)
    }
    catch (err) {
    throw console.log('el error es:' + err)
    }
  }

  const getBookByID = async (req,res) => {
    try {
      const {params} = req
      const response = await Book.findById(params.bookId)
      
      return res.json(response)
  }
    catch (err){
      throw err
    }
  }

  const putBookById = async(req,res) => {
    try {
        const {params,body} = req
        const response = await Book.updateOne({
          _id: params.bookId
        }, {
          $set: {
            title: body.title,
            genre: body.genre,
            author: body.author,
            read:  body.read
          }
        })
      /* const response =  await Book.findByIdAndUpdate({ _id: params.bookId }, { $set : body}, { new: true });*/
      return res.status(202).json(response)
  }
  catch (err){
    throw console.log('el error es:' + err)
  }
  }

  const deleteBookById = async(req,res)=>{
      try{
      const {params} = req
      console.log(params)
      await Book.findByIdAndDelete(params.bookId)
      return res.status(202).json({message:'El libro fue eliminado con éxito'})
    }catch (err) {
      throw console.log('el error es: ' + err) //probar si esto esta funcionando! 
    }}
  
  return {getBooks, postBook, getBookByID, putBookById,deleteBookById}
}

module.exports = booksController
